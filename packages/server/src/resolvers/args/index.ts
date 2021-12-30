import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export class UserByIdArgs {
  @Field()
  id: string
}
