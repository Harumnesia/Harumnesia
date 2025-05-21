import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Brand list item component
const BrandListItem = ({ id, name }) => {
  return (
    <div>
      <Link
        to={`/brands/${id}`}
        className="block py-4 text-white hover:text-gold transition-colors"
      >
        <h2 className="font-playfair font-bold text-xl md:text-2xl">{name}</h2>
      </Link>
      <hr className="border-gray-700" />
    </div>
  );
};

const Brands = () => {
  // List of brands
  const brands = [
    { id: 1, name: "Aksen" },
    { id: 2, name: "Avila" },
    { id: 3, name: "Bali Surfers Perfume" },
    { id: 4, name: "Boura" },
    { id: 5, name: "CONSTANT" },
    { id: 6, name: "EBE" },
    { id: 7, name: "Elvicto" },
    { id: 8, name: "Filosofhia" },
    { id: 9, name: "Forsol" },
    { id: 10, name: "GHAIER" },
    { id: 11, name: "Hipnoza" },
    { id: 12, name: "Hindsight" },
    { id: 13, name: "HMNS" },
    { id: 14, name: "Jayrosse" },
    { id: 15, name: "KIYO+" },
    { id: 16, name: "LAYR" },
    { id: 17, name: "Le Secre" },
    { id: 18, name: "Mandalika" },
    { id: 19, name: "Mars on Earth" },
    { id: 20, name: "mykonos" },
    { id: 21, name: "Odore" },
    { id: 22, name: "ONIX" },
    { id: 23, name: "Oullu" },
    { id: 24, name: "OUDS" },
    { id: 25, name: "Permenent" },
    { id: 26, name: "Project 1945" },
    { id: 27, name: "Raine Beauty" },
    { id: 28, name: "Readyset" },
    { id: 29, name: "S.TOI" },
    { id: 30, name: "Saudade" },
    { id: 31, name: "Semerbak" },
    { id: 32, name: "USUAL" },
    { id: 33, name: "Velixir" },
    { id: 34, name: "Xociety" },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-dark-gray min-h-screen py-16 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-6">
              Semua Brand
            </h1>
          </div>

          {/* Brand List with horizontal dividers */}
          <div>
            <hr className="border-gray-700" />
            {brands.map((brand) => (
              <BrandListItem key={brand.id} id={brand.id} name={brand.name} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Brands;
