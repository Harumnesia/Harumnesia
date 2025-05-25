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
    <Link to={`/perfume/${id}`} className="block">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <img src={imgSrc} alt={name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h3 className="text-dark-blue font-inter font-medium text-xl">
            {brand}
          </h3>
          <h2 className="font-playfair font-bold text-3xl text-dark-gray mb-4">
            {name}
          </h2>
          <div className="flex justify-between items-center">
            <span className="bg-black text-white font-inter font-medium px-4 py-2 rounded-md">
              {price}
            </span>
            <span className="text-light-gray font-inter font-medium">
              {volume || "30ml"} {concentration || "XDP"}
            </span>
          </div>
        </div>
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
    <section className="bg-dark-gray py-24 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-6">
            Parfum Lokal Pilihan
          </h2>
          <p className="font-inter font-medium text-xl md:text-2xl text-white max-w-3xl mx-auto">
            Koleksi parfum lokal terbaik dari berbagai merek Indonesia, dipilih
            khusus untuk berbagai kesempatan dan preferensi
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white/10 rounded-xl h-96 animate-pulse"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-400 mb-16">
            <p>Gagal memuat parfum: {error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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

        <div className="text-center mb-12">
          <h3 className="font-playfair font-bold text-3xl md:text-4xl text-white mb-8">
            Temukan Parfum yang Cocok untuk Anda
          </h3>
          <Link to="/catalog">
            <button className="bg-gold text-black font-inter font-medium px-8 py-4 rounded-2xl text-xl hover:bg-opacity-90 transition-colors border-2 border-white">
              Lihat Semua Parfum
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
