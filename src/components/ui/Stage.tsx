/**
 * Glass-Tech UI primitives — Master Design System.
 *
 * Three composable building blocks shared across every section:
 *   - PerspectiveStage : global 3D perspective wrapper (preserve-3d)
 *   - GlassCard        : the canonical glassmorphic surface
 *   - AmbientGlow      : cinematic pulsing radial-gradient orb
 *
 * All 3D layers set will-change: transform for 60fps. The tilt-pop is
 * disabled on reduced-motion / coarse pointers for mobile stability.
 */

import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { tiltPop, tiltPopReduced, transition } from '../../lib/motion';

/* ------------------------------------------------------------------ */
/*  PerspectiveStage                                                  */
/* ------------------------------------------------------------------ */

type PerspectiveStageProps = {
  children: ReactNode;
  className?: string;
  perspective?: number;
};

export function PerspectiveStage({
  children,
  className = '',
  perspective = 1000,
}: PerspectiveStageProps) {
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

/* ------------------------------------------------------------------ */
/*  GlassCard                                                         */
/*  Canonical glassmorphic surface with optional 3D tilt-pop on hover */
/* ------------------------------------------------------------------ */

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  /** Enable the 3D tilt-pop on hover (disabled on reduced motion / touch). */
  interactive?: boolean;
  as?: 'div' | 'article' | 'section' | 'li';
};

const GLASS_BASE =
  'bg-slate-900/40 backdrop-blur-2xl border border-white/10 ' +
  'shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-2xl ' +
  'will-change-transform';

export function GlassCard({
  children,
  className = '',
  interactive = false,
  as = 'div',
}: GlassCardProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (!interactive) {
    return (
      <MotionTag className={`${GLASS_BASE} ${className}`}>{children}</MotionTag>
    );
  }

  return (
    <MotionTag
      whileHover={reduced ? tiltPopReduced : tiltPop}
      transition={transition}
      style={{ transformStyle: 'preserve-3d' }}
      className={`${GLASS_BASE} transition-transform ${className}`}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/*  AmbientGlow                                                       */
/*  Slow-pulsing radial orb for cinematic depth.                      */
/* ------------------------------------------------------------------ */

type AmbientGlowProps = {
  className?: string;
  /** Tailwind color/opacity token, e.g. 'bg-teal-500/10'. */
  colorClass?: string;
  /** Position classes, e.g. 'absolute left-0 top-1/4'. */
  positionClass?: string;
  sizeClass?: string;
  /** Disable the slow pulse (e.g. for reduced motion). */
  pulse?: boolean;
};

export function AmbientGlow({
  className = '',
  colorClass = 'bg-teal-500/10',
  positionClass = 'absolute',
  sizeClass = 'h-[500px] w-[500px]',
  pulse = true,
}: AmbientGlowProps) {
  const reduced = useReducedMotion();
  const shouldPulse = pulse && !reduced;

  return (
    <motion.div
      aria-hidden
      className={`${positionClass} ${colorClass} ${sizeClass} rounded-full blur-[150px] pointer-events-none ${className}`}
      animate={shouldPulse ? { opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] } : undefined}
      transition={shouldPulse ? { duration: 12, repeat: Infinity, ease: 'easeInOut' } : undefined}
      style={{ willChange: 'opacity, transform' }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  SectionStage                                                      */
/*  Per-section wrapper: dark base + ambient glow + 3D stage +        */
/*  auto-deactivation of 3D on coarse pointers.                       */
/* ------------------------------------------------------------------ */

type SectionStageProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  glowColor?: string;
  glowPosition?: string;
};

export function SectionStage({
  id,
  children,
  className = '',
  glowColor = 'bg-teal-500/10',
  glowPosition = 'absolute -left-32 top-1/4',
}: SectionStageProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-slate-950 py-24 lg:py-32 ${className}`}
    >
      <AmbientGlow colorClass={glowColor} positionClass={glowPosition} />
      <AmbientGlow
        colorClass="bg-teal-500/5"
        positionClass="absolute -right-32 bottom-1/4"
      />
      <PerspectiveStage className="container-tight relative">
        {children}
      </PerspectiveStage>
    </section>
  );
}
