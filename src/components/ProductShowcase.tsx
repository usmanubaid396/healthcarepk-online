/**
 * ProductShowcase — 3D orbital product gallery.
 *
 * Desktop: 11 products arranged on a 3D orbital trajectory (perspective-1000)
 * that rotates gently in space, around a centered "Core Portfolio" orb.
 * Each card has a diagonal light-sheen on hover.
 *
 * Mobile / reduced motion: gracefully degrades to a 2-column glass grid.
 */

import {
  useMemo,
  useState,
  useCallback,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useSpring,
  useTransform,
  useMotionValue,
} from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  Tag,
  ExternalLink,
  PackageX,
  Pill,
  Download,
} from 'lucide-react';
import { PRODUCTS, PRODUCT_CATEGORIES, DRAP_LOOKUP_URL, type Product } from '../data/site';
import { AmbientGlow, PerspectiveStage } from './ui/Stage';
import { blurReveal, staggerContainer, fadeRise, transition, viewportOnce } from '../lib/motion';

/* ------------------------------------------------------------------ */
/*  Orbital card — desktop 3D                                        */
/* ------------------------------------------------------------------ */

function OrbitalCard({
  product,
  index,
  total,
  radius,
  reducedMotion,
}: {
  product: Product;
  index: number;
  total: number;
  radius: number;
  reducedMotion: boolean;
}) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 260, damping: 30, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 260, damping: 30, mass: 0.5 });
  const sheenX = useTransform(sx, [0, 1], ['0%', '100%']);
  const sheenY = useTransform(sy, [0, 1], ['0%', '100%']);
  const sheenBg = useTransform(
    [sheenX, sheenY] as const,
    ([x, y]: string[]) =>
      `radial-gradient(180px 180px at ${x} ${y}, rgba(6,182,212,0.25), transparent 60%)`,
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const r = e.currentTarget.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width);
      py.set((e.clientY - r.top) / r.height);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reducedMotion],
  );
  const onPointerLeave = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  // Position on the orbit ring (rotateY places each card around the circle)
  const angle = (index / total) * 360;
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `rotateY(${angle}deg) translateZ(${radius}px) translateY(-50%)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        whileHover={
          reducedMotion
            ? { scale: 1.03 }
            : { scale: 1.12, rotateX: 12, rotateY: -12, z: 50 }
        }
        transition={transition}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        className="group relative w-44 rounded-2xl glass p-5 text-white"
      >
        {/* Diagonal light sheen */}
        {!reducedMotion && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: sheenBg, willChange: 'background' }}
          />
        )}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent transition-transform duration-700 group-hover:scale-x-100"
        />
        <div className="relative z-10 flex items-center justify-between" style={{ transform: 'translateZ(30px)' }}>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-cyan-300 ring-1 ring-white/15">
            <Pill className="h-5 w-5" />
          </span>
          <span className="rounded-full bg-cyan-400/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-200">
            Registered
          </span>
        </div>
        <div className="relative z-10 mt-4" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="font-display text-lg font-bold tracking-tight">{product.name}</h3>
          <p className="text-xs font-medium text-cyan-300">{product.category}</p>
        </div>
        <a
          href={DRAP_LOOKUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-cyan-400/90 to-bioteal-600/90 px-3 py-1.5 text-xs font-semibold text-obsidian shadow-[0_4px_16px_rgba(6,182,212,0.35)] transition-all hover:shadow-[0_6px_22px_rgba(6,182,212,0.55)]"
        >
          Verify
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile grid card                                                  */
/* ------------------------------------------------------------------ */

function GridCard({ product, reducedMotion }: { product: Product; reducedMotion: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeRise}
      whileHover={reducedMotion ? { scale: 1.02 } : { scale: 1.05, rotateX: 8, rotateY: 8, z: 30 }}
      transition={transition}
      style={{ transformStyle: 'preserve-3d' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl glass p-5 text-white will-change-transform"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent transition-transform duration-700 group-hover:scale-x-100"
      />
      <div className="flex items-center justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-cyan-300 ring-1 ring-white/15">
          <Pill className="h-5 w-5" />
        </span>
        <span className="rounded-full bg-cyan-400/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-200">
          Registered
        </span>
      </div>
      <h3 className="mt-4 font-display text-lg font-bold tracking-tight">{product.name}</h3>
      <p className="text-xs font-medium text-cyan-300">{product.category}</p>
      <a
        href={DRAP_LOOKUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 mt-4 inline-flex items-center gap-1.5 self-start rounded-full bg-gradient-to-br from-cyan-400/90 to-bioteal-600/90 px-3 py-1.5 text-xs font-semibold text-obsidian shadow-[0_4px_16px_rgba(6,182,212,0.35)] transition-all hover:shadow-[0_6px_22px_rgba(6,182,212,0.55)]"
      >
        Verify
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background:
            'radial-gradient(180px 180px at 50% 50%, rgba(6,182,212,0.18), transparent 60%)',
        }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Root                                                              */
/* ------------------------------------------------------------------ */

export default function ProductShowcase() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const reducedMotion = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchCat = category === 'All' || p.category === category;
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, category]);

  // Orbit only renders the full set; filters/search switch to grid view for clarity.
  const showOrbit = category === 'All' && !query && filtered.length === PRODUCTS.length;
  const radius = 360;

  return (
    <section id="products" data-section="products" className="relative overflow-x-clip bg-obsidian py-24 lg:py-32">
      <AmbientGlow colorClass="bg-teal-500/10" positionClass="absolute -left-32 top-1/4" />
      <AmbientGlow colorClass="bg-cyan-500/10" positionClass="absolute -right-32 bottom-1/4" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-[0.025]" />

      <PerspectiveStage perspective={1000} className="container-tight relative">
        {/* Heading + search */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <motion.span variants={blurReveal} className="eyebrow">
              <Tag className="h-4 w-4" /> Our Products
            </motion.span>
            <motion.h2
              variants={blurReveal}
              className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              11 registered formulations
            </motion.h2>
            <motion.p variants={blurReveal} className="mt-3 max-w-xl text-slate-300/80">
              Search by name or therapeutic category. Every product is manufactured under
              GMP and registered for distribution.
            </motion.p>

            {/* --- NEW DOWNLOAD CATALOG BUTTON --- */}
            <motion.div variants={blurReveal} className="mt-6">
              <a
                href="/products-catalog.pdf"
                download="Healthcare_Pharmaceuticals_Product_Catalog.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/30 transition-all duration-300 hover:bg-gradient-to-br hover:from-cyan-400 hover:to-bioteal-600 hover:text-obsidian hover:ring-transparent hover:shadow-[0_6px_20px_rgba(6,182,212,0.45)] active:scale-95"
              >
                <Download className="h-4 w-4" />
                Download Full B2B Product Catalog (PDF)
              </a>
            </motion.div>
            {/* ----------------------------------- */}
          </div>

          <motion.div variants={blurReveal} className="w-full lg:max-w-md">
            <label htmlFor="product-search" className="sr-only">Search products</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
              <input
                id="product-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search medicines, e.g. PRACTEL, ALODOX…"
                className="w-full rounded-full glass py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Filter chips */}
        <div className="mt-8 flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/40">
            <SlidersHorizontal className="h-4 w-4" /> Filter
          </span>
          {PRODUCT_CATEGORIES.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                  active
                    ? 'bg-gradient-to-br from-cyan-400 to-bioteal-600 text-obsidian shadow-sm'
                    : 'bg-white/5 text-white/70 ring-1 ring-white/10 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ORBITAL view — desktop, no filter, full set */}
        {showOrbit ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={transition}
            className="relative mt-12 hidden h-[520px] sm:block"
            style={{ perspective: '1000px' }}
          >
            {/* Rotating orbit ring */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={{ transformStyle: 'preserve-3d' }}
              animate={reducedMotion ? undefined : { rotateY: 360 }}
              transition={
                reducedMotion
                  ? undefined
                  : { duration: 90, repeat: Infinity, ease: 'linear' }
              }
            >
              {PRODUCTS.map((p, i) => (
                <OrbitalCard
                  key={p.id}
                  product={p}
                  index={i}
                  total={PRODUCTS.length}
                  radius={radius}
                  reducedMotion={!!reducedMotion}
                />
              ))}
            </motion.div>

            {/* Centered core orb */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/30 to-bioteal-600/30 backdrop-blur-2xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.4)] sm:h-40 sm:w-40">
                <div aria-hidden className="absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl animate-pulse-aura" />
                <div className="relative text-center">
                  <div className="font-display text-sm font-bold text-white">Core Portfolio</div>
                  <div className="text-[10px] uppercase tracking-wider text-cyan-300">Healthcare PK</div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* GRID view — filtered / mobile */
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`${category}-${query}`}
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
              >
                {filtered.map((p) => (
                  <GridCard key={p.id} product={p} reducedMotion={!!reducedMotion} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-10 flex flex-col items-center justify-center glass py-16 text-center"
              >
                <PackageX className="h-10 w-10 text-white/30" />
                <p className="mt-4 font-semibold text-white/90">No products found</p>
                <p className="mt-1 text-sm text-white/50">Try a different keyword or clear the filters.</p>
                <button
                  type="button"
                  onClick={() => { setQuery(''); setCategory('All'); }}
                  className="mt-4 rounded-full bg-gradient-to-br from-cyan-400 to-bioteal-600 px-5 py-2 text-sm font-semibold text-obsidian transition hover:opacity-90"
                >
                  Reset search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </PerspectiveStage>
    </section>
  );
}
