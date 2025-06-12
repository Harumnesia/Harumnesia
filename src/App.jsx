import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Brands from "./pages/Brands";
import BrandDetail from "./pages/BrandDetail";
import Edukasi from "./pages/Edukasi";
import Recommendation from "./pages/Recommendation";
import RecommendationMethod from "./pages/RecommendationMethod";
import SimilarityRecommendation from "./pages/SimilarityRecommendation";
import RecommendationResults from "./pages/RecommendationResults";
import AboutUs from "./pages/AboutUs";
import PerfumeDetail from "./pages/PerfumeDetail";
import PerfumeDetailStatic from "./pages/PerfumeDetailStatic";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="font-inter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/:brandId" element={<BrandDetail />} />
          <Route path="/brand/:brandName" element={<BrandDetail />} />
          <Route path="/edukasi" element={<Edukasi />} />
          <Route
            path="/recommendation-method"
            element={<RecommendationMethod />}
          />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route
            path="/recommendation/similarity"
            element={<SimilarityRecommendation />}
          />
          <Route
            path="/recommendation/results"
            element={<RecommendationResults />}
          />
          <Route
            path="/recommendation/similarity/results"
            element={<RecommendationResults />}
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/perfume/:id" element={<PerfumeDetail />} />
          <Route path="/perfume-static/:id" element={<PerfumeDetailStatic />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
