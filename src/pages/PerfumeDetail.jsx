import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import chnoImg from "../assets/parfum-chno.jpg";
import luminosImg from "../assets/parfum-luminos.jpg";
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

// Enhanced similar parfum component for recommendations with glow effects
const SimilarPerfume = ({ id, image, brand, name, price }) => {
  // Skip rendering if required data is missing
  if (!name || !brand) {
    console.warn("Missing required data for SimilarPerfume:", {
      id,
      name,
      brand,
    });
    return null;
  }

  // Use default image as fallback
  const imgSrc =
    image && image.startsWith("http")
      ? image
      : defaultImages[name] || Object.values(defaultImages)[0];

  return (
    <Link to={`/perfume/${id}`} className="block group">
      <div className="relative bg-gradient-to-br from-white via-white to-cream rounded-2xl overflow-hidden shadow-[0_15px_35px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_-12px_rgba(245,213,122,0.25)] transition-all duration-700 transform hover:-translate-y-3 hover:scale-[1.02] border border-gold/20 hover:border-gold/40 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-gold/5 before:via-transparent before:to-gold/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
        {/* Glow effects */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/30 via-gold/15 to-gold/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg"></div>

        {/* Main card content */}
        <div className="relative z-10 bg-gradient-to-br from-white via-white to-cream rounded-2xl">
          {/* Enhanced image container */}
          <div className="relative overflow-hidden rounded-t-2xl">
            <img
              src={imgSrc}
              alt={name}
              className="w-full h-32 sm:h-40 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />

            {/* Image overlay effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Shine effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            {/* Floating sparkles */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-3 right-3 w-1 h-1 bg-gold rounded-full animate-pulse"></div>
              <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-500"></div>
            </div>
          </div>

          <div className="p-3 sm:p-4">
            <div className="mb-1">
              <span className="text-dark-blue font-inter text-xs uppercase tracking-wider font-semibold group-hover:text-gold transition-colors duration-300">
                {brand}
              </span>
            </div>
            <h2 className="font-playfair font-bold text-base sm:text-lg text-dark-gray mb-2 group-hover:text-dark-blue transition-colors duration-300 line-clamp-2">
              {name}
            </h2>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="bg-gradient-to-r from-black via-dark-gray to-black text-white font-inter font-medium text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-r group-hover:from-gold group-hover:via-gold group-hover:to-gold/90 group-hover:text-dark-gray text-center">
                {price || "Price unavailable"}
              </span>
              <span className="text-light-gray font-inter text-xs sm:text-sm group-hover:text-gold transition-colors duration-300 font-semibold text-center sm:text-right">
                30ml XDP
              </span>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/50 via-gold to-gold/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
        </div>
      </div>
    </Link>
  );
};

// Note Category component
const NoteCategory = ({ title, items }) => {
  // Return null if no items are provided
  if (!items) return null;

  // Convert string to array if it's not already
  const notesList = Array.isArray(items)
    ? items
    : items
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);

  // Return null if array is empty after processing
  if (notesList.length === 0) return null;

  return (
    <div className="mb-6 transform transition-all duration-700 hover:translate-x-1">
      <h3 className="font-inter font-semibold text-base mb-3 text-white flex items-center">
        <span className="inline-block w-8 h-[1px] bg-gradient-to-r from-gold/30 to-gold mr-3"></span>
        {title}
        <span className="inline-block w-8 h-[1px] bg-gradient-to-r from-gold to-gold/30 ml-3"></span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {notesList.map((item, index) => (
          <span
            key={index}
            className="bg-gradient-to-br from-white/15 to-white/5 text-white/90 px-4 py-1.5 rounded-lg text-sm border border-white/10 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-gold/30 hover:text-gold hover:shadow-gold/10 hover:shadow-lg hover:-translate-y-0.5 hover:scale-105 group relative"
          >
            {item}
            <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-gold/10 via-transparent to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </span>
        ))}
      </div>
    </div>
  );
};

const PerfumeDetail = () => {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);
  const [similarPerfumes, setSimilarPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerfumeDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5001/api/perfumes/${id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch perfume details: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Perfume data received:", data);
        console.log("Notes data:", {
          topNotes: data["top notes"] || data.topNotes || [],
          middleNotes: data["mid notes"] || data.middleNotes || [],
          baseNotes: data["base notes"] || data.baseNotes || [],
        });
        setPerfume(data);
        fetchSimilarPerfumes(data.brand);
      } catch (error) {
        console.error("Error fetching perfume details:", error);
        setError(error.message);

        // Fallback to mock data if API fails
        setPerfume({
          _id: id,
          image: chnoImg,
          brand: "Soft And Co",
          name: "CHNO",
          formattedPrice: "Rp 189.000",
          volume: "30ml",
          concentration: "XDP",
          gender: ["Wanita", "Siang"],
          topNotes: ["Lemon", "Bergamot", "Lavender", "Lime", "Mint"],
          middleNotes: ["Rose", "Jasmine", "Ylang-ylang", "Geranium", "Orchid"],
          baseNotes: ["Vanilla", "Musk", "Sandalwood", "Amber", "Cedar"],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPerfumeDetails();
  }, [id]);

  // Fetch similar perfumes by brand
  const fetchSimilarPerfumes = async (brandName) => {
    try {
      const response = await fetch(`http://localhost:5001/api/perfumes`);

      if (!response.ok) {
        throw new Error("Failed to fetch similar perfumes");
      }

      const allPerfumes = await response.json();

      // Get current perfume ID for proper comparison
      const currentPerfumeId = perfume
        ? perfume["ID Perfume"] || perfume.perfumeId || id
        : id;
      console.log(
        `Looking for similar perfumes to ${currentPerfumeId} from brand ${brandName}`
      );

      // Filter perfumes by brand and exclude current perfume
      const similar = allPerfumes
        .filter((p) => {
          // Get each perfume's ID for comparison
          const perfumeId = p["ID Perfume"] || p.perfumeId || p._id;

          // Only include perfumes from the same brand but different ID
          return p.brand === brandName && perfumeId !== currentPerfumeId;
        })
        .slice(0, 4); // Limit to 4 similar perfumes

      console.log(`Found ${similar.length} similar perfumes`);
      setSimilarPerfumes(similar);
    } catch (error) {
      console.error("Error fetching similar perfumes:", error);
      setSimilarPerfumes([]);
    }
  };

  // Use default image as fallback
  const getImageSrc = (perfume) => {
    if (!perfume) return "";
    return perfume.image && perfume.image.startsWith("http")
      ? perfume.image
      : defaultImages[perfume.name] || Object.values(defaultImages)[0];
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-dark-gray py-20 px-8 text-center">
          <div className="animate-pulse">
            <p className="text-white text-xl">Loading perfume details...</p>
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
        </div>
        <Footer />
      </>
    );
  }

  if (!perfume) {
    return (
      <>
        <Navbar />
        <div className="bg-dark-gray py-20 px-8 text-center">
          <p className="text-white text-xl">Perfume not found!</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-dark-gray py-8 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center text-white font-inter">
              <Link to="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link to="/catalog" className="hover:text-gold transition-colors">
                Catalog
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gold">{perfume.name}</span>
            </div>
          </div>
          {/* Product Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            {/* Product Image */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={getImageSrc(perfume)}
                alt={perfume.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div>
              {/* Gender Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {perfume.gender &&
                  (Array.isArray(perfume.gender)
                    ? perfume.gender
                    : [perfume.gender]
                  ).map((tag, index) => (
                    <span
                      key={index}
                      className={`px-4 py-1 rounded-full text-sm ${
                        index === 0
                          ? "bg-pink-300 text-black"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
              </div>

              {/* Product Title */}
              <h1 className="font-playfair font-bold text-5xl md:text-6xl text-white mt-2 mb-2">
                {perfume.name}
              </h1>

              {/* Brand */}
              <h2 className="font-inter text-gold text-xl mb-4">
                <Link
                  to={`/brand/${encodeURIComponent(
                    perfume.brand.toLowerCase()
                  )}`}
                  className="hover:underline"
                >
                  {perfume.brand}
                </Link>
              </h2>

              {/* Price and Size */}
              <div className="flex items-center gap-2 mb-8">
                <span className="font-inter font-medium text-xl text-white">
                  {perfume.formattedPrice ||
                    `Rp ${perfume.price.toLocaleString("id-ID")}`}
                </span>
                <span className="text-white/70 text-sm">
                  {perfume.size || perfume.volume}ml{" "}
                  {perfume.concentration || perfume.concentrate}
                </span>
              </div>

              {/* Situation if available */}
              {perfume.situation && (
                <div className="mb-6">
                  <h3 className="font-inter text-base mb-2 text-white">
                    Best For
                  </h3>
                  <span className="bg-blue-400/30 text-white px-4 py-1 rounded-full text-sm">
                    {perfume.situation}
                  </span>
                </div>
              )}

              {/* Description if available */}
              {perfume.description && (
                <div className="mb-6">
                  <p className="text-white/80">{perfume.description}</p>
                </div>
              )}

              {/* Divider */}
              <hr className="border-white/20 my-8" />

              {/* Notes Section - Luxury Enhanced */}
              {(perfume["top notes"] ||
                perfume["mid notes"] ||
                perfume["base notes"] ||
                perfume.topNotes?.length > 0 ||
                perfume.middleNotes?.length > 0 ||
                perfume.baseNotes?.length > 0) && (
                <div className="bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-2xl mb-8 shadow-lg relative overflow-hidden group border border-white/10 backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:shadow-gold/10 hover:border-gold/20">
                  {/* Animated corner accent elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold/20 to-transparent opacity-50 rounded-bl-full transform -translate-x-4 translate-y-4"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-gold/20 to-transparent opacity-50 rounded-tr-full transform translate-x-3 -translate-y-4"></div>

                  {/* Subtle animated highlights */}
                  <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-gold rounded-full animate-pulse opacity-70"></div>
                  <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-gold rounded-full animate-pulse opacity-70 animation-delay-700"></div>

                  {/* Glowing border effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur"></div>

                  <div className="relative z-10">
                    {/* Elegant title with decorative elements */}
                    <div className="flex items-center justify-center mb-8">
                      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold/70"></div>
                      <h3 className="font-playfair font-bold text-2xl mx-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold/90 to-gold/80">
                        Fragrance Notes
                      </h3>
                      <div className="h-[1px] w-12 bg-gradient-to-r from-gold/70 to-transparent"></div>
                    </div>

                    <div className="space-y-6">
                      <NoteCategory
                        title="Top Notes"
                        items={perfume["top notes"] || perfume.topNotes}
                      />
                      <NoteCategory
                        title="Middle Notes"
                        items={perfume["mid notes"] || perfume.middleNotes}
                      />
                      <NoteCategory
                        title="Base Notes"
                        items={perfume["base notes"] || perfume.baseNotes}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>{" "}
          {/* Similar Perfumes Section */}
          {similarPerfumes.length > 0 && (
            <div className="mt-16">
              <h2 className="font-playfair font-bold text-3xl text-white mb-8 text-center">
                Produk Lain dari Brand {perfume.brand}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {similarPerfumes.map((item) => (
                  <SimilarPerfume
                    key={item["ID Perfume"] || item.perfumeId || item._id}
                    id={item["ID Perfume"] || item.perfumeId || item._id}
                    image={item.image}
                    brand={item.brand}
                    name={item.name}
                    price={
                      item.formattedPrice ||
                      `Rp ${item.price.toLocaleString("id-ID")}`
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PerfumeDetail;
