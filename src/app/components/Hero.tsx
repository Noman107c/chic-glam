"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeInUp, staggerContainer, beautyEasing, fitnessEasing } from './animations';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="relative w-full min-h-[90vh] flex flex-col lg:flex-row bg-white overflow-hidden"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >

      {/* Left Side: Beauty Salon */}
      <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto group overflow-hidden border-r border-gray-100">
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1000"
          alt="Luxury Beauty Salon"
          fill
          className="object-cover transition-transform duration-[3000ms] group-hover:scale-110 opacity-90"
          priority
        />
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-[#392d22]/40 transition-all duration-1000"></div>

        {/* Content */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 sm:p-6 text-center"
          variants={fadeInUp}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.span
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-4 opacity-70"
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            The Art of Chic
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-4 sm:mb-6 lg:mb-8 tracking-wide leading-tight"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            Beauty Salon
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Link href="/beauty-salon" className="group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 overflow-hidden border border-white/30 backdrop-blur-sm transition-all hover:border-white">
              <span className="relative z-10 text-[10px] sm:text-[11px] uppercase tracking-[0.3em]">Explore Services</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <style jsx>{`.group:hover span { color: black; }`}</style>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side: Fitness Gym */}
      <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto group overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000"
          alt="Premium Fitness Gym"
          fill
          className="object-cover transition-transform duration-[3000ms] group-hover:scale-110 opacity-90"
        />
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-zinc-900/60 transition-all duration-1000"></div>

        {/* Content */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 sm:p-6 text-center"
          variants={fadeInUp}
          transition={{ ...fitnessEasing, duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-4 opacity-70"
            variants={fadeInUp}
            transition={{ ...fitnessEasing, duration: 0.6, delay: 0.3 }}
          >
            The Power of Glam
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-4 sm:mb-6 lg:mb-8 tracking-wide leading-tight"
            variants={fadeInUp}
            transition={{ ...fitnessEasing, duration: 0.8, delay: 0.4 }}
          >
            Fitness Gym
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            transition={{ ...fitnessEasing, duration: 0.6, delay: 0.5 }}
          >
            <Link href="/fitness-gym" className="group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 overflow-hidden border border-white/30 backdrop-blur-sm transition-all hover:border-white">
              <span className="relative z-10 text-[10px] sm:text-[11px] uppercase tracking-[0.3em]">Start Training</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <style jsx>{`.group:hover span { color: black; }`}</style>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust Bar (Bottom Overlay) - Minimalist Replacement for the Card */}
      <div className="absolute bottom-0 left-0 w-full bg-white/10 backdrop-blur-md border-t border-white/10 py-4 sm:py-6 px-4 sm:px-6 lg:px-12 hidden lg:flex justify-between items-center z-10">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white">413 Verified Reviews</span>
            </div>
            <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white">100% Recommendation</span>
            </div>
        </div>
        <div className="text-white text-[10px] sm:text-[11px] uppercase tracking-[0.4em] sm:tracking-[0.5em] font-light mt-4 sm:mt-0">
          Chic & Glam <span className="mx-2 sm:mx-4 opacity-30">|</span> Confidence Created
        </div>
      </div>

      {/* Mobile Scroll Hint */}
      <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
      </div>
    </motion.section>
  );
}
