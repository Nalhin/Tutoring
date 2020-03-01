import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ID } from 'type-graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(returns => User)
  async user(@Args('username') username: string): Promise<User> {
    return this.userService.findOneByUsername(username);
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard)
  async removeUser(
    @Args({ name: 'id', type: () => ID }) id: number,
  ): Promise<User> {
    return this.userService.remove(id);
  }

  @ResolveProperty('users', returns => [User])
  async getUsers(@Parent() user) {
    const { id } = user;
    return this.userService.findAll({ id });
  }
}
