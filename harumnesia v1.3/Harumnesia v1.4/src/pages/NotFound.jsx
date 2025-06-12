import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="bg-dark-gray min-h-[70vh] flex items-center">
        <div className="max-w-4xl mx-auto text-center px-8 py-16">
          <h1 className="font-playfair font-bold text-7xl md:text-9xl text-gold mb-4">
            404
          </h1>
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-white mb-6">
            Halaman Tidak Ditemukan
          </h2>
          <p className="font-inter text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin alamat
            URL salah atau halaman tersebut telah dipindahkan.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/">
              <button className="bg-gold text-black font-inter font-medium px-8 py-4 rounded-xl text-xl hover:bg-opacity-90 transition-colors w-full md:w-auto">
                Kembali ke Beranda
              </button>
            </Link>
            <Link to="/catalog">
              <button className="bg-transparent text-white border-2 border-white font-inter font-medium px-8 py-4 rounded-xl text-xl hover:bg-white/10 transition-colors w-full md:w-auto">
                Lihat Katalog Parfum
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
