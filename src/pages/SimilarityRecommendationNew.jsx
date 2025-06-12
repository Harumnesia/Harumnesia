import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest, API_ENDPOINTS } from "../config/api";

const SimilarityRecommendation = () => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [perfumeName, setPerfumeName] = useState("");
  const [allPerfumes, setAllPerfumes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filteredPerfumes, setFilteredPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all perfumes for similarity recommendations
  useEffect(() => {
    const fetchSimilarityOptions = async () => {
      try {
        setLoading(true);
        const data = await apiRequest(API_ENDPOINTS.SIMILARITY_OPTIONS);

        console.log("Similarity options data:", data);
        setAllPerfumes(data);

        // Extract unique brands and sort them
        const uniqueBrands = [
          ...new Set(data.map((perfume) => perfume.brand)),
        ].sort();
        setBrands(uniqueBrands);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching similarity options:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSimilarityOptions();
  }, []);

  // Filter perfumes when brand is selected
  useEffect(() => {
    if (brand) {
      const filtered = allPerfumes.filter((perfume) => perfume.brand === brand);
      setFilteredPerfumes(filtered);
      setPerfumeName(""); // Reset perfume selection when brand changes
    } else {
      setFilteredPerfumes([]);
      setPerfumeName("");
    }
  }, [brand, allPerfumes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (brand && perfumeName) {
      console.log("Form submitted with:", { brand, perfumeName });
      // Navigate to similarity-based results page with the selected perfume data
      navigate("/recommendation/similarity/results", {
        state: { selectedBrand: brand, selectedPerfume: perfumeName },
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-dark-gray">
        <Navbar />
        <main className="flex-grow bg-dark-gray flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading perfume options...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-dark-gray">
        <Navbar />
        <main className="flex-grow bg-dark-gray flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 text-lg mb-4">
              Error loading data: {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gold text-black px-6 py-2 rounded-lg font-medium"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-dark-gray">
      <Navbar />

      <main className="flex-grow bg-dark-gray">
        <div className="container mx-auto px-4 py-16 max-w-6xl flex justify-center items-center min-h-[calc(100vh-90px)]">
          {/* Form Section */}
          <div className="w-full max-w-[659px] bg-white rounded-lg shadow-md">
            {/* Form Header */}
            <div className="text-center py-6">
              <h1 className="font-playfair font-bold text-2xl md:text-3xl text-black mb-2">
                Temukan Parfum Serupa
              </h1>
              <p className="font-josefin font-light text-xs md:text-sm text-black max-w-[472px] mx-auto px-4">
                Pilih parfum yang Anda sukai untuk mendapatkan rekomendasi
                parfum serupa dari koleksi lokal dan internasional
              </p>
            </div>

            <hr className="border-gray-300 mx-1" />

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="px-6 py-4">
              {/* Brand Field */}
              <div className="mb-4">
                <label
                  htmlFor="brand"
                  className="block mb-1 font-josefin font-medium text-base"
                >
                  Brand :
                </label>
                <div className="relative">
                  <select
                    id="brand"
                    className="w-full h-[46px] px-4 py-2 bg-cream border border-gray-300 rounded-lg font-josefin text-base appearance-none focus:outline-none focus:border-gold"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Pilih brand
                    </option>
                    {brands.map((brandName) => (
                      <option key={brandName} value={brandName}>
                        {brandName}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Perfume Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="perfumeName"
                  className="block mb-1 font-josefin font-medium text-base"
                >
                  Perfume Name :
                </label>
                <div className="relative">
                  <select
                    id="perfumeName"
                    className="w-full h-[46px] px-4 py-2 bg-cream border border-gray-300 rounded-lg font-josefin text-base appearance-none focus:outline-none focus:border-gold"
                    value={perfumeName}
                    onChange={(e) => setPerfumeName(e.target.value)}
                    required
                    disabled={!brand}
                  >
                    <option value="" disabled>
                      {!brand ? "Pilih brand terlebih dahulu" : "Pilih parfum"}
                    </option>
                    {filteredPerfumes.map((perfume) => (
                      <option key={perfume._id} value={perfume.name}>
                        {perfume.name}{" "}
                        {perfume.isLocal ? "(Local)" : "(International)"}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Data Info */}
              {allPerfumes.length > 0 && (
                <div className="mb-4 text-sm text-gray-600">
                  <p>
                    Available: {allPerfumes.filter((p) => p.isLocal).length}{" "}
                    local perfumes,{" "}
                    {allPerfumes.filter((p) => !p.isLocal).length} international
                    perfumes
                  </p>
                  {brand && (
                    <p>
                      {brand}: {filteredPerfumes.length} perfumes available
                    </p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={!brand || !perfumeName}
                  className="w-full h-[40px] bg-gold hover:bg-gold/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-inter font-medium text-base rounded-lg transition-colors"
                >
                  Cari Parfum Serupa
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SimilarityRecommendation;
