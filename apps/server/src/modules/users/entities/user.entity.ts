import { Entity, Property } from '@mikro-orm/core';
import { CreateUserInput } from '../../../types/resolvers.generated.js';
import { CommonEntity } from '../../common/common.entity.js';

@Entity({ tableName: 'users' })
export class UserEntity extends CommonEntity {
  @Property()
  fullName!: string;

  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Property({ type: 'text', nullable: true })
  bio?: string | null;

  constructor(input: CreateUserInput) {
    super();
    this.email = input.email;
    this.fullName = input.fullName;
    this.password = input.password;
    this.bio = input.bio;
  }
}
