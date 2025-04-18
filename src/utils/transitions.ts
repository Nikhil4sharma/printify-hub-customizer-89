
import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  },
  exit: { opacity: 0, y: 10 }
};

export const slideInRight: Variants = {
  initial: { x: '100%' },
  animate: { 
    x: 0,
    transition: { duration: 0.4 }
  },
  exit: { x: '100%' }
};

export const slideInBottom: Variants = {
  initial: { y: '100%' },
  animate: { 
    y: 0,
    transition: { duration: 0.4 }
  },
  exit: { y: '100%' }
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4 }
  },
  exit: { opacity: 0, scale: 0.95 }
};

export const staggerChildren: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const itemFadeIn: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: { opacity: 0, y: 20 }
};

