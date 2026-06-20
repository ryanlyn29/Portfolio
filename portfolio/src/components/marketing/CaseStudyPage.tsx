import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight, ArrowLeft, ArrowRight, Quote, Star, Sparkles, Check,
  ExternalLink, Users as UsersIcon, Play,
} from 'lucide-react';
import type { CaseStudy } from '../../data/caseStudies';
import { MediaFrame } from './MediaFrame';
import { frameCardStyle } from '../../lib/frameInsetShadow';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

interface CaseStudyPageProps {
  project: CaseStudy;
  prev?: CaseStudy;
  next?: CaseStudy;
}

export function CaseStudyPage({ project, prev, next }: CaseStudyPageProps) {
  return (
    <div className="bg-[#FDFBF7]">
      <CaseStudyHero project={project} />

      <AboutRoleStrip project={project} />

      <ProblemSection project={project} />

      <PainPointsSection project={project} />

      <InterviewsSection project={project} />

      <CompetitiveSection project={project} />

      <GoalsSection project={project} />

      <WireframesSection project={project} />

      <BeforeAfterSection project={project} />

      <KeyFeaturesSection project={project} />

      <GallerySection project={project} />

      <ReviewsSection project={project} />

      <ConclusionSection project={project} />

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Hero
   --------------------------------------------------------------------------- */

function CaseStudyHero({ project }: { project: CaseStudy }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const Icon = project.cover.icon;

  return (
    <section ref={ref} data-hero className="relative bg-[#0B1735] overflow-hidden pt-36 md:pt-44 pb-32">
      <HeroBackdrop />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center gap-2 mb-8"
        >
          <Link
            to="/#projects"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-stone-200 hover:bg-white/15 transition-colors"
          >
            <ArrowLeft size={12} /> All work
          </Link>
          <span className="text-xs text-stone-400">Case study · {project.timeline}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
          className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.05]"
        >
          {project.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mt-5 text-lg text-stone-300 max-w-2xl leading-relaxed"
        >
          {project.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B1735] px-6 py-2.5 text-sm font-medium hover:bg-stone-100 transition-colors"
            >
              {l.label} <ExternalLink size={13} />
            </a>
          ))}
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-6 py-2.5 text-sm font-medium text-white hover:border-white/60 hover:bg-white/10 transition-colors"
          >
            Discuss this project
          </Link>
        </motion.div>
      </div>

      <motion.div
        style={{ y, willChange: 'transform' }}
        className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-10 mt-16"
      >
        <div
          className="rounded-[25px] pl-6 pt-6 sm:pl-12 sm:pt-12 overflow-hidden"
          style={frameCardStyle(project.cover.frames[0])}
        >
          <div className="relative">
            <div aria-hidden className="absolute inset-0 translate-y-3 translate-x-3 rounded-tl-[24px] bg-[#F5F5F5] border-t border-l border-[#222] z-0" />
            <div aria-hidden className="absolute inset-0 translate-y-1.5 translate-x-1.5 rounded-tl-[24px] bg-[#FAFAFA] border-t border-l border-[#222] z-10" />

            <div className="relative z-20 bg-white rounded-tl-[24px] border-t border-l border-[#222] w-full aspect-[16/9] overflow-hidden">
              <MediaFrame
                media={project.cover.media}
                fallbackIcon={Icon}
                fallbackBg="#FFFFFF"
                className="absolute inset-0 w-full h-full"
              />

              <div
                className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"
                aria-hidden
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/35 to-transparent pointer-events-none"
                aria-hidden
              />

              <div
                className="absolute top-5 left-5 right-5 flex items-center justify-between"
                aria-hidden
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/70" />
                </div>
                <div className="flex items-center gap-2">
                  {project.cover.badges.map((b, i) => (
                    <span key={b} className={`text-[10px] uppercase tracking-[0.15em] font-medium px-2 py-1 rounded-full backdrop-blur-md border ${
                      i === 0
                        ? 'text-pink-700 bg-pink-50/90 border-pink-100'
                        : i === 1
                        ? 'text-emerald-700 bg-emerald-50/90 border-emerald-100'
                        : 'text-yellow-700 bg-yellow-50/90 border-yellow-100'
                    }`}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-5 left-5 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-900/90 text-white text-[11px] font-medium px-2.5 py-1 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Built
                </span>
                <span className="text-[11px] text-white/90 font-medium drop-shadow-sm">
                  {project.timeline}
                </span>
              </div>
              <div className="absolute bottom-5 right-5">
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm"
                  style={{ backgroundColor: `${project.cover.frames[2]}E6`, color: '#1C1E26' }}
                >
                  {project.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function HeroBackdrop() {
  return (
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
            strokeOpacity={[0.18, 0.22, 0.28][i]}
            strokeWidth="1.25"
            strokeDasharray="4 8"
            fill="none"
          />
        ))}
      </g>
      <path
        d="M 1100 540 C 900 620, 700 620, 500 560 C 360 520, 220 460, 80 420"
        stroke="#B5CDEF"
        strokeOpacity={0.3}
        strokeWidth="1.5"
        strokeDasharray="3 9"
        fill="none"
      />
      <circle cx={880} cy={260} r={18} stroke="#B5CDEF" strokeWidth="1.25" fill="none" opacity={0.5} />
      <circle cx={880} cy={260} r={5} fill="#B5CDEF" opacity={0.7} />
      <circle cx={130} cy={480} r={14} stroke="#B5CDEF" strokeWidth="1.25" fill="none" opacity={0.5} />
      <circle cx={130} cy={480} r={4} fill="#B5CDEF" opacity={0.7} />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   About · Role · Timeline · Skills (sidebar row)
   --------------------------------------------------------------------------- */

function AboutRoleStrip({ project }: { project: CaseStudy }) {
  return (
    <section className="relative bg-[#FDFBF7] py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-[1.4fr_1fr] gap-12"
        >
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4B83C4] mb-4">
              {project.about.heading}
            </div>
            <p className="text-[17px] md:text-[19px] text-[#1C1E26] leading-[1.55] max-w-xl">
              {project.about.body}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 content-start">
            <MetaCard label="Role"     value={project.role} />
            <MetaCard label="Timeline" value={project.timeline} />
            <div className="col-span-2 rounded-2xl border border-stone-200/50 bg-white p-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-3">
                Skills
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[11px] text-stone-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-stone-200/50 bg-white p-5">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-1.5">
        {label}
      </div>
      <div className="text-sm font-medium text-[#1C1E26] leading-snug">{value}</div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Section wrapper + header (reused across sections)
   --------------------------------------------------------------------------- */

function SectionHeader({
  eyebrow, title, body,
}: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="max-w-3xl mb-12 md:mb-14">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4B83C4] mb-4"
      >
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-3xl md:text-[40px] font-semibold tracking-tight text-[#1C1E26] leading-[1.1]"
      >
        {title}
      </motion.h2>
      {body && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-5 text-[15px] text-stone-600 leading-relaxed"
        >
          {body}
        </motion.p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Problem
   --------------------------------------------------------------------------- */

function ProblemSection({ project }: { project: CaseStudy }) {
  return (
    <section className="relative bg-[#F5EDE3] py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <SectionHeader eyebrow={project.problem.eyebrow} title={project.problem.title} />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-[17px] text-[#1C1E26] leading-[1.6] max-w-3xl"
        >
          {project.problem.body}
        </motion.p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Reviews
   --------------------------------------------------------------------------- */

function ReviewsSection({ project }: { project: CaseStudy }) {
  return (
    <section className="relative bg-[#F5EDE3] py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <SectionHeader
          eyebrow={project.reviews.eyebrow}
          title={project.reviews.title}
          body={project.reviews.intro}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.reviews.items.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-stone-200/50 bg-white p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      className={j < r.stars ? 'text-amber-400 fill-amber-400' : 'text-stone-300'}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-stone-400">{r.date}</span>
              </div>
              <p className="text-[14.5px] text-[#1C1E26] leading-relaxed">&ldquo;{r.body}&rdquo;</p>
              <div className="mt-4 pt-4 border-t border-stone-200/60 text-xs text-stone-500">
                {r.author}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Interviews
   --------------------------------------------------------------------------- */

function InterviewsSection({ project }: { project: CaseStudy }) {
  return (
    <section className="relative bg-[#FDFBF7] py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <SectionHeader
          eyebrow={project.interviews.eyebrow}
          title={project.interviews.title}
          body={project.interviews.intro}
        />

        <div className="grid md:grid-cols-[1.4fr_1fr] gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.interviews.insights.map((ins, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-stone-200/50 bg-[#FAF5EE] p-5"
              >
                <Quote size={16} className="text-[#4B83C4] mb-3" />
                <p className="text-[15px] text-[#1C1E26] leading-relaxed">&ldquo;{ins.quote}&rdquo;</p>
                <div className="mt-4 pt-3 border-t border-stone-200/60 text-xs text-stone-500">
                  {ins.role}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl border border-stone-200/50 bg-white p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex w-9 h-9 items-center justify-center rounded-xl bg-[#1C1E26] text-white">
                <UsersIcon size={15} />
              </span>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">At a glance</div>
                <div className="text-sm font-semibold text-[#1C1E26]">By the numbers</div>
              </div>
            </div>
            <ul className="space-y-4">
              {project.interviews.surveyStats.map((s, i) => (
                <li key={i} className="flex items-baseline gap-3">
                  <span className="text-2xl font-semibold text-[#1C1E26] tracking-tight shrink-0 min-w-[60px]">
                    {s.value}
                  </span>
                  <span className="text-sm text-stone-600 leading-relaxed">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Gallery (demo video + in-context shots)
   --------------------------------------------------------------------------- */

function GallerySection({ project }: { project: CaseStudy }) {
  const items = project.gallery;
  if (!items || items.length === 0) return null;

  const [hero, ...rest] = items;
  const heroFrame = project.cover.frames[0];
  const sideFrames = [project.cover.frames[1], project.cover.frames[2]];

  return (
    <section className="relative bg-[#FDFBF7] py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="In context"
          title="The product, in motion"
          body="A walkthrough video plus two in-context shots of the moments that mattered most during the build."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 rounded-[25px] pl-5 pt-5 overflow-hidden"
            style={frameCardStyle(heroFrame)}
          >
            <div
              className={`rounded-tl-[24px] border-t border-l border-[#222] overflow-hidden relative ${
                hero.kind === 'video' ? 'bg-black' : 'bg-white'
              }`}
            >
              <MediaFrame
                media={hero}
                className="aspect-[16/10]"
                fallbackIcon={project.cover.icon}
                fallbackBg={hero.kind === 'video' ? '#000000' : '#FAF5EE'}
              />
              {hero.kind === 'video' && (
                <span
                  className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-stone-900/80 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1"
                  aria-hidden
                >
                  <Play size={10} fill="currentColor" /> Demo
                </span>
              )}
            </div>
          </motion.div>

          <div className="grid grid-rows-2 gap-4">
            {rest.slice(0, 2).map((m, i) => (
              <motion.div
                key={m.src}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: 0.08 + i * 0.06 }}
                className="rounded-[25px] pl-4 pt-4 overflow-hidden"
                style={frameCardStyle(sideFrames[i] ?? heroFrame)}
              >
                <div className="bg-white rounded-tl-[24px] border-t border-l border-[#222] overflow-hidden">
                  <MediaFrame
                    media={m}
                    className="aspect-[4/3]"
                    fallbackIcon={project.cover.icon}
                    fallbackBg="#FAF5EE"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Pain Points
   --------------------------------------------------------------------------- */

function PainPointsSection({ project }: { project: CaseStudy }) {
  return (
    <section className="relative bg-[#FDFBF7] py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <SectionHeader eyebrow={project.painPoints.eyebrow} title={project.painPoints.title} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.painPoints.items.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-[25px] pl-5 pt-5 overflow-hidden"
              style={frameCardStyle(p.frame)}
            >
              <div className="bg-white rounded-tl-[24px] border-t border-l border-[#222] p-6 flex flex-col h-full">
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-stone-50 border border-stone-200/60 text-[#1C1E26]">
                  <p.icon size={17} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-[#1C1E26] tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[13.5px] text-stone-600 leading-relaxed">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Reference patterns + SWOT
   --------------------------------------------------------------------------- */

function CompetitiveSection({ project }: { project: CaseStudy }) {
  const swot = project.competitive.swot;
  const blocks = [
    { title: 'Strengths',     items: swot.strengths,     frame: '#C4D7D1', label: 'text-emerald-700' },
    { title: 'Weaknesses',    items: swot.weaknesses,    frame: '#EBBAC7', label: 'text-pink-700' },
    { title: 'Opportunities', items: swot.opportunities, frame: '#B5CDEF', label: 'text-[#4B83C4]' },
    { title: 'Threats',       items: swot.threats,       frame: '#FEF3C7', label: 'text-yellow-700' },
  ];

  return (
    <section className="relative bg-[#F5EDE3] py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <SectionHeader
          eyebrow={project.competitive.eyebrow}
          title={project.competitive.title}
          body={project.competitive.intro}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blocks.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-[25px] pl-5 pt-5 overflow-hidden"
              style={frameCardStyle(b.frame)}
            >
              <div className="bg-white rounded-tl-[24px] border-t border-l border-[#222] p-6 h-full">
                <div className={`text-[11px] font-semibold uppercase tracking-[0.2em] mb-4 ${b.label}`}>
                  {b.title}
                </div>
                <ul className="space-y-2.5">
                  {b.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-[13.5px] text-stone-700">
                      <span className="mt-0.5 inline-flex w-4 h-4 shrink-0 items-center justify-center rounded-full bg-[#1C1E26] text-white">
                        <Check size={9} strokeWidth={3} />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Goals (How Might We)
   --------------------------------------------------------------------------- */

function GoalsSection({ project }: { project: CaseStudy }) {
  return (
    <section className="relative bg-[#FDFBF7] py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <SectionHeader eyebrow={project.goals.eyebrow} title={project.goals.title} />
        <div className="grid gap-4">
          {project.goals.items.map((g, i) => (
            <motion.article
              key={g.index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-stone-200/50 bg-white p-6 md:p-7 flex items-start gap-5"
            >
              <span className="inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-full bg-[#0B1735] text-white text-sm font-semibold">
                {g.index}
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-[#1C1E26]">{g.title}</h3>
                <p className="mt-2 text-[14.5px] text-stone-600 leading-relaxed">{g.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Wireframes
   --------------------------------------------------------------------------- */

function WireframesSection({ project }: { project: CaseStudy }) {
  return (
    <section className="relative bg-[#F5EDE3] py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <SectionHeader
          eyebrow={project.wireframes.eyebrow}
          title={project.wireframes.title}
          body={project.wireframes.body}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.wireframes.sketches.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="relative rounded-2xl border border-stone-200/60 bg-white overflow-hidden"
            >
              <div className="aspect-[16/9] relative bg-[#FAF5EE]">
                {s.media ? (
                  <MediaFrame
                    media={s.media}
                    fallbackIcon={project.cover.icon}
                    className="absolute inset-0"
                    fallbackBg="#FAF5EE"
                  />
                ) : (
                  <svg
                    viewBox="0 0 400 225"
                    className="absolute inset-0 w-full h-full"
                    aria-hidden
                  >
                    <rect x={20} y={20} width={120} height={8} rx={2} fill="#D1D5DB" />
                    <rect x={20} y={38} width={80} height={6} rx={2} fill="#E5E7EB" />
                    <rect x={20} y={60} width={360} height={90} rx={6} fill="none" stroke="#D1D5DB" strokeDasharray="4 4" />
                    <circle cx={50} cy={90} r={10} fill="#E5E7EB" />
                    <rect x={70} y={84} width={70} height={6} rx={2} fill="#E5E7EB" />
                    <rect x={70} y={96} width={120} height={4} rx={2} fill="#EEF2F7" />
                    <rect x={20} y={170} width={90} height={22} rx={11} fill="#1C1E26" />
                    <rect x={120} y={170} width={90} height={22} rx={11} fill="none" stroke="#D1D5DB" />
                  </svg>
                )}
                <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-500 border border-stone-200">
                  Sketch {i + 1}
                </span>
              </div>
              <div className="p-4 text-sm text-[#1C1E26] leading-snug">{s.caption}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Before / After
   --------------------------------------------------------------------------- */

function BeforeAfterSection({ project }: { project: CaseStudy }) {
  const both = [project.beforeAfter.before, project.beforeAfter.after];
  return (
    <section className="relative bg-[#FDFBF7] py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <SectionHeader
          eyebrow={project.beforeAfter.eyebrow}
          title={project.beforeAfter.title}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {both.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-[25px] pl-6 pt-6 sm:pl-8 sm:pt-8 overflow-hidden"
              style={frameCardStyle(b.frame)}
            >
              <div className="bg-white rounded-tl-[24px] border-t border-l border-[#222] overflow-hidden">
                <MediaFrame
                  media={b.media}
                  fallbackIcon={project.cover.icon}
                  className="aspect-[16/10]"
                  fallbackBg="#FAF5EE"
                />
                <div className="p-6 md:p-7">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-50 border border-stone-200 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-500">
                    {b.label}
                  </span>
                  <h3 className="mt-4 text-xl md:text-2xl font-semibold tracking-tight text-[#1C1E26] leading-tight">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] text-stone-600 leading-relaxed">{b.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Key Features
   --------------------------------------------------------------------------- */

function KeyFeaturesSection({ project }: { project: CaseStudy }) {
  return (
    <section className="relative bg-[#F5EDE3] py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <SectionHeader
          eyebrow={project.keyFeatures.eyebrow}
          title={project.keyFeatures.title}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.keyFeatures.items.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-[25px] pl-5 pt-5 overflow-hidden"
              style={frameCardStyle(f.frame)}
            >
              <div className="bg-white rounded-tl-[24px] border-t border-l border-[#222] overflow-hidden h-full flex flex-col">
                <MediaFrame
                  media={f.media}
                  fallbackIcon={f.icon}
                  className="aspect-[16/10]"
                  fallbackBg="#FAF5EE"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-stone-50 border border-stone-200/60 text-[#1C1E26]">
                    <f.icon size={17} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-[#1C1E26] tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-[13.5px] text-stone-600 leading-relaxed">{f.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Conclusion
   --------------------------------------------------------------------------- */

function ConclusionSection({ project }: { project: CaseStudy }) {
  return (
    <section className="relative bg-[#FDFBF7] py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <SectionHeader
          eyebrow={project.conclusion.eyebrow}
          title={project.conclusion.title}
          body={project.conclusion.body}
        />

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-6">
          <div className="grid gap-4">
            {project.conclusion.takeaways.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-stone-200/50 bg-white p-6"
              >
                <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-[#0B1735] text-white">
                  <Sparkles size={13} />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-[#1C1E26]">{t.title}</h3>
                <p className="mt-1.5 text-[14px] text-stone-600 leading-relaxed">{t.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl border border-stone-200/50 bg-[#FAF5EE] p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500 mb-4">
              Opportunities for iteration
            </div>
            <ul className="space-y-3">
              {project.conclusion.nextSteps.map((n, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex items-start gap-3 text-[14px] text-[#1C1E26] leading-relaxed"
                >
                  <span className="mt-0.5 inline-flex w-5 h-5 shrink-0 items-center justify-center rounded-full bg-[#1C1E26] text-white">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {n}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Prev / Next project navigation
   --------------------------------------------------------------------------- */

function PrevNextNav({ prev, next }: { prev?: CaseStudy; next?: CaseStudy }) {
  return (
    <section className="relative bg-[#FDFBF7] pb-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-12 border-t border-stone-200">
          {prev && (
            <Link
              to={`/work/${prev.slug}`}
              className="group rounded-2xl border border-stone-200/60 bg-white p-6 flex items-center gap-5 hover:border-stone-300 transition-colors"
            >
              <span className="inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-full border border-stone-200 text-stone-500 group-hover:text-[#1C1E26] group-hover:border-stone-400 transition-colors">
                <ArrowLeft size={16} />
              </span>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">Previous project</div>
                <div className="text-lg font-semibold tracking-tight text-[#1C1E26] mt-0.5">{prev.name}</div>
                <div className="text-xs text-stone-500 mt-0.5 line-clamp-1">{prev.tagline}</div>
              </div>
            </Link>
          )}

          {next && (
            <Link
              to={`/work/${next.slug}`}
              className="group rounded-2xl border border-stone-200/60 bg-white p-6 flex items-center gap-5 hover:border-stone-300 transition-colors md:text-right md:justify-end md:flex-row-reverse"
            >
              <span className="inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-full border border-stone-200 text-stone-500 group-hover:text-[#1C1E26] group-hover:border-stone-400 transition-colors">
                <ArrowRight size={16} />
              </span>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">Next project</div>
                <div className="text-lg font-semibold tracking-tight text-[#1C1E26] mt-0.5">{next.name}</div>
                <div className="text-xs text-stone-500 mt-0.5 line-clamp-1">{next.tagline}</div>
              </div>
            </Link>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-3xl bg-[#FAF5EE] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4B83C4] mb-2">
              Let&apos;s work together
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1C1E26] max-w-lg leading-[1.1]">
              got a project that needs this kind of thinking?
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:ryanlyncee29@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-[#1C1E26] text-white px-6 py-2.5 text-sm font-medium hover:bg-stone-800 transition-colors"
            >
              Email me <ArrowUpRight size={13} />
            </a>
            <Link
              to="/#projects"
              className="rounded-full border border-stone-300 bg-transparent px-6 py-2.5 text-sm font-medium text-stone-800 hover:border-stone-400 hover:bg-white transition-colors"
            >
              See all work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
