import { prisma } from '../config/prisma';
import type { Prisma } from '@prisma/client';

export async function listCertificates() {
  return prisma.certificate.findMany({ orderBy: { order: 'asc' } });
}

export async function createCertificate(data: Prisma.CertificateCreateInput) {
  return prisma.certificate.create({ data });
}

export async function updateCertificate(id: string, data: Prisma.CertificateUpdateInput) {
  return prisma.certificate.update({ where: { id }, data });
}

export async function deleteCertificate(id: string) {
  return prisma.certificate.delete({ where: { id } });
}
