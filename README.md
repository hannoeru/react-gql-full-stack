# react-gql-full-stack

## Stack

### Common

- GraphQL

### Front-end

- Vite
- Preact
- Unocss
- Urql
- GraphQL Code Generator

### Server

- Fastify
- Apollo Server
- Passport with GitHub OAuth
- Prisma
- TypeGraphql


## Development

### Create GitHub OAuth App

https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app

callback URL: `http://localhost:4000/api/auth/callback`

```bash
# copy and setup env file
cp example.env .env

# install pnpm
npm i -g pnpm

# install dependencies
pnpm i

# run database
pnpm db:up

# push schema to database
pnpm db:push

# run dev
pnpm dev
```