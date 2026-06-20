import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

interface CertItem {
  name: string;
  issuer: string;
}

const CERTIFICATIONS: CertItem[] = [
  { name: 'Leadership Agility', issuer: 'FIU' },
  { name: 'Web Development Fundamentals', issuer: 'IBM' },
  { name: 'Autodesk Certified User: Fusion', issuer: 'Certiport' },
  { name: 'Microsoft Office Specialist: PowerPoint', issuer: 'Certiport' },
];

const CERT_COLORS = ['#EBBAC7', '#C4D7D1', '#B5CDEF', '#FEF3C7'];

export function Certifications() {
  return (
    <section className="relative w-full pt-28 md:pt-32 pb-20 md:pb-24 -mt-1 z-10" style={{ backgroundColor: '#FDFBF7' }} id="certifications">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <div className="mb-10 md:mb-12 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4B83C4] mb-4"
          >
            Certifications
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-3xl md:text-[40px] font-semibold tracking-tight text-[#1C1E26] leading-[1.1]"
          >
            licenses &amp; certifications.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTIFICATIONS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl p-6 flex flex-col gap-5"
              style={{ backgroundColor: CERT_COLORS[i % CERT_COLORS.length] }}
            >
              <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-[#1C1E26] text-white">
                <Award size={19} />
              </span>
              <div>
                <div className="text-[15px] font-semibold text-[#1C1E26] leading-snug">{c.name}</div>
                <div className="mt-1.5 text-[13px] font-medium text-[#1C1E26]/70">{c.issuer}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
