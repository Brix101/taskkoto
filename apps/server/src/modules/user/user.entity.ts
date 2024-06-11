import { BaseEntity } from "@/modules/common/base.entity";
import { Entity, Property } from "@mikro-orm/core";

@Entity()
export class User extends BaseEntity {
  @Property()
  fullName!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property({ type: "text" })
  bio = "";
}
