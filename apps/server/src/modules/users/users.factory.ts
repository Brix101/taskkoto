import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { UserEntity } from './entities/user.entity.js';
import { EntityData } from '@mikro-orm/core';

export class UserFactory extends Factory<UserEntity> {
  model = UserEntity;

  protected definition(): EntityData<UserEntity> {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'Password',
      bio: faker.word.words(),
    };
  }
}
