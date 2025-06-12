import React from "react";

const PerfumeVisualizer = ({ perfume }) => {
  // Define note categories and their vertical positions
  const noteTypes = [
    {
      type: "top",
      label: "Top Notes",
      position: "top-0",
      color: "from-yellow-300 to-amber-400",
    },
    {
      type: "middle",
      label: "Middle Notes",
      position: "top-1/3",
      color: "from-rose-400 to-red-500",
    },
    {
      type: "base",
      label: "Base Notes",
      position: "top-2/3",
      color: "from-blue-600 to-indigo-800",
    },
  ];

  // Default notes if perfume doesn't have specific ones
  const defaultNotes = {
    top: ["Citrus", "Bergamot"],
    middle: ["Floral", "Spice"],
    base: ["Musk", "Vanilla"],
  };

  // Use perfume notes if available, otherwise use defaults
  const notes = perfume?.notes || defaultNotes;

  return (
    <div className="relative w-full max-w-xs mx-auto h-96">
      {/* Bottle Container */}
      <div className="absolute w-full h-full flex items-end justify-center">
        <div className="relative w-40 h-64 bg-opacity-40 bg-gold rounded-md overflow-hidden">
          {/* Glass Bottle Effect */}
          <div className="absolute inset-0 bg-white bg-opacity-20"></div>

          {/* Perfume Liquid */}
          <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gold bg-opacity-60">
            {/* Liquid Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-300 to-amber-500 opacity-50"></div>
          </div>

          {/* Bottle Cap */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-12 bg-gray-800 rounded-t-md"></div>

          {/* Bottle Neck */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gold bg-opacity-40 rounded-t-sm"></div>

          {/* Bottle Label */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-white bg-opacity-80 flex items-center justify-center p-2 rounded-sm">
            <div className="text-center">
              <h3 className="font-playfair font-bold text-dark-gray text-sm">
                {perfume?.name || "Mystery Perfume"}
              </h3>
              <p className="font-inter text-xs text-light-gray">
                {perfume?.brand || "Harumnesia"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Visualization */}
      <div className="absolute w-full h-full pointer-events-none">
        {noteTypes.map((noteType, index) => (
          <div
            key={index}
            className={`absolute ${noteType.position} left-0 w-full px-4`}
          >
            <div className="relative">
              <div className="absolute -left-4 transform -translate-y-1/2">
                <div className="bg-dark-gray text-white text-xs px-2 py-1 rounded font-inter">
                  {noteType.label}
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                {(notes[noteType.type] || []).map((note, i) => (
                  <div
                    key={i}
                    className={`bg-gradient-to-br ${noteType.color} rounded-full w-10 h-10 flex items-center justify-center text-white text-xs p-1 shadow-lg`}
                    style={{
                      transform: `translateY(${i * 5 - 10}px)`,
                      opacity: 0.8 + i * 0.05,
                    }}
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerfumeVisualizer;
