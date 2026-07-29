import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Linkedin, Facebook, Youtube } from 'lucide-react';
import { COMPANY, FOOTER_LINKS } from '../data/site';
import { AmbientGlow } from './ui/Stage';
import { transition, viewportOnce } from '../lib/motion';

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

export default function Footer() {
  return (
    <footer id="contact" data-section="contact" className="relative overflow-hidden bg-obsidian text-white">
      <div className="absolute inset-0 bg-grid-faint bg-grid opacity-[0.02]" />
      <AmbientGlow colorClass="bg-teal-500/10" positionClass="absolute -top-24 left-1/3" sizeClass="h-64 w-64" />

      <div className="container-tight relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={transition}
          className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-20"
        >
          <div>
            <img 
              src="/logo.png" 
              alt="Healthcare Pharmaceuticals Logo" 
              className="h-12 w-auto object-contain mb-2" 
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-300/70">
              {COMPANY.name} — a WHO-GMP, ISO 9001:2015, and cGMP compliant manufacturer of
              registered medicines.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ scale: 1.1 }}
                  transition={transition}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/40 text-slate-200 ring-1 ring-white/10 backdrop-blur-2xl transition-colors will-change-transform hover:bg-white hover:text-obsidian"
                >
                  <s.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <nav>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Navigate</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-300/80">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Head Office</h4>
            <address className="mt-4 space-y-3 not-italic text-sm text-slate-300/80">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                <a
                  href={COMPANY.headOfficeMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:text-cyan-300 hover:underline decoration-cyan-400/60 underline-offset-4"
                >
                  {COMPANY.headOffice}
                </a>
              </p>
            </address>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-300/80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-cyan-400" />
                <a href={COMPANY.phoneHref} className="transition-colors hover:text-white">
                  {COMPANY.phone}
                </a>
              </li>
              {Object.entries(COMPANY.emails).map(([key, email]) => (
                <li key={key} className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-cyan-400" />
                  <a href={`mailto:${email}`} className="transition-colors hover:text-white">
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-xs text-slate-300/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p className="text-slate-300/40">Making the World Healthier.</p>
        </div>
      </div>
    </footer>
  );
}
