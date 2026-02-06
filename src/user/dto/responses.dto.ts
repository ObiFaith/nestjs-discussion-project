import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

export class GetUsersResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: [UserResponseDto] })
  users: UserResponseDto[];
}

export class UpdateUserRoleResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty({})
  role: string;
}
