import React from "react";

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-3xl p-8 flex flex-col items-center shadow-lg">
      <div className="bg-gold w-16 h-16 rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="font-playfair font-bold text-2xl md:text-3xl text-dark-gray mb-4 text-center">
        {title}
      </h3>
      <p className="font-josefin font-medium text-light-gray text-center text-lg leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="bg-dark-gray py-24 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-16 text-center">
          Mengapa Memilih Parfum Lokal?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Kualitas Premium"
            description="Parfum lokal Indonesia dibuat dengan standar kualitas tinggi menggunakan bahan-bahan terbaik."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-dark-blue"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
            description="Dengan membeli parfum lokal, Anda mendukung kreativitas dan industri parfum Indonesia."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-dark-blue"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            }
          />
          <FeatureCard
            title="Aromanya Tahan Lama"
            description="Parfum lokal dirancang untuk tahan lama dan cocok dengan kondisi iklim Indonesia."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-dark-blue"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
