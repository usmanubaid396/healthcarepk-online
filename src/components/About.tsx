import { motion } from 'framer-motion';
import { CheckCircle2, Microscope, Factory, Truck } from 'lucide-react';

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
    <section id="about" className="py-24 lg:py-32">
      <div className="container-tight grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-navy-900/10 ring-1 ring-navy-100">
            <img
              src={ABOUT_IMG}
              alt="Pharmaceutical manufacturing facility"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Floating stat card */}
          <div className="absolute -bottom-6 -right-4 sm:-right-8 rounded-2xl bg-white p-5 shadow-xl ring-1 ring-navy-100 sm:p-6">
            <div className="font-display text-3xl font-extrabold text-navy-900">25+</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-accent-600">
              Years of Excellence
            </div>
          </div>
          {/* Decorative blob */}
          <div className="absolute -left-8 -top-8 -z-10 h-40 w-40 rounded-full bg-accent-100 blur-3xl" />
        </motion.div>

        {/* Text side */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            About Healthcare Pharmaceuticals
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl"
          >
            Committed to quality, driven by access
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-lg leading-relaxed text-navy-600"
          >
            Healthcare Pharmaceuticals Pakistan is a professional manufacturer and
            supplier of registered medicines. For over two decades we have paired
            rigorous quality systems with responsible pricing — bringing life-saving
            therapies within reach of patients worldwide.
          </motion.p>

          <div className="mt-9 space-y-5">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className="flex gap-4"
              >
                <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700 ring-1 ring-navy-100">
                  <p.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-navy-900">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy-500">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy-700"
          >
            {['WHO-GMP', 'ISO 9001:2015', 'GDMP', 'cGMP'].map((c) => (
              <li key={c} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent-600" />
                {c}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
