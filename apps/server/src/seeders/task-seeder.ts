import { UserEntity } from '@/modules/users/entities/user.entity.js';
import { TaskFactory } from '../modules/tasks/tasks.factory.js';
import { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class TaskSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary<UserEntity[]>): Promise<void> {
    // save the entity to the context
    const users = context.users;
    if (users) {
      users.forEach((author) => {
        new TaskFactory(em, author.id).make(100);
      });
    }
  }
}
