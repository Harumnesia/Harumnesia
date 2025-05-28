import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import luminosImg from "../assets/parfum-luminos.jpg";
import chnoImg from "../assets/parfum-chno.jpg";
import farhamptonImg from "../assets/parfum-farhampton.jpg";
import { apiRequest, API_ENDPOINTS } from "../config/api";

// Default image mapping for when MongoDB images aren't available
const defaultImages = {
  Farhampton: farhamptonImg,
  Luminos: luminosImg,
  CHNO: chnoImg,
  Azuria: chnoImg,
  Elysium: luminosImg,
  Noir: farhamptonImg,
};

// Search bar component
const SearchBar = ({ searchQuery, onSearchChange, onClearSearch }) => {
  return (
    <div className="relative max-w-lg mx-auto mb-12 px-4 md:px-0">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gold via-yellow-400 to-gold rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
        <div className="relative bg-white rounded-xl shadow-lg border border-gray-200">
          <input
            type="text"
            placeholder="Cari parfum berdasarkan nama atau brand..."
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
            Mencari: "{searchQuery}"
          </span>
        </div>
      )}
    </div>
  );
};

// Perfume card component restyled to match the image
const PerfumeCard = ({ id, image, brand, name, price }) => {
  // Ensure all required data exists
  const safeName = name || "Nama tidak tersedia";
  const safeBrand = brand || "Brand tidak tersedia";
  const safePrice = price || "Harga tidak tersedia";
  const safeId = id || Math.random().toString(36);

  // Skip rendering if absolutely no data
  if (!safeName || safeName === "undefined") {
    console.warn("Skipping invalid perfume data:", { id, name, brand });
    return null;
  }

  // Fallback to default image based on name or first default image
  const imgSrc =
    image && image.startsWith("http")
      ? image
      : defaultImages[safeName] || Object.values(defaultImages)[0];

  return (
    <Link
      to={`/perfume/${safeId}`}
      className="block bg-white rounded-xl overflow-hidden hover:shadow-gold hover:translate-y-[-5px] transition-all duration-300 relative group"
    >
      <div className="relative overflow-hidden">
        <img
          src={imgSrc}
          alt={safeName}
          className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </div>
      <div className="p-4 relative">
        <div className="mb-1">
          <span className="text-dark-blue font-inter text-xs uppercase group-hover:text-gold transition-colors duration-300">
            {safeBrand}
          </span>
        </div>
        <h2 className="font-playfair font-bold text-xl text-dark-gray mb-2 group-hover:text-dark-blue transition-colors duration-300">
          {safeName}
        </h2>
        <div className="flex justify-between items-center">
          <span className="bg-black text-white font-inter font-medium text-sm px-3 py-1 rounded-md group-hover:bg-gold group-hover:text-black transition-all duration-300">
            {safePrice}
          </span>
          <span className="text-light-gray font-inter text-sm">30ml XDP</span>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
      </div>
    </Link>
  );
};

// Pagination component
const Pagination = ({ currentPage, totalPages, loading, onPageChange }) => {
  // Fungsi untuk menampilkan nomor halaman dengan pembatasan
  const getDisplayedPageNumbers = () => {
    // Jika total halaman kurang dari 10, tampilkan semua
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Jika halaman saat ini di awal (1-5)
    if (currentPage <= 5) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, "...", totalPages];
    }

    // Jika halaman saat ini di akhir (totalPages-4 sampai totalPages)
    if (currentPage >= totalPages - 4) {
      return [
        1,
        "...",
        totalPages - 8,
        totalPages - 7,
        totalPages - 6,
        totalPages - 5,
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // Jika halaman saat ini di tengah, tampilkan beberapa di sekitarnya
    return [
      1,
      "...",
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      "...",
      totalPages,
    ];
  };

  const displayedPageNumbers = getDisplayedPageNumbers();

  return (
    <div className="flex justify-center mt-10 mb-16 flex-wrap gap-2">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={loading}
          className="bg-gray-200 text-gray-800 font-inter font-medium px-3 py-2 rounded-lg text-sm hover:bg-gray-300 transition-colors"
        >
          &laquo; Prev
        </button>
      )}

      {displayedPageNumbers.map((number, index) =>
        number === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="flex items-center px-4 py-2"
          >
            ...
          </span>
        ) : (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            disabled={loading || currentPage === number}
            className={`font-inter font-medium min-w-10 px-3 py-2 rounded-lg text-sm transition-colors ${
              currentPage === number
                ? "bg-gold text-black"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {number}
          </button>
        )
      )}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={loading}
          className="bg-gray-200 text-gray-800 font-inter font-medium px-3 py-2 rounded-lg text-sm hover:bg-gray-300 transition-colors"
        >
          Next &raquo;
        </button>
      )}
    </div>
  );
};

const Catalog = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [allPerfumes, setAllPerfumes] = useState([]); // Store all perfumes for search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPerfumes, setTotalPerfumes] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Filter perfumes based on search query
  const filteredPerfumes = useMemo(() => {
    if (!searchQuery.trim()) {
      return perfumes;
    }

    const query = searchQuery.toLowerCase().trim();
    return allPerfumes.filter((perfume) => {
      // Safely check if name exists and is a string
      const name = perfume.name || perfume.perfume || "";
      const brand = perfume.brand || "";

      return (
        (typeof name === "string" && name.toLowerCase().includes(query)) ||
        (typeof brand === "string" && brand.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, allPerfumes, perfumes]);

  // Calculate pagination for filtered results
  const paginatedPerfumes = useMemo(() => {
    if (isSearching) {
      const startIndex = (currentPage - 1) * 12; // 12 items per page
      const endIndex = startIndex + 12;
      return filteredPerfumes.slice(startIndex, endIndex);
    }
    return perfumes;
  }, [filteredPerfumes, currentPage, isSearching, perfumes]);

  const searchTotalPages = useMemo(() => {
    if (isSearching) {
      return Math.ceil(filteredPerfumes.length / 12);
    }
    return totalPages;
  }, [filteredPerfumes.length, isSearching, totalPages]);

  useEffect(() => {
    fetchPerfumes(currentPage);
  }, [currentPage]);

  // Fetch all perfumes for search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      fetchAllPerfumes();
    }
  }, [searchQuery]);

  // Reset search when searchQuery is cleared
  useEffect(() => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
      setCurrentPage(1);
    }
  }, [searchQuery]);
  const fetchAllPerfumes = async () => {
    try {
      console.log("Fetching all perfumes for search...");
      const data = await apiRequest(API_ENDPOINTS.PERFUMES);

      // Validate and clean the data before storing
      const cleanedData = data.map((perfume) => ({
        ...perfume,
        name: perfume.name || perfume.perfume || `Perfume ${perfume._id}`,
        brand: perfume.brand || "Unknown Brand",
      }));

      setAllPerfumes(cleanedData);
      console.log("All perfumes fetched for search:", cleanedData.length);
    } catch (error) {
      console.error("Error fetching all perfumes:", error);
      // Set empty array on error to prevent further issues
      setAllPerfumes([]);
    }
  };
  const fetchPerfumes = async (page) => {
    try {
      setLoading(true);
      console.log(`Memulai fetch data parfum halaman ${page}...`);

      // Use the new API endpoint with pagination
      const data = await apiRequest(API_ENDPOINTS.PERFUMES_BY_PAGE(page));

      console.log("Status respons:", "200");

      console.log("Perfumes dari API:", data); // Log untuk debugging
      console.log("Jumlah parfum:", data.count); // Log jumlah total parfum

      setPerfumes(data.perfumes);
      setTotalPages(data.pages);
      setTotalPerfumes(data.count);
      console.log("Parfum berhasil disimpan ke state");

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error); // Log error
      setError(error.message);
      setLoading(false);

      // Fallback to mock data if API fails
      console.log("Menggunakan data fallback karena error");
      setPerfumes([
        {
          _id: 1,
          image: farhamptonImg,
          brand: "HMNS",
          name: "Farhampton",
          formattedPrice: "Rp 189.000",
        },
        {
          _id: 2,
          image: luminosImg,
          brand: "HMNS",
          name: "Luminos",
          formattedPrice: "Rp 189.000",
        },
        {
          _id: 3,
          image: chnoImg,
          brand: "HMNS",
          name: "CHNO",
          formattedPrice: "Rp 189.000",
        },
      ]);
    }
  };

  // Handle pagination change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle search query change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching

    if (query.trim()) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setCurrentPage(1);
  };

  // Log for debugging state values
  console.log("Perfumes:", perfumes);
  console.log("Current page:", currentPage);
  console.log("Total perfumes:", totalPerfumes);
  console.log("Total pages:", totalPages);

  return (
    <>
      <Navbar />
      <div className="bg-dark-gray py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-6">
              Semua Parfum
            </h1>
            <p className="text-white">
              {isSearching
                ? `Ditemukan ${filteredPerfumes.length} parfum untuk "${searchQuery}"`
                : `Total: ${totalPerfumes} parfum`}
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
              <p>Memuat parfum...</p>
            </div>
          ) : (
            <>
              {/* Main content - perfume grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(isSearching ? paginatedPerfumes : perfumes).map((perfume) => {
                  // Safely extract perfume data with fallbacks
                  const perfumeId =
                    perfume["ID Perfume"] || perfume.perfumeId || perfume._id;
                  const perfumeName =
                    perfume.name || perfume.perfume || `Perfume ${perfumeId}`;
                  const perfumeBrand = perfume.brand || "Unknown Brand";
                  const perfumePrice =
                    perfume.formattedPrice ||
                    (perfume.price
                      ? `Rp ${perfume.price.toLocaleString("id-ID")}`
                      : "Harga tidak tersedia");

                  return (
                    <PerfumeCard
                      key={perfumeId}
                      id={perfumeId}
                      image={perfume.image}
                      brand={perfumeBrand}
                      name={perfumeName}
                      price={perfumePrice}
                    />
                  );
                })}
              </div>

              {/* No results message */}
              {isSearching && filteredPerfumes.length === 0 && (
                <div className="text-center text-white py-10">
                  <p className="text-xl">
                    Tidak ada parfum yang ditemukan untuk "{searchQuery}"
                  </p>
                  <button
                    onClick={handleClearSearch}
                    className="mt-4 bg-gold text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    Hapus Pencarian
                  </button>
                </div>
              )}

              {/* Pagination */}
              <div className="w-full overflow-x-auto pb-4">
                {(isSearching ? searchTotalPages : totalPages) > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={isSearching ? searchTotalPages : totalPages}
                    loading={loading}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Catalog;
