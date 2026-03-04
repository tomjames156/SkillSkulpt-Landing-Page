interface SkillSkulptLogoProps {
  className?: string;
  size?: number;
}

/** Two intertwined S's — one violet, one white; they cross at the center (SkillSkulpt mark) */
export function SkillSkulptLogo({ className = '', size = 32 }: SkillSkulptLogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      {/* Left S: classic S curve, passes behind at top and in front at bottom */}
      <path
        d="M 8 6 C 8 10 14 10 16 12 C 18 14 18 18 16 20 C 14 22 8 22 8 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-violet"
      />
      {/* Right S: mirrored S, intertwines — passes in front at top, behind at bottom */}
      <path
        d="M 24 26 C 24 22 18 22 16 20 C 14 18 14 14 16 12 C 18 10 24 10 24 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      />
    </svg>
  );
}
