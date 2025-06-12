import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest, API_ENDPOINTS } from "../config/api";

// Search bar component for brands
const SearchBar = ({ searchQuery, onSearchChange, onClearSearch }) => {
  return (
    <div className="relative max-w-lg mx-auto mb-12 px-4 md:px-0">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gold via-yellow-400 to-gold rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
        <div className="relative bg-white rounded-xl shadow-lg border border-gray-200">
          <input
            type="text"
            placeholder="Cari brand parfum favorit Anda..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-6 py-4 pl-14 pr-14 text-gray-800 bg-transparent rounded-xl focus:outline-none text-base placeholder-gray-500 font-light"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-red-500 transition-colors duration-200 flex items-center justify-center rounded-full hover:bg-red-50"
            >
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      {searchQuery && (
        <div className="mt-3 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold/20 text-gold border border-gold/30">
            <svg
              className="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            Mencari brand: "{searchQuery}"
          </span>
        </div>
      )}
    </div>
  );
};

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
  const [searchQuery, setSearchQuery] = useState("");

  // Filter brands based on search query
  const filteredBrands = useMemo(() => {
    if (!searchQuery.trim()) {
      return brands;
    }

    const query = searchQuery.toLowerCase().trim();
    return brands.filter((brand) => brand.toLowerCase().includes(query));
  }, [searchQuery, brands]);

  useEffect(() => {
    fetchBrands();
  }, []);

  // Handle search query change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery("");
  };
  const fetchBrands = async () => {
    try {
      setLoading(true);
      // Mengakses API yang baru dibuat untuk mengambil daftar brand dari parfumdb
      const response = await apiRequest(API_ENDPOINTS.PERFUME_BRANDS);
      console.log("Brands response from API:", response);

      // Extract the brands array from the response object
      const brandsData = response.data || response || [];
      console.log("Brands data:", brandsData);
      console.log("Total brands:", brandsData.length);

      // Urutkan brand secara alfabetis untuk kemudahan pencarian
      const sortedBrands = [...brandsData].sort((a, b) =>
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
            <p className="text-white">
              {searchQuery.trim()
                ? `Ditemukan ${filteredBrands.length} brand untuk "${searchQuery}"`
                : `Total: ${brands.length} brand`}
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
          />

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
            <>
              {/* Brand List with horizontal dividers */}
              {filteredBrands.length > 0 ? (
                <div>
                  <hr className="border-gray-700" />
                  {filteredBrands.map((brand, index) => (
                    <BrandListItem key={index} name={brand} />
                  ))}
                </div>
              ) : (
                /* No results message */
                <div className="text-center text-white py-10">
                  <p className="text-xl">
                    Tidak ada brand yang ditemukan untuk "{searchQuery}"
                  </p>
                  <button
                    onClick={handleClearSearch}
                    className="mt-4 bg-gold text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    Hapus Pencarian
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Brands;
