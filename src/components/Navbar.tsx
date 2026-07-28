import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      const id = href.replace('#', '');
      const target = document.getElementById(id) || document.querySelector(`[data-section="${id}"]`);
      if (target) {
        const yOffset = -80; // Navbar offset
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            
            <a
              href="/products-catalog.pdf"
              download="Healthcare_Pharmaceuticals_Product_Catalog.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-teal-500/40 text-teal-300 font-semibold text-xs hover:bg-teal-500 hover:text-slate-950 transition-all duration-200"
            >
              <Download className="w-3.5 h-3.5" />
              Catalog PDF
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/10 px-4 pt-2 pb-6 shadow-xl">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/products-catalog.pdf"
              download="Healthcare_Pharmaceuticals_Product_Catalog.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-xl bg-teal-500/10 border border-teal-500/40 text-teal-300 font-semibold text-sm"
            >
              <Download className="w-4 h-4" />
              Download Catalog PDF
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
