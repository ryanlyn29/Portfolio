import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface BentoCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  colSpan?: string;
  rowSpan?: string;
  noPadding?: boolean;
  layoutId?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({ 
  children, 
  className = '', 
  colSpan = 'col-span-1', 
  rowSpan = 'row-span-1',
  noPadding = false,
  layoutId,
  ...props 
}) => {
  return (
    <motion.div
      layoutId={layoutId}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      className={`
        relative overflow-hidden rounded-[2rem] 
        ${noPadding ? 'p-0' : 'p-6 md:p-8'}
        flex flex-col
        ${colSpan} ${rowSpan} 
        ${className}
      `}
      {...props}
    >
    
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};