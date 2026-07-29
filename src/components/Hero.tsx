import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, ArrowRight, FlaskConical } from 'lucide-react';
import { AmbientGlow, PerspectiveStage } from './ui/Stage';
import { blurReveal, staggerContainer } from '../lib/motion';

const SPHERES = [
  { size: 'h-24 w-24 sm:h-32 sm:w-32', pos: 'left-[12%] top-[28%]', z: 30, delay: 0 },
  { size: 'h-16 w-16 sm:h-20 sm:w-20', pos: 'right-[16%] top-[20%]', z: 20, delay: 1.2 },
  { size: 'h-20 w-20 sm:h-28 sm:w-28', pos: 'left-[18%] bottom-[18%]', z: 25, delay: 0.6 },
  { size: 'h-28 w-28 sm:h-36 sm:w-36', pos: 'right-[10%] top-[58%]', z: 15, delay: 1.8 },
  { size: 'h-14 w-14 sm:h-20 sm:w-20', pos: 'left-[42%] top-[15%]', z: 35, delay: 0.9 },
  { size: 'h-20 w-20 sm:h-24 sm:w-24', pos: 'right-[32%] bottom-[22%]', z: 22, delay: 2.4 },
];

function FloatingSphere({
  size,
  pos,
  z,
  delay,
  reduced,
}: {
  size: string;
  pos: string;
  z: number;
  delay: number;
  reduced: boolean | null;
}) {
  return (
    <motion.div
      aria-hidden
      className={`absolute ${pos} rounded-full bg-gradient-to-br from-white/15 to-cyan-400/15 backdrop-blur-2xl border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.4)]`}
      style={{ zIndex: z, willChange: 'transform' }}
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
    } else {
      window.location.hash = 'contact';
    }
  };

  const handleScrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('products') || document.querySelector('[data-section="products"]');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.location.hash = 'products';
    }
  };

  return (
    <section id="home" className="relative isolate min-h-[100svh] overflow-hidden bg-obsidian">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <AmbientGlow
          colorClass="bg-teal-500/20"
          positionClass="absolute left-1/2 top-1/3"
          sizeClass="h-[680px] w-[680px] -translate-x-1/2"
          blur="blur-[160px]"
        />
        <AmbientGlow
          colorClass="bg-cyan-500/15"
          positionClass="absolute -right-32 bottom-0"
          sizeClass="h-[520px] w-[520px]"
        />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-[0.025]" />

      <div className="pointer-events-none hidden sm:block">
        {SPHERES.map((s, i) => (
          <FloatingSphere key={i} {...s} reduced={reduced} />
        ))}
      </div>

      <PerspectiveStage perspective={1000} className="relative z-10 h-full">
        <div className="container-tight flex min-h-[100svh] flex-col items-center justify-center pt-28 pb-20 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-4xl">
            <motion.span
              variants={blurReveal}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200"
            >
              <ShieldCheck className="h-4 w-4" />
              WHO-GMP · ISO 9001:2015 · cGMP Compliant
            </motion.span>

            <PerspectiveStage perspective={1000} className="mt-7">
              <motion.h1
                variants={blurReveal}
                style={{ transformStyle: 'preserve-3d' }}
                className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl"
              >
                Making the
                <span className="block bg-gradient-to-br from-cyan-300 via-cyan-200 to-white bg-clip-text text-transparent">
                  World Healthier
                </span>
              </motion.h1>
            </PerspectiveStage>

            <motion.p
              variants={blurReveal}
              className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-200/80 sm:text-xl"
            >
              Healthcare Pharmaceuticals is a WHO-GMP, ISO 9001:2015, and cGMP
              compliant manufacturer of registered medicines — delivering quality,
              accessible therapies trusted worldwide.
            </motion.p>

            <motion.div variants={blurReveal} className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={handleScrollToProducts}
                className="relative z-50 cursor-pointer pointer-events-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-bioteal-600 px-6 py-3 font-semibold text-obsidian shadow-[0_8px_24px_rgba(6,182,212,0.35)] transition-all hover:shadow-[0_10px_30px_rgba(6,182,212,0.55)] active:scale-95"
              >
                Explore Our Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={handleScrollToContact}
                className="relative z-50 cursor-pointer pointer-events-auto inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 font-medium text-white backdrop-blur-md transition-all hover:border-slate-500 hover:bg-slate-800"
              >
                <FlaskConical className="h-4 w-4 text-teal-400" />
                Contact Sales
              </button>
            </motion.div>
          </motion.div>
        </div>
      </PerspectiveStage>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-obsidian to-transparent" />
    </section>
  );
}
