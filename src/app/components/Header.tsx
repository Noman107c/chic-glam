"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-20 sm:h-24">

          {/* Logo Section */}
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Image
              src="/chic.png"
              alt="Chic & Glam Logo"
              width={180}
              height={54}
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-10">
            {[
              { name: 'Home', href: '/' },
              { name: 'Beauty Salon', href: '/beauty-salon' },
              { name: 'Fitness Gym', href: '/fitness-gym' },
              { name: 'About', href: '/about' },
              { name: 'Reviews', href: '/reviews' },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[12px] lg:text-[13px] uppercase tracking-[0.15em] font-medium text-gray-600 hover:text-[#392d22] transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="bg-[#392d22] text-white px-6 lg:px-8 py-2.5 lg:py-3 text-[11px] lg:text-[12px] uppercase tracking-widest font-semibold hover:bg-[#524132] transition-all duration-300 rounded-sm"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-[#392d22] p-2 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-4 px-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Beauty Salon', href: '/beauty-salon' },
                { name: 'Fitness Gym', href: '/fitness-gym' },
                { name: 'About', href: '/about' },
                { name: 'Reviews', href: '/reviews' },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="text-[14px] uppercase tracking-[0.15em] font-medium text-gray-600 hover:text-[#392d22] transition-colors duration-300 py-2"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="inline-block bg-[#392d22] text-white px-6 py-3 text-[12px] uppercase tracking-widest font-semibold hover:bg-[#524132] transition-all duration-300 rounded-sm"
                >
                  Book Now
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
