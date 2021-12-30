import { Link } from 'preact-router/match'
import { route } from 'preact-router'
import { useGetCurrentUserQuery } from '@/generated/graphql'
import type { FunctionalComponent } from 'preact'

const Profile: FunctionalComponent = () => {
  const [{ data, fetching, error }] = useGetCurrentUserQuery()

  if (fetching) return <p>Loading...</p>
  if (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    route('/')
  }

  return (
    <div className="p-12 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold">Profile</h1>
      <div className="py-12">
        {
          data?.user.avatar && <div className="flex justify-center mb-12">
            <img src={data?.user.avatar} alt="" className="w-48 h-48 object-center rounded-full overflow-hidden" />
          </div>
        }
        <ul>
          {
            data && Object.entries(data.user).map(([key, value]) => (
              <li key={key}>{key}: {value}</li>
            ))
          }
        </ul>
      </div>
      <Link href="/" className="d-btn">
        home
      </Link>
    </div>
  )
}

export default Profile
