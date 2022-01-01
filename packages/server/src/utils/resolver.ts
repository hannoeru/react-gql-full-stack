import graphqlFields from 'graphql-fields'
import { transformFields } from '@/generated/type-graphql/helpers'
import type { GraphQLResolveInfo } from 'graphql'

export function getSelectFields(info: GraphQLResolveInfo) {
  const fields = transformFields(
    graphqlFields(info),
  )

  return fields
}
