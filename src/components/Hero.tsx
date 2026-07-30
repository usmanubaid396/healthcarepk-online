import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, ArrowRight, FlaskConical } from 'lucide-react';
import { AmbientGlow } from './ui/Stage';

const SPHERES = [
  { size: 'h-24 w-24 sm:h-32 sm:w-32', pos: 'left-[12%] top-[28%]', delay: 0 },
  { size: 'h-16 w-16 sm:h-20 sm:w-20', pos: 'right-[16%] top-[20%]', delay: 1.2 },
  { size: 'h-20 w-20 sm:h-28 sm:w-28', pos: 'left-[18%] bottom-[18%]', delay: 0.6 },
  { size: 'h-28 w-28 sm:h-36 sm:w-36', pos: 'right-[10%] top-[58%]', delay: 1.8 },
  { size: 'h-14 w-14 sm:h-20 sm:w-20', pos: 'left-[42%] top-[15%]', delay: 0.9 },
  { size: 'h-20 w-20 sm:h-24 sm:w-24', pos: 'right-[32%] bottom-[22%]', delay: 2.4 },
];

function FloatingSphere({
  size,
  pos,
  delay,
  reduced,
}: {
  size: string;
  pos: string;
  delay: number;
  reduced: boolean | null;
}) {
  return (
    <motion.div
      aria-hidden
      className={`absolute ${pos} rounded-full bg-gradient-to-br from-white/15 to-cyan-400/15 backdrop-blur-2xl border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.4)]`}
      style={{ willChange: 'transform' }}
      animate={
        reduced
          ? undefined
          : {
              scale: [1, 1.12, 1],
              rotate: [0, 24, 0],
              y: [0, -22, 0],
            }
      }
      transition={
        reduced
          ? undefined
          : { duration: 9, repeat: Infinity, ease: 'easeInOut', delay }
      }
    >
      <div className={`${size} rounded-full opacity-70`} />
    </motion.div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact') || document.querySelector('[data-section="contact"]');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleScrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('products') || document.querySelector('[data-section="products"]');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const textMaskSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 440'%3E%3Cstyle%3Etext %7B font-family: ui-sans-serif, system-ui, sans-serif; font-weight: 900; font-size: 100px; text-anchor: middle; dominant-baseline: middle; text-transform: uppercase; %7D%3C/style%3E%3Ctext x='50%25' y='20%25'%3EMAKING%3C/text%3E%3Ctext x='50%25' y='50%25'%3ETHE WORLD%3C/text%3E%3Ctext x='50%25' y='80%25'%3EHEALTHIER%3C/text%3E%3C/svg%3E")`;

  return (
    <section id="home" className="relative isolate min-h-[100svh] overflow-hidden bg-slate-950 flex items-center justify-center py-24 sm:py-0">
      
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <AmbientGlow
          colorClass="bg-teal-500/20"
          positionClass="absolute left-1/2 top-1/3"
          sizeClass="h-[680px] w-[680px] -translate-x-1/2"
          blur="blur-[160px]"
        />
        <div className="absolute inset-0 bg-grid-faint bg-grid opacity-[0.025]" />

        <div className="hidden sm:block absolute inset-0">
          {SPHERES.map((s, i) => (
            <FloatingSphere key={i} {...s} reduced={reduced} />
          ))}
        </div>
      </div>

      <div className="container-tight relative z-10 pt-16 sm:pt-28 pb-12 text-center flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 backdrop-blur-md mb-6 sm:mb-8"
        >
          <ShieldCheck className="h-4 w-4" />
          WHO-GMP · ISO 9001:2015 · cGMP Compliant
        </motion.span>

        <div className="block sm:hidden w-full px-4 mb-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white uppercase leading-tight">
            Making <br />
            <span className="bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">
              The World
            </span> <br />
            Healthier
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden sm:block relative w-full max-w-5xl mx-auto my-2 h-80 md:h-96 pointer-events-none isolate transform-gpu"
        >
          <div 
            className="absolute inset-0 w-full h-full transform-gpu"
            style={{
              WebkitMaskImage: textMaskSvg,
              maskImage: textMaskSvg,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transform-gpu translate-z-0 pointer-events-none"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          </div>

          <svg className="w-full h-full overflow-visible relative z-10" viewBox="0 0 1200 440" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="brand-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>

            <text
              x="50%"
              y="20%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-display font-black text-[100px] tracking-tight uppercase"
              fill="none"
              stroke="url(#brand-stroke)"
              strokeWidth="2.5"
            >
              MAKING
            </text>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-display font-black text-[100px] tracking-tight uppercase"
              fill="none"
              stroke="url(#brand-stroke)"
              strokeWidth="2.5"
            >
              THE WORLD
            </text>
            <text
              x="50%"
              y="80%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-display font-black text-[100px] tracking-tight uppercase"
              fill="none"
              stroke="url(#brand-stroke)"
              strokeWidth="2.5"
            >
              HEALTHIER
            </text>
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-2 sm:mt-6 max-w-2xl text-sm sm:text-lg leading-relaxed text-slate-300 px-4 sm:px-0 relative z-20"
        >
          Healthcare Pharmaceuticals is a WHO-GMP, ISO 9001:2015, and cGMP
          compliant manufacturer of registered medicines — delivering quality,
          accessible therapies trusted worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 sm:mt-9 flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row w-full px-6 sm:px-0 relative z-30 pointer-events-auto"
        >
          <button
            type="button"
            onClick={handleScrollToProducts}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-teal-600 px-6 py-3 font-semibold text-slate-950 shadow-[0_8px_24px_rgba(6,182,212,0.35)] transition-all hover:shadow-[0_10px_30px_rgba(6,182,212,0.55)] cursor-pointer pointer-events-auto"
          >
            Explore Our Products
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleScrollToContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 font-medium text-white backdrop-blur-md transition-all hover:border-slate-500 hover:bg-slate-800 cursor-pointer pointer-events-auto"
          >
            <FlaskConical className="h-4 w-4 text-teal-400" />
            Contact Sales
          </button>
        </motion.div>
      </div>
    </section>
  );
}
