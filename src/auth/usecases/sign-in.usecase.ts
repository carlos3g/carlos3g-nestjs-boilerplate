import { AuthService } from '@app/auth/auth.service';
import { HashService } from '@app/auth/hash.service';
import { SignInInput } from '@app/auth/inputs/sign-in.input';
import { JwtService } from '@app/auth/jwt.service';
import { UserRepository } from '@app/db/user/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SignInUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly authService: AuthService
  ) {}

  public async handler(input: SignInInput) {
    const user = await this.userRepository.findUnique({
      where: {
        phone: input.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    this.authService.isAllowedStatusesOrFail(user);

    if (!this.hashService.match(input.password, user.password)) {
      throw new UnauthorizedException();
    }

    return this.jwtService.createFromUserId(user.uuid);
  }
}
