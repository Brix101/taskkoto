import { Entity, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity } from "../../../common/base.entity.js";

@ObjectType()
@Entity()
export class Users extends BaseEntity {
  @Field(() => String)
  @Property()
  fullName!: string;

  @Field(() => String)
  @Property()
  email!: string;

  @Property()
  password!: string;

  @Field(() => String)
  @Property({ type: "text", nullable: true })
  bio?: string;
}
