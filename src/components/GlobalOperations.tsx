import { motion } from 'framer-motion';
import { Users, Pill, FlaskConical, Globe2, type LucideIcon } from 'lucide-react';
import { STATS, type StatItem } from '../data/site';
import { PerspectiveStage, GlassCard } from './ui/Stage';
import { staggerContainer, fadeRise, viewportOnce } from '../lib/motion';
import Counter from './Counter';

const ICONS: Record<StatItem['icon'], LucideIcon> = {
  users: Users,
  pill: Pill,
  flask: FlaskConical,
  globe: Globe2,
};

export default function GlobalOperations() {
  return (
    <section id="global-operation" className="relative -mt-16 z-10 py-12">
      <PerspectiveStage perspective={1000} className="container-tight">
        <GlassCard className="overflow-hidden rounded-3xl">
          {/* Heading row */}
          <div className="grid gap-6 px-6 py-10 sm:px-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:px-14 lg:py-12 border-b border-white/10">
            <div>
              <span className="eyebrow">
                <Globe2 className="h-4 w-4" /> Global Operation
              </span>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                A global footprint built on trust
              </h2>
            </div>
            <p className="text-slate-300/80 lg:text-right">
              From a single plant to 32+ export markets — our scale reflects a commitment
              to quality pharmaceuticals and the people who rely on them.
            </p>
          </div>

          {/* Stats grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y divide-white/10 sm:divide-y-0 sm:divide-x"
          >
            {STATS.map((stat) => {
              const Icon = ICONS[stat.icon];
              return (
                <motion.div
                  key={stat.id}
                  variants={fadeRise}
                  className="group relative px-6 py-8 sm:px-8 lg:px-10 lg:py-10 transition-colors hover:bg-white/[0.03]"
                >
                  <span className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-teal-400 to-slate-500 transition-all duration-500 group-hover:w-full" />
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-teal-300 ring-1 ring-white/10 backdrop-blur-xl transition-colors group-hover:bg-teal-500/20">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="mt-5 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-sm font-semibold uppercase tracking-wider text-teal-300">
                    {stat.label}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300/70">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </GlassCard>
      </PerspectiveStage>
    </section>
  );
}
