import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Brands from "./pages/Brands";
import BrandDetail from "./pages/BrandDetail";
import Edukasi from "./pages/Edukasi";
import Recommendation from "./pages/Recommendation";
import AboutUs from "./pages/AboutUs";
import PerfumeDetail from "./pages/PerfumeDetail";

function App() {
  return (
    <Router>
      <div className="font-inter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/:brandId" element={<BrandDetail />} />
          <Route path="/edukasi" element={<Edukasi />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/perfume/:id" element={<PerfumeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
