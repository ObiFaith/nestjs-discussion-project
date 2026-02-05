import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../common/entities/base-entity';
import { Discussion } from '../../discussion/entities/discussion.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('comments')
export class Comment extends BaseEntity {
  @Column({ length: 255 })
  comment: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Discussion, (discussion) => discussion.comments, {
    nullable: false,
  })
  @JoinColumn({ name: 'discussion_id' })
  discussion: Discussion;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt: Date | null;
}
