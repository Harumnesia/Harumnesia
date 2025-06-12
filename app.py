"""
Perfume Recommendation System - Clean Architecture
A Flask API for perfume recommendations using autoencoder and clustering

This refactored version follows SOLID principles and clean architecture patterns:
- Single Responsibility Principle: Each class has one reason to change
- Open/Closed Principle: Open for extension, closed for modification
- Liskov Substitution Principle: Implementations can be substituted
- Interface Segregation Principle: Clients depend only on what they use
- Dependency Inversion Principle: Depend on abstractions, not concretions
"""

import os
import json
import logging
import warnings
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple, Any, Protocol
from pathlib import Path

import pandas as pd
import numpy as np
import joblib

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify
from flask_cors import CORS # <-- Impor CORS ditambahkan
from scipy.sparse import hstack, csr_matrix
from sklearn.metrics.pairwise import cosine_similarity

# TensorFlow imports
import tensorflow as tf
from tensorflow.keras.models import Model, load_model
from tensorflow.keras.layers import Dense, Input
from tensorflow.keras import layers
from tensorflow.keras.utils import custom_object_scope

# AI integration
from langchain_google_genai import ChatGoogleGenerativeAI

# Configure warnings and logging
warnings.filterwarnings('ignore', category=UserWarning, module='sklearn')
warnings.filterwarnings('ignore', message='.*InconsistentVersionWarning.*')
warnings.filterwarnings('ignore', message='.*feature names.*')
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
tf.get_logger().setLevel('ERROR')

# Configure logging for production
log_level = logging.DEBUG if os.getenv('DEBUG', 'false').lower() == 'true' else logging.INFO
logging.basicConfig(
    level=log_level,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('app.log') if os.getenv('LOG_FILE') else logging.NullHandler()
    ]
)
logger = logging.getLogger(__name__)

# ============================================================================
# DOMAIN MODELS
# ============================================================================

@dataclass
class PerfumeRequest:
    """Domain model for perfume recommendation request"""
    gender: str
    situation: str
    concentrate: str
    size: int
    min_price: float
    max_price: float
    description: str
    top_k: int = 10
    
    def __post_init__(self):
        """Validate request data"""
        if self.min_price < 0 or self.max_price < 0:
            raise ValueError("Prices cannot be negative")
        if self.min_price > self.max_price:
            raise ValueError("Min price cannot be greater than max price")
        if self.size <= 0:
            raise ValueError("Size must be positive")
        if self.top_k <= 0:
            raise ValueError("top_k must be positive")

@dataclass
class PerfumeRecommendation:
    """Domain model for perfume recommendation result"""
    cluster: int
    extracted_notes: str
    total_in_cluster: int
    filtered_count: int
    recommendations: List[Dict[str, Any]]

# ============================================================================
# EXCEPTIONS
# ============================================================================

class PerfumeException(Exception):
    """Base exception for perfume recommendation system"""
    pass

class ModelLoadingException(PerfumeException):
    """Exception raised when models fail to load"""
    pass

class RecommendationException(PerfumeException):
    """Exception raised during recommendation generation"""
    pass

class ValidationException(PerfumeException):
    """Exception raised for validation errors"""
    pass

# ============================================================================
# CONFIGURATION
# ============================================================================

@dataclass
class AppConfig:
    """Application configuration with environment variable support"""
    gemini_api_key: str = field(default_factory=lambda: os.getenv('GEMINI_API_KEY'))
    host: str = field(default_factory=lambda: os.getenv('HOST', '0.0.0.0'))
    port: int = field(default_factory=lambda: int(os.getenv('PORT', '5050')))
    debug: bool = field(default_factory=lambda: os.getenv('DEBUG', 'false').lower() == 'true')
    model_dir: str = field(default_factory=lambda: os.getenv('MODEL_DIR', '.'))
    
    def __post_init__(self):
        """Validate required configuration"""
        if not self.gemini_api_key:
            raise ValueError(
                "GEMINI_API_KEY is required. Please set it in your .env file or environment variables."
            )
    
    @property
    def model_files(self) -> Dict[str, str]:
        """Get model file paths"""
        base_path = Path(self.model_dir)
        return {
            'autoencoder': str(base_path / 'autoencoder.h5'),
            'kmeans': str(base_path / 'kmeans.pkl'),
            'vectorizer': str(base_path / 'vectorizer.pkl'),
            'ohe': str(base_path / 'ohe.pkl'),
            'scaler': str(base_path / 'scaler.pkl'),
            'dataset': str(base_path / 'Dataset_Harumnesia_clean.csv')
        }

# ============================================================================
# PROTOCOLS (INTERFACES)
# ============================================================================

class ModelLoader(Protocol):
    """Protocol for loading machine learning models"""
    
    def load_autoencoder(self, path: str, input_dim: int) -> Tuple[Model, Model]:
        """Load autoencoder and return (autoencoder, encoder)"""
        ...
    
    def load_preprocessing_models(self, paths: Dict[str, str]) -> Dict[str, Any]:
        """Load preprocessing models (vectorizer, ohe, scaler)"""
        ...
    
    def load_clustering_model(self, path: str) -> Any:
        """Load clustering model"""
        ...

class NotesExtractor(Protocol):
    """Protocol for extracting perfume notes from descriptions"""
    
    def extract_notes(self, description: str) -> str:
        """Extract fragrance notes from description"""
        ...

class DataProcessor(Protocol):
    """Protocol for data preprocessing"""
    
    def preprocess_user_input(self, request: PerfumeRequest, notes: str) -> np.ndarray:
        """Preprocess user input for model"""
        ...
    
    def prepare_training_data(self, df: pd.DataFrame, models: Dict[str, Any]) -> Tuple[np.ndarray, np.ndarray]:
        """Prepare training data for similarity computation"""
        ...

class RecommendationService(Protocol):
    """Protocol for recommendation generation"""
    
    def generate_recommendations(self, request: PerfumeRequest) -> PerfumeRecommendation:
        """Generate perfume recommendations"""
        ...

# ============================================================================
# MODELS
# ============================================================================

class SimpleAutoencoder(Model):
    """Custom Autoencoder class matching the notebook implementation"""
    
    def __init__(self, input_dim: int, latent_dimensions: int = 64, **kwargs):
        super(SimpleAutoencoder, self).__init__(**kwargs)
        self.input_dim = input_dim
        self.latent_dimensions = latent_dimensions
        
        # Encoder: Input → 256 → 128 → 64
        self.encoder = tf.keras.Sequential([
            layers.Input(shape=(input_dim,)),
            layers.Dense(256, activation='relu', name='encoder_dense_1'),
            layers.Dense(128, activation='relu', name='encoder_dense_2'),
            layers.Dense(latent_dimensions, activation='relu', name='encoder_output'),
        ], name='encoder')

        # Decoder: 64 → 128 → 256 → input_dim
        self.decoder = tf.keras.Sequential([
            layers.Dense(128, activation='relu', name='decoder_dense_1'),
            layers.Dense(256, activation='relu', name='decoder_dense_2'),
            layers.Dense(input_dim, activation='sigmoid', name='decoder_output')
        ], name='decoder')

    def call(self, input_data):
        encoded = self.encoder(input_data)
        decoded = self.decoder(encoded)
        return decoded
    
    def encode(self, input_data):
        """Get encoded representation"""
        return self.encoder(input_data)
    
    def get_config(self):
        # This ensures that if we save the model again, the config will be complete
        config = super().get_config()
        config.update({
            'input_dim': self.input_dim,
            'latent_dimensions': self.latent_dimensions
        })
        return config
    
    @classmethod
    def from_config(cls, config):
        """Create instance from config to fix serialization warnings"""
        return cls(**config)

# ============================================================================
# SERVICES
# ============================================================================

class ModelLoaderService:
    """Service for loading machine learning models"""
    
    def load_autoencoder(self, path: str, input_dim: int) -> Tuple[Model, Model]:
        """
        Loads the autoencoder by building the model structure manually and then
        loading only the weights from the .h5 file. This is more robust against
        models saved with incomplete configurations.
        """
        logger.info("Constructing autoencoder manually and loading weights from '%s'...", path)
        
        try:
            # 1. Create a new instance of the model architecture.
            autoencoder = SimpleAutoencoder(input_dim=input_dim, latent_dimensions=64)

            # 2. Load weights by name to handle potential structural mismatches.
            autoencoder.load_weights(path, by_name=True)
            
            # 3. Extract the encoder part from our newly built model.
            encoder = autoencoder.encoder
            
            logger.info("✅ Autoencoder built and weights loaded successfully.")
            return autoencoder, encoder

        except Exception as e:
            # If this still fails, the H5 file is likely fundamentally incompatible.
            logger.error(f"CRITICAL: Failed to load autoencoder weights from '{path}'. Application cannot start. Error: {e}")
            raise ModelLoadingException(
                f"Failed to load weights for autoencoder. The H5 file might be corrupt or its weights are incompatible with the current model architecture. Error: {e}"
            )

    def load_preprocessing_models(self, paths: Dict[str, str]) -> Dict[str, Any]:
        """Load preprocessing models"""
        logger.info("Loading preprocessing models...")
        
        try:
            with warnings.catch_warnings():
                warnings.simplefilter("ignore")
                models = {
                    'vectorizer': joblib.load(paths['vectorizer']),
                    'ohe': joblib.load(paths['ohe']),
                    'scaler': joblib.load(paths['scaler'])
                }
            
            logger.info("✅ Preprocessing models loaded")
            return models
            
        except Exception as e:
            raise ModelLoadingException(f"Failed to load preprocessing models: {e}")
    
    def load_clustering_model(self, path: str) -> Any:
        """Load clustering model"""
        logger.info("Loading clustering model...")
        
        try:
            with warnings.catch_warnings():
                warnings.simplefilter("ignore")
                model = joblib.load(path)
            
            logger.info("✅ Clustering model loaded")
            return model
            
        except Exception as e:
            raise ModelLoadingException(f"Failed to load clustering model: {e}")

class PerfumeNotesExtractorService:
    """Service for extracting perfume notes from descriptions using AI"""
    
    def __init__(self, api_key: str):
        try:
            self.chat = ChatGoogleGenerativeAI(
                model="gemini-1.5-flash", # Using a more recent and efficient model
                temperature=0.5,
                google_api_key=api_key
            )
        except Exception as e:
            raise ModelLoadingException(f"Failed to initialize Gemini AI: {e}")
    
    def extract_notes(self, description: str) -> str:
        """Extract fragrance notes from user description"""
        if not description.strip():
            raise ValidationException("Description cannot be empty")
        
        prompt = self._create_prompt(description)
        
        try:
            response = self.chat.invoke(prompt)
            notes_data = self._parse_response(response.content)
            return " ".join(notes_data['notes'])
            
        except Exception as e:
            logger.error(f"Error extracting notes from Gemini: {e}")
            raise RecommendationException(f"Failed to extract notes: {e}")
    
    def _create_prompt(self, description: str) -> str:
        """Create prompt for Gemini API"""
        return f"""
You are a professional perfume expert with deep knowledge of fragrance families and ingredients.

Your task is to extract the most appropriate fragrance notes based on a user's natural language description of their desired perfume.
You must ONLY recommend notes from the valid list provided below, categorized into CITRUS, FLORAL, FRUITY, etc.

Respond only with a JSON format like this:
{{
  "notes": ["note1", "note2", "note3", "note4","note5", "note6", "note7", "note8"]
}}
you have to give eight notes
example :
{{
  "notes": ["Lemon", "Lime", "Lavender", "Rose","Sandalwood", "Jasmine", "Ylang-Ylang", "Orange Blossom"]
}}

---
VALID NOTES (Grouped by Category):

[CITRUS]
Lemon, Lime, Bergamot, Grapefruit, Yuzu, Mandarin Orange, Kaffir Lime, Pomelo, Calamansi

[FLORAL]
Lavender, Rose, Jasmine, Ylang-Ylang, Lily of the Valley, Orchid, Tuberose, Peony, Orange Blossom, Neroli

[FRUITY]
Apple, Strawberry, Raspberry, Pineapple, Mango, Peach, Black Currant, Pear, Fig

[WOODY]
Cedarwood, Sandalwood, Vetiver, Patchouli, Oud, Amberwood, Guaiac Wood

[SPICY]
Pink Pepper, Black Pepper, Cinnamon, Clove, Cardamom, Nutmeg, Ginger

[GREEN]
Basil, Mint, Green Tea, Grass, Tomato Leaf, Galbanum, Violet Leaf

[OTHER]
Vanilla, Musk, Amber, Tonka Bean, Leather, Incense, Coffee

---

User Description:
{description}

Output JSON:
"""
    
    def _parse_response(self, content: str) -> Dict[str, List[str]]:
        """Parse Gemini response"""
        try:
            # Handle potential markdown code fences in the response
            cleaned_content = content.strip().replace("```json", "").replace("```", "").strip()
            return json.loads(cleaned_content)
        except json.JSONDecodeError as e:
            raise ValidationException(f"Invalid AI response format: {e}")

class DataProcessorService:
    """Service for data preprocessing"""
    
    def __init__(self, vectorizer, ohe, scaler):
        self.vectorizer = vectorizer
        self.ohe = ohe
        self.scaler = scaler
    
    def preprocess_user_input(self, request: PerfumeRequest, notes: str) -> np.ndarray:
        """Preprocess user input to match training data format"""
        try:
            # Calculate average price
            avg_price = (request.min_price + request.max_price) / 2
            
            # Create DataFrame for categorical features
            input_df = pd.DataFrame({
                'gender': [request.gender],
                'situation': [request.situation],
                'concentrate': [request.concentrate]
            })
            
            # Transform features
            X_notes = self.vectorizer.transform([notes])
            X_cat = self.ohe.transform(input_df)
            
            # Transform numerical features without feature names to avoid warnings
            with warnings.catch_warnings():
                warnings.simplefilter("ignore")
                X_num = self.scaler.transform([[avg_price, request.size]])
            
            # Combine features using sparse matrices
            X_cat_sparse = csr_matrix(X_cat)
            X_num_sparse = csr_matrix(X_num)
            X_combined = hstack([X_cat_sparse, X_notes, X_num_sparse])
            
            return X_combined.toarray().astype('float32')
            
        except Exception as e:
            raise RecommendationException(f"Failed to preprocess input: {e}")
    
    def prepare_training_data(self, df: pd.DataFrame, models: Dict[str, Any]) -> Tuple[np.ndarray, np.ndarray]:
        """Prepare training data for similarity computation"""
        try:
            # Transform training data
            X_notes = models['vectorizer'].transform(df['notes_combined'])
            X_cat = models['ohe'].transform(df[['gender', 'situation', 'concentrate']])
            
            # Suppress feature names warning for numerical features
            with warnings.catch_warnings():
                warnings.simplefilter("ignore")
                X_num = models['scaler'].transform(df[['price', 'size']])
            
            # Combine features
            X_combined = hstack([
                csr_matrix(X_cat),
                X_notes,
                csr_matrix(X_num)
            ]).toarray().astype('float32')
            
            # Encode training data
            with warnings.catch_warnings():
                warnings.simplefilter("ignore")
                X_encoded = models['encoder'].predict(X_combined, verbose=0)
                clusters = models['kmeans'].predict(X_encoded)
            
            return X_encoded, clusters
            
        except Exception as e:
            raise RecommendationException(f"Failed to prepare training data: {e}")

class PerfumeRecommendationServiceImpl:
    """Main service for generating perfume recommendations"""
    
    def __init__(self, 
                 notes_extractor: NotesExtractor,
                 data_processor: DataProcessor,
                 models: Dict[str, Any],
                 df: pd.DataFrame,
                 training_data: Tuple[np.ndarray, np.ndarray]):
        self.notes_extractor = notes_extractor
        self.data_processor = data_processor
        self.models = models
        self.df = df
        self.X_train_encoded, self.train_clusters = training_data
    
    def generate_recommendations(self, request: PerfumeRequest) -> PerfumeRecommendation:
        """Generate perfume recommendations"""
        try:
            # Extract notes from description
            notes_combined = self.notes_extractor.extract_notes(request.description)
            if not notes_combined:
                raise RecommendationException("Could not generate notes from description")
            
            # Preprocess user input
            user_input = self.data_processor.preprocess_user_input(request, notes_combined)
            
            # Encode user input
            with warnings.catch_warnings():
                warnings.simplefilter("ignore")
                user_encoded = self.models['encoder'].predict(user_input, verbose=0)
            
            # Predict user cluster
            user_cluster = self.models['kmeans'].predict(user_encoded)[0]
            logger.info(f"User assigned to cluster: {user_cluster}")
            
            # Find similar perfumes
            recommendations = self._find_similar_perfumes(
                user_encoded, user_cluster, request, notes_combined
            )
            
            return recommendations
            
        except (ValidationException, RecommendationException):
            raise
        except Exception as e:
            raise RecommendationException(f"Recommendation generation failed: {e}")
    
    def _find_similar_perfumes(self, 
                               user_encoded: np.ndarray, 
                               user_cluster: int,
                               request: PerfumeRequest,
                               notes_combined: str) -> PerfumeRecommendation:
        """Find similar perfumes within cluster and price range"""
        # Filter perfumes in same cluster
        same_cluster_indices = np.where(self.train_clusters == user_cluster)[0]
        
        if len(same_cluster_indices) == 0:
            return PerfumeRecommendation(
                cluster=int(user_cluster),
                extracted_notes=notes_combined,
                total_in_cluster=0,
                filtered_count=0,
                recommendations=[]
            )
        
        # Get cluster data
        df_cluster = self.df.iloc[same_cluster_indices].copy()
        encoded_cluster = self.X_train_encoded[same_cluster_indices]
        
        # Apply price filter
        df_filtered = df_cluster[
            (df_cluster['price'] >= request.min_price) & 
            (df_cluster['price'] <= request.max_price)
        ]
        
        if df_filtered.empty:
            return PerfumeRecommendation(
                cluster=int(user_cluster),
                extracted_notes=notes_combined,
                total_in_cluster=len(same_cluster_indices),
                filtered_count=0,
                recommendations=[]
            )
        
        # Map indices and calculate similarities
        filtered_indices = df_filtered.index.tolist()
        cluster_idx_map = {original_idx: i for i, original_idx in enumerate(same_cluster_indices)}
        encoded_indices = [cluster_idx_map[idx] for idx in filtered_indices if idx in cluster_idx_map]
        
        if not encoded_indices:
            return PerfumeRecommendation(
                cluster=int(user_cluster),
                extracted_notes=notes_combined,
                total_in_cluster=len(same_cluster_indices),
                filtered_count=0,
                recommendations=[]
            )
        
        # Calculate similarities
        encoded_filtered = encoded_cluster[encoded_indices]
        similarities = cosine_similarity(user_encoded, encoded_filtered)[0]
        
        # Get top recommendations
        top_indices = similarities.argsort()[::-1][:request.top_k]
        recommendations = df_filtered.iloc[top_indices].copy()
        recommendations['similarity'] = similarities[top_indices]
        
        # Clean up response
        if 'notes_combined' in recommendations.columns:
            recommendations = recommendations.drop(columns=['notes_combined'])
        
        return PerfumeRecommendation(
            cluster=int(user_cluster),
            extracted_notes=notes_combined,
            total_in_cluster=len(same_cluster_indices),
            filtered_count=len(df_filtered),
            recommendations=recommendations.to_dict('records')
        )

# ============================================================================
# DEPENDENCY INJECTION
# ============================================================================

class ServiceFactory:
    """Factory for creating and configuring services"""
    
    def __init__(self, config: AppConfig):
        self.config = config
        self._models = {}
        self._df = None
        self._training_data = None
    
    def create_recommendation_service(self) -> RecommendationService:
        """Create and configure the recommendation service"""
        # Load models
        self._load_models()
        
        # Load dataset
        self._load_dataset()
        
        # Prepare training data
        self._prepare_training_data()
        
        # Create services
        notes_extractor = PerfumeNotesExtractorService(self.config.gemini_api_key)
        data_processor = DataProcessorService(
            self._models['vectorizer'],
            self._models['ohe'],
            self._models['scaler']
        )
        
        return PerfumeRecommendationServiceImpl(
            notes_extractor=notes_extractor,
            data_processor=data_processor,
            models=self._models,
            df=self._df,
            training_data=self._training_data
        )
    
    def _load_models(self):
        """Load all required models"""
        model_loader = ModelLoaderService()
        model_files = self.config.model_files
        
        # Load preprocessing models first
        preprocessing_models = model_loader.load_preprocessing_models(model_files)
        self._models.update(preprocessing_models)
        
        # Calculate input dimension for the autoencoder
        input_dim = self._calculate_input_dimension()
        
        # Load autoencoder (will raise an exception if it fails)
        autoencoder, encoder = model_loader.load_autoencoder(
            model_files['autoencoder'], input_dim
        )
        self._models['autoencoder'] = autoencoder
        self._models['encoder'] = encoder
        
        # Load clustering model
        self._models['kmeans'] = model_loader.load_clustering_model(
            model_files['kmeans']
        )
    
    def _load_dataset(self):
        """Load and prepare dataset"""
        try:
            model_files = self.config.model_files
            self._df = pd.read_csv(model_files['dataset'])
            # Combine notes columns for easier processing
            self._df['notes_combined'] = (
                self._df['top notes'].fillna('') + ' ' + 
                self._df['mid notes'].fillna('') + ' ' + 
                self._df['base notes'].fillna('')
            ).str.strip()
            logger.info(f"✅ Dataset loaded: {len(self._df)} perfumes")
        except Exception as e:
            raise ModelLoadingException(f"Failed to load dataset: {e}")
    
    def _prepare_training_data(self):
        """Prepare training data embeddings and clusters"""
        # This processor is created temporarily just for this step
        data_processor = DataProcessorService(
            self._models['vectorizer'],
            self._models['ohe'],
            self._models['scaler']
        )
        
        self._training_data = data_processor.prepare_training_data(self._df, self._models)
        logger.info(f"✅ Training data prepared: {self._training_data[0].shape}")
    
    def _calculate_input_dimension(self) -> int:
        """Calculate input dimension based on the loaded preprocessing models and a sample from the dataset"""
        # This check ensures we don't load the dataset twice if it's already in memory
        if self._df is None:
            model_files = self.config.model_files
            try:
                # Load only the header and first row to be memory efficient
                sample_df = pd.read_csv(model_files['dataset'], nrows=1)
                sample_df['notes_combined'] = (
                    sample_df['top notes'].fillna('') + ' ' + 
                    sample_df['mid notes'].fillna('') + ' ' + 
                    sample_df['base notes'].fillna('')
                ).str.strip()
            except Exception as e:
                raise ModelLoadingException(f"Could not read dataset for dimension calculation: {e}")
        else:
            sample_df = self._df.head(1)
        
        # Calculate dimensions from each preprocessor
        X_notes = self._models['vectorizer'].transform(sample_df['notes_combined'])
        X_cat = self._models['ohe'].transform(sample_df[['gender', 'situation', 'concentrate']])
        
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            X_num = self._models['scaler'].transform(sample_df[['price', 'size']])
        
        total_dim = X_cat.shape[1] + X_notes.shape[1] + X_num.shape[1]
        logger.info(f"Calculated input dimension for autoencoder: {total_dim}")
        
        return total_dim

# ============================================================================
# FLASK APPLICATION
# ============================================================================

class PerfumeAPI:
    """Clean Flask API wrapper"""
    
    def __init__(self, config: AppConfig):
        self.config = config
        self.app = Flask(__name__)

        # ✔️ KONFIGURASI CORS DITAMBAHKAN DI SINI
        # ====================================================================
        origins = [
            "http://localhost:5173",
            "https://harumnesia.web.id"
        ]
        CORS(self.app, resources={r"/*": {"origins": origins}})
        # ====================================================================
        
        # Configure Flask for production
        self.app.config['ENV'] = 'production' if not config.debug else 'development'
        self.app.config['TESTING'] = False
        self.app.config['JSON_SORT_KEYS'] = False
        
        # Security headers
        @self.app.after_request
        def after_request(response):
            response.headers['X-Content-Type-Options'] = 'nosniff'
            response.headers['X-Frame-Options'] = 'DENY'
            response.headers['X-XSS-Protection'] = '1; mode=block'
            return response
        
        # Initialize services via factory. This will raise an exception on failure.
        factory = ServiceFactory(config)
        self.recommendation_service = factory.create_recommendation_service()
        
        # Register routes and error handlers
        self._register_routes()
        self._register_error_handlers()
    
    def _register_routes(self):
        """Register API routes"""
        
        @self.app.route('/health', methods=['GET'])
        def health_check():
            """Health check endpoint"""
            return jsonify({
                "status": "healthy",
                "service": "perfume-recommendation-api"
            })
        
        @self.app.route('/recommend', methods=['POST'])
        def recommend():
            """Main recommendation endpoint"""
            try:
                # Parse and validate request
                data = request.get_json()
                if not data:
                    return jsonify({"error": "Invalid JSON input"}), 400
                
                # --- VALIDASI INPUT MANUAL SEBELUM MEMBUAT OBJEK ---
                required_fields = ['gender', 'situation', 'concentrate', 'size', 'min_price', 'max_price', 'description']
                for field in required_fields:
                    if field not in data or data[field] is None:
                        return jsonify({"error": f"Missing required field: '{field}'"}), 400
                
                # Validasi tipe data untuk field angka
                numeric_fields = ['size', 'min_price', 'max_price']
                for field in numeric_fields:
                    if not isinstance(data[field], (int, float)):
                        return jsonify({"error": f"Field '{field}' must be a number."}), 400
                # --- AKHIR DARI BLOK VALIDASI ---

                # Sekarang aman untuk membuat objek
                perfume_request = PerfumeRequest(
                    gender=data['gender'],
                    situation=data['situation'],
                    concentrate=data['concentrate'],
                    size=data['size'],
                    min_price=data['min_price'],
                    max_price=data['max_price'],
                    description=data['description'],
                    top_k=data.get('top_k', 10)
                )
                
                # Generate recommendations
                result = self.recommendation_service.generate_recommendations(perfume_request)
                
                return jsonify({
                    "cluster": result.cluster,
                    "extracted_notes": result.extracted_notes,
                    "total_in_cluster": result.total_in_cluster,
                    "filtered_count": result.filtered_count,
                    "recommendations": result.recommendations
                })
                
            except (ValidationException, ValueError) as e:
                logger.warning(f"Validation error: {e}")
                return jsonify({"error": f"Validation error: {str(e)}"}), 400
            except RecommendationException as e:
                logger.error(f"Recommendation error: {e}", exc_info=self.config.debug)
                return jsonify({"error": f"Recommendation error: {str(e)}"}), 500
            except Exception as e:
                logger.error(f"Unexpected error in recommend endpoint: {e}", exc_info=self.config.debug)
                return jsonify({"error": "An unexpected internal server error occurred"}), 500
    
    def _register_error_handlers(self):
        """Register error handlers"""
        
        @self.app.errorhandler(404)
        def not_found(error):
            return jsonify({"error": "Endpoint not found"}), 404
        
        @self.app.errorhandler(500)
        def internal_error(error):
            return jsonify({"error": "An internal server error occurred"}), 500
    
    def run(self):
        """Run the Flask application (for development only)"""
        if os.getenv('GUNICORN_RUN'):
            # This check prevents the dev server from running when served by Gunicorn
            return
            
        logger.info(f"🚀 Starting Perfume Recommendation API on {self.config.host}:{self.config.port}")
        logger.warning("⚠️  Running in development mode. Use Gunicorn for production!")
        
        # Suppress werkzeug logs for cleaner output
        if not self.config.debug:
            werkzeug_logger = logging.getLogger('werkzeug')
            werkzeug_logger.setLevel(logging.ERROR)
        
        self.app.run(
            host=self.config.host,
            port=self.config.port,
            debug=self.config.debug,
            threaded=True,
            use_reloader=False # Reloader can cause issues with models loaded in memory
        )

# ============================================================================
# APPLICATION FACTORY & MAIN (REVISED FOR EFFICIENCY)
# ============================================================================

def create_api_instance() -> PerfumeAPI:
    """
    Creates, configures, and returns the full PerfumeAPI instance.
    This function is the single entry point for all initializations.
    """
    try:
        config = AppConfig()
        api = PerfumeAPI(config)
        return api
    except (ModelLoadingException, ValueError, FileNotFoundError) as e:
        logger.critical(f"FATAL: Application failed to initialize. {e}")
        # Re-raise the exception to ensure the process exits cleanly.
        raise

# This is the entry point for WSGI servers like Gunicorn.
# They look for a global variable named 'app'.
# We create the full API instance once and expose its Flask 'app' attribute.
api_instance = create_api_instance()
app = api_instance.app

# This block only runs when you execute `python app.py` directly.
if __name__ == '__main__':
    # We don't need to re-create the app. We just call the `run` method
    # on the instance we already created above.
    logger.info("Starting development server via __main__...")
    api_instance.run()
