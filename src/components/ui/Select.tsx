'use client';

import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700  mb-2">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-2 rounded-lg border-2 border-gray-200 
          bg-white  text-gray-900 
          focus:border-blue-500 focus:outline-none transition-colors duration-200
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
