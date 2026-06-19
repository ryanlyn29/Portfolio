import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const CONSTELLATION: Array<[number, number, number, number]> = [
  [80, 120, 1.6, 0.35],
  [180, 70, 1.2, 0.25],
  [40, 260, 1.8, 0.45],
  [140, 380, 1.2, 0.3],
  [260, 200, 1.4, 0.3],
  [870, 90, 1.6, 0.4],
  [930, 190, 1.2, 0.3],
  [780, 140, 1.4, 0.3],
  [950, 340, 1.8, 0.4],
  [820, 440, 1.2, 0.25],
  [700, 520, 1.4, 0.25],
  [100, 560, 1.6, 0.3],
  [300, 600, 1.2, 0.2],
];

const SPARKLES: Array<{ top: string; side: 'left' | 'right'; offset: string; size: number; delay: number }> = [
  { top: '18%', side: 'left',  offset: '8%',  size: 24, delay: 0.9 },
  { top: '30%', side: 'right', offset: '14%', size: 18, delay: 1.1 },
  { top: '58%', side: 'left',  offset: '20%', size: 14, delay: 1.4 },
  { top: '70%', side: 'right', offset: '22%', size: 22, delay: 1.6 },
  { top: '46%', side: 'right', offset: '6%',  size: 16, delay: 1.8 },
  { top: '12%', side: 'right', offset: '30%', size: 12, delay: 2.0 },
  { top: '82%', side: 'left',  offset: '42%', size: 14, delay: 2.1 },
];

function PastelAccents() {
  return (
    <>
      <svg
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 w-full h-full"
        aria-hidden
      >
        <g transform="translate(-40, -40)">
          {[220, 160, 100].map((r, i) => (
            <circle
              key={r}
              cx={180}
              cy={180}
              r={r}
              stroke="#8AACDB"
              strokeOpacity={[0.28, 0.32, 0.38][i]}
              strokeWidth="1.25"
              strokeDasharray="4 8"
              fill="none"
            />
          ))}
        </g>

        <motion.path
          d="M 1100 540 C 900 620, 700 620, 500 560 C 360 520, 220 460, 80 420"
          stroke="#B5CDEF"
          strokeOpacity={0.4}
          strokeWidth="1.5"
          strokeDasharray="3 9"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: EASE, delay: 0.3 }}
        />

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <circle cx={880} cy={260} r={18} stroke="#B5CDEF" strokeWidth="1.25" fill="none" />
          <circle cx={880} cy={260} r={5} fill="#B5CDEF" />
        </motion.g>
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <circle cx={130} cy={480} r={14} stroke="#B5CDEF" strokeWidth="1.25" fill="none" />
          <circle cx={130} cy={480} r={4} fill="#B5CDEF" />
        </motion.g>

        {CONSTELLATION.map(([x, y, r, o], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={r * 1.6}
            fill="#B5CDEF"
            fillOpacity={Math.min(1, o + 0.25)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 + i * 0.04 }}
          />
        ))}
      </svg>

      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: s.delay, ease: EASE }}
          className="pointer-events-none absolute"
          style={{
            top: s.top,
            [s.side]: s.offset,
          }}
          aria-hidden
        >
          <svg
            width={s.size}
            height={s.size}
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              d="M5 0 L5.9 4.1 L10 5 L5.9 5.9 L5 10 L4.1 5.9 L0 5 L4.1 4.1 Z"
              fill="#C9DAF0"
            />
          </svg>
        </motion.span>
      ))}
    </>
  );
}

function DashedFlightPath() {
  return (
    <svg
      viewBox="0 0 900 560"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 w-full h-full hidden sm:block"
      aria-hidden
    >
      <motion.path
        d="M -100 400 C 120 300, 260 140, 420 100 C 620 60, 780 140, 980 300"
        stroke="#B5CDEF"
        strokeOpacity={0.55}
        strokeWidth="1.75"
        strokeDasharray="8 8"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: EASE, delay: 0.4 }}
      />
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.2 }}
        transform="translate(980 300) rotate(-20)"
      >
        <path d="M 0 0 L -22 -8 L -6 -2 L -18 6 Z" fill="#B5CDEF" fillOpacity={0.8} />
        <line x1={-6} y1={-2} x2={-18} y2={6} stroke="#B5CDEF" strokeOpacity={0.5} strokeWidth={1} />
      </motion.g>
    </svg>
  );
}

export function Hero() {
  return (
    <section
      data-hero
      id="top"
      className="relative bg-[#0B1735] w-full overflow-hidden"
    >
      <div className="absolute inset-0">
        <PastelAccents />
      </div>
      <div className="absolute inset-0">
        <DashedFlightPath />
      </div>

      <div className="relative z-[1] mx-auto w-full max-w-4xl px-6 lg:px-10 pt-40 md:pt-52 pb-28 md:pb-36 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-[#3A5689] px-4 py-1.5 text-sm text-white"
        >
          <span className="bg-white text-[#3A5689] text-[10px] font-semibold uppercase rounded-full px-2 py-0.5 tracking-wide">
            Open
          </span>
          <span>to PM &amp; SWE internships</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.06 }}
          className="mt-8 text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1]"
        >
          hey, i&apos;m ryan 👋
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
          className="mt-6 text-lg text-stone-300 max-w-xl mx-auto leading-relaxed"
        >
          glad you stopped by &mdash; i build realtime tools, applied AI, and clean data systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="rounded-full border border-white/30 bg-transparent px-7 py-3 text-sm font-medium text-white hover:border-white/60 hover:bg-white/10 transition-colors inline-flex items-center gap-2"
          >
            View projects
          </a>
          <a
            href="mailto:ryanlyncee29@gmail.com"
            className="rounded-full bg-white text-[#0B1735] px-7 py-3 text-sm font-medium hover:bg-stone-100 transition-colors inline-flex items-center gap-2"
          >
            Get in touch <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden" style={{ height: 160 }} aria-hidden>
        <svg
          viewBox="0 0 1440 160"
          className="absolute bottom-0 left-0 w-full block"
          preserveAspectRatio="none"
          style={{ height: 160 }}
        >
          <path d="M0,0 C360,120 1080,120 1440,0 L1440,200 L0,200 Z" fill="#FDFBF7" />
        </svg>
      </div>
    </section>
  );
}
