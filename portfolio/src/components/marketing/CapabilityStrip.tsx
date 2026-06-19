import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Atom, FileCode2, Triangle, Wind, Server, Terminal, Figma, Database,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const STACK: Array<{ label: string; icon: LucideIcon }> = [
  { label: 'React',      icon: Atom },
  { label: 'TypeScript', icon: FileCode2 },
  { label: 'Next.js',    icon: Triangle },
  { label: 'Tailwind',   icon: Wind },
  { label: 'Node',       icon: Server },
  { label: 'Python',     icon: Terminal },
  { label: 'Figma',      icon: Figma },
  { label: 'PostgreSQL', icon: Database },
];

export function CapabilityStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={ref} className="relative bg-[#FDFBF7] w-full py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
            <span className="w-6 h-px bg-stone-300" />
            tools i reach for
          </span>
        </motion.div>

        <motion.ul
          style={{ y, willChange: 'transform' }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"
        >
          {STACK.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-colors"
            >
              <span className="inline-flex w-9 h-9 items-center justify-center rounded-xl border border-stone-200 bg-white text-[#1C1E26]">
                <s.icon size={17} />
              </span>
              <span className="text-sm font-medium text-[#1C1E26]">{s.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
