import { JwtService } from '@app/auth/jwt.service';
import { UserRepository } from '@app/db/user/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserStatus } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  public async findUserByToken(token: string) {
    const { sub: uuid } = this.jwtService.decode(token);
    const user = await this.userRepository.findUniqueOrFail({ where: { uuid } });

    this.isAllowedStatusesOrFail(user);

    return user;
  }

  public isAllowedStatusesOrFail(user: User) {
    const allowedStatuses: UserStatus[] = [UserStatus.Active, UserStatus.Unverified];

    if (!allowedStatuses.includes(user.status)) {
      throw new UnauthorizedException();
    }
  }
}
