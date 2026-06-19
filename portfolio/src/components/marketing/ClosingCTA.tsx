import { motion } from 'framer-motion';
import { ArrowRight, Download, Clock, MapPin, Layers } from 'lucide-react';

export function ClosingCTA() {
  return (
    <section id="contact" className="relative bg-[#FDFBF7] w-full py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#FAF5EE] rounded-3xl p-10 md:p-16 grid md:grid-cols-2 gap-12 md:gap-16"
        >
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4B83C4] mb-4">
              Let&apos;s work together
            </div>
            <h2 className="text-4xl md:text-[48px] font-semibold tracking-tight text-[#1C1E26] leading-[1.05]">
              if this looks like the kind of work you&apos;d want on your team — say hi.
            </h2>
            <p className="mt-5 text-[15px] text-stone-600 leading-relaxed max-w-md">
              currently applying to PM and SWE internships. happy to chat about
              realtime systems, design tokens, or why undo/redo is secretly the hardest feature in any app.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="mailto:ryanlyncee29@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-[#1C1E26] text-white px-7 py-3 text-sm font-medium hover:bg-stone-800 transition-colors"
              >
                Email me <ArrowRight size={14} />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-transparent px-7 py-3 text-sm font-medium text-stone-800 hover:border-stone-400 hover:bg-white transition-colors"
              >
                <Download size={14} /> Resume (PDF)
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            <SideCard
              icon={<Clock size={15} />}
              label="Availability"
              title="Looking for 2027 opportunities"
              body="PM and SWE internships, plus opportunities for 2027."
              badge="open"
              badgeColor="bg-green-100 text-green-700"
            />
            <SideCard
              icon={<MapPin size={15} />}
              label="Location"
              title="Miami, FL · EST"
              body="open to relocation (NYC / SF / seattle), hybrid preferred, comfortable remote."
              badge="EST"
              badgeColor="bg-yellow-100 text-yellow-700"
            />
            <SideCard
              icon={<Layers size={15} />}
              label="Preferred stack"
              title="React · TypeScript · Node · PG"
              body="also happy in python, fastapi, docker, and whatever ships the product fastest."
              badge="TS + React"
              badgeColor="bg-pink-100 text-pink-700"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SideCard({
  icon, label, title, body, badge, badgeColor,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  body: string;
  badge: string;
  badgeColor: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/50 p-5 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
          {icon} {label}
        </span>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${badgeColor}`}>
          {badge}
        </span>
      </div>
      <div
        className="text-[15px] font-semibold text-[#1C1E26] tracking-tight"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p className="mt-1.5 text-[13.5px] text-stone-600 leading-relaxed">{body}</p>
    </div>
  );
}
