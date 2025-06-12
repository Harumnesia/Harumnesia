import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const SearchableDropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "Pilih...",
  searchPlaceholder = "Cari...",
  disabled = false,
  className = "",
  label = "",
  renderOption = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filter options based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter((option) => {
        const searchValue =
          typeof option === "string"
            ? option
            : option.label || option.name || option.value || "";
        return searchValue.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredOptions(filtered);
    }
  }, [searchTerm, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const getDisplayValue = () => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value.label || value.name || value.value || "";
  };

  const getOptionDisplay = (option) => {
    if (renderOption) return renderOption(option);
    if (typeof option === "string") return option;
    return option.label || option.name || option.value || "";
  };

  const getOptionKey = (option, index) => {
    if (typeof option === "string") return `${option}_${index}`;
    return option.id || option.value || option.name || index;
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block mb-1.5 sm:mb-2 md:mb-3 font-inter font-semibold text-xs sm:text-sm text-dark-gray flex items-center">
          <div className="w-1 h-3 sm:h-4 bg-gradient-to-b from-gold to-gold/60 rounded-full mr-1.5 sm:mr-2"></div>
          {label}
        </label>
      )}

      {/* Dropdown Trigger */}
      <div
        className={`
          w-full h-[40px] sm:h-[44px] md:h-[48px] px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 
          bg-gradient-to-br from-cream/50 to-white border-2 border-gray-200 rounded-lg sm:rounded-xl 
          font-inter text-xs sm:text-sm cursor-pointer transition-all duration-300 
          hover:border-gold/50 hover:shadow-md flex items-center justify-between
          ${isOpen ? "border-gold ring-2 ring-gold/20" : ""}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span
          className={`truncate ${!value ? "text-gray-400" : "text-dark-gray"}`}
        >
          {getDisplayValue() || placeholder}
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-200 
            ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gold/20 rounded-lg sm:rounded-xl shadow-[0_15px_35px_-12px_rgba(0,0,0,0.25)] max-h-60 flex flex-col">
          {/* Search Input */}
          <div className="p-2 sm:p-3 border-b border-gray-100">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                className="w-full pl-8 sm:pl-10 pr-3 py-1.5 sm:py-2 border border-gray-200 rounded-md text-xs sm:text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Options List */}
          <div className="flex-1 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-3 sm:p-4 text-center text-gray-500 text-xs sm:text-sm">
                {searchTerm ? "Tidak ada hasil ditemukan" : "Tidak ada pilihan"}
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={getOptionKey(option, index)}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm cursor-pointer hover:bg-gold/10 hover:text-gold transition-colors duration-150 border-b border-gray-50 last:border-b-0"
                  onClick={() => handleSelect(option)}
                >
                  {getOptionDisplay(option)}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
