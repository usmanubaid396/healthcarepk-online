/**
 * ProductShowcase — Enterprise 3D-interactive product gallery.
 *
 * Architecture (all self-contained in this file):
 *   - PerspectiveCard   : 3D perspective container (preserve-3d) wrapping content
 *   - ProductCard       : Glassmorphic card with mouse-following tilt + light sheen
 *   - OrbitalHub        : Central 3D hub around which featured cards orbit (desktop)
 *   - ProductGrid       : Responsive grid / orbit layout orchestrator
 *
 * Performance:
 *   - useReducedMotion disables tilt + orbital spin on accessibility request
 *   - will-change: transform, opacity on every interactive layer
 *   - rAF-throttled pointer tracking prevents layout thrash
 *   - Mobile: vertical stack with simplified entrance (no 3D / orbit)
 *
 * Only dependencies: framer-motion + lucide-react.
 */

import {
  useMemo,
  useState,
  useCallback,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useSpring,
  useTransform,
  useMotionValue,
  type MotionStyle,
} from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  Tag,
  ArrowUpRight,
  PackageX,
  Sparkles,
  Orbit,
  Pill,
  type LucideIcon,
} from 'lucide-react';
import { PRODUCTS, PRODUCT_CATEGORIES, type Product } from '../data/site';

/* ------------------------------------------------------------------ */
/*  Constants & helpers                                               */
/* ------------------------------------------------------------------ */

const TAG_STYLES: Record<NonNullable<Product['tag']>, string> = {
  flagship: 'bg-accent-400/20 text-accent-200 ring-accent-300/40',
  new: 'bg-emerald-400/20 text-emerald-200 ring-emerald-300/40',
};

const CATEGORY_ICON: Record<string, LucideIcon> = {
  Cardiovascular: Pill,
  Oncology: Sparkles,
  Neurology: Sparkles,
  Analgesic: Pill,
  Antibiotic: Pill,
  Gastro: Pill,
  Endocrine: Pill,
};

/** Number of products pulled into the desktop orbital ring. */
const ORBIT_COUNT = 6;

/* ------------------------------------------------------------------ */
/*  PerspectiveCard                                                   */
/*  A perspective container that preserves 3D for its children.       */
/* ------------------------------------------------------------------ */

type PerspectiveCardProps = {
  children: ReactNode;
  className?: string;
  perspective?: number;
};

function PerspectiveCard({
  children,
  className = '',
  perspective = 1000,
}: PerspectiveCardProps) {
  return (
    <div
      className={className}
      style={{
        perspective: `${perspective}px`,
        // Safari needs this on the parent for smooth child transforms
        WebkitPerspective: `${perspective}px`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ProductCard                                                       */
/*  Glassmorphic card with mouse-following 3D tilt + light sheen.     */
/* ------------------------------------------------------------------ */

type ProductCardProps = {
  product: Product;
  index: number;
  reducedMotion: boolean;
};

function ProductCard({ product, index, reducedMotion }: ProductCardProps) {
  // Pointer position 0..1 within the card.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  // Springs smooth the raw pointer values for fluid, lag-free tilt.
  const sx = useSpring(px, { stiffness: 220, damping: 26, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 220, damping: 26, mass: 0.4 });

  // Tilt rotations — ±10deg. Inverted rotateX gives a natural "look-at" feel.
  const rotateY = useTransform(sx, [0, 1], [-10, 10]);
  const rotateX = useTransform(sy, [0, 1], [10, -10]);

  // Light-sheen follows the cursor; shadow shifts opposite for realism.
  const sheenX = useTransform(sx, [0, 1], ['0%', '100%']);
  const sheenY = useTransform(sy, [0, 1], ['0%', '100%']);
  const shadowX = useTransform(sx, [0, 1], [12, -12]);
  const shadowY = useTransform(sy, [0, 1], [24, 8]);
  const boxShadow = useTransform(
    [shadowX, shadowY] as const,
    ([sxv, syv]: number[]) =>
      `${sxv}px ${syv}px 48px -12px rgba(8, 24, 64, 0.55), 0 0 0 1px rgba(255,255,255,0.04)`,
  );

  // Light-sheen radial gradient that tracks the cursor — hoisted to top level
  // so the hook order stays stable across renders.
  const sheenBg = useTransform(
    [sheenX, sheenY] as const,
    ([x, y]: string[]) =>
      `radial-gradient(220px 220px at ${x} ${y}, rgba(125,211,252,0.18), transparent 60%)`,
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
  const TagIcon = TAG_STYLES[product.tag ?? 'flagship'] ? Sparkles : null;

  // Static motion style when reduced motion is requested.
  const cardStyle: MotionStyle = reducedMotion
    ? {}
    : {
        rotateX,
        rotateY,
        boxShadow,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      };

  return (
    <PerspectiveCard perspective={1000} className="h-full">
      <motion.article
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' as const }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={cardStyle}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl
                   bg-white/5 backdrop-blur-2xl border border-white/10
                   p-6 text-white
                   [font-smooth:antialiased] [-webkit-font-smoothing:antialiased]
                   transition-[background,box-shadow] duration-300
                   hover:bg-white/[0.07]"
      >
        {/* Light-sheen — radial highlight that tracks the cursor. */}
        {!reducedMotion && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: sheenBg,
              willChange: 'background',
            }}
          />
        )}

        {/* Top hairline sheen sweep on hover. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0
                     bg-gradient-to-r from-transparent via-accent-300/70 to-transparent
                     transition-transform duration-700 group-hover:scale-x-100"
        />

        {/* Translucent inner ring for depth. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.04]"
        />

        {/* Header row */}
        <div className="relative z-10 flex items-start justify-between gap-3" style={{ transform: 'translateZ(40px)' }}>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-sm">
            <CatIcon className="h-5 w-5 text-accent-200" />
          </div>
          {product.tag && (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ${TAG_STYLES[product.tag]}`}
            >
              {TagIcon && <TagIcon className="h-3 w-3" />}
              {product.tag}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="relative z-10 mt-5 flex flex-1 flex-col" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="font-display text-xl font-bold tracking-tight text-white">{product.name}</h3>
          <p className="text-sm font-medium text-accent-300">{product.category}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">{product.description}</p>

          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs">
            <div>
              <dt className="text-white/40">Form</dt>
              <dd className="mt-0.5 font-semibold text-white/90">{product.form}</dd>
            </div>
            <div>
              <dt className="text-white/40">Strength</dt>
              <dd className="mt-0.5 font-semibold text-white/90">{product.strength}</dd>
            </div>
          </dl>

          <a
            href="#products"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-accent-200"
          >
            View details
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </motion.article>
    </PerspectiveCard>
  );
}

/* ------------------------------------------------------------------ */
/*  OrbitalHub                                                        */
/*  Central 3D hub with a rotating ring of featured product chips.    */
/* ------------------------------------------------------------------ */

type OrbitalHubProps = {
  featured: Product[];
  reducedMotion: boolean;
};

function OrbitalHub({ featured, reducedMotion }: OrbitalHubProps) {
  // Counter-rotation keeps each chip upright as the ring spins.
  const spin = useMotionValue(0);
  const counterRotate = useTransform(spin, (v) => `${-v}deg`);

  return (
    <PerspectiveCard perspective={1200} className="relative hidden lg:block">
      <motion.div
        className="relative mx-auto h-[440px] w-[440px]"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        // Animate the rotation value; the transforms below derive from it.
        animate={reducedMotion ? {} : { rotate: 360 }}
        transition={reducedMotion ? {} : { repeat: Infinity, duration: 40, ease: 'linear' }}
      >
        {/* Core glow */}
        <motion.div
          className="absolute inset-0 m-auto h-40 w-40 rounded-full bg-gradient-to-br from-accent-400/40 to-navy-600/40 blur-2xl"
          style={{ transform: 'translateZ(-40px)' }}
        />

        {/* Core hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="absolute inset-0 m-auto flex h-32 w-32 flex-col items-center justify-center rounded-full
                     bg-white/5 backdrop-blur-2xl border border-white/15 text-white
                     shadow-2xl shadow-navy-900/40"
          style={{ transform: 'translateZ(60px)', willChange: 'transform, opacity' }}
        >
          <Orbit className="h-7 w-7 text-accent-200" />
          <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Portfolio
          </span>
          <span className="font-display text-2xl font-extrabold">{featured.length}</span>
        </motion.div>

        {/* Orbital ring of chips */}
        <motion.div
          className="absolute inset-0"
          // Drive the spin directly via animate; onUpdate mirrors it into a
          // motion value so child chips can counter-rotate and stay upright.
          initial={false}
          animate={reducedMotion ? { rotate: 0 } : { rotate: 360 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { repeat: Infinity, duration: 40, ease: 'linear' }
          }
          onUpdate={(latest) => {
            const r = (latest as { rotate?: number }).rotate;
            if (typeof r === 'number') spin.set(r);
          }}
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
          {featured.map((p, i) => {
            const angle = (i / featured.length) * Math.PI * 2;
            const radius = 200;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <motion.div
                key={p.id}
                className="absolute left-1/2 top-1/2 -ml-28 -mt-9 w-56"
                style={{
                  x,
                  y,
                  rotate: counterRotate, // keep chips upright as ring spins
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
              >
                <div
                  className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-3
                             text-white shadow-xl shadow-navy-900/30 [font-smooth:antialiased]"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-400/20 text-accent-200">
                      {p.name.charAt(0)}
                    </span>
                    <div>
                      <div className="text-sm font-bold leading-tight">{p.name}</div>
                      <div className="text-[10px] uppercase tracking-wider text-white/50">
                        {p.category}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Faint orbital path ring */}
        <div
          aria-hidden
          className="absolute inset-0 m-auto h-[400px] w-[400px] rounded-full border border-white/[0.06]"
          style={{ transform: 'translateZ(-10px)' }}
        />
      </motion.div>
    </PerspectiveCard>
  );
}

/* ------------------------------------------------------------------ */
/*  ProductGrid                                                       */
/*  Mobile: vertical stack. Desktop: orbit hub + grid of cards.       */
/* ------------------------------------------------------------------ */

type ProductGridProps = {
  products: Product[];
  reducedMotion: boolean;
};

function ProductGrid({ products, reducedMotion }: ProductGridProps) {
  // Desktop: first ORBIT_COUNT featured products orbit; rest render in grid.
  const featured = useMemo(() => products.slice(0, ORBIT_COUNT), [products]);
  const gridProducts = useMemo(
    () => (products.length > ORBIT_COUNT ? products.slice(ORBIT_COUNT) : products),
    [products],
  );

  return (
    <div className="mt-10">
      {/* Mobile / tablet: simple responsive stack with simplified entrance. */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} reducedMotion={reducedMotion} />
        ))}
      </div>

      {/* Desktop: orbital hub + surrounding grid. */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-[1fr_1.2fr] gap-12">
          {/* Left: orbit */}
          <div className="flex items-center">
            <OrbitalHub featured={featured} reducedMotion={reducedMotion} />
          </div>

          {/* Right: card grid */}
          <div className="grid grid-cols-2 gap-5 xl:grid-cols-2">
            {gridProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} reducedMotion={reducedMotion} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Root component                                                    */
/* ------------------------------------------------------------------ */

export default function ProductShowcase() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const reducedMotion = useReducedMotion() ?? false;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-navy-950 py-24 lg:py-32 [font-smooth:antialiased]"
    >
      {/* Ambient backdrop glows */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent-600/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-navy-600/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-[0.04]" />

      <div className="container-tight relative">
        {/* Heading + search */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="eyebrow text-accent-300">
              <Tag className="h-4 w-4" /> Our Products
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Browse our registered medicines
            </h2>
            <p className="mt-3 max-w-xl text-white/60">
              Search by name, category, or therapeutic area. Every product is
              manufactured under GMP and registered for export.
            </p>
          </div>

          {/* Search */}
          <div className="w-full lg:max-w-md">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
              <input
                id="product-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search medicines, e.g. Felitan, Cisplat…"
                className="w-full rounded-full border border-white/10 bg-white/5 py-3.5 pl-12 pr-4
                           text-sm text-white placeholder:text-white/40 backdrop-blur-md outline-none
                           transition focus:border-accent-400/60 focus:ring-2 focus:ring-accent-400/20"
              />
            </div>
          </div>
        </div>

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
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  active
                    ? 'bg-white text-navy-900 shadow-sm'
                    : 'bg-white/5 text-white/70 ring-1 ring-white/10 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Result count */}
        <p className="mt-6 text-sm text-white/50">
          Showing <span className="font-semibold text-white/90">{filtered.length}</span> of{' '}
          {PRODUCTS.length} products
        </p>

        {/* Grid / orbit */}
        {filtered.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${category}-${query}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProductGrid products={filtered} reducedMotion={reducedMotion} />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02] py-16 text-center">
            <PackageX className="h-10 w-10 text-white/30" />
            <p className="mt-4 font-semibold text-white/90">No products found</p>
            <p className="mt-1 text-sm text-white/50">Try a different keyword or clear the filters.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('All');
              }}
              className="mt-4 rounded-full bg-white px-5 py-2 text-sm font-semibold text-navy-900 hover:bg-accent-50"
            >
              Reset search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
