import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-60 bg-[#F8F9FA]/95 dark:bg-[#111]/95 backdrop-blur-xl flex flex-col"
        >
          <div className="flex justify-between items-center p-6 border-b border-black/5 dark:border-white/5">
            <span className="font-bold text-xl tracking-tighter text-zinc-900 dark:text-white font-display">
              RYAN<span className="text-zinc-400">_</span>
            </span>
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center cursor-pointer justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 gap-8 p-6">
            {MENU_ITEMS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={onClose}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="group flex items-center gap-4 text-4xl font-display font-bold text-zinc-900 dark:text-white uppercase tracking-tight"
              >
                {item.label}
                <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" size={24} />
              </motion.a>
            ))}
          </div>

          <div className="p-6 text-center">
             <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
               Sys_Admin: RYAN // Mobile_View
             </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};