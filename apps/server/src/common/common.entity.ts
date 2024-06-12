import { BaseEntity, PrimaryKey, Property } from "@mikro-orm/core";

export abstract class CommonEntity extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
