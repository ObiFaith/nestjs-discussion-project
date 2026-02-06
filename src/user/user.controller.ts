import { UserRole } from 'src/common/enum';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { ActiveAdminGuard } from 'src/auth/guard/active-admin.guard';
import {
  swaggerDeleteUser,
  swaggerGetUsers,
  swaggerUpdateUserRole,
} from './swagger/user.swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, ActiveAdminGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @swaggerGetUsers()
  @Role(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  @swaggerUpdateUserRole()
  @Role(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  async updateUserRole(
    @Param('id') id: string,
    @Body() userDto: UpdateUserRoleDto,
  ) {
    return await this.userService.updateUserRole(id, userDto.role);
  }

  @Delete(':id')
  @swaggerDeleteUser()
  @Role(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
