import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="bg-dark-gray py-20 px-8 md:px-16 text-white">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4">
              Tentang Kami
            </h1>
            <p className="font-inter text-lg text-white mx-auto">
              Memandu Anda Menemukan Aroma Lokal Terbaik
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-10">
            <p className="font-inter text-white leading-relaxed">
              Selamat datang di Harumnesia, platform inovatif pemandu Anda di
              dunia parfum lokal Indonesia. Sejak 2024, Harumnesia hadir
              mengatasi kesulitan memilih parfum lokal di tengah banyaknya opsi
              dan minimnya informasi terpusat. Kami menyajikan sistem
              rekomendasi cerdas dan personal untuk menemukan parfum idaman
              berdasarkan preferensi aroma, notes, harga, hingga situasi
              penggunaan, sekaligus menjadi etalase digital bagi UMKM parfum
              berkualitas.
            </p>

            <p className="font-inter text-white leading-relaxed">
              Lahir dari inovasi Tim CC25-CF228, Harumnesia berkomitmen
              mendukung ekosistem parfum lokal. Dengan content-based filtering
              dan machine learning, kami fokus pada rekomendasi akurat dan
              pengalaman pengguna intuitif, serta membuka jalan bagi UMKM parfum
              Indonesia untuk bersaing dan dikenal luas.
            </p>

            <p className="font-inter text-white leading-relaxed">
              Harumnesia bertujuan menciptakan pengalaman pencarian parfum yang
              menyenangkan dan efisien. Temukan keharuman lokal paling pas
              dengan mudah, tanpa lagi kesulitan bernavigasi dalam keragaman
              pesona parfum Indonesia, semua hanya dalam beberapa klik.
            </p>

            <p className="font-inter text-white leading-relaxed">
              Kami antusias memperkaya database kami dengan parfum lokal
              Nusantara. Para pelaku UMKM atau pemilik merek, hubungi Tim
              Harumnesia di kontak@harumnesia.com (atau email resmi Anda) agar
              produk Anda dikenal lebih luas. Informasi detail produk Anda
              membantu kami menyajikannya secara optimal.
            </p>

            <p className="font-inter text-white leading-relaxed">
              Salam Harum Nusantara,
            </p>

            <p className="font-inter text-white leading-relaxed">
              Tim Harumnesia (CC25-CF228)
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
