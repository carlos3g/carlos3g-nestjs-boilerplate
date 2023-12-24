import { IRequest } from '@app/auth/types';
import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class BaseGuard implements CanActivate {
  public getRequest(context: ExecutionContext): IRequest {
    return context.switchToHttp().getRequest();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    return !!context;
  }

  public getAccessTokenOrFail(request: IRequest): string {
    const accessToken = this.parseAccessTokenFromHeader(request) || this.parseAccessTokenFromCookie(request);

    if (!accessToken) {
      throw new BadRequestException('Authorization not found');
    }

    return accessToken;
  }

  private parseAccessTokenFromCookie(request: IRequest): string | null {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const cookie: string | undefined = request.cookies?.auth as unknown as string | undefined;
      const jwt = JSON.parse(cookie) as { accessToken: string; refreshToken: string };

      return jwt.accessToken;
    } catch (e) {
      return null;
    }
  }

  private parseAccessTokenFromHeader(request: IRequest): string | null {
    try {
      const header = request.headers.authorization;

      if (!header) {
        return null;
      }

      const accessToken = header.split(' ')[1];

      return accessToken;
    } catch (e) {
      return null;
    }
  }
}
