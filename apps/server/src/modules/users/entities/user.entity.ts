import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../common/base.entity.js";

@Entity()
export class Users extends BaseEntity {
  @Property()
  fullName!: string;

  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Property({ type: "text", nullable: true })
  bio?: string;
}
