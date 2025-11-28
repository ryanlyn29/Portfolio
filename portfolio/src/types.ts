export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  themeColor: string; 
  darkThemeColor?: string;
  lightThemeColor?: string; 
  tags: string[];
  
 
  role?: string;
  year?: string;
  longDescription?: string;
  liveUrl?: string;
  gallery?: string[]; 
}

export interface Skill {
  name: string;
  level: number;
  category: 'Design' | 'Tech' | 'Soft';
}

export interface ContactFormState {
  name: string;
  email: string;
  message: string;
}