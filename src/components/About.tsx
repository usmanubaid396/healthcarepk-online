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
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-obsidian py-24 lg:py-32"
    >
      <AmbientGlow colorClass="bg-teal-500/10" positionClass="absolute -left-32 top-1/4" />
      <PerspectiveStage perspective={1000} className="container-tight relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left — parallax floating lab container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={transition}
            className="relative"
          >
            <motion.div
              style={{ y, willChange: 'transform' }}
              className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
            >
              <img
                src={LAB_IMG}
                alt="Pharmaceutical manufacturing facility"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
            </motion.div>

            {/* Ambient pulsing aura */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-full bg-cyan-500/10 blur-[120px] animate-pulse-aura"
            />

            {/* Floating stat card */}
            <GlassCard className="absolute -bottom-6 -right-4 w-44 p-6 sm:-right-8">
              <div className="font-display text-4xl font-extrabold text-white">25+</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                Years of Excellence
              </div>
            </GlassCard>
          </motion.div>

          {/* Right — staggered cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.span variants={fadeRise} className="eyebrow">
              About Healthcare Pharmaceuticals
            </motion.span>
            <motion.h2
              variants={fadeRise}
              className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              Committed to quality, driven by access
            </motion.h2>
            <motion.p variants={fadeRise} className="mt-5 text-lg leading-relaxed text-slate-300/80">
              For over two decades, Healthcare Pharmaceuticals Pakistan has paired rigorous
              quality systems with responsible pricing — bringing life-saving therapies
              within reach of patients worldwide.
            </motion.p>

            <div className="mt-9 space-y-5">
              {PILLARS.map((p) => (
                <motion.div
                  key={p.title}
                  variants={fadeRise}
                  whileHover={{ scale: 1.02 }}
                  transition={transition}
                  className="glass flex gap-4 p-5 will-change-transform"
                >
                  <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-cyan-300 ring-1 ring-white/10">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300/70">{p.body}</p>
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
