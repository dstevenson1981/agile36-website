"use client";

import React, { useState } from "react";

interface Country {
  code: string;
  dialCode: string;
  flag: string;
  name: string;
}

const countries: Country[] = [
  { code: "US", dialCode: "+1", flag: "🇺🇸", name: "United States" },
  { code: "CA", dialCode: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "GB", dialCode: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "AU", dialCode: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "DE", dialCode: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "FR", dialCode: "+33", flag: "🇫🇷", name: "France" },
  { code: "IT", dialCode: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "ES", dialCode: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "NL", dialCode: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "BE", dialCode: "+32", flag: "🇧🇪", name: "Belgium" },
  { code: "CH", dialCode: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "AT", dialCode: "+43", flag: "🇦🇹", name: "Austria" },
  { code: "SE", dialCode: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "NO", dialCode: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "DK", dialCode: "+45", flag: "🇩🇰", name: "Denmark" },
  { code: "FI", dialCode: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "PL", dialCode: "+48", flag: "🇵🇱", name: "Poland" },
  { code: "IE", dialCode: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "PT", dialCode: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "GR", dialCode: "+30", flag: "🇬🇷", name: "Greece" },
  { code: "IN", dialCode: "+91", flag: "🇮🇳", name: "India" },
  { code: "CN", dialCode: "+86", flag: "🇨🇳", name: "China" },
  { code: "JP", dialCode: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "KR", dialCode: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "SG", dialCode: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "MY", dialCode: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "TH", dialCode: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "PH", dialCode: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "ID", dialCode: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "VN", dialCode: "+84", flag: "🇻🇳", name: "Vietnam" },
  { code: "BR", dialCode: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "MX", dialCode: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "AR", dialCode: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "CL", dialCode: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "CO", dialCode: "+57", flag: "🇨🇴", name: "Colombia" },
  { code: "PE", dialCode: "+51", flag: "🇵🇪", name: "Peru" },
  { code: "ZA", dialCode: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "EG", dialCode: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "AE", dialCode: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "SA", dialCode: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "IL", dialCode: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "NZ", dialCode: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "RU", dialCode: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "TR", dialCode: "+90", flag: "🇹🇷", name: "Turkey" },
];

interface InternationalPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}

export default function InternationalPhoneInput({
  value,
  onChange,
  required = false,
  placeholder = "Enter phone number",
}: InternationalPhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Parse existing value to extract country code and number
  React.useEffect(() => {
    if (value) {
      // Try to match country code from value
      const matchedCountry = countries.find((country) => value.startsWith(country.dialCode));
      if (matchedCountry) {
        setSelectedCountry(matchedCountry);
        setPhoneNumber(value.replace(matchedCountry.dialCode, "").trim());
      } else {
        setPhoneNumber(value);
      }
    }
  }, [value]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    // Update the full phone number with new country code
    const fullNumber = country.dialCode + (phoneNumber || "");
    onChange(fullNumber);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value.replace(/\D/g, ""); // Remove non-digits
    setPhoneNumber(number);
    // Combine country code with phone number
    const fullNumber = selectedCountry.dialCode + number;
    onChange(fullNumber);
  };

  return (
    <div className="flex gap-2">
      {/* Country Code Selector */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#fa4a23] focus:border-transparent min-w-[100px]"
        >
          <span className="text-xl">{selectedCountry.flag}</span>
          <span className="text-sm font-medium text-gray-700">{selectedCountry.dialCode}</span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown */}
        {isDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsDropdownOpen(false)}
            />
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto w-64">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search country..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[#fa4a23]"
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    // Simple search - you can enhance this
                    const search = e.target.value.toLowerCase();
                    // This is a basic implementation - you might want to add search functionality
                  }}
                />
                {countries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-left ${
                      selectedCountry.code === country.code ? "bg-blue-50" : ""
                    }`}
                  >
                    <span className="text-xl">{country.flag}</span>
                    <span className="text-sm font-medium text-gray-700">{country.dialCode}</span>
                    <span className="text-sm text-gray-600 ml-auto">{country.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Phone Number Input */}
      <input
        type="tel"
        required={required}
        value={phoneNumber}
        onChange={handlePhoneChange}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23] focus:border-transparent"
        placeholder={placeholder}
      />
    </div>
  );
}

