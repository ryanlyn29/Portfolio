import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Play,
  Quote,
  Sparkles,
  Star,
  Users as UsersIcon,
} from 'lucide-react';
import type { CaseStudy } from '../../data/caseStudies';
import { MediaFrame } from './MediaFrame';

const FOCUS =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-action';

interface CaseStudyPageProps {
  project: CaseStudy;
  prev?: CaseStudy;
  next?: CaseStudy;
}

export function CaseStudyPage({ project, prev, next }: CaseStudyPageProps) {
  return (
    <article
      className="case-study-page bg-paper text-ink"
      style={{ '--case-study-accent': project.themeAccent } as CSSProperties}
    >
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
    </article>
  );
}

const FEATURE_PRIMARY_BTN = 'project-feature-btn-primary';
const FEATURE_SECONDARY_BTN = 'project-feature-btn-secondary';

function ProjectMedia({
  project,
  feature = false,
}: {
  project: CaseStudy;
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
        bordered={!feature}
        className={`aspect-[16/10] ${
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
  feature = false,
}: {
  project: CaseStudy;
  feature?: boolean;
}) {
  const tagClass = feature ? 'project-feature-tag' : 'pill-tag';

  return (
    <ul className="flex flex-wrap gap-2" aria-label={`${project.name} skills`}>
      {project.skills.map((skill) => (
        <li key={skill} className={tagClass}>
          {skill}
        </li>
      ))}
    </ul>
  );
}

function CaseStudyHero({ project }: { project: CaseStudy }) {
  return (
    <section className="px-4 pb-8 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        <Link to="/#projects" className={`btn-ghost mb-8 w-fit ${FOCUS}`}>
          <ArrowLeft size={15} aria-hidden /> Back to projects
        </Link>

        <div
          className="surface-card project-feature-card overflow-hidden"
          style={{ '--feature-accent': project.themeAccent } as CSSProperties}
        >
          <div className="grid gap-8 p-5 sm:p-6 lg:grid-cols-2 lg:items-start lg:gap-10 lg:p-8">
            <ProjectMedia project={project} feature />

            <div className="flex flex-col">
              <span className="project-feature-eyebrow">
                Case study · {project.timeline}
              </span>

              <h1 className="project-feature-heading mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]">
                {project.name}
              </h1>

              <p className="project-feature-body mt-3 text-base leading-relaxed sm:text-lg">
                {project.tagline}
              </p>

              <div className="mt-6">
                <ProjectMeta project={project} feature />
              </div>

              <div className="mt-5">
                <ProjectTags project={project} feature />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#about" className={`${FEATURE_PRIMARY_BTN} ${FOCUS}`}>
                  Read case study <ArrowRight size={16} aria-hidden />
                </a>
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${FEATURE_SECONDARY_BTN} ${FOCUS}`}
                  >
                    {link.label} <ArrowUpRight size={15} aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mb-10 max-w-3xl md:mb-12">
      <p className="eyebrow-accent">{eyebrow}</p>
      <h2 className="display-heading mt-4 text-3xl sm:text-4xl">{title}</h2>
      {body && (
        <p className="mt-4 text-base leading-relaxed text-muted">{body}</p>
      )}
    </div>
  );
}

function AboutRoleStrip({ project }: { project: CaseStudy }) {
  return (
    <section id="about" className="site-container py-12 md:py-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
        <div>
          <p className="eyebrow-accent">{project.about.heading}</p>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {project.about.body}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 content-start sm:grid-cols-2">
          <MetaCard label="Role" value={project.role} />
          <MetaCard label="Timeline" value={project.timeline} />
          <div className="surface-card p-5 sm:col-span-2">
            <p className="eyebrow text-muted">Skills</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <li key={skill} className="pill-tag">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card p-5">
      <p className="eyebrow text-muted">{label}</p>
      <p className="mt-2 text-sm font-medium leading-snug text-ink">{value}</p>
    </div>
  );
}

function ProblemSection({ project }: { project: CaseStudy }) {
  return (
    <section className="site-container pb-12 md:pb-16">
      <div className="surface-panel p-6 sm:p-8 lg:p-10">
        <SectionHeader
          eyebrow={project.problem.eyebrow}
          title={project.problem.title}
        />
        <p className="max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
          {project.problem.body}
        </p>
      </div>
    </section>
  );
}

function PainPointsSection({ project }: { project: CaseStudy }) {
  return (
    <section className="site-container pb-12 md:pb-16">
      <SectionHeader
        eyebrow={project.painPoints.eyebrow}
        title={project.painPoints.title}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {project.painPoints.items.map((point) => (
          <article key={point.title} className="surface-card p-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-line bg-surface text-ink">
              <point.icon size={17} aria-hidden />
            </span>
            <h3 className="display-heading mt-4 text-lg">{point.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function InterviewsSection({ project }: { project: CaseStudy }) {
  return (
    <section className="site-container pb-12 md:pb-16">
      <SectionHeader
        eyebrow={project.interviews.eyebrow}
        title={project.interviews.title}
        body={project.interviews.intro}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="grid gap-4 sm:grid-cols-2">
          {project.interviews.insights.map((insight) => (
            <article key={insight.quote} className="surface-card p-5">
              <Quote size={16} className="text-accent" aria-hidden />
              <p className="mt-3 text-sm leading-relaxed text-ink">
                &ldquo;{insight.quote}&rdquo;
              </p>
              <p className="mt-4 border-t border-line pt-3 text-xs text-muted">
                {insight.role}
              </p>
            </article>
          ))}
        </div>

        <div className="surface-card p-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-paper">
              <UsersIcon size={16} aria-hidden />
            </span>
            <div>
              <p className="eyebrow text-muted">At a glance</p>
              <p className="text-sm font-semibold text-ink">By the numbers</p>
            </div>
          </div>
          <ul className="mt-6 space-y-4">
            {project.interviews.surveyStats.map((stat) => (
              <li key={stat.label} className="flex items-baseline gap-3">
                <span className="display-heading min-w-[60px] shrink-0 text-2xl">
                  {stat.value}
                </span>
                <span className="text-sm leading-relaxed text-muted">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CompetitiveSection({ project }: { project: CaseStudy }) {
  const swot = project.competitive.swot;
  const blocks = [
    { title: 'Strengths', items: swot.strengths },
    { title: 'Weaknesses', items: swot.weaknesses },
    { title: 'Opportunities', items: swot.opportunities },
    { title: 'Threats', items: swot.threats },
  ];

  return (
    <section className="site-container pb-12 md:pb-16">
      <div className="surface-panel p-6 sm:p-8 lg:p-10">
        <SectionHeader
          eyebrow={project.competitive.eyebrow}
          title={project.competitive.title}
          body={project.competitive.intro}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {blocks.map((block) => (
            <article key={block.title} className="surface-card p-6">
              <p className="eyebrow text-muted">{block.title}</p>
              <ul className="mt-4 space-y-3">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-ink"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
                      <Check size={11} strokeWidth={3} aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GoalsSection({ project }: { project: CaseStudy }) {
  return (
    <section className="site-container pb-12 md:pb-16">
      <SectionHeader
        eyebrow={project.goals.eyebrow}
        title={project.goals.title}
      />
      <div className="grid gap-4">
        {project.goals.items.map((goal) => (
          <article
            key={goal.index}
            className="surface-card flex items-start gap-5 p-6 md:p-7"
          >
            <span className="case-study-accent-fill inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
              {goal.index}
            </span>
            <div>
              <h3 className="display-heading text-lg md:text-xl">{goal.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{goal.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WireframesSection({ project }: { project: CaseStudy }) {
  return (
    <section className="site-container pb-12 md:pb-16">
      <div className="surface-panel p-6 sm:p-8 lg:p-10">
        <SectionHeader
          eyebrow={project.wireframes.eyebrow}
          title={project.wireframes.title}
          body={project.wireframes.body}
        />

        <div className="grid gap-4 md:grid-cols-2">
          {project.wireframes.sketches.map((sketch, index) => (
            <article
              key={sketch.caption}
              className="surface-card overflow-hidden"
            >
              <div className="relative aspect-[16/9] bg-surface-strong">
                {sketch.media ? (
                  <MediaFrame
                    media={sketch.media}
                    fallbackIcon={project.cover.icon}
                    className="absolute inset-0 border-0"
                    fallbackBg="var(--color-surface-strong)"
                  />
                ) : (
                  <svg
                    viewBox="0 0 400 225"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden
                  >
                    <rect x={20} y={20} width={120} height={8} rx={2} fill="#D1D5DB" />
                    <rect x={20} y={38} width={80} height={6} rx={2} fill="#E5E7EB" />
                    <rect
                      x={20}
                      y={60}
                      width={360}
                      height={90}
                      rx={6}
                      fill="none"
                      stroke="#D1D5DB"
                      strokeDasharray="4 4"
                    />
                    <circle cx={50} cy={90} r={10} fill="#E5E7EB" />
                    <rect x={70} y={84} width={70} height={6} rx={2} fill="#E5E7EB" />
                    <rect x={70} y={96} width={120} height={4} rx={2} fill="#EEF2F7" />
                    <rect x={20} y={170} width={90} height={22} rx={11} fill="#111111" />
                    <rect
                      x={120}
                      y={170}
                      width={90}
                      height={22}
                      rx={11}
                      fill="none"
                      stroke="#D1D5DB"
                    />
                  </svg>
                )}
                <span className="absolute left-3 top-3 z-10 pill-tag text-[10px] uppercase tracking-wider">
                  Sketch {index + 1}
                </span>
              </div>
              <p className="p-4 text-sm leading-snug text-ink">{sketch.caption}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection({ project }: { project: CaseStudy }) {
  const items = [project.beforeAfter.before, project.beforeAfter.after];

  return (
    <section className="site-container pb-12 md:pb-16">
      <SectionHeader
        eyebrow={project.beforeAfter.eyebrow}
        title={project.beforeAfter.title}
      />
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.label} className="surface-card overflow-hidden">
            <MediaFrame
              media={item.media}
              fallbackIcon={project.cover.icon}
              className="aspect-[16/10] border-0 border-b border-line"
              fallbackBg="var(--color-surface-strong)"
            />
            <div className="p-6 md:p-7">
              <span className="pill-tag text-[11px] uppercase tracking-wider">
                {item.label}
              </span>
              <h3 className="display-heading mt-4 text-xl md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function KeyFeaturesSection({ project }: { project: CaseStudy }) {
  return (
    <section className="site-container pb-12 md:pb-16">
      <div className="surface-panel p-6 sm:p-8 lg:p-10">
        <SectionHeader
          eyebrow={project.keyFeatures.eyebrow}
          title={project.keyFeatures.title}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.keyFeatures.items.map((feature) => (
            <article
              key={feature.title}
              className="surface-card flex h-full flex-col overflow-hidden"
            >
              <MediaFrame
                media={feature.media}
                fallbackIcon={feature.icon}
                className="aspect-[16/10] border-0 border-b border-line"
                fallbackBg="var(--color-surface-strong)"
              />
              <div className="flex flex-1 flex-col p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-line bg-surface text-ink">
                  <feature.icon size={17} aria-hidden />
                </span>
                <h3 className="display-heading mt-4 text-lg">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{feature.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ project }: { project: CaseStudy }) {
  const items = project.gallery;
  if (!items || items.length === 0) return null;

  const [hero, ...rest] = items;

  return (
    <section className="site-container pb-12 md:pb-16">
      <SectionHeader
        eyebrow="In context"
        title="The product, in motion"
        body="A walkthrough video plus in-context shots of the moments that mattered most during the build."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="relative lg:col-span-2">
          <MediaFrame
            media={hero}
            fallbackIcon={project.cover.icon}
            className={`rounded-3xl ${hero.kind === 'video' ? 'bg-ink' : 'bg-surface-strong'} aspect-[16/10]`}
            fallbackBg={hero.kind === 'video' ? '#111111' : 'var(--color-surface-strong)'}
          />
          {hero.kind === 'video' && (
            <span
              className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink"
              aria-hidden
            >
              <Play size={10} fill="currentColor" aria-hidden /> Demo
            </span>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
          {rest.slice(0, 2).map((item) => (
            <MediaFrame
              key={item.src}
              media={item}
              fallbackIcon={project.cover.icon}
              className="rounded-3xl aspect-[4/3] bg-surface-strong"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection({ project }: { project: CaseStudy }) {
  return (
    <section className="site-container pb-12 md:pb-16">
      <div className="surface-panel p-6 sm:p-8 lg:p-10">
        <SectionHeader
          eyebrow={project.reviews.eyebrow}
          title={project.reviews.title}
          body={project.reviews.intro}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {project.reviews.items.map((review) => (
            <article key={review.author} className="surface-card p-6">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={12}
                      className={
                        index < review.stars
                          ? 'fill-ink text-ink'
                          : 'text-line-strong'
                      }
                    />
                  ))}
                </div>
                <span className="text-[11px] text-muted">{review.date}</span>
              </div>
              <p className="text-sm leading-relaxed text-ink">
                &ldquo;{review.body}&rdquo;
              </p>
              <p className="mt-4 border-t border-line pt-4 text-xs text-muted">
                {review.author}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConclusionSection({ project }: { project: CaseStudy }) {
  return (
    <section className="site-container pb-16 md:pb-24">
      <SectionHeader
        eyebrow={project.conclusion.eyebrow}
        title={project.conclusion.title}
        body={project.conclusion.body}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="grid gap-4">
          {project.conclusion.takeaways.map((takeaway) => (
            <article key={takeaway.title} className="surface-card p-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper">
                <Sparkles size={13} aria-hidden />
              </span>
              <h3 className="display-heading mt-4 text-base">{takeaway.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {takeaway.body}
              </p>
            </article>
          ))}
        </div>

        <div className="surface-card p-6">
          <p className="eyebrow text-muted">Opportunities for iteration</p>
          <ul className="mt-4 space-y-3">
            {project.conclusion.nextSteps.map((step) => (
              <li
                key={step}
                className="flex items-start gap-3 text-sm leading-relaxed text-ink"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
                  <Check size={11} strokeWidth={3} aria-hidden />
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function PrevNextNav({ prev, next }: { prev?: CaseStudy; next?: CaseStudy }) {
  return (
    <section className="border-t border-line bg-surface px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-4 border-b border-line pb-10 md:grid-cols-2">
          {prev ? (
            <Link
              to={`/work/${prev.slug}`}
              className={`surface-card flex items-center gap-5 p-6 ${FOCUS}`}
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted">
                <ArrowLeft size={16} aria-hidden />
              </span>
              <div>
                <p className="eyebrow text-muted">Previous project</p>
                <p className="display-heading mt-1 text-lg">{prev.name}</p>
                <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                  {prev.tagline}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next && (
            <Link
              to={`/work/${next.slug}`}
              className={`surface-card flex items-center gap-5 p-6 md:flex-row-reverse md:text-right ${FOCUS}`}
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted">
                <ArrowRight size={16} aria-hidden />
              </span>
              <div>
                <p className="eyebrow text-muted">Next project</p>
                <p className="display-heading mt-1 text-lg">{next.name}</p>
                <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                  {next.tagline}
                </p>
              </div>
            </Link>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-6 rounded-[28px] border border-line bg-paper p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="eyebrow-accent">Let&apos;s work together</p>
            <h3 className="display-heading mt-3 max-w-lg text-2xl md:text-3xl">
              Got a project that needs this kind of thinking?
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:ryanlyncee29@gmail.com" className={`btn-primary ${FOCUS}`}>
              Email me <ArrowUpRight size={15} aria-hidden />
            </a>
            <Link to="/#projects" className={`btn-secondary ${FOCUS}`}>
              See all work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
