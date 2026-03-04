import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';

const ART_STYLES = ['Anime', 'Realism', 'Concept Art', 'Other'] as const;
type ArtStyle = (typeof ART_STYLES)[number] | '';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const SHEETSDB_API_URL =
  import.meta.env.VITE_SHEETSDB_API_URL ?? 'https://sheetdb.io/api/v1/jxii14kxheshx';

/* Brushstroke-shaped SVG paths for confetti */
const brushstrokePaths = [
  'M0 4 Q8 0 12 4 Q16 8 12 12 Q8 16 0 12 Q-4 8 0 4 Z',
  'M2 2 Q10 6 6 14 Q2 10 2 2 Z',
  'M0 8 L12 4 L8 14 Z',
  'M4 0 Q14 4 10 12 Q6 8 4 0 Z',
];

const confettiColors = [
  '#7C3AED', '#A78BFA', '#F59E0B', '#10B981', '#EC4899', '#6366F1', '#F97316',
];

function BrushstrokeConfetti() {
  const count = 24;
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    path: brushstrokePaths[i % brushstrokePaths.length],
    color: confettiColors[i % confettiColors.length],
    x: (Math.random() - 0.5) * 140,
    y: (Math.random() - 0.5) * 140,
    rotation: Math.random() * 360,
    scale: 0.4 + Math.random() * 0.6,
    duration: 0.6 + Math.random() * 0.4,
    delay: Math.random() * 0.15,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: p.scale }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: 0,
            rotate: p.rotation + (Math.random() > 0.5 ? 180 : -180),
            scale: p.scale * 0.3,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeOut',
          }}
        >
          <svg width="16" height="16" viewBox="-2 -2 20 20" className="drop-shadow-sm">
            <path d={p.path} fill={p.color} stroke={p.color} strokeWidth="0.5" opacity={0.95} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [artStyle, setArtStyle] = useState<ArtStyle>('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!showConfetti) return;
    const t = setTimeout(() => setShowConfetti(false), 1600);
    return () => clearTimeout(t);
  }, [showConfetti]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim()) {
        setStatus('error');
        setErrorMessage('Please enter your email.');
        return;
      }
      if (!artStyle) {
        setStatus('error');
        setErrorMessage('Please select an art style.');
        return;
      }
      setStatus('submitting');
      setErrorMessage('');

      try {
        const res = await fetch(SHEETSDB_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: [{ Email: email.trim(), Art_Style: artStyle }],
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Request failed (${res.status})`);
        }

        setStatus('success');
        setShowConfetti(true);
      } catch (err) {
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Try again.');
      }
    },
    [email, artStyle]
  );

  const isSubmitting = status === 'submitting';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  return (
    <div className="relative mx-auto max-w-md">
      {showConfetti && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <BrushstrokeConfetti />
        </div>
      )}
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative rounded-2xl border border-white/10 bg-white/5 px-8 py-10 text-center backdrop-blur-xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-2xl font-semibold text-white"
            >
              You're on the list
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-2 font-body text-white/70"
            >
              We'll notify you at <span className="text-white/90">{email}</span> when SkillSkulpt launches.
            </motion.p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition-[box-shadow] duration-300 focus-within:shadow-[0_0_0_2px_rgba(124,58,237,0.6),0_0_24px_rgba(124,58,237,0.25)]"
          >
            <div className="space-y-4">
              <label htmlFor="waitlist-email" className="sr-only">
                Email
              </label>
              <input
                id="waitlist-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={isSubmitting}
                autoComplete="email"
                aria-invalid={isError}
                aria-describedby={isError ? 'waitlist-error' : undefined}
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 font-body text-white placeholder:text-white/40 focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/40 disabled:opacity-60"
              />

              <label htmlFor="waitlist-style" className="sr-only">
                Preferred Art Style
              </label>
              <div className="relative">
                <select
                  id="waitlist-style"
                  value={artStyle}
                  onChange={(e) => setArtStyle(e.target.value as ArtStyle)}
                  disabled={isSubmitting}
                  aria-label="Preferred Art Style"
                  className="w-full appearance-none rounded-xl border border-white/15 bg-white/10 py-3.5 pl-4 pr-10 font-body text-white focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/40 disabled:opacity-60 [&>option]:bg-surface [&>option]:text-white"
                  style={{
                    WebkitAppearance: 'none',
                    minHeight: '3.125rem',
                  }}
                >
                  <option value="">Select art style</option>
                  {ART_STYLES.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </span>
              </div>

              {isError && errorMessage && (
                <motion.p
                  id="waitlist-error"
                  role="alert"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-body text-sm text-red-400"
                >
                  {errorMessage}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet py-3.5 font-body text-sm font-semibold text-white shadow-lg shadow-violet/25 transition hover:bg-violet-deep focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2 focus:ring-offset-surface disabled:pointer-events-none disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden />
                    <span>Submitting…</span>
                  </>
                ) : (
                  'Join Waitlist'
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
