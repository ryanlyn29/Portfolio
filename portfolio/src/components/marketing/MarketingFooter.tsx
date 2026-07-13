import { Link } from 'react-router-dom';
import { CASE_STUDIES } from '../../data/caseStudies';
import { BrandMark } from './BrandMark';

export function MarketingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#111111] text-paper">
      <div className="site-container py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <BrandMark size={36} />
              <div>
                <p className="text-sm font-semibold text-paper">Ryan Lyncee</p>
                <p className="text-sm text-white/60">Computer Engineering · FIU · Miami</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
              I build software where product clarity and technical depth meet — from edge systems
              to full-stack prototypes.
            </p>
          </div>

          <div className="grid min-w-0 gap-8 sm:grid-cols-2">
            <div>
              <p className="eyebrow text-white/45">Work</p>
              <ul className="mt-4 space-y-2">
                {CASE_STUDIES.map((project) => (
                  <li key={project.slug}>
                    <Link
                      to={`/work/${project.slug}`}
                      className="text-sm text-white/60 transition-colors hover:text-paper"
                    >
                      {project.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-white/45">Connect</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.linkedin.com/in/ryanlyncee"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/60 transition-colors hover:text-paper"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/ryanlyn29"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/60 transition-colors hover:text-paper"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Ryan Lyncee</p>
          <p>Open to internship opportunities</p>
        </div>
      </div>
    </footer>
  );
}
