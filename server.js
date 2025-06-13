import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import brandRoutes from "./routes/brandRoutes.js";
import allPerfumeRoutes from "./routes/allPerfumeRoutes.js";
import interPerfumeRoutes from "./routes/interPerfumeRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

// Configure dotenv to read .env file from server directory
dotenv.config({
  path: path.join(path.dirname(fileURLToPath(import.meta.url)), ".env"),
});

// Connect to database
connectDB();

const app = express();

// Enhanced CORS configuration for production
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use("/api/perfumes", allPerfumeRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/inter", interPerfumeRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Harumnesia API',
    version: '1.0.0',
    docs: '/api/docs',
    health: '/health'
  });
});

// ML API Proxy Route
app.post("/api/ml/recommend", async (req, res) => {
  try {
    console.log("🔄 Proxying ML recommendation request:", req.body);

    const response = await fetch("https://ml.harumnesia.web.id/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ ML API Error:", response.status, errorText);
      return res.status(response.status).json({
        error: `ML API Error: ${response.statusText}`,
        details: errorText,
      });
    }

    const data = await response.json();
    console.log("✅ ML API Success, returning data");
    res.json(data);
  } catch (error) {
    console.error("❌ Proxy Error:", error);
    res.status(500).json({
      error: "Failed to connect to ML API",
      details: error.message,
    });
  }
});

// Set up for image uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
