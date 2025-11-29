import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { MobileMenu } from './MobileMenu';

export const Navbar: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.nav 
        variants={{
          visible: { y: 0 },
          hidden: { y: -100 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-6"
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-8 hidden xl:flex flex-col gap-1 pointer-events-none">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-zinc-900/20 dark:bg-white/20 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em]">SYS.NAV.01</span>
           </div>
           <div className="w-24 h-[px] bg-zinc-400/20 dark:bg-zinc-600/20" />
           <span className="text-[8px] font-mono text-zinc-300 dark:text-zinc-700 uppercase tracking-widest pl-4">X: 1024.45</span>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-8 hidden xl:flex flex-col gap-1 items-end pointer-events-none">
           <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em]">GRID.ACTIVE</span>
              <div className="w-2 h-2 border border-zinc-900/20 dark:border-white/20 rounded-full" />
           </div>
           <div className="w-24 h-[px] bg-zinc-400/20 dark:bg-zinc-600/20" />
           <span className="text-[8px] font-mono text-zinc-300 dark:text-zinc-700 uppercase tracking-widest pr-4">Y: 0042.88</span>
        </div>

        <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-300 dark:border-white/10 rounded-2xl px-6 py-3 flex items-center gap-8 pointer-events-auto shadow-xl">
          <a href="#" className="font-bold text-xl tracking-tighter text-zinc-900 dark:text-white font-display">RYAN<span className="text-zinc-400">_</span></a>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono">
            {['Projects', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace('works', 'projects')}`}
                className="hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-zinc-900 cursor-pointer dark:text-white font-mono uppercase text-xs font-bold"
          >
            [MENU]
          </button>
        </div>
      </motion.nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};