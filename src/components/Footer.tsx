import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Facebook,
  Youtube,
  Instagram,
  type LucideIcon,
} from 'lucide-react';
import { NAV_LINKS, CONTACTS, SOCIAL_LINKS } from '../data/site';
import { AmbientGlow } from './ui/Stage';
import { transition, viewportOnce } from '../lib/motion';
import Logo from './Logo';

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  facebook: Facebook,
  youtube: Youtube,
  instagram: Instagram,
};

type ContactBlockProps = {
  title: string;
  lines: string[];
  phone: string;
  email: string;
};

function ContactBlock({ title, lines, phone, email }: ContactBlockProps) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wider text-teal-300">{title}</h4>
      <address className="mt-4 space-y-2 not-italic text-sm text-slate-300/80">
        {lines.map((line) => (
          <p key={line} className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
            {line}
          </p>
        ))}
        <p className="flex items-center gap-2">
          <Phone className="h-4 w-4 shrink-0 text-teal-400" />
          {phone}
        </p>
        <p className="flex items-center gap-2">
          <Mail className="h-4 w-4 shrink-0 text-teal-400" />
          <a href={`mailto:${email}`} className="transition-colors hover:text-white">
            {email}
          </a>
        </p>
      </address>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-grid-faint bg-grid opacity-20" />
      <AmbientGlow colorClass="bg-teal-500/10" positionClass="absolute -top-24 left-1/3" sizeClass="h-64 w-64" />

      <div className="container-tight relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={transition}
          className="grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:py-20"
        >
          {/* Brand */}
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-300/70">
              Healthcare Pharmaceuticals Pakistan — a professional manufacturer and
              supplier of registered medicines, trusted across 32+ countries.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon];
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    whileHover={{ scale: 1.1 }}
                    transition={transition}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/40 text-slate-200 ring-1 ring-white/10 backdrop-blur-2xl transition-colors will-change-transform hover:bg-white hover:text-slate-900"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Nav */}
          <nav>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-teal-300">Company</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-300/80">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacts */}
          <ContactBlock {...CONTACTS.headOffice} />
          <div className="space-y-10">
            <ContactBlock {...CONTACTS.plant} />
            <ContactBlock {...CONTACTS.usContact} />
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-xs text-slate-300/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Healthcare Pharmaceuticals Pakistan. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms of Use</a>
            <a href="#" className="transition-colors hover:text-white">Pharmacovigilance</a>
            <a href="#" className="transition-colors hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
