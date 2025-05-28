import React from "react";
import { Link } from "react-router-dom";

const RecomSection = () => {
  return (
    <section className="relative bg-dark-gray py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden">
      {/* Simple background glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-gold/3 via-gold/1 to-transparent blur-xl sm:blur-2xl md:blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-gold/2 to-transparent"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Premium CTA card */}
        <div className="relative bg-gradient-to-br from-white via-cream to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 text-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] sm:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] md:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border border-gold/20 overflow-hidden">
          {/* Subtle shine effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-gold/5 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header section */}
            <div className="mb-8 sm:mb-10 md:mb-12">
              <span className="inline-block font-inter text-dark-blue font-semibold text-sm sm:text-base md:text-lg tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-4 sm:mb-5 md:mb-6">
                Rekomendasi Personal
              </span>
              <h2 className="font-playfair font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-dark-gray mb-6 sm:mb-7 md:mb-8 leading-tight sm:leading-[0.95] md:leading-[0.9]">
                Temukan Parfum
                <span className="block bg-gradient-to-r from-gold via-dark-blue to-gold bg-clip-text text-transparent">
                  Impian Anda
                </span>
              </h2>

              {/* Decorative divider */}
              <div className="flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4 mb-6 sm:mb-7 md:mb-8">
                <div className="w-8 sm:w-10 md:w-12 h-px bg-gradient-to-r from-transparent to-gold"></div>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-gold rounded-full"></div>
                <div className="w-16 sm:w-20 md:w-24 h-px bg-gold"></div>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-gold rounded-full"></div>
                <div className="w-8 sm:w-10 md:w-12 h-px bg-gradient-to-l from-transparent to-gold"></div>
              </div>
            </div>

            {/* Description */}
            <p className="font-inter text-base xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl text-dark-gray mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed font-light px-2 sm:px-0">
              Jawab beberapa pertanyaan sederhana dan dapatkan rekomendasi
              parfum lokal yang
              <span className="font-semibold text-dark-blue">
                {" "}
                sesuai dengan preferensi dan kebutuhan unik Anda
              </span>
              .
              <span className="block mt-3 sm:mt-4 text-sm xs:text-base sm:text-lg md:text-xl text-light-gray">
                Sistem rekomendasi cerdas kami akan menganalisis selera Anda
                untuk memberikan saran terbaik
              </span>
            </p>

            {/* Enhanced CTA button */}
            <Link to="/recommendation-method">
              <button className="group relative bg-gradient-to-r from-gold via-gold to-gold/90 text-dark-gray font-inter font-bold w-full sm:w-auto px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl text-lg sm:text-xl xl:text-2xl shadow-[0_15px_30px_-8px_rgba(245,213,122,0.3)] sm:shadow-[0_20px_40px_-12px_rgba(245,213,122,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(245,213,122,0.6)] sm:hover:shadow-[0_30px_60px_-12px_rgba(245,213,122,0.7)] transition-all duration-500 border-2 border-gold/30 hover:border-dark-blue transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-[1.02] sm:hover:scale-105 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  Mulai Rekomendasi
                  <svg
                    className="ml-3 sm:ml-4 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transform group-hover:translate-x-1 sm:group-hover:translate-x-2 group-hover:scale-105 sm:group-hover:scale-110 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>

                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gold/20 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </Link>

            {/* Trust indicators */}
            <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-light-gray px-4 sm:px-0">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium text-sm sm:text-base">
                  100% Akurat
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium text-sm sm:text-base">
                  Gratis Selamanya
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium text-sm sm:text-base">
                  Dipercaya 1000+ Pengguna
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecomSection;
