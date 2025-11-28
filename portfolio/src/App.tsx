import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Background } from './components/Background';
import { Navbar } from './components/NavBar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { ProjectDetail } from './components/ProjectDetail';
import type { Project } from './types';

function App() {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  
  useEffect(() => {
    if (selectedProject) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  
  const defaultDarkColor = "#18181b"; 
  const defaultLightColor = "#F8F9FA"; 

  
  const currentBgColor = activeColor || (theme === 'dark' ? defaultDarkColor : defaultLightColor);

  return (
    <div className="relative text-zinc-900 dark:text-white min-h-screen selection:bg-orange-500 selection:text-white font-sans">
      
      <Background color={currentBgColor} />

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-32 flex flex-col gap-4 w-full">
        <Hero toggleTheme={toggleTheme} isDark={theme === 'dark'} />
        
        <Projects 
            onHoverProject={setActiveColor} 
            onSelectProject={setSelectedProject}
            isDark={theme === 'dark'}
        />
        
        <Contact />

        <footer className="pt-12 pb-4 text-center text-zinc-500 dark:text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
          <p>Sys_Admin: Ryan // Est. {new Date().getFullYear()}</p>
        </footer>
      </main>

      <AnimatePresence>
        {selectedProject && (
            <ProjectDetail 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;