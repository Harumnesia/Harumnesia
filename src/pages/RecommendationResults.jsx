import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import luminosImg from "../assets/parfum-luminos.jpg";
import chnoImg from "../assets/parfum-chno.jpg";
import farhamptonImg from "../assets/parfum-farhampton.jpg";

// PerfumeCard component with enhanced design and description
const PerfumeCard = ({
  id,
  image,
  brand,
  name,
  price,
  volume,
  concentration,
  description,
}) => {
  return (
    <Link to={`/perfume-static/${id}`} className="block group">
      <div className="relative bg-gradient-to-br from-white via-white to-cream rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] hover:shadow-[0_35px_80px_-12px_rgba(0,0,0,0.3)] transition-all duration-700 transform hover:-translate-y-4 hover:scale-[1.02] border border-gold/20 hover:border-gold/40">
        {/* Image container with overlay effects */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Shine effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-dark-blue font-inter font-semibold text-sm tracking-wide uppercase mb-1 group-hover:text-gold transition-colors duration-300">
              {brand}
            </h3>
            <h2 className="font-playfair font-bold text-2xl text-dark-gray mb-2 leading-tight group-hover:text-dark-blue transition-colors duration-300">
              {name}
            </h2>
            {description && (
              <p className="text-light-gray font-inter text-sm leading-relaxed mb-4 line-clamp-2">
                {description}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="bg-gradient-to-r from-dark-gray to-black text-white font-inter font-bold px-4 py-2 rounded-xl text-base shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              {price}
            </span>
            <div className="text-right">
              <span className="text-light-gray font-inter font-medium text-xs block">
                {volume}
              </span>
              <span className="text-gold font-inter font-semibold text-base">
                {concentration}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/50 via-gold to-gold/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </div>
    </Link>
  );
};

const RecommendationResults = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if this is from similarity or preference-based recommendation
  const isFromSimilarity = location.pathname.includes("similarity");

  // Static recommendation data with expanded perfume list
  const recommendations = [
    {
      _id: "1",
      image: farhamptonImg,
      brand: "HMNS",
      name: "Farhampton",
      price: "Rp 189.000",
      volume: "30ml",
      concentration: "XDP",
      description: "Aroma segar dengan sentuhan woody yang elegan",
    },
    {
      _id: "2",
      image: luminosImg,
      brand: "Mykonos",
      name: "Luminos",
      price: "Rp 189.000",
      volume: "30ml",
      concentration: "XDP",
      description: "Parfum floral yang memikat dengan aroma citrus",
    },
    {
      _id: "3",
      image: chnoImg,
      brand: "Saff&Co",
      name: "CHNO",
      price: "Rp 189.000",
      volume: "30ml",
      concentration: "XDP",
      description: "Kombinasi oriental dan fresh yang menawan",
    },
    {
      _id: "4",
      image: farhamptonImg,
      brand: "Azuria",
      name: "Ocean Breeze",
      price: "Rp 175.000",
      volume: "35ml",
      concentration: "EDT",
      description: "Kesegaran laut dengan sentuhan marine",
    },
    {
      _id: "5",
      image: luminosImg,
      brand: "Elysium",
      name: "Golden Dawn",
      price: "Rp 210.000",
      volume: "30ml",
      concentration: "XDP",
      description: "Luxury oriental dengan aroma vanilla dan amber",
    },
    {
      _id: "6",
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

  return (
    <div className="min-h-screen flex flex-col bg-dark-gray relative overflow-hidden">
      {/* Background ambient glow effects */}
      <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gold/10 rounded-full filter blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-gold/10 rounded-full filter blur-[120px] animate-pulse delay-1000"></div>

      <Navbar />

      <main className="flex-grow relative z-10">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl">
          {/* Header Section with enhanced styling */}
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-block">
              <span className="font-inter text-gold font-semibold text-lg tracking-[0.2em] uppercase mb-6 block">
                AI Powered Results
              </span>
              <h1 className="font-playfair font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-8 md:mb-12 leading-tight">
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

              <p className="font-inter text-white/90 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light mb-8">
                Berdasarkan preferensi Anda, kami telah menemukan parfum lokal
                terbaik yang sesuai dengan karakter dan kebutuhan Anda
              </p>

              {/* Retry Button with enhanced styling */}
              <button
                onClick={handleRetry}
                className="group relative bg-gradient-to-r from-gold to-gold/90 hover:from-gold/90 hover:to-gold text-black font-inter font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(245,213,122,0.4)] hover:scale-105 border border-gold/30 hover:border-gold/50 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Ulangi Rekomendasi
                </span>

                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl"></div>
              </button>
            </div>
          </div>

          {/* Recommendation Cards Grid - Updated for 6 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-20">
            {recommendations.map((perfume, index) => (
              <div
                key={perfume._id}
                className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <PerfumeCard
                  id={perfume._id}
                  image={perfume.image}
                  brand={perfume.brand}
                  name={perfume.name}
                  price={perfume.price}
                  volume={perfume.volume}
                  concentration={perfume.concentration}
                  description={perfume.description}
                />
              </div>
            ))}
          </div>

          {/* Enhanced CTA section */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-12 md:p-16 border border-gold/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] relative overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-50 rounded-3xl"></div>

              <div className="relative z-10">
                <h3 className="font-playfair font-bold text-4xl md:text-5xl xl:text-6xl text-white mb-8 leading-tight">
                  Tidak Menemukan yang
                  <span className="block text-gold">Tepat?</span>
                </h3>
                <p className="font-inter text-white/80 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
                  Jelajahi koleksi lengkap parfum lokal kami atau coba metode
                  rekomendasi yang berbeda
                </p>
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center">
                  <Link to="/catalog">
                    <button className="group relative bg-gradient-to-r from-gold via-gold to-gold/90 text-dark-gray font-inter font-bold px-8 py-4 rounded-2xl text-xl hover:shadow-[0_20px_40px_-12px_rgba(245,213,122,0.6)] transition-all duration-500 border-2 border-gold/30 hover:border-white transform hover:-translate-y-1 hover:scale-105 overflow-hidden">
                      <span className="relative z-10 flex items-center">
                        Lihat Semua Parfum
                        <svg
                          className="ml-3 w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
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
                    <button className="group relative bg-transparent text-white border-2 border-white/30 font-inter font-semibold px-8 py-4 rounded-2xl text-xl hover:bg-white/10 hover:border-gold/50 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105">
                      <span className="relative z-10">Coba Metode Lain</span>
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
