import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-dark-gray py-20 px-8 md:px-16 text-white overflow-hidden">
      {/* Seamless separator line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      {/* Decorative dotted separator */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex space-x-2 -translate-y-1/2">
        <div className="w-1 h-1 bg-gold/40 rounded-full"></div>
        <div className="w-1 h-1 bg-gold/60 rounded-full"></div>
        <div className="w-1 h-1 bg-gold/40 rounded-full"></div>
      </div>

      {/* Subtle background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/2 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="font-playfair text-3xl font-bold mb-4">
                <span className="text-white">Harum</span>
                <span className="text-gold">nesia</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-gold to-gold/50 rounded-full mb-4"></div>
            </div>
            <p className="font-inter text-white/80 text-base leading-relaxed mb-6">
              Temukan rekomendasi parfum lokal terbaik yang dibuat khusus untuk
              memenuhi preferensi dan kebutuhan Anda.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-gold/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 text-white group-hover:text-gold transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-gold/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-5 h-5 text-white group-hover:text-gold transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-gold/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="Email"
              >
                <svg
                  className="w-5 h-5 text-white group-hover:text-gold transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair font-bold text-xl text-white mb-6 relative">
              Navigasi
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gold rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="font-inter text-white/80 hover:text-gold transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gold/50 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/brands"
                  className="font-inter text-white/80 hover:text-gold transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gold/50 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog"
                  className="font-inter text-white/80 hover:text-gold transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gold/50 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Katalog
                </Link>
              </li>
              <li>
                <Link
                  to="/edukasi"
                  className="font-inter text-white/80 hover:text-gold transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gold/50 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Edukasi
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="font-inter text-white/80 hover:text-gold transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gold/50 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Rekomendasi */}
          <div>
            <h3 className="font-playfair font-bold text-xl text-white mb-6 relative">
              Rekomendasi
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gold rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/recommendation-method"
                  className="font-inter text-white/80 hover:text-gold transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gold/50 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Metode Rekomendasi
                </Link>
              </li>
              <li>
                <Link
                  to="/recommendation"
                  className="font-inter text-white/80 hover:text-gold transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gold/50 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Cari Rekomendasi
                </Link>
              </li>
              <li>
                <Link
                  to="/recommendation/similarity"
                  className="font-inter text-white/80 hover:text-gold transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gold/50 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Similarity Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Edukasi & Kontak */}
          <div>
            <h3 className="font-playfair font-bold text-xl text-white mb-6 relative">
              Edukasi & Kontak
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gold rounded-full"></span>
            </h3>
            <ul className="space-y-3 mb-6">
              <li>
                <Link
                  to="/edukasi"
                  onClick={() =>
                    sessionStorage.setItem("edukasiTab", "piramida")
                  }
                  className="font-inter text-white/80 hover:text-gold transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gold/50 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Piramida Aroma
                </Link>
              </li>
              <li>
                <Link
                  to="/edukasi"
                  onClick={() =>
                    sessionStorage.setItem("edukasiTab", "konsentrasi")
                  }
                  className="font-inter text-white/80 hover:text-gold transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gold/50 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Konsentrasi Parfum
                </Link>
              </li>
              <li>
                <Link
                  to="/edukasi"
                  onClick={() =>
                    sessionStorage.setItem("edukasiTab", "terminologi")
                  }
                  className="font-inter text-white/80 hover:text-gold transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gold/50 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Terminologi
                </Link>
              </li>
            </ul>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center group">
                <svg
                  className="w-4 h-4 text-gold mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:harum.nesia@gmail.com"
                  className="font-inter text-white/80 hover:text-gold transition-colors text-sm"
                >
                  harum.nesia@gmail.com
                </a>
              </div>
              <div className="flex items-center group">
                <svg
                  className="w-4 h-4 text-gold mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+6289580668127"
                  className="font-inter text-white/80 hover:text-gold transition-colors text-sm"
                >
                  +62 895-8066-8127
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="font-inter text-white/70 text-sm">
                © 2025 Harumnesia. Semua hak cipta dilindungi.
              </p>
              <p className="font-inter text-white/50 text-xs mt-1">
                Dibuat dengan ❤️ untuk pecinta parfum Indonesia
              </p>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center space-x-2 bg-white/10 hover:bg-gold/20 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
            >
              <span className="font-inter text-white/80 group-hover:text-gold text-sm transition-colors">
                Kembali ke Atas
              </span>
              <svg
                className="w-4 h-4 text-white/80 group-hover:text-gold transition-all duration-300 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
