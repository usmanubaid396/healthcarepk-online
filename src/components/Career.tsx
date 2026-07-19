import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, HeartHandshake } from 'lucide-react';

export default function Career() {
  return (
    <section id="career" className="py-12">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-14 sm:px-12 lg:px-16 lg:py-20"
        >
          {/* Decorative grid + glow */}
          <div className="absolute inset-0 bg-grid-faint bg-grid opacity-30" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-navy-500/30 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent-200">
                <Briefcase className="h-4 w-4" /> Career at HPL
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Build a career that helps build healthier lives
              </h2>
              <p className="mt-5 max-w-xl text-navy-100/80">
                Join a team of 7,800+ professionals across manufacturing, R&D, quality,
                and global operations. We invest in people who care about impact.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:careers@healthcarepk.online"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-navy-900 transition-all hover:bg-accent-50"
                >
                  View Open Roles
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  <HeartHandshake className="h-4 w-4" />
                  Life at HPL
                </a>
              </div>
            </div>

            {/* Perks list */}
            <ul className="grid gap-3 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
              {[
                'Global mobility across 32+ markets',
                'Continuous learning & development',
                'Health, wellness & family benefits',
                'Purpose-driven, science-led culture',
              ].map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-sm text-navy-100">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-200">
                    <HeartHandshake className="h-3.5 w-3.5" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
