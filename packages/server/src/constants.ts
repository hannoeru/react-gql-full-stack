import type { Strategy as GitHubStrategy } from 'passport-github'
import type { SecureSessionPluginOptions } from 'fastify-secure-session'

export const config = {
  authCookieName: 'app-auth',
  sessionSecret: process.env.SESSION_SECRET,
  sessionSalt: process.env.SESSION_SALT,
  cookieMaxAge: 60 * 60 * 24 * 90, // 3 month
  cookieDomain: process.env.COOKIE_DOMAIN,
  cookieSecure: process.env.NODE_ENV === 'production',
  cookieHttpOnly: process.env.NODE_ENV === 'production',
  frontendUrl: process.env.FRONTEND_URL,
}

export const secureSessionOptions: SecureSessionPluginOptions = {
  cookieName: config.authCookieName,
  secret: config.sessionSecret,
  salt: config.sessionSalt,
  cookie: {
    // options for setCookie, see https://github.com/fastify/fastify-cookie
    path: '/',
    httpOnly: config.cookieHttpOnly,
    maxAge: config.cookieMaxAge,
    domain: config.cookieDomain,
  },
}

export const githubStrategyOptions: GitHubStrategy.StrategyOptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${
    process.env.NODE_ENV === 'production' ? process.env.DOMAIN : ''
  }/api/auth/callback`,
}
