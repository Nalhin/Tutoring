import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlUser } from '../common/decorators/gql-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query((returns) => User)
  async user(@Args('username') username: string): Promise<User> {
    return this.userService.findOneByUsername(username);
  }

  @Query((returns) => User)
  @UseGuards(JwtAuthGuard)
  async me(@GqlUser() user: User): Promise<User> {
    return user;
  }

  @Mutation((returns) => User)
  @UseGuards(JwtAuthGuard)
  async removeUser(
    @Args({ name: 'id', type: () => ID }) id: number,
  ): Promise<User> {
    return this.userService.remove(id);
  }
}
