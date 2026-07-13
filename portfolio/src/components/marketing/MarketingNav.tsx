import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';

const NAV_LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Work' },
  { href: '#contact', label: 'Contact' },
] as const;

const FOCUS =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-action';

const CTA_BASE =
  'inline-flex h-9 min-h-0 shrink-0 items-center justify-center gap-2 rounded-2xl px-4 py-2 text-xs font-semibold lg:text-sm';

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<(typeof NAV_LINKS)[number]['href']>('#top');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const closeMenu = () => {
      if (mediaQuery.matches) {
        setMenuOpen(false);
      }
    };

    mediaQuery.addEventListener('change', closeMenu);
    return () => mediaQuery.removeEventListener('change', closeMenu);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return;

    const frame = window.requestAnimationFrame(() => {
      document.querySelector(location.hash)?.scrollIntoView({ block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const hash = location.hash as (typeof NAV_LINKS)[number]['href'];
    if (NAV_LINKS.some((link) => link.href === hash)) {
      setActiveHref(hash);
    }
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = NAV_LINKS.map((link) => {
      const id = link.href.slice(1);
      return { href: link.href, element: document.getElementById(id) };
    }).filter(
      (section): section is {
        href: (typeof NAV_LINKS)[number]['href'];
        element: HTMLElement;
      } => Boolean(section.element),
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible[0]) return;

        const match = sections.find((section) => section.element === visible[0].target);
        if (match) {
          setActiveHref(match.href);
        }
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.12, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section.element));
    return () => observer.disconnect();
  }, [location.pathname]);

  const resolveHref = (href: string) =>
    href.startsWith('#') && location.pathname !== '/' ? `/${href}` : href;

  const navLinkClass = (isActive: boolean) =>
    scrolled
      ? `inline-flex h-9 items-center rounded-xl px-3 text-xs font-normal tracking-[-0.01em] transition-[color,opacity] duration-300 ease-out lg:px-3.5 lg:text-sm ${
          isActive ? 'text-white' : 'text-white/80 hover:text-white'
        } ${FOCUS}`
      : `inline-flex h-11 items-center rounded-xl px-3.5 text-xs font-normal tracking-[-0.01em] transition-[color,opacity] duration-300 ease-out lg:text-sm ${
          isActive ? 'text-ink' : 'text-[#1d1d1f]/72 hover:text-ink'
        } focus-visible:outline-offset-1`;

  const mobileNavLinkClass = (isActive: boolean) =>
    scrolled
      ? `block rounded-xl px-3 py-2.5 text-sm font-medium tracking-[-0.01em] transition-colors duration-200 ${
          isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'
        } ${FOCUS}`
      : `block rounded-xl px-3 py-2.5 text-sm font-medium tracking-[-0.01em] transition-colors duration-200 ${
          isActive ? 'bg-surface text-ink' : 'text-[#1d1d1f]/72 hover:bg-surface hover:text-ink'
        } ${FOCUS}`;

  const githubClass = scrolled
    ? `hidden h-9 items-center rounded-xl px-3 text-xs font-normal tracking-[-0.01em] text-white/80 transition-[color,opacity] duration-300 ease-out hover:text-white lg:inline-flex lg:text-sm ${FOCUS}`
    : `hidden h-11 items-center rounded-xl px-3.5 text-xs font-normal tracking-[-0.01em] text-[#1d1d1f]/72 transition-[color,opacity] duration-300 ease-out hover:text-ink lg:inline-flex lg:text-sm ${FOCUS}`;

  const ctaClass = scrolled
    ? `${CTA_BASE} bg-white text-ink tracking-[-0.01em] transition-[background-color,opacity] duration-300 ease-out hover:bg-white/90 ${FOCUS}`
    : `${CTA_BASE} bg-ink text-paper transition-colors duration-200 hover:bg-[#2a2a2a] ${FOCUS}`;

  const shellClassName = scrolled
    ? 'mt-4 max-w-[860px] rounded-3xl border-white/[0.08] bg-[#111111]/92 p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.38)] backdrop-blur-2xl backdrop-saturate-150'
    : menuOpen
      ? 'mt-3 max-w-[1760px] rounded-3xl border border-line bg-paper/95 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:px-5'
      : 'mt-0 h-[76px] max-w-[1760px] rounded-none border-transparent bg-transparent px-5 sm:h-[88px] sm:px-6 lg:px-8';

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5">
      <div
        className={`relative mx-auto flex flex-col border transition-[max-width,margin-top,padding,background-color,border-color,box-shadow,backdrop-filter,border-radius,gap] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${shellClassName}`}
      >
        <div className="flex h-full w-full items-center justify-between">
          <Link
            to="/"
            aria-label="Ryan Lyncee — home"
            className={`relative z-10 inline-flex shrink-0 items-center justify-center rounded-2xl ${
              scrolled ? 'h-9 w-9' : 'h-11 w-11'
            } ${FOCUS}`}
            onClick={() => setMenuOpen(false)}
          >
            <BrandMark size={scrolled ? 24 : 34} />
          </Link>

          <nav
            className="pointer-events-none absolute inset-x-2.5 inset-y-0 hidden items-center justify-center md:flex"
            aria-label="Primary"
          >
            <div className="pointer-events-auto flex items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const isActive = activeHref === link.href;

                return (
                  <a
                    key={link.href}
                    href={resolveHref(link.href)}
                    className={navLinkClass(isActive)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </nav>

          <div className="relative z-10 flex shrink-0 items-center justify-end gap-1.5">
            <button
              type="button"
              className={`inline-flex h-9 w-9 items-center justify-center rounded-xl md:hidden ${
                scrolled ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-surface'
              } ${FOCUS}`}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>

            <a
              href="https://github.com/ryanlyn29"
              target="_blank"
              rel="noreferrer"
              className={githubClass}
            >
              GitHub
            </a>
            <a href={location.pathname === '/' ? '#contact' : '/#contact'} className={ctaClass}>
              Get in touch
            </a>
          </div>
        </div>

        {menuOpen && (
          <nav
            id="mobile-nav-menu"
            aria-label="Mobile primary"
            className={`md:hidden ${scrolled ? 'border-t border-white/10 pt-2' : 'border-t border-line pt-2'}`}
          >
            <ul className="flex flex-col gap-1 pb-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeHref === link.href;

                return (
                  <li key={link.href}>
                    <a
                      href={resolveHref(link.href)}
                      className={mobileNavLinkClass(isActive)}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li className={scrolled ? 'border-t border-white/10 pt-2' : 'border-t border-line pt-2'}>
                <a
                  href="https://github.com/ryanlyn29"
                  target="_blank"
                  rel="noreferrer"
                  className={mobileNavLinkClass(false)}
                  onClick={() => setMenuOpen(false)}
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
