import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Enter valid email address' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsAlphanumeric()
  readonly password: string;
}
