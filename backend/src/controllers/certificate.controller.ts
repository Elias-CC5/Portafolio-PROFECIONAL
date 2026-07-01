import type { Request, Response, NextFunction } from 'express';
import * as certificateService from '../services/certificate.service';
import { ok, created } from '../utils/apiResponse';

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const certificates = await certificateService.listCertificates();
    return ok(res, certificates);
  } catch (err) {
    return next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const certificate = await certificateService.createCertificate(req.body);
    return created(res, certificate);
  } catch (err) {
    return next(err);
  }
}

export async function update(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const certificate = await certificateService.updateCertificate(req.params.id, req.body);
    return ok(res, certificate, 'Certificado actualizado');
  } catch (err) {
    return next(err);
  }
}

export async function remove(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    await certificateService.deleteCertificate(req.params.id);
    return ok(res, null, 'Certificado eliminado');
  } catch (err) {
    return next(err);
  }
}
