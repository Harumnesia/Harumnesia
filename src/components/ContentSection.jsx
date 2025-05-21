import React from "react";
import { Link } from "react-router-dom";
import luminosImg from "../assets/parfum-luminos.jpg";
import chnoImg from "../assets/parfum-chno.jpg";
import farhamptonImg from "../assets/parfum-farhampton.jpg";

const PerfumeCard = ({ image, brand, name, price }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <img src={image} alt={name} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h3 className="text-dark-blue font-inter font-medium text-xl">
          {brand}
        </h3>
        <h2 className="font-playfair font-bold text-3xl text-dark-gray mb-4">
          {name}
        </h2>
        <div className="flex justify-between items-center">
          <span className="bg-black text-white font-inter font-medium px-4 py-2 rounded-md">
            {price}
          </span>
          <span className="text-light-gray font-inter font-medium">
            30ml XDP
          </span>
        </div>
      </div>
    </div>
  );
};

const ContentSection = () => {
  return (
    <section className="bg-dark-gray py-24 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-6">
            Parfum Lokal Pilihan
          </h2>
          <p className="font-inter font-medium text-xl md:text-2xl text-white max-w-3xl mx-auto">
            Koleksi parfum lokal terbaik dari berbagai merek Indonesia, dipilih
            khusus untuk berbagai kesempatan dan preferensi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <PerfumeCard
            image={luminosImg}
            brand="Mykonos"
            name="Luminos"
            price="Rp 189.000"
          />
          <PerfumeCard
            image={chnoImg}
            brand="Saff&Co"
            name="CHNO"
            price="Rp 189.000"
          />
          <PerfumeCard
            image={farhamptonImg}
            brand="HMNS"
            name="Farhampton"
            price="Rp 189.000"
          />
        </div>

        <div className="text-center mb-12">
          <h3 className="font-playfair font-bold text-3xl md:text-4xl text-white mb-8">
            Temukan Parfum yang Cocok untuk Anda
          </h3>
          <Link to="/catalog">
            <button className="bg-gold text-black font-inter font-medium px-8 py-4 rounded-2xl text-xl hover:bg-opacity-90 transition-colors border-2 border-white">
              Lihat Semua Parfum
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
