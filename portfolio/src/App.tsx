import { Navigate, Route, Routes } from 'react-router-dom';
import { MarketingFooter } from './components/marketing/MarketingFooter';
import { MarketingNav } from './components/marketing/MarketingNav';
import { HomePage } from './pages/HomePage';
import { ProjectPage } from './pages/ProjectPage';

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <MarketingNav />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>

      <MarketingFooter />
    </div>
  );
}
