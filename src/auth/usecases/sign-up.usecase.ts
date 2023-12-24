import { HashService } from '@app/auth/hash.service';
import { SignUpInput } from '@app/auth/inputs/sign-up.input';
import { JwtService } from '@app/auth/jwt.service';
import { UserRepository } from '@app/db/user/user.repository';
import { Injectable } from '@nestjs/common';
import { Roles, UserStatus } from '@prisma/client';

@Injectable()
export class SignUpUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService
  ) {}

  public async handler(input: SignUpInput) {
    const user = await this.userRepository.create({
      ...input,
      role: Roles.Customer,
      status: UserStatus.Unverified,
      password: this.hashService.create(input.password),
    });

    return this.jwtService.createFromUserId(user.uuid);
  }

  public findUserByToken(token: string) {
    const { sub: uuid } = this.jwtService.decode(token);

    return this.userRepository.findUniqueOrFail({ where: { uuid } });
  }
}
