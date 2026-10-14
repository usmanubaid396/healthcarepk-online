import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, X, Mail } from 'lucide-react';
import { AmbientGlow, GlassCard, PerspectiveStage } from './ui/Stage';
import { staggerContainer, fadeRise, transition, viewportOnce } from '../lib/motion';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: React.ReactNode;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'quality-control-generic-medicines',
    title: 'How Quality Control Actually Works in Generic Medicine Manufacturing',
    category: 'Quality Assurance',
    readTime: '5 min read',
    excerpt: 'Generic is one of the most misunderstood words in pharmaceuticals. Discover the rigorous testing pipeline from raw material to finished pack.',
    content: (
      <div className="space-y-6 text-slate-300 leading-relaxed">
        <p className="text-lg text-slate-200 font-medium">
          &ldquo;Generic&rdquo; is one of the most misunderstood words in pharmaceuticals. To some buyers, it signals a lower-tier product. In reality, a properly manufactured generic medicine goes through the same rigorous quality control process as any branded equivalent — the same active ingredient, the same dosage, and in a WHO-GMP facility, the same standard of testing at every stage.
        </p>
        <p>Here is what that process actually looks like, from raw material to finished pack.</p>

        <h3 className="text-xl font-bold text-white pt-2">1. Raw Material Testing</h3>
        <p>
          Before a single tablet is produced, every active pharmaceutical ingredient (API) and excipient entering the facility is tested against pharmacopoeial specifications — checking identity, purity, and potency. Materials that don't meet spec are rejected before they ever reach the production floor. This is also where GLP (Good Laboratory Practice) compliance matters: it governs how these tests are conducted and documented, not just whether they happen.
        </p>

        <h3 className="text-xl font-bold text-white pt-2">2. In-Process Quality Checks</h3>
        <p>
          During manufacturing — whether it is tablet compression, capsule filling, or syrup formulation — samples are pulled at defined intervals to check weight consistency, dissolution behavior, hardness (for tablets), and visual defects. Catching a deviation early means it can be corrected before thousands of units are affected.
        </p>

        <h3 className="text-xl font-bold text-white pt-2">3. Finished Product Testing</h3>
        <p>
          Once a batch is complete, it doesn't move to packaging without passing a full battery of finished-product tests: assay (confirming correct active ingredient amounts), dissolution rate, microbial limits (critical for syrups, creams, and injectables), and stability under storage conditions.
        </p>

        <h3 className="text-xl font-bold text-white pt-2">4. Batch Documentation and Traceability</h3>
        <p>
          Every stage is documented in a batch manufacturing record. If a question arises about a specific pack of medicine during an audit or regulatory inquiry, that batch record allows traceability back through every ingredient lot, process step, and quality check.
        </p>

        <h3 className="text-xl font-bold text-white pt-2">5. Release Testing and Certificate of Analysis</h3>
        <p>
          Before a batch is released for sale, quality assurance signs off independently, issuing a Certificate of Analysis (CoA) giving distributors an independent record of what they are receiving.
        </p>

        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-6 mt-6">
          <h4 className="font-display font-bold text-white text-lg mb-2">Our Quality Approach</h4>
          <p className="text-sm text-slate-300">
            Healthcare Pharmaceuticals operates under WHO-GMP, cGMP, ISO 9001:2015, and GLP-compliant standards, with in-house production of 38+ generic molecules. Every registered formulation passes through this exact QC pipeline.
          </p>
          <div className="mt-4">
            <a
              href="mailto:usman@diffmdcat.com"
              className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 font-semibold text-sm"
            >
              <Mail className="h-4 w-4" /> Get in touch with our team
            </a>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'choosing-pharma-manufacturing-partner',
    title: '6 Questions to Ask Before Choosing a Pharmaceutical Manufacturing Partner',
    category: 'Partnership Guide',
    readTime: '6 min read',
    excerpt: 'Selecting a pharmaceutical manufacturer directly affects your reputation. Here are the questions that predict whether a partnership will hold up under scrutiny.',
    content: (
      <div className="space-y-6 text-slate-300 leading-relaxed">
        <p className="text-lg text-slate-200 font-medium">
          Selecting a pharmaceutical manufacturer isn't a one-time transaction — it is the foundation of a supply relationship that directly affects your reputation with every customer downstream. Yet many buyers still evaluate suppliers primarily on price.
        </p>

        <h3 className="text-xl font-bold text-white pt-2">1. What certifications do you hold, and can I see the documents?</h3>
        <p>WHO-GMP, cGMP, ISO 9001:2015, and GLP compliance should be table stakes. The real test is whether a manufacturer can produce actual certificates on request rather than just listing them on a website.</p>

        <h3 className="text-xl font-bold text-white pt-2">2. What is your registered product portfolio?</h3>
        <p>A manufacturer with 60+ registered formulations across therapeutic categories gives you room to grow your catalog over time without negotiating with multiple new suppliers.</p>

        <h3 className="text-xl font-bold text-white pt-2">3. Can you provide CoPP and FSC documentation for export?</h3>
        <p>If you are importing internationally, these two documents are non-negotiable for your market's registration process. Having them ready saves months of delays.</p>

        <h3 className="text-xl font-bold text-white pt-2">4. What does your quality control process actually look like?</h3>
        <p>Ask if QA is independent from production, if CoAs are provided per batch, and how failed batches are handled.</p>

        <h3 className="text-xl font-bold text-white pt-2">5. What are your MOQs, lead times, and payment terms?</h3>
        <p>Get these in writing early to ensure minimum order quantities and lead times align cleanly with your sales cycle.</p>

        <h3 className="text-xl font-bold text-white pt-2">6. Can I verify your registration independently?</h3>
        <p>Check products against national drug regulatory authorities (such as DRAP in Pakistan) to confirm legitimacy before money changes hands.</p>

        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-6 mt-6">
          <h4 className="font-display font-bold text-white text-lg mb-2">Where We Stand</h4>
          <p className="text-sm text-slate-300">
            Healthcare Pharmaceuticals is DRAP registered, WHO-GMP and cGMP compliant, ISO 9001:2015 certified, and GLP compliant, manufacturing 65+ registered formulations across eight therapeutic categories.
          </p>
          <div className="mt-4">
            <a
              href="mailto:usman@diffmdcat.com"
              className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 font-semibold text-sm"
            >
              <Mail className="h-4 w-4" /> Reach out to our sales team
            </a>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'private-label-pharma-manufacturing',
    title: 'Private Label Pharmaceutical Manufacturing: What It Is and When It Makes Sense',
    category: 'Business Strategy',
    readTime: '6 min read',
    excerpt: 'Build your own brand without building a factory. Learn how contract manufacturing and private labeling accelerate market entry.',
    content: (
      <div className="space-y-6 text-slate-300 leading-relaxed">
        <p className="text-lg text-slate-200 font-medium">
          For distributors and pharmacy chains looking to build their own brand rather than just reselling someone else's, private label manufacturing is often the fastest path in the pharmaceutical supply chain.
        </p>

        <h3 className="text-xl font-bold text-white pt-2">What Private Label Manufacturing Actually Means</h3>
        <p>
          A pharmaceutical manufacturer produces a formulation using their existing facility and quality systems, packaging it under your brand name instead of theirs. You control branding, pricing, and market positioning while the manufacturer handles production and QC.
        </p>

        <h3 className="text-xl font-bold text-white pt-2">Why Distributors Choose This Route</h3>
        <ul className="list-disc pl-6 space-y-2 text-slate-300">
          <li><strong>Brand equity:</strong> Every sale builds your name in the market.</li>
          <li><strong>Margin control:</strong> Offers better margins than reselling established brands.</li>
          <li><strong>Portfolio flexibility:</strong> Select molecules based on your market's exact needs.</li>
          <li><strong>Faster market entry:</strong> Leverages already-registered generic formulations.</li>
        </ul>

        <h3 className="text-xl font-bold text-white pt-2">What to Evaluate Before Choosing a Partner</h3>
        <p>Confirm registered formulation availability, export documentation readiness (CoPP/FSC), packaging customization flexibility, and consistent WHO-GMP quality standards.</p>

        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-6 mt-6">
          <h4 className="font-display font-bold text-white text-lg mb-2">Partner With Us</h4>
          <p className="text-sm text-slate-300">
            Healthcare Pharmaceuticals manufactures across eight therapeutic categories with 65+ registered formulations under WHO-GMP, cGMP, and ISO 9001:2015 standards.
          </p>
          <div className="mt-4">
            <a
              href="mailto:usman@diffmdcat.com"
              className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 font-semibold text-sm"
            >
              <Mail className="h-4 w-4" /> Reach out to our sales team
            </a>
          </div>
        </div>
      </div>
    ),
  },
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" data-section="blog" className="relative overflow-hidden bg-slate-950 py-24 lg:py-32 text-white">
      <AmbientGlow colorClass="bg-teal-500/15" positionClass="absolute left-1/3 top-1/2 -translate-y-1/2" sizeClass="h-[600px] w-[600px]" blur="blur-[160px]" />
      <div className="absolute inset-0 bg-grid-faint bg-grid opacity-[0.025]" />

      <PerspectiveStage perspective={1000} className="container-tight relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <motion.span variants={fadeRise} className="eyebrow inline-block bg-cyan-500/10 text-cyan-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.22em] border border-cyan-500/20">
            Industry Insights & Blog
          </motion.span>
          <motion.h2 variants={fadeRise} className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Knowledge, compliance & strategy
          </motion.h2>
          <motion.p variants={fadeRise} className="mt-4 text-base sm:text-lg text-slate-300/80 leading-relaxed">
            Expert perspectives on pharmaceutical manufacturing, quality assurance standards, and partnership best practices.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {BLOG_POSTS.map((post) => (
            <motion.div
              key={post.id}
              variants={fadeRise}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={transition}
              onClick={() => setSelectedPost(post)}
              className="relative group cursor-pointer will-change-transform"
            >
              <GlassCard className="h-full p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl relative overflow-hidden transition-all duration-300 group-hover:border-cyan-500/40 group-hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)] flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-medium border border-cyan-500/20">
                      <BookOpen className="h-3.5 w-3.5" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 text-xs">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-300/70 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-cyan-300 text-sm font-semibold">
                  <span>Read full article</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </PerspectiveStage>

      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/15 bg-slate-900/95 p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl z-10 text-white"
            >
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
                  {selectedPost.category}
                </span>
                <span className="text-slate-400 text-xs flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {selectedPost.readTime}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-6 leading-tight">
                {selectedPost.title}
              </h2>

              <div className="border-t border-white/10 pt-6">
                {selectedPost.content}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="rounded-full bg-slate-800 hover:bg-slate-700 text-white px-6 py-2.5 text-sm font-semibold transition-colors cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
