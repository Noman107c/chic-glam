'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700
          bg-white dark:bg-gray-900 text-gray-900 dark:text-white
          focus:border-blue-500 focus:outline-none transition-colors duration-200
          placeholder-gray-400 dark:placeholder-gray-500
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      {helper && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{helper}</p>}
    </div>
  );
};
