import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User } from './schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthController');

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    this.logger.debug('signing up for the emailId: ', email);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async signIn(signIn: SignInDto): Promise<{ token: string }> {
    const { email, password } = signIn;
    this.logger.debug('signing in for the user: ', email);
    const user = await this.userModel.findOne({ email });

    if (!user) {
      this.logger.error('Invalid email or password: ', email);
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordsValid = await bcrypt.compare(password, user.password);

    if (!isPasswordsValid) {
      this.logger.error('password mismatch: ');
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
