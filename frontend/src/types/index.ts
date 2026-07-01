export interface SocialLink {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'email' | 'phone';
}

export interface Profile {
  fullName: string;
  firstName: string;
  role: string;
  tagline: string;
  about: string;
  shortAbout: string;
  location: string;
  email: string;
  phone: string;
  socials: SocialLink[];
  availability: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  level?: number; // 1-5, optional visual weight
}

export interface GalleryImage {
  src: string;
  label: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  period?: string;
  description: string;
  longDescription?: string;
  bullets: string[];
  features?: string[];
  tech: string[];
  status: 'completed' | 'in-progress';
  teamType: 'individual' | 'team';
  myRole: string;
  context?: string; // e.g. "Proyecto de tesis", "Proyecto académico TECSUP"
  coverImage?: string;
  gallery?: GalleryImage[];
  repoUrl?: string;
  demoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  period: string;
  description?: string;
}

export interface Stat {
  value: string;
  label: string;
}