import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.jpg";
import farhamptonImg from "../assets/parfum-farhampton.jpg";
import luminosImg from "../assets/parfum-luminos.jpg";
import chnoImg from "../assets/parfum-chno.jpg";
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

const defaultBrandImage = logo;

// Enhanced Perfume card component with luxury styling
const PerfumeCard = ({ id, image, brand, name, price, concentration }) => {
  // Skip rendering if required data is missing
  if (!name || !brand) {
    console.warn("Missing required data for PerfumeCard:", { id, name, brand });
    return null;
  }

  // Fallback to default image
  const imgSrc =
    image && image.startsWith("http")
      ? image
      : defaultImages[name] || Object.values(defaultImages)[0];

  return (
    <Link to={`/perfume/${id}`} className="block group">
      <div className="relative bg-gradient-to-br from-white via-white to-cream rounded-2xl overflow-hidden shadow-lg border border-gold/20 hover:border-gold/40 transform-gpu hover-lift-card shadow-smooth">
        {/* Simplified main card content */}
        <div className="relative z-10 bg-gradient-to-br from-white via-white to-cream rounded-2xl">
          {/* Optimized image container */}
          <div className="relative overflow-hidden rounded-t-2xl">
            <img
              src={imgSrc}
              alt={name}
              className="w-full h-52 object-cover transform-gpu transition-transform duration-200 group-hover:scale-105"
            />

            {/* Simplified overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

            {/* Simplified shine effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-300"></div>
          </div>

          <div className="p-5">
            <div className="mb-3">
              {/* Optimized brand styling */}
              <span className="text-dark-blue font-inter font-bold text-xs uppercase tracking-wider mb-2 block smooth-colors group-hover:text-gold">
                {brand}
              </span>

              {/* Optimized perfume name */}
              <h2 className="font-playfair font-bold text-xl text-dark-gray mb-3 leading-tight smooth-colors group-hover:text-dark-blue line-clamp-1">
                {name}
              </h2>
            </div>

            <div className="flex justify-between items-center">
              {/* Optimized price badge with better contrast */}
              <span className="bg-gradient-to-r from-dark-gray via-black to-dark-gray text-white font-inter font-bold px-4 py-2 rounded-xl text-sm shadow-lg shadow-smooth group-hover:shadow-xl smooth-colors group-hover:bg-gold group-hover:text-gold">
                {price || "Price unavailable"}
              </span>

              {/* Optimized concentration display */}
              <span className="text-light-gray font-inter font-semibold text-sm smooth-colors group-hover:text-gold">
                {concentration || "XDP"}
              </span>
            </div>
          </div>

          {/* Simplified bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/50 via-gold to-gold/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-b-2xl"></div>
        </div>
      </div>
    </Link>
  );
};

const BrandDetail = () => {
  const { brandName } = useParams();
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Decode the URL-encoded brand name
  const decodedBrandName = decodeURIComponent(brandName);

  useEffect(() => {
    console.log("Fetching data for brand:", decodedBrandName);
    fetchPerfumesByBrand();
  }, [decodedBrandName]);

  const fetchPerfumesByBrand = async () => {
    try {
      setLoading(true);
      // Fetch perfumes by brand using the new API
      console.log(`Fetching perfumes for brand: ${decodedBrandName}`);
      const response = await apiRequest(
        API_ENDPOINTS.PERFUMES_BY_BRAND(decodedBrandName)
      );

      // Handle different response structures
      const data = response.data || response || [];

      // Ensure data is an array before using length property
      if (!Array.isArray(data)) {
        console.warn("API response is not an array:", response);
        setProducts([]);
        setBrand({ name: decodedBrandName });
        setLoading(false);
        return;
      }

      console.log(
        `Found ${data.length} perfumes for brand: ${decodedBrandName}`
      );

      // Debug: Check the structure of the first few items
      if (data.length > 0) {
        console.log("Sample perfume data:", data[0]);
      }

      // Filter out any items without names and then sort
      const validData = data.filter((item) => item && item.name);

      // Log any invalid items
      if (validData.length < data.length) {
        console.warn(
          `Found ${
            data.length - validData.length
          } items without a name property`
        );
        console.warn(
          "Invalid items:",
          data.filter((item) => !item || !item.name)
        );
      }

      // Urutkan berdasarkan nama parfum
      const sortedData = [...validData].sort((a, b) =>
        a.name.localeCompare(b.name, "id", { sensitivity: "base" })
      );

      setProducts(sortedData);
      setBrand({ name: decodedBrandName }); // Set brand with the name
      setLoading(false);
    } catch (error) {
      console.error("Error fetching brand details:", error);
      setError(error.message);
      setLoading(false);

      // Fallback data if API fails
      setBrand({
        name: decodedBrandName,
        image: defaultBrandImage,
        description:
          "Brand parfum dengan karakter yang unik dan kualitas premium.",
        establishedYear: 2020,
        headquarters: "Indonesia",
        website: "www.example.com",
      });

      setProducts([
        {
          _id: "1",
          image: farhamptonImg,
          brand: decodedBrandName,
          name: "Farhampton",
          formattedPrice: "Rp 189.000",
        },
        {
          _id: "2",
          image: luminosImg,
          brand: decodedBrandName,
          name: "Luminos",
          formattedPrice: "Rp 189.000",
        },
        {
          _id: "3",
          image: chnoImg,
          brand: decodedBrandName,
          name: "CHNO",
          formattedPrice: "Rp 189.000",
        },
      ]);
    }
  };

  // Get brand logo image with fallback
  const getBrandImage = () => {
    if (!brand) return defaultBrandImage;
    return brand.image && brand.image.startsWith("http")
      ? brand.image
      : defaultBrandImage;
  };

  // Fungsi kembali ke halaman brands
  const goBackToBrands = () => {
    navigate("/brands");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-dark-gray py-20 px-8 text-center">
          <div className="animate-pulse">
            <p className="text-white text-xl">Loading brand details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="bg-dark-gray py-20 px-8 text-center">
          <p className="text-red-400 text-xl">Error: {error}</p>
          <button
            onClick={goBackToBrands}
            className="mt-6 bg-gold text-black font-inter font-medium px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors"
          >
            Kembali ke Daftar Brand
          </button>
        </div>
        <Footer />
      </>
    );
  }

  if (!brand) {
    return (
      <>
        <Navbar />
        <div className="bg-dark-gray py-20 px-8 text-center">
          <p className="text-white text-xl">Brand not found!</p>
          <button
            onClick={goBackToBrands}
            className="mt-6 bg-gold text-black font-inter font-medium px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors"
          >
            Kembali ke Daftar Brand
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="relative bg-dark-gray py-16 px-8 md:px-16 overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-gold/2 to-transparent blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gold/3 to-transparent"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Enhanced Breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center text-white/80 font-inter">
              <Link
                to="/"
                className="hover:text-gold transition-colors duration-300 hover:drop-shadow-sm"
              >
                Home
              </Link>
              <span className="mx-3 text-gold/60">/</span>
              <Link
                to="/brands"
                className="hover:text-gold transition-colors duration-300 hover:drop-shadow-sm"
              >
                Brands
              </Link>
              <span className="mx-3 text-gold/60">/</span>
              <span className="text-gold font-semibold drop-shadow-sm">
                {brand.name}
              </span>
            </div>
          </div>

          {/* Enhanced Brand Info Section */}
          <div className="relative bg-gradient-to-br from-white/95 via-white to-cream/90 backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-16 border border-gold/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0_35px_70px_-12px_rgba(245,213,122,0.2)] transition-all duration-700 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-gold/5 before:via-transparent before:to-gold/10 before:opacity-50">
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start">
              <div className="relative w-28 h-28 mr-8 mb-6 md:mb-0 group">
                {/* Brand logo with glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gold/40 via-gold/20 to-gold/40 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                <img
                  src={getBrandImage()}
                  alt={brand.name}
                  className="relative z-10 w-full h-full object-cover rounded-full border-2 border-gold/30 group-hover:border-gold/60 transition-all duration-500 group-hover:scale-105 shadow-lg"
                />
                {/* Logo shine effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="font-playfair font-bold text-4xl md:text-5xl text-dark-gray mb-4 leading-tight bg-gradient-to-r from-dark-gray via-black to-dark-gray bg-clip-text">
                  {brand.name}
                </h1>
                <p className="font-inter text-light-gray/90 text-lg leading-relaxed max-w-2xl">
                  {brand.description ||
                    "Brand parfum dengan karakter yang unik dan kualitas premium yang telah dipercaya oleh banyak pelanggan."}
                </p>
                {/* Decorative line */}
                <div className="flex items-center justify-center md:justify-start mt-6">
                  <div className="w-12 h-px bg-gradient-to-r from-gold to-gold/50"></div>
                  <div className="w-2 h-2 bg-gold rounded-full mx-2"></div>
                  <div className="w-12 h-px bg-gradient-to-l from-gold to-gold/50"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Products Header */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <span className="font-inter text-gold font-semibold text-lg tracking-[0.2em] uppercase mb-4 block">
                Koleksi Eksklusif
              </span>
              <h2 className="font-playfair font-bold text-4xl md:text-6xl xl:text-7xl text-white mb-6 leading-[0.9]">
                Produk {brand.name}
                <span className="block bg-gradient-to-r from-gold via-white to-gold bg-clip-text text-transparent">
                  Premium
                </span>
              </h2>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold"></div>
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <div className="w-24 h-px bg-gold"></div>
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold"></div>
              </div>
              <p className="font-inter font-medium text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Temukan{" "}
                <span className="text-gold font-semibold">
                  {products.length} parfum eksklusif
                </span>{" "}
                dari koleksi {brand.name}
              </p>
            </div>
          </div>

          {/* Enhanced Products Grid */}
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10 mb-16">
                {products.map((product) => (
                  <PerfumeCard
                    key={
                      product["ID Perfume"] || product.perfumeId || product._id
                    }
                    id={
                      product["ID Perfume"] || product.perfumeId || product._id
                    }
                    image={product.image}
                    brand={product.brand}
                    name={product.name}
                    price={
                      product.formattedPrice ||
                      `Rp ${product.price.toLocaleString("id-ID")}`
                    }
                    concentration={product.concentration || product.concentrate}
                  />
                ))}
              </div>

              {/* Enhanced back button */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gold/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] max-w-md mx-auto">
                  <button
                    onClick={goBackToBrands}
                    className="group relative bg-gradient-to-r from-gold via-gold to-gold/90 text-dark-gray font-inter font-bold px-8 py-4 rounded-xl text-lg border-2 border-gold/30 hover:border-white transform-gpu hover-lift shadow-smooth transition-all duration-200 overflow-hidden w-full"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <svg
                        className="mr-2 w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M7 16l-4-4m0 0l4-4m-4 4h18"
                        />
                      </svg>
                      Kembali ke Daftar Brand
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-300"></div>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-white py-16">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-12 border border-gold/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] max-w-md mx-auto">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
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
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <p className="text-xl mb-8">
                  Tidak ada produk yang tersedia untuk brand ini.
                </p>
                <button
                  onClick={goBackToBrands}
                  className="group relative bg-gradient-to-r from-gold via-gold to-gold/90 text-dark-gray font-inter font-bold px-8 py-4 rounded-xl text-lg border-2 border-gold/30 hover:border-white transform-gpu hover-lift shadow-smooth transition-all duration-200 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <svg
                      className="mr-2 w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                      />
                    </svg>
                    Kembali ke Daftar Brand
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-300"></div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BrandDetail;
