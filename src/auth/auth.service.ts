import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { AuthResponseDto, UserResponseDto } from './dto/response.dto';
import { User } from 'src/user/entities/user.entity';
import * as SYS_MSG from 'src/constants/system-messages';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  private mapToAuthResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      role: user.role,
      email: user.email,
      last_name: user.lastName,
      first_name: user.firstName,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };
  }

  async generateToken(id: string, email: string, role: string) {
    const accessToken = await this.jwtService.signAsync({
      id,
      email,
      role,
    });
    return { access_token: accessToken };
  }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { password, ...restDto } = registerDto;
    // Check user already exists
    const existingUser = await this.userService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException(SYS_MSG.ACCOUNT_ALREADY_EXISTS);
    }
    // Hash password
    const saltRounds = this.configService.get<number>('saltRounds') ?? 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Create user
    const user = await this.userService.create({
      ...restDto,
      passwordHash: hashedPassword,
    });
    // Generate jwt token
    const token = await this.generateToken(user.id, user.email, user.role);

    return {
      message: SYS_MSG.USER_CREATED_SUCCESSFULLY,
      user: this.mapToAuthResponseDto(user),
      ...token,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    // Check user already exists
    const existingUser = await this.userService.findByEmail(loginDto.email);
    if (!existingUser) {
      throw new ConflictException(SYS_MSG.USER_NOT_FOUND);
    }
    // Check user password match
    const isMatch = await bcrypt.compare(
      loginDto.password,
      existingUser.passwordHash,
    );
    if (!isMatch) {
      throw new ConflictException(SYS_MSG.USER_NOT_FOUND);
    }
    // Generate jwt token
    const token = await this.generateToken(
      existingUser.id,
      existingUser.email,
      existingUser.role,
    );

    return {
      message: SYS_MSG.USER_LOGIN_SUCCESSFULLY,
      user: this.mapToAuthResponseDto(existingUser),
      ...token,
    };
  }
}
