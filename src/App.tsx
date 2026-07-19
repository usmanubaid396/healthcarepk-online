import Header from './components/Header';
import Hero from './components/Hero';
import GlobalOperations from './components/GlobalOperations';
import About from './components/About';
import ProductShowcase from './components/ProductShowcase';
import Leadership from './components/Leadership';
import Career from './components/Career';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
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
    </div>
  );
}
