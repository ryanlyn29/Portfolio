import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundProps {
  color: string;
}

export const Background: React.FC<BackgroundProps> = ({ color }) => {
  return (
    <div className="fixed inset-0 -z-50 bg-[#F8F9FA] dark:bg-[#111] transition-colors duration-700 overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        animate={{ backgroundColor: color }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        style={{ opacity: 0.8 }} 
      />

      
      <style>{`
        .lumina-moving-grid {
          width: 100%;
          height: 100%;
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(0,0,0,1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,1) 1px, transparent 1px);
          animation: gridPan 30s linear infinite;
        }
        @keyframes gridPan {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
      `}</style>

      <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.03] pointer-events-none dark:invert">
         <div className="lumina-moving-grid" />
      </div>
      
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};