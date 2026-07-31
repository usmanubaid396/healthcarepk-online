import { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Users, Pill, FlaskConical, Activity, ShieldCheck } from 'lucide-react';
import { AmbientGlow, GlassCard, PerspectiveStage } from './ui/Stage';
import { staggerContainer, fadeRise, transition, viewportOnce } from '../lib/motion';

const STATS = [
  {
    icon: Users,
    value: 211,
    suffix: '+',
    label: 'Dedicated Employees',
    description: 'A skilled workforce across manufacturing, quality assurance, and R&D.',
  },
  {
    icon: Pill,
    value: 65,
    suffix: '+',
    label: 'Registered Formulations',
    description: 'A diverse and growing portfolio across multiple therapeutic categories.',
  },
  {
    icon: FlaskConical,
    value: 38,
    suffix: '+',
    label: 'Generic Molecules',
    description: 'High-purity active pharmaceutical ingredients manufactured in-house.',
  },
  {
    icon: Activity,
    value: 100,
    suffix: '%',
    label: 'cGMP Compliance',
    description: 'Rigorous batch testing and quality control adhering to WHO standards.',
  },
];

// Reusable animated counter component
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const node = ref.current;
    const controls = animate(1, value, {
      duration: 2.2,
      ease: 'easeOut',
      onUpdate(latest) {
        node.textContent = Math.floor(latest).toString() + suffix;
      },
    });

    return () => controls.stop();
  }, [isInView, value, suffix]);

  return <span ref={ref}>1{suffix}</span>;
}

export default function Operations() {
  return (
    <section id="operations" data-section="operations" className="relative overflow-hidden bg-slate-950 py-24 lg:py-32 text-white">
      {/* Background Glow & Grid */}
      <AmbientGlow colorClass="bg-teal-500/15" positionClass="absolute right-1/4 top-1/2 -translate-y-1/2" sizeClass="h-[600px] w-[600px]" blur="blur-[160px]" />
      <div className="absolute inset-0 bg-grid-faint bg-grid opacity-[0.025]" />

      <PerspectiveStage perspective={1000} className="container-tight relative z-10">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <motion.span variants={fadeRise} className="eyebrow inline-block bg-cyan-500/10 text-cyan-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.22em] border border-cyan-500/20">
            Operations & Scale
          </motion.span>
          <motion.h2 variants={fadeRise} className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            The scale behind our quality
          </motion.h2>
          <motion.p variants={fadeRise} className="mt-4 text-base sm:text-lg text-slate-300/80 leading-relaxed">
            Operating advanced pharmaceutical facilities engineered for precision, capacity, and uncompromising global safety standards.
          </motion.p>
        </motion.div>

        {/* Stats Grid with Staggered Entrance & Hover Elevation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeRise}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={transition}
              className="relative group will-change-transform"
            >
              <GlassCard className="h-full p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl relative overflow-hidden transition-all duration-300 group-hover:border-cyan-500/40 group-hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)]">
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/20 mb-6 transition-transform duration-300 group-hover:scale-110">
                      <stat.icon className="h-7 w-7" />
                    </div>
                    <div className="font-display text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <h3 className="mt-2 font-semibold text-white text-lg tracking-wide">
                      {stat.label}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Animated Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/80 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/30">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-white">WHO-GMP & ISO 9001:2015 Certified Facilities</h4>
              <p className="text-sm text-slate-300/80 mt-0.5">Every production batch undergoes strict multi-stage analytical testing before market release.</p>
            </div>
          </div>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-600 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_8px_24px_rgba(6,182,212,0.35)] transition-all hover:shadow-[0_10px_30px_rgba(6,182,212,0.55)] whitespace-nowrap"
          >
            Request Facility Audit / Catalog
          </motion.a>
        </motion.div>
      </PerspectiveStage>
    </section>
  );
}
