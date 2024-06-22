import { Property, Enum, ManyToOne } from '@mikro-orm/core';
import { CommonEntity } from '../../common/common.entity.js';
import { UserEntity } from '../../users/entities/user.entity.js';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class TaskEntity extends CommonEntity {
  @Property()
  title!: string;

  @Property({ nullable: true })
  description?: string;

  @Enum()
  status: TaskStatus = TaskStatus.TODO;

  @ManyToOne(() => UserEntity)
  assignee?: UserEntity;

  @ManyToOne(() => UserEntity)
  creator!: UserEntity;
}
