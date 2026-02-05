import { RegisterDto } from './register.dto';
import { PartialType } from '@nestjs/swagger';

export class LoginDto extends PartialType(RegisterDto) {}