import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, ArrowUpRight, Github, CircuitBoard, ShieldCheck, Stethoscope, Globe, Boxes, MessagesSquare } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { frameCardStyle } from '../../lib/frameInsetShadow';

interface FeatureProject {
  slug: string;
  eyebrow: string;
  title: string;
  tagline: string;
  bullets: string[];
  frame: string;
  accentText: string;
  accentBg: string;
  stats: Array<{ label: string; value: string }>;
  tech: string[];
  icon: LucideIcon;
  href?: string;
  reverse?: boolean;
}

const PROJECTS: FeatureProject[] = [
  {
    slug: 'whiteflow',
    eyebrow: 'Realtime collaboration',
    title: 'Whiteflow',
    tagline: 'High-performance collaborative canvas that keeps multiplayer edits feeling instant.',
    bullets: [
      'Command-pattern undo/redo synchronized across clients',
      'Socket.io namespaces for per-room realtime updates',
      'Redis-cached reconciliation, tuned RAF physics loop',
      'Zoomable infinite canvas with optimistic rendering',
    ],
    frame: '#EBBAC7',
    accentText: 'text-pink-700',
    accentBg: 'bg-pink-100',
    stats: [
      { label: 'Type',    value: 'Team of 4' },
      { label: 'Stack',   value: 'Socket.io + Redis' },
      { label: 'Role',    value: 'Lead architect' },
    ],
    tech: ['Socket.io', 'Redis', 'Node', 'Canvas'],
    icon: CircuitBoard,
    href: 'https://github.com/ryanlyn29/WhiteFlow',
  },
  {
    slug: 'agentguard',
    eyebrow: 'AI security',
    title: 'AgentGuard',
    tagline: 'LLM vulnerability scanning dashboard with inline auto-remediation.',
    bullets: [
      'Async scanning queue with live polling UI',
      'Auto-remediation flow that proposes hardened prompts',
      'Score-trend visualizations via Recharts',
      'Postgres-backed prompt registry with version diffs',
    ],
    frame: '#C4D7D1',
    accentText: 'text-emerald-700',
    accentBg: 'bg-emerald-50',
    stats: [
      { label: 'Type',   value: 'Hackathon' },
      { label: 'Stack',  value: 'React + Gemini' },
      { label: 'Role',   value: 'Frontend' },
    ],
    tech: ['React', 'PostgreSQL', 'Gemini', 'Redis'],
    icon: ShieldCheck,
    href: 'https://github.com/4shivv/Sharkbyte_2025',
    reverse: true,
  },
  {
    slug: 'clinix',
    eyebrow: 'Health tech',
    title: 'Clinix',
    tagline: 'Modular AI healthcare assistant that replaces multi-page intake with a guided conversation.',
    bullets: [
      'FastAPI validation layer piping into realtime chat',
      'Docker-packaged full stack for parity across env',
      'Structured data always visible behind the chat',
      'Scheduling, insurance estimates, follow-up Q&A',
    ],
    frame: '#B5CDEF',
    accentText: 'text-yellow-700',
    accentBg: 'bg-yellow-100',
    stats: [
      { label: 'Team',   value: '4 engineers' },
      { label: 'Stack',  value: 'FastAPI + React' },
      { label: 'Role',   value: 'Frontend' },
    ],
    tech: ['FastAPI', 'Docker', 'React', 'Gemini'],
    icon: Stethoscope,
    href: 'https://github.com/HitMonrillo/Clinix',
  },
  {
    slug: 'edgescope',
    eyebrow: 'Edge computing',
    title: 'EdgeScope',
    tagline: 'Real-time edge traffic intelligence — simulated, visualized, and explained by AI.',
    bullets: [
      'Simulates traffic across 24 global edge locations',
      'Workers AI (Llama 3) for anomaly root-cause analysis',
      'Canvas world map with live, color-coded flows',
      'Session replay backed by Cloudflare KV',
    ],
    frame: '#C4D7D1',
    accentText: 'text-emerald-700',
    accentBg: 'bg-emerald-50',
    stats: [
      { label: 'Type',  value: 'Solo build' },
      { label: 'Stack', value: 'CF Workers + AI' },
      { label: 'Role',  value: 'Full-stack' },
    ],
    tech: ['Cloudflare', 'Workers AI', 'Next.js', 'Hono'],
    icon: Globe,
    href: 'https://github.com/ryanlyn29/cf_ai_edgescope',
    reverse: true,
  },
  {
    slug: 'navora',
    eyebrow: 'Simulation systems',
    title: 'Navora',
    tagline: 'Headless physics simulation with a USD-first, viewer-agnostic pipeline.',
    bullets: [
      'Headless physics engine that writes time-sampled USD',
      'Opens in Blender, Omniverse, or any USD tool',
      'Rendering fully decoupled from simulation',
      'Deterministic, portable output for reproducible runs',
    ],
    frame: '#EBBAC7',
    accentText: 'text-pink-700',
    accentBg: 'bg-pink-100',
    stats: [
      { label: 'Type',  value: 'Solo build' },
      { label: 'Stack', value: 'Python + USD' },
      { label: 'Focus', value: 'Physics sim' },
    ],
    tech: ['Python', 'OpenUSD', 'C++', 'Blender'],
    icon: Boxes,
    href: 'https://github.com/ryanlyn29/Navora',
  },
  {
    slug: 'weave',
    eyebrow: 'Full-stack messaging',
    title: 'Weave',
    tagline: 'A messaging platform that remembers, organizes, and surfaces what matters.',
    bullets: [
      'Conversations auto-organized and searchable',
      'Next.js frontend proxying a Java 21 / Spring Boot API',
      'Real-time thread updates over Server-Sent Events',
      'Firebase auth with Flyway-managed Postgres',
    ],
    frame: '#B5CDEF',
    accentText: 'text-yellow-700',
    accentBg: 'bg-yellow-100',
    stats: [
      { label: 'Type',  value: 'Solo build' },
      { label: 'Stack', value: 'Next + Spring' },
      { label: 'Role',  value: 'Full-stack' },
    ],
    tech: ['Next.js', 'Spring Boot', 'PostgreSQL', 'Firebase'],
    icon: MessagesSquare,
    href: 'https://github.com/ryanlyn29/Weave',
    reverse: true,
  },
];

export function FeatureBlocks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section ref={ref} id="projects" className="relative bg-[#F5EDE3] w-full py-24 -mt-1 z-10">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <div className="mb-16 md:mb-20 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4 }}
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4B83C4] mb-4"
          >
            Selected projects
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-4xl md:text-[44px] font-semibold tracking-tight text-[#1C1E26] leading-[1.1]"
          >
            things i&apos;ve built &mdash; and the call i&apos;d make differently now.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-5 text-[15px] text-stone-600 leading-relaxed"
          >
            a few i&apos;d happily talk you through: the why, what i owned, and the trade-offs behind the UX.
          </motion.p>
        </div>

        <motion.div style={{ y, willChange: 'transform' }} className="space-y-24 md:space-y-32">
          {PROJECTS.map((p, i) => (
            <FeatureRow key={p.title} project={p} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureRow({ project, index }: { project: FeatureProject; index: number }) {
  const reverse = project.reverse;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className={`grid md:grid-cols-2 gap-16 items-center ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}
    >
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4B83C4] mb-3">
          {project.eyebrow}
        </div>
        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1C1E26] leading-[1.1]">
          {project.title}
        </h3>
        <p className="mt-4 text-[15px] text-stone-600 leading-relaxed max-w-md">
          {project.tagline}
        </p>
        <ul className="mt-6 space-y-2.5">
          {project.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-[14px] text-stone-700">
              <span className="mt-0.5 inline-flex w-5 h-5 shrink-0 items-center justify-center rounded-full bg-[#1C1E26] text-white">
                <Check size={11} strokeWidth={3} />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Link
            to={`/work/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#1C1E26] text-white px-5 py-2 text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            View Project <ArrowUpRight size={13} />
          </Link>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-transparent text-stone-800 px-5 py-2 text-sm font-medium hover:border-stone-400 hover:bg-white transition-colors"
            >
              <Github size={14} /> GitHub
            </a>
          )}
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${project.accentBg} ${project.accentText}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" /> Built
          </span>
        </div>
      </div>

      <ColoredFrameVisual project={project} />
    </motion.div>
  );
}

function ColoredFrameVisual({ project }: { project: FeatureProject }) {
  const Icon = project.icon;
  return (
    <div className="flex justify-center w-full">
      <div
        className="w-full max-w-[500px] rounded-[25px] pl-6 pt-6 sm:pl-10 sm:pt-10 overflow-hidden"
        style={frameCardStyle(project.frame)}
      >
        <div className="relative">
          <div aria-hidden className="absolute inset-0 translate-y-3 translate-x-3 rounded-tl-[24px] bg-[#F5F5F5] border-t border-l border-[#222] z-0" />
          <div aria-hidden className="absolute inset-0 translate-y-1.5 translate-x-1.5 rounded-tl-[24px] bg-[#FAFAFA] border-t border-l border-[#222] z-10" />

          <div className="relative z-20 bg-white rounded-tl-[24px] border-t border-l border-[#222] w-full p-6 sm:p-8 sm:pb-10 flex flex-col shadow-[6px_14px_36px_rgba(28,30,38,0.2),3px_6px_14px_rgba(28,30,38,0.12)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-[#1C1E26] text-white">
                  <Icon size={16} />
                </span>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">Project</div>
                  <div className="text-sm font-semibold text-[#1C1E26]">{project.title}</div>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${project.accentBg} ${project.accentText}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" /> Built
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mb-5">
              {project.stats.map((s) => (
                <div key={s.label} className="rounded-lg border border-stone-200/70 p-2.5">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-stone-400">{s.label}</div>
                  <div className="text-[13px] font-semibold text-[#1C1E26] mt-0.5 leading-tight">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400 mb-2">Stack</div>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md text-[11px] bg-stone-50 border border-stone-200/70 text-stone-600"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-stone-200/70 flex items-center justify-between text-xs text-stone-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> built
              </span>
              <span>2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
