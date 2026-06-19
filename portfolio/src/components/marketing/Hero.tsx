import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Layers, Workflow, FolderGit2 } from 'lucide-react';

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

function BrowserMockup() {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/50 overflow-hidden shadow-2xl shadow-[#0B1735]/30">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-200/70 bg-stone-50/60">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-stone-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-stone-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-stone-200" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-stone-50 rounded-md px-4 py-1.5 text-xs text-stone-400 font-mono border border-stone-200/60">
            ryanlyncee.dev / projects / whiteflow
          </div>
        </div>
        <div className="w-10" />
      </div>

      <div className="grid grid-cols-[180px_1fr] min-h-[320px] md:min-h-[400px]">
        <aside className="border-r border-stone-200/70 bg-stone-50/40 p-4 hidden sm:block">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400 mb-3">Workspace</div>
          <ul className="space-y-1.5">
            {['Overview', 'Projects', 'Built', 'Notes', 'Playlist'].map((item, i) => (
              <li
                key={item}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs ${
                  i === 1 ? 'bg-white border border-stone-200/70 text-[#1C1E26] font-medium' : 'text-stone-500'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${['bg-[#6C91C2]','bg-[#EBBAC7]','bg-[#C4D7D1]','bg-amber-300','bg-[#B5CDEF]'][i]}`} />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400 mb-2">Stack</div>
          <div className="flex flex-wrap gap-1">
            {['TS', 'React', 'Node', 'PG'].map((t) => (
              <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-white border border-stone-200/70 text-stone-600">
                {t}
              </span>
            ))}
          </div>
        </aside>

        <main className="p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">Project</div>
              <div className="text-base md:text-lg font-semibold text-[#1C1E26]">Whiteflow · Realtime Canvas</div>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 rounded-full px-2.5 py-1 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Built
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { l: 'Stack', v: 'TS · Node' },
              { l: 'Realtime', v: 'Socket.io' },
              { l: 'Role', v: 'Lead' },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-stone-200/70 p-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">{s.l}</div>
                <div className="text-sm font-semibold text-[#1C1E26] mt-0.5">{s.v}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-stone-200/70 overflow-hidden">
            <div className="grid grid-cols-[1fr_70px_90px] text-[10px] uppercase tracking-[0.18em] text-stone-400 px-4 py-2 border-b border-stone-200/60 bg-stone-50/50">
              <span>Change</span>
              <span>Area</span>
              <span className="text-right">Status</span>
            </div>
            {[
              { c: 'Add FSM validator for state transitions', a: 'Core',   s: 'Done',  t: 'bg-emerald-50 text-emerald-700' },
              { c: 'Tune Redis pubsub broadcast path',         a: 'Realtime', s: 'Review', t: 'bg-amber-50 text-amber-700' },
              { c: 'Draft docs for undo/redo contract',        a: 'Docs',  s: 'WIP',   t: 'bg-violet-50 text-violet-700' },
              { c: 'Rewrite cursor rendering loop',            a: 'Canvas', s: 'Next', t: 'bg-stone-100 text-stone-600' },
            ].map((row) => (
              <div key={row.c} className="grid grid-cols-[1fr_70px_90px] items-center px-4 py-2.5 text-xs text-stone-700 border-b last:border-b-0 border-stone-200/50">
                <span>{row.c}</span>
                <span className="text-stone-500">{row.a}</span>
                <span className="text-right">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${row.t}`}>
                    {row.s}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 72]);

  return (
    <section
      data-hero
      id="top"
      ref={heroRef}
      className="relative bg-[#0B1735] w-full overflow-hidden"
    >
      <div className="absolute inset-0">
        <PastelAccents />
      </div>
      <div className="absolute inset-0">
        <DashedFlightPath />
      </div>

      <div className="relative z-[1] mx-auto w-full max-w-5xl px-6 lg:px-10 pt-36 md:pt-44 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm text-stone-200"
        >
          <span className="bg-blue-400 text-[#0B1735] text-[10px] font-semibold uppercase rounded-full px-2 py-0.5 tracking-wide">
            New
          </span>
          <span>currently applying to PM roles — open to internships &amp; full-time</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.06 }}
          className="mt-8 text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1]"
        >
          product-minded engineering <br />
          for software that feels human.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
          className="mt-6 text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed"
        >
          i&apos;m ryan — a computer engineering student at FIU building realtime tools, AI
          dashboards, and the small UX details in between. this is a running log of what i&apos;ve built and what i&apos;m learning.
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

      <div className="relative z-[1] mx-auto w-full max-w-5xl px-6 lg:px-10 pb-40 md:pb-48">
        <motion.div
          style={{ y, willChange: 'transform' }}
          className="relative"
        >
          <div className="rounded-3xl border border-white/15 p-2.5 md:p-3 bg-[#FDFBF7]/95 ring-1 ring-white/5">
            <BrowserMockup />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1 }}
            className="absolute bottom-36 -left-4 lg:-left-15 bg-white rounded-2xl border border-stone-200/50 p-4 max-w-xs z-[1] shadow-lg shadow-[#0B1735]/25 hidden md:block"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-[#EBBAC7]/40 text-[#1C1E26]">
                <Zap size={15} />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">Latency-first</span>
            </div>
            <p className="text-sm text-stone-700 leading-snug">
              Tuned the Whiteflow realtime loop so shared-canvas edits feel instant.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.15 }}
            className="absolute bottom-24 lg:bottom-1/2 right-5 lg:-right-15 bg-white rounded-2xl border border-stone-200/50 p-4 max-w-xs z-[1] shadow-lg shadow-[#0B1735]/25 hidden md:block"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-[#C4D7D1]/60 text-[#1C1E26]">
                <Workflow size={15} />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">Built</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-stone-600">
              <span className="inline-flex items-center gap-1.5"><FolderGit2 size={12} /> 6 projects</span>
              <span className="inline-flex items-center gap-1.5"><Layers size={12} /> 4 teams</span>
            </div>
          </motion.div>
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
