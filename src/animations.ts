// src/animations.ts
export const pageVariants = {
  // 1. Homepage: Cinematic Blur-Reveal
  home: {
    initial: { opacity: 0, filter: 'blur(20px)' },
    animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  },
  // 2. Product Page: 3D Pop-Out
  product: {
    initial: { scale: 0.8, rotateX: 20 },
    animate: { scale: 1, rotateX: 0, transition: { type: 'spring', stiffness: 200 } }
  },
  // 3. About Page: Staggered Fade-Up
  about: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { staggerChildren: 0.2 } }
  },
  // 4. Global Ops: Radial Expansion
  global: {
    initial: { clipPath: 'circle(0% at 50% 50%)' },
    animate: { clipPath: 'circle(100% at 50% 50%)', transition: { duration: 1.5 } }
  },
  // 5. Career Page: Slide-In Left
  career: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.8 } }
  }
};
