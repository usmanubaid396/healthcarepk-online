import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import About from './components/About';
import Operations from './components/Operations';
import Footer from './components/Footer';
       
export default function App() {
  useEffect(() => {
    if (window.location.hash) {
      const timer = setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const target = document.getElementById(id) || document.querySelector(`[data-section="${id}"]`);
        if (target) {
          const yOffset = -80;
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-teal-500 selection:text-slate-950 overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <ProductShowcase />
        <About />
        <Operations />
      </main>
      <Footer />
    </div>
  );
}
