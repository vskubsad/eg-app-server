import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User } from './schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;

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

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordsValid = await bcrypt.compare(password, user.password);

    if (!isPasswordsValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
