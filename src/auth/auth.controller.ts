import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUp: SignUpDto): Promise<{ token: string }> {
    this.logger.debug(`signing up for user: ${signUp.email}`);
    return this.authService.signUp(signUp);
  }

  @Post('/signin')
  signIn(@Body() signIn: SignInDto): Promise<{ token: string }> {
    this.logger.debug(`signing in for user: ${signIn.email}`);
    return this.authService.signIn(signIn);
  }
}
