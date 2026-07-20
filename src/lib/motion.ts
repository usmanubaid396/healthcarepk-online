/**
 * Centralized motion system — Master Design System.
 *
 * Uniform easing across the entire site: a single premium cubic-bezier.
 * No bouncy springs — every entrance and interaction settles smoothly.
 */

import type { Transition, Variants } from 'framer-motion';

export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;
export const DURATION = 0.8;

export const transition: Transition = {
  duration: DURATION,
  ease: EASE_PREMIUM,
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition },
};

export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: 'blur(20px)', y: 16 },
  show: { opacity: 1, filter: 'blur(0px)', y: 0, transition },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE_PREMIUM } },
};

/** 3D tilt-pop — exact interaction target for cards and buttons. */
export const tiltPop = {
  rotateX: 10,
  rotateY: 10,
  scale: 1.05,
  z: 30,
} as const;

export const viewportOnce = { once: true, margin: '-60px' } as const;
