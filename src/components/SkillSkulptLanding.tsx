import { HeroSection } from './HeroSection';
import { WaitlistForm } from './WaitlistForm';
import { CurriculumRoadmap } from './CurriculumRoadmap';
import { SkillSkulptLogo } from './SkillSkulptLogo';

export function SkillSkulptLanding() {
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

      {/* Sticky frosted-glass navbar */}
      <header className="sticky top-0 z-50 border-b border-glass-border bg-glass backdrop-blur-glass">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-white">
            <SkillSkulptLogo size={28} className="flex-shrink-0" />
            <span>SkillSkulpt</span>
          </a>
          <ul className="flex items-center gap-8">
            <li>
              <a
                href="#coach"
                className="font-body text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                The Coach
              </a>
            </li>
            <li>
              <a
                href="#curriculum"
                className="font-body text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Curriculum
              </a>
            </li>
            <li>
              <a
                href="#waitlist"
                className="inline-flex items-center rounded-full bg-white/10 px-5 py-2.5 font-body text-sm font-semibold text-white ring-1 ring-white/20 transition-all hover:bg-white/15 hover:ring-white/30 focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2 focus:ring-offset-surface"
              >
                Join Waitlist
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
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
