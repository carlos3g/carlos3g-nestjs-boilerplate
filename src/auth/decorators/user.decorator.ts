import { IRequest } from '@app/auth/types';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const UserDecorator = createParamDecorator((data: unknown, context: ExecutionContext): User => {
  const request: IRequest = context.switchToHttp().getRequest();

  return request.user;
});
