import { BaseEntity, PrimaryKey, Property } from '@mikro-orm/core';

export abstract class CommonEntity extends BaseEntity {
  @PrimaryKey()
  public id!: number;

  @Property()
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();

  constructor(body = {}) {
    super();
    this.assign(body);
  }
}
