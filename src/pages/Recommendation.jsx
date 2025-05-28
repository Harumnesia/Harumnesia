import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Icon components
const MaleIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="10" fill="#CBE3F7" className="drop-shadow-md" />
    <path
      d="M12 14C9.79086 14 8 12.2091 8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14Z"
      fill="#003087"
    />
    <path
      d="M12 15C8.13401 15 5 18.134 5 22H19C19 18.134 15.866 15 12 15Z"
      fill="#003087"
    />
  </svg>
);

const FemaleIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="10" fill="#FFC5BF" className="drop-shadow-md" />
    <path
      d="M12 14C9.79086 14 8 12.2091 8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14Z"
      fill="#DD437B"
    />
    <path
      d="M12 15C8.13401 15 5 18.134 5 22H19C19 18.134 15.866 15 12 15Z"
      fill="#DD437B"
    />
  </svg>
);

const UnisexIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="10" fill="#EBDDEE" className="drop-shadow-md" />
    <path
      d="M12 14C9.79086 14 8 12.2091 8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14Z"
      fill="#9A4AA6"
    />
    <path
      d="M12 15C8.13401 15 5 18.134 5 22H19C19 18.134 15.866 15 12 15Z"
      fill="#9A4AA6"
    />
  </svg>
);

const MorningIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="10" fill="#FFF4E6" className="drop-shadow-md" />
    <circle cx="12" cy="12" r="4" fill="#F59E0B" />
    <path
      d="M12 2V4M18.36 5.64L17.66 6.34M22 12H20M18.36 18.36L17.66 17.66M12 20V22M6.34 18.36L7.04 17.66M2 12H4M6.34 5.64L7.04 6.34"
      stroke="#F59E0B"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const DayIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="10" fill="#E0F2FE" className="drop-shadow-md" />
    <circle cx="12" cy="12" r="5" fill="#0EA5E9" />
    <path
      d="M12 2V4M18.36 5.64L17.66 6.34M22 12H20M18.36 18.36L17.66 17.66M12 20V22M6.34 18.36L7.04 17.66M2 12H4M6.34 5.64L7.04 6.34"
      stroke="#0EA5E9"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const NightIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="10" fill="#1E1B4B" className="drop-shadow-md" />
    <path
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      fill="#FBBF24"
    />
    <circle cx="17" cy="7" r="1" fill="#FBBF24" />
    <circle cx="19" cy="9" r="0.5" fill="#FBBF24" />
    <circle cx="16" cy="4" r="0.5" fill="#FBBF24" />
  </svg>
);

const TimeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm1-8h4v2h-6V7h2v5z"
      fill="currentColor"
    />
  </svg>
);

// Budget Icons
const BudgetLowIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="10" fill="#FEF3C7" className="drop-shadow-md" />
    <path
      d="M12 7V17M8 12H16"
      stroke="#D97706"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle
      cx="12"
      cy="12"
      r="6"
      stroke="#D97706"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

const BudgetMediumIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="10" fill="#DCFCE7" className="drop-shadow-md" />
    <path
      d="M12 7V17M8 12H16"
      stroke="#059669"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle
      cx="12"
      cy="12"
      r="6"
      stroke="#059669"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="8" cy="8" r="2" fill="#059669" />
    <circle cx="16" cy="16" r="2" fill="#059669" />
  </svg>
);

const BudgetHighIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="10" fill="#FEF3C7" className="drop-shadow-md" />
    <path
      d="M12 7V17M8 12H16"
      stroke="#D97706"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle
      cx="12"
      cy="12"
      r="6"
      stroke="#D97706"
      strokeWidth="2"
      fill="#FBBF24"
    />
    <circle cx="8" cy="8" r="2" fill="#D97706" />
    <circle cx="16" cy="8" r="2" fill="#D97706" />
    <circle cx="8" cy="16" r="2" fill="#D97706" />
    <circle cx="16" cy="16" r="2" fill="#D97706" />
  </svg>
);

// Concentration Icons
const EDTIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="10" fill="#E0F2FE" className="drop-shadow-md" />
    <rect x="9" y="6" width="6" height="12" rx="3" fill="#0EA5E9" />
    <rect x="10" y="8" width="4" height="2" fill="white" />
    <circle cx="12" cy="5" r="1" fill="#0EA5E9" />
  </svg>
);

const EDPIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="10" fill="#F3E8FF" className="drop-shadow-md" />
    <rect x="9" y="6" width="6" height="12" rx="3" fill="#9333EA" />
    <rect x="10" y="8" width="4" height="4" fill="white" />
    <circle cx="12" cy="5" r="1" fill="#9333EA" />
  </svg>
);

const XDPIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="10" fill="#FEF2F2" className="drop-shadow-md" />
    <rect x="9" y="6" width="6" height="12" rx="3" fill="#DC2626" />
    <rect x="10" y="8" width="4" height="6" fill="white" />
    <circle cx="12" cy="5" r="1" fill="#DC2626" />
  </svg>
);

// Bottle Size Icons
const TravelSizeIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="10" fill="#FEF3C7" className="drop-shadow-md" />
    <rect x="10" y="6" width="4" height="12" rx="2" fill="#F59E0B" />
    <rect x="11" y="8" width="2" height="2" fill="white" />
    <circle cx="12" cy="5" r="0.5" fill="#F59E0B" />
  </svg>
);

const SmallSizeIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="10" fill="#E0F2FE" className="drop-shadow-md" />
    <rect x="9" y="6" width="6" height="12" rx="3" fill="#0EA5E9" />
    <rect x="10" y="8" width="4" height="3" fill="white" />
    <circle cx="12" cy="5" r="0.75" fill="#0EA5E9" />
  </svg>
);

const LargeSizeIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="10" fill="#F3E8FF" className="drop-shadow-md" />
    <rect x="8" y="6" width="8" height="12" rx="4" fill="#9333EA" />
    <rect x="9" y="8" width="6" height="4" fill="white" />
    <circle cx="12" cy="5" r="1" fill="#9333EA" />
  </svg>
);

const Recommendation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gender: "",
    timeOfUse: "",
    budget: "",
    concentration: "",
    bottleSize: "",
    aromaDescription: "",
  });
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send the form data to the backend API
    // For now, we'll just navigate to the results page
    console.log(formData);
    navigate("/recommendation/results");
  };

  const getMockRecommendations = (data) => {
    // This would normally come from an API based on user preferences
    const allPerfumes = [
      {
        id: 1,
        name: "Dior Sauvage",
        brand: "Dior",
        image: "https://placehold.co/300x300?text=Dior+Sauvage",
        price: "Rp 1.800.000",
        description:
          "Fresh, masculine fragrance with notes of bergamot, pepper, and ambroxan.",
        gender: "male",
        occasions: ["daily", "work"],
        seasons: ["spring", "summer"],
        budget: "high",
      },
      {
        id: 2,
        name: "Chanel No. 5",
        brand: "Chanel",
        image: "https://placehold.co/300x300?text=Chanel+No.5",
        price: "Rp 2.200.000",
        description:
          "Timeless, floral aldehydic fragrance with notes of rose, jasmine, and vanilla.",
        gender: "female",
        occasions: ["evening", "formal"],
        seasons: ["fall", "winter"],
        budget: "high",
      },
      {
        id: 3,
        name: "Versace Eros",
        brand: "Versace",
        image: "https://placehold.co/300x300?text=Versace+Eros",
        price: "Rp 1.500.000",
        description:
          "Bold, sensual fragrance with notes of mint, green apple, and vanilla.",
        gender: "male",
        occasions: ["evening", "date"],
        seasons: ["fall", "winter"],
        budget: "medium",
      },
      {
        id: 4,
        name: "Marc Jacobs Daisy",
        brand: "Marc Jacobs",
        image: "https://placehold.co/300x300?text=MJ+Daisy",
        price: "Rp 1.400.000",
        description:
          "Fresh, feminine fragrance with notes of strawberry, violet, and jasmine.",
        gender: "female",
        occasions: ["daily", "casual"],
        seasons: ["spring", "summer"],
        budget: "medium",
      },
      {
        id: 5,
        name: "Jo Malone Wood Sage & Sea Salt",
        brand: "Jo Malone",
        image: "https://placehold.co/300x300?text=Jo+Malone",
        price: "Rp 1.600.000",
        description:
          "Fresh, natural fragrance with notes of ambrette seeds, sea salt, and sage.",
        gender: "unisex",
        occasions: ["daily", "casual"],
        seasons: ["summer", "spring"],
        budget: "medium",
      },
      {
        id: 6,
        name: "Bleu de Chanel",
        brand: "Chanel",
        image: "https://placehold.co/300x300?text=Bleu+de+Chanel",
        price: "Rp 1.900.000",
        description:
          "Fresh, woody aromatic fragrance with notes of citrus, vetiver, and incense.",
        gender: "male",
        occasions: ["work", "formal"],
        seasons: ["all"],
        budget: "high",
      },
    ];

    // Filter based on user preferences
    let filtered = [...allPerfumes];

    if (data.gender && data.gender !== "any") {
      filtered = filtered.filter(
        (p) => p.gender === data.gender || p.gender === "unisex"
      );
    }

    if (data.timeOfUse && data.timeOfUse !== "any") {
      filtered = filtered.filter((p) => p.occasions.includes(data.timeOfUse));
    }

    if (data.budget && data.budget !== "any") {
      filtered = filtered.filter((p) => p.budget === data.budget);
    }

    // Return up to 3 recommendations
    return filtered.slice(0, 3);
  };

  const resetForm = () => {
    setFormData({
      gender: "",
      timeOfUse: "",
      budget: "",
      concentration: "",
      bottleSize: "",
      aromaDescription: "",
    });
    setShowResults(false);
  };

  const options = {
    gender: [
      {
        value: "male",
        label: "Pria",
        icon: <MaleIcon />,
        tooltip: "Parfum dengan aroma maskulin yang cocok untuk pria",
      },
      {
        value: "female",
        label: "Wanita",
        icon: <FemaleIcon />,
        tooltip: "Parfum dengan aroma feminin yang cocok untuk wanita",
      },
      {
        value: "unisex",
        label: "Unisex",
        icon: <UnisexIcon />,
        tooltip: "Parfum dengan aroma netral yang cocok untuk pria dan wanita",
      },
    ],
    timeOfUse: [
      {
        value: "day",
        label: "Siang",
        icon: <MorningIcon />,
        tooltip:
          "Parfum ringan dan fresh yang cocok untuk aktivitas siang hari",
      },
      {
        value: "night",
        label: "Malam",
        icon: <DayIcon />,
        tooltip:
          "Parfum dengan karakter lebih bold dan sensual untuk malam hari",
      },
      {
        value: "versatile",
        label: "Versatile",
        icon: <NightIcon />,
        tooltip:
          "Parfum serbaguna yang cocok digunakan kapan saja, siang atau malam",
      },
    ],
    budget: [
      {
        value: "low",
        label: "< Rp 150.000",
        icon: <BudgetLowIcon />,
        tooltip: "Parfum dengan harga terjangkau di bawah 150 ribu rupiah",
      },
      {
        value: "medium",
        label: "Rp 150.000 - Rp 300.000",
        icon: <BudgetMediumIcon />,
        tooltip: "Parfum dengan harga menengah antara 150-300 ribu rupiah",
      },
      {
        value: "high",
        label: "> Rp 300.000",
        icon: <BudgetHighIcon />,
        tooltip: "Parfum premium dengan harga di atas 300 ribu rupiah",
      },
    ],
    concentration: [
      {
        value: "edt",
        label: "EDT",
        icon: <EDTIcon />,
        tooltip:
          "Eau de Toilette - konsentrasi 5-15%, tahan 3-5 jam, cocok untuk sehari-hari",
      },
      {
        value: "edp",
        label: "EDP",
        icon: <EDPIcon />,
        tooltip:
          "Eau de Parfum - konsentrasi 15-20%, tahan 4-8 jam, lebih intens dan tahan lama",
      },
      {
        value: "xdp",
        label: "XDP",
        icon: <XDPIcon />,
        tooltip:
          "Extrait de Parfum - konsentrasi 20-40%, tahan 8+ jam, paling pekat dan mewah",
      },
    ],
    bottleSize: [
      {
        value: "travel",
        label: "Travel Size (5-15ml)",
        icon: <TravelSizeIcon />,
        tooltip:
          "Ukuran mini yang praktis dibawa bepergian dan cocok untuk mencoba parfum baru",
      },
      {
        value: "small",
        label: "Small (30ml)",
        icon: <SmallSizeIcon />,
        tooltip:
          "Ukuran standar yang cukup untuk penggunaan sehari-hari selama beberapa bulan",
      },
      {
        value: "large",
        label: "Large (50-100ml)",
        icon: <LargeSizeIcon />,
        tooltip:
          "Ukuran besar yang ekonomis untuk parfum favorit dan penggunaan jangka panjang",
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="bg-dark-gray py-8 px-4 md:px-16 min-h-screen">
        <div className="max-w-4xl mx-auto mb-6"> 
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
            <div className="px-8 py-12 md:px-12 md:py-16">
              {/* Header */}
              <div className="mb-16 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 rounded-full transform -skew-y-1"></div>
                <div className="relative">
                  <h1 className="font-playfair font-bold text-4xl md:text-5xl text-gray-900 mb-4 leading-tight">
                    Temukan Parfum <span className="text-gold">Impian</span>{" "}
                    Anda
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Jawab pertanyaan berikut untuk mendapatkan rekomendasi
                    parfum yang sempurna sesuai kepribadian dan preferensi Anda
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className="w-24 h-1 bg-gradient-to-r from-gold to-yellow-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-2">
                {/* Progress indicator */}
                <div className="mb-5">
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5, 6].map((step) => (
                      <div
                        key={step}
                        className={`w-3 h-3 rounded-full transition-all duration-500 ${
                          step <=
                          Object.values(formData).filter(Boolean).length + 1
                            ? "bg-gold shadow-md"
                            : "bg-gray-200"
                        }`}
                      ></div>
                    ))}
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-3">
                    {Object.values(formData).filter(Boolean).length} dari 6
                    pertanyaan dijawab
                  </p>
                </div>
                {/* Gender Selection */}
                <div className="mb-10">
                  <h2 className="font-playfair font-medium text-xl mb-6 text-gray-800 flex items-center">
                    <span className="w-2 h-8 bg-gold rounded-full mr-3"></span>
                    Untuk siapa parfum ini?
                  </h2>
                  <div className="flex flex-wrap justify-between gap-3">
                    {options.gender.map((option) => (
                      <label
                        key={option.value}
                        className={`group w-[32%] relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 transform hover:scale-105
                          ${
                            formData.gender === option.value
                              ? "border-gold bg-gradient-to-br from-gold/10 to-gold/5 shadow-lg ring-2 ring-gold/30"
                              : "border-gray-200 hover:border-gold/50 hover:shadow-md hover:bg-gray-50/50"
                          }`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={option.value}
                          checked={formData.gender === option.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className="flex flex-col items-center justify-center">
                          <div className="mb-2 transition-transform duration-300 scale-75">
                            {option.icon}
                          </div>
                          <span className="font-playfair text-center font-medium text-gray-700 group-hover:text-gray-900 text-sm">
                            {option.label}
                          </span>
                        </div>

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 w-48 text-center">
                          {option.tooltip}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Time of Use */}
                <div className="mb-10">
                  <h2 className="font-playfair font-medium text-xl mb-6 text-gray-800 flex items-center">
                    <span className="w-2 h-8 bg-gold rounded-full mr-3"></span>
                    Kapan parfum akan digunakan?
                  </h2>
                  <div className="flex flex-wrap justify-between gap-3">
                    {options.timeOfUse.map((option) => (
                      <label
                        key={option.value}
                        className={`group w-[32%] relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 transform hover:scale-105
                          ${
                            formData.timeOfUse === option.value
                              ? "border-gold bg-gradient-to-br from-gold/10 to-gold/5 shadow-lg ring-2 ring-gold/30"
                              : "border-gray-200 hover:border-gold/50 hover:shadow-md hover:bg-gray-50/50"
                          }`}
                      >
                        <input
                          type="radio"
                          name="timeOfUse"
                          value={option.value}
                          checked={formData.timeOfUse === option.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className="flex flex-col items-center justify-center">
                          <div className="mb-2 transition-transform duration-300 scale-75">
                            {option.icon}
                          </div>
                          <span className="font-playfair text-center font-medium text-gray-700 group-hover:text-gray-900 text-sm">
                            {option.label}
                          </span>
                        </div>

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 w-48 text-center">
                          {option.tooltip}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div className="mb-10">
                  <h2 className="font-playfair font-medium text-xl mb-6 text-gray-800 flex items-center">
                    <span className="w-2 h-8 bg-gold rounded-full mr-3"></span>
                    Berapa budget kamu?
                  </h2>
                  <div className="flex flex-wrap justify-between gap-3">
                    {options.budget.map((option) => (
                      <label
                        key={option.value}
                        className={`group w-[32%] relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 transform hover:scale-105
                          ${
                            formData.budget === option.value
                              ? "border-gold bg-gradient-to-br from-gold/10 to-gold/5 shadow-lg ring-2 ring-gold/30"
                              : "border-gray-200 hover:border-gold/50 hover:shadow-md hover:bg-gray-50/50"
                          }`}
                      >
                        <input
                          type="radio"
                          name="budget"
                          value={option.value}
                          checked={formData.budget === option.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className="flex flex-col items-center justify-center">
                          <div className="mb-2 transition-transform duration-300 scale-75">
                            {option.icon}
                          </div>
                          <span className="font-playfair text-center font-medium text-gray-700 group-hover:text-gray-900 text-xs">
                            {option.label}
                          </span>
                        </div>

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 w-48 text-center">
                          {option.tooltip}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Concentration */}
                <div className="mb-10">
                  <h2 className="font-playfair font-medium text-xl mb-6 text-gray-800 flex items-center">
                    <span className="w-2 h-8 bg-gold rounded-full mr-3"></span>
                    Pilih tingkat konsentrasi Anda
                  </h2>
                  <div className="flex flex-wrap justify-between gap-3">
                    {options.concentration.map((option) => (
                      <label
                        key={option.value}
                        className={`group w-[32%] relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 transform hover:scale-105
                          ${
                            formData.concentration === option.value
                              ? "border-gold bg-gradient-to-br from-gold/10 to-gold/5 shadow-lg ring-2 ring-gold/30"
                              : "border-gray-200 hover:border-gold/50 hover:shadow-md hover:bg-gray-50/50"
                          }`}
                      >
                        <input
                          type="radio"
                          name="concentration"
                          value={option.value}
                          checked={formData.concentration === option.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className="flex flex-col items-center justify-center">
                          <div className="mb-2 transition-transform duration-300 scale-75">
                            {option.icon}
                          </div>
                          <span className="font-playfair text-center font-medium text-gray-700 group-hover:text-gray-900 text-sm">
                            {option.label}
                          </span>
                        </div>

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 w-56 text-center">
                          {option.tooltip}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Bottle Size */}
                <div className="mb-10">
                  <h2 className="font-playfair font-medium text-xl mb-6 text-gray-800 flex items-center">
                    <span className="w-2 h-8 bg-gold rounded-full mr-3"></span>
                    Berapa size botol yang kamu cari?
                  </h2>
                  <div className="flex flex-wrap justify-between gap-3">
                    {options.bottleSize.map((option) => (
                      <label
                        key={option.value}
                        className={`group w-[32%] relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 transform hover:scale-105
                          ${
                            formData.bottleSize === option.value
                              ? "border-gold bg-gradient-to-br from-gold/10 to-gold/5 shadow-lg ring-2 ring-gold/30"
                              : "border-gray-200 hover:border-gold/50 hover:shadow-md hover:bg-gray-50/50"
                          }`}
                      >
                        <input
                          type="radio"
                          name="bottleSize"
                          value={option.value}
                          checked={formData.bottleSize === option.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className="flex flex-col items-center justify-center">
                          <div className="mb-2 transition-transform duration-300 scale-75">
                            {option.icon}
                          </div>
                          <span className="font-playfair text-center font-medium text-gray-700 group-hover:text-gray-900 text-xs">
                            {option.label}
                          </span>
                        </div>

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 w-52 text-center">
                          {option.tooltip}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Aroma Description */}
                <div className="mb-12">
                  <h2 className="font-playfair font-medium text-xl mb-6 text-gray-800 flex items-center">
                    <span className="w-2 h-8 bg-gold rounded-full mr-3"></span>
                    Deskripsikan aroma yang kamu inginkan
                  </h2>
                  <div className="relative">
                    <textarea
                      name="aromaDescription"
                      value={formData.aromaDescription}
                      onChange={handleChange}
                      className="w-full p-6 bg-gradient-to-br from-cream to-gray-50 border-2 border-gray-200 rounded-2xl font-light text-gray-700 focus:border-gold focus:ring-4 focus:ring-gold/20 focus:outline-none transition-all duration-300 resize-none hover:shadow-md placeholder-gray-400"
                      placeholder="Contoh: Aku ingin parfum yang segar dan ringan seperti jeruk tidak manis dan cocok untuk olahraga"
                      rows="5"
                    ></textarea>
                    <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                      {formData.aromaDescription.length}/500
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="group relative w-full mt-2 font-playfair font-semibold bg-gradient-to-r from-gold to-yellow-500 text-white py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Dapatkan Rekomendasi Parfum
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Recommendation;
