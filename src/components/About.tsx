import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Microscope, Factory, Truck } from 'lucide-react';
import { AmbientGlow, PerspectiveStage, GlassCard } from './ui/Stage';
import { staggerContainer, fadeRise, transition, viewportOnce } from '../lib/motion';

const LAB_IMG =
  'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1200';

const PILLARS = [
  {
    icon: Microscope,
    title: 'R&D Pipeline',
    body: 'A dedicated research program advances formulations across cardiovascular, oncology, neurology, and anti-infective therapeutic areas.',
  },
  {
    icon: Factory,
    title: 'GMP Manufacturing',
    body: 'State-of-the-art facilities operate under WHO-GMP and ISO 9001:2015 standards, ensuring every batch is safe, effective, and consistent.',
  },
  {
    icon: Truck,
    title: 'Reliable Supply Chain',
    body: 'A robust distribution network delivers registered medicines with end-to-end traceability and rigorous cold-chain control.',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  
  // Enhanced scroll transforms for parallax depth and subtle 3D rotation
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.02]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-obsidian py-24 lg:py-32"
    >
      <AmbientGlow colorClass="bg-teal-500/10" positionClass="absolute -left-32 top-1/4" />
      <PerspectiveStage perspective={1000} className="container-tight relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left — enhanced parallax floating lab container */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <motion.div
              style={{ y, scale: imageScale, rotateZ: imageRotate, willChange: 'transform' }}
              className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
            >
              <img
                src={LAB_IMG}
                alt="Pharmaceutical manufacturing facility"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
            </motion.div>

            {/* Ambient pulsing aura */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-full bg-cyan-500/15 blur-[120px] animate-pulse-aura"
            />

            {/* Floating stat card with continuous floating loop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.3, duration: 0.6 }}
              animate={{ y: [0, -8, 0] }}
              style={{
                transition: 'none' // allow framer-motion animate loop to take over y
              }}
              className="absolute -bottom-6 -right-4 z-20 sm:-right-8"
            >
              <GlassCard className="w-48 p-6 backdrop-blur-xl border-cyan-500/20 shadow-[0_10px_30px_rgba(6,182,212,0.2)]">
                <div className="font-display text-4xl font-extrabold bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                  25+
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  Years of Excellence
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>

          {/* Right — staggered cards with enhanced interactions */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeRise}>
              <span className="eyebrow inline-block bg-cyan-500/10 text-cyan-300 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border border-cyan-500/20">
                About Healthcare Pharmaceuticals
              </span>
            </motion.div>
            <motion.h2
              variants={fadeRise}
              className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight"
            >
              Committed to quality, driven by access
            </motion.h2>
            <motion.p variants={fadeRise} className="mt-5 text-lg leading-relaxed text-slate-300/80">
              For over two decades, Healthcare Pharmaceuticals has paired rigorous
              quality systems with responsible pricing — bringing life-saving therapies
              within reach of patients worldwide.
            </motion.p>

            <div className="mt-9 space-y-5">
              {PILLARS.map((p) => (
                <motion.div
                  key={p.title}
                  variants={fadeRise}
                  whileHover={{ scale: 1.02, x: 8 }}
                  whileTap={{ scale: 0.98 }}
                  transition={transition}
                  className="glass relative overflow-hidden flex gap-4 p-5 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md group cursor-pointer will-change-transform"
                >
                  {/* Subtle hover gradient wash */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <span className="relative z-10 mt-0.5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-cyan-300 ring-1 ring-white/10 transition-colors duration-300 group-hover:bg-cyan-500/10 group-hover:ring-cyan-500/30">
                    <p.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </span>
                  <div className="relative z-10">
                    <h3 className="font-semibold text-white text-lg group-hover:text-cyan-300 transition-colors duration-300">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300/70">
                      {p.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </PerspectiveStage>
    </section>
  );
}
