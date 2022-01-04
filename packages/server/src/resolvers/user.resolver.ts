import { Args, Ctx, Info, Mutation, Query, Resolver } from 'type-graphql'
import { AuthenticationError } from 'apollo-server-core'
import { GraphQLResolveInfo } from 'graphql'
import { User } from '@/generated/type-graphql'
import { getSelectFields } from '@/utils'
import { UpdateUserArgs } from './args'
import type { ApolloContext } from '@/apollo'

@Resolver(_of => User)
export class UserResolver {
  @Query(_returns => User)
  async user(@Ctx() ctx: ApolloContext, @Info() info: GraphQLResolveInfo): Promise<Partial<User> | null> {
    if (!ctx.user)
      throw new AuthenticationError('Unauthorized')

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.user.id,
      },
      select: getSelectFields(info),
    })

    return user
  }

  @Query(_returns => [User])
  async users(@Ctx() ctx: ApolloContext, @Info() info: GraphQLResolveInfo): Promise<Partial<User>[]> {
    if (!ctx.user)
      throw new AuthenticationError('Unauthorized')

    const users = await ctx.prisma.user.findMany({
      select: getSelectFields(info),
    })

    return users
  }

  @Mutation(_returns => User)
  async updateUser(@Args() args: UpdateUserArgs, @Ctx() ctx: ApolloContext, @Info() info: GraphQLResolveInfo): Promise<Partial<User>> {
    if (!ctx.user)
      throw new AuthenticationError('Unauthorized')

    const user = await ctx.prisma.user.update({
      where: {
        id: ctx.user.id,
      },
      data: args,
      select: getSelectFields(info),
    })

    return user
  }
}
