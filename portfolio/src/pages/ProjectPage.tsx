import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CaseStudyPage } from '../components/marketing/CaseStudyPage';
import { getCaseStudy, getAdjacentCaseStudies } from '../data/caseStudies';

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getCaseStudy(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const { prev, next } = getAdjacentCaseStudies(project.slug);
  return <CaseStudyPage project={project} prev={prev} next={next} />;
}
