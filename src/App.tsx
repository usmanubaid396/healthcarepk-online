import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ProductShowcase from './components/ProductShowcase';
import Operations from './components/Operations';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { PerspectiveStage } from './components/ui/Stage';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-obsidian text-white">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-grid-faint bg-grid opacity-[0.02]" />
      <PerspectiveStage perspective={1000} className="relative z-0">
        <Header />
        <main>
          <Hero />
          <About />
          <ProductShowcase />
          <Operations />
          <Contact />
        </main>
        <Footer />
      </PerspectiveStage>
    </div>
  );
}
