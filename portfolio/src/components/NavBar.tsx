import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Folder, Mail, Sun, Moon, Grid, Calculator } from 'lucide-react';

interface NavBarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  onNavigate: (id: string) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ isDarkMode, toggleTheme, onNavigate }) => {
  const navItems = [
    { id: 'hero', icon: <Home size={18} />, label: 'Home' },
    { id: 'projects', icon: <Folder size={18} />, label: 'Projects' },
    { id: 'about', icon: <User size={18} />, label: 'About' },
    { id: 'workspace', icon: <Calculator size={18} />, label: 'Workspace' },
    { id: 'apps', icon: <Grid size={18} />, label: 'Apps' },
    { id: 'contact', icon: <Mail size={18} />, label: 'Contact' },
  ];

  return (
    <div className="flex justify-center w-full pointer-events-none">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
        className="pointer-events-auto flex items-center gap-1 px-2 py-1.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border-2 border-zinc-300/90 dark:border-zinc-800 rounded-[1.25em] shadow-2xl shadow-black/20"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="relative px-3 py-2.5 rounded-2xl cursor-pointer group hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 ease-out"
          >
            <span className="sr-only">{item.label}</span>
            <div className="text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white group-hover:scale-110 transition-all duration-300">
              {item.icon}
            </div>
            <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-zinc-900 text-white dark:bg-white dark:text-black text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-[1em] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg">
              {item.label}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 dark:bg-white rotate-45"></div>
            </span>
          </button>
        ))}

        <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-2"></div>

        <button
          onClick={toggleTheme}
          className="relative px-3 py-2.5 cursor-pointer rounded-2xl group hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 ease-out"
        >
          <div className="text-zinc-500 dark:text-zinc-400 group-hover:text-orange-500 dark:group-hover:text-orange-400 group-hover:rotate-12 transition-all duration-300">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </div>
        </button>
      </motion.div>
    </div>
  );
};