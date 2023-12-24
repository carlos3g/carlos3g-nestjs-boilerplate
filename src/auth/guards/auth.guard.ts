import { AuthService } from '@app/auth/auth.service';
import { BaseGuard } from '@app/auth/guards/base.guard';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard extends BaseGuard {
  public constructor(private readonly authService: AuthService) {
    super();
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const token = this.getAccessTokenOrFail(request);

    const user = await this.authService.findUserByToken(token);

    request.user = user;

    return true;
  }
}
