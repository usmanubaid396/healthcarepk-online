import { motion } from 'framer-motion';
import { Quote, Linkedin } from 'lucide-react';
import { LEADERS } from '../data/site';
import { SectionStage, GlassCard } from './ui/Stage';
import { staggerContainer, fadeRise, viewportOnce } from '../lib/motion';

const AVATAR_BG =
  'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800';

export default function Leadership() {
  return (
    <SectionStage id="leadership" glowColor="bg-teal-500/10" glowPosition="absolute left-1/3 -top-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-2xl text-center"
      >
        <motion.span variants={fadeRise} className="eyebrow justify-center">
          Message from Leaders
        </motion.span>
        <motion.h2
          variants={fadeRise}
          className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          Guided by purpose, grounded in science
        </motion.h2>
        <motion.p variants={fadeRise} className="mt-4 text-slate-300/80">
          Our leadership team sets the direction that has made Healthcare Pharmaceuticals
          a trusted name across regulated and emerging markets.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-8 md:grid-cols-3"
      >
        {LEADERS.map((leader) => (
          <motion.div key={leader.id} variants={fadeRise}>
            <GlassCard
              interactive
              as="article"
              className="group flex h-full flex-col overflow-hidden p-0"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                <img
                  src={AVATAR_BG}
                  alt={`${leader.name} — ${leader.title}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
                <Quote className="absolute right-4 top-4 h-8 w-8 text-white/60" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-display text-lg font-bold leading-tight">{leader.name}</h3>
                  <p className="text-sm text-teal-200">{leader.title}</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="flex-1 text-sm leading-relaxed text-slate-300/80">{leader.bio}</p>
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-teal-300"
                >
                  <Linkedin className="h-4 w-4" />
                  View profile
                </a>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionStage>
  );
}
