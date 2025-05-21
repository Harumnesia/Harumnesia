import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black py-16 px-8 md:px-16 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="font-inter text-base mb-6">
            Temukan rekomendasi parfum lokal terbaik yang dibuat khusus untuk
            memenuhi preferensi dan kebutuhan Anda.
          </p>
        </div>

        <div>
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="font-inter hover:text-gold transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/recommendation"
                className="font-inter hover:text-gold transition-colors"
              >
                Rekomendasi
              </Link>
            </li>
            <li>
              <Link
                to="/catalog"
                className="font-inter hover:text-gold transition-colors"
              >
                Katalog
              </Link>
            </li>
            <li>
              <Link
                to="/edukasi"
                className="font-inter hover:text-gold transition-colors"
              >
                Edukasi
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="font-inter hover:text-gold transition-colors"
              >
                Tentang Kami
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className="space-y-4">
            <li>
              <Link
                to="/edukasi"
                onClick={() => sessionStorage.setItem("edukasiTab", "piramida")}
                className="font-inter hover:text-gold transition-colors"
              >
                Top Notes
              </Link>
            </li>
            <li>
              <Link
                to="/edukasi"
                onClick={() => sessionStorage.setItem("edukasiTab", "piramida")}
                className="font-inter hover:text-gold transition-colors"
              >
                Middle Notes
              </Link>
            </li>
            <li>
              <Link
                to="/edukasi"
                onClick={() => sessionStorage.setItem("edukasiTab", "piramida")}
                className="font-inter hover:text-gold transition-colors"
              >
                Base Notes
              </Link>
            </li>
            <li>
              <Link
                to="/edukasi"
                onClick={() =>
                  sessionStorage.setItem("edukasiTab", "konsentrasi")
                }
                className="font-inter hover:text-gold transition-colors"
              >
                Konsentrasi
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 text-right">
          <ul className="space-y-2">
            <li className="font-inter">harum.nesia@gmail.com</li>
            <li className="font-inter">+62 895-8066-81275</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-800">
        <p className="font-inter text-center">
          © 2025 Harumnesia. Semua hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
