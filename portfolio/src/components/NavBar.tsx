import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Folder, Mail, Sun, Moon, Grid, Calculator } from 'lucide-react';

interface NavBarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  onNavigate: (id: string) => void;
  currentPage?: number;
}

export const NavBar: React.FC<NavBarProps> = ({ isDarkMode, toggleTheme, onNavigate, currentPage = 1 }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
<<<<<<< HEAD
  const getActiveIndex = () => {
    if (currentPage === 0) return 3;
    if (currentPage === 1) return 0;
    if (currentPage === 2) return 4;
=======
  // Map nav items to pages: hero=1, workspace=0, apps=2
  const getActiveIndex = () => {
    if (currentPage === 0) return 3; // workspace
    if (currentPage === 1) return 0; // hero/home
    if (currentPage === 2) return 4; // apps
>>>>>>> 134e185be9a25735d8bd6ac23be909859a0b3921
    return null;
  };
  
  const activeIndex = getActiveIndex();

  const navItems = [
    { id: 'hero', icon: <Home size={18} />, label: 'Home' },
    { id: 'projects', icon: <Folder size={18} />, label: 'Projects' },
    { id: 'about', icon: <User size={18} />, label: 'About' },
    { id: 'workspace', icon: <Calculator size={18} />, label: 'Workspace' },
    { id: 'apps', icon: <Grid size={18} />, label: 'Apps' },
    { id: 'contact', icon: <Mail size={18} />, label: 'Contact' },
  ];

  const appColors = [
    { id: 'hero', color: '#2563EB' },
    { id: 'projects', color: '#7C3AED' },
    { id: 'about', color: '#EA580C' },
    { id: 'workspace', color: '#16A34A' },
    { id: 'apps', color: '#DB2777' },
    { id: 'contact', color: '#DC2626' },
  ];

<<<<<<< HEAD
=======
  // Enhanced fisheye magnification effect with smooth curve
>>>>>>> 134e185be9a25735d8bd6ac23be909859a0b3921
  const getProximityScale = (index: number, hoveredIndex: number | null) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    
<<<<<<< HEAD
    const maxScale = 1.8;
    const baseScale = 1.0;
    
    const scaleFactor = Math.pow(0.25, distance);
=======
    // Fisheye curve: exponential decay for smooth magnification
    // Maximum scale at hovered item, minimal scaling for adjacent items
    const maxScale = 1.8; // Maximum magnification
    const baseScale = 1.0;
    
    // Create smooth fisheye curve using exponential decay
    // Reduced decay factor so adjacent items scale much less
    const scaleFactor = Math.pow(0.25, distance); // Exponential decay factor (reduced from 0.65)
>>>>>>> 134e185be9a25735d8bd6ac23be909859a0b3921
    const scale = baseScale + (maxScale - baseScale) * scaleFactor;
    
    return Math.max(1, scale);
  };

  const getProximityY = (index: number, hoveredIndex: number | null) => {
    if (hoveredIndex === null) return 0;
    const distance = Math.abs(index - hoveredIndex);
    
<<<<<<< HEAD
    const maxLift = -16;
    const liftFactor = Math.pow(0.7, distance);
=======
    // Enhanced vertical lift with fisheye curve
    const maxLift = -16; // Maximum upward movement
    const liftFactor = Math.pow(0.7, distance); // Exponential decay
>>>>>>> 134e185be9a25735d8bd6ac23be909859a0b3921
    const lift = maxLift * liftFactor;
    
    return lift;
  };

  return (
    <div className="flex justify-center w-full pointer-events-none">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
        className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-[1.5rem]"
        style={{
          background: isDarkMode 
            ? 'rgba(50, 50, 56, 0.6)' 
            : 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: isDarkMode 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: isDarkMode
            ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        }}
      >
        {navItems.map((item, index) => {
          const appColor = appColors.find(ac => ac.id === item.id)?.color || '#52525B';
          const isHovered = hoveredIndex === index;
          const isActive = activeIndex === index;
          const proximityScale = getProximityScale(index, hoveredIndex);
          const proximityY = getProximityY(index, hoveredIndex);
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{ 
                scale: proximityScale, 
                y: proximityY,
                zIndex: isHovered ? 50 : 10 - Math.abs(index - (hoveredIndex || 0))
              }}
              transition={{ 
                type: "spring", 
                stiffness: 500,
                damping: 30,
                mass: 0.6
              }}
              whileTap={{ 
                scale: 1.4,
                y: -10,
                transition: { 
                  type: "spring", 
                  stiffness: 600, 
                  damping: 35
                }
              }}
              className="relative flex items-center justify-center w-10 h-10 cursor-pointer group"
              style={{
                transformOrigin: 'center bottom'
              }}
            >
              <span className="sr-only">{item.label}</span>
              <motion.div 
                className="relative z-10 w-9 h-9 rounded-[0.8rem] flex items-center justify-center shadow-sm"
                style={{ backgroundColor: appColor }}
                animate={{ 
                  boxShadow: isHovered 
                    ? "0 10px 25px rgba(0, 0, 0, 0.2)" 
                    : "0 2px 8px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="text-white"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 18 })}
                </motion.div>
              </motion.div>
<<<<<<< HEAD
=======
              {/* macOS-style tooltip */}
>>>>>>> 134e185be9a25735d8bd6ac23be909859a0b3921
              <motion.span 
                className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900/90 dark:bg-zinc-100/90 text-white dark:text-zinc-900 text-[10px] font-medium px-2 py-1 rounded-md pointer-events-none whitespace-nowrap shadow-lg"
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  y: isHovered ? 0 : 5, 
                  scale: isHovered ? 1 : 0.8 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {item.label}
              </motion.span>
<<<<<<< HEAD
=======
              {/* macOS-style indicator dot */}
>>>>>>> 134e185be9a25735d8bd6ac23be909859a0b3921
              <motion.div 
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-zinc-900 dark:bg-zinc-100"
                animate={{ 
                  opacity: (isHovered || isActive) ? 1 : 0, 
                  scale: (isHovered || isActive) ? 1 : 0 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              ></motion.div>
            </motion.button>
          );
        })}

        <div className="w-px h-8 bg-zinc-300/30 dark:bg-zinc-700/30 mx-0.5"></div>

        <motion.button
          onClick={toggleTheme}
          onMouseEnter={() => setHoveredIndex(navItems.length)}
          onMouseLeave={() => setHoveredIndex(null)}
          animate={{ 
            scale: getProximityScale(navItems.length, hoveredIndex),
            y: getProximityY(navItems.length, hoveredIndex),
            zIndex: hoveredIndex === navItems.length ? 50 : 10 - Math.abs(navItems.length - (hoveredIndex || 0))
          }}
          transition={{ 
            type: "spring", 
            stiffness: 500,
            damping: 30,
            mass: 0.6
          }}
          whileTap={{ 
            scale: 1.4,
            y: -10,
            transition: { 
              type: "spring", 
              stiffness: 600, 
              damping: 35
            }
          }}
          className="relative flex items-center justify-center w-10 h-10 cursor-pointer group"
          style={{
            transformOrigin: 'center bottom'
          }}
        >
          <motion.div 
            className="relative z-10 w-9 h-9 rounded-[0.8rem] flex items-center justify-center shadow-sm"
            style={{ backgroundColor: '#52525B' }}
            whileHover={{ 
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.2 }
            }}
          >
            <motion.div 
              className="text-white"
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.div>
          </motion.div>
          <motion.span 
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900/90 dark:bg-zinc-100/90 text-white dark:text-zinc-900 text-[10px] font-medium px-2 py-1 rounded-[0.8rem] pointer-events-none whitespace-nowrap shadow-lg"
            initial={{ opacity: 0, y: 5, scale: 0.8 }}
            whileHover={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
};