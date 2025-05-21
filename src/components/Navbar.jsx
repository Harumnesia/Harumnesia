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
        <Link
          to="/recommendation"
          className={`font-inter font-light text-xl transition-colors ${
            isActive("/recommendation")
              ? "text-gold"
              : "text-white hover:text-gold"
          }`}
        >
          Rekomendasi
        </Link>
        <Link
          to="/about-us"
          className={`font-inter font-light text-xl transition-colors ${
            isActive("/about-us") ? "text-gold" : "text-white hover:text-gold"
          }`}
        >
          Tentang Kami
        </Link>
      </div>

      {/* Search Icon */}
      <div className="w-6 h-6 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-white w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
