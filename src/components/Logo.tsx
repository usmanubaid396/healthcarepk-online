import { motion } from 'framer-motion';
import { Hexagon } from 'lucide-react';
import { transition } from '../lib/motion';

type LogoProps = { variant?: 'light' | 'default'; className?: string };

export default function Logo({ variant = 'light', className = '' }: LogoProps) {
  return (
    <motion.a
      href="#home"
      whileHover={{ scale: 1.03 }}
      transition={transition}
      style={{ transformStyle: 'preserve-3d' }}
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Healthcare Pharmaceuticals Pakistan — home"
    >
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-bioteal-600 text-obsidian shadow-[0_8px_24px_rgba(6,182,212,0.4)] will-change-transform">
        <Hexagon className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-base font-extrabold tracking-tight ${
            variant === 'light' ? 'text-white' : 'text-obsidian'
          }`}
        >
          Healthcare PK
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
          Pharmaceuticals
        </span>
      </span>
    </motion.a>
  );
}
