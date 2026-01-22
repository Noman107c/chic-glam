'use client';

import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
};

export const Loader: React.FC<LoadingProps> = ({ size = 'md', fullScreen = false }) => {
  const content = (
    <div className={`flex items-center justify-center`}>
      <div
        className={`border-4 border-gray-300  border-t-blue-500 rounded-full animate-spin ${sizeClasses[size]}`}
      />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white  bg-opacity-75  flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};
