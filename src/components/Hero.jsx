import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-dark-gray text-white min-h-screen flex items-center relative px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-gold/20 rounded-full filter blur-[60px] sm:blur-[80px] md:blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-gold/20 rounded-full filter blur-[60px] sm:blur-[80px] md:blur-[100px] animate-pulse delay-700"></div>

      <div className="max-w-6xl mx-auto relative z-10 w-full py-8 sm:py-12">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          {/* AI-Powered Recommendations Badge */}
          <div className="mb-4 sm:mb-6">
            <div className="group relative bg-gradient-to-r from-black/40 to-black/20 text-gold border border-gold/40 rounded-full px-2 py-1 sm:px-3 sm:py-1.5 inline-flex items-center hover:border-gold/70 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,213,122,0.4)] overflow-hidden">
              {/* Animated AI icon with glow */}
              <div className="relative mr-1.5 sm:mr-2">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-br from-gold to-gold/70 rounded-full animate-pulse shadow-[0_0_10px_rgba(245,213,122,0.6)]"></div>
                <div className="absolute inset-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gold/30 rounded-full animate-ping"></div>
              </div>
              <span className="font-inter text-[10px] sm:text-xs font-semibold relative z-10">
                AI-Powered Recommendations
              </span>
            </div>
          </div>
          <h1 className="font-playfair font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-9xl mb-2 sm:mb-2 md:mb-4 leading-tight">
            Temukan Aroma
          </h1>
          <h2 className="font-inter font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-9xl mb-4 sm:mb-6 md:mb-8">
            Yang Sempurna
          </h2>
          <p className="font-inter font-medium text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mb-8 sm:mb-10 md:mb-16 lg:mb-20 px-2 sm:px-4 leading-relaxed">
            Harumnesia membantu anda menemukan parfum lokal Indonesia terbaik
            yang sesuai dengan preferensi dan kebutuhan anda
          </p>{" "}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 items-center justify-center w-full mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <Link
              to="/recommendation-method"
              className="w-full sm:w-auto max-w-xs sm:max-w-none"
            >
              <button className="group relative bg-gradient-to-r from-gold via-gold to-gold/90 text-black font-inter font-medium px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-2xl text-sm sm:text-base md:text-xl shadow-[0_10px_30px_rgba(245,213,122,0.4)] transition-all duration-500 flex items-center justify-center hover:shadow-[0_15px_40px_rgba(245,213,122,0.6)] hover:scale-105 overflow-hidden border border-gold/30 w-full z-20">
                {/* Enhanced AI Icon with animations */}
                <div className="relative mr-2 sm:mr-2 md:mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 relative z-10 group-hover:scale-110 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6" />
                    <path d="m9 9 3 3 3-3" />
                    <path d="m9 15 3-3 3 3" />
                    <path d="m20.2 7.8-.9-.9M4.7 19.3l-.9-.9m0-11.4.9-.9m15.6 15.6.9.9" />
                  </svg>
                </div>

                <span className="relative z-10 group-hover:font-semibold transition-all duration-300">
                  Mulai Rekomendasi
                </span>

                {/* Arrow with enhanced animation */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 ml-2 sm:ml-2 md:ml-3 relative z-10 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Link>
            <Link
              to="/catalog"
              className="w-full sm:w-auto max-w-xs sm:max-w-none"
            >
              <button className="text-white font-inter font-medium px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-xl hover:underline transition-all w-full text-center">
                Jelajahi Katalog
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Positioned to avoid button collision */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-12 xl:bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-0">
        <div className="border-2 border-gold rounded-full h-6 w-4 sm:h-8 sm:w-5 md:h-10 md:w-6 lg:h-12 lg:w-7 flex justify-center p-1 shadow-gold animate-pulse-subtle">
          <div className="bg-gold rounded-full h-1 w-1 sm:h-1.5 sm:w-1.5 md:h-2 md:w-2 lg:h-2.5 lg:w-2.5 animate-bounce shadow-gold"></div>
        </div>
        <span className="text-gold text-[7px] sm:text-[8px] md:text-[10px] lg:text-xs mt-1 font-inter animate-pulse">
          Scroll Down
        </span>
      </div>
    </section>
  );
};

export default Hero;
