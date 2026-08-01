import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import Logo from './Logo';
import { NAV_LINKS } from '../data/site';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setIsMenuOpen(false);
      const id = href.replace('#', '');
      const target = document.getElementById(id) || document.querySelector(`[data-section="${id}"]`);
      if (target) {
        const yOffset = -80;
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-white/10 shadow-lg' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />

          {/* Top Right: Only 3-Line Menu Toggle */}
          <button
            type="button"
            aria-label="Toggle Menu"
            className="p-2.5 rounded-xl border border-white/10 bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Universal Dropdown Menu Drawer (Includes Navigation Links & Catalog PDF) */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 shadow-2xl transition-all">
          <div className="max-w-md mx-auto flex flex-col gap-3 text-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="w-full py-3 rounded-xl bg-slate-900/60 border border-white/5 text-slate-200 font-semibold tracking-wide uppercase text-sm hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/30 transition-all cursor-pointer"
              >
                {link.label}
              </a>
            ))}

            <a
              href="/products-catalog.pdf"
              download="Healthcare_Pharmaceuticals_Product_Catalog.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-teal-500/10 border border-teal-500/40 text-teal-300 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-teal-500 hover:text-slate-950 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Catalog PDF
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
