import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Icon components
const MaleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="#CBE3F7" />
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
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="#FFC5BF" />
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
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="#EBDDEE" />
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
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="#F9EEC7" />
    <path
      d="M12 6V9M16.24 7.76L14.12 9.88M18 12H15M16.24 16.24L14.12 14.12M12 15V18M7.76 16.24L9.88 14.12M6 12H9M7.76 7.76L9.88 9.88M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
      stroke="#E8B321"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DayIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="#CBE3F7" />
    <path
      d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
      fill="#3E8CDB"
    />
    <path
      d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.9 4.9M17.6858 6.31412L19.1 4.9M6.31412 17.69L4.9 19.1M17.6858 17.69L19.1 19.1M22 12H20"
      stroke="#3E8CDB"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const NightIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="#CBE3F7" />
    <path
      d="M21.9548 14.339C21.5108 14.5258 21.0108 14.5258 20.5668 14.339C19.1548 13.795 17.9988 12.639 17.4548 11.227C17.2688 10.783 17.2688 10.283 17.4548 9.839C17.9988 8.427 19.1548 7.271 20.5668 6.727C21.0108 6.54 21.5108 6.54 21.9548 6.727C21.1908 3.875 18.5908 1.834 15.4998 2.003C12.7528 2.152 10.4228 4.117 9.91079 6.839C9.39879 9.561 10.7978 12.252 13.2578 13.535C15.7178 14.818 18.7448 14.237 20.5668 12.177C21.1108 11.565 21.6548 11.067 21.9548 14.339Z"
      fill="#003087"
    />
  </svg>
);

const SpecialIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="#CBE3F7" />
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill="#003087"
    />
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

const Recommendation = () => {
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
    // Logic to handle form submission
    console.log(formData);
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
      { value: "male", label: "Pria", icon: <MaleIcon /> },
      { value: "female", label: "Wanita", icon: <FemaleIcon /> },
      { value: "unisex", label: "Unisex", icon: <UnisexIcon /> },
    ],
    timeOfUse: [
      { value: "morning", label: "Pagi", icon: <MorningIcon /> },
      { value: "day", label: "Siang", icon: <DayIcon /> },
      { value: "evening", label: "Malam", icon: <NightIcon /> },
      { value: "special", label: "Acara Khusus", icon: <SpecialIcon /> },
    ],
    budget: [
      { value: "low", label: "< Rp 150.000", icon: <MaleIcon /> },
      { value: "medium", label: "Rp 150.000 - Rp 300.000", icon: <MaleIcon /> },
      { value: "high", label: "> Rp 300.000", icon: <MaleIcon /> },
    ],
    concentration: [
      { value: "edt", label: "EDT", icon: <MaleIcon /> },
      { value: "edp", label: "EDP", icon: <MaleIcon /> },
      { value: "parfum", label: "Parfum", icon: <MaleIcon /> },
    ],
    bottleSize: [
      { value: "travel", label: "Travel Size (5-15ml)", icon: <MaleIcon /> },
      { value: "small", label: "Small (30ml)", icon: <MaleIcon /> },
      { value: "large", label: "Large (50-100ml)", icon: <MaleIcon /> },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="bg-dark-gray py-8 px-4 md:px-16 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="px-8 py-12">
              {/* Header */}
              <div className="mb-12 text-center">
                <h1 className="font-playfair font-semibold text-3xl md:text-4xl text-black mb-2">
                  Temukan Parfum Anda
                </h1>
                <p className="text-sm text-gray-600">
                  Jawab pertanyaan berikut untuk mendapatkan rekomendasi parfum
                  yang sesuai
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Gender Selection */}
                <div className="mb-8">
                  <h2 className="font-playfair font-medium text-xl mb-4">
                    Untuk siapa parfum ini?
                  </h2>
                  <div className="flex flex-wrap justify-between gap-2">
                    {options.gender.map((option) => (
                      <label
                        key={option.value}
                        className={`w-[32%] relative border rounded-xl p-4 cursor-pointer transition-all
                          ${
                            formData.gender === option.value
                              ? "border-gold bg-gold/5 shadow-md"
                              : "border-gray-200 hover:border-gold/50 hover:shadow-sm"
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
                          <div className="mb-2">{option.icon}</div>
                          <span className="font-playfair text-center">
                            {option.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Time of Use */}
                <div className="mb-8">
                  <h2 className="font-playfair font-medium text-xl mb-4">
                    Kapan parfum akan digunakan?
                  </h2>
                  <div className="flex flex-wrap justify-between gap-2">
                    {options.timeOfUse.map((option) => (
                      <label
                        key={option.value}
                        className={`w-[32%] relative border rounded-xl p-4 cursor-pointer transition-all
                          ${
                            formData.timeOfUse === option.value
                              ? "border-gold bg-gold/5 shadow-md"
                              : "border-gray-200 hover:border-gold/50 hover:shadow-sm"
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
                          <div className="mb-2">{option.icon}</div>
                          <span className="font-playfair text-center">
                            {option.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div className="mb-8">
                  <h2 className="font-playfair font-medium text-xl mb-4">
                    Berapa budget kamu?
                  </h2>
                  <div className="flex flex-wrap justify-between gap-2">
                    {options.budget.map((option) => (
                      <label
                        key={option.value}
                        className={`w-[32%] relative border rounded-xl p-4 cursor-pointer transition-all
                          ${
                            formData.budget === option.value
                              ? "border-gold bg-gold/5 shadow-md"
                              : "border-gray-200 hover:border-gold/50 hover:shadow-sm"
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
                          <div className="mb-2">{option.icon}</div>
                          <span className="font-playfair text-center">
                            {option.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Concentration */}
                <div className="mb-8">
                  <h2 className="font-playfair font-medium text-xl mb-4">
                    Pilih tingkat konsentrasi Anda
                  </h2>
                  <div className="flex flex-wrap justify-between gap-2">
                    {options.concentration.map((option) => (
                      <label
                        key={option.value}
                        className={`w-[32%] relative border rounded-xl p-4 cursor-pointer transition-all
                          ${
                            formData.concentration === option.value
                              ? "border-gold bg-gold/5 shadow-md"
                              : "border-gray-200 hover:border-gold/50 hover:shadow-sm"
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
                          <div className="mb-2">{option.icon}</div>
                          <span className="font-playfair text-center">
                            {option.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Bottle Size */}
                <div className="mb-8">
                  <h2 className="font-playfair font-medium text-xl mb-4">
                    Berapa size botol yang kamu cari?
                  </h2>
                  <div className="flex flex-wrap justify-between gap-2">
                    {options.bottleSize.map((option) => (
                      <label
                        key={option.value}
                        className={`w-[32%] relative border rounded-xl p-4 cursor-pointer transition-all
                          ${
                            formData.bottleSize === option.value
                              ? "border-gold bg-gold/5 shadow-md"
                              : "border-gray-200 hover:border-gold/50 hover:shadow-sm"
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
                          <div className="mb-2">{option.icon}</div>
                          <span className="font-playfair text-center">
                            {option.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Aroma Description */}
                <div className="mb-10">
                  <h2 className="font-playfair font-medium text-xl mb-4">
                    Deskripsikan aroma yang kamu inginkan
                  </h2>
                  <textarea
                    name="aromaDescription"
                    value={formData.aromaDescription}
                    onChange={handleChange}
                    className="w-full p-4 bg-cream border border-gray-300 rounded-xl font-light text-gray-600"
                    placeholder="Contoh : Aku ingin parfum yang segar dan ringan seperti jeruk tidak manis dan cocok untuk olahraga"
                    rows="4"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="w-full font-playfair font-semibold bg-gold py-3 px-6 rounded-lg shadow-md hover:bg-gold/90 transition-colors"
                  >
                    Dapatkan Rekomendasi Parfum
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
