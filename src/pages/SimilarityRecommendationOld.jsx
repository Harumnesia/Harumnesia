import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import luminosImg from "../assets/parfum-luminos.jpg";
import chnoImg from "../assets/parfum-chno.jpg";
import farhamptonImg from "../assets/parfum-farhampton.jpg";
import { apiRequest, API_ENDPOINTS } from "../config/api";

// SearchableDropdown component
const SearchableDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  label,
  required = false,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm("");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  return (
    <div ref={dropdownRef} className="relative group">
      <label className="block mb-3 font-inter font-semibold text-sm text-dark-gray flex items-center">
        <div className="w-1 h-4 bg-gradient-to-b from-gold to-gold/60 rounded-full mr-2"></div>
        {label}
      </label>

      <div className="relative">
        <input
          type="text"
          className={`w-full h-[48px] px-5 py-3 bg-gradient-to-br from-cream/50 to-white border-2 border-gray-200 rounded-xl font-inter text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 hover:border-gold/50 hover:shadow-md group-hover:bg-white cursor-pointer ${
            disabled ? "opacity-60 cursor-not-allowed" : ""
          }`}
          placeholder={isOpen ? "Ketik untuk mencari..." : placeholder}
          value={
            isOpen ? searchTerm : selectedOption ? selectedOption.label : ""
          }
          onChange={handleSearchChange}
          onClick={handleInputClick}
          required={required}
          readOnly={!isOpen || disabled}
          disabled={disabled}
        />

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gold group-hover:text-gold/80 transition-colors duration-300">
          <svg
            className={`fill-current h-4 w-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-[9999] w-full mt-2 bg-white border-2 border-gold/30 rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="px-5 py-3 hover:bg-gold/10 cursor-pointer transition-colors duration-200 font-inter text-sm text-dark-gray border-b border-gray-100 last:border-b-0"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-5 py-3 text-gray-500 font-inter text-sm italic">
              Tidak ada hasil yang ditemukan
            </div>
          )}
        </div>
      )}
    </div>
  );
};

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
  similarity_score,
}) => {
  return (
    <Link to={`/perfume-static/${id}`} className="block group">
      <div className="relative bg-gradient-to-br from-white via-white to-cream rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] hover:shadow-[0_35px_80px_-12px_rgba(0,0,0,0.3)] transition-all duration-700 transform hover:-translate-y-4 hover:scale-[1.02] border border-gold/20 hover:border-gold/40">
        {/* Similarity Score Badge */}
        {similarity_score && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-gradient-to-r from-gold to-gold/80 text-dark-gray font-inter font-bold text-xs px-2 py-1 rounded-full shadow-lg">
              {(similarity_score * 100).toFixed(0)}% cocok
            </div>
          </div>
        )}

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

const SimilarityRecommendation = () => {
  const [brand, setBrand] = useState("");
  const [perfumeName, setPerfumeName] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [brandOptions, setBrandOptions] = useState([]);
  const [perfumeOptions, setPerfumeOptions] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingPerfumes, setLoadingPerfumes] = useState(false);
  const [error, setError] = useState("");

  // Fetch brands from AI service
  const fetchBrands = async () => {
    try {
      setLoadingBrands(true);
      const response = await apiRequest(API_ENDPOINTS.AI_BRANDS);

      if (response.success && response.data?.brands) {
        const brandOpts = response.data.brands.map((brand) => ({
          value: brand.toLowerCase(),
          label: brand,
        }));
        setBrandOptions(brandOpts);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      setError("Gagal memuat daftar brand. Silakan coba lagi.");
      // Fallback to default brands if API fails
      setBrandOptions([
        { value: "mykonos", label: "Mykonos" },
        { value: "kahf", label: "Kahf" },
        { value: "hmns", label: "HMNS" },
        { value: "saff&co", label: "Saff & Co" },
      ]);
    } finally {
      setLoadingBrands(false);
    }
  };

  // Fetch perfumes from AI service
  const fetchPerfumes = async (selectedBrand = null) => {
    try {
      setLoadingPerfumes(true);
      const endpoint = selectedBrand
        ? `${API_ENDPOINTS.AI_PERFUMES}?brand=${encodeURIComponent(
            selectedBrand
          )}`
        : API_ENDPOINTS.AI_PERFUMES;

      const response = await apiRequest(endpoint);

      if (response.success && response.data?.perfumes) {
        const perfumeOpts = response.data.perfumes.map((perfume) => ({
          value: perfume.name || perfume,
          label: perfume.name || perfume,
        }));
        setPerfumeOptions(perfumeOpts);
      }
    } catch (error) {
      console.error("Error fetching perfumes:", error);
      // Fallback to default perfumes if API fails
      setPerfumeOptions([
        { value: "california", label: "California" },
        { value: "wood sage", label: "Wood Sage & Sea Salt" },
        { value: "luminos", label: "Luminos" },
        { value: "farhampton", label: "Farhampton" },
        { value: "chno", label: "CHNO" },
      ]);
    } finally {
      setLoadingPerfumes(false);
    }
  };

  // Load brands on component mount
  useEffect(() => {
    fetchBrands();
    fetchPerfumes(); // Load all perfumes initially
  }, []);

  // Update perfumes when brand changes
  useEffect(() => {
    if (brand) {
      // Find the original brand name from brandOptions
      const selectedBrandOption = brandOptions.find(
        (option) => option.value === brand
      );
      const brandName = selectedBrandOption?.label;
      fetchPerfumes(brandName);
      setPerfumeName(""); // Reset perfume selection when brand changes
    }
  }, [brand, brandOptions]);

  // Get similarity recommendations
  const getRecommendations = async (selectedPerfume, selectedBrand) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await apiRequest(API_ENDPOINTS.AI_SIMILARITY, {
        method: "POST",
        body: JSON.stringify({
          perfume: selectedPerfume,
          brand: selectedBrand,
          num_recommendations: 8,
          only_local: true,
        }),
      });

      if (response.success && response.data?.recommendations) {
        // Transform AI response to match component's expected format
        const transformedRecommendations = response.data.recommendations.map(
          (rec, index) => ({
            _id: rec.index || index.toString(),
            image: getImageForPerfume(rec.Brand, rec.Name), // Helper function to get image
            brand: rec.Brand || rec.brand,
            name: rec.Name || rec.name,
            price: `Rp ${(Math.random() * 100000 + 150000)
              .toFixed(0)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`, // Placeholder price
            volume: "30ml", // Placeholder volume
            concentration: "XDP", // Placeholder concentration
            description:
              rec.Description ||
              rec.description ||
              `Parfum ${rec.Brand || rec.brand} dengan aroma yang memikat`,
            similarity_score: rec.similarity_score || rec.score,
          })
        );

        setRecommendations(transformedRecommendations);
      } else {
        throw new Error(response.message || "Tidak ada rekomendasi ditemukan");
      }
    } catch (error) {
      console.error("Error getting recommendations:", error);
      setError(
        error.message || "Gagal mendapatkan rekomendasi. Silakan coba lagi."
      );

      // Show fallback recommendations on error
      setRecommendations([
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
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get image for perfume (placeholder logic)
  const getImageForPerfume = (brand, name) => {
    const perfumeName = name?.toLowerCase() || "";
    if (perfumeName.includes("farhampton")) return farhamptonImg;
    if (perfumeName.includes("luminos")) return luminosImg;
    if (perfumeName.includes("chno")) return chnoImg;

    // Fallback to a default image based on brand
    const brandName = brand?.toLowerCase() || "";
    if (brandName.includes("hmns")) return farhamptonImg;
    if (brandName.includes("mykonos")) return luminosImg;
    return chnoImg; // Default fallback
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brand || !perfumeName) {
      setError("Harap pilih brand dan nama parfum");
      return;
    }

    console.log("Form submitted with:", { brand, perfumeName });

    const selectedBrandOption = brandOptions.find(
      (option) => option.value === brand
    );
    const selectedPerfumeOption = perfumeOptions.find(
      (option) => option.value === perfumeName
    );

    const brandName = selectedBrandOption?.label;
    const perfumeDisplayName = selectedPerfumeOption?.label;

    setHasSearched(true);
    await getRecommendations(perfumeDisplayName, brandName);
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-gray">
      <Navbar />

      <main className="flex-grow bg-dark-gray">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Form Section - Compact Horizontal Layout */}
          <div className="flex justify-center items-center mb-8">
            <div className="w-full max-w-6xl bg-gradient-to-br from-white via-white to-cream rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_35px_80px_-12px_rgba(0,0,0,0.2)] transition-all duration-700 border border-gold/20 relative">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-50 rounded-2xl"></div>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-gold/10 rounded-full filter blur-2xl"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gold/10 rounded-full filter blur-2xl"></div>

              <div className="relative z-10">
                {/* Compact Form Header */}
                <div className="text-center py-8 px-8">
                  <h1 className="font-playfair font-bold text-2xl md:text-3xl text-dark-gray mb-2 leading-tight">
                    Temukan Parfum
                    <span className="text-gold bg-gradient-to-r from-gold to-gold/80 bg-clip-text text-transparent ml-2">
                      Serupa
                    </span>
                  </h1>
                </div>

                {/* Horizontal Form Fields */}
                <form onSubmit={handleSubmit} className="px-8 pb-8">
                  {/* Error Message */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-red-500 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-red-700 font-inter text-sm">
                          {error}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row gap-6 items-end relative overflow-visible">
                    {/* Brand Field */}
                    <div className="flex-1 min-w-0 relative">
                      <SearchableDropdown
                        options={brandOptions}
                        value={brand}
                        onChange={setBrand}
                        placeholder={
                          loadingBrands
                            ? "Memuat brand..."
                            : "Pilih brand parfum"
                        }
                        label="Brand Parfum"
                        required={true}
                        disabled={loadingBrands}
                      />
                    </div>

                    {/* Perfume Name Field */}
                    <div className="flex-1 min-w-0 relative">
                      <SearchableDropdown
                        options={perfumeOptions}
                        value={perfumeName}
                        onChange={setPerfumeName}
                        placeholder={
                          loadingPerfumes
                            ? "Memuat parfum..."
                            : "Pilih nama parfum"
                        }
                        label="Nama Parfum"
                        required={true}
                        disabled={loadingPerfumes || !brand}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="lg:w-auto w-full">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative w-full lg:w-auto lg:px-10 h-[48px] bg-gradient-to-r from-gold via-gold to-gold/90 hover:from-gold/90 hover:via-gold hover:to-gold text-dark-gray font-inter font-bold text-sm rounded-xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_15px_30px_rgba(245,213,122,0.4)] hover:scale-[1.02] border-2 border-gold/30 hover:border-gold/50 overflow-hidden transform hover:-translate-y-1"
                      >
                        <span className="relative z-10 flex items-center justify-center whitespace-nowrap">
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-dark-gray mr-2"></div>
                              Mencari...
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12"
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
                              Temukan Parfum
                            </>
                          )}
                        </span>

                        {/* Button shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></div>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {hasSearched && (
            <div className="mt-16">
              {isLoading ? (
                <div className="text-center py-16">
                  <div className="inline-flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold/30 border-t-gold"></div>
                      <div className="absolute inset-0 rounded-full bg-gold/10 animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                      <span className="text-white text-xl font-inter font-semibold">
                        Mencari parfum serupa...
                      </span>
                      <p className="text-white/70 text-sm font-inter">
                        Sedang menganalisis karakteristik parfum pilihan Anda
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Results Header with enhanced styling */}
                  <div className="text-center mb-16">
                    <div className="inline-block mb-6">
                      <div className="w-20 h-1 bg-gradient-to-r from-gold/50 via-gold to-gold/50 rounded-full mx-auto mb-6"></div>
                    </div>
                    <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
                      Parfum Serupa
                      <span className="block text-gold bg-gradient-to-r from-gold to-gold/80 bg-clip-text text-transparent">
                        untuk Anda
                      </span>
                    </h2>
                    <div className="max-w-3xl mx-auto">
                      <p className="font-inter text-white/90 text-lg md:text-xl mb-4 leading-relaxed">
                        Berdasarkan pilihan Anda pada
                        <span className="inline-block mx-2 px-3 py-1 bg-gold/20 text-gold font-semibold rounded-lg border border-gold/30">
                          {brand}
                        </span>
                        -
                        <span className="inline-block mx-2 px-3 py-1 bg-gold/20 text-gold font-semibold rounded-lg border border-gold/30">
                          {perfumeName}
                        </span>
                      </p>
                      <p className="font-inter text-white/70 text-base leading-relaxed">
                        Berikut adalah rekomendasi parfum dengan karakteristik
                        dan profil aroma yang serupa
                      </p>
                    </div>

                    {/* Decorative divider */}
                    <div className="flex items-center justify-center space-x-4 mt-8">
                      <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/60"></div>
                      <div className="w-3 h-3 bg-gold/60 rounded-full"></div>
                      <div className="w-32 h-px bg-gold/60"></div>
                      <div className="w-3 h-3 bg-gold/60 rounded-full"></div>
                      <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/60"></div>
                    </div>
                  </div>

                  {/* Recommendations Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
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
                          similarity_score={perfume.similarity_score}
                        />
                      </div>
                    ))}
                  </div>

                  {/* No results message */}
                  {recommendations.length === 0 && !isLoading && (
                    <div className="text-center py-16">
                      <div className="inline-flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-gold"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="space-y-2">
                          <span className="text-white text-xl font-inter font-semibold">
                            Tidak Ada Rekomendasi
                          </span>
                          <p className="text-white/70 text-sm font-inter max-w-md">
                            Maaf, kami tidak dapat menemukan parfum serupa untuk
                            pilihan Anda. Coba dengan parfum atau brand lain.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Additional Actions */}
                  <div className="text-center mt-12">
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-gold/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-50 rounded-3xl"></div>

                      <div className="relative z-10">
                        <h3 className="font-playfair font-bold text-2xl md:text-3xl text-white mb-4">
                          Tidak Menemukan yang Tepat?
                        </h3>
                        <p className="font-inter text-white/80 text-lg mb-8 max-w-xl mx-auto">
                          Coba metode rekomendasi lainnya atau jelajahi koleksi
                          lengkap parfum lokal kami
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Link to="/recommendation">
                            <button className="group relative bg-gradient-to-r from-gold to-gold/90 hover:from-gold/90 hover:to-gold text-black font-inter font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105">
                              <span className="relative z-10">
                                Coba Metode Kuesioner
                              </span>
                            </button>
                          </Link>

                          <Link to="/catalog">
                            <button className="group relative bg-transparent text-white border-2 border-white/30 font-inter font-semibold px-6 py-3 rounded-xl hover:bg-white/10 hover:border-gold/50 transition-all duration-300 hover:scale-105">
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
