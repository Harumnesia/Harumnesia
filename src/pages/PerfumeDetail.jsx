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

// Similar parfum component for recommendations
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
    <Link
      to={`/perfume/${id}`}
      className="block bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
    >
      <img src={imgSrc} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <div className="mb-1">
          <span className="text-dark-blue font-inter text-xs uppercase">
            {brand}
          </span>
        </div>
        <h2 className="font-playfair font-bold text-lg text-dark-gray mb-2">
          {name}
        </h2>
        <div className="flex justify-between items-center">
          <span className="bg-black text-white font-inter font-medium text-sm px-3 py-1 rounded-md">
            {price || "Price unavailable"}
          </span>
          <span className="text-light-gray font-inter text-sm">30ml XDP</span>
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
    <div className="mb-6">
      <h3 className="font-inter text-base mb-2 text-white">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {notesList.map((item, index) => (
          <span
            key={index}
            className="bg-white/10 text-white px-3 py-1 rounded-md text-sm"
          >
            {item}
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

              {/* Notes Section - Highlighted */}
              {(perfume["top notes"] ||
                perfume["mid notes"] ||
                perfume["base notes"] ||
                perfume.topNotes?.length > 0 ||
                perfume.middleNotes?.length > 0 ||
                perfume.baseNotes?.length > 0) && (
                <div className="bg-white/5 p-6 rounded-xl mb-8">
                  <h3 className="font-playfair font-bold text-2xl text-gold mb-6">
                    Fragrance Notes
                  </h3>
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
              )}
            </div>
          </div>

          {/* Similar Perfumes Section */}
          {similarPerfumes.length > 0 && (
            <div className="mt-16">
              <h2 className="font-playfair font-bold text-3xl text-white mb-8 text-center">
                Produk Lain dari Brand {perfume.brand}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
