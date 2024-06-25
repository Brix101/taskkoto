import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserFactory } from '../modules/users/users.factory.js';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // return this.call(em, {
    //   UserSeeder,
    // });
    //
    new UserFactory(em).make(100);
  }
}
