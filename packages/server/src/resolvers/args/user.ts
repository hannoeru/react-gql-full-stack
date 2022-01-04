import { ArgsType, Field } from 'type-graphql'
import type { User } from '@/generated/type-graphql'

@ArgsType()
export class UpdateUserArgs implements Partial<Pick<User, 'avatar' | 'name'>> {
  @Field({ nullable: true })
  avatar?: string

  @Field({ nullable: true })
  name?: string
}
