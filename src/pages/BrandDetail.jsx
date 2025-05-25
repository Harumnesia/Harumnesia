import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.jpg";
import farhamptonImg from "../assets/parfum-farhampton.jpg";
import luminosImg from "../assets/parfum-luminos.jpg";
import chnoImg from "../assets/parfum-chno.jpg";

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

// Perfume card component reused from Catalog page
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
    <Link
      to={`/perfume/${id}`}
      className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow block"
    >
      <img src={imgSrc} alt={name} className="w-full h-52 object-cover" />
      <div className="p-4">
        <div className="mb-1">
          <span className="text-dark-blue font-inter text-xs uppercase">
            {brand}
          </span>
        </div>
        <h2 className="font-playfair font-bold text-xl text-dark-gray mb-2 line-clamp-1">
          {name}
        </h2>
        <div className="flex justify-between items-center">
          <span className="bg-black text-white font-inter font-medium text-sm px-3 py-1 rounded-md">
            {price || "Price unavailable"}
          </span>
          <span className="text-light-gray font-inter text-sm">
            {concentration || "XDP"}
          </span>
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

      const response = await fetch(
        `http://localhost:5001/api/perfumes/brand/${decodedBrandName}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch perfumes: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
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
      <div className="bg-dark-gray py-16 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center text-white font-inter">
              <Link to="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link to="/brands" className="hover:text-gold transition-colors">
                Brands
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gold">{brand.name}</span>
            </div>
          </div>

          {/* Brand Info */}
          <div className="bg-white rounded-xl p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="w-24 h-24 mr-6 mb-4 md:mb-0">
                <img
                  src={getBrandImage()}
                  alt={brand.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h1 className="font-playfair font-bold text-3xl text-dark-gray mb-4">
                  {brand.name}
                </h1>
                <p className="font-inter text-light-gray mb-6">
                  {brand.description ||
                    "Brand parfum dengan karakter yang unik dan kualitas premium."}
                </p>
              </div>
            </div>
          </div>

          {/* Products Header */}
          <div className="text-center mb-12">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-white mb-4">
              Produk {brand.name}
            </h2>
            <p className="font-inter font-medium text-lg text-white max-w-3xl mx-auto">
              Koleksi {products.length} parfum dari {brand.name}
            </p>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
              <div className="text-center mt-12">
                <button
                  onClick={goBackToBrands}
                  className="bg-gold text-black font-inter font-medium px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors"
                >
                  Kembali ke Daftar Brand
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-white py-10">
              <p>Tidak ada produk yang tersedia untuk brand ini.</p>
              <button
                onClick={goBackToBrands}
                className="mt-6 bg-gold text-black font-inter font-medium px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors"
              >
                Kembali ke Daftar Brand
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BrandDetail;
