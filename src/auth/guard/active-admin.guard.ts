import { Repository } from 'typeorm';
import { UserRole } from '../../common/enum';
import { AuthenticatedRequest } from './type';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ActiveAdminGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest<AuthenticatedRequest>();

    if (!user || user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Access denied!');
    }

    const admin = await this.userRepository.findOne({
      where: { id: user.id },
      select: ['id', 'role', 'isActive'],
    });

    if (!admin || !admin.isActive) {
      throw new ForbiddenException('Access denied!');
    }

    return true;
  }
}
