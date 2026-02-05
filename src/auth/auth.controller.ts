import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { DocsLoginUser, DocsRegisterUser } from './doc/auth.swagger';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // --- POST: LOGIN USER ---
  @Post('login')
  @DocsLoginUser()
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // --- POST: REGISTER USER ---
  @Post('register')
  @DocsRegisterUser()
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
