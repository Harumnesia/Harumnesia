import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PerfumeDetailStatic = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col bg-dark-gray">
      <Navbar />

      <main className="flex-grow bg-dark-gray">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center text-white/70 font-inter text-sm">
              <Link to="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link
                to="/recommendation/similarity"
                className="hover:text-gold transition-colors"
              >
                Rekomendasi
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gold">Detail Parfum</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-3xl bg-gradient-to-br from-white via-white to-cream rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_35px_80px_-12px_rgba(0,0,0,0.2)] transition-all duration-700 border border-gold/20 relative overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-50 rounded-2xl"></div>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-gold/10 rounded-full filter blur-2xl"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gold/10 rounded-full filter blur-2xl"></div>

              <div className="relative z-10 text-center py-16 px-8">
                {/* Icon */}
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full border-2 border-gold/30 mb-4">
                    <svg
                      className="w-10 h-10 text-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h1 className="font-playfair font-bold text-3xl md:text-4xl text-dark-gray mb-6 leading-tight">
                  Halaman Detail Parfum
                  <span className="block text-gold bg-gradient-to-r from-gold to-gold/80 bg-clip-text text-transparent mt-2">
                    Static
                  </span>
                </h1>

                {/* Static Message */}
                <div className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-xl p-6 mb-8">
                  <p className="font-inter text-dark-gray text-lg leading-relaxed">
                    Ini adalah halaman static dan detail parfum akan diterapkan
                    nanti sesuai ID parfum:
                    <span className="inline-block mx-2 px-3 py-1 bg-gold/20 text-gold font-semibold rounded-lg border border-gold/30">
                      {id}
                    </span>
                  </p>
                </div>

                {/* Additional Info */}
                <div className="mb-8">
                  <p className="font-inter text-dark-gray/80 text-base">
                    Fitur yang ditampilkan akan sama dengan detail page.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/recommendation/similarity">
                    <button className="group relative w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-gold via-gold to-gold/90 hover:from-gold/90 hover:via-gold hover:to-gold text-dark-gray font-inter font-semibold text-sm rounded-xl transition-all duration-500 hover:shadow-[0_15px_30px_rgba(245,213,122,0.4)] hover:scale-[1.02] border-2 border-gold/30 hover:border-gold/50 overflow-hidden transform hover:-translate-y-1">
                      <span className="relative z-10 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-rotate-12"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                          />
                        </svg>
                        Kembali ke Rekomendasi
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></div>
                    </button>
                  </Link>

                  <Link to="/catalog">
                    <button className="group relative w-full sm:w-auto px-8 py-3 bg-transparent text-dark-gray border-2 border-dark-gray/30 font-inter font-semibold text-sm rounded-xl hover:bg-dark-gray/10 hover:border-gold/50 transition-all duration-300 hover:scale-105">
                      <span className="relative z-10">
                        Lihat Katalog Lengkap
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PerfumeDetailStatic;
