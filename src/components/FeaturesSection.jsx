import React from "react";

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="group relative bg-gradient-to-br from-white via-white to-cream rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col items-center shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_80px_-12px_rgba(0,0,0,0.25)] transition-all duration-700 border border-gold/10 hover:border-gold/30 transform hover:-translate-y-3 hover:scale-[1.02] backdrop-blur-sm">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/10 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      {/* Icon container with enhanced design */}
      <div className="relative bg-gradient-to-br from-gold via-gold to-gold/80 w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 shadow-[0_15px_35px_-10px_rgba(245,213,122,0.4)] group-hover:shadow-[0_25px_50px_-10px_rgba(245,213,122,0.6)] transition-all duration-700 group-hover:rotate-6 group-hover:scale-110">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl sm:rounded-2xl"></div>
        <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500 scale-75 sm:scale-100">
          {icon}
        </div>
      </div>

      <h3 className="relative z-10 font-playfair font-bold text-xl sm:text-2xl md:text-3xl text-dark-gray mb-4 sm:mb-6 text-center leading-tight group-hover:text-dark-blue transition-colors duration-500">
        {title}
      </h3>

      <p className="relative z-10 font-inter font-medium text-light-gray text-center text-sm sm:text-base md:text-lg leading-relaxed group-hover:text-dark-gray transition-colors duration-500 max-w-sm">
        {description}
      </p>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="relative bg-dark-gray py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden">
      {/* Simple background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-gold/4 via-gold/2 to-transparent blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/1 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced section header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block">
            <span className="font-inter text-gold font-medium text-sm sm:text-base md:text-lg tracking-widest uppercase mb-3 sm:mb-4 block">
              Keunggulan Eksklusif
            </span>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 sm:mb-8 leading-tight">
              Mengapa Memilih
              <span className="block bg-gradient-to-r from-gold via-gold to-white bg-clip-text text-transparent">
                Parfum Lokal?
              </span>
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4 sm:mb-6"></div>
            <p className="font-inter text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-light px-4 sm:px-0">
              Temukan keistimewaan parfum lokal Indonesia yang menggabungkan
              tradisi, inovasi, dan kualitas premium dalam setiap tetesnya
            </p>
          </div>
        </div>

        {/* Enhanced features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <FeatureCard
            title="Kualitas Premium"
            description="Parfum lokal Indonesia dibuat dengan standar kualitas tinggi menggunakan bahan-bahan terbaik dan teknologi modern yang telah teruji"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-dark-blue drop-shadow-lg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            }
          />
          <FeatureCard
            title="Dukung Lokal"
            description="Dengan memilih parfum lokal, Anda turut mendukung kreativitas, inovasi, dan kemajuan industri parfum Indonesia menuju kelas dunia"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-dark-blue drop-shadow-lg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            }
          />
          <FeatureCard
            title="Aromanya Tahan Lama"
            description="Parfum lokal dirancang khusus untuk tahan lama dan cocok dengan kondisi iklim tropis Indonesia, memberikan pengalaman wewangian optimal"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-dark-blue drop-shadow-lg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
            }
          />
        </div>

        {/* Bottom decorative element */}
        <div className="text-center mt-12 sm:mt-16 md:mt-20">
          <div className="inline-flex items-center space-x-3 sm:space-x-4">
            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-gold"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gold rounded-full animate-pulse"></div>
            <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-gold"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
