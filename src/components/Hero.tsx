import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Globe2 } from 'lucide-react';
import { AmbientGlow, PerspectiveStage } from './ui/Stage';
import { blurReveal, staggerContainer, transition, viewportOnce } from '../lib/motion';

const HERO_IMG =
  'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1920';

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-slate-950">
      {/* Background image + gradient overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_IMG}
          alt="Pharmaceutical research laboratory"
          className="h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-teal-950/40" />
      </div>

      {/* Cinematic ambient glows */}
      <AmbientGlow colorClass="bg-teal-500/10" positionClass="absolute -left-32 top-1/4" />
      <AmbientGlow colorClass="bg-teal-400/5" positionClass="absolute -right-40 bottom-0" sizeClass="h-[600px] w-[600px]" />

      <PerspectiveStage perspective={1000} className="relative">
        <div className="container-tight relative flex min-h-[92vh] items-center pt-28 pb-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            <motion.span
              variants={blurReveal}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/40 backdrop-blur-2xl px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-teal-200 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            >
              <ShieldCheck className="h-4 w-4" />
              Trusted Pharmaceutical Manufacturer
            </motion.span>

            <motion.h1
              variants={blurReveal}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Making the
              <span className="block bg-gradient-to-r from-teal-300 via-teal-200 to-white bg-clip-text text-transparent">
                World Healthier
              </span>
            </motion.h1>

            <motion.p
              variants={blurReveal}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200/80"
            >
              Healthcare Pharmaceuticals Pakistan is a professional manufacturer and
              supplier of registered medicines — delivering quality, accessible therapies
              trusted across 32+ countries.
            </motion.p>

            <motion.div
              variants={blurReveal}
              className="mt-9 flex flex-col gap-4 sm:flex-row"
            >
              <motion.a
                href="#products"
                variants={blurReveal}
                whileHover={{ rotateX: 10, rotateY: 10, scale: 1.05, z: 30 }}
                transition={transition}
                style={{ transformStyle: 'preserve-3d' }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-[0_8px_32px_rgba(0,0,0,0.3)] will-change-transform"
              >
                Explore Our Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
              <motion.a
                href="#global-operation"
                variants={blurReveal}
                whileHover={{ rotateX: 10, rotateY: 10, scale: 1.05, z: 30 }}
                transition={transition}
                style={{ transformStyle: 'preserve-3d' }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-slate-900/40 backdrop-blur-xl px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] will-change-transform"
              >
                <Globe2 className="h-4 w-4" />
                Global Operations
              </motion.a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              variants={blurReveal}
              viewport={viewportOnce}
              className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-200/70"
            >
              {['WHO-GMP Certified', 'ISO 9001:2015', 'GDMP Compliant'].map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </PerspectiveStage>

      {/* Bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}
