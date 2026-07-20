import { motion } from 'framer-motion';
import { Users, Pill, FlaskConical, type LucideIcon } from 'lucide-react';
import { STATS, type StatItem } from '../data/site';
import { AmbientGlow, PerspectiveStage } from './ui/Stage';
import { staggerContainer, fadeRise, transition, viewportOnce, tiltPop } from '../lib/motion';
import Counter from './Counter';

const ICONS: Record<StatItem['id'], LucideIcon> = {
  employees: Users,
  formulations: Pill,
  molecules: FlaskConical,
};

export default function Operations() {
  return (
    <section id="operations" className="relative overflow-hidden bg-obsidian py-24 lg:py-32">
      <AmbientGlow colorClass="bg-cyan-500/10" positionClass="absolute -right-32 top-1/4" />
      <PerspectiveStage perspective={1000} className="container-tight relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span variants={fadeRise} className="eyebrow justify-center">
            Operations
          </motion.span>
          <motion.h2
            variants={fadeRise}
            className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            The scale behind our quality
          </motion.h2>
          <motion.p variants={fadeRise} className="mt-4 text-slate-300/80">
            Our people, portfolio, and molecules reflect a commitment to manufacturing
            excellence.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 sm:grid-cols-3"
        >
          {STATS.map((stat) => {
            const Icon = ICONS[stat.id];
            return (
              <motion.div
                key={stat.id}
                variants={fadeRise}
                whileHover={tiltPop}
                transition={transition}
                style={{ transformStyle: 'preserve-3d' }}
                className="glass group relative overflow-hidden p-8 text-center will-change-transform"
              >
                <span className="absolute inset-x-0 top-0 h-1 w-0 bg-gradient-to-r from-cyan-400 to-bioteal-600 transition-all duration-500 group-hover:w-full" />
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-cyan-300 ring-1 ring-white/10 transition-colors group-hover:bg-cyan-500/20">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="mt-5 font-display text-5xl font-extrabold tracking-tight text-white">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-sm font-semibold uppercase tracking-wider text-cyan-300">
                  {stat.label}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300/70">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </PerspectiveStage>
    </section>
  );
}
