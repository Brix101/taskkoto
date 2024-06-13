import { Ctx, Query, Resolver } from "type-graphql";
import { GraphQLContext } from "../../app";
import { Users } from "./entities/user.entity";

@Resolver(Users)
export class UsersResolver {
  @Query(() => [Users!]!)
  async users(@Ctx() ctx: GraphQLContext) {
    const userRepo = ctx.em.fork().getRepository(Users);

    return userRepo.findAll();
  }
}
