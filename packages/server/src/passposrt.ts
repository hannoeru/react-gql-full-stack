import passport from 'fastify-passport'
import { Strategy as GitHubStrategy } from 'passport-github'
import { prisma } from './prisma'
import { githubStrategyOptions } from './constants'
import type { User } from '@/prisma'

passport.registerUserSerializer<User, any>(async(user, _request) => user.id)

passport.registerUserDeserializer<string, any>((id, _request) => {
  const user = prisma.user.findUnique({
    where: {
      id,
    },
  })

  return user
})

passport.use(
  new GitHubStrategy(
    githubStrategyOptions,
    async(_accessToken, _refreshToken, profile, cb) => {
      try {
        const user = await getUserByProviderProfile(profile, 'github')
        cb(null, user)
      } catch (error: any) {
        cb(error)
      }
    },
  ),
)

async function getUserByProviderProfile(
  profile: GitHubStrategy.Profile,
  provider: 'github' | 'google',
) {
  const email = profile.emails && profile.emails[0].value
  const avatar = profile.photos && profile.photos[0].value

  if (!email)
    throw new Error('Email is required')

  const providerKey = `${provider}UserId`

  // Find one by provider user id
  let existing = await prisma.user.findUnique({
    where: {
      [providerKey]: profile.id,
    },
  })
  // Otherwise find one with the same email and link them
  if (!existing) {
    existing = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (existing) {
      await prisma.user.update({
        where: {
          id: existing.id,
        },
        data: {
          [providerKey]: profile.id,
        },
      })
    }
  }

  if (!existing) {
    existing = await prisma.user.create({
      data: {
        email,
        name: profile.displayName || profile.username || 'My Name',
        [providerKey]: profile.id,
        avatar,
      },
    })
  }

  if (avatar && existing.avatar !== avatar) {
    await prisma.user.update({
      where: {
        id: existing.id,
      },
      data: {
        avatar,
      },
    })
  }

  return existing
}

export { passport }
