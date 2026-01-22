import { Variants } from 'framer-motion';

// Reusable animation variants
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const slideInUp: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const beautyEasing = {
  ease: "easeInOut", // softer easing
};

export const fitnessEasing = {
  ease: "easeOut", // slightly stronger
};

export const reducedMotionVariants: Variants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
};
