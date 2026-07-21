import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useCallback, type PointerEvent as ReactPointerEvent } from 'react';
import { ShieldCheck, ArrowRight, FlaskConical } from 'lucide-react';
import { AmbientGlow, PerspectiveStage } from './ui/Stage';
import GlassButton from './ui/GlassButton';
import { blurReveal, staggerContainer } from '../lib/motion';

/* Three floating glass-morphic spheres at different depths */
const SPHERES = [
  { size: 'h-24 w-24 sm:h-32 sm:w-32', pos: 'left-[12%] top-[28%]', z: 30, delay: 0 },
  { size: 'h-16 w-16 sm:h-20 sm:w-20', pos: 'right-[16%] top-[20%]', z: 20, delay: 1.2 },
  { size: 'h-20 w-20 sm:h-28 sm:w-28', pos: 'left-[18%] bottom-[18%]', z: 25, delay: 0.6 },
];

function FloatingSphere({
  size,
  pos,
  z,
  delay,
  reduced,
}: {
  size: string;
  pos: string;
  z: number;
  delay: number;
  reduced: boolean | null;
}) {
  return (
    <motion.div
      aria-hidden
      className={`absolute ${pos} rounded-full bg-gradient-to-br from-white/10 to-cyan-400/10 backdrop-blur-2xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.4)]`}
      style={{ zIndex: z, willChange: 'transform' }}
      animate={
        reduced
          ? undefined
          : {
              scale: [1, 1.08, 1],
              rotate: [0, 18, 0],
              y: [0, -16, 0],
            }
      }
      transition={
        reduced
          ? undefined
          : { duration: 10, repeat: Infinity, ease: 'easeInOut', delay }
      }
    >
      <div className={`${size} rounded-full opacity-60`} />
    </motion.div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(my, { stiffness: 50, damping: 20 });
  const ry = useSpring(mx, { stiffness: 50, damping: 20 });

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (reduced) return;
      const r = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      mx.set(py * 6);
      my.set(px * -6);
    },
    [mx, my, reduced],
  );

  const onPointerLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <section
      id="home"
      className="relative isolate min-h-[100svh] overflow-hidden bg-obsidian"
    >
      {/* Living background — slow-drifting bio-teal orb */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <AmbientGlow
          colorClass="bg-teal-500/15"
          positionClass="absolute left-1/2 top-1/3"
          sizeClass="h-[620px] w-[620px] -translate-x-1/2"
          blur="blur-[160px]"
        />
        <AmbientGlow
          colorClass="bg-cyan-500/10"
          positionClass="absolute -right-32 bottom-0"
          sizeClass="h-[480px] w-[480px]"
        />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-[0.025]" />

      {/* Floating 3D glass spheres (desktop only for 60fps mobile) */}
      <div className="pointer-events-none hidden sm:block">
        {SPHERES.map((s, i) => (
          <FloatingSphere key={i} {...s} reduced={reduced} />
        ))}
      </div>

      <PerspectiveStage perspective={1000} className="relative z-10 h-full">
        <motion.div
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', willChange: 'transform' }}
          className="container-tight flex min-h-[100svh] flex-col items-center justify-center pt-28 pb-20 text-center"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-4xl"
          >
            <motion.span
              variants={blurReveal}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200"
            >
              <ShieldCheck className="h-4 w-4" />
              WHO-GMP · ISO 9001:2015 · cGMP Compliant
            </motion.span>

            <PerspectiveStage perspective={1000} className="mt-7">
              <motion.h1
                variants={blurReveal}
                style={{ transformStyle: 'preserve-3d' }}
                className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl"
              >
                Making the
                <span className="block bg-gradient-to-br from-cyan-300 via-cyan-200 to-white bg-clip-text text-transparent">
                  World Healthier
                </span>
              </motion.h1>
            </PerspectiveStage>

            <motion.p
              variants={blurReveal}
              className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-200/80 sm:text-xl"
            >
              Healthcare Pharmaceuticals is a WHO-GMP, ISO 9001:2015, and cGMP
              compliant manufacturer of registered medicines — delivering quality,
              accessible therapies trusted worldwide.
            </motion.p>

            <motion.div
              variants={blurReveal}
              className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <GlassButton
                href="#products"
                variant="primary"
                className="relative z-50 cursor-pointer pointer-events-auto"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Our Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </GlassButton>
              <GlassButton href="#contact" variant="secondary">
                <FlaskConical className="h-4 w-4" />
                Contact Sales
              </GlassButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </PerspectiveStage>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-obsidian to-transparent" />
    </section>
  );
}
