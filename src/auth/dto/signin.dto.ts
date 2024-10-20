import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { INVALID_EMAIL_MESSAGE } from 'src/shared/app.constants';
import { EMAIL_REGEX } from '../schemas/util';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail({}, { message: INVALID_EMAIL_MESSAGE })
  @Matches(EMAIL_REGEX, {
    message: INVALID_EMAIL_MESSAGE,
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
