import { applyDecorators } from '@nestjs/common';
import * as SYS_MSG from '../../constants/system-messages';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  GetUsersResponseDto,
  UpdateUserRoleResponseDto,
} from '../dto/responses.dto';

export function swaggerGetUsers() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all users (Admin Route)',
      description:
        'Retrieve a list of all registered users. Only admins can perform this action.',
    }),
    ApiResponse({
      status: 200,
      description: SYS_MSG.USERS_RETRIEVED_SUCCESSFULLY,
      type: GetUsersResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: SYS_MSG.UNAUTHORIZED,
    }),
    ApiResponse({
      status: 403,
      description: SYS_MSG.FORBIDDEN,
    }),
  );
}

export function swaggerUpdateUserRole() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update user role (Admin Route)',
      description:
        'Update the role of an existing user. Only admins can perform this action.',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: String,
      description: 'The ID of the user whose role is being updated',
    }),
    ApiBody({ type: UpdateUserRoleDto }),
    ApiResponse({
      status: 200,
      description: SYS_MSG.USER_UPDATED,
      type: UpdateUserRoleResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: SYS_MSG.BAD_REQUEST,
    }),
    ApiResponse({
      status: 401,
      description: SYS_MSG.UNAUTHORIZED,
    }),
    ApiResponse({
      status: 403,
      description: SYS_MSG.FORBIDDEN,
    }),
    ApiResponse({
      status: 404,
      description: SYS_MSG.USER_NOT_FOUND,
    }),
  );
}

export function swaggerDeleteUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a user (Admin Route)',
      description:
        'Delete a user account from the system. Only admins can perform this action.',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: String,
      description: 'The ID of the user to delete',
    }),
    ApiResponse({
      status: 204,
      description: 'User deleted successfully',
    }),
    ApiResponse({
      status: 401,
      description: SYS_MSG.UNAUTHORIZED,
    }),
    ApiResponse({
      status: 403,
      description: SYS_MSG.FORBIDDEN,
    }),
    ApiResponse({
      status: 404,
      description: SYS_MSG.USER_NOT_FOUND,
    }),
  );
}
