import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { CreateTaskInput, User } from '../../../types/resolvers.generated.js';
import { CommonEntity } from '../../common/common.entity.js';
import { UserEntity } from '../../users/entities/user.entity.js';

export enum TaskStatus {
  BACKLOG = 'BACKLOG',
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
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
  assignee: UserEntity;

  @ManyToOne(() => UserEntity)
  createdBy!: UserEntity;

  constructor(input: CreateTaskInput) {
    super();
    this.title = input.title;
    this.description = input.description ?? '';
    this.status = input.status;
    this.assignee = input.assigneeId as unknown as UserEntity;
  }

  toJSON() {
    return {
      id: this.id.toString(),
      createdAt: this.createdAt,
      status: this.status,
      title: this.title,
      updatedAt: this.updatedAt,
      description: this.description,
      createdBy: this.createdBy as unknown as User,
      assignee: this.assignee as unknown as User,
    };
  }
}
