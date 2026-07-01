import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  email: z.string().trim().email('Correo electrónico inválido'),
  message: z.string().trim().min(10, 'El mensaje debe tener al menos 10 caracteres').max(2000),
});

export const loginSchema = z.object({
  email: z.string().trim().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const projectSchema = z.object({
  title: z.string().trim().min(2).max(150),
  slug: z.string().trim().min(2).max(150).regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  description: z.string().trim().min(10).max(1000),
  bullets: z.array(z.string().trim()).default([]),
  tech: z.array(z.string().trim()).default([]),
  imageUrl: z.string().trim().url().optional().or(z.literal('')),
  repoUrl: z.string().trim().url().optional().or(z.literal('')),
  demoUrl: z.string().trim().url().optional().or(z.literal('')),
  period: z.string().trim().max(50).optional(),
  status: z.enum(['COMPLETED', 'IN_PROGRESS']).default('COMPLETED'),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const projectUpdateSchema = projectSchema.partial();

export const skillSchema = z.object({
  name: z.string().trim().min(1).max(60),
  category: z.enum(['FRONTEND', 'BACKEND', 'DATABASE', 'CLOUD', 'TOOLS', 'SOFT_SKILLS']),
  level: z.number().int().min(1).max(5).optional(),
  order: z.number().int().default(0),
});

export const skillUpdateSchema = skillSchema.partial();

export const experienceSchema = z.object({
  role: z.string().trim().min(2).max(150),
  organization: z.string().trim().min(2).max(150),
  period: z.string().trim().min(2).max(50),
  current: z.boolean().default(false),
  bullets: z.array(z.string().trim()).default([]),
  order: z.number().int().default(0),
});

export const experienceUpdateSchema = experienceSchema.partial();

export const certificateSchema = z.object({
  title: z.string().trim().min(2).max(150),
  issuer: z.string().trim().min(2).max(150),
  issueDate: z.string().trim().optional(),
  credentialUrl: z.string().trim().url().optional().or(z.literal('')),
  imageUrl: z.string().trim().url().optional().or(z.literal('')),
  category: z.string().trim().max(60).optional(),
  order: z.number().int().default(0),
});

export const certificateUpdateSchema = certificateSchema.partial();
