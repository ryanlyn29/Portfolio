import { motion } from 'framer-motion';
import { Github, FolderGit2, GitCommitHorizontal, Users, Quote, Database, Sparkles, GraduationCap } from 'lucide-react';

type Tile =
  | {
      kind: 'stat';
      label: string;
      value: string;
      sub: string;
      icon: React.ReactNode;
      accent: string;
    }
  | {
      kind: 'quote';
      quote: string;
      author: string;
      role: string;
    };

const TILES: Tile[] = [
  {
    kind: 'stat',
    label: 'Years coding',
    value: '5+',
    sub: 'first commit at 15, haven&apos;t stopped since.',
    icon: <GitCommitHorizontal size={15} />,
    accent: 'bg-yellow-100 text-yellow-700',
  },
  {
    kind: 'stat',
    label: 'Data analyzed',
    value: '47k+',
    sub: 'production job runs across 77 Databricks workflows as a data science intern at Miami-Dade County.',
    icon: <Database size={15} />,
    accent: 'bg-violet-50 text-violet-700',
  },
  {
    kind: 'stat',
    label: 'Projects built',
    value: '6',
    sub: 'realtime &middot; ai &middot; edge &middot; health.',
    icon: <FolderGit2 size={15} />,
    accent: 'bg-pink-100 text-pink-700',
  },
  {
    kind: 'stat',
    label: 'GPA',
    value: '3.84',
    sub: 'dean&rsquo;s list, computer engineering @ FIU.',
    icon: <GraduationCap size={15} />,
    accent: 'bg-emerald-50 text-emerald-700',
  },
  {
    kind: 'stat',
    label: 'Public repos',
    value: '10+',
    sub: 'some polished, some learning in public.',
    icon: <Github size={15} />,
    accent: 'bg-violet-50 text-violet-700',
  },
  {
    kind: 'stat',
    label: 'AI fellowships',
    value: '2x',
    sub: 'selected for Break Through Tech AI &amp; Handshake&rsquo;s AI Fellowship.',
    icon: <Sparkles size={15} />,
    accent: 'bg-pink-100 text-pink-700',
  },
  {
    kind: 'stat',
    label: 'Teams worked with',
    value: '4',
    sub: 'init build, sharkbyte, clinix, solo.',
    icon: <Users size={15} />,
    accent: 'bg-yellow-100 text-yellow-700',
  },
];

const PLACEMENT = [
  'md:col-start-1 md:row-start-1',
  'md:col-start-2 md:col-span-2 md:row-start-1',
  'md:col-start-1 md:row-start-2',
  'md:col-start-2 md:row-start-2',
  'md:col-start-3 md:row-start-2',
  'md:col-start-1 md:col-span-2 md:row-start-3',
  'md:col-start-3 md:row-start-3',
];

export function TestimonialsGrid() {
  return (
    <section className="relative bg-[#FDFBF7] w-full py-24 -mt-1 z-10">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4B83C4] mb-4"
          >
            By the numbers
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-4xl md:text-[44px] font-semibold tracking-tight text-[#1C1E26] leading-[1.1]"
          >
            the receipts &mdash; a quick snapshot by the numbers.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[minmax(180px,auto)]">
          {TILES.map((t, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={`${PLACEMENT[i]} ${
                t.kind === 'stat'
                  ? 'bg-white border border-stone-200/50'
                  : 'bg-[#FAF5EE] border border-stone-200/40'
              } rounded-2xl p-6 md:p-7 flex flex-col justify-between`}
            >
              {t.kind === 'stat' ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex w-9 h-9 items-center justify-center rounded-xl bg-stone-50 border border-stone-200/60 text-[#1C1E26]">
                      {t.icon}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${t.accent}`}>
                      {t.label}
                    </span>
                  </div>
                  <div className="mt-6">
                    <div className="text-5xl md:text-6xl font-semibold tracking-tight text-[#1C1E26] leading-none">
                      {t.value}
                    </div>
                    <p
                      className="mt-3 text-[13.5px] text-stone-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: t.sub }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-[#1C1E26] text-white">
                    <Quote size={14} />
                  </span>
                  <div className="mt-5">
                    <p
                      className="text-lg md:text-xl text-[#1C1E26] leading-[1.35] font-medium tracking-tight"
                      dangerouslySetInnerHTML={{ __html: `&ldquo;${t.quote}&rdquo;` }}
                    />
                    <div className="mt-5 text-xs text-stone-500">
                      <span className="font-medium text-stone-700">{t.author}</span>
                      <span> · {t.role}</span>
                    </div>
                  </div>
                </>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
