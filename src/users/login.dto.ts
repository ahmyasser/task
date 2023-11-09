// create-user.dto.ts
import { IsString, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(4)
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
