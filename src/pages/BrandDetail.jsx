import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.jpg";
import farhamptonImg from "../assets/parfum-farhampton.jpg";

// Perfume card component reused from Catalog page
const PerfumeCard = ({ image, brand, name, price }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <img src={image} alt={name} className="w-full h-52 object-cover" />
      <div className="p-4">
        <div className="mb-1">
          <span className="text-dark-blue font-inter text-xs uppercase">
            {brand}
          </span>
        </div>
        <h2 className="font-playfair font-bold text-xl text-dark-gray mb-2">
          {name}
        </h2>
        <div className="flex justify-between items-center">
          <span className="bg-black text-white font-inter font-medium text-sm px-3 py-1 rounded-md">
            {price}
          </span>
          <span className="text-light-gray font-inter text-sm">30ml XDP</span>
        </div>
      </div>
    </div>
  );
};

const BrandDetail = () => {
  const { brandId } = useParams();
  const brandName = getBrandName(brandId);

  // Mock data for brand details
  const brandInfo = {
    id: brandId,
    name: brandName,
    image: logo,
    description:
      "Brand parfum lokal premium dengan fokus pada bahan-bahan berkualitas dan aroma yang tahan lama. Setiap parfum dibuat dengan perhatian penuh pada detail dan keunikan.",
    establishedYear: 2018,
    headquarters: "Jakarta, Indonesia",
    website: "www.example.com",
  };

  // Mock data for brand's products
  const products = [
    {
      id: 1,
      image: farhamptonImg,
      brand: brandName,
      name: "Farhampton",
      price: "Rp 189.000",
    },
    {
      id: 2,
      image: farhamptonImg,
      brand: brandName,
      name: "Verano",
      price: "Rp 189.000",
    },
    {
      id: 3,
      image: farhamptonImg,
      brand: brandName,
      name: "Aquos",
      price: "Rp 189.000",
    },
    {
      id: 4,
      image: farhamptonImg,
      brand: brandName,
      name: "Luna",
      price: "Rp 189.000",
    },
    {
      id: 5,
      image: farhamptonImg,
      brand: brandName,
      name: "Noir",
      price: "Rp 189.000",
    },
    {
      id: 6,
      image: farhamptonImg,
      brand: brandName,
      name: "Blanc",
      price: "Rp 189.000",
    },
    {
      id: 7,
      image: farhamptonImg,
      brand: brandName,
      name: "Amber",
      price: "Rp 189.000",
    },
    {
      id: 8,
      image: farhamptonImg,
      brand: brandName,
      name: "Cedar",
      price: "Rp 189.000",
    },
  ];

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
              <span className="text-gold">{brandInfo.name}</span>
            </div>
          </div>

          {/* Brand Info */}
          <div className="bg-white rounded-xl p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="w-24 h-24 mr-6 mb-4 md:mb-0">
                <img
                  src={brandInfo.image}
                  alt={brandInfo.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h1 className="font-playfair font-bold text-3xl text-dark-gray mb-4">
                  {brandInfo.name}
                </h1>
                <p className="font-inter text-light-gray mb-6">
                  {brandInfo.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="font-inter font-medium text-dark-gray">
                      Berdiri Sejak
                    </span>
                    <p className="font-inter text-light-gray">
                      {brandInfo.establishedYear}
                    </p>
                  </div>
                  <div>
                    <span className="font-inter font-medium text-dark-gray">
                      Lokasi
                    </span>
                    <p className="font-inter text-light-gray">
                      {brandInfo.headquarters}
                    </p>
                  </div>
                  <div>
                    <span className="font-inter font-medium text-dark-gray">
                      Website
                    </span>
                    <p className="font-inter text-blue-500">
                      <a
                        href={`https://${brandInfo.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {brandInfo.website}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Header */}
          <div className="text-center mb-12">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-white mb-4">
              Produk {brandInfo.name}
            </h2>
            <p className="font-inter font-medium text-lg text-white max-w-3xl mx-auto">
              Koleksi parfum terbaik dari {brandInfo.name}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <PerfumeCard
                key={product.id}
                image={product.image}
                brand={product.brand}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Helper function to get brand name from ID
function getBrandName(id) {
  const brands = {
    1: "Aksen",
    2: "Avila",
    3: "Bali Surfers Perfume",
    4: "Boura",
    5: "CONSTANT",
    6: "EBE",
    7: "Elvicto",
    8: "Filosofhia",
    9: "Forsol",
    10: "GHAIER",
    11: "Hipnoza",
    12: "Hindsight",
    13: "HMNS",
    14: "Jayrosse",
    15: "KIYO+",
    16: "LAYR",
    17: "Le Secre",
    18: "Mandalika",
    19: "Mars on Earth",
    20: "mykonos",
    21: "Odore",
    22: "ONIX",
    23: "Oullu",
    24: "OUDS",
    25: "Permenent",
    26: "Project 1945",
    27: "Raine Beauty",
    28: "Readyset",
    29: "S.TOI",
    30: "Saudade",
    31: "Semerbak",
    32: "USUAL",
    33: "Velixir",
    34: "Xociety",
  };

  return brands[id] || "Unknown Brand";
}

export default BrandDetail;
