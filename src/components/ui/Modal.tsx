'use client';

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  footer,
  size = 'md',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Enhanced Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Enhanced Modal */}
      <div
        className={`
          relative bg-gradient-to-br from-[#392d22] via-[#2d2018] to-[#1a1612] rounded-2xl shadow-2xl border border-[#d4af37]/20
          w-full mx-4 ${sizeClasses[size]}
          animate-slide-up transform transition-all duration-300
        `}
      >
        {/* Enhanced Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#d4af37]/30 bg-gradient-to-r from-[#392d22] to-[#2d2018] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center">
              <span className="text-[#392d22] text-sm font-bold">💳</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-wide">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white hover:text-gray-300 text-xl transition-all duration-200"
          >
            ×
          </button>
        </div>

        {/* Enhanced Content */}
        <div className="p-6 max-h-96 overflow-y-auto bg-gradient-to-b from-[#FAF9F6] to-[#f5f4f2]">
          {children}
        </div>

        {/* Enhanced Footer */}
        {footer && (
          <div className="border-t border-[#d4af37]/20 p-6 bg-gradient-to-r from-[#392d22] to-[#2d2018] rounded-b-2xl flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
