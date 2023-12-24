import { HashService } from '@app/auth/hash.service';
import { ChangePasswordInput } from '@app/auth/inputs/change-password.input';
import { UserRepository } from '@app/db/user/user.repository';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class ChangePasswordUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService
  ) {}

  public async handler(input: ChangePasswordInput, user: User) {
    const { newPassword } = input;

    this.validation(input, user);

    await this.userRepository.update({
      where: {
        id: user.id,
      },
      data: {
        password: this.hashService.create(newPassword),
      },
    });
  }

  private validation(input: ChangePasswordInput, user: User) {
    const { password, newPassword, newPasswordConfirmation } = input;

    if (!this.hashService.match(password, user.password)) {
      throw new UnprocessableEntityException('password is invalid');
    }

    if (newPassword !== newPasswordConfirmation) {
      throw new UnprocessableEntityException('newPassword and newPasswordConfirmation must be equal');
    }

    if (password === newPassword) {
      throw new UnprocessableEntityException('newPassword and password must be different');
    }
  }
}
