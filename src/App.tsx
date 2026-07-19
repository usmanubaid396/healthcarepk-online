import Header from './components/Header';
import Hero from './components/Hero';
import GlobalOperations from './components/GlobalOperations';
import About from './components/About';
import ProductShowcase from './components/ProductShowcase';
import Leadership from './components/Leadership';
import Career from './components/Career';
import Footer from './components/Footer';
import { PerspectiveStage } from './components/ui/Stage';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white [font-smooth:antialiased] [-webkit-font-smoothing:antialiased]">
      {/* Global ambient glow base layer */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-grid-faint bg-grid opacity-[0.03]"
      />
      <PerspectiveStage perspective={1000} className="relative z-0">
        <Header />
        <main>
          <Hero />
          <GlobalOperations />
          <About />
          <ProductShowcase />
          <Leadership />
          <Career />
        </main>
        <Footer />
      </PerspectiveStage>
    </div>
  );
}
