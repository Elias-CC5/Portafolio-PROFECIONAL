import { prisma } from '../config/prisma';

interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export async function createMessage(input: ContactInput) {
  return prisma.message.create({ data: input });
}

export async function listMessages() {
  return prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function updateMessageStatus(id: string, status: 'UNREAD' | 'READ' | 'ARCHIVED') {
  return prisma.message.update({ where: { id }, data: { status } });
}

export async function deleteMessage(id: string) {
  return prisma.message.delete({ where: { id } });
}
