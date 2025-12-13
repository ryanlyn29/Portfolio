export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  themeColor: string; 
  tags: string[];
  role?: string;
  year?: string;
  liveUrl?: string;
  gallery?: string[];
  textColor?: string; 
  overlayGradient?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'Tech' | 'Soft' | 'Design';
}