interface WaveDividerProps {
  from: string;
  to: string;
  flip?: boolean;
}

export function WaveDivider({ from, to, flip = false }: WaveDividerProps) {
  return (
    <div
      className="relative w-full overflow-hidden leading-[0] -my-px"
      style={{ height: 160, backgroundColor: from }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 160"
        className="absolute bottom-0 left-0 w-full block"
        preserveAspectRatio="none"
        style={{
          transform: flip ? 'scaleX(-1) translateY(2px)' : 'translateY(2px)',
        }}
      >
        <path d="M0,110 C320,80 820,140 1440,120 L1440,160 L0,160 Z" fill={to} />
      </svg>
    </div>
  );
}
