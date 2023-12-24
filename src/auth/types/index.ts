import { User } from '@prisma/client';
import { Request } from 'express';

export type IRequest = Request & { user?: User };
