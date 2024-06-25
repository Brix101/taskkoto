import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { EntityData } from '@mikro-orm/core';
import { TaskEntity } from './entities/task.entity.js';

export class TaskFactory extends Factory<TaskEntity> {
  model = TaskEntity;

  protected definition(): EntityData<TaskEntity> {
    const taskTitle = `${faker.hacker.verb()} ${faker.hacker.noun()}`;
    const assignee = faker.number.int({ min: 1, max: 100 });
    let createdBy = faker.number.int({ min: 1, max: 100 });

    // Ensure assignee is not the same as createdBy
    if (assignee === createdBy) {
      createdBy = createdBy === 100 ? createdBy - 1 : createdBy + 1;
    }

    return {
      title: taskTitle,
      description: faker.lorem.sentence(),
      assignee: assignee,
      createdBy: createdBy,
    };
  }
}
