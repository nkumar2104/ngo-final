import React, { useState, useEffect, useRef } from 'react';
import { INDIAN_CITIES } from '../utils/locations';

export default function LocationAutocomplete({ 
  value, 
  onChange, 
  placeholder = "Enter city or state", 
  className = "",
  id,
  required,
  "aria-describedby": ariaDescribedBy
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter cities based on input
  useEffect(() => {
    if (value && value.trim().length > 0) {
      const lowercasedValue = value.toLowerCase();
      const filtered = INDIAN_CITIES.filter(city => 
        city.toLowerCase().includes(lowercasedValue)
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [value]);

  const handleInputChange = (e) => {
    onChange(e);
    setIsOpen(true);
  };

  const handleSelectCity = (city) => {
    // We create a mock event object to match the onChange expected signature if needed, or simply pass the string.
    // Since parent components usually expect `e.target.value`, we simulate it:
    onChange({ target: { value: city } });
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        id={id}
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={required}
        aria-describedby={ariaDescribedBy}
        className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B8D] transition-all bg-white text-gray-700 ${className}`}
        onFocus={() => {
          if (value && value.trim().length > 0) setIsOpen(true);
        }}
      />
      
      {isOpen && filteredCities.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl max-h-60 rounded-xl overflow-auto custom-scrollbar">
          {filteredCities.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelectCity(city)}
              className="px-4 py-3 hover:bg-[#004B8D]/10 hover:text-[#004B8D] cursor-pointer transition-colors border-b border-gray-50 last:border-0 font-medium text-sm text-gray-700"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {city}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
