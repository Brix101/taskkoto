import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../common/base.entity.js";

@Entity({ tableName: "users" })
export class UserEntity extends BaseEntity {
  @Property()
  fullName!: string;

  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Property({ type: "text", nullable: true })
  bio?: string | null;
}
