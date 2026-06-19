import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

interface DarkCurveSectionProps {
  aboveColor?: string;
  belowColor?: string;
}

const ORBIT_NODES = [
  { id: 'intercom', ring: 1, angle: 165, icon: IntercomLogo },
  { id: 'github',   ring: 1, angle: 215, icon: GithubLogo },
  { id: 'notion',   ring: 1, angle: 115, icon: NotionLogo },
  { id: 'slack',    ring: 2, angle: 185, icon: SlackLogo },
  { id: 'jira',     ring: 2, angle: 240, icon: JiraLogo },
  { id: 'asana',    ring: 2, angle: 135, icon: AsanaLogo },
  { id: 'linear',   ring: 3, angle: 205, icon: LinearLogo },
  { id: 'generic1', ring: 3, angle: 155, icon: GenericDotLogo },
] as const;

function IntercomLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <rect width="24" height="24" rx="12" fill="#0057FF" />
      <path d="M7 11v4 M10 9v8 M14 9v8 M17 11v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function GithubLogo() {
  return <Github className="w-5 h-5 text-white" fill="currentColor" />;
}

function NotionLogo() {
  return (
    <div className="w-5 h-5 bg-white rounded-[4px] flex items-center justify-center">
      <span className="text-black text-[11px] font-bold font-serif leading-none">N</span>
    </div>
  );
}

function SlackLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <rect x="5" y="10" width="4" height="4" rx="2" fill="#E01E5A" />
      <rect x="10" y="10" width="9" height="4" rx="2" fill="#36C5F0" />
      <rect x="10" y="5" width="4" height="4" rx="2" fill="#2EB67D" />
      <rect x="10" y="15" width="4" height="4" rx="2" fill="#ECB22E" />
    </svg>
  );
}

function JiraLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M12 2L2 12l10 10 10-10L12 2z" fill="#0052CC" />
      <path d="M12 2L2 12l10 10V2z" fill="#2684FF" />
    </svg>
  );
}

function AsanaLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <circle cx="12" cy="6" r="3" fill="#F06A6A" />
      <circle cx="6" cy="16" r="3" fill="#F06A6A" />
      <circle cx="18" cy="16" r="3" fill="#F06A6A" />
    </svg>
  );
}

function LinearLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
      <path d="M12 2v20 M2 12h20" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

function GenericDotLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <circle cx="12" cy="12" r="8" fill="#FFF" opacity="0.2" />
      <circle cx="12" cy="12" r="4" fill="#FFF" />
    </svg>
  );
}

function OrbitVisual() {
  const center = { x: 750, y: 400 };
  const radii = [220, 360, 500];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 right-0 w-[1000px] h-[800px] -translate-y-1/2">
        <svg className="absolute inset-0 w-full h-full" aria-hidden>
          {radii.map((r, i) => (
            <circle
              key={`ring-${i}`}
              cx={center.x}
              cy={center.y}
              r={r}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              strokeDasharray="4 6"
              fill="none"
            />
          ))}
          <circle cx={center.x} cy={center.y} r={4} fill="rgba(255,255,255,0.1)" />
        </svg>

        {ORBIT_NODES.map((node, i) => {
          const r = radii[node.ring - 1];
          const rad = (node.angle * Math.PI) / 180;
          const x = Math.round(center.x + r * Math.cos(rad));
          const y = Math.round(center.y + r * Math.sin(rad));
          const Icon = node.icon;

          return (
            <div
              key={node.id}
              className="absolute w-[44px] h-[44px] rounded-full bg-[#152A55] border border-white/10 backdrop-blur-md"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              <motion.div
                className="flex h-full w-full items-center justify-center rounded-full"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
              >
                <Icon />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DarkCurveSection({
  aboveColor = '#F5EDE3',
  belowColor = '#FDFBF7',
}: DarkCurveSectionProps) {
  return (
    <section className="relative" style={{ backgroundColor: aboveColor }} id="about">
      <div className="relative bg-[#0B1735] overflow-hidden">
        <svg
          viewBox="0 0 1440 120"
          className="absolute top-0 left-0 w-full z-10 pointer-events-none"
          preserveAspectRatio="none"
          style={{ height: '8vw', minHeight: '60px', color: aboveColor }}
          aria-hidden
        >
          <path d="M0,0 L1440,0 L1440,20 C1000,120 400,120 0,20 Z" fill="currentColor" />
        </svg>

        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 left-0 w-full z-10 pointer-events-none"
          preserveAspectRatio="none"
          style={{ height: '8vw', minHeight: '60px', color: belowColor }}
          aria-hidden
        >
          <path d="M0,120 L1440,120 L1440,100 C1000,0 400,0 0,100 Z" fill="currentColor" />
        </svg>

        <OrbitVisual />

        <div className="relative z-20 max-w-[1200px] mx-auto px-6 py-40 md:py-56 flex flex-col justify-center min-h-[700px]">
          <div className="max-w-[480px]">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C48CB3] mb-5"
            >
              About
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-[44px] font-medium tracking-tight text-white leading-[1.15] mb-6"
            >
              a running log of what i&apos;ve built, <br />and what i&apos;m learning.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[15px] text-stone-300 leading-relaxed mb-10"
            >
              i&apos;m ryan — a computer engineering student at FIU building realtime tools,
              AI dashboards, and the small UX details in between. this is a running log of
              what i&apos;ve built and what i&apos;m learning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-[15px] font-medium text-[#1C1E26] transition-colors hover:bg-stone-100"
              >
                See selected work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-7 py-3 text-[15px] font-medium text-white transition-colors hover:border-white/60 hover:bg-white/10"
              >
                Let&apos;s talk
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
