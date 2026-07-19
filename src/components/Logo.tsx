import { Activity } from 'lucide-react';

type LogoProps = {
  variant?: 'light' | 'dark';
  className?: string;
};

// Compact brand mark — a clinical cross/rhythm motif paired with wordmark.
export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const word = variant === 'light' ? 'text-white' : 'text-navy-900';
  const sub = variant === 'light' ? 'text-navy-100/70' : 'text-navy-500';
  return (
    <a href="#home" className={`group flex items-center gap-3 ${className}`} aria-label="Healthcare Pharmaceuticals home">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-navy-600 text-white shadow-md shadow-navy-900/20 transition-transform duration-300 group-hover:scale-105">
        <Activity className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-base font-extrabold tracking-tight ${word}`}>
          Healthcare
        </span>
        <span className={`text-[11px] font-medium uppercase tracking-[0.22em] ${sub}`}>
          Pharmaceuticals
        </span>
      </span>
    </a>
  );
}
