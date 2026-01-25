"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5"
          style={{ color: "#1f2937" }}
        >
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border-2 border-gray-200 
          bg-white text-gray-900 text-sm sm:text-base
          focus:border-blue-500 focus:outline-none transition-colors duration-200
          placeholder-gray-400 
          ${error ? "border-red-500" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs sm:text-sm text-red-500 mt-1">{error}</p>}
      {helper && (
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{helper}</p>
      )}
    </div>
  );
};
