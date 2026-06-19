import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, GraduationCap, MapPin, BriefcaseBusiness } from 'lucide-react';

export function AskCard() {
  return (
    <section className="relative bg-[#FDFBF7] w-full py-24 -mt-1 z-10" id="snapshot">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-blue-100 rounded-3xl p-6 md:p-12 shadow-[inset_0_2px_8px_rgba(37,99,235,0.18),inset_0_8px_28px_rgba(0,0,0,0.1)]"
        >
          <div className="relative bg-white rounded-2xl border border-stone-200/50 p-8 md:p-12">
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-[#1C1E26] text-white">
                <Sparkles size={14} />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                Snapshot
              </span>
            </div>

            <h2 className="text-3xl md:text-[40px] font-semibold tracking-tight text-[#1C1E26] leading-[1.1]">
              building thoughtfully, writing clearly, and asking the right
              <span className="text-[#4B83C4]"> product questions</span> before anyone reaches for the keyboard.
            </h2>

            <p className="mt-6 text-[15px] text-stone-600 leading-relaxed max-w-2xl">
              applying to product management and software engineering internships.
              comfortable owning the problem statement, the spec, and the first commit.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InfoTile icon={<GraduationCap size={14} />} label="Education" value="FIU · Computer Engineering · 3.84 GPA" />
              <InfoTile icon={<MapPin size={14} />} label="Based in" value="Miami, FL · EST · open to relocation" />
              <InfoTile icon={<BriefcaseBusiness size={14} />} label="Open to" value="PM internships · SWE internships · coffee" />
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="mailto:ryanlyncee29@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-[#1C1E26] text-white px-7 py-3 text-sm font-medium hover:bg-stone-800 transition-colors"
              >
                Email me <ArrowUpRight size={14} />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-stone-300 bg-transparent px-7 py-3 text-sm font-medium text-stone-800 hover:border-stone-400 hover:bg-white transition-colors"
              >
                View resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-stone-200/70 p-4">
      <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
        {icon} {label}
      </div>
      <div className="mt-1.5 text-sm font-medium text-[#1C1E26] leading-snug">{value}</div>
    </div>
  );
}
