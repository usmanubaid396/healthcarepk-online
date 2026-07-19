import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Globe2 } from 'lucide-react';

// Pexels stock photo — pharmaceutical / laboratory imagery.
const HERO_IMG =
  'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1920';

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.15 * i, ease: 'easeOut' as const },
  }),
};

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-navy-900">
      {/* Background image + gradient overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_IMG}
          alt="Pharmaceutical research laboratory"
          className="h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-navy-800/55" />
        <div className="absolute inset-0 bg-grid-faint bg-grid opacity-40" />
      </div>

      <div className="container-tight relative min-h-[92vh] flex items-center pt-28 pb-20">
        <div className="max-w-3xl">
          <motion.span
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent-200 backdrop-blur"
          >
            <ShieldCheck className="h-4 w-4" />
            Trusted Pharmaceutical Manufacturer
          </motion.span>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Making the
            <span className="block bg-gradient-to-r from-accent-300 via-accent-200 to-white bg-clip-text text-transparent">
              World Healthier
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100/80"
          >
            Healthcare Pharmaceuticals Pakistan is a professional manufacturer and
            supplier of registered medicines — delivering quality, accessible therapies
            trusted across 32+ countries.
          </motion.p>

          <motion.div
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#products"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-navy-900 transition-all hover:bg-accent-50 hover:shadow-lg hover:shadow-accent-500/20"
            >
              Explore Our Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#global-operation"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <Globe2 className="h-4 w-4" />
              Global Operations
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            custom={4}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-navy-100/70"
          >
            {['WHO-GMP Certified', 'ISO 9001:2015', 'GDMP Compliant'].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
