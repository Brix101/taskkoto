import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class CreateUserDTO {
  @Field(() => String, { nullable: false, description: "User fullname" })
  @IsNotEmpty()
  fullName: string;

  @Field(() => String, { nullable: false, description: "User email" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: false, description: "User password" })
  @IsNotEmpty()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  password: string;

  @Field(() => String, { nullable: true, description: "Bio" })
  @IsOptional()
  bio?: string;
}
