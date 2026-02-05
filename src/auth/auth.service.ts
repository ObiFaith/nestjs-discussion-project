import { LoginDto } from './dto/login.dto';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
  register(registerDto: RegisterDto) {
    return 'This action adds a new user';
  }

  login(loginDto: LoginDto) {
    return `This action login user`;
  }
}
