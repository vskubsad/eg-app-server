import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUp: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUp);
  }

  @Post('/signin')
  signIn(@Body() signIn: SignInDto): Promise<{ token: string }> {
    return this.authService.signIn(signIn);
  }
}
