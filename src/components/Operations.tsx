import { motion } from 'framer-motion';
import { Users, Pill, FlaskConical } from 'lucide-react';
import { transition, viewportOnce } from '../lib/motion';

const STATS = [
  {
    icon: Users,
    value: '211+',
    label: 'DEDICATED EMPLOYEES',
    description: 'A skilled workforce across manufacturing, quality, and R&D.',
  },
  {
    icon: Pill,
    value: '65+',
    label: 'REGISTERED FORMULATIONS',
    description: 'A growing portfolio across multiple therapeutic categories.',
  },
  {
    icon: FlaskConical,
    value: '38+',
    label: 'GENERIC MOLECULES',
    description: 'Diverse active ingredients manufactured in-house.',
  },
];

export default function Operations() {
  return (
    <section id="operations" data-section="operations" className="relative py-24 bg-obsidian text-white overflow-hidden">
      <div className="container-tight relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Operations
          </span>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            The scale behind our quality
          </h2>
          <p className="mt-4 text-slate-300/80 text-lg">
            Our people, portfolio, and molecules reflect a commitment to manufacturing excellence.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...transition, delay: i * 0.15 }}
              className="relative p-8 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl flex flex-col items-center text-center group hover:border-teal-500/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-300 mb-6 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                {stat.value}
              </span>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-3">
                {stat.label}
              </h3>
              <p className="text-sm text-slate-300/70 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
