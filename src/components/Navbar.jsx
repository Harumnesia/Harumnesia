import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  // Close mobile menu when screen size changes to md+ (768px+)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMobileMenu();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-dark-gray py-4 md:py-6 px-4 md:px-8 lg:px-16 relative">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
            <div className="w-10 h-10 md:w-12 md:h-12 mr-2 md:mr-4 overflow-hidden rounded-full">
              <img
                src={logo}
                alt="Harumnesia Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="font-playfair text-2xl md:text-3xl font-bold">
              <span className="text-white">Harum</span>
              <span className="text-gold">nesia</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation Links - Now shows on md+ (tablets and up) */}
        <div className="hidden md:flex items-center space-x-3 md:space-x-4 lg:space-x-6 xl:space-x-8 2xl:space-x-10">
          <Link
            to="/"
            className={`font-playfair font-light text-sm md:text-base lg:text-base xl:text-lg 2xl:text-xl transition-colors whitespace-nowrap ${
              isActive("/") ? "text-gold" : "text-white hover:text-gold"
            }`}
          >
            Home
          </Link>
          <Link
            to="/brands"
            className={`font-playfair font-light text-sm md:text-base lg:text-base xl:text-lg 2xl:text-xl transition-colors whitespace-nowrap ${
              isActive("/brands") ? "text-gold" : "text-white hover:text-gold"
            }`}
          >
            Brands
          </Link>
          <Link
            to="/catalog"
            className={`font-playfair font-light text-sm md:text-base lg:text-base xl:text-lg 2xl:text-xl transition-colors whitespace-nowrap ${
              isActive("/catalog") ? "text-gold" : "text-white hover:text-gold"
            }`}
          >
            Katalog
          </Link>
          <Link
            to="/edukasi"
            className={`font-playfair font-light text-sm md:text-base lg:text-base xl:text-lg 2xl:text-xl transition-colors whitespace-nowrap ${
              isActive("/edukasi") ? "text-gold" : "text-white hover:text-gold"
            }`}
          >
            Edukasi
          </Link>
          <Link
            to="/about-us"
            className={`font-playfair font-light text-sm md:text-base lg:text-base xl:text-lg 2xl:text-xl transition-colors whitespace-nowrap ${
              isActive("/about-us") ? "text-gold" : "text-white hover:text-gold"
            }`}
          >
            Tentang Kami
          </Link>
        </div>

        {/* Right side - Recommendation Button and Mobile Menu Button */}
        <div className="flex items-center space-x-3">
          {/* Recommendation Button - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:block">
            <Link to="/recommendation-method">
              <button className="bg-gradient-to-r from-gold to-gold/80 text-black font-playfair font-medium px-3 md:px-4 lg:px-5 py-2 rounded-full text-xs md:text-sm lg:text-sm shadow-[0_0_10px_rgba(245,213,122,0.4)] hover:shadow-[0_0_15px_rgba(245,213,122,0.7)] hover:scale-105 transition-all duration-300 flex items-center border border-gold/30 relative overflow-hidden group animate-pulse-subtle whitespace-nowrap">
                <span className="relative z-10 mr-1 md:mr-1.5 group-hover:font-semibold">
                  Rekomendasi
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-2.5 w-2.5 md:h-3 md:w-3 lg:h-3.5 lg:w-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
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

          {/* Mobile Menu Button - Hidden on md+ (768px+) when desktop nav shows */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Hidden on md+ (768px+) when desktop nav shows */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-dark-gray/95 backdrop-blur-md border-t border-gray-700 transition-all duration-300 z-50 ${
          isMobileMenuOpen
            ? "opacity-100 visible transform translate-y-0"
            : "opacity-0 invisible transform -translate-y-2"
        }`}
      >
        <div className="px-4 py-4 space-y-3">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className={`block font-playfair font-light text-lg py-2 px-3 rounded transition-colors ${
              isActive("/")
                ? "text-gold bg-gold/10"
                : "text-white hover:text-gold hover:bg-gold/5"
            }`}
          >
            Home
          </Link>
          <Link
            to="/brands"
            onClick={closeMobileMenu}
            className={`block font-playfair font-light text-lg py-2 px-3 rounded transition-colors ${
              isActive("/brands")
                ? "text-gold bg-gold/10"
                : "text-white hover:text-gold hover:bg-gold/5"
            }`}
          >
            Brands
          </Link>
          <Link
            to="/catalog"
            onClick={closeMobileMenu}
            className={`block font-playfair font-light text-lg py-2 px-3 rounded transition-colors ${
              isActive("/catalog")
                ? "text-gold bg-gold/10"
                : "text-white hover:text-gold hover:bg-gold/5"
            }`}
          >
            Katalog
          </Link>
          <Link
            to="/edukasi"
            onClick={closeMobileMenu}
            className={`block font-playfair font-light text-lg py-2 px-3 rounded transition-colors ${
              isActive("/edukasi")
                ? "text-gold bg-gold/10"
                : "text-white hover:text-gold hover:bg-gold/5"
            }`}
          >
            Edukasi
          </Link>
          <Link
            to="/about-us"
            onClick={closeMobileMenu}
            className={`block font-playfair font-light text-lg py-2 px-3 rounded transition-colors ${
              isActive("/about-us")
                ? "text-gold bg-gold/10"
                : "text-white hover:text-gold hover:bg-gold/5"
            }`}
          >
            Tentang Kami
          </Link>

          {/* Mobile Recommendation Button */}
          <div className="pt-2">
            <Link to="/recommendation-method" onClick={closeMobileMenu}>
              <button className="w-full bg-gradient-to-r from-gold to-gold/80 text-black font-playfair font-medium px-4 py-3 rounded-lg text-base shadow-[0_0_10px_rgba(245,213,122,0.4)] hover:shadow-[0_0_15px_rgba(245,213,122,0.7)] transition-all duration-300 flex items-center justify-center border border-gold/30 relative overflow-hidden group">
                <span className="relative z-10 mr-2 group-hover:font-semibold">
                  Dapatkan Rekomendasi
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
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
        </div>
      </div>

      {/* Overlay for mobile menu - Hidden on md+ when desktop nav shows */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeMobileMenu}
          style={{ top: "0" }}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
