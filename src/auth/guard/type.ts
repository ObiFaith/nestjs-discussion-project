import { UserRole } from '../../common/enum';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: UserRole };
}
