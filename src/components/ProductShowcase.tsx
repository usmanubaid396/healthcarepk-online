import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Tag, ArrowUpRight, PackageX } from 'lucide-react';
import { PRODUCTS, PRODUCT_CATEGORIES, type Product } from '../data/site';

const TAG_STYLES: Record<NonNullable<Product['tag']>, string> = {
  flagship: 'bg-accent-50 text-accent-700 ring-accent-200',
  new: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
};

export default function ProductShowcase() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');

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
    <section id="products" className="py-24 lg:py-32 bg-navy-50/60">
      <div className="container-tight">
        {/* Heading */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="eyebrow">
              <Tag className="h-4 w-4" /> Our Products
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
              Browse our registered medicines
            </h2>
            <p className="mt-3 max-w-xl text-navy-600">
              Search by name, category, or therapeutic area. Every product is
              manufactured under GMP and registered for export.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full lg:max-w-md">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
              <input
                id="product-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search medicines, e.g. Felitan, Cisplat…"
                className="w-full rounded-full border border-navy-200 bg-white py-3.5 pl-12 pr-4 text-sm text-navy-900 shadow-sm outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-200"
              />
            </div>
          </div>
        </div>

        {/* Category chips */}
        <div className="mt-8 flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-navy-400">
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
                    ? 'bg-navy-700 text-white shadow-sm'
                    : 'bg-white text-navy-600 ring-1 ring-navy-200 hover:bg-navy-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Result count */}
        <p className="mt-6 text-sm text-navy-500">
          Showing <span className="font-semibold text-navy-800">{filtered.length}</span> of{' '}
          {PRODUCTS.length} products
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <motion.div layout className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: 'easeOut' as const }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy-100 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10"
                >
                  {/* Top accent */}
                  <span className="absolute inset-x-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-accent-400 to-navy-600 transition-transform duration-300 group-hover:scale-x-100" />

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-700 text-white font-display text-lg font-extrabold">
                      {p.name.charAt(0)}
                    </div>
                    {p.tag && (
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ${TAG_STYLES[p.tag]}`}
                      >
                        {p.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold text-navy-900">{p.name}</h3>
                  <p className="text-sm font-medium text-accent-600">{p.category}</p>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-500">
                    {p.description}
                  </p>

                  <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-navy-100 pt-4 text-xs">
                    <div>
                      <dt className="text-navy-400">Form</dt>
                      <dd className="mt-0.5 font-semibold text-navy-800">{p.form}</dd>
                    </div>
                    <div>
                      <dt className="text-navy-400">Strength</dt>
                      <dd className="mt-0.5 font-semibold text-navy-800">{p.strength}</dd>
                    </div>
                  </dl>

                  <a
                    href="#products"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 transition-colors hover:text-accent-600"
                  >
                    View details
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-200 bg-white py-16 text-center">
            <PackageX className="h-10 w-10 text-navy-300" />
            <p className="mt-4 font-semibold text-navy-800">No products found</p>
            <p className="mt-1 text-sm text-navy-500">
              Try a different keyword or clear the filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('All');
              }}
              className="mt-4 rounded-full bg-navy-700 px-5 py-2 text-sm font-semibold text-white hover:bg-navy-800"
            >
              Reset search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
