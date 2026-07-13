type BrandMarkProps = {
  size?: number;
  className?: string;
};

export function BrandMark({ size = 32, className = '' }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ryan Lyncee logo"
      className={`shrink-0 ${className}`}
    >
      <path
        d="M 28 60 L 28 12"
        stroke="#3D6FEF"
        strokeWidth="13"
        strokeLinecap="round"
      />

      <path
        d="M 28 12 C 54 12 62 18 62 28 C 62 36 54 40 28 38"
        stroke="#00B5AD"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M 28 38 L 56 60"
        stroke="#3D6FEF"
        strokeWidth="13"
        strokeLinecap="round"
      />
    </svg>
  );
}
