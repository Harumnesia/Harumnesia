import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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

// Perfume card component restyled to match the image
const PerfumeCard = ({ id, image, brand, name, price }) => {
  // Skip rendering if required data is missing
  if (!name || !brand) {
    console.warn("Missing required data for PerfumeCard:", { id, name, brand });
    return null;
  }

  // Fallback to default image based on name or first default image
  const imgSrc =
    image && image.startsWith("http")
      ? image
      : defaultImages[name] || Object.values(defaultImages)[0];

  return (
    <Link
      to={`/perfume/${id}`}
      className="block bg-white rounded-xl overflow-hidden hover:shadow-gold hover:translate-y-[-5px] transition-all duration-300 relative group"
    >
      <div className="relative overflow-hidden">
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </div>
      <div className="p-4 relative">
        <div className="mb-1">
          <span className="text-dark-blue font-inter text-xs uppercase group-hover:text-gold transition-colors duration-300">
            {brand}
          </span>
        </div>
        <h2 className="font-playfair font-bold text-xl text-dark-gray mb-2 group-hover:text-dark-blue transition-colors duration-300">
          {name}
        </h2>
        <div className="flex justify-between items-center">
          <span className="bg-black text-white font-inter font-medium text-sm px-3 py-1 rounded-md group-hover:bg-gold group-hover:text-black transition-all duration-300">
            {price || "Price unavailable"}
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPerfumes, setTotalPerfumes] = useState(0);

  useEffect(() => {
    fetchPerfumes(currentPage);
  }, [currentPage]);

  const fetchPerfumes = async (page) => {
    try {
      setLoading(true);
      console.log(`Memulai fetch data parfum halaman ${page}...`);

      // Use the new API endpoint with pagination
      const response = await fetch(
        `http://localhost:5001/api/perfumes/page/${page}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Status respons:", response.status);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch perfumes: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
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
            <p className="text-white">Total: {totalPerfumes} parfum</p>
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
              <p>Memuat parfum...</p>
            </div>
          ) : (
            <>
              {/* Main content - perfume grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {perfumes.map((perfume) => (
                  <PerfumeCard
                    key={
                      perfume["ID Perfume"] || perfume.perfumeId || perfume._id
                    }
                    id={
                      perfume["ID Perfume"] || perfume.perfumeId || perfume._id
                    }
                    image={perfume.image}
                    brand={perfume.brand}
                    name={perfume.name}
                    price={
                      perfume.formattedPrice ||
                      `Rp ${perfume.price.toLocaleString("id-ID")}`
                    }
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="w-full overflow-x-auto pb-4">
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
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
