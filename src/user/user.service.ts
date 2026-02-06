import { Repository } from 'typeorm';
import { UserRole } from 'src/common/enum';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as SYS_MSG from 'src/constants/system-messages';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Get user by id
   * @param id
   * @returns Promise<User | null>
   */
  async findById(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(SYS_MSG.USER_NOT_FOUND);
    }

    return user;
  }

  /**
   * Get user by email
   * @param email
   * @returns Promise<User | null>
   */
  async findByEmail(email: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email: email.toLowerCase() })
      .getOne();
  }

  /**
   * Get all users
   * @returns Promise<Array<User>> Array of users
   */
  async findAll() {
    // TODO: Add pagination & filter by query params
    return {
      message: SYS_MSG.USERS_RETRIEVED_SUCCESSFULLY,
      users: await this.userRepository.find(),
    };
  }

  /**
   * Create a new user
   * @param createUserDto
   * @returns Promise<User>
   */
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      ...createUserDto,
      email: createUserDto.email.toLowerCase(),
    });
    return await this.userRepository.save(user);
  }

  private async updateUserData(userId: string, data: Partial<User>) {
    const result = await this.userRepository.update(userId, data);
    if (result.affected === 0) {
      throw new NotFoundException(SYS_MSG.USER_NOT_FOUND);
    }
  }

  /**
   * Update user role
   * @param id
   * @param role
   */
  async updateUserRole(id: string, role: UserRole) {
    // update user role
    await this.updateUserData(id, { role });
    // get user updated data
    const user = await this.userRepository.findOneBy({ id });

    return {
      message: SYS_MSG.USER_UPDATED,
      user,
    };
  }

  /**
   * Soft delete user
   * @param id user id
   */
  async delete(id: string) {
    await this.updateUserData(id, { isActive: false });
  }
}
