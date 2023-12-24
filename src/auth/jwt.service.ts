import { EnvService } from '@app/env/env.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

type Payload = {
  sub: string;
  type?: string;
};

@Injectable()
export class JwtService {
  public constructor(
    private readonly jwt: NestJwtService,
    private readonly envService: EnvService
  ) {}

  public createFromUserId(userId: string) {
    const payload = {
      sub: userId,
    };

    return {
      accessToken: this.jwt.sign(payload, { expiresIn: '7d' }),
      refreshToken: this.jwt.sign(payload, { expiresIn: '21d' }),
    };
  }

  public issue(payload: Payload) {
    return {
      accessToken: this.jwt.sign(payload, { expiresIn: '15m' }),
    };
  }

  public decode(token: string): Payload {
    try {
      const options = {
        secret: this.envService.JWT_SECRET,
      };

      this.jwt.verify(token, options);

      return this.jwt.decode(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
