import { prisma } from '../config/prisma';
import type { Prisma } from '@prisma/client';

export async function listExperience() {
  return prisma.experience.findMany({ orderBy: { order: 'asc' } });
}

export async function createExperience(data: Prisma.ExperienceCreateInput) {
  return prisma.experience.create({ data });
}

export async function updateExperience(id: string, data: Prisma.ExperienceUpdateInput) {
  return prisma.experience.update({ where: { id }, data });
}

export async function deleteExperience(id: string) {
  return prisma.experience.delete({ where: { id } });
}
