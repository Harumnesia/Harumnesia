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
      <div className="bg-dark-gray min-h-screen py-16 px-8 md:px-16 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,213,122,0.08),transparent_70%)]">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Breadcrumb */}
          <div className="mb-8 flex items-center">
            <div className="flex items-center text-white font-inter">
              <Link
                to="/"
                className="hover:text-gold transition-colors flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </Link>
              <span className="mx-2 text-gold/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
              <Link
                to="/edukasi"
                className="hover:text-gold transition-colors"
              >
                Edukasi
              </Link>
              <span className="mx-2 text-gold/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
              <span className="text-gold">{contentData.title}</span>
            </div>
          </div>

          {/* Enhanced Content with luxury styling */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gold/10 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-40 opacity-5">
              <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-bl from-gold/20 to-transparent rounded-br-full"></div>
            </div>

            <div className="absolute bottom-0 right-0 w-full h-40 opacity-5">
              <div className="absolute bottom-0 left-0 w-80 h-40 bg-gradient-to-tr from-gold/20 to-transparent rounded-tr-full"></div>
            </div>

            {/* Luxury title with decorative elements */}
            <div className="relative mb-8 text-center">
              <div className="flex justify-center mb-2 opacity-30">
                <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent"></div>
              </div>

              <h1 className="font-playfair font-bold text-3xl md:text-4xl text-dark-gray mb-2 relative inline-block">
                <span className="opacity-0 absolute -inset-0.5 bg-gold blur-sm animate-pulse-subtle"></span>
                <span className="relative">{contentData.title}</span>
                <span className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent transform"></span>
              </h1>

              <div className="flex justify-center items-center mt-2">
                <div className="h-[2px] w-8 bg-gradient-to-r from-transparent to-gold/30"></div>
                <div className="mx-3 text-gold opacity-60 text-xs">✦</div>
                <div className="h-[2px] w-8 bg-gradient-to-r from-gold/30 to-transparent"></div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none relative z-10">
              {contentData.content.map((section, index) => (
                <div
                  key={index}
                  className="mb-12 relative hover:translate-x-1 transition-all duration-700"
                >
                  {section.heading && (
                    <h2 className="font-playfair font-bold text-2xl text-dark-gray mb-4 relative inline-flex items-center">
                      <span className="text-gold mr-2 opacity-70">✦</span>
                      <span className="relative">
                        {section.heading}
                        <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-gold/40 to-transparent transform"></span>
                      </span>
                    </h2>
                  )}

                  <div className="ml-5 border-l-2 border-gold/10 pl-6">
                    {section.text.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="font-inter text-light-gray mb-5 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom decorative element */}
            <div className="flex justify-center mb-2 opacity-30">
              <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent"></div>
            </div>
          </div>

          {/* Enhanced Related Links section - with better responsive design */}
          <div className="mt-12 relative">
            <div className="flex items-center mb-6">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-gold/40 mr-4"></div>
              <h3 className="font-playfair font-bold text-xl md:text-2xl text-white relative inline-block">
                Artikel Edukasi Lainnya
                <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-gold/40 to-transparent transform"></span>
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {contentData.relatedLinks.map((link) => (
                <Link key={link.slug} to={`/edukasi/${link.slug}`}>
                  <div className="bg-white rounded-xl p-5 md:p-6 hover:shadow-lg transition-all duration-500 hover:shadow-gold/5 hover:-translate-y-1 transform relative group overflow-hidden border border-gold/5">
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                      <div className="absolute -inset-full top-0 block w-full h-full bg-gradient-to-r from-transparent via-gold/10 to-transparent skew-x-15 transform group-hover:-translate-x-full transition-all duration-1000 ease-out"></div>
                    </div>

                    {/* Gold accent that appears on hover */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/30 via-gold to-gold/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                    <h4 className="font-playfair font-bold text-lg md:text-xl text-dark-gray mb-2 group-hover:text-dark-blue transition-colors duration-300 relative">
                      {link.title}
                      <span className="text-gold opacity-60 text-xs absolute -top-1 -left-1">
                        ✦
                      </span>
                    </h4>

                    <p className="font-inter text-light-gray text-sm">
                      {link.description}
                    </p>

                    {/* Read more indicator that becomes more visible on hover */}
                    <div className="mt-4 flex items-center text-gold opacity-40 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs md:text-sm font-inter mr-1">
                        Baca selengkapnya
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
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
