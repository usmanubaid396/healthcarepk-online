import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, FlaskConical } from 'lucide-react';
import { AmbientGlow } from './ui/Stage';

export default function Hero() {
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

  return (
    <section id="home" className="relative isolate min-h-[100svh] overflow-hidden bg-slate-950 flex items-center justify-center">
      {/* Background ambient lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <AmbientGlow
          colorClass="bg-teal-500/20"
          positionClass="absolute left-1/2 top-1/3"
          sizeClass="h-[680px] w-[680px] -translate-x-1/2"
          blur="blur-[160px]"
        />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-[0.025]" />

      <div className="container-tight relative z-10 pt-28 pb-20 text-center flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 backdrop-blur-md mb-8"
        >
          <ShieldCheck className="h-4 w-4" />
          WHO-GMP · ISO 9001:2015 · cGMP Compliant
        </motion.span>

        {/* Borderless Video Text Mask */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-5xl mx-auto my-2"
        >
          <svg className="w-full h-auto overflow-visible" viewBox="0 0 1200 360" preserveAspectRatio="xMidYMid meet">
            <defs>
              <mask id="hero-text-mask">
                <rect width="1200" height="360" fill="black" />
                <text
                  x="50%"
                  y="28%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-display font-black text-[115px] tracking-tight uppercase"
                  fill="white"
                >
                  MAKING
                </text>
                <text
                  x="50%"
                  y="62%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-display font-black text-[115px] tracking-tight uppercase"
                  fill="white"
                >
                  THE WORLD
                </text>
                <text
                  x="50%"
                  y="96%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-display font-black text-[115px] tracking-tight uppercase"
                  fill="white"
                >
                  HEALTHIER
                </text>
              </mask>
            </defs>

            <foreignObject x="0" y="0" width="1200" height="360" mask="url(#hero-text-mask)">
              <div className="w-full h-full relative">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/hero-video.mp4" type="video/mp4" />
                </video>
              </div>
            </foreignObject>
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl"
        >
          Healthcare Pharmaceuticals is a WHO-GMP, ISO 9001:2015, and cGMP
          compliant manufacturer of registered medicines — delivering quality,
          accessible therapies trusted worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            type="button"
            onClick={handleScrollToProducts}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-teal-600 px-6 py-3 font-semibold text-slate-950 shadow-[0_8px_24px_rgba(6,182,212,0.35)] transition-all hover:shadow-[0_10px_30px_rgba(6,182,212,0.55)] cursor-pointer"
          >
            Explore Our Products
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleScrollToContact}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 font-medium text-white backdrop-blur-md transition-all hover:border-slate-500 hover:bg-slate-800 cursor-pointer"
          >
            <FlaskConical className="h-4 w-4 text-teal-400" />
            Contact Sales
          </button>
        </motion.div>
      </div>
    </section>
  );
}
