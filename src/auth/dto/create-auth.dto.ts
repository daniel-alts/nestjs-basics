import { IsString, IsEmail } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'invalid email' })
  email: string;
}
