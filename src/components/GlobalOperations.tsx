import { motion } from 'framer-motion';
import { Users, Pill, FlaskConical, Globe2, type LucideIcon } from 'lucide-react';
import { STATS, type StatItem } from '../data/site';
import Counter from './Counter';

const ICONS: Record<StatItem['icon'], LucideIcon> = {
  users: Users,
  pill: Pill,
  flask: FlaskConical,
  globe: Globe2,
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

export default function GlobalOperations() {
  return (
    <section id="global-operation" className="relative -mt-16 z-10">
      <div className="container-tight">
        <div className="rounded-3xl bg-white shadow-2xl shadow-navy-900/10 ring-1 ring-navy-100">
          {/* Heading row */}
          <div className="grid gap-6 px-6 py-10 sm:px-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:px-14 lg:py-12 border-b border-navy-100">
            <div>
              <span className="eyebrow">
                <Globe2 className="h-4 w-4" /> Global Operation
              </span>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
                A global footprint built on trust
              </h2>
            </div>
            <p className="text-navy-600 lg:text-right">
              From a single plant to 32+ export markets — our scale reflects a commitment
              to quality pharmaceuticals and the people who rely on them.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-navy-100">
            {STATS.map((stat, i) => {
              const Icon = ICONS[stat.icon];
              return (
                <motion.div
                  key={stat.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  className="group relative px-6 py-8 sm:px-8 lg:px-10 lg:py-10 transition-colors hover:bg-navy-50/50"
                >
                  {/* Top accent line on hover */}
                  <span className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-accent-400 to-navy-600 transition-all duration-300 group-hover:w-full" />

                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700 ring-1 ring-navy-100 transition-colors group-hover:bg-navy-700 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>

                  <div className="mt-5 font-display text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-sm font-semibold uppercase tracking-wider text-accent-600">
                    {stat.label}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
