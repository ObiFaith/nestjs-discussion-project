import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import * as SYS_MSG from 'src/constants/system-messages';
import { ConflictException, Injectable } from '@nestjs/common';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(userId: string, email: string, role: string) {
    const payload = { id: userId, email, role };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }

  async register(registerDto: RegisterDto) {
    const { email, password, ...restDto } = registerDto;
    // convert email to lowercase
    const lowercaseEmail = email.toLowerCase();
    // Check if user already exists
    const existingUser = await this.userService.findByEmail(lowercaseEmail);
    if (existingUser) {
      throw new ConflictException(SYS_MSG.ACCOUNT_ALREADY_EXISTS);
    }
    // Hash password
    const saltRounds = this.configService.get('saltRounds') ?? 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Create user
    const { passwordHash, ...user } = await this.userService.create({
      ...restDto,
      email: lowercaseEmail,
      passwordHash: hashedPassword,
    });
    // Generate jwt token
    const token = await this.generateToken(user.id, user.email, user.role);
    // return user data + jwt token
    return { ...user, ...token };
  }

  login(loginDto: LoginDto) {
    return `This action login user`;
  }
}
