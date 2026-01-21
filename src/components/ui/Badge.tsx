'use client';

import React from 'react';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md';
}

const variantClasses = {
  default: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  success: 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200',
  danger: 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200',
  warning: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  info: 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'default', size = 'md' }) => {
  return (
    <span
      className={`
        inline-block rounded-full font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
      `}
    >
      {label}
    </span>
  );
};
