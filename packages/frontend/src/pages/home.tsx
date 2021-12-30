import type { FunctionalComponent } from 'preact'

const githubLoginUrl = 'http://localhost:4000/api/auth/github'

const Home: FunctionalComponent = () => {
  return (
    <div className="p-12 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold">Home</h1>
      <div className="py-12">
        <a href={githubLoginUrl} className="d-btn">
          <span className="i-uil-github-alt mr-3" />Login with GitHub
        </a>
      </div>
    </div>
  )
}

export default Home
