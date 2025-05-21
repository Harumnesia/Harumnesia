import React from "react";

const Hero = () => {
  return (
    <section className="bg-dark-gray text-white py-24 px-8 md:px-16 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="font-playfair font-bold text-5xl md:text-8xl mb-6 leading-tight">
            Temukan Aroma Lokal
            <br />
            yang Sesuai dengan
            <br />
            diri anda
          </h1>
          <p className="font-inter font-medium text-xl md:text-3xl max-w-3xl mb-12">
            Harumnesia membantu anda menemukan parfum lokal Indonesia terbaik
            yang sesuai dengan preferensi dan kebutuhan anda
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <button className="bg-gold text-black font-inter font-medium px-8 py-4 rounded-3xl text-2xl shadow-lg hover:shadow-xl transition-shadow">
            Rekomendasi
          </button>

          <button className="border-2 border-gray-500 text-white font-inter font-medium px-8 py-4 rounded-md text-base hover:border-white transition-colors">
            Lihat Katalog
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
