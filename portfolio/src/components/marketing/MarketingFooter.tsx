import { Github, Linkedin, Mail, Twitter, ArrowUpRight } from 'lucide-react';

const COLUMNS: Array<{ heading: string; links: Array<{ label: string; href: string; external?: boolean }> }> = [
  {
    heading: 'Work',
    links: [
      { label: 'Whiteflow',  href: 'https://github.com/ryanlyn29/WhiteFlow', external: true },
      { label: 'AgentGuard', href: 'https://github.com/4shivv/Sharkbyte_2025', external: true },
      { label: 'Clinix',     href: 'https://github.com/HitMonrillo/Clinix', external: true },
      { label: 'EdgeScope',  href: 'https://github.com/ryanlyn29/cf_ai_edgescope', external: true },
      { label: 'Navora',     href: 'https://github.com/ryanlyn29/Navora', external: true },
      { label: 'Weave',      href: 'https://github.com/ryanlyn29/Weave', external: true },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'Bio',         href: '#about' },
      { label: 'Snapshot',    href: '#snapshot' },
      { label: 'Stack',       href: '#skills' },
      { label: 'What I care about', href: '#about' },
    ],
  },
  {
    heading: 'Resume',
    links: [
      { label: 'PDF',         href: '/resume.pdf', external: true },
      { label: 'LinkedIn',    href: 'https://www.linkedin.com/in/ryanlyncee', external: true },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'Email',       href: 'mailto:ryanlyncee29@gmail.com' },
      { label: 'Say hi',      href: '#contact' },
      { label: 'Schedule',    href: 'mailto:ryanlyncee29@gmail.com?subject=Coffee%20chat' },
    ],
  },
  {
    heading: 'Social',
    links: [
      { label: 'GitHub',      href: 'https://github.com/ryanlyn29', external: true },
      { label: 'LinkedIn',    href: 'https://www.linkedin.com/in/ryanlyncee', external: true },
      { label: 'Twitter',     href: 'https://twitter.com', external: true },
    ],
  },
];

export function MarketingFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#14161C] border-t border-white/10 text-stone-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2 md:col-span-1">
            <a href="#top" className="inline-flex items-center gap-2 text-white font-semibold tracking-tight text-sm">
              <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/95">
                <span className="h-4 w-1 rounded-full -rotate-12 block bg-[#1C1E26]" />
              </span>
              ryan lyncee
            </a>
            <p className="mt-4 text-xs text-stone-500 leading-relaxed max-w-[220px]">
              product-minded builder, currently applying to PM roles. based in miami, open to coffee.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a href="https://github.com/ryanlyn29" target="_blank" rel="noreferrer" aria-label="GitHub" className="inline-flex w-8 h-8 items-center justify-center rounded-full border border-white/10 text-stone-400 hover:text-white hover:border-white/25 transition-colors">
                <Github size={14} />
              </a>
              <a href="https://www.linkedin.com/in/ryanlyncee" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex w-8 h-8 items-center justify-center rounded-full border border-white/10 text-stone-400 hover:text-white hover:border-white/25 transition-colors">
                <Linkedin size={14} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="inline-flex w-8 h-8 items-center justify-center rounded-full border border-white/10 text-stone-400 hover:text-white hover:border-white/25 transition-colors">
                <Twitter size={14} />
              </a>
              <a href="mailto:ryanlyncee29@gmail.com" aria-label="Email" className="inline-flex w-8 h-8 items-center justify-center rounded-full border border-white/10 text-stone-400 hover:text-white hover:border-white/25 transition-colors">
                <Mail size={14} />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <div className="text-xs font-semibold text-white mb-4">{col.heading}</div>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.external ? '_blank' : undefined}
                      rel={l.external ? 'noreferrer' : undefined}
                      className="text-xs text-stone-500 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      {l.label}
                      {l.external && <ArrowUpRight size={10} />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-stone-500">
          <span>© {year} Ryan Lyncee. Designed &amp; built in react + tailwind.</span>
          <span className="inline-flex items-center gap-2">
            made with care
            <span className="inline-block w-1 h-1 rounded-full bg-stone-600" />
            miami, fl
          </span>
        </div>
      </div>
    </footer>
  );
}
