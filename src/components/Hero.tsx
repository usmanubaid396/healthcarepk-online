import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, FlaskConical } from 'lucide-react';
import { AmbientGlow } from './ui/Stage';

interface SphereItem {
  id: number;
  size: string;
  pos: string;
  delay: number;
}

const INITIAL_SPHERES: Omit<SphereItem, 'id'>[] = [
  { size: 'h-28 w-28 sm:h-36 sm:w-36', pos: 'left-[8%] top-[22%]', delay: 0 },
  { size: 'h-20 w-20 sm:h-24 sm:w-24', pos: 'right-[12%] top-[15%]', delay: 1.2 },
  { size: 'h-24 w-24 sm:h-30 sm:w-30', pos: 'left-[14%] bottom-[18%]', delay: 0.6 },
  { size: 'h-32 w-32 sm:h-40 sm:w-40', pos: 'right-[8%] top-[48%]', delay: 1.8 },
  { size: 'h-16 w-16 sm:h-22 sm:w-22', pos: 'left-[45%] top-[12%]', delay: 0.9 },
  { size: 'h-22 w-22 sm:h-28 sm:w-28', pos: 'right-[35%] bottom-[15%]', delay: 2.4 },
];

function FloatingSphere({
  size,
  pos,
  delay,
  reduced,
  onPop,
}: {
  size: string;
  pos: string;
  delay: number;
  reduced: boolean | null;
  onPop: () => void;
}) {
  return (
    <motion.div
      onClick={onPop}
      initial={{ scale: 0, opacity: 0 }}
      animate={
        reduced
          ? { scale: 1, opacity: 0.8 }
          : {
              scale: [1, 1.15, 1],
              rotate: [0, 30, 0],
              y: [0, -24, 0],
              opacity: 0.8,
            }
      }
      exit={{
        scale: 1.6,
        opacity: 0,
        transition: { duration: 0.15 },
      }}
      transition={
        reduced
          ? undefined
          : {
              scale: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay },
              rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay },
              y: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay },
            }
      }
      style={{ willChange: 'transform' }}
      className={`absolute ${pos} rounded-full bg-gradient-to-br from-cyan-400/25 to-teal-500/20 backdrop-blur-3xl border border-cyan-300/30 shadow-[0_20px_50px_rgba(6,182,212,0.25)] cursor-pointer pointer-events-auto hover:border-cyan-200 hover:bg-cyan-400/35 transition-colors`}
    >
      <div className={`${size} rounded-full opacity-80`} />
    </motion.div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const [spheres, setSpheres] = useState<SphereItem[]>(
    INITIAL_SPHERES.map((s, idx) => ({ ...s, id: idx }))
  );

  const popSphere = (id: number) => {
    // Remove the clicked sphere
    setSpheres((prev) => prev.filter((s) => s.id !== id));

    // Respawn a new sphere after 1.5 seconds
    setTimeout(() => {
      const randomBase = INITIAL_SPHERES[Math.floor(Math.random() * INITIAL_SPHERES.length)];
      setSpheres((prev) => [
        ...prev,
        {
          ...randomBase,
          id: Date.now() + Math.random(),
        },
      ]);
    }, 1500);
  };

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

  const textMaskSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1400 360'%3E%3Cstyle%3Etext %7B font-family: ui-sans-serif, system-ui, sans-serif; font-weight: 900; font-size: 118px; text-anchor: middle; dominant-baseline: middle; text-transform: uppercase; %7D%3C/style%3E%3Ctext x='50%25' y='32%25'%3EMAKING THE WORLD%3C/text%3E%3Ctext x='50%25' y='76%25'%3EHEALTHIER%3C/text%3E%3C/svg%3E")`;

  return (
    <section id="home" className="relative isolate min-h-[100svh] h-[100svh] overflow-hidden bg-slate-950 flex items-center justify-center pt-20 sm:pt-16 pb-6">
      
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <AmbientGlow
          colorClass="bg-teal-500/25"
          positionClass="absolute left-1/2 top-1/3"
          sizeClass="h-[700px] w-[700px] -translate-x-1/2"
          blur="blur-[160px]"
        />
        <div className="absolute inset-0 bg-grid-faint bg-grid opacity-[0.03] pointer-events-none" />

        <div className="hidden sm:block absolute inset-0 pointer-events-none">
          <AnimatePresence>
            {spheres.map((s) => (
              <FloatingSphere
                key={s.id}
                size={s.size}
                pos={s.pos}
                delay={s.delay}
                reduced={reduced}
                onPop={() => popSphere(s.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="container-tight relative z-10 pt-12 sm:pt-20 pb-4 text-center flex flex-col items-center justify-center h-full">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 backdrop-blur-md mb-3 sm:mb-4 pointer-events-auto"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          WHO-GMP · ISO 9001:2015 · cGMP Compliant
        </motion.span>

        <div className="block sm:hidden w-full px-4 mb-4">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white uppercase leading-tight">
            Making The World <br />
            <span className="bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">
              Healthier
            </span>
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden sm:block relative w-full max-w-6xl mx-auto my-1 h-52 sm:h-60 md:h-68 pointer-events-none isolate transform-gpu"
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
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-1 sm:mt-3 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-slate-300 px-4 sm:px-0 relative z-20 pointer-events-auto"
        >
          Healthcare Pharmaceuticals is a WHO-GMP, ISO 9001:2015, and cGMP
          compliant manufacturer of registered medicines — delivering quality,
          accessible therapies trusted worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 sm:mt-5 flex flex-col items-center justify-center gap-2.5 sm:gap-3.5 sm:flex-row w-full px-6 sm:px-0 relative z-30 pointer-events-auto"
        >
          <button
            type="button"
            onClick={handleScrollToProducts}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-teal-600 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_8px_24px_rgba(6,182,212,0.35)] transition-all hover:shadow-[0_10px_30px_rgba(6,182,212,0.55)] cursor-pointer pointer-events-auto"
          >
            Explore Our Products
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleScrollToContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:border-slate-500 hover:bg-slate-800 cursor-pointer pointer-events-auto"
          >
            <FlaskConical className="h-4 w-4 text-teal-400" />
            Contact Sales
          </button>
        </motion.div>
      </div>
    </section>
  );
}
