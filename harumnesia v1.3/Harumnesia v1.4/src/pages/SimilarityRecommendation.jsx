import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchableDropdown from "../components/SearchableDropdown";
import { callMLService } from "../config/mlService.js";
import {
  fetchAllBrandsForDropdown,
  fetchAllPerfumesForDropdown,
  apiRequest,
  API_ENDPOINTS,
} from "../config/api.js";
import luminosImg from "../assets/parfum-luminos.jpg";
import chnoImg from "../assets/parfum-chno.jpg";
import farhamptonImg from "../assets/parfum-farhampton.jpg";

// PerfumeCard component for results display
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
      <div className="relative bg-gradient-to-br from-white via-white to-cream rounded-2xl overflow-hidden shadow-lg border border-gold/20 hover:border-gold/40 transform-gpu hover-lift-card shadow-smooth h-full flex flex-col">
        {/* Optimized image container */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-40 sm:h-48 md:h-52 lg:h-56 xl:h-64 object-cover transform-gpu transition-transform duration-200 group-hover:scale-105"
          />
          {/* Simplified gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

          {/* Simplified shine effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-300"></div>
        </div>

        <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col flex-grow">
          <div className="mb-2 sm:mb-3 md:mb-4 flex-grow">
            <h3 className="text-dark-blue font-inter font-semibold text-xs sm:text-xs md:text-sm tracking-wide uppercase mb-1 smooth-colors group-hover:text-gold">
              {brand}
            </h3>
            <h2 className="font-playfair font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-dark-gray mb-1.5 sm:mb-2 leading-tight smooth-colors group-hover:text-dark-blue">
              {name}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-1 md:gap-0 mt-auto">
            <span className="bg-gradient-to-r from-dark-gray to-black text-white font-inter font-bold px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-md sm:rounded-lg md:rounded-xl text-xs sm:text-sm md:text-base shadow-lg shadow-smooth group-hover:shadow-xl smooth-colors group-hover:bg-gold group-hover:text-gold text-center sm:text-left">
              {formatPrice(price)}
            </span>
            <div className="text-center sm:text-right">
              <span className="text-light-gray font-inter font-medium text-xs block">
                {volume}
              </span>
              <span className="text-gold font-inter font-semibold text-xs sm:text-sm md:text-base smooth-colors group-hover:text-gold">
                {concentration}
              </span>
            </div>
          </div>
        </div>

        {/* Simplified bottom gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/50 via-gold to-gold/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
      </div>
    </Link>
  );
};

const SimilarityRecommendation = () => {
  // Form states
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [perfumeName, setPerfumeName] = useState(""); // Keep for backward compatibility

  // Data states
  const [brands, setBrands] = useState([]);
  const [perfumes, setPerfumes] = useState([]);
  const [filteredPerfumes, setFilteredPerfumes] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Result states
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  // Load dropdown data on component mount
  useEffect(() => {
    const loadDropdownData = async () => {
      setIsLoadingData(true);
      try {
        const [brandsResponse, perfumesResponse] = await Promise.all([
          fetchAllBrandsForDropdown(),
          fetchAllPerfumesForDropdown(),
        ]);

        if (brandsResponse.success) {
          setBrands(
            brandsResponse.data.all.map((brand) => ({
              value: brand,
              label: brand,
              name: brand,
            }))
          );
        }

        if (perfumesResponse.success) {
          setPerfumes(perfumesResponse.data.all);
          setFilteredPerfumes(perfumesResponse.data.all);
        }
      } catch (error) {
        console.error("Error loading dropdown data:", error);
        setError("Gagal memuat data parfum");
      } finally {
        setIsLoadingData(false);
      }
    };

    loadDropdownData();
  }, []);

  // Filter perfumes when brand is selected
  useEffect(() => {
    if (selectedBrand) {
      const filtered = perfumes.filter(
        (perfume) =>
          perfume.brand.toLowerCase() === selectedBrand.value.toLowerCase()
      );
      setFilteredPerfumes(filtered);
      // Reset selected perfume if it doesn't match the new brand
      if (
        selectedPerfume &&
        selectedPerfume.brand.toLowerCase() !==
          selectedBrand.value.toLowerCase()
      ) {
        setSelectedPerfume(null);
      }
    } else {
      setFilteredPerfumes(perfumes);
    }
  }, [selectedBrand, perfumes]);

  // Update perfumeName for ML service compatibility
  useEffect(() => {
    if (selectedPerfume) {
      setPerfumeName(selectedPerfume.name);
    } else {
      setPerfumeName("");
    }
  }, [selectedPerfume]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handlePerfumeChange = (perfume) => {
    setSelectedPerfume(perfume);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!selectedPerfume) {
      setError("Silakan pilih parfum terlebih dahulu");
      return;
    }

    console.log("🚀 Form submitted with perfume:", {
      selected: selectedPerfume,
      perfumeName: selectedPerfume.name,
      brand: selectedBrand?.value || "Unknown",
    });

    setIsLoading(true);
    setHasSearched(true);
    setError("");

    try {
      // Call ML service directly using helper function
      const data = await callMLService(selectedPerfume.name);
      console.log("🔍 Raw ML Service Response:", data);

      // Handle different response formats
      let recommendedData = [];

      if (data.recommendations && Array.isArray(data.recommendations)) {
        // Handle the case where ML service returns recommendation objects with id field
        console.log(
          "ML Service returned recommendations:",
          data.recommendations
        );
        const perfumePromises = data.recommendations.map(
          async (recommendation) => {
            const originalId = recommendation.id; // Extract HRMN-XXXX ID
            try {
              const perfumeData = await apiRequest(
                API_ENDPOINTS.PERFUME_BY_ID(originalId)
              );

              console.log(
                `Fetched perfume data for ${originalId}:`,
                perfumeData
              );

              // Use the original ID from ML service (HRMN-XXXX format) for routing
              return {
                ...perfumeData,
                perfumeId: originalId, // Always use the HRMN-XXXX ID from ML service
                "ID Perfume": originalId,
                _id: originalId,
                originalMLId: originalId, // Keep track of the original ML service ID
                similarity_score: recommendation.similarity_score, // Preserve similarity score
              };
            } catch (error) {
              console.warn(
                `Failed to fetch perfume with ID ${originalId}:`,
                error
              );
              // Return data from ML service as fallback with the original ML ID
              return {
                _id: originalId,
                perfumeId: originalId,
                "ID Perfume": originalId,
                originalMLId: originalId,
                name: recommendation.perfume,
                brand: recommendation.brand,
                price: "Rp 189.000",
                volume: "30ml",
                concentration: "EDT",
                description: "",
                similarity_score: recommendation.similarity_score,
              };
            }
          }
        );

        recommendedData = await Promise.all(perfumePromises);
      } else if (data.ids && Array.isArray(data.ids)) {
        // Fetch actual perfume data for the recommended IDs
        console.log("ML Service returned IDs:", data.ids);
        const perfumePromises = data.ids.map(async (originalId) => {
          try {
            const perfumeData = await apiRequest(
              API_ENDPOINTS.PERFUME_BY_ID(originalId)
            );

            console.log(`Fetched perfume data for ${originalId}:`, perfumeData);

            // Use the original ID from ML service (HRMN-XXXX format) for routing
            return {
              ...perfumeData,
              perfumeId: originalId, // Always use the HRMN-XXXX ID from ML service
              "ID Perfume": originalId,
              _id: originalId,
              originalMLId: originalId, // Keep track of the original ML service ID
            };
          } catch (error) {
            console.warn(
              `Failed to fetch perfume with ID ${originalId}:`,
              error
            );
            // Return mock data as fallback with the original ML ID
            return {
              _id: originalId,
              perfumeId: originalId,
              "ID Perfume": originalId,
              originalMLId: originalId,
              name: `Parfum ${originalId}`,
              brand: "Brand Parfum",
              price: "Rp 189.000",
              volume: "30ml",
              concentration: "EDT",
              description: "",
            };
          }
        });

        recommendedData = await Promise.all(perfumePromises);
      } else if (Array.isArray(data)) {
        // Direct array of IDs - fetch actual perfume data
        console.log("ML Service returned direct array of IDs:", data);
        const perfumePromises = data.map(async (originalId) => {
          try {
            const perfumeData = await apiRequest(
              API_ENDPOINTS.PERFUME_BY_ID(originalId)
            );

            console.log(`Fetched perfume data for ${originalId}:`, perfumeData);

            // Use the original ID from ML service (HRMN-XXXX format) for routing
            return {
              ...perfumeData,
              perfumeId: originalId, // Always use the HRMN-XXXX ID from ML service
              "ID Perfume": originalId,
              _id: originalId,
              originalMLId: originalId, // Keep track of the original ML service ID
            };
          } catch (error) {
            console.warn(
              `Failed to fetch perfume with ID ${originalId}:`,
              error
            );
            // Return mock data as fallback with the original ML ID
            return {
              _id: originalId,
              perfumeId: originalId,
              "ID Perfume": originalId,
              originalMLId: originalId,
              name: `Parfum ${originalId}`,
              brand: "Brand Parfum",
              price: "Rp 189.000",
              volume: "30ml",
              concentration: "EDT",
              description: "",
            };
          }
        });

        recommendedData = await Promise.all(perfumePromises);
      }

      if (recommendedData.length > 0) {
        console.log("✅ Setting recommendations data:", recommendedData);
        console.log("✅ First recommendation ID fields:", {
          perfumeId: recommendedData[0]?.perfumeId,
          "ID Perfume": recommendedData[0]?.["ID Perfume"],
          _id: recommendedData[0]?._id,
          originalMLId: recommendedData[0]?.originalMLId,
        });
        setRecommendations(recommendedData);
        console.log(`✅ Found ${recommendedData.length} recommendations`);
      } else {
        setRecommendations([]);
        setError("Tidak ada rekomendasi yang ditemukan untuk parfum ini");
      }
    } catch (error) {
      console.error("❌ Error fetching recommendations:", error);
      setRecommendations([]);

      // Handle different types of errors
      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("fetch") ||
        error.name === "TypeError"
      ) {
        setError(
          "❌ Tidak dapat terhubung ke API service. Pastikan koneksi internet Anda stabil!"
        );
      } else if (
        error.message.includes("AbortError") ||
        error.name === "AbortError"
      ) {
        setError("⏱️ Request timeout - API tidak merespons dalam 10 detik");
      } else if (error.message.includes("500")) {
        setError("🔧 API mengalami error internal. Silakan coba lagi nanti.");
      } else if (error.message.includes("404")) {
        setError("🔍 Endpoint /recommendation tidak ditemukan di API");
      } else {
        setError(`⚠️ Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-gray">
      <Navbar />

      <main className="flex-grow bg-dark-gray">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16 max-w-7xl">
          {/* Form Section - Responsive Layout */}
          <div className="flex justify-center items-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
            <div className="w-full max-w-6xl bg-gradient-to-br from-white via-white to-cream rounded-xl sm:rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] sm:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_35px_80px_-12px_rgba(0,0,0,0.2)] transition-all duration-700 border border-gold/20 relative">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-50 rounded-2xl"></div>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-gold/10 rounded-full filter blur-2xl"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gold/10 rounded-full filter blur-2xl"></div>

              <div className="relative z-10">
                {/* Responsive Form Header */}
                <div className="text-center py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 lg:px-8">
                  <h1 className="font-playfair font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-dark-gray mb-1 sm:mb-2 leading-tight">
                    Temukan Parfum
                    <span className="text-gold bg-gradient-to-r from-gold to-gold/80 bg-clip-text text-transparent ml-1 sm:ml-2">
                      Serupa
                    </span>
                  </h1>
                </div>

                {/* Responsive Form Fields */}
                <form
                  onSubmit={handleSubmit}
                  className="px-3 sm:px-4 md:px-6 lg:px-8 pb-4 sm:pb-6 md:pb-8"
                >
                  <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 relative overflow-visible">
                    {/* Loading State for Data */}
                    {isLoadingData && (
                      <div className="text-center py-4">
                        <div className="inline-flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gold/30 border-t-gold"></div>
                          <span className="text-dark-gray text-sm">
                            Memuat data parfum...
                          </span>
                        </div>
                      </div>
                    )}

                    {!isLoadingData && (
                      <>
                        {/* Brand Dropdown */}
                        <div className="w-full relative">
                          <SearchableDropdown
                            label="Brand Parfum"
                            options={brands}
                            value={selectedBrand}
                            onChange={handleBrandChange}
                            placeholder="Pilih brand parfum"
                            searchPlaceholder="Cari brand..."
                            className="w-full"
                            renderOption={(option) => (
                              <div className="flex items-center">
                                <span className="font-medium">
                                  {option.label}
                                </span>
                              </div>
                            )}
                          />
                        </div>

                        {/* Perfume Name Dropdown */}
                        <div className="w-full relative">
                          <SearchableDropdown
                            label="Nama Parfum"
                            options={filteredPerfumes}
                            value={selectedPerfume}
                            onChange={handlePerfumeChange}
                            placeholder="Pilih parfum yang ingin dicari kemiripannya"
                            searchPlaceholder="Cari nama parfum..."
                            className="w-full"
                            renderOption={(option) => (
                              <div className="flex flex-col">
                                <span className="font-medium text-dark-gray">
                                  {option.name}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center">
                                  <span className="mr-2">{option.brand}</span>
                                  <span
                                    className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                                      option.type === "local"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-blue-100 text-blue-700"
                                    }`}
                                  >
                                    {option.type === "local"
                                      ? "Lokal"
                                      : "Inter"}
                                  </span>
                                </span>
                              </div>
                            )}
                          />
                        </div>

                        {/* Selected Perfume Info */}
                        {selectedPerfume && (
                          <div className="w-full p-3 sm:p-4 bg-gradient-to-br from-gold/10 to-cream/30 border border-gold/20 rounded-lg sm:rounded-xl">
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-gold rounded-full"></div>
                              <div className="flex-1">
                                <p className="font-inter font-semibold text-sm text-dark-gray">
                                  Parfum yang dipilih:
                                </p>
                                <p className="font-inter text-sm text-gray-600">
                                  <span className="font-medium">
                                    {selectedPerfume.brand}
                                  </span>{" "}
                                  - {selectedPerfume.name}
                                  <span
                                    className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                                      selectedPerfume.type === "local"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-blue-100 text-blue-700"
                                    }`}
                                  >
                                    {selectedPerfume.type === "local"
                                      ? "Parfum Lokal"
                                      : "Parfum Internasional"}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Submit Button */}
                    <div className="w-full flex justify-center">
                      <button
                        type="submit"
                        disabled={
                          isLoading || !selectedPerfume || isLoadingData
                        }
                        className="group relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-auto lg:px-8 xl:px-12 h-[40px] sm:h-[44px] md:h-[48px] bg-gradient-to-r from-gold via-gold to-gold/90 hover:from-gold/90 hover:via-gold hover:to-gold text-dark-gray font-inter font-bold text-xs sm:text-sm rounded-lg sm:rounded-xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_15px_30px_rgba(245,213,122,0.4)] hover:scale-[1.02] border-2 border-gold/30 hover:border-gold/50 overflow-hidden transform hover:-translate-y-1"
                      >
                        <span className="relative z-10 flex items-center justify-center whitespace-nowrap px-4">
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-dark-gray mr-1.5 sm:mr-2"></div>
                              <span className="hidden sm:inline">
                                Mencari...
                              </span>
                              <span className="sm:hidden">...</span>
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 transition-transform duration-300 group-hover:rotate-12"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                              <span className="hidden sm:inline">
                                Cari Parfum Serupa
                              </span>
                              <span className="sm:hidden">Cari</span>
                            </>
                          )}
                        </span>

                        {/* Button hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      </button>
                    </div>
                  </div>
                </form>

                {/* Error Display - Enhanced Responsiveness */}
                {error && (
                  <div className="px-3 sm:px-4 md:px-6 lg:px-8 pb-3 sm:pb-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <p className="text-red-700 font-inter text-xs sm:text-sm">
                        {error}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Section - Enhanced Responsiveness */}
          {hasSearched && (
            <div className="mt-8 sm:mt-12 md:mt-16">
              {isLoading ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="inline-flex flex-col items-center space-y-3 sm:space-y-4">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-gold/30 border-t-gold"></div>
                      <div className="absolute inset-0 rounded-full bg-gold/10 animate-pulse"></div>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <span className="text-white text-lg sm:text-xl font-inter font-semibold">
                        Mencari parfum serupa...
                      </span>
                      <p className="text-white/70 text-xs sm:text-sm font-inter">
                        Sedang menganalisis karakteristik parfum pilihan Anda
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Results Header - Enhanced Responsiveness */}
                  <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <div className="inline-block mb-4 sm:mb-6">
                      <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-gold/50 via-gold to-gold/50 rounded-full mx-auto mb-4 sm:mb-6"></div>
                    </div>
                    <h2 className="font-playfair font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 sm:mb-6 leading-tight">
                      Parfum Serupa
                      <span className="block text-gold bg-gradient-to-r from-gold to-gold/80 bg-clip-text text-transparent">
                        untuk Anda
                      </span>
                    </h2>
                    <div className="max-w-3xl mx-auto px-4">
                      <p className="font-inter text-white/90 text-base sm:text-lg md:text-xl mb-3 sm:mb-4 leading-relaxed">
                        Berdasarkan pilihan Anda pada parfum
                        <span className="inline-block mx-1 sm:mx-2 px-2 sm:px-3 py-0.5 sm:py-1 bg-gold/20 text-gold font-semibold rounded text-sm sm:text-base border border-gold/30">
                          {perfumeName}
                        </span>
                      </p>
                      <p className="font-inter text-white/70 text-sm sm:text-base leading-relaxed">
                        Berikut adalah rekomendasi parfum dengan karakteristik
                        dan profil aroma yang serupa
                      </p>
                    </div>

                    {/* Decorative divider - Responsive */}
                    <div className="flex items-center justify-center space-x-2 sm:space-x-4 mt-6 sm:mt-8">
                      <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-gold/60"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gold/60 rounded-full"></div>
                      <div className="w-16 sm:w-32 h-px bg-gold/60"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gold/60 rounded-full"></div>
                      <div className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-gold/60"></div>
                    </div>
                  </div>

                  {/* Recommendations Grid - Optimized for Mobile & Tablet */}
                  {recommendations.length > 0 ? (
                    <div className="w-full">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-stretch">
                        {recommendations.map((perfume, index) => {
                          // Debug: Log the perfume object and extracted ID
                          const extractedId =
                            perfume.perfumeId ||
                            perfume["ID Perfume"] ||
                            perfume._id;
                          console.log(`Recommendation ${index}:`, {
                            perfume: perfume,
                            extractedId: extractedId,
                            perfumeId: perfume.perfumeId,
                            "ID Perfume": perfume["ID Perfume"],
                            _id: perfume._id,
                            originalMLId: perfume.originalMLId,
                          });

                          return (
                            <div
                              key={perfume._id || perfume.perfumeId || index}
                              className="w-full opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                              style={{ animationDelay: `${index * 0.15}s` }}
                            >
                              <PerfumeCard
                                id={extractedId}
                                image={
                                  perfume.image ||
                                  (index % 3 === 0
                                    ? farhamptonImg
                                    : index % 3 === 1
                                    ? luminosImg
                                    : chnoImg)
                                }
                                brand={perfume.brand || "Local Brand"}
                                name={
                                  perfume.name || perfume.perfume || "Perfume"
                                }
                                price={perfume.price || "Rp 189000"}
                                volume={perfume.volume || "30ml"}
                                concentration={perfume.concentration || "EDT"}
                                description={
                                  perfume.description || perfume.notes || ""
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    // Enhanced Empty state - More responsive
                    <div className="text-center py-12 sm:py-16">
                      <div className="max-w-md mx-auto px-4">
                        <div className="mb-6 sm:mb-8">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center">
                            <svg
                              className="w-10 h-10 sm:w-12 sm:h-12 text-gold/60"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.007-5.824-2.696M15 3.29A7.962 7.962 0 0012 3c-2.34 0-4.29 1.007-5.824 2.696M15 3.29a7.962 7.962 0 010 5.418M9 3.29a7.962 7.962 0 000 5.418"
                              />
                            </svg>
                          </div>
                          <h3 className="font-playfair font-bold text-xl sm:text-2xl text-white mb-3 sm:mb-4">
                            Tidak Ada Rekomendasi
                          </h3>
                          <p className="font-inter text-white/70 text-base sm:text-lg leading-relaxed">
                            Maaf, kami tidak dapat menemukan parfum serupa untuk
                            <span className="inline-block mx-1 sm:mx-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gold/20 text-gold font-semibold rounded text-sm sm:text-base">
                              {perfumeName}
                            </span>
                            saat ini.
                          </p>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                          <p className="font-inter text-white/60 text-xs sm:text-sm">
                            Coba dengan parfum lain atau jelajahi metode
                            rekomendasi berbeda
                          </p>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                            <button
                              onClick={() => {
                                setPerfumeName("");
                                setRecommendations([]);
                                setHasSearched(false);
                                setError("");
                              }}
                              className="px-4 sm:px-6 py-2 bg-gradient-to-r from-gold to-gold/90 text-dark-gray font-inter font-semibold text-sm rounded-lg hover:from-gold/90 hover:to-gold transition-all duration-300 hover:scale-105"
                            >
                              Coba Lagi
                            </button>
                            <Link to="/recommendation">
                              <button className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-transparent text-white border border-white/30 font-inter font-semibold text-sm rounded-lg hover:bg-white/10 hover:border-gold/50 transition-all duration-300 hover:scale-105">
                                Metode Kuesioner
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Additional Actions - More Responsive */}
                  <div className="text-center mt-8 sm:mt-12">
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-gold/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-50 rounded-2xl sm:rounded-3xl"></div>

                      <div className="relative z-10">
                        <h3 className="font-playfair font-bold text-xl sm:text-2xl md:text-3xl text-white mb-3 sm:mb-4">
                          Tidak Menemukan yang Tepat?
                        </h3>
                        <p className="font-inter text-white/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl mx-auto px-4">
                          Coba metode rekomendasi lainnya atau jelajahi koleksi
                          lengkap parfum lokal kami
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                          <Link to="/recommendation">
                            <button className="group relative bg-gradient-to-r from-gold to-gold/90 hover:from-gold/90 hover:to-gold text-black font-inter font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:scale-105 w-full sm:w-auto">
                              <span className="relative z-10">
                                Coba Metode Kuesioner
                              </span>
                            </button>
                          </Link>

                          <Link to="/catalog">
                            <button className="group relative bg-transparent text-white border-2 border-white/30 font-inter font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base hover:bg-white/10 hover:border-gold/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                              <span className="relative z-10">
                                Lihat Semua Parfum
                              </span>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SimilarityRecommendation;
