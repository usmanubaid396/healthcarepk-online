import { motion } from 'framer-motion';
import { transition } from '../lib/motion';

const LOGO_SRC = '/Gemini_Generated_Image_3cdfrk3cdfrk3cdf.png';

type LogoProps = { variant?: 'light' | 'default'; className?: string };

export default function Logo({ variant = 'light', className = '' }: LogoProps) {
  return (
    <motion.a
      href="#home"
      whileHover={{ scale: 1.03 }}
      transition={transition}
      style={{ transformStyle: 'preserve-3d' }}
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Healthcare Pharmaceuticals — home"
    >
      <span className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-cyan-400/20 to-bioteal-600/20 ring-1 ring-white/10 shadow-[0_8px_24px_rgba(6,182,212,0.25)] will-change-transform">
        <img
          src={LOGO_SRC}
          alt="Healthcare Pharmaceuticals logo"
          className="h-full w-full object-contain p-1"
          loading="eager"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-base font-extrabold tracking-tight ${
            variant === 'light' ? 'text-white' : 'text-obsidian'
          }`}
        >
          Healthcare
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
          Pharmaceuticals
        </span>
      </span>
    </motion.a>
  );
}
