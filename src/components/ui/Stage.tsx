/**
 * Glass-tech UI primitives — shared design-system building blocks.
 */

import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { blurReveal, staggerContainer, fadeRise, transition, viewportOnce } from '../../lib/motion';

/* Perspective wrapper — global 3D depth */
export function PerspectiveStage({
  children,
  className = '',
  perspective = 1000,
}: {
  children: ReactNode;
  className?: string;
  perspective?: number;
}) {
  return (
    <div
      className={className}
      style={{
        perspective: `${perspective}px`,
        WebkitPerspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}

/* Slow-drifting cinematic ambient orb */
export function AmbientGlow({
  className = '',
  colorClass = 'bg-teal-500/15',
  positionClass = 'absolute',
  sizeClass = 'h-[500px] w-[500px]',
  blur = 'blur-[160px]',
}: {
  className?: string;
  colorClass?: string;
  positionClass?: string;
  sizeClass?: string;
  blur?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={`${positionClass} ${colorClass} ${sizeClass} rounded-full ${blur} pointer-events-none ${className}`}
      animate={reduced ? undefined : { x: [-50, 50, -50], y: [-50, 50, -50] }}
      transition={
        reduced
          ? undefined
          : { duration: 40, repeat: Infinity, ease: 'easeInOut' }
      }
      style={{ willChange: 'transform' }}
    />
  );
}

/* Canonical glass surface */
export function GlassCard({
  children,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section' | 'li';
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      variants={blurReveal}
      className={`glass will-change-transform ${className}`}
    >
      {children}
    </MotionTag>
  );
}

/* Staggered reveal container + child — drop into whileInView sections */
export { staggerContainer, fadeRise, blurReveal, transition, viewportOnce };
