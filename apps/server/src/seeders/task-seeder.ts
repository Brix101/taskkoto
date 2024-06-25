import { UserFactory } from '../modules/users/users.factory.js';
import { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class TaskSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    // save the entity to the context
    context.author = new UserFactory(em).make(100);
  }
}
