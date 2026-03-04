import { motion } from 'framer-motion';

const MILESTONES = [
  'Anatomy Fundamentals',
  'Lighting & Value',
  'Perspective & Form',
  'Color Theory',
  'Composition',
  'Style & Critique',
];

/* Hand-drawn pencil line: vertical path with slight wobble (viewBox 0 0 4 100 or so, scaled) */
const timelinePath = 'M 2 0 Q 2.4 16 1.8 32 Q 2.2 48 2 64 Q 1.6 80 2 100';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const nodeItem = {
  hidden: { opacity: 0, x: -12, scale: 0.92 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export function CurriculumRoadmap() {
  return (
    <div className="relative mx-auto max-w-2xl">
      {/* Hand-drawn pencil timeline line (SVG) - aligned with node centers */}
      <div className="absolute left-[22px] top-0 bottom-12 w-[2px] md:left-6" aria-hidden>
        <motion.svg
          viewBox="0 0 4 100"
          preserveAspectRatio="none"
          className="h-full w-full"
          initial={{ pathLength: 0, opacity: 0.5 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <defs>
            <linearGradient id="pencil-stroke" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9CA3AF" />
              <stop offset="50%" stopColor="#6B7280" />
              <stop offset="100%" stopColor="#4B5563" />
            </linearGradient>
          </defs>
          <motion.path
            d={timelinePath}
            fill="none"
            stroke="url(#pencil-stroke)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </motion.svg>
      </div>

      {/* Milestone nodes */}
      <motion.ul
        className="relative space-y-0"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px 0px' }}
      >
        {MILESTONES.map((label) => (
          <motion.li
            key={label}
            variants={nodeItem}
            className="relative flex items-center gap-6 pb-14 pl-4 last:pb-4 md:pl-6"
          >
            {/* Node dot + glow on hover */}
            <motion.div
              className="group relative flex-shrink-0"
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <span
                className="absolute -inset-3 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, transparent 70%)',
                  boxShadow: '0 0 24px rgba(124, 58, 237, 0.4)',
                }}
                aria-hidden
              />
              <span
                className="relative block h-3 w-3 rounded-full border-2 border-violet/80 bg-surface ring-2 ring-violet/20 transition-shadow duration-300 group-hover:ring-violet/50 group-hover:shadow-[0_0_16px_rgba(124,58,237,0.5)]"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
              />
            </motion.div>

            {/* Label card */}
            <motion.div
              className="min-w-0 rounded-xl border border-white/10 bg-white/5 py-3 pl-4 pr-4 backdrop-blur-sm transition-colors hover:bg-white/8"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <span className="font-body text-sm font-medium text-white/95 md:text-base">
                {label}
              </span>
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>

      {/* Powered by Amazon Bedrock tag */}
      <motion.div
        className="mt-6 flex justify-center"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-body text-xs text-white/60 backdrop-blur-sm">
          Powered by Amazon Bedrock
        </span>
      </motion.div>
    </div>
  );
}
