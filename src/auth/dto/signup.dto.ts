import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import {
  INVALID_EMAIL_MESSAGE,
  PASSWORD_REQUIREMENTS_MESSAGE,
} from 'src/shared/app.constants';
import { EMAIL_REGEX } from '../schemas/util';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @Matches(EMAIL_REGEX, {
    message: INVALID_EMAIL_MESSAGE,
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])()[0-9a-zA-Z!@#$&()`.+,/"-]{8,}$/, {
    message: PASSWORD_REQUIREMENTS_MESSAGE,
  })
  readonly password: string;
}
