import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import luminosImg from "../assets/parfum-luminos.jpg";
import chnoImg from "../assets/parfum-chno.jpg";
import farhamptonImg from "../assets/parfum-farhampton.jpg";

// Perfume card component restyled to match the image
const PerfumeCard = ({ id, image, brand, name, price }) => {
  return (
    <Link
      to={`/perfume/${id}`}
      className="block bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
    >
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
    </Link>
  );
};

// Pagination component
const Pagination = () => {
  return (
    <div className="flex justify-center mt-10 mb-16">
      <button className="bg-gold text-black font-inter font-medium px-6 py-2 rounded-xl text-sm hover:bg-opacity-90 transition-colors">
        Muat Lainnya
      </button>
    </div>
  );
};

const Catalog = () => {
  // Mock data for perfume products - 12 items to match the image
  const perfumes = [
    {
      id: 1,
      image: farhamptonImg,
      brand: "HMNS",
      name: "Farhampton",
      price: "Rp 189.000",
    },
    {
      id: 2,
      image: luminosImg,
      brand: "HMNS",
      name: "Luminos",
      price: "Rp 189.000",
    },
    {
      id: 3,
      image: chnoImg,
      brand: "HMNS",
      name: "CHNO",
      price: "Rp 189.000",
    },
    {
      id: 4,
      image: farhamptonImg,
      brand: "HMNS",
      name: "Farhampton",
      price: "Rp 189.000",
    },
    {
      id: 5,
      image: luminosImg,
      brand: "HMNS",
      name: "Luminos",
      price: "Rp 189.000",
    },
    {
      id: 6,
      image: chnoImg,
      brand: "HMNS",
      name: "CHNO",
      price: "Rp 189.000",
    },
    {
      id: 7,
      image: farhamptonImg,
      brand: "HMNS",
      name: "Farhampton",
      price: "Rp 189.000",
    },
    {
      id: 8,
      image: luminosImg,
      brand: "HMNS",
      name: "Luminos",
      price: "Rp 189.000",
    },
    {
      id: 9,
      image: chnoImg,
      brand: "HMNS",
      name: "CHNO",
      price: "Rp 189.000",
    },
    {
      id: 10,
      image: farhamptonImg,
      brand: "HMNS",
      name: "Farhampton",
      price: "Rp 189.000",
    },
    {
      id: 11,
      image: luminosImg,
      brand: "HMNS",
      name: "Luminos",
      price: "Rp 189.000",
    },
    {
      id: 12,
      image: chnoImg,
      brand: "HMNS",
      name: "CHNO",
      price: "Rp 189.000",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-dark-gray py-16 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-6">
              Semua Parfum
            </h1>
          </div>

          {/* Main content - perfume grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {perfumes.map((perfume) => (
              <PerfumeCard
                key={perfume.id}
                id={perfume.id}
                image={perfume.image}
                brand={perfume.brand}
                name={perfume.name}
                price={perfume.price}
              />
            ))}
          </div>

          {/* Load More button */}
          <Pagination />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Catalog;
