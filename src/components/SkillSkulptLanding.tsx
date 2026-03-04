import { useState } from 'react';
import { HeroSection } from './HeroSection';
import { WaitlistForm } from './WaitlistForm';
import { CurriculumRoadmap } from './CurriculumRoadmap';
import { SkillSkulptLogo } from './SkillSkulptLogo';

const navLinks: Array<{ href: string; label: string; primary?: boolean }> = [
  { href: '#coach', label: 'The Coach' },
  { href: '#curriculum', label: 'Curriculum' },
  { href: '#waitlist', label: 'Join Waitlist', primary: true },
];

export function SkillSkulptLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="ink-bleed-bg">
      {/* SVG filter for optional ink-bleed diffusion effect (artistic glass) */}
      <svg className="absolute size-0 overflow-hidden" aria-hidden>
        <defs>
          <filter id="ink-bleed-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Fixed frosted-glass navbar */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-glass-border bg-glass backdrop-blur-glass">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4" aria-label="Main">
          <a href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-white sm:gap-2.5 sm:text-xl">
            <SkillSkulptLogo size={28} className="flex-shrink-0" />
            <span>SkillSkulpt</span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-6 md:flex md:gap-8">
            {navLinks.map(({ href, label, primary }) => (
              <li key={href}>
                <a
                  href={href}
                  className={
                    primary
                      ? 'inline-flex items-center rounded-full bg-white/10 px-5 py-2.5 font-body text-sm font-semibold text-white ring-1 ring-white/20 transition-all hover:bg-white/15 hover:ring-white/30 focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2 focus:ring-offset-surface'
                      : 'font-body text-sm font-medium text-white/80 transition-colors hover:text-white'
                  }
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2 focus:ring-offset-surface md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile menu panel */}
        <div
          id="mobile-menu"
          className={`overflow-hidden border-t border-glass-border bg-glass/95 backdrop-blur-glass transition-[max-height,opacity] duration-300 ease-out md:hidden ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
          aria-hidden={!mobileMenuOpen}
        >
          <ul className="flex flex-col px-4 py-4 sm:px-6">
            {navLinks.map(({ href, label, primary }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={
                    primary
                      ? 'mt-2 inline-flex justify-center rounded-full bg-white/10 px-5 py-3 font-body text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2 focus:ring-offset-surface'
                      : 'block rounded-lg py-3 font-body text-base font-medium text-white/90 hover:bg-white/10 hover:text-white'
                  }
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <main className="pt-14 sm:pt-16">
        <HeroSection />

        {/* Tech stack: AWS Rekognition & Bedrock placeholders */}
        <section className="border-y border-glass-border bg-glass/50 px-6 py-16 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-center text-2xl font-semibold text-white/95 sm:text-3xl">
              Powered by AWS
            </h2>
            <p className="mt-2 text-center font-body text-sm text-white/60">
              Computer vision and generative AI for a smarter learning experience
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-12 md:gap-16">
              {/* AWS Bedrock logo placeholder */}
              <div className="flex flex-col items-center gap-3">
                <div
                  className="flex h-20 w-40 items-center justify-center rounded-xl border border-glass-border bg-glass shadow-inner"
                  aria-label="AWS Bedrock logo placeholder"
                >
                  <span className="font-body text-xs font-medium uppercase tracking-wider text-white/50">
                    Bedrock
                  </span>
                </div>
                <span className="font-body text-sm text-white/70">AWS Bedrock</span>
              </div>
            </div>
          </div>
        </section>

        {/* The Coach teaser */}
        <section id="coach" className="px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              The Coach
            </h2>
            <p className="mt-4 font-body text-white/75">
              Your AI coach that sees, understands, and guides. Built on Rekognition and Bedrock to deliver feedback that feels human.
            </p>
          </div>
        </section>

        {/* Curriculum roadmap */}
        <section id="curriculum" className="border-t border-glass-border px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              Curriculum
            </h2>
            <p className="mt-4 font-body text-white/75">
              Structured paths that adapt. From fundamentals to advanced—every step tailored to your progress.
            </p>
          </div>
          <div className="mt-16">
            <CurriculumRoadmap />
          </div>
        </section>

        {/* Waitlist CTA */}
        <section id="waitlist" className="border-t border-glass-border px-6 py-24">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl font-semibold text-white">
              Join the Waitlist
            </h2>
            <p className="mt-3 font-body text-white/75">
              Be first to sculpt your skills with SkillSkulpt.
            </p>
            <div className="mt-8">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-glass-border px-6 py-8">
        <div className="mx-auto max-w-6xl font-body text-center text-sm text-white/50">
          © {new Date().getFullYear()} SkillSkulpt. Craft your craft.
        </div>
      </footer>
    </div>
  );
}
