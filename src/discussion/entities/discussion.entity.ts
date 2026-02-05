import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../common/entities/base-entity';
import { Comment } from '../../comment/entities/comment.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('discussions')
export class Discussion extends BaseEntity {
  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @OneToMany(() => Comment, (comment) => comment.discussion)
  comments: Array<Comment>;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt: Date | null;

  /**
   * Author of the discussion (owner)
   * Learners can edit/delete ONLY their own discussion
   */
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  author: User;

  /**
   * User who last updated the discussion
   * Useful when mentors/admins edit discusssion they don't own
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  lastUpdatedBy: User | null;
}
