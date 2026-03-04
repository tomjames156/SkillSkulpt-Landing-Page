import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';

const wireframePaths = [
  // Face oval
  'M 80 32 C 120 20 160 20 200 32 C 220 50 228 90 224 130 C 220 170 200 200 160 212 C 120 220 80 220 48 200 C 24 178 16 130 24 90 C 32 52 52 28 80 32 Z',
  // Left eye
  'M 72 88 C 82 82 92 82 102 88 C 92 94 82 94 72 88',
  // Right eye
  'M 138 88 C 148 82 158 82 168 88 C 158 94 148 94 138 88',
  // Nose bridge
  'M 120 98 L 118 140',
  // Mouth
  'M 88 158 Q 120 172 152 158',
  // Brow left
  'M 62 72 Q 92 68 102 74',
  // Brow right
  'M 138 74 Q 148 68 178 72',
];

const skillBars = [
  { label: 'Anatomy', value: 0.72, color: 'bg-violet' },
  { label: 'Shading', value: 0.58, color: 'bg-amber-500' },
  { label: 'Composition', value: 0.85, color: 'bg-emerald-500' },
];

function WireframeFace() {
  return (
    <motion.svg
      viewBox="0 0 240 240"
      className="h-full w-full max-h-[280px] md:max-h-[340px]"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
        hidden: {},
      }}
    >
      {wireframePaths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="rgba(196, 181, 160, 0.9)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0.6 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 0.9, ease: 'easeInOut' },
            },
          }}
        />
      ))}
    </motion.svg>
  );
}

function ArtAnalysisCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);
  const spring = { type: 'spring' as const, stiffness: 200, damping: 20 };
  const style = {
    rotateX: useSpring(rotateX, spring),
    rotateY: useSpring(rotateY, spring),
  };

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / 8);
    y.set((e.clientY - centerY) / 8);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="perspective-[800px]" style={{ perspective: 800 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        style={{
          ...style,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, y: 24, rotateX: -4 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
        className="w-[280px] rounded-2xl border border-glass-border bg-[rgba(18,18,22,0.92)] p-5 shadow-2xl backdrop-blur-[20px]"
      >
      <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
        <span className="rounded bg-violet/20 px-2 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wider text-violet">
          Rekognition
        </span>
        <span className="font-body text-xs text-white/60">Art Analysis Report</span>
      </div>
      <ul className="space-y-4">
        {skillBars.map(({ label, value, color }, i) => (
          <motion.li
            key={label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 + i * 0.1, duration: 0.4 }}
            className="space-y-1.5"
          >
            <div className="flex justify-between font-body text-xs">
              <span className="text-white/80">{label}</span>
              <span className="text-white/50">{Math.round(value * 100)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className={`h-full rounded-full ${color}`}
                initial={{ width: 0 }}
                animate={{ width: `${value * 100}%` }}
                transition={{ delay: 1.5 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </motion.li>
        ))}
      </ul>
      </motion.div>
    </div>
  );
}

function HoverRevealImage() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-glass-border shadow-2xl"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      {/* Placeholder: gradient "art" that goes from grayscale to color */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80)`,
          filter: hovered ? 'grayscale(0%) saturate(1.2)' : 'grayscale(100%) saturate(0.3)',
        }}
      />
      <div
        className="absolute inset-0 mix-blend-overlay transition-opacity duration-500"
        style={{
          background: hovered
            ? 'transparent'
            : 'linear-gradient(135deg, rgba(120,120,120,0.15) 0%, rgba(60,60,60,0.2) 100%)',
          opacity: hovered ? 0 : 1,
        }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-violet/0 font-body text-sm font-medium text-white"
        initial={false}
        animate={{
          opacity: hovered ? 0 : 1,
          backgroundColor: hovered ? 'rgba(124, 58, 237, 0)' : 'rgba(124, 58, 237, 0.15)',
        }}
        transition={{ duration: 0.4 }}
      >
        {!hovered && (
          <span className="rounded-full border border-white/30 bg-black/30 px-4 py-2 backdrop-blur-sm">
            Hover to reveal — coaching in action
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left: copy + wireframe */}
        <div className="lg:col-span-6 lg:pr-4">
          <motion.h1
            className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Master Your Craft with an AI Art Mentor
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl font-body text-lg text-white/75"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            From anime to realism, get a hyper-personalized curriculum powered by Amazon Bedrock.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="#waitlist"
              className="inline-flex items-center rounded-full bg-violet px-6 py-3 font-body text-sm font-semibold text-white shadow-lg shadow-violet/25 transition hover:bg-violet-deep focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2 focus:ring-offset-surface"
            >
              Join Waitlist
            </a>
            <a
              href="#curriculum"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-3 font-body text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-surface"
            >
              View Curriculum
            </a>
          </motion.div>
          {/* Wireframe drawing */}
          <motion.div
            className="mt-10 flex justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <div className="w-full max-w-[280px] md:max-w-[320px]">
              <WireframeFace />
            </div>
          </motion.div>
        </div>

        {/* Right: floating card + hover-reveal */}
        <div className="flex flex-col items-center gap-10 lg:col-span-6 lg:items-start lg:gap-12">
          <div className="flex justify-center lg:justify-end">
            <ArtAnalysisCard />
          </div>
          <div className="w-full max-w-md lg:max-w-none">
            <HoverRevealImage />
          </div>
        </div>
      </div>
    </section>
  );
}
