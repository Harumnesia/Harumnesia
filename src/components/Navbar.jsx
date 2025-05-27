import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-dark-gray py-6 px-8 md:px-16 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <div className="w-12 h-12 mr-4 overflow-hidden rounded-full">
            <img
              src={logo}
              alt="Harumnesia Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-playfair text-3xl font-bold">
            <span className="text-white">Harum</span>
            <span className="text-gold">nesia</span>
          </h1>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-10">
        <Link
          to="/"
          className={`font-inter font-light text-xl transition-colors ${
            isActive("/") ? "text-gold" : "text-white hover:text-gold"
          }`}
        >
          Home
        </Link>
        <Link
          to="/brands"
          className={`font-inter font-light text-xl transition-colors ${
            isActive("/brands") ? "text-gold" : "text-white hover:text-gold"
          }`}
        >
          Brands
        </Link>
        <Link
          to="/catalog"
          className={`font-inter font-light text-xl transition-colors ${
            isActive("/catalog") ? "text-gold" : "text-white hover:text-gold"
          }`}
        >
          Katalog
        </Link>
        <Link
          to="/edukasi"
          className={`font-inter font-light text-xl transition-colors ${
            isActive("/edukasi") ? "text-gold" : "text-white hover:text-gold"
          }`}
        >
          Edukasi
        </Link>
        {/* <Link
          to="/recommendation"
          className={`font-inter font-light text-xl transition-colors ${
            isActive("/recommendation")
              ? "text-gold"
              : "text-white hover:text-gold"
          }`}
        >
          Rekomendasi
        </Link> */}
        <Link
          to="/about-us"
          className={`font-inter font-light text-xl transition-colors ${
            isActive("/about-us") ? "text-gold" : "text-white hover:text-gold"
          }`}
        >
          Tentang Kami
        </Link>
      </div>

      {/* Recommendation Button */}
      <div>
        <Link to="/recommendation-method">
          <button className="bg-gradient-to-r from-gold to-gold/80 text-black font-inter font-medium px-5 py-2 rounded-full text-sm shadow-[0_0_10px_rgba(245,213,122,0.4)] hover:shadow-[0_0_15px_rgba(245,213,122,0.7)] hover:scale-105 transition-all duration-300 flex items-center border border-gold/30 relative overflow-hidden group animate-pulse-subtle">
            <span className="relative z-10 mr-1.5 group-hover:font-semibold">
              Rekomendasi
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <div className="absolute top-0 -left-1 w-[120%] h-full bg-gradient-to-r from-gold/30 via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
