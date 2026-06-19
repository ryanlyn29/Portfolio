import { Routes, Route } from 'react-router-dom';
import { MarketingNav } from './components/marketing/MarketingNav';
import { MarketingFooter } from './components/marketing/MarketingFooter';
import { HomePage } from './pages/HomePage';
import { ProjectPage } from './pages/ProjectPage';

export default function App() {
  return (
    <div className="bg-[#FDFBF7] text-[#1C1E26] min-h-screen antialiased font-['DM_Sans']">
      <MarketingNav />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

      <MarketingFooter />
    </div>
  );
}
