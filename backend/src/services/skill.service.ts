import { prisma } from '../config/prisma';
import type { Prisma } from '@prisma/client';

export async function listSkills() {
  return prisma.skill.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] });
}

export async function createSkill(data: Prisma.SkillCreateInput) {
  return prisma.skill.create({ data });
}

export async function updateSkill(id: string, data: Prisma.SkillUpdateInput) {
  return prisma.skill.update({ where: { id }, data });
}

export async function deleteSkill(id: string) {
  return prisma.skill.delete({ where: { id } });
}
