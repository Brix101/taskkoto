import { Property, Enum, ManyToOne, Entity } from '@mikro-orm/core';
import { CommonEntity } from '../../common/common.entity.js';
import { UserEntity } from '../../users/entities/user.entity.js';
import { CreateTaskInput } from '../../../types/resolvers.generated.js';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity({ tableName: 'tasks' })
export class TaskEntity extends CommonEntity {
  @Property()
  title!: string;

  @Property({ nullable: true })
  description?: string;

  @Enum({ items: () => TaskStatus, nativeEnumName: 'task_status', default: TaskStatus.TODO })
  status: TaskStatus = TaskStatus.TODO;

  @ManyToOne(() => UserEntity)
  assignee?: UserEntity;

  @ManyToOne(() => UserEntity)
  createdBy!: UserEntity;

  constructor(input: CreateTaskInput) {
    super();
    this.title = input.title;
    this.description = input.description ?? '';
    this.status = input.status;
    this.assignee = input.assigneeId as unknown as UserEntity;
    this.createdBy = input.creatorId as unknown as UserEntity;
  }
}
