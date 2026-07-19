/**
 * Centralized motion system — Master Design System.
 *
 * Every entrance and interaction across the site uses these tokens so the
 * motion language stays consistent, premium, and free of bouncy springs.
 *
 * The signature easing is a single cubic-bezier used everywhere:
 *   ease: [0.22, 1, 0.36, 1]   (decelerating, "settled")
 */

import type { Transition, Variants } from 'framer-motion';

/** Signature easing curve — decelerating, weighted, non-bouncy. */
export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

/** Base duration for entrances and interactions. */
export const DURATION = 0.8;

/** The canonical transition used across the site. */
export const transition: Transition = {
  duration: DURATION,
  ease: EASE_PREMIUM,
};

/** Staggered container — children reveal 100ms apart. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/** Child of staggerContainer — fade + rise on reveal. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition,
  },
};

/** Apple-style blur reveal — opacity + blur(20px) → blur(0px). */
export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: 'blur(20px)', y: 16 },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition,
  },
};

/** One-off fade, for overlays / phase changes. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE_PREMIUM } },
};

/**
 * 3D tilt-pop — the exact interaction target for cards and buttons.
 * Applied via whileHover on a preserve-3d element.
 */
export const tiltPop = {
  rotateX: 10,
  rotateY: 10,
  scale: 1.05,
  z: 30,
} as const;

/** Reduced-motion-safe variant: no tilt, no z, only a gentle lift. */
export const tiltPopReduced = {
  scale: 1.02,
} as const;

/** Viewport config shared by every whileInView element. */
export const viewportOnce = { once: true, margin: '-60px' } as const;
