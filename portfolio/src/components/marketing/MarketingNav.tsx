import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Github, Linkedin, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';

const TEXT_LINKS = [
  { to: '/#about',    label: 'About' },
  { to: '/#projects', label: 'Work' },
  { to: '/#contact',  label: 'Contact' },
];

export function MarketingNav() {
  const [pastHero, setPastHero] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const update = () => {
      if (!isHome) {
        setPastHero(true);
        return;
      }
      const hero = document.querySelector<HTMLElement>('[data-hero]');
      if (!hero) {
        setPastHero(window.scrollY > 72);
        return;
      }
      const rect = hero.getBoundingClientRect();
      setPastHero(rect.bottom <= 72);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [isHome, location.key]);

  const onDark = !pastHero && isHome;

  const iconButton = (dark: boolean) =>
    cn(
      'inline-flex w-9 h-9 items-center justify-center rounded-full border transition-colors',
      dark
        ? 'border-white/15 text-stone-200 hover:text-white hover:border-white/35 hover:bg-white/5'
        : 'border-stone-200 text-stone-600 hover:text-[#1C1E26] hover:border-stone-300 hover:bg-white'
    );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        pastHero
          ? 'bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200/60'
          : 'bg-[#0B1735] border-b border-transparent'
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 lg:px-10 py-3.5">
        <Link
          to="/"
          className={cn(
            'inline-flex items-center gap-2 text-sm font-semibold tracking-tight',
            onDark ? 'text-white' : 'text-[#1C1E26]'
          )}
        >
          <span
            className={cn(
              'relative inline-flex h-8 w-8 items-center justify-center rounded-lg',
              onDark ? 'bg-white/95' : 'bg-[#1C1E26]'
            )}
          >
            <span
              className={cn(
                'h-4 w-1 rounded-full -rotate-12 block',
                onDark ? 'bg-[#1C1E26]' : 'bg-white'
              )}
            />
          </span>
          <span className="inline-flex items-baseline gap-0.5">
            ryan lyncee
            <span className="opacity-60">~</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {!isHome && (
            <Link
              to="/"
              aria-label="Home"
              className={iconButton(onDark) + ' mr-1'}
            >
              <Home size={15} />
            </Link>
          )}
          {TEXT_LINKS.map((l) => (
            <a
              key={l.to}
              href={l.to}
              className={cn(
                'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                onDark
                  ? 'text-stone-200 hover:text-white hover:bg-white/5'
                  : 'text-stone-600 hover:text-[#1C1E26] hover:bg-stone-100'
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/ryanlyn29"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className={cn(iconButton(onDark), 'hidden sm:inline-flex')}
          >
            <Github size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/ryanlyncee"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className={cn(iconButton(onDark), 'hidden sm:inline-flex')}
          >
            <Linkedin size={15} />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            aria-label="Resume"
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              onDark
                ? 'border-white/30 text-white hover:border-white/60 hover:bg-white/10'
                : 'border-stone-300 text-stone-800 hover:border-stone-400 hover:bg-white'
            )}
          >
            <FileText size={13} /> Resume
          </a>
          <a
            href="mailto:ryanlyncee29@gmail.com"
            className={cn(
              'hidden md:inline-flex rounded-full px-5 py-2 text-sm font-medium transition-colors',
              onDark
                ? 'bg-white text-[#0B1735] hover:bg-stone-100'
                : 'bg-[#1C1E26] text-white hover:bg-stone-800'
            )}
          >
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}
