import { Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLContext } from "../../app";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Users } from "./entities/user.entity";

@Resolver(Users)
export class UsersResolver {
  @Mutation(() => Users)
  async createUser(
    @Ctx() ctx: GraphQLContext,
    @Args(() => CreateUserDTO) createUserInput: CreateUserDTO
  ) {
    const em = ctx.em.fork();
    const userRepo = em.getRepository(Users);
    const user = userRepo.create(createUserInput);
    // Persist the user to the database
    await em.flush();

    return user;
  }

  @Query(() => [Users!]!)
  async users(@Ctx() ctx: GraphQLContext) {
    const userRepo = ctx.em.fork().getRepository(Users);

    return userRepo.findAll();
  }
}
