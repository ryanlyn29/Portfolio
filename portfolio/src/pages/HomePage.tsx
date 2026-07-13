import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  BrainCircuit,
  Code2,
  Compass,
  Database,
  FlaskConical,
  Globe,
  Mail,
  MapPin,
  Radar,
  Server,
} from 'lucide-react';
import { MediaFrame } from '../components/marketing/MediaFrame';
import { CircuitHero } from '../components/marketing/CircuitHero';
import {
  ConnectedSectionsWire,
  ProjectsWire,
  WireBackdrop,
} from '../components/marketing/WireBackdrops';
import { CASE_STUDIES } from '../data/caseStudies';
import type { CaseStudy } from '../data/caseStudies';

const SNAPSHOT_META = [
  {
    label: 'Education',
    value: 'FIU · Computer Engineering',
    detail: '3.84 GPA',
  },
  {
    label: 'Based in',
    value: 'Miami, FL · EST',
    detail: 'Open to relocation',
  },
  {
    label: 'Open to',
    value: 'PM & SWE internships',
    detail: 'Coffee chats welcome',
  },
] as const;

const TOOLS = [
  'React',
  'TypeScript',
  'Next.js',
  'Tailwind',
  'Node',
  'Python',
  'Figma',
  'PostgreSQL',
  'Socket.io',
  'Redis',
  'Java',
  'Spring Boot',
  'Docker',
  'FastAPI',
  'Cloudflare',
  'Gemini',
] as const;

const PROJECT_CATEGORIES: Record<string, string> = {
  whiteflow: 'Realtime collaboration',
  agentguard: 'AI security',
  clinix: 'Health tech',
  edgescope: 'Edge computing',
  navora: 'Simulation systems',
  weave: 'Full-stack messaging',
};

const PROJECT_INDEX_ACCENTS: Record<
  string,
  {
    accent: string;
    iconBg: string;
    iconText: string;
  }
> = {
  weave: {
    accent: '#8944AB',
    iconBg: 'bg-[#F4ECF8]',
    iconText: 'text-[#8944AB]',
  },
  edgescope: {
    accent: '#0071E3',
    iconBg: 'bg-[#EAF4FF]',
    iconText: 'text-[#0071E3]',
  },
  navora: {
    accent: '#248A3D',
    iconBg: 'bg-[#EAF7EE]',
    iconText: 'text-[#248A3D]',
  },
};

const EXPERIENCE = [
  {
    role: 'Data Science Intern',
    organization: 'Miami-Dade County',
    period: 'May 2026',
    body: 'Analyzed 47k+ Databricks job runs in Python & Spark SQL, built risk-scoring models, and delivered a Streamlit observability dashboard to county leadership.',
  },
  {
    role: 'AI/ML Fellow',
    organization: 'Break Through Tech',
    period: 'Mar 2026 — Present',
    body: 'Selected for the 2026–27 national AI fellowship building industry-ready ML skills with mentorship from leaders at top tech companies.',
  },
  {
    role: 'AI Fellow',
    organization: 'Handshake',
    period: 'Nov 2025 — Present',
    body: 'Run RLHF on multimodal LLM & vision models — evaluating 200+ prompts to cut hallucinations and improve alignment for production deployment pipelines.',
  },
] as const;

const ACTIVITIES = [
  {
    role: 'Director of Communications',
    organization: 'INIT FIU',
    period: 'Jan 2026 — Present',
    body: 'Lead communications for ShellHacks — Florida\'s largest hackathon (1,400+ participants) — and the chapter\'s programs and workshops.',
  },
  {
    role: 'Member',
    organization: 'ColorStack',
    period: 'Aug 2025 — Present',
    body: 'Part of a national community of Black & Latinx computer science students growing into tech careers.',
  },
] as const;

const CERTIFICATIONS = [
  { name: 'Leadership Agility', issuer: 'FIU' },
  { name: 'Web Development Fundamentals', issuer: 'IBM' },
  { name: 'Autodesk Certified User: Fusion', issuer: 'Certiport' },
  { name: 'Microsoft Office Specialist: PowerPoint', issuer: 'Certiport' },
] as const;

const CAPABILITIES = [
  {
    index: 'Core',
    title: 'Product thinking',
    icon: Compass,
    body: 'Sharp problem statements, crisp one-pagers, and trade-offs explained out loud.',
    tools: 'Problem framing · Scope control · UX writing',
  },
  {
    index: 'Daily',
    title: 'Frontend craft',
    icon: Code2,
    body: 'React + TS with a taste for small, honest animations and a11y defaults.',
    tools: 'React · TypeScript · Tailwind · Figma',
  },
  {
    index: 'APIs',
    title: 'Backend systems',
    icon: Server,
    body: 'Node, Express, FastAPI, and Spring Boot — REST, queues, and auth that hold up.',
    tools: 'Node · FastAPI · Spring Boot · REST',
  },
  {
    index: 'Built',
    title: 'Realtime systems',
    icon: Radar,
    body: 'Socket.io, Redis, and the undo/redo contracts that keep clients honest.',
    tools: 'Socket.io · Redis · State reconciliation',
  },
  {
    index: 'Data',
    title: 'Databases',
    icon: Database,
    body: 'Postgres, Redis, and Prisma — schema design, caching, and honest migrations.',
    tools: 'PostgreSQL · Redis · Prisma',
  },
  {
    index: 'Python',
    title: 'Data & ML',
    icon: FlaskConical,
    body: 'Python, Spark SQL, and risk-scoring models that turn raw pipeline logs into decisions.',
    tools: 'Python · Spark SQL · Streamlit',
  },
  {
    index: 'LLM',
    title: 'Applied AI',
    icon: BrainCircuit,
    body: 'Gemini and LLM integration, prompt hardening, and structured outputs you can trust.',
    tools: 'Gemini · RLHF · Prompt engineering',
  },
  {
    index: 'Edge',
    title: 'Edge & cloud',
    icon: Globe,
    body: 'Cloudflare Workers, Workers AI, and KV — serverless logic that runs at the edge.',
    tools: 'Cloudflare · Workers AI · KV',
  },
  {
    index: 'Viz',
    title: 'Data viz',
    icon: BarChart3,
    body: 'Streamlit and Plotly dashboards that make pipeline health readable for leadership.',
    tools: 'Streamlit · Plotly · Recharts',
  },
] as const;

const FOCUS =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-action';

function AccentText({ children }: { children: ReactNode }) {
  return <span className="heading-accent">{children}</span>;
}

const FEATURE_PRIMARY_BTN = 'project-feature-btn-primary';
const FEATURE_SECONDARY_BTN = 'project-feature-btn-secondary';

function ProjectMedia({
  project,
  compact = false,
  feature = false,
}: {
  project: CaseStudy;
  compact?: boolean;
  feature?: boolean;
}) {
  const frameClass = feature
    ? 'project-feature-media-frame'
    : 'rounded-2xl border border-line bg-surface p-2 sm:p-3';

  return (
    <div className={frameClass}>
      <MediaFrame
        media={project.cover.media}
        fallbackIcon={project.cover.icon}
        className={`${compact ? 'aspect-[16/11]' : 'aspect-[16/10]'} ${
          feature ? 'project-feature-media-inner' : 'rounded-xl bg-surface-strong'
        }`}
      />
    </div>
  );
}

function ProjectMeta({ project, feature = false }: { project: CaseStudy; feature?: boolean }) {
  const dividerClass = feature ? 'project-feature-divider' : 'border-line';
  const labelClass = feature ? 'project-feature-label' : 'text-muted';
  const valueClass = feature ? 'project-feature-value' : 'text-ink';

  return (
    <dl className={`grid grid-cols-2 gap-4 border-t pt-5 text-sm ${dividerClass}`}>
      <div>
        <dt className={`eyebrow ${labelClass}`}>Role</dt>
        <dd className={`mt-1.5 font-medium ${valueClass}`}>{project.role}</dd>
      </div>
      <div>
        <dt className={`eyebrow ${labelClass}`}>Timeline</dt>
        <dd className={`mt-1.5 font-medium ${valueClass}`}>{project.timeline}</dd>
      </div>
    </dl>
  );
}

function ProjectTags({
  project,
  count = 4,
  feature = false,
}: {
  project: CaseStudy;
  count?: number;
  feature?: boolean;
}) {
  const tagClass = feature ? 'project-feature-tag' : 'pill-tag';

  return (
    <ul className="flex flex-wrap gap-2" aria-label={`${project.name} skills`}>
      {project.skills.slice(0, count).map((skill) => (
        <li key={skill} className={tagClass}>
          {skill}
        </li>
      ))}
    </ul>
  );
}

function LeadProjectCard({ project }: { project: CaseStudy }) {
  const github = project.links.find((link) => link.label === 'GitHub');
  const category = PROJECT_CATEGORIES[project.slug];

  return (
    <article
      className="surface-card project-feature-card overflow-hidden"
      style={{ '--feature-accent': project.themeAccent } as CSSProperties}
    >
      <div className="grid gap-8 p-5 sm:p-6 lg:grid-cols-2 lg:items-center lg:gap-10 lg:p-8">
        <ProjectMedia project={project} feature />

        <div className="flex flex-col">
          <span className="project-feature-eyebrow">
            {category ?? 'Featured'}
          </span>
          <h3 className="project-feature-heading mt-4 text-3xl sm:text-4xl">
            {project.name}
          </h3>
          <p className="project-feature-body mt-3 text-base leading-relaxed">{project.tagline}</p>

          <div className="mt-6">
            <ProjectMeta project={project} feature />
          </div>
          <div className="mt-5">
            <ProjectTags project={project} feature />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={`/work/${project.slug}`} className={`${FEATURE_PRIMARY_BTN} ${FOCUS}`}>
              View project <ArrowRight size={16} aria-hidden />
            </Link>
            {github && (
              <a
                href={github.href}
                target="_blank"
                rel="noreferrer"
                className={`${FEATURE_SECONDARY_BTN} ${FOCUS}`}
              >
                GitHub <ArrowUpRight size={15} aria-hidden />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function FeaturedProjectCard({ project, index }: { project: CaseStudy; index: number }) {
  const github = project.links.find((link) => link.label === 'GitHub');
  const category = PROJECT_CATEGORIES[project.slug];

  return (
    <article
      className="surface-card project-feature-card flex h-full flex-col p-5 sm:p-6"
      style={{ '--feature-accent': project.themeAccent } as CSSProperties}
    >
      <ProjectMedia project={project} compact feature />

      <div className="flex flex-1 flex-col pt-6">
        <span className="project-feature-eyebrow">
          {category ?? `Project ${String(index + 1).padStart(2, '0')}`}
        </span>
        <h3 className="project-feature-heading mt-3 text-2xl sm:text-3xl">
          {project.name}
        </h3>
        <p className="project-feature-body mt-2 text-sm leading-relaxed">{project.tagline}</p>

        <div className="mt-5">
          <ProjectMeta project={project} feature />
        </div>
        <div className="mt-4">
          <ProjectTags project={project} count={3} feature />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to={`/work/${project.slug}`} className={`${FEATURE_PRIMARY_BTN} ${FOCUS}`}>
            View project <ArrowRight size={16} aria-hidden />
          </Link>
          {github && (
            <a
              href={github.href}
              target="_blank"
              rel="noreferrer"
              className={`${FEATURE_SECONDARY_BTN} ${FOCUS}`}
            >
              GitHub <ArrowUpRight size={15} aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectIndexCard({ project, index }: { project: CaseStudy; index: number }) {
  const Icon = project.cover.icon;
  const category = PROJECT_CATEGORIES[project.slug];
  const accent = PROJECT_INDEX_ACCENTS[project.slug];

  return (
    <article
      className="project-index-card flex h-full flex-col p-4 sm:p-5"
      style={
        accent
          ? ({ '--project-accent': accent.accent } as React.CSSProperties)
          : undefined
      }
    >
      <div className="flex items-start gap-3.5">
        <span
          className={`app-store-icon inline-flex h-14 w-14 shrink-0 items-center justify-center ${
            accent ? `${accent.iconBg} ${accent.iconText}` : 'bg-[#F2F2F7] text-ink'
          }`}
        >
          <Icon size={24} aria-hidden />
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[17px] font-semibold tracking-[-0.02em] text-[#1D1D1F]">
            {project.name}
          </h3>
          <p
            className={`mt-0.5 text-[12px] font-medium tracking-[-0.01em] ${
              accent ? '' : 'text-[#6E6E73]'
            }`}
            style={accent ? { color: accent.accent } : undefined}
          >
            {category ?? `Project ${String(index + 1).padStart(2, '0')}`}
          </p>
          <p className="mt-2 line-clamp-2 text-[13px] leading-snug text-[#6E6E73]">
            {project.tagline}
          </p>
        </div>
      </div>

      <p className="mt-3 text-[12px] text-[#86868B]">
        {project.role} · {project.timeline}
      </p>

      <Link to={`/work/${project.slug}`} className={`btn-ghost mt-4 w-fit ${FOCUS}`}>
        Explore <ArrowUpRight size={14} aria-hidden />
      </Link>
    </article>
  );
}

export function HomePage() {
  const aboutSkillsRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLElement>(null);
  const [skillsWireAnchor, setSkillsWireAnchor] = useState<{
    offsetTop: number;
    height: number;
  } | null>(null);
  const featuredProjects = CASE_STUDIES.slice(0, 3);
  const additionalProjects = CASE_STUDIES.slice(3);
  const leadProject = featuredProjects[0];

  useLayoutEffect(() => {
    const wrapper = aboutSkillsRef.current;
    const skillsSection = skillsSectionRef.current;
    if (!wrapper || !skillsSection) return;

    const updateSkillsWireAnchor = () => {
      setSkillsWireAnchor({
        offsetTop: skillsSection.offsetTop,
        height: wrapper.offsetHeight,
      });
    };

    updateSkillsWireAnchor();

    const observer = new ResizeObserver(updateSkillsWireAnchor);
    observer.observe(wrapper);
    observer.observe(skillsSection);
    return () => observer.disconnect();
  }, []);

  const metrics = [
    { value: '5+', label: 'Years coding — first commit at 15' },
    { value: '47k+', label: 'Production job runs analyzed at Miami-Dade County' },
    { value: String(CASE_STUDIES.length), label: 'Projects built — realtime, AI, edge, health' },
    { value: '3.84', label: "Dean's list, computer engineering @ FIU" },
    { value: '10+', label: 'Public repos — some polished, some learning in public' },
    { value: '2x', label: 'AI fellowships — Break Through Tech & Handshake' },
    { value: '4', label: 'Teams worked with — init build, Sharkbyte, Clinix, solo' },
  ];

  return (
    <div className="overflow-x-clip bg-paper text-ink">
      <CircuitHero />

      {/* Snapshot */}
      <section
        id="snapshot"
        aria-labelledby="proof-heading"
        className="site-container relative isolate bg-paper py-10 md:py-14"
      >
        <header className="relative z-10 mb-8 max-w-2xl">
          <p className="eyebrow-accent">Snapshot</p>
          <h2 id="proof-heading" className="display-heading mt-3 text-2xl sm:text-3xl">
            <AccentText>Product thinking</AccentText> before the first commit.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Applying to product management and software engineering internships. Comfortable
            owning the problem statement, the spec, and the first commit.
          </p>
        </header>

        <div className="relative isolate">
          <WireBackdrop
            variant="snapshot"
            contained
            height={180}
            className="top-1/2 -translate-y-1/2"
          />
          <dl className="surface-card surface-card-accent-ring relative z-10 grid overflow-hidden md:grid-cols-3 md:divide-x md:divide-line">
            {SNAPSHOT_META.map((point, index) => (
              <div
                key={point.label}
                className={`${index > 0 ? 'border-t border-line md:border-t-0' : ''} px-6 py-7 md:px-8`}
              >
                <dt className="eyebrow-accent">{point.label}</dt>
                <dd className="mt-3">
                  <span className="display-heading block text-xl sm:text-2xl">{point.value}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted">{point.detail}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative z-10 mt-6 flex flex-wrap gap-3">
          <a href="mailto:ryanlyncee29@gmail.com" className={`btn-primary ${FOCUS}`}>
            <Mail size={16} aria-hidden /> Email me
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className={`btn-secondary ${FOCUS}`}
          >
            View resume <ArrowUpRight size={15} aria-hidden />
          </a>
        </div>
      </section>

      {/* Tools */}
      <section id="stack" aria-labelledby="tools-heading" className="site-container pb-14 md:pb-20">
        <p className="eyebrow-accent">Tools I reach for</p>
        <h2 id="tools-heading" className="sr-only">
          Technical stack
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {TOOLS.map((tool) => (
            <li key={tool} className="pill-tag">
              {tool}
            </li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="bg-canvas-soft py-16 md:py-24"
      >
        <div className="site-container">
        <header className="grid gap-6 md:grid-cols-[minmax(0,0.32fr)_1fr] md:gap-12">
          <p className="eyebrow-accent">Selected projects</p>
          <div>
            <h2 id="projects-heading" className="display-heading max-w-2xl text-3xl sm:text-4xl md:text-5xl">
              Work I can walk you through.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              The why, what I owned, and the trade-offs I&apos;d make differently now.
            </p>
          </div>
        </header>

        <div className="relative isolate mt-10 md:mt-14">
          <ProjectsWire />

          <div className="relative z-10 space-y-6">
            {leadProject && <LeadProjectCard project={leadProject} />}

            <div className="grid gap-6 lg:grid-cols-2">
              {featuredProjects.slice(1).map((project, index) => (
                <FeaturedProjectCard key={project.slug} project={project} index={index + 1} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <div className="flex flex-col justify-between gap-4 pt-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6E6E73]">
                More experiments
              </p>
              <h3 className="display-heading mt-2 text-2xl sm:text-3xl">
                <AccentText>More builds</AccentText> worth a look.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Technical builds across edge computing, simulation systems, and full-stack messaging.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {additionalProjects.map((project, index) => (
              <ProjectIndexCard key={project.slug} project={project} index={index + 3} />
            ))}
          </div>
        </div>
        </div>
      </section>

      <div ref={aboutSkillsRef} className="relative overflow-visible bg-paper">
        <ConnectedSectionsWire />

        {/* About */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="relative z-[3] px-4 pt-16 pb-16 sm:px-6 md:pt-24 md:pb-20 lg:px-8"
        >
        <div className="relative z-10 mx-auto max-w-[1200px] lg:rounded-3xl lg:border lg:border-line lg:bg-paper lg:px-14 lg:py-20 lg:ring-8 lg:ring-[#B5CDEF]">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
              <p className="eyebrow-accent">About</p>
              <h2
                id="about-heading"
                className="display-heading mt-4 max-w-lg text-3xl sm:text-4xl md:text-5xl"
              >
                About me and where I&apos;ve been.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
                I&apos;m Ryan, a computer engineering student at FIU working across software,
                data systems, and applied AI. Here&apos;s where I&apos;ve been putting that to work.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#projects" className={`btn-secondary ${FOCUS}`}>
                  See selected work
                </a>
                <a href="#contact" className={`btn-primary px-4 py-2 text-sm ${FOCUS}`}>
                  Let&apos;s talk <ArrowRight size={14} aria-hidden />
                </a>
              </div>

            </div>

            <div
              aria-label="Experience"
              className="rounded-3xl border border-line bg-paper p-6 sm:p-8 lg:rounded-none lg:border-y-0 lg:border-r-0 lg:border-l lg:bg-transparent lg:p-0 lg:pl-12"
            >
              <p className="eyebrow text-muted">Experience</p>
              {EXPERIENCE.map((item) => (
                <article
                  key={`${item.organization}-${item.role}`}
                  className="border-b border-line py-6 first:pt-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="font-semibold text-ink">{item.role}</h3>
                      <p className="mt-0.5 text-sm font-medium text-muted">{item.organization}</p>
                    </div>
                    <p className="eyebrow shrink-0 pt-0.5">{item.period}</p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-16 lg:border-t lg:border-line lg:pt-12">
            <div
              aria-label="Activities"
              className="rounded-3xl border border-line bg-paper p-6 sm:p-8 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
            >
              <p className="eyebrow text-muted">Activities</p>
              {ACTIVITIES.map((item) => (
                <article
                  key={`${item.organization}-${item.role}`}
                  className="border-b border-line py-6 first:pt-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="font-semibold text-ink">{item.role}</h3>
                      <p className="mt-0.5 text-sm font-medium text-muted">{item.organization}</p>
                    </div>
                    <p className="eyebrow shrink-0 pt-0.5">{item.period}</p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                </article>
              ))}
            </div>

            <div
              aria-labelledby="certifications-heading"
              className="rounded-3xl border border-line bg-paper p-6 sm:p-8 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
            >
              <p id="certifications-heading" className="eyebrow-accent">
                Certifications
              </p>
              <p className="mt-2 text-sm text-muted">Licenses & certifications.</p>
              <ul className="mt-6 space-y-3">
                {CERTIFICATIONS.map((cert) => (
                  <li key={cert.name} className="list-row justify-between gap-4">
                    <span className="inline-flex items-center gap-3">
                      <Award size={16} className="shrink-0 text-muted" aria-hidden />
                      <span>{cert.name}</span>
                    </span>
                    <span className="text-xs text-muted">{cert.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        </section>

        {/* Capabilities */}
        <section
          ref={skillsSectionRef}
          id="skills"
          aria-labelledby="capabilities-heading"
          className="relative isolate z-[2] py-16 md:py-24"
        >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 bg-canvas-soft"
        />
        <div className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden min-[1360px]:block">
          {skillsWireAnchor && (
            <ConnectedSectionsWire
              anchorHeight={skillsWireAnchor.height}
              offsetTop={skillsWireAnchor.offsetTop}
            />
          )}
        </div>
        <div className="site-container relative z-[2]">
        <header className="grid gap-6 md:grid-cols-[minmax(0,0.32fr)_1fr] md:gap-12">
          <p className="eyebrow-accent">What I bring</p>
          <div>
            <h2
              id="capabilities-heading"
              className="display-heading max-w-2xl text-3xl sm:text-4xl md:text-5xl"
            >
              <AccentText>Skills I&apos;ve practiced</AccentText> enough to ship.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              Product judgment backed by technical range — from realtime systems to applied AI.
            </p>
          </div>
        </header>

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 xl:grid-cols-3">
          {CAPABILITIES.map((capability) => {
            const Icon = capability.icon;
            return (
              <article
                key={capability.title}
                className="surface-card flex h-full flex-col p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-strong text-ink">
                    <Icon size={20} aria-hidden />
                  </span>
                  <span className="eyebrow text-muted">{capability.index}</span>
                </div>

                <h3 className="display-heading mt-6 text-xl">{capability.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{capability.body}</p>
                <p className="mt-5 border-t border-line pt-4 text-xs font-medium text-muted">
                  {capability.tools}
                </p>
              </article>
            );
          })}
        </div>
        </div>
        </section>
      </div>

      {/* Metrics */}
      <section aria-labelledby="metrics-heading" className="site-container py-16 md:py-24">
        <div className="surface-card p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow-accent">By the numbers</p>
              <h2 id="metrics-heading" className="display-heading mt-2 text-2xl sm:text-3xl">
                Quick snapshot.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Numbers that back up the work above.
            </p>
          </div>

          <dl className="mt-2 grid grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`px-4 py-7 sm:px-6 ${index % 2 === 1 ? 'border-l border-line' : ''} ${index > 1 ? 'border-t border-line lg:border-t-0' : ''} ${index > 0 ? 'lg:border-l lg:border-line' : ''} ${index >= 4 ? 'lg:border-t lg:border-line' : ''}`}
              >
                <dt className="display-heading text-3xl sm:text-4xl">{metric.value}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{metric.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="relative isolate bg-paper px-4 pt-12 pb-12 sm:px-6 md:pt-20 md:pb-20 lg:px-8"
      >
        <WireBackdrop
          variant="contact"
          height={300}
          className="top-1/2 -translate-y-1/2"
        />
        <div className="relative z-10 mx-auto max-w-[1200px] lg:rounded-3xl lg:border lg:border-line lg:bg-paper lg:px-14 lg:py-16 lg:ring-8 lg:ring-[#B5CDEF]">
          <div className="grid gap-10 rounded-3xl border border-line bg-paper p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
            <div>
              <p className="eyebrow-accent">Let&apos;s work together</p>
              <h2
                id="contact-heading"
                className="display-heading mt-4 max-w-2xl text-3xl sm:text-4xl md:text-5xl"
              >
                <AccentText>Say hi</AccentText> if this fits your team.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                Currently applying to PM and SWE internships. Happy to chat about realtime systems,
                design tokens, or why undo/redo is secretly the hardest feature in any app.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <a href="mailto:ryanlyncee29@gmail.com" className={`btn-primary ${FOCUS}`}>
                <Mail size={16} aria-hidden /> Email me
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className={`btn-secondary ${FOCUS}`}
              >
                Resume (PDF) <ArrowUpRight size={16} aria-hidden />
              </a>
            </div>
          </div>

          <dl className="mt-5 grid gap-4 rounded-3xl border border-line bg-paper p-6 sm:p-8 lg:mt-10 lg:grid-cols-3 lg:rounded-none lg:border-x-0 lg:border-b-0 lg:border-t lg:bg-transparent lg:p-0 lg:pt-10">
            <div className="surface-panel p-5">
              <dt className="eyebrow text-muted">Availability</dt>
              <dd className="mt-2">
                <span className="pill-tag text-ink">Open</span>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Looking for 2027 opportunities — PM and SWE internships.
                </p>
              </dd>
            </div>
            <div className="surface-panel p-5">
              <dt className="eyebrow text-muted">Location</dt>
              <dd className="mt-2">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                  <MapPin size={14} aria-hidden /> Miami, FL · EST
                </span>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Open to relocation (NYC / SF / Seattle). Hybrid preferred, comfortable remote.
                </p>
              </dd>
            </div>
            <div className="surface-panel p-5">
              <dt className="eyebrow text-muted">Preferred stack</dt>
              <dd className="mt-2">
                <span className="text-sm font-medium text-ink">React · TypeScript · Node · PG</span>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Also happy in Python, FastAPI, Docker, and whatever ships the product fastest.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
