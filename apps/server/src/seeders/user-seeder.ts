import { UserFactory } from '../modules/users/users.factory.js';
import { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class UserSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    // save the entity to the context
    context.users = new UserFactory(em).make(100);
  }
}
