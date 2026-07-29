import { motion } from 'framer-motion';
import { Users, Pill, FlaskConical } from 'lucide-react';

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
    <section id="operations" data-section="operations" className="relative py-28 bg-slate-950 text-white overflow-hidden">
      {/* Background ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 border border-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Operations
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl text-white font-display">
            The scale behind our quality
          </h2>
          <p className="mt-4 text-slate-300/80 text-lg leading-relaxed">
            Our people, portfolio, and molecules reflect a commitment to manufacturing excellence.
          </p>
        </motion.div>

        {/* Animated Stat Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl flex flex-col items-center text-center group hover:border-teal-500/50 hover:shadow-[0_20px_40px_rgba(20,184,166,0.15)] transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-300 mb-6 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors duration-300 shadow-lg">
                <stat.icon className="w-7 h-7" />
              </div>

              {/* Value */}
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2 bg-gradient-to-br from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                {stat.value}
              </span>

              {/* Label */}
              <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-3">
                {stat.label}
              </h3>

              {/* Description */}
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
