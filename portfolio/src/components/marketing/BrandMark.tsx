import { cn } from '../../lib/utils';

interface BrandMarkProps {
  /** Nav sits over the dark hero */
  onDark?: boolean;
  className?: string;
}

export function BrandMark({ onDark = false, className }: BrandMarkProps) {
  return (
    <span
      className={cn(
        'relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
        onDark ? 'bg-white/95' : 'bg-[#1C1E26]',
        className
      )}
    >
      <svg viewBox="0 0 32 32" className="h-[18px] w-[18px]" aria-hidden>
        <path
          d="M 10 7 C 16 8, 18 14, 14 16 C 18 18, 20 24, 22 25"
          fill="none"
          stroke={onDark ? '#1C1E26' : '#ffffff'}
          strokeWidth="3.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
