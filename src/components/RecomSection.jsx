import React from "react";

const RecomSection = () => {
  return (
    <section className="bg-dark-gray py-16 px-8 md:px-16">
      <div className="max-w-6xl mx-auto bg-white rounded-xl p-12 md:p-16 text-center">
        <p className="font-inter text-xl md:text-3xl text-dark-gray mb-10 max-w-4xl mx-auto">
          Jawab beberapa pertanyaan sederhana dan dapatkan rekomendasi parfum
          lokal yang sesuai dengan preferensi dan kebutuhan Anda.
        </p>
        <button className="bg-gold text-black font-inter font-medium px-8 py-4 rounded-md text-xl hover:bg-opacity-90 transition-colors">
          Mulai Rekomendasi
        </button>
      </div>
    </section>
  );
};

export default RecomSection;
