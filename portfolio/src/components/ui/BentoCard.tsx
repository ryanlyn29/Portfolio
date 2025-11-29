import React from 'react';
import { motion } from 'framer-motion';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number | string;
  rowSpan?: number | string; 
  delay?: number;
  onClick?: () => void;
  hideDefaultBackground?: boolean;
}

export const BentoCard: React.FC<BentoCardProps> = ({ 
  children, 
  className = '', 
  colSpan = '', 
  rowSpan = '', 
  delay = 0,
  onClick,
  hideDefaultBackground = false
}) => {
  const defaultStyles = "bg-zinc-200/50 dark:bg-zinc-900/50 border border-black/10 dark:border-white/10 hover:bg-zinc-300/50 dark:hover:bg-zinc-800/50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.6,
        ease: [0.2, 0.8, 0.2, 1], 
        delay: delay 
      }}
      whileHover={{ 
        y: -4,
        scale: 1.005,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      onClick={onClick}
      className={`
        ${hideDefaultBackground ? '' : defaultStyles}
        rounded-2xl 
        transition-colors duration-300
        overflow-hidden relative flex flex-col
        ${colSpan} ${rowSpan} ${className}
        will-change-transform
        cursor-default
      `}
      style={{ willChange: "transform, opacity" }}
    >
        {children}
    </motion.div>
  );
};