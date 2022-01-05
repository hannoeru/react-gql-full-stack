import { route } from 'preact-router'
import { useUserID } from '@/hooks/useUserID'
import type { FunctionalComponent } from 'preact'

const githubLoginUrl = 'http://localhost:4000/api/auth/github'

const Home: FunctionalComponent = () => {
  const [userId] = useUserID()

  if (userId)
    route('/profile')

  return (
    <div class="p-12 flex flex-col items-center justify-center">
      <h1 class="text-4xl font-semibold">Home</h1>
      <div class="py-12">
        <a href={githubLoginUrl} class="d-btn">
          <span class="i-uil-github-alt mr-3" />Login with GitHub
        </a>
      </div>
    </div>
  )
}

export default Home
