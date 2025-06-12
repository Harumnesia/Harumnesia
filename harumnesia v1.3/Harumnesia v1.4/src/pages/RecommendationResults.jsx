import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import luminosImg from "../assets/parfum-luminos.jpg";
import chnoImg from "../assets/parfum-chno.jpg";
import farhamptonImg from "../assets/parfum-farhampton.jpg";

// PerfumeCard component with enhanced design and consistent layout
const PerfumeCard = ({
  id,
  image,
  brand,
  name,
  price,
  volume,
  concentration,
  description,
  situation,
}) => {
  // Format price to ensure consistent format "Rp xxx.xxx"
  const formatPrice = (priceStr) => {
    if (!priceStr) return "Rp 189.000";

    // Convert to string if it's not already a string
    const priceString = String(priceStr);

    // Extract numbers from the price string
    const numbers = priceString.replace(/[^\d]/g, "");
    if (!numbers) return "Rp 189.000";

    // Format with thousands separator
    const formatted = parseInt(numbers).toLocaleString("id-ID");
    return `Rp ${formatted}`;
  };

  return (
    <Link to={`/perfume/${id}`} className="block group h-full">
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:border-gold/30 transform-gpu hover-lift-card shadow-smooth h-full flex flex-col">
        {/* Optimized image container */}
        <div className="relative overflow-hidden h-48">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transform-gpu transition-transform duration-200 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "/src/assets/parfum-luminos.jpg";
            }}
          />
          {/* Simplified gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

          {/* Simplified shine effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-300"></div>
        </div>

        {/* Content Container */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Header Section */}
          <div className="mb-3 flex-grow">
            <h3 className="text-dark-blue font-inter font-semibold text-xs tracking-wide uppercase mb-1 smooth-colors group-hover:text-gold">
              {brand}
            </h3>
            <h2 className="font-playfair font-bold text-lg text-dark-gray mb-2 leading-tight smooth-colors group-hover:text-dark-blue line-clamp-2">
              {name}
            </h2>
          </div>

          {/* Bottom Section - Price and Volume */}
          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="flex justify-between items-end">
              {/* Price */}
              <div className="flex-1">
                <span className="bg-gradient-to-r from-dark-gray to-gray-800 text-white font-inter font-bold px-4 py-2 rounded-xl text-sm shadow-md shadow-smooth group-hover:shadow-lg smooth-colors group-hover:bg-gold group-hover:text-gold inline-block">
                  {formatPrice(price)}
                </span>
              </div>

              {/* Volume and Concentration */}
              <div className="text-right">
                {volume && (
                  <span className="text-gray-500 font-inter font-medium text-xs block mb-1">
                    {volume}
                  </span>
                )}
                {concentration && (
                  <span className="text-gold font-inter font-semibold text-sm smooth-colors group-hover:text-gold">
                    {concentration}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Simplified bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/50 via-gold to-gold/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
      </div>
    </Link>
  );
};

const RecommendationResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [recommendations, setRecommendations] = useState([]);
  const [formData, setFormData] = useState(null);
  const [mlData, setMlData] = useState(null); // Store ML metadata
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Determine if this is from similarity or preference-based recommendation
  const isFromSimilarity = location.pathname.includes("similarity");

  useEffect(() => {
    // Get data from localStorage
    const savedResults = localStorage.getItem("recommendationResults");
    const savedFormData = localStorage.getItem("recommendationFormData");

    if (savedResults && savedFormData) {
      try {
        const results = JSON.parse(savedResults);
        const formData = JSON.parse(savedFormData);

        console.log("📊 Loaded recommendation results:", results);

        // Store ML metadata
        if (results.cluster !== undefined) {
          setMlData({
            cluster: results.cluster,
            extractedNotes: results.extracted_notes,
            filteredCount: results.filtered_count,
            totalInCluster: results.total_in_cluster,
            enhanced: results.enhanced,
          });
        }

        setRecommendations(results.recommendations || results || []);
        setFormData(formData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error parsing saved data:", error);
        setError("Terjadi kesalahan saat memuat hasil rekomendasi");
        setIsLoading(false);
      }
    } else {
      // If no saved data, show fallback data
      setRecommendations(fallbackRecommendations);
      setIsLoading(false);
    }
  }, []);

  // Fallback static recommendation data with MongoDB ObjectId format
  const fallbackRecommendations = [
    {
      _id: "64a7c8b2e4b0a1234567890a",
      image: farhamptonImg,
      brand: "HMNS",
      name: "Farhampton",
      price: "Rp 189.000",
      volume: "30ml",
      concentration: "XDP",
      description: "Aroma segar dengan sentuhan woody yang elegan",
    },
    {
      _id: "64a7c8b2e4b0a1234567890b",
      image: luminosImg,
      brand: "Mykonos",
      name: "Luminos",
      price: "Rp 189.000",
      volume: "30ml",
      concentration: "XDP",
      description: "Parfum floral yang memikat dengan aroma citrus",
    },
    {
      _id: "64a7c8b2e4b0a1234567890c",
      image: chnoImg,
      brand: "Saff&Co",
      name: "CHNO",
      price: "Rp 189.000",
      volume: "30ml",
      concentration: "XDP",
      description: "Kombinasi oriental dan fresh yang menawan",
    },
    {
      _id: "64a7c8b2e4b0a1234567890d",
      image: farhamptonImg,
      brand: "Azuria",
      name: "Ocean Breeze",
      price: "Rp 175.000",
      volume: "35ml",
      concentration: "EDT",
      description: "Kesegaran laut dengan sentuhan marine",
    },
    {
      _id: "64a7c8b2e4b0a1234567890e",
      image: luminosImg,
      brand: "Elysium",
      name: "Golden Dawn",
      price: "Rp 210.000",
      volume: "30ml",
      concentration: "XDP",
      description: "Luxury oriental dengan aroma vanilla dan amber",
    },
    {
      _id: "64a7c8b2e4b0a1234567890f",
      image: chnoImg,
      brand: "Noir",
      name: "Midnight",
      price: "Rp 195.000",
      volume: "30ml",
      concentration: "XDP",
      description: "Aroma misterius dengan base note yang mendalam",
    },
  ];

  const handleRetry = () => {
    if (isFromSimilarity) {
      navigate("/recommendation/similarity");
    } else {
      navigate("/recommendation");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-dark-gray">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <svg
              className="animate-spin h-12 w-12 text-gold mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-white text-lg">Memuat hasil rekomendasi...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-dark-gray">
        <Navbar />
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="text-red-500 mb-4">
              <svg
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-playfair font-bold text-gray-900 mb-2">
              Terjadi Kesalahan
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-gold text-white px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors duration-300"
            >
              Coba Lagi
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-dark-gray relative overflow-hidden">
      {/* Background ambient glow effects */}
      <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gold/10 rounded-full filter blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-gold/10 rounded-full filter blur-[120px] animate-pulse delay-1000"></div>

      <Navbar />

      <main className="flex-grow relative z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-block">
              <span className="font-inter text-gold font-semibold text-base lg:text-lg tracking-[0.2em] uppercase mb-6 block">
                AI Powered Results
              </span>
              <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-8 md:mb-12 leading-tight">
                Rekomendasi
                <span className="block bg-gradient-to-r from-gold via-white to-gold bg-clip-text text-transparent">
                  Buat Kamu
                </span>
              </h1>

              {/* Decorative divider */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold"></div>
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <div className="w-32 h-px bg-gold"></div>
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold"></div>
              </div>

              <p className="font-inter text-white/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light mb-8 px-4">
                Berdasarkan preferensi Anda, kami telah menemukan parfum lokal
                terbaik yang sesuai dengan karakter dan kebutuhan Anda
              </p>

              {/* User Preferences Summary */}
              {formData && (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto mb-8">
                  <h3 className="text-gold font-playfair font-semibold text-lg mb-4">
                    Preferensi Anda
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-white/80">
                    <div className="text-center">
                      <span className="block text-gold font-medium mb-1">
                        Gender
                      </span>
                      <span>{formData.gender}</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-gold font-medium mb-1">
                        Waktu
                      </span>
                      <span>
                        {formData.timeOfUse === "day"
                          ? "Siang"
                          : formData.timeOfUse === "night"
                          ? "Malam"
                          : "Versatile"}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="block text-gold font-medium mb-1">
                        Budget
                      </span>
                      <span>
                        {formData.budget === "low"
                          ? "< 150k"
                          : formData.budget === "medium"
                          ? "150k-300k"
                          : "> 300k"}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="block text-gold font-medium mb-1">
                        Konsentrasi
                      </span>
                      <span>{formData.concentration.toUpperCase()}</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-gold font-medium">
                        Ukuran
                      </span>
                      <span>
                        {formData.bottleSize === "travel"
                          ? "Travel"
                          : formData.bottleSize === "small"
                          ? "Small"
                          : "Large"}
                      </span>
                    </div>
                    {formData.aromaDescription && (
                      <div className="col-span-2 sm:col-span-1 text-center">
                        <span className="block text-gold font-medium">
                          Aroma
                        </span>
                        <span className="text-xs">
                          {formData.aromaDescription.slice(0, 30)}...
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Results Count */}
              <div className="mb-6 sm:mb-8">
                <p className="text-white/70 text-sm sm:text-base">
                  Ditemukan{" "}
                  <span className="text-gold font-semibold">
                    {recommendations.length}
                  </span>{" "}
                  parfum yang cocok untuk Anda
                </p>
              </div>

              {/* Retry Button - Enhanced Responsiveness */}
              <button
                onClick={handleRetry}
                className="group relative bg-gradient-to-r from-gold to-gold/90 hover:from-gold/90 hover:to-gold text-black font-inter font-semibold text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(245,213,122,0.4)] hover:scale-105 border border-gold/30 hover:border-gold/50 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 group-hover:rotate-180 transition-transform duration-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="hidden sm:inline">Ulangi Rekomendasi</span>
                  <span className="sm:hidden">Ulangi</span>
                </span>

                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl sm:rounded-2xl"></div>
              </button>
            </div>
          </div>

          {/* Recommendation Cards Grid - Consistent spacing and layout */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
              {recommendations.map((perfume, index) => {
                // Handle both ML API response and fallback data
                const perfumeData = {
                  id: perfume.ID_Perfume || perfume._id || perfume.id || index,
                  image: perfume.image || farhamptonImg,
                  brand: perfume.brand || perfume.Brand || "Local Brand",
                  name:
                    perfume.name ||
                    perfume.perfume ||
                    perfume.Name ||
                    "Parfum Rekomendasi",
                  price: perfume.price || perfume.Price || "189000",
                  volume: perfume.size
                    ? `${perfume.size}ml`
                    : perfume.volume || perfume.Volume || "30ml",
                  concentration:
                    perfume.concentrate ||
                    perfume.concentration ||
                    perfume.Concentration ||
                    "XDP",
                  description:
                    perfume.description ||
                    perfume.Description ||
                    "Parfum dengan aroma yang sesuai preferensi Anda",
                  situation: perfume.situation,
                };

                return (
                  <div
                    key={perfumeData.id}
                    className="w-full opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <PerfumeCard
                      id={perfumeData.id}
                      image={perfumeData.image}
                      brand={perfumeData.brand}
                      name={perfumeData.name}
                      price={perfumeData.price}
                      volume={perfumeData.volume}
                      concentration={perfumeData.concentration}
                      description={perfumeData.description}
                      situation={perfumeData.situation}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced CTA section - More Responsive */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 border border-gold/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] relative overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-50 rounded-2xl sm:rounded-3xl"></div>

              <div className="relative z-10">
                <h3 className="font-playfair font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-6 sm:mb-8 leading-tight">
                  Tidak Menemukan yang
                  <span className="block text-gold">Tepat?</span>
                </h3>
                <p className="font-inter text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
                  Jelajahi koleksi lengkap parfum lokal kami atau coba metode
                  rekomendasi yang berbeda
                </p>
                <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 justify-center">
                  <Link to="/catalog">
                    <button className="group relative bg-gradient-to-r from-gold via-gold to-gold/90 text-dark-gray font-inter font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg md:text-xl hover:shadow-[0_20px_40px_-12px_rgba(245,213,122,0.6)] transition-all duration-500 border-2 border-gold/30 hover:border-white transform hover:-translate-y-1 hover:scale-105 overflow-hidden w-full md:w-auto">
                      <span className="relative z-10 flex items-center justify-center">
                        <span className="hidden sm:inline">
                          Lihat Semua Parfum
                        </span>
                        <span className="sm:hidden">Semua Parfum</span>
                        <svg
                          className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                  </Link>
                  <Link to="/recommendation-method">
                    <button className="group relative bg-transparent text-white border-2 border-white/30 font-inter font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg md:text-xl hover:bg-white/10 hover:border-gold/50 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 w-full md:w-auto">
                      <span className="relative z-10">
                        <span className="hidden sm:inline">
                          Coba Metode Lain
                        </span>
                        <span className="sm:hidden">Metode Lain</span>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RecommendationResults;
