import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

interface DarkCurveSectionProps {
  aboveColor?: string;
  belowColor?: string;
}

interface TimelineItem {
  role: string;
  org: string;
  period: string;
  body: string;
}

interface CertItem {
  name: string;
  issuer: string;
}

const EXPERIENCE: TimelineItem[] = [
  {
    role: 'Data Science Intern',
    org: 'Miami-Dade County',
    period: 'May 2026',
    body: 'Analyzed 47k+ Databricks job runs in Python & Spark SQL, built risk-scoring models, and delivered a Streamlit observability dashboard to county leadership.',
  },
  {
    role: 'AI/ML Fellow',
    org: 'Break Through Tech',
    period: 'Mar 2026 – Present',
    body: 'Selected for the 2026–27 national AI fellowship building industry-ready ML skills with mentorship from leaders at top tech companies.',
  },
  {
    role: 'AI Fellow',
    org: 'Handshake',
    period: 'Nov 2025 – Present',
    body: 'Run RLHF on multimodal LLM & vision models — evaluating 200+ prompts to cut hallucinations and improve alignment for production deployment pipelines.',
  },
  {
    role: 'Software Engineer',
    org: 'INIT Build',
    period: 'Oct 2025 – Mar 2026',
    body: "Built WhiteFlow's realtime canvas frontend (JS, Node, Socket.IO, Redis) and the Figma flows behind the collaboration UI.",
  },
];

const ACTIVITIES: TimelineItem[] = [
  {
    role: 'Director of Communications',
    org: 'INIT FIU',
    period: 'Jan 2026 – Present',
    body: "INIT is a 4,000+ member nonprofit helping underserved communities launch tech careers. I lead communications for ShellHacks — Florida's largest hackathon (1,400+ participants) — and the chapter's programs and workshops.",
  },
  {
    role: 'Member',
    org: 'ColorStack',
    period: 'Aug 2025 – Present',
    body: 'Part of a national community of Black & Latinx computer science students growing into tech careers.',
  },
];

const CERTIFICATIONS: CertItem[] = [
  { name: 'Leadership Agility', issuer: 'FIU' },
  { name: 'Web Development Fundamentals', issuer: 'IBM' },
  { name: 'Autodesk Certified User: Fusion', issuer: 'Certiport' },
  { name: 'Microsoft Office Specialist: PowerPoint', issuer: 'Certiport' },
];

const CERT_COLORS = ['#EBBAC7', '#C4D7D1', '#B5CDEF', '#FEF3C7'];

function EntryList({ items }: { items: TimelineItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((e) => (
        <div
          key={`${e.org}-${e.role}`}
          className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-white/20"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <h3 className="text-[15px] font-semibold text-white">{e.role}</h3>
            <span className="text-xs text-stone-400 shrink-0">{e.period}</span>
          </div>
          <div className="mt-0.5 text-[13px] font-medium text-[#B5CDEF]">{e.org}</div>
          <p className="mt-2 text-[13.5px] text-stone-300/90 leading-relaxed">{e.body}</p>
        </div>
      ))}
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

        <div className="relative z-20 max-w-[1200px] mx-auto px-6 py-28 md:py-36">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
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
                a bit about me, <br />and where i&apos;ve been.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[15px] text-stone-300 leading-relaxed mb-10"
              >
                i&apos;m ryan, a computer engineering student at FIU working across software,
                data systems, and applied AI. here&apos;s where i&apos;ve been putting that to work.
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

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C48CB3] mb-8">
                Experience
              </div>
              <EntryList items={EXPERIENCE} />
            </motion.div>
          </div>

          <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-12 lg:gap-20 items-start border-t border-white/10 pt-14 md:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C48CB3] mb-8">
                Activities
              </div>
              <EntryList items={ACTIVITIES} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C48CB3] mb-8">
                Certifications
              </div>
              <ul className="space-y-3">
                {CERTIFICATIONS.map((c, i) => (
                  <li
                    key={c.name}
                    className="flex items-center gap-3.5 rounded-xl p-4"
                    style={{ backgroundColor: CERT_COLORS[i % CERT_COLORS.length] }}
                  >
                    <span className="inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-[#1C1E26] text-white">
                      <Award size={16} />
                    </span>
                    <div>
                      <div className="text-[13.5px] font-semibold text-[#1C1E26] leading-snug">{c.name}</div>
                      <div className="mt-0.5 text-xs font-medium text-[#1C1E26]/70">{c.issuer}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
