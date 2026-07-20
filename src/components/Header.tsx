import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_LINKS } from '../data/site';
import { transition } from '../lib/motion';
import Logo from './Logo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={transition}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <div
        className={`container-tight flex h-16 items-center justify-between gap-4 rounded-full border px-5 transition-all duration-500 ${
          scrolled
            ? 'bg-slate-900/60 border-white/10 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.4)]'
            : 'bg-slate-900/30 border-white/10 backdrop-blur-xl'
        }`}
      >
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute inset-0 scale-90 rounded-full bg-white/10 opacity-0 transition-all duration-300 hover:opacity-100" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            transition={transition}
            style={{ transformStyle: 'preserve-3d' }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-bioteal-600 px-5 py-2.5 text-sm font-semibold text-obsidian shadow-[0_8px_32px_rgba(6,182,212,0.45)] will-change-transform hover:shadow-[0_12px_44px_rgba(6,182,212,0.6)]"
          >
            <Phone className="h-4 w-4" />
            Contact Sales
          </motion.a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="lg:hidden inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-900/40 p-2.5 text-white transition hover:bg-white/10"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50 bg-obsidian/70 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-[82%] max-w-sm glass flex flex-col rounded-none rounded-l-3xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={transition}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center rounded-full p-2 text-white transition hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col p-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-cyan-400 to-bioteal-600 px-5 py-3 text-sm font-semibold text-obsidian"
                >
                  <Phone className="h-4 w-4" />
                  Contact Sales
                </a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
