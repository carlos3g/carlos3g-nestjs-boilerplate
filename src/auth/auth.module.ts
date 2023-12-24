import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { HashService } from '@app/auth/hash.service';
import { JwtService } from '@app/auth/jwt.service';
import { ChangePasswordUsecase } from '@app/auth/usecases/change-password.usecase';
import { SignInUsecase } from '@app/auth/usecases/sign-in.usecase';
import { SignUpUsecase } from '@app/auth/usecases/sign-up.usecase';
import { DbModule } from '@app/db/db.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DbModule],
  providers: [AuthGuard, ChangePasswordUsecase, HashService, JwtService, SignInUsecase, SignUpUsecase],
  controllers: [AuthController],
  exports: [AuthService, JwtService, HashService],
})
export class AuthModule {}
