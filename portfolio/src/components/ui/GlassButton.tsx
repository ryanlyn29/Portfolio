import React from 'react';
import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

interface GlassButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  className?: string;
}

export const GlassButton: React.FC<GlassButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "relative px-8 py-4 rounded-xl font-mono font-bold uppercase tracking-widest text-xs transition-all duration-200 flex items-center justify-center gap-2 overflow-hidden group active:translate-y-0.5";
  
  const variants = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-800 border border-transparent dark:bg-white dark:text-black dark:hover:bg-zinc-200",
    secondary: "bg-transparent text-zinc-900 dark:text-white border border-zinc-900/20 dark:border-white/20 hover:bg-zinc-900/5 dark:hover:bg-white/5",
    ghost: "bg-transparent text-zinc-500 dark:text-white/60 hover:text-zinc-900 dark:hover:text-white",
  };

  return (
    <motion.button 
      layout
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};