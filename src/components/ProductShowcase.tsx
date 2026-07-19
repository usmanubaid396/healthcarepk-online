/**
 * ProductShowcase — 3D-interactive product gallery (Master Design System).
 *
 * Uses the centralized motion library (no bouncy springs) and the shared
 * GlassCard / AmbientGlow / PerspectiveStage primitives. Mobile-first grid
 * (1 → 2 → 4). 3D tilt-pop deactivates on reduced motion / coarse pointers.
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
  ArrowUpRight,
  PackageX,
  Pill,
  type LucideIcon,
} from 'lucide-react';
import { PRODUCTS, PRODUCT_CATEGORIES, type Product } from '../data/site';
import { AmbientGlow, PerspectiveStage } from './ui/Stage';
import { blurReveal, staggerContainer, fadeRise, transition, viewportOnce } from '../lib/motion';

const CATEGORY_ICON: Record<string, LucideIcon> = {
  Pyrexic: Pill,
  Analgesic: Pill,
  Gastrointestinal: Pill,
  Antibiotic: Pill,
  'Anti-allergic': Pill,
  Topical: Pill,
};

/* ------------------------------------------------------------------ */
/*  ProductCard                                                       */
/* ------------------------------------------------------------------ */

type ProductCardProps = {
  product: Product;
  reducedMotion: boolean;
};

function ProductCard({ product, reducedMotion }: ProductCardProps) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  // Premium springs — no bouncy defaults. Stiffness tuned to the global ease feel.
  const sx = useSpring(px, { stiffness: 260, damping: 30, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 260, damping: 30, mass: 0.5 });

  const rotateY = useTransform(sx, [0, 1], [-10, 10]);
  const rotateX = useTransform(sy, [0, 1], [10, -10]);
  const sheenX = useTransform(sx, [0, 1], ['0%', '100%']);
  const sheenY = useTransform(sy, [0, 1], ['0%', '100%']);
  const shadowX = useTransform(sx, [0, 1], [12, -12]);
  const shadowY = useTransform(sy, [0, 1], [24, 8]);
  const boxShadow = useTransform(
    [shadowX, shadowY] as const,
    ([sxv, syv]: number[]) =>
      `${sxv}px ${syv}px 48px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)`,
  );

  // Diagonal light-sheen reflection — hoisted to keep hook order stable.
  const sheenBg = useTransform(
    [sheenX, sheenY] as const,
    ([x, y]: string[]) =>
      `radial-gradient(220px 220px at ${x} ${y}, rgba(45,212,191,0.20), transparent 60%)`,
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

  const CatIcon = CATEGORY_ICON[product.category] ?? Pill;

  return (
    <PerspectiveStage perspective={1000} className="h-full">
      <motion.article
        variants={fadeRise}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        whileHover={
          reducedMotion
            ? { scale: 1.02 }
            : { rotateX: 10, rotateY: 10, scale: 1.05, z: 30 }
        }
        transition={transition}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
          ...(reducedMotion ? {} : { rotateX, rotateY, boxShadow }),
        }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl
                   bg-slate-900/40 backdrop-blur-2xl border border-white/10
                   shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                   p-6 text-white [font-smooth:antialiased] [-webkit-font-smoothing:antialiased]
                   transition-colors duration-300 hover:bg-slate-900/60"
      >
        {/* Diagonal light-sheen reflection on hover */}
        {!reducedMotion && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: sheenBg, willChange: 'background' }}
          />
        )}

        {/* Top hairline sweep */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0
                     bg-gradient-to-r from-transparent via-teal-300/70 to-transparent
                     transition-transform duration-700 group-hover:scale-x-100"
        />

        {/* Inner ring for depth */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.04]"
        />

        <div className="relative z-10 flex items-start justify-between gap-3" style={{ transform: 'translateZ(40px)' }}>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-xl">
            <CatIcon className="h-5 w-5 text-teal-300" />
          </div>
          <span className="rounded-full bg-teal-400/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-200 ring-1 ring-teal-300/30">
            Registered
          </span>
        </div>

        <div className="relative z-10 mt-5 flex flex-1 flex-col" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="font-display text-xl font-bold tracking-tight text-white">
            {product.name}
          </h3>
          <p className="text-sm font-medium text-teal-300">{product.category}</p>

          <a
            href="#products"
            className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-white transition-colors hover:text-teal-300"
          >
            View details
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </motion.article>
    </PerspectiveStage>
  );
}

/* ------------------------------------------------------------------ */
/*  Root                                                              */
/* ------------------------------------------------------------------ */

export default function ProductShowcase() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const reducedMotion = useReducedMotion() ?? false;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <section id="products" className="relative overflow-hidden bg-slate-950 py-24 lg:py-32">
      <AmbientGlow colorClass="bg-teal-500/10" positionClass="absolute -left-32 top-1/4" />
      <AmbientGlow colorClass="bg-teal-400/5" positionClass="absolute -right-32 bottom-1/4" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-[0.03]" />

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
              Browse our registered medicines
            </motion.h2>
            <motion.p variants={blurReveal} className="mt-3 max-w-xl text-slate-300/80">
              Search by name or therapeutic category. Every product is manufactured under
              GMP and registered for export.
            </motion.p>
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
                className="w-full rounded-full border border-white/10 bg-slate-900/40 backdrop-blur-2xl py-3.5 pl-12 pr-4
                           text-sm text-white placeholder:text-white/40 outline-none
                           transition focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/20"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Category chips */}
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
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'bg-white/5 text-white/70 ring-1 ring-white/10 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-white/50">
          Showing <span className="font-semibold text-white/90">{filtered.length}</span> of{' '}
          {PRODUCTS.length} products
        </p>

        {filtered.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${category}-${query}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} reducedMotion={reducedMotion} />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-900/40 py-16 text-center backdrop-blur-2xl">
            <PackageX className="h-10 w-10 text-white/30" />
            <p className="mt-4 font-semibold text-white/90">No products found</p>
            <p className="mt-1 text-sm text-white/50">Try a different keyword or clear the filters.</p>
            <button
              type="button"
              onClick={() => { setQuery(''); setCategory('All'); }}
              className="mt-4 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-teal-50"
            >
              Reset search
            </button>
          </div>
        )}
      </PerspectiveStage>
    </section>
  );
}
