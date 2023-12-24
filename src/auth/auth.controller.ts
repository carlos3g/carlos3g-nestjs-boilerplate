import { UserDecorator } from '@app/auth/decorators/user.decorator';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { ChangePasswordInput } from '@app/auth/inputs/change-password.input';
import { SignInInput } from '@app/auth/inputs/sign-in.input';
import { SignUpInput } from '@app/auth/inputs/sign-up.input';
import { MeTransformer } from '@app/auth/transformer/me.transformer';
import { ChangePasswordUsecase } from '@app/auth/usecases/change-password.usecase';
import { SignInUsecase } from '@app/auth/usecases/sign-in.usecase';
import { SignUpUsecase } from '@app/auth/usecases/sign-up.usecase';
import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly signUpUsecase: SignUpUsecase,
    private readonly signInUsecase: SignInUsecase,
    private readonly changePasswordUsecase: ChangePasswordUsecase
  ) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() input: SignInInput) {
    return this.signInUsecase.handler(input);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  public async signUp(@Body() input: SignUpInput) {
    return this.signUpUsecase.handler(input);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  public me(@UserDecorator() user: User) {
    return new MeTransformer(user);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  public async changePassword(@UserDecorator() user: User, @Body() input: ChangePasswordInput) {
    await this.changePasswordUsecase.handler(input, user);
  }
}
