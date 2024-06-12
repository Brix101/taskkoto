import { CommonEntity } from "@/common/common.entity";
import { Entity, Property } from "@mikro-orm/core";

@Entity()
export class User extends CommonEntity {
  @Property()
  fullName!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property({ type: "text" })
  bio = "";
}
