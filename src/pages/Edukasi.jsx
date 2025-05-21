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
      <div className="bg-white rounded-b-lg p-8">
        <h2 className="font-playfair font-bold text-2xl text-dark-gray mb-6 text-center">
          Memahami Notes Category
        </h2>

        <div className="space-y-2">
          {notesCategories.map((category) => (
            <div key={category.id} className="border-b border-gray-200">
              <button
                className="w-full py-4 px-2 flex items-center justify-between text-left"
                onClick={() => toggleCategory(category.id)}
              >
                <span className="font-playfair font-bold text-lg text-dark-gray">
                  {category.name}
                </span>
                <span className="transform transition-transform">
                  {expandedCategory === category.id ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
              </button>
              {expandedCategory === category.id && (
                <div className="pb-4 px-2">
                  <p className="font-inter text-light-gray mb-3">
                    {category.description}
                  </p>
                  <p className="font-inter text-gray-500 text-sm italic mb-2">
                    Contoh:
                  </p>
                  <p className="font-inter text-light-gray">
                    {category.contoh}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-gold text-dark-gray font-playfair py-2 px-6 rounded-full hover:bg-opacity-90 transition">
            Lihat Semua
          </button>
        </div>
      </div>
    );
  };

  const renderKonsentrasiTab = () => {
    return (
      <div className="bg-white rounded-b-lg p-8">
        <h2 className="font-playfair font-bold text-2xl text-dark-gray mb-6 text-center">
          Konsentrasi Parfum
        </h2>

        <div className="bg-gold bg-opacity-30 rounded-lg p-4 mb-8 text-center">
          <p className="font-inter text-dark-gray italic">
            Konsentrasi parfum menunjukkan persentase minyak esensial dalam
            campurannya. Semakin tinggi konsentrasinya, semakin tahan lama
            aromanya dan biasanya semakin mahal harganya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="font-playfair font-bold text-xl text-dark-gray border-b border-gray-200 pb-2 mb-4">
              Extrait de Parfum (EDP)
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-gold mr-2">✦</span>
                <span className="font-inter text-light-gray">
                  Konsentrasi tertinggi dengan 20 - 30% minyak esensial
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">✦</span>
                <span className="font-inter text-light-gray">
                  Bertahan 6-8 jam atau lebih
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">✦</span>
                <span className="font-inter text-light-gray">
                  Memiliki proyeksi yang intim dan elegan
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="font-playfair font-bold text-xl text-dark-gray border-b border-gray-200 pb-2 mb-4">
              Eau de Parfum (EDP)
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-gold mr-2">✦</span>
                <span className="font-inter text-light-gray">
                  Konsentrasi tinggi dengan 15 - 20% minyak esensial
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">✦</span>
                <span className="font-inter text-light-gray">
                  Bertahan 4-6 jam atau lebih
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">✦</span>
                <span className="font-inter text-light-gray">
                  Memiliki proyeksi yang baik dan seimbang
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="font-playfair font-bold text-xl text-dark-gray border-b border-gray-200 pb-2 mb-4">
              Eau de Toilette (EDT)
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-gold mr-2">✦</span>
                <span className="font-inter text-light-gray">
                  Konsentrasi menengah dengan 5 - 15% minyak esensial
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">✦</span>
                <span className="font-inter text-light-gray">
                  Bertahan 2-4 jam atau lebih
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">✦</span>
                <span className="font-inter text-light-gray">
                  Memiliki proyeksi yang baik namun tidak bertahan lama
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="font-playfair font-bold text-xl text-dark-gray border-b border-gray-200 pb-2 mb-4">
              Eau de Cologne (EDC)
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-gold mr-2">✦</span>
                <span className="font-inter text-light-gray">
                  Konsentrasi rendah dengan 2 - 4% minyak esensial
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">✦</span>
                <span className="font-inter text-light-gray">
                  Bertahan 1-2 jam atau lebih
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">✦</span>
                <span className="font-inter text-light-gray">
                  Memiliki proyeksi yang ringan dan segar
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderTerminologiTab = () => {
    return (
      <div className="bg-white rounded-b-lg p-8">
        <h2 className="font-playfair font-bold text-2xl text-dark-gray mb-6 text-center">
          Terminologi Parfum
        </h2>

        <p className="font-inter text-dark-gray text-center mb-8">
          Berikut adalah beberapa istilah umum dalam dunia parfum yang berguna
          untuk Anda ketahui saat memilih atau mendiskusikan parfum:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {terminologiCards.map((term, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-6">
              <h3 className="font-playfair font-bold text-xl text-dark-gray border-b border-gray-200 pb-2 mb-4">
                {term.title}
              </h3>
              <p className="font-inter text-light-gray">{term.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="bg-dark-gray min-h-screen py-14 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-4">
              Edukasi Parfum
            </h1>
            <p className="font-inter text-white text-lg">
              Pelajari lebih lanjut tentang komposisi parfum dan istilah -
              istilah yang sering digunakan.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-t-lg grid grid-cols-4 mb-0">
            {["piramida", "notes", "konsentrasi", "terminologi"].map((tab) => (
              <button
                key={tab}
                className={`py-4 font-playfair text-center transition-colors ${
                  activeTab === tab
                    ? "bg-white text-dark-gray"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-50"
                }`}
                onClick={() => handleTabChange(tab)}
              >
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
            <div className="bg-white rounded-b-lg p-8">
              <h2 className="font-playfair font-bold text-2xl text-dark-gray mb-6 text-center">
                {tabContent[activeTab].title}
              </h2>

              {tabContent[activeTab].sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h3 className="font-playfair font-bold text-xl text-dark-gray mb-3">
                    {section.title}
                  </h3>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="font-inter text-light-gray mb-4 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {index < tabContent[activeTab].sections.length - 1 && (
                    <hr className="border-gray-200 my-6" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Edukasi;
