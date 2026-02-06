import { IsEnum } from 'class-validator';
import { UserRole } from 'src/common/enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRoleDto {
  @ApiProperty({
    example: 'mentor',
    enum: UserRole,
    description: 'Update user role',
  })
  @IsEnum(UserRole)
  role: UserRole;
}
