// eslint-disable-next-line import/no-named-as-default
import Router from 'preact-router'
import { Provider, createClient } from '@urql/preact'
import Home from './pages/home'
import Profile from './pages/profile'

const client = createClient({
  url: 'http://localhost:4000/api/graphql',
  fetchOptions: {
    credentials: 'include',
  },
})

export function App() {
  return (
    <Provider value={client}>
      <Router>
        <Home path="/" />
        <Profile path="/profile" />
      </Router>
    </Provider>
  )
}
