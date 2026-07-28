import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';

export default function Hero() {
  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = document.getElementById('products') || document.querySelector('[data-section="products"]');
    if (target) {
      const yOffset = -80;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.location.hash = 'products';
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Glows & Orbs — MUST HAVE pointer-events-none */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/4 left-10 w-48 h-48 bg-slate-800/40 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-teal-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Compliance Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-xs font-semibold tracking-wider uppercase mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          WHO-GMP • ISO 9001:2015 • cGMP COMPLIANT
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6">
          Making the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-200 to-white">
            World Healthier
          </span>
        </h1>

        {/* Hero Description */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed mb-10">
          Healthcare Pharmaceuticals is a WHO-GMP, ISO 9001:2015, and cGMP compliant manufacturer of registered medicines — delivering quality, accessible therapies trusted worldwide.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-50">
          <button
            type="button"
            onClick={scrollToProducts}
            className="relative z-50 cursor-pointer pointer-events-auto inline-flex items-center gap-2 px-8 py-4 rounded-full bg-teal-400 text-slate-950 font-semibold hover:bg-teal-300 active:scale-95 transition-all shadow-lg shadow-teal-500/20"
          >
            Explore Our Products
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href="#contact"
            className="relative z-50 cursor-pointer pointer-events-auto inline-flex items-center gap-2 px-8 py-4 rounded-full border border-slate-700 bg-slate-900/80 text-white font-medium hover:border-slate-500 hover:bg-slate-800 transition-all backdrop-blur-md"
          >
            <PhoneCall className="w-4 h-4 text-teal-400" />
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
}
