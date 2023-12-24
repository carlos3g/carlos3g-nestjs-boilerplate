import { IsString, Length } from 'class-validator';

export class SignInInput {
  @IsString()
  public username: string;

  @Length(6)
  public password: string;
}
