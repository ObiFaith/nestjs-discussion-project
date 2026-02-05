import { UserRole } from '../entities/user.entity';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';


export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  /**
   * Hashed password only
   * Never accept raw passwords here
   */
  @IsString()
  passwordHash: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  emailVerified?: boolean;

  @IsOptional()
  isActive?: boolean;
}
