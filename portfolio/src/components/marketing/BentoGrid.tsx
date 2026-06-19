import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Radar, PenTool, Compass, Server, Database, Brain, Bot, Cloud, BarChart3,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Card {
  title: string;
  body: string;
  icon: LucideIcon;
  badge: string;
  badgeBg: string;
  badgeText: string;
}

const CARDS: Card[] = [
  { title: 'Product thinking',   body: 'sharp problem statements, crisp one-pagers, and trade-offs explained out loud.',
    icon: Compass, badge: 'Core',    badgeBg: 'bg-yellow-100',  badgeText: 'text-yellow-700' },
  { title: 'Frontend craft',     body: 'React + TS with a taste for small, honest animations and a11y defaults.',
    icon: PenTool, badge: 'Daily',   badgeBg: 'bg-pink-100',    badgeText: 'text-pink-700' },
  { title: 'Backend systems',    body: 'Node, Express, FastAPI, and Spring Boot — REST, queues, and auth that hold up.',
    icon: Server, badge: 'APIs',   badgeBg: 'bg-violet-50',   badgeText: 'text-violet-700' },
  { title: 'Realtime systems',   body: 'Socket.io, Redis, and the undo/redo contracts that keep clients honest.',
    icon: Radar, badge: 'Built',   badgeBg: 'bg-emerald-50',  badgeText: 'text-emerald-700' },
  { title: 'Databases',          body: 'Postgres, Redis, and Prisma — schema design, caching, and honest migrations.',
    icon: Database, badge: 'Data',  badgeBg: 'bg-yellow-100',  badgeText: 'text-yellow-700' },
  { title: 'Data &amp; ML',          body: 'Python, Spark SQL, and risk-scoring models that turn raw pipeline logs into decisions.',
    icon: Brain, badge: 'Python', badgeBg: 'bg-emerald-50',  badgeText: 'text-emerald-700' },
  { title: 'Applied AI',         body: 'Gemini and LLM integration, prompt hardening, and structured outputs you can trust.',
    icon: Bot, badge: 'LLM',    badgeBg: 'bg-pink-100',    badgeText: 'text-pink-700' },
  { title: 'Edge &amp; cloud',       body: 'Cloudflare Workers, Workers AI, and KV — serverless logic that runs at the edge.',
    icon: Cloud, badge: 'Edge',   badgeBg: 'bg-green-100',   badgeText: 'text-green-700' },
  { title: 'Data viz',           body: 'Streamlit and Plotly dashboards that make pipeline health readable for leadership.',
    icon: BarChart3, badge: 'Viz', badgeBg: 'bg-violet-50',   badgeText: 'text-violet-700' },
];

export function BentoGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [28, -28]);

  return (
    <section ref={ref} id="skills" className="relative bg-[#F5EDE3] w-full py-24 -mt-1 z-10">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4B83C4] mb-4"
          >
            What I bring
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-4xl md:text-[44px] font-semibold tracking-tight text-[#1C1E26] leading-[1.1]"
          >
            nine things i&apos;ve practiced long enough to build with.
          </motion.h2>
        </div>

        <motion.div
          style={{ y, willChange: 'transform' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {CARDS.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="bg-white rounded-2xl p-6 border border-stone-200/50 flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-stone-50 border border-stone-200/60 text-[#1C1E26]">
                  <c.icon size={17} />
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${c.badgeBg} ${c.badgeText}`}
                >
                  {c.badge}
                </span>
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-[#1C1E26]">{c.title}</h3>
              <p className="mt-1.5 text-[13.5px] text-stone-600 leading-relaxed">
                <span dangerouslySetInnerHTML={{ __html: c.body }} />
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
