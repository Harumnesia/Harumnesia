import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Brand list item component
const BrandListItem = ({ name }) => {
  // Use the exact brand name for the URL to preserve case sensitivity
  const brandUrlName = encodeURIComponent(name);

  // Debug output untuk URL
  console.log(`Brand URL for ${name}: /brand/${brandUrlName}`);

  return (
    <div>
      <Link
        to={`/brand/${brandUrlName}`}
        className="block py-4 text-white hover:text-gold transition-colors"
      >
        <h2 className="font-playfair font-bold text-xl md:text-2xl">{name}</h2>
      </Link>
      <hr className="border-gray-700" />
    </div>
  );
};

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      // Mengakses API yang baru dibuat untuk mengambil daftar brand dari parfumdb
      const response = await fetch(
        "http://localhost:5001/api/perfumes/brands",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch brands: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Brands from API:", data);
      console.log("Total brands:", data.length);

      // Urutkan brand secara alfabetis untuk kemudahan pencarian
      const sortedBrands = [...data].sort((a, b) =>
        a.localeCompare(b, "id", { sensitivity: "base" })
      );
      setBrands(sortedBrands);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setError(error.message);
      setLoading(false);

      // Fallback data
      setBrands([
        "HMNS",
        "Soft And Co",
        "Kenwood",
        "Valorant",
        "Belleza",
        "mykonos",
      ]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-dark-gray min-h-screen py-16 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-6">
              Semua Brand
            </h1>
            <p className="text-white">Total: {brands.length} brand</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>Error: {error}</p>
            </div>
          )}

          {/* Loading state */}
          {loading ? (
            <div className="text-center text-white py-10">
              <p>Memuat brands...</p>
            </div>
          ) : (
            /* Brand List with horizontal dividers */
            <div>
              <hr className="border-gray-700" />
              {brands.map((brand, index) => (
                <BrandListItem key={index} name={brand} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Brands;
