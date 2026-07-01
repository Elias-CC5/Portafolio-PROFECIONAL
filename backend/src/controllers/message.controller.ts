import type { Request, Response, NextFunction } from 'express';
import * as messageService from '../services/message.service';
import { ok, created } from '../utils/apiResponse';
import { NotFoundError } from '../utils/AppError';

export async function sendMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const message = await messageService.createMessage(req.body);
    return created(res, { id: message.id }, '¡Mensaje enviado! Te responderé pronto.');
  } catch (err) {
    return next(err);
  }
}

export async function getMessages(_req: Request, res: Response, next: NextFunction) {
  try {
    const messages = await messageService.listMessages();
    return ok(res, messages);
  } catch (err) {
    return next(err);
  }
}

export async function markMessage(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await messageService.updateMessageStatus(id, status);
    return ok(res, updated, 'Mensaje actualizado');
  } catch (err) {
    return next(err);
  }
}

export async function removeMessage(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await messageService.deleteMessage(id).catch(() => {
      throw new NotFoundError('Mensaje');
    });
    return ok(res, null, 'Mensaje eliminado');
  } catch (err) {
    return next(err);
  }
}
