import { ROLES_KEY } from '@app/shared/decorators/roles.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles, User } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = request.user as User;

    return this.matchRoles(roles, user.role);
  }

  private matchRoles(roles: Roles[], role: Roles): boolean {
    if (roles.includes(role)) {
      return true;
    }

    return false;
  }
}
