import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, HeartHandshake } from 'lucide-react';
import { AmbientGlow, PerspectiveStage } from './ui/Stage';
import { staggerContainer, fadeRise, transition, viewportOnce, tiltPop } from '../lib/motion';

const PERKS = [
  'Global mobility across 32+ markets',
  'Continuous learning & development',
  'Health, wellness & family benefits',
  'Purpose-driven, science-led culture',
];

export default function Career() {
  return (
    <section id="career" className="relative overflow-hidden bg-slate-950 py-24">
      <AmbientGlow colorClass="bg-teal-500/10" positionClass="absolute -right-32 -top-20" />
      <AmbientGlow colorClass="bg-teal-400/5" positionClass="absolute -bottom-32 -left-10" />
      <PerspectiveStage perspective={1000} className="relative">
        <div className="container-tight">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] px-6 py-14 sm:px-12 lg:px-16 lg:py-20"
          >
            <div className="absolute inset-0 bg-grid-faint bg-grid opacity-20" />

            <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <motion.span
                  variants={fadeRise}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-teal-200"
                >
                  <Briefcase className="h-4 w-4" /> Career at HPL
                </motion.span>
                <motion.h2
                  variants={fadeRise}
                  className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                >
                  Build a career that helps build healthier lives
                </motion.h2>
                <motion.p
                  variants={fadeRise}
                  className="mt-5 max-w-xl text-slate-200/80"
                >
                  Join a team of 7,800+ professionals across manufacturing, R&D, quality,
                  and global operations. We invest in people who care about impact.
                </motion.p>
                <motion.div variants={fadeRise} className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <motion.a
                    href="mailto:careers@healthcarepk.online"
                    whileHover={tiltPop}
                    transition={transition}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-[0_8px_32px_rgba(0,0,0,0.3)] will-change-transform"
                  >
                    View Open Roles
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.a>
                  <motion.a
                    href="#about"
                    whileHover={tiltPop}
                    transition={transition}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] will-change-transform"
                  >
                    <HeartHandshake className="h-4 w-4" />
                    Life at HPL
                  </motion.a>
                </motion.div>
              </div>

              {/* Perks list */}
              <motion.ul
                variants={fadeRise}
                className="grid gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                {PERKS.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-slate-100">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500/20 text-teal-200">
                      <HeartHandshake className="h-3.5 w-3.5" />
                    </span>
                    {perk}
                  </li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </PerspectiveStage>
    </section>
  );
}
