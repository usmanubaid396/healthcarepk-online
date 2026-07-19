import { motion } from 'framer-motion';
import { CheckCircle2, Microscope, Factory, Truck } from 'lucide-react';
import { SectionStage, GlassCard } from './ui/Stage';
import { staggerContainer, fadeRise, viewportOnce } from '../lib/motion';

const PILLARS = [
  {
    icon: Microscope,
    title: 'Research & Development',
    body: 'A dedicated R&D pipeline advances formulations across cardiovascular, oncology, neurology, and anti-infective therapeutic areas.',
  },
  {
    icon: Factory,
    title: 'GMP Manufacturing',
    body: 'State-of-the-art facilities operate under WHO-GMP and ISO 9001:2015 standards, ensuring every batch is safe, effective, and consistent.',
  },
  {
    icon: Truck,
    title: 'Reliable Supply Chain',
    body: 'A robust cold-chain and distribution network delivers registered medicines to 32+ countries with end-to-end traceability.',
  },
];

const ABOUT_IMG =
  'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1200';

export default function About() {
  return (
    <SectionStage id="about" glowColor="bg-teal-500/10" glowPosition="absolute -left-32 top-1/4">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20"
      >
        {/* Image side */}
        <motion.div variants={fadeRise} className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] ring-1 ring-white/5">
            <img
              src={ABOUT_IMG}
              alt="Pharmaceutical manufacturing facility"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
          </div>
          {/* Floating stat card */}
          <GlassCard
            interactive
            className="absolute -bottom-6 -right-4 w-40 p-5 sm:-right-8 sm:p-6"
          >
            <div className="font-display text-3xl font-extrabold text-white">25+</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-300">
              Years of Excellence
            </div>
          </GlassCard>
        </motion.div>

        {/* Text side */}
        <div>
          <motion.span variants={fadeRise} className="eyebrow">
            About Healthcare Pharmaceuticals
          </motion.span>
          <motion.h2
            variants={fadeRise}
            className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Committed to quality, driven by access
          </motion.h2>
          <motion.p
            variants={fadeRise}
            className="mt-5 text-lg leading-relaxed text-slate-300/80"
          >
            Healthcare Pharmaceuticals Pakistan is a professional manufacturer and
            supplier of registered medicines. For over two decades we have paired
            rigorous quality systems with responsible pricing — bringing life-saving
            therapies within reach of patients worldwide.
          </motion.p>

          <div className="mt-9 space-y-5">
            {PILLARS.map((p) => (
              <motion.div key={p.title} variants={fadeRise} className="flex gap-4">
                <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-teal-300 ring-1 ring-white/10 backdrop-blur-xl">
                  <p.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300/70">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.ul
            variants={fadeRise}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-200"
          >
            {['WHO-GMP', 'ISO 9001:2015', 'GDMP', 'cGMP'].map((c) => (
              <li key={c} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                {c}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </SectionStage>
  );
}
