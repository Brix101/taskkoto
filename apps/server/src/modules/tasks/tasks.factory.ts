import { faker } from '@faker-js/faker';
import { Connection, EntityData, EntityManager, IDatabaseDriver } from '@mikro-orm/core';
import { Factory } from '@mikro-orm/seeder';
import { TaskEntity } from './entities/task.entity.js';

export class TaskFactory extends Factory<TaskEntity> {
  model = TaskEntity;
  private createdBy: number;

  constructor(entityManager: EntityManager<IDatabaseDriver<Connection>>, createdBy: number) {
    super(entityManager);
    this.createdBy = createdBy;
  }

  protected definition(): EntityData<TaskEntity> {
    const hacker = faker.hacker;
    const taskTitle = `${hacker.verb()} ${hacker.noun()}`;
    let assignee = faker.number.int({ min: 1, max: 100 });

    // Ensure assignee is not the same as createdBy
    if (assignee === this.createdBy) {
      assignee = assignee === 100 ? assignee - 1 : assignee + 1;
    }

    return {
      title: taskTitle,
      description: faker.lorem.sentence(),
      assignee: assignee,
      createdBy: this.createdBy,
    };
  }
}
