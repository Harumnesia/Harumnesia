import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import luminosImg from "../assets/parfum-luminos.jpg";
import chnoImg from "../assets/parfum-chno.jpg";
import farhamptonImg from "../assets/parfum-farhampton.jpg";

// Default image mapping for when MongoDB images aren't available
const defaultImages = {
  Farhampton: farhamptonImg,
  Luminos: luminosImg,
  CHNO: chnoImg,
  Azuria: chnoImg,
  Elysium: luminosImg,
  Noir: farhamptonImg,
};

const PerfumeCard = ({
  id,
  image,
  brand,
  name,
  price,
  volume,
  concentration,
}) => {
  // Use default image as fallback
  const imgSrc =
    image && image.startsWith("http")
      ? image
      : defaultImages[name] || Object.values(defaultImages)[0];

  return (
    <Link to={`/perfume/${id}`} className="block group">
      <div className="relative bg-gradient-to-br from-white via-white to-cream rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] hover:shadow-[0_35px_80px_-12px_rgba(0,0,0,0.3)] transition-all duration-700 transform hover:-translate-y-4 hover:scale-[1.02] border border-gold/20 hover:border-gold/40">
        {/* Image container with overlay effects */}
        <div className="relative overflow-hidden">
          <img
            src={imgSrc}
            alt={name}
            className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Shine effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <h3 className="text-dark-blue font-inter font-semibold text-lg tracking-wide uppercase mb-2 group-hover:text-gold transition-colors duration-300">
              {brand}
            </h3>
            <h2 className="font-playfair font-bold text-3xl xl:text-4xl text-dark-gray mb-4 leading-tight group-hover:text-dark-blue transition-colors duration-300">
              {name}
            </h2>
          </div>

          <div className="flex justify-between items-center">
            <span className="bg-gradient-to-r from-dark-gray to-black text-white font-inter font-bold px-5 py-3 rounded-xl text-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              {price}
            </span>
            <div className="text-right">
              <span className="text-light-gray font-inter font-medium text-sm block">
                {volume || "30ml"}
              </span>
              <span className="text-gold font-inter font-semibold text-lg">
                {concentration || "XDP"}
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

const ContentSection = () => {
  const [featuredPerfumes, setFeaturedPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedPerfumes = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5001/api/perfumes");

        if (!response.ok) {
          throw new Error("Failed to fetch perfumes");
        }

        const data = await response.json();

        // Get 3 random perfumes from different brands if possible
        const uniqueBrands = [...new Set(data.map((p) => p.brand))];
        let selected = [];

        if (uniqueBrands.length >= 3) {
          // If we have at least 3 unique brands, select one perfume from each
          for (let i = 0; i < 3; i++) {
            const brandPerfumes = data.filter(
              (p) => p.brand === uniqueBrands[i]
            );
            if (brandPerfumes.length > 0) {
              selected.push(brandPerfumes[0]);
            }
          }
        }

        // If we don't have enough, just take the first 3 perfumes
        if (selected.length < 3) {
          selected = data.slice(0, 3);
        }

        setFeaturedPerfumes(selected);
      } catch (error) {
        console.error("Error fetching featured perfumes:", error);
        setError(error.message);

        // Fallback to static data if API fails
        setFeaturedPerfumes([
          {
            _id: "1",
            image: luminosImg,
            brand: "Mykonos",
            name: "Luminos",
            formattedPrice: "Rp 189.000",
            volume: "30ml",
            concentration: "XDP",
          },
          {
            _id: "2",
            image: chnoImg,
            brand: "Saff&Co",
            name: "CHNO",
            formattedPrice: "Rp 189.000",
            volume: "30ml",
            concentration: "XDP",
          },
          {
            _id: "3",
            image: farhamptonImg,
            brand: "HMNS",
            name: "Farhampton",
            formattedPrice: "Rp 189.000",
            volume: "30ml",
            concentration: "XDP",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPerfumes();
  }, []);

  return (
    <section className="relative bg-dark-gray py-32 px-8 md:px-16 overflow-hidden">
      {/* Simple background glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-gold/3 via-gold/1 to-transparent blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gold/2 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Sophisticated section header */}
        <div className="text-center mb-24">
          <div className="inline-block">
            <span className="font-inter text-gold font-semibold text-lg tracking-[0.2em] uppercase mb-6 block">
              Koleksi Eksklusif
            </span>
            <h2 className="font-playfair font-bold text-5xl md:text-7xl xl:text-8xl text-white mb-8 leading-[0.9]">
              Parfum Lokal
              <span className="block bg-gradient-to-r from-gold via-white to-gold bg-clip-text text-transparent">
                Pilihan
              </span>
            </h2>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold"></div>
              <div className="w-2 h-2 bg-gold rounded-full"></div>
              <div className="w-32 h-px bg-gold"></div>
              <div className="w-2 h-2 bg-gold rounded-full"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold"></div>
            </div>
            <p className="font-inter text-white/90 text-xl md:text-2xl xl:text-2xl max-w-4xl mx-auto leading-relaxed font-light">
              Koleksi parfum lokal terbaik dari berbagai merek Indonesia yang
              telah terpilih,
              <span className="text-gold font-medium">
                {" "}
                dirancang khusus untuk berbagai kesempatan dan preferensi
                istimewa
              </span>
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-20">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl h-96 animate-pulse border border-gold/10"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-400 mb-20">
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-xl">Gagal memuat parfum: {error}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-20">
            {featuredPerfumes.map((perfume) => (
              <PerfumeCard
                key={perfume._id}
                id={perfume.perfumeId || perfume["ID Perfume"] || perfume._id}
                image={perfume.image}
                brand={perfume.brand}
                name={perfume.name}
                price={
                  perfume.formattedPrice ||
                  `Rp ${perfume.price?.toLocaleString("id-ID") || "189.000"}`
                }
                volume={perfume.volume || perfume.size}
                concentration={perfume.concentration || perfume.concentrate}
              />
            ))}
          </div>
        )}

        {/* Enhanced CTA section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-12 md:p-16 border border-gold/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]">
            <h3 className="font-playfair font-bold text-4xl md:text-5xl xl:text-6xl text-white mb-8 leading-tight">
              Temukan Parfum yang
              <span className="block text-gold">Cocok untuk Anda</span>
            </h3>
            <p className="font-inter text-white/80 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Jelajahi koleksi lengkap parfum lokal premium dengan berbagai
              karakter dan nuansa yang menawan
            </p>
            <Link to="/catalog">
              <button className="group relative bg-gradient-to-r from-gold via-gold to-gold/90 text-dark-gray font-inter font-bold px-12 py-5 rounded-2xl text-xl xl:text-2xl hover:shadow-[0_20px_40px_-12px_rgba(245,213,122,0.6)] transition-all duration-500 border-2 border-gold/30 hover:border-white transform hover:-translate-y-1 hover:scale-105 overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Lihat Semua Parfum
                  <svg
                    className="ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
