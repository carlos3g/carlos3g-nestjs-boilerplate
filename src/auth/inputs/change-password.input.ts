import { IsString, Length, MinLength } from 'class-validator';

export class ChangePasswordInput {
  @IsString()
  @Length(6)
  public password: string;

  @IsString()
  @MinLength(6)
  public newPassword: string;

  @IsString()
  @MinLength(6)
  public newPasswordConfirmation: string;
}
