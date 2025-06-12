import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Edukasi = () => {
  const [activeTab, setActiveTab] = useState("piramida");
  const [expandedCategory, setExpandedCategory] = useState("citrus");

  // Check for saved tab in sessionStorage when component mounts
  useEffect(() => {
    const savedTab = sessionStorage.getItem("edukasiTab");
    if (
      savedTab &&
      ["piramida", "notes", "konsentrasi", "terminologi"].includes(savedTab)
    ) {
      setActiveTab(savedTab);
      // Clear after using it
      sessionStorage.removeItem("edukasiTab");
    }
  }, []);

  const notesCategories = [
    {
      id: "citrus",
      name: "Citrus",
      description:
        "Notes ini menghasilkan aroma segar dan cerah dari buah-buahan seperti jeruk, lemon, dan grapefruit. Cocok untuk memberikan kesan energik dan menyegarkan. Fun fact: Citrus notes adalah salah satu yang pertua dalam sejarah parfum, digunakan sejak zaman Mesir Kuno.",
      contoh:
        "Verbena, Mandarin, Yuzu, Blood Orange, Lemongrass, Petitgrain, Lime, Citron, Orange Blossom, Clementine, Tangerine, Citrus Water, Cilantro, Orange, Grapefruit, Bergamot, Pomelo, Neroli, dan Lemon.",
    },
    {
      id: "floral",
      name: "Floral",
      description:
        "Notes bunga memberikan aroma lembut, feminin, dan romantis. Bunga-bunga ini dapat memberikan kesan segar, manis, atau bahkan sedikit berat tergantung jenisnya.",
      contoh:
        "Mawar, Melati, Ylang-ylang, Lavender, Peony, Sakura, Lily of the Valley, Magnolia, Freesia, Orange Blossom, Violet, Tuberose, dan Gardenia.",
    },
    {
      id: "fruity",
      name: "Fruity",
      description:
        "Notes buah (selain citrus) memberikan aroma manis, lembut, dan menyenangkan. Sering digunakan untuk menciptakan parfum yang ceria dan segar.",
      contoh:
        "Apel, Pir, Persik, Raspberry, Blackberry, Blueberry, Strawberry, Nektarin, Anggur, Cherry, Plum, Blackcurrant, dan Aprikot.",
    },
    {
      id: "gourmand",
      name: "Gourmand",
      description:
        "Notes yang terinspirasi oleh makanan manis dan pemanggangan, menciptakan aroma hangat, manis, dan mengundang selera.",
      contoh:
        "Vanila, Karamel, Madu, Cokelat, Kopi, Kue, Almond, Pistachio, Butterscotch, Marshmallow, Gula Merah, dan Praline.",
    },
    {
      id: "green",
      name: "Green",
      description:
        "Notes yang mencerminkan aroma tumbuhan hijau dan segar, memberikan kesan alami dan menyegarkan.",
      contoh:
        "Daun Teh, Daun Mint, Violet Leaf, Rumput, Basil, Cucumber, Galbanum, Ivy, Sambuco, dan Sage.",
    },
    {
      id: "aromatics",
      name: "Aromatics",
      description:
        "Notes rempah dan herbal yang memberikan aroma hangat, tajam, dan kompleks pada parfum.",
      contoh:
        "Cengkeh, Kayu Manis, Rosemary, Thyme, Kardamom, Mint, Jahe, Lada Hitam, Lada Putih, Sage, Oregano, dan Basil.",
    },
    {
      id: "watery",
      name: "Watery",
      description:
        "Notes yang mereplikasi kelembaban dan kesegaran air, memberikan aroma bersih dan ringan.",
      contoh:
        "Sea Salt, Water Lily, Aquatic Notes, Marine Notes, Ocean Breeze, Fresh Water, Rain, dan Waterfall.",
    },
    {
      id: "woody",
      name: "Woody",
      description:
        "Notes dari berbagai jenis kayu yang memberikan kesan hangat, kering, dan sering diasosiasikan dengan maskulinitas.",
      contoh:
        "Sandalwood, Cedar, Oud, Vetiver, Patchouli, Pine, Oak, Birch, Cypress, dan Guaiac Wood.",
    },
  ];

  const konsentrasiCards = [
    {
      id: "parfum",
      title: "Extrait de Parfum (EDP)",
      points: [
        "Konsentrasi tertinggi dengan 20 - 30% minyak esensial",
        "Bertahan 6-8 jam atau lebih",
        "Memiliki proyeksi yang intim dan elegan",
      ],
    },
    {
      id: "edp",
      title: "Eau de Parfum (EDP)",
      points: [
        "Konsentrasi tinggi dengan 15 - 20% minyak esensial",
        "Bertahan 4-6 jam atau lebih",
        "Memiliki proyeksi yang baik dan seimbang",
      ],
    },
    {
      id: "edt",
      title: "Eau de Toilette (EDT)",
      points: [
        "Konsentrasi menengah dengan 5 - 15% minyak esensial",
        "Bertahan 2-4 jam atau lebih",
        "Memiliki proyeksi yang baik namun tidak bertahan lama",
      ],
    },
    {
      id: "edc",
      title: "Eau de Cologne (EDC)",
      points: [
        "Konsentrasi rendah dengan 2 - 4% minyak esensial",
        "Bertahan 1-2 jam atau lebih",
        "Memiliki proyeksi yang ringan dan segar",
      ],
    },
  ];

  const terminologiCards = [
    {
      title: "Sillage",
      description:
        'Jejak aroma yang ditinggalkan di udara saat Anda bergerak. Sillage yang kuat berarti parfum meninggalkan "jejak" yang jelas di sekitar Anda.',
    },
    {
      title: "Longevity",
      description:
        "Seberapa lama parfum bertahan pada kulit. Parfum dengan longevity tinggi akan tetap tercium sepanjang hari tanpa perlu diaplikasikan ulang.",
    },
    {
      title: "Dry Down",
      description:
        "Fase akhir parfum ketika base notes menjadi dominan, biasanya terjadi beberapa jam setelah aplikasi. Karakter parfum sering kali berubah pada fase ini.",
    },
    {
      title: "Projection",
      description:
        "Seberapa jauh aroma parfum dapat tercium dari orang yang memakainya. Projection yang kuat berarti orang lain dapat mencium parfum Anda dari jarak jauh.",
    },
    {
      title: "Notes",
      description:
        "Bahan-bahan individu yang terdeteksi dalam parfum. Notes biasanya dikelompokkan menjadi top, middle, dan base notes berdasarkan waktu kemunculannya.",
    },
    {
      title: "Accord",
      description:
        "Kombinasi dari beberapa notes yang menciptakan aroma baru dan harmonis, seperti 'accord floral' atau 'accord oriental'.",
    },
    {
      title: "Olfactory Family",
      description:
        "Kategori aroma parfum seperti floral, woody, oriental, atau fresh. Membantu mengelompokkan parfum berdasarkan karakteristik aromatiknya.",
    },
    {
      title: "Fixative",
      description:
        "Bahan yang ditambahkan untuk memperpanjang daya tahan parfum. Base notes sering berfungsi sebagai fixative alami dalam komposisi parfum.",
    },
  ];

  const tabContent = {
    piramida: {
      title: "Memahami Piramida Notes Parfum",
      sections: [
        {
          title: "Top Notes (Notes Atas)",
          paragraphs: [
            'Top notes, juga dikenal sebagai "head notes," adalah aroma pertama yang Anda cium saat menyemprotkan parfum. Aroma ini biasanya bertahan sekitar 15 - 30 menit.',
            "Notes ini umumnya ringan, segar, dan menguap dengan cepat. Mereka memberi kesan awal dan menarik perhatian Anda untuk ingin mencium lebih dalam.",
          ],
        },
        {
          title: "Middle Notes (Notes Tengah)",
          paragraphs: [
            'Middle notes, juga dikenal sebagai "heart notes," muncul setelah top notes mulai memudar. Biasanya mulai muncul 30 menit hingga 1 jam setelah aplikasi.',
            "Notes ini membentuk tema utama parfum dan biasanya bertahan 2-4 jam. Mereka lebih kompleks dan berkarakter dibanding top notes.",
          ],
        },
        {
          title: "Base Notes (Notes Dasar)",
          paragraphs: [
            "Base notes adalah aroma yang muncul terakhir dan bertahan paling lama. Mereka mulai terasa beberapa jam setelah aplikasi dan bisa bertahan hingga 24 jam.",
            "Notes ini memberikan kedalaman dan daya tahan pada parfum. Mereka cenderung kaya, berat, dan sering memberikan kesan hangat.",
          ],
        },
      ],
    },
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const renderNotesTab = () => {
    return (
      <div className="bg-white rounded-b-lg p-8 shadow-lg border border-t-0 border-gold/10">
        {/* Luxury header with decorative elements */}
        <div className="text-center mb-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>

          <h2 className="font-playfair font-bold text-2xl text-dark-gray mb-2 relative inline-block">
            <span className="relative">Memahami Notes Category</span>
            <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent transform"></span>
          </h2>

          <div className="mt-2 flex justify-center items-center opacity-60">
            <span className="text-gold text-xs mx-1">✦</span>
            <span className="text-gold text-xs mx-1">✦</span>
            <span className="text-gold text-xs mx-1">✦</span>
          </div>
        </div>

        {/* Luxury styled notes categories */}
        <div className="space-y-2 mb-10 relative">
          {/* Background decorative elements */}
          <div className="absolute -right-2 top-10 w-20 h-20 opacity-5">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="50" fill="#F5D57A" />
            </svg>
          </div>

          {notesCategories.map((category) => (
            <div
              key={category.id}
              className="border-b border-gray-200/60 transition-all duration-300 last:border-b-0"
            >
              <button
                className="w-full py-4 px-4 flex items-center justify-between text-left transition-all duration-500 hover:bg-gradient-to-r hover:from-white hover:to-gold/5 group rounded-lg"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center">
                  <span
                    className={`w-2 h-2 bg-gold opacity-40 rounded-full mr-3 transition-all duration-300 ${
                      expandedCategory === category.id
                        ? "opacity-100"
                        : "group-hover:opacity-80"
                    }`}
                  ></span>
                  <span className="font-playfair font-bold text-lg text-dark-gray relative">
                    {category.name}
                    {expandedCategory === category.id && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-gold/20 via-gold/40 to-transparent"></span>
                    )}
                  </span>
                </div>

                <span className="transform transition-transform duration-300">
                  {expandedCategory === category.id ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-light-gray group-hover:text-gold/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
              </button>

              {expandedCategory === category.id && (
                <div className="pb-6 px-9 animate-fadeInUp border-l border-gold/10 ml-1">
                  <p className="font-inter text-light-gray mb-3 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="mb-2 flex items-center">
                    <span className="text-gold/50 mr-2 text-sm">●</span>
                    <p className="font-inter text-gray-500 text-sm italic">
                      Contoh:
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.contoh.split(", ").map((item, i) => (
                      <span
                        key={i}
                        className="inline-block bg-gradient-to-br from-white/15 to-white/5 text-dark-gray/90 px-3 py-1 rounded-lg text-xs border border-gold/10 shadow-sm"
                      >
                        {item.replace(",", "").trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-gradient-to-r from-gold/80 via-gold to-gold/80 text-dark-gray font-playfair py-2.5 px-8 rounded-full hover:shadow-gold-subtle transition-all duration-300 hover:-translate-y-0.5 transform font-semibold">
            Lihat Semua
          </button>

          {/* Bottom decorative element */}
          <div className="flex justify-center mt-6 opacity-30">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
          </div>
        </div>
      </div>
    );
  };

  const renderKonsentrasiTab = () => {
    return (
      <div className="bg-white rounded-b-lg p-8 shadow-lg border-t-0 border border-gold/10">
        {/* Luxury header with decorative elements */}
        <div className="text-center mb-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>

          <h2 className="font-playfair font-bold text-2xl text-dark-gray mb-2 relative inline-block">
            <span className="relative">Konsentrasi Parfum</span>
            <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent transform"></span>
          </h2>

          <div className="mt-2 flex justify-center items-center opacity-60">
            <span className="text-gold text-xs mx-1">✦</span>
            <span className="text-gold text-xs mx-1">✦</span>
            <span className="text-gold text-xs mx-1">✦</span>
          </div>
        </div>

        {/* Enhanced info box */}
        <div className="bg-gradient-to-r from-gold/10 via-gold/20 to-gold/10 rounded-lg p-6 mb-10 text-center relative overflow-hidden group">
          {/* Animated shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
            <div className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-15 transform -translate-x-full animate-shimmer"></div>
          </div>

          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-gold/40 rounded-tl-md"></div>
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-gold/40 rounded-tr-md"></div>
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-gold/40 rounded-bl-md"></div>
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-gold/40 rounded-br-md"></div>

          <p className="font-inter text-dark-gray italic leading-relaxed relative z-10">
            Konsentrasi parfum menunjukkan persentase minyak esensial dalam
            campurannya. Semakin tinggi konsentrasinya, semakin tahan lama
            aromanya dan biasanya semakin mahal harganya.
          </p>
        </div>

        {/* Enhanced concentration cards - with better responsive design */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {konsentrasiCards.map((card, index) => (
            <div
              key={card.id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gold/5 transition-all duration-500 hover:shadow-gold-subtle hover:-translate-y-1 transform relative group overflow-hidden"
            >
              {/* Subtle shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                <div className="absolute -inset-full top-0 block w-full h-full bg-gradient-to-r from-transparent via-gold/10 to-transparent skew-x-15 transform group-hover:-translate-x-full transition-all duration-1000 ease-out"></div>
              </div>

              {/* Gold accent line that appears on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/30 via-gold to-gold/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              <h3 className="font-playfair font-bold text-xl text-dark-gray border-b border-gold/20 pb-3 mb-4 relative">
                {card.title}
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gold group-hover:w-full transition-all duration-700 ease-out"></span>
              </h3>

              <ul className="space-y-4">
                {card.points.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="flex items-start transform transition-all duration-500 hover:translate-x-1"
                  >
                    <span className="text-gold mr-2 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0">✦</span>
                    <span className="font-inter text-light-gray group-hover:text-dark-gray/90 transition-colors">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Card index number with subtle styling */}
              <div className="absolute bottom-3 right-3 text-3xl font-playfair text-gold/10 font-bold group-hover:text-gold/20 transition-colors">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-10 opacity-30">
          <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        </div>
      </div>
    );
  };

  const renderTerminologiTab = () => {
    return (
      <div className="bg-white rounded-b-lg p-8 shadow-lg border-t-0 border border-gold/10">
        {/* Luxury header with decorative elements */}
        <div className="text-center mb-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>

          <h2 className="font-playfair font-bold text-2xl text-dark-gray mb-2 relative inline-block">
            <span className="relative">Terminologi Parfum</span>
            <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent transform"></span>
          </h2>

          <div className="mt-2 flex justify-center items-center opacity-60">
            <span className="text-gold text-xs mx-1">✦</span>
            <span className="text-gold text-xs mx-1">✦</span>
            <span className="text-gold text-xs mx-1">✦</span>
          </div>
        </div>

        <p className="font-inter text-dark-gray text-center mb-10 max-w-2xl mx-auto leading-relaxed relative">
          <span className="absolute -left-2 top-0 text-2xl text-gold/15 font-serif">"</span>
          Berikut adalah beberapa istilah umum dalam dunia parfum yang berguna
          untuk Anda ketahui saat memilih atau mendiskusikan parfum:
          <span className="absolute -bottom-2 right-0 text-2xl text-gold/15 font-serif">"</span>
        </p>

        {/* Enhanced terminology cards with luxury styling - with improved responsive design */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {terminologiCards.map((term, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 border border-gold/5 transition-all duration-500 hover:shadow-gold-subtle hover:-translate-y-1 transform relative group overflow-hidden"
            >
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                <div className="absolute inset-0 bg-[radial-gradient(circle,_#F5D57A_1px,_transparent_1px)] bg-[length:12px_12px]"></div>
              </div>

              {/* Gold accent line that appears on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/20 via-gold/60 to-gold/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

              {/* Term header with fancy underline */}
              <h3 className="font-playfair font-bold text-xl text-dark-gray mb-4 pb-2 relative">
                <span className="relative">
                  {term.title}
                  <span className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-gold/50 to-transparent transform"></span>
                </span>

                {/* Decorative gold dot */}
                <span className="absolute -left-1 -top-1 text-gold opacity-40 text-xs">✦</span>
              </h3>

              {/* Term description with enhanced typography */}
              <p className="font-inter text-light-gray leading-relaxed group-hover:text-dark-gray/80 transition-colors">
                {term.description}
              </p>

              {/* Subtle card number */}
              <div className="absolute bottom-3 right-3 text-3xl font-playfair text-gold/5 font-bold group-hover:text-gold/10 transition-colors">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-10 opacity-30">
          <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="bg-dark-gray min-h-screen py-14 px-8 md:px-16 relative overflow-hidden">
        {/* Centered background glow effects - positioned away from navbar */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-96 bg-[radial-gradient(ellipse_at_center,_rgba(245,213,122,0.03),transparent_70%)] rounded-full"></div>
        <div className="absolute top-48 right-10 w-72 h-72 bg-[radial-gradient(circle,_rgba(245,213,122,0.02),transparent_60%)] rounded-full"></div>
        <div className="absolute top-80 left-10 w-64 h-64 bg-[radial-gradient(circle,_rgba(245,213,122,0.02),transparent_60%)] rounded-full"></div>
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Luxury Header */}
          <div className="text-center mb-12 relative">
            {/* Decorative elements */}
            <div className="absolute left-0 right-0 top-0 flex justify-center opacity-30">
              <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent"></div>
            </div>

            <h1 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-4 relative inline-block">
              <span className="opacity-0 absolute -inset-0.5 bg-gold blur-sm animate-pulse-subtle"></span>
              <span className="relative">Edukasi Parfum</span>
              <span className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent transform opacity-60"></span>
            </h1>

            <div className="flex justify-center items-center mb-4">
              <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-gold/40"></div>
              <div className="mx-4 text-gold">✦</div>
              <div className="h-[2px] w-12 bg-gradient-to-r from-gold/40 to-transparent"></div>
            </div>

            <p className="font-inter text-white text-lg max-w-2xl mx-auto leading-relaxed">
              Pelajari lebih lanjut tentang komposisi parfum dan istilah -
              istilah yang sering digunakan dalam dunia perfumery.
            </p>
          </div>

          {/* Tab Navigation - Styled with luxury elements - With responsive improvements */}
          <div className="relative bg-gradient-to-r from-white/95 via-white to-white/95 rounded-t-lg grid grid-cols-2 sm:grid-cols-4 mb-0 shadow-lg overflow-hidden border border-gold/10">
            {["piramida", "notes", "konsentrasi", "terminologi"].map((tab) => (
              <button
                key={tab}
                className={`py-4 px-1 sm:px-2 font-playfair text-center text-sm sm:text-base transition-all duration-300 relative ${
                  activeTab === tab
                    ? "bg-white text-dark-gray font-semibold"
                    : "bg-gray-50/80 text-gray-500 hover:bg-white/80 hover:text-dark-gray/80"
                }`}
                onClick={() => handleTabChange(tab)}
              >
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/30 via-gold to-gold/30"></span>
                )}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "notes" ? (
            renderNotesTab()
          ) : activeTab === "konsentrasi" ? (
            renderKonsentrasiTab()
          ) : activeTab === "terminologi" ? (
            renderTerminologiTab()
          ) : (
            <div className="bg-white rounded-b-lg p-8 shadow-lg border-t-0 border border-gold/10">
              {/* Decorative pyramid image */}
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 opacity-30 relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/40 to-gold/60"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 0% 100%, 100% 100%)",
                    }}
                  ></div>
                </div>
              </div>

              <h2 className="font-playfair font-bold text-2xl text-dark-gray mb-8 text-center relative">
                <span className="relative inline-block">
                  {tabContent[activeTab].title}
                  <span className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent transform"></span>
                </span>
              </h2>

              <div className="relative">
                {/* Triangle design element */}
                <div className="absolute right-0 top-0 w-20 h-20 opacity-5">
                  <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M50 0L100 100H0L50 0Z" fill="#F5D57A"></path>
                  </svg>
                </div>

                {tabContent[activeTab].sections.map((section, index) => (
                  <div
                    key={index}
                    className="mb-12 transform hover:translate-x-1 transition-transform duration-500 ease-in-out"
                  >
                    <div className="flex items-center mb-3">
                      <span className="text-gold mr-3 opacity-70">✦</span>
                      <h3 className="font-playfair font-bold text-xl text-dark-gray">
                        {section.title}
                      </h3>
                    </div>

                    <div className="ml-6 border-l-2 border-gold/10 pl-6">
                      {section.paragraphs.map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="font-inter text-light-gray mb-4 leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {index < tabContent[activeTab].sections.length - 1 && (
                      <div className="flex justify-center my-8">
                        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom decorative element */}
              <div className="flex justify-center mt-6 opacity-30">
                <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Edukasi;
