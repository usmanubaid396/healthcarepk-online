import { motion } from 'framer-motion';
import { Quote, Linkedin } from 'lucide-react';
import { LEADERS } from '../data/site';

const AVATAR_BG =
  'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800';

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 lg:py-32">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Message from Leaders</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Guided by purpose, grounded in science
          </h2>
          <p className="mt-4 text-navy-600">
            Our leadership team sets the direction that has made Healthcare Pharmaceuticals
            a trusted name across regulated and emerging markets.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {LEADERS.map((leader, i) => (
            <motion.article
              key={leader.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' as const }}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-navy-100 transition-all hover:shadow-xl hover:shadow-navy-900/10"
            >
              {/* Headshot */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={AVATAR_BG}
                  alt={`${leader.name} — ${leader.title}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-900/10 to-transparent" />
                <Quote className="absolute right-4 top-4 h-8 w-8 text-white/70" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-display text-lg font-bold leading-tight">{leader.name}</h3>
                  <p className="text-sm text-accent-200">{leader.title}</p>
                </div>
              </div>

              {/* Bio */}
              <div className="flex flex-1 flex-col p-6">
                <p className="flex-1 text-sm leading-relaxed text-navy-600">{leader.bio}</p>
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-800 transition-colors hover:text-accent-600"
                >
                  <Linkedin className="h-4 w-4" />
                  View profile
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
