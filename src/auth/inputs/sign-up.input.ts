import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class SignUpInput {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public email: string;

  @IsPhoneNumber()
  @IsString()
  public phone: string;

  @IsString()
  @Length(6)
  public password: string;

  @IsString()
  public documentNumber: string;
}
