import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import chnoImg from "../assets/parfum-chno.jpg";
import luminosImg from "../assets/parfum-luminos.jpg";
import farhamptonImg from "../assets/parfum-farhampton.jpg";

// Similar parfum component for recommendations
const SimilarPerfume = ({ id, image, brand, name, price }) => {
  return (
    <Link
      to={`/perfume/${id}`}
      className="block bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
    >
      <img src={image} alt={name} className="w-full h-40 object-cover" />
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
            {price}
          </span>
          <span className="text-light-gray font-inter text-sm">30ml XDP</span>
        </div>
      </div>
    </Link>
  );
};

// Note Category component
const NoteCategory = ({ title, items }) => {
  return (
    <div className="mb-6">
      <h3 className="font-inter text-base mb-2 text-white">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
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

  // Mock perfume data based on the image
  const perfume = {
    id: 3,
    image: chnoImg,
    brand: "Soft And Co",
    name: "CHNO",
    price: "Rp 189.000",
    volume: "30ml",
    concentration: "XDP",
    gender: ["Wanita", "Siang"],
    topNotes: ["Lemon", "Bergamot", "Lavender", "Lime", "Mint"],
    middleNotes: ["Rose", "Jasmine", "Ylang-ylang", "Geranium", "Orchid"],
    baseNotes: ["Vanilla", "Musk", "Sandalwood", "Amber", "Cedar"],
  };

  return (
    <>
      <Navbar />
      <div className="bg-dark-gray py-8 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Product Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            {/* Product Image */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={perfume.image}
                alt={perfume.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div>
              {/* Gender Tags */}
              <div className="flex gap-2 mb-4">
                {perfume.gender.map((tag, index) => (
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
                {perfume.brand}
              </h2>

              {/* Price and Size */}
              <div className="flex items-center gap-2 mb-8">
                <span className="font-inter font-medium text-xl text-white">
                  {perfume.price}
                </span>
                <span className="text-white/70 text-sm">
                  {perfume.volume} {perfume.concentration}
                </span>
              </div>

              {/* Divider */}
              <hr className="border-white/20 my-8" />

              {/* Notes */}
              <div className="space-y-6 mb-6">
                <NoteCategory title="Top Notes" items={perfume.topNotes} />
                <NoteCategory
                  title="Middle Notes"
                  items={perfume.middleNotes}
                />
                <NoteCategory title="Base Notes" items={perfume.baseNotes} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PerfumeDetail;
