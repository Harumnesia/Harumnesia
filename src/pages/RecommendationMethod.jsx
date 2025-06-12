import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RecommendationMethod = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-gray relative overflow-hidden">
      {/* Background ambient glow effects */}
      <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gold/10 rounded-full filter blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-gold/10 rounded-full filter blur-[120px] animate-pulse delay-1000"></div>

      <Navbar />

      <main className="flex-grow relative z-10">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          {/* Header Section with enhanced styling */}
          <div className="text-center mb-10 md:mb-16">
            <h1 className="font-playfair font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4 md:mb-6 leading-tight">
              Bagaimana Anda Ingin Menemukan
              <span className="text-gold bg-gradient-to-r from-gold to-gold/80 bg-clip-text text-transparent">
                {" "}
                Parfum?
              </span>
            </h1>
            <p className="text-white/90 font-inter font-normal max-w-3xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed">
              Pilih salah satu metode di bawah ini yang memudahkan Anda
              mendapatkan rekomendasi parfum yang paling sesuai dengan
              kebutuhan.
            </p>
          </div>

          {/* Options Cards with enhanced hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Option 1 - Enhanced card */}
            <div className="group bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 flex flex-col h-full relative overflow-hidden border border-white/20 hover:border-gold/30 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:-translate-y-2 hover:bg-white">
              {/* Card glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              {/* Enhanced icon with multiple effects */}
              <div className="flex justify-center mb-6 relative z-10">
                <div className="bg-gradient-to-br from-gold/20 to-gold/30 rounded-full p-4 group-hover:scale-110 transition-all duration-500 relative overflow-hidden">
                  {/* Icon shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full"></div>

                  {/* Enhanced AI icon with sophisticated design */}
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-gold group-hover:text-gold/90 transition-colors duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                    {/* Icon glow effect */}
                    <div className="absolute inset-0 bg-gold/30 rounded-full blur-sm opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              <h3 className="font-playfair font-bold text-xl md:text-2xl text-center mb-3 relative z-10 group-hover:text-dark-gray transition-colors duration-300">
                Berdasarkan Parfum yang Anda Sukai
              </h3>
              <p className="font-inter font-normal text-light-gray text-sm md:text-base text-center mb-6 flex-grow relative z-10 group-hover:text-light-gray/80 transition-colors duration-300 leading-relaxed">
                Sudah memiliki parfum favorit? Temukan parfum lain yang memiliki
                karakteristik serupa dengan yang Anda sukai.
              </p>

              <Link
                to="/recommendation/similarity"
                className="mt-auto relative z-10"
              >
                <button className="group/btn w-full bg-gradient-to-r from-gold to-gold/90 hover:from-gold/90 hover:to-gold text-black font-inter font-medium text-sm md:text-base py-3 md:py-4 px-6 rounded-xl transition-all duration-500 relative overflow-hidden hover:shadow-[0_10px_30px_rgba(245,213,122,0.4)] hover:scale-[1.02] border border-gold/30">
                  <span className="relative z-10 group-hover/btn:font-semibold transition-all duration-300">
                    Pilih Opsi Ini
                  </span>

                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 rounded-xl"></div>
                </button>
              </Link>

              <p className="text-xs italic text-center text-light-gray/70 mt-3 relative z-10 group-hover:text-gold transition-colors duration-300">
                AI similarity technology
              </p>

              {/* Card edge glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/20 via-transparent to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            </div>

            {/* Option 2 - Enhanced card */}
            <div className="group bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 flex flex-col h-full relative overflow-hidden border border-white/20 hover:border-gold/30 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:-translate-y-2 hover:bg-white">
              {/* Card glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              {/* Enhanced icon with multiple effects */}
              <div className="flex justify-center mb-6 relative z-10">
                <div className="bg-gradient-to-br from-gold/20 to-gold/30 rounded-full p-4 group-hover:scale-110 transition-all duration-500 relative overflow-hidden">
                  {/* Icon shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full"></div>

                  {/* Enhanced questionnaire icon */}
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-gold group-hover:text-gold/90 transition-colors duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 11H5a2 2 0 0 0-2 2v7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-7a2 2 0 0 0-2-2h-4" />
                      <rect x="9" y="7" width="6" height="6" />
                      <path d="M12 1v6" />
                      <path d="M12 13v7" />
                    </svg>
                    {/* Icon glow effect */}
                    <div className="absolute inset-0 bg-gold/30 rounded-full blur-sm opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              <h3 className="font-playfair font-bold text-xl md:text-2xl text-center mb-3 relative z-10 group-hover:text-dark-gray transition-colors duration-300">
                Mau mulai dari awal banget
              </h3>
              <p className="font-inter text-light-gray text-sm md:text-base text-center mb-6 flex-grow relative z-10 group-hover:text-light-gray/80 transition-colors duration-300 leading-relaxed">
                Jawab beberapa pertanyaan tentang preferensi aroma dan kebutuhan
                Anda untuk mendapatkan rekomendasi parfum yang sesuai.
              </p>

              <Link to="/recommendation" className="mt-auto relative z-10">
                <button className="group/btn w-full bg-gradient-to-r from-gold to-gold/90 hover:from-gold/90 hover:to-gold text-black font-inter font-medium text-sm md:text-base py-3 md:py-4 px-6 rounded-xl transition-all duration-500 relative overflow-hidden hover:shadow-[0_10px_30px_rgba(245,213,122,0.4)] hover:scale-[1.02] border border-gold/30">
                  <span className="relative z-10 group-hover/btn:font-semibold transition-all duration-300">
                    Pilih Opsi Ini
                  </span>

                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 rounded-xl"></div>
                </button>
              </Link>

              <p className="text-xs italic text-center text-light-gray/70 mt-3 relative z-10 group-hover:text-gold transition-colors duration-300">
                AI preference analysis
              </p>

              {/* Card edge glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/20 via-transparent to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            </div>
          </div>

          {/* Enhanced back button */}
          <div className="text-center mt-10 md:mt-16">
            <Link to="/">
              <button className="group inline-flex items-center text-white/80 font-inter hover:text-gold text-sm md:text-base transition-all duration-300 hover:scale-105 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="relative">
                  Kembali ke Beranda
                  {/* Underline effect */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></div>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RecommendationMethod;
