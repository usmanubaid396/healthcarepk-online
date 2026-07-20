import { motion, useReducedMotion } from 'framer-motion';
import { type ReactNode } from 'react';
import { transition } from '../../lib/motion';

/**
 * GlassButton — canonical high-glow primary / secondary button.
 * Tilt-pop on hover (disabled on reduced motion / touch).
 */
type GlassButtonProps = {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'secondary';
  className?: string;
};

export default function GlassButton({
  children,
  href,
  variant = 'primary',
  className = '',
}: GlassButtonProps) {
  const reduced = useReducedMotion();

  const base =
    'group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold will-change-transform transition-colors duration-300';

  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-br from-cyan-400 to-bioteal-600 text-obsidian shadow-[0_8px_32px_rgba(6,182,212,0.45)] hover:shadow-[0_12px_44px_rgba(6,182,212,0.6)]'
      : 'bg-slate-900/40 backdrop-blur-2xl border border-white/10 text-white shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:bg-slate-900/60 hover:border-cyan-400/30';

  return (
    <motion.a
      href={href}
      whileHover={reduced ? { scale: 1.02 } : { scale: 1.05, z: 30 }}
      whileTap={{ scale: 0.97 }}
      transition={transition}
      style={{ transformStyle: 'preserve-3d' }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  );
}
