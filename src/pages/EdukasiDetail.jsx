import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EdukasiDetail = () => {
  const { slug } = useParams();
  const contentData = getContentData(slug);

  if (!contentData) {
    return (
      <>
        <Navbar />
        <div className="bg-dark-gray min-h-screen py-16 px-8 md:px-16 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-playfair font-bold text-3xl">
              Konten tidak ditemukan
            </h1>
            <p className="mt-4">
              Maaf, konten yang Anda cari tidak dapat ditemukan.
            </p>
            <Link
              to="/edukasi"
              className="mt-8 inline-block text-gold hover:underline"
            >
              Kembali ke halaman Edukasi
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-dark-gray min-h-screen py-16 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center text-white font-inter">
              <Link to="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link to="/edukasi" className="hover:text-gold transition-colors">
                Edukasi
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gold">{contentData.title}</span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl p-8">
            <h1 className="font-playfair font-bold text-3xl md:text-4xl text-dark-gray mb-6">
              {contentData.title}
            </h1>

            <div className="prose prose-lg max-w-none">
              {contentData.content.map((section, index) => (
                <div key={index} className="mb-8">
                  {section.heading && (
                    <h2 className="font-playfair font-bold text-2xl text-dark-gray mb-4">
                      {section.heading}
                    </h2>
                  )}
                  {section.text.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="font-inter text-light-gray mb-4 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation to other categories */}
          <div className="mt-12">
            <h3 className="font-playfair font-bold text-2xl text-white mb-6">
              Artikel Edukasi Lainnya
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contentData.relatedLinks.map((link) => (
                <Link key={link.slug} to={`/edukasi/${link.slug}`}>
                  <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-playfair font-bold text-xl text-dark-gray mb-2">
                      {link.title}
                    </h4>
                    <p className="font-inter text-light-gray text-sm">
                      {link.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Helper function to get content data based on slug
function getContentData(slug) {
  const contentMap = {
    "top-notes": {
      title: "Top Notes",
      content: [
        {
          heading: "Apa itu Top Notes?",
          text: [
            "Top notes, juga dikenal sebagai 'head notes', adalah kesan pertama yang Anda dapatkan dari parfum saat pertama kali disemprotkan. Mereka adalah komponen yang paling mudah menguap dari parfum dan yang pertama kali menyambut indera penciuman Anda.",
            "Top notes biasanya bertahan selama 5 hingga 15 menit setelah aplikasi parfum. Meskipun keberadaannya singkat, top notes memainkan peran penting dalam pengalaman parfum secara keseluruhan, karena memberikan kesan pertama dan menetapkan nada untuk aroma yang akan muncul berikutnya.",
          ],
        },
        {
          heading: "Karakteristik Top Notes",
          text: [
            "Top notes biasanya memiliki karakter yang ringan, segar, dan menyenangkan. Mereka dirancang untuk menarik perhatian dan memberikan kesan positif yang langsung. Bahan-bahan yang sering digunakan sebagai top notes termasuk buah jeruk (seperti lemon, jeruk, dan bergamot), rempah-rempah ringan (seperti kayu manis, jahe, dan lada), serta aroma herbal (seperti lavender dan mint).",
            "Top notes yang baik harus menarik dan tidak terlalu kuat atau menusuk. Mereka harus memberikan transisi yang mulus ke middle notes, yang akan muncul saat top notes mulai menguap.",
          ],
        },
        {
          heading: "Pentingnya Top Notes dalam Komposisi Parfum",
          text: [
            "Meskipun top notes hanya bertahan sebentar, mereka memainkan peran krusial dalam penjualan parfum. Ketika konsumen mencoba parfum di toko, keputusan pembelian sering kali didasarkan pada kesan awal yang diberikan oleh top notes. Inilah mengapa parfumers sangat memperhatikan pemilihan dan formulasi top notes dalam kreasi mereka.",
            "Selain menarik perhatian awal, top notes juga berfungsi sebagai pengantar untuk cerita aroma yang lengkap. Mereka mempersiapkan indera penciuman untuk aroma yang lebih komplex dan bertahan lama yang akan muncul dalam middle dan base notes.",
            "Beberapa contoh top notes yang populer dalam parfum lokal Indonesia termasuk jeruk Bali, pandan, dan jahe yang memberikan kesegaran awal yang khas pada komposisi parfum.",
          ],
        },
      ],
      relatedLinks: [
        {
          title: "Middle Notes",
          description:
            "Pelajari tentang heart notes yang membentuk karakter utama parfum",
          slug: "middle-notes",
        },
        {
          title: "Base Notes",
          description:
            "Kenali fondasi parfum yang memberikan kedalaman dan daya tahan",
          slug: "base-notes",
        },
        {
          title: "Konsentrasi",
          description:
            "Memahami perbedaan kekuatan dan daya tahan berbagai jenis parfum",
          slug: "konsentrasi",
        },
      ],
    },
    "middle-notes": {
      title: "Middle Notes",
      content: [
        {
          heading: "Memahami Middle Notes",
          text: [
            "Middle notes, juga disebut 'heart notes', adalah komponen yang muncul setelah top notes menguap. Middle notes adalah esensi dari parfum, membentuk karakter utama dari aroma keseluruhan.",
            "Middle notes mulai muncul sekitar 15-30 menit setelah aplikasi parfum dan dapat bertahan selama 2-4 jam. Mereka memberikan keseimbangan antara top notes yang ringan dan base notes yang lebih berat.",
          ],
        },
        {
          heading: "Bahan Umum dalam Middle Notes",
          text: [
            "Middle notes umumnya terdiri dari bahan floral seperti mawar, melati, dan ylang-ylang, serta bahan rempah seperti cengkeh, kayu manis, dan cardamom. Beberapa parfum juga menggunakan bahan buah dan aroma hijau untuk middle notes.",
            "Dalam parfum lokal Indonesia, kita sering menemukan middle notes dari bunga melati, cempaka, atau kenanga yang memberikan karakter khas dan hangat pada parfum.",
          ],
        },
      ],
      relatedLinks: [
        {
          title: "Top Notes",
          description:
            "Pelajari tentang kesan pertama yang diberikan oleh parfum",
          slug: "top-notes",
        },
        {
          title: "Base Notes",
          description:
            "Kenali fondasi parfum yang memberikan kedalaman dan daya tahan",
          slug: "base-notes",
        },
        {
          title: "Konsentrasi",
          description:
            "Memahami perbedaan kekuatan dan daya tahan berbagai jenis parfum",
          slug: "konsentrasi",
        },
      ],
    },
    "base-notes": {
      title: "Base Notes",
      content: [
        {
          heading: "Pentingnya Base Notes",
          text: [
            "Base notes adalah fondasi parfum yang muncul setelah middle notes mulai memudar. Mereka memberikan kedalaman dan daya tahan pada aroma parfum.",
            "Base notes mulai terasa sekitar 30 menit setelah aplikasi dan dapat bertahan selama 6-8 jam atau bahkan lebih. Mereka bertahan paling lama dan membentuk impresi akhir yang tertinggal.",
          ],
        },
        {
          heading: "Bahan dalam Base Notes",
          text: [
            "Base notes biasanya terdiri dari bahan-bahan dengan berat molekul tinggi, seperti kayu (cendana, agarwood), amber, musk, patchouli, vanila, dan resin.",
            "Dalam parfumeri lokal Indonesia, bahan seperti agarwood (gaharu), patchouli (nilam), dan kayu cendana sering digunakan sebagai base notes, memberikan sentuhan hangat dan eksotis yang khas.",
          ],
        },
      ],
      relatedLinks: [
        {
          title: "Top Notes",
          description:
            "Pelajari tentang kesan pertama yang diberikan oleh parfum",
          slug: "top-notes",
        },
        {
          title: "Middle Notes",
          description:
            "Pelajari tentang heart notes yang membentuk karakter utama parfum",
          slug: "middle-notes",
        },
        {
          title: "Konsentrasi",
          description:
            "Memahami perbedaan kekuatan dan daya tahan berbagai jenis parfum",
          slug: "konsentrasi",
        },
      ],
    },
    konsentrasi: {
      title: "Konsentrasi Parfum",
      content: [
        {
          heading: "Jenis-jenis Konsentrasi Parfum",
          text: [
            "Konsentrasi parfum mengacu pada persentase minyak esensial aromatik yang terkandung dalam cairan parfum. Semakin tinggi konsentrasi, semakin kuat aromanya dan semakin lama parfum bertahan.",
            "Berbagai jenis konsentrasi dari terendah ke tertinggi meliputi: Eau Fraiche (1-3%), Eau de Cologne (2-4%), Eau de Toilette (5-15%), Eau de Parfum (15-20%), dan Parfum atau Extrait de Parfum (20-30%).",
          ],
        },
        {
          heading: "Memilih Konsentrasi yang Tepat",
          text: [
            "Pemilihan konsentrasi tergantung pada beberapa faktor, termasuk tujuan penggunaan, durasi yang diinginkan, dan preferensi pribadi.",
            "Eau de Toilette biasanya cocok untuk penggunaan sehari-hari dan iklim tropis karena lebih ringan, sementara Eau de Parfum dapat menjadi pilihan untuk acara khusus dan malam hari.",
          ],
        },
      ],
      relatedLinks: [
        {
          title: "Top Notes",
          description:
            "Pelajari tentang kesan pertama yang diberikan oleh parfum",
          slug: "top-notes",
        },
        {
          title: "Middle Notes",
          description:
            "Pelajari tentang heart notes yang membentuk karakter utama parfum",
          slug: "middle-notes",
        },
        {
          title: "Base Notes",
          description:
            "Kenali fondasi parfum yang memberikan kedalaman dan daya tahan",
          slug: "base-notes",
        },
      ],
    },
  };

  return contentMap[slug];
}

export default EdukasiDetail;
