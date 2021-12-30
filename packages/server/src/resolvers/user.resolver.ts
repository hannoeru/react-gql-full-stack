import { User } from '@generated/type-graphql'
import { Ctx, Query, Resolver } from 'type-graphql'
import { ApolloError } from 'apollo-server-core'
import { userService } from '@/services/user.service'
import type { ApolloContext } from '@/apollo'

@Resolver(_of => User)
export class UserResolver {
  @Query(_returns => User)
  async user(@Ctx() ctx: ApolloContext): Promise<User> {
    if (!ctx.user)
      throw new ApolloError('need auth')

    const user = await userService.getUserById(ctx.user.id)
    if (!user) throw new ApolloError('user not found')
    return user
  }

  @Query(_returns => [User])
  async users(): Promise<User[]> {
    const user = await userService.getUsers()
    if (!user.length) throw new ApolloError('user not found')
    return user
  }
}
