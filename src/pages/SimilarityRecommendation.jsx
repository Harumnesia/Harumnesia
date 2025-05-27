import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SimilarityRecommendation = () => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [perfumeName, setPerfumeName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", { brand, perfumeName });
    // Navigate to similarity-based results page
    navigate("/recommendation/similarity/results");
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-gray">
      <Navbar />

      <main className="flex-grow bg-dark-gray">
        <div className="container mx-auto px-4 py-16 max-w-6xl flex justify-center items-center min-h-[calc(100vh-90px)]">
          {/* Form Section */}
          <div className="w-full max-w-[659px] bg-white rounded-lg shadow-md">
            {/* Form Header */}
            <div className="text-center py-6">
              <h1 className="font-playfair font-bold text-2xl md:text-3xl text-black mb-2">
                Temukan Parfum Serupa
              </h1>
              <p className="font-josefin font-light text-xs md:text-sm text-black max-w-[472px] mx-auto px-4">
                Pilih parfum yang Anda sukai untuk mendapatkan rekomendasi
                parfum serupa
              </p>
            </div>

            <hr className="border-gray-300 mx-1" />

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="px-6 py-4">
              {/* Brand Field */}
              <div className="mb-4">
                <label
                  htmlFor="brand"
                  className="block mb-1 font-josefin font-medium text-base"
                >
                  Brand :
                </label>
                <div className="relative">
                  <select
                    id="brand"
                    className="w-full h-[46px] px-4 py-2 bg-cream border border-gray-300 rounded-lg font-josefin text-base appearance-none focus:outline-none focus:border-gold"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  >
                    <option value="" disabled selected>
                      Pilih brand
                    </option>
                    <option value="mykonos">Mykonos</option>
                    <option value="kahf">Kahf</option>
                    <option value="nfourth">NFourth</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Perfume Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="perfumeName"
                  className="block mb-1 font-josefin font-medium text-base"
                >
                  Perfume Name :
                </label>
                <div className="relative">
                  <select
                    id="perfumeName"
                    className="w-full h-[46px] px-4 py-2 bg-cream border border-gray-300 rounded-lg font-josefin text-base appearance-none focus:outline-none focus:border-gold"
                    value={perfumeName}
                    onChange={(e) => setPerfumeName(e.target.value)}
                    required
                  >
                    <option value="" disabled selected>
                      Pilih parfum
                    </option>
                    <option value="california">California</option>
                    <option value="wood sage">Wood Sage</option>
                    <option value="summer">Summer</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full h-[40px] bg-gold hover:bg-gold/90 text-black font-inter font-medium text-base rounded-lg transition-colors"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SimilarityRecommendation;
