import { Link } from 'preact-router/match'
import { route } from 'preact-router'
import { useLayoutEffect, useState } from 'preact/hooks'
import { useGetCurrentUserQuery, useUpdateUserMutation } from '@/generated/graphql'
import FieldEditor from '@/components/FieldEditor'
import { useUserID } from '@/hooks/useUserID'
import type { GetCurrentUserQuery } from '@/generated/graphql'
import type { FunctionalComponent } from 'preact'

const Profile: FunctionalComponent = () => {
  const [user, setUser] = useState<GetCurrentUserQuery['user'] | null>(null)
  const [{ data, fetching, error }] = useGetCurrentUserQuery({
    requestPolicy: 'cache-and-network',
  })
  const [, executeMutation] = useUpdateUserMutation()

  const [userId, setUserId] = useUserID()

  useLayoutEffect(() => {
    if (data) {
      setUserId(data.user.id)
      setUser(data.user)
      if (!userId)
        setUserId(data.user.id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  if (fetching) return <p>Loading...</p>
  if (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    setUserId(null)
    route('/')
  }

  function handleChange(value: string, key: 'name' | 'avatar') {
    executeMutation({
      [key]: value,
    })
    setUser((oldState) => {
      const newState = Object.assign({}, oldState)
      newState[key] = value
      return newState
    })
  }

  return (
    <div class="p-12 flex flex-col items-center justify-center">
      <h1 class="text-4xl font-semibold">Profile</h1>
      <div class="py-12">
        {
          user?.avatar && <div class="flex justify-center mb-12">
            <img src={user.avatar} alt="" class="w-48 h-48 object-center rounded-full overflow-hidden" />
          </div>
        }
        <ul>
          {
            user && Object.entries(user).map(([key, value]) => {
              if (key === 'name') {
                return <FieldEditor data={{
                  key,
                  value,
                }} onChange={v => handleChange(v, 'name')} />
              } else { return <li key={key}>{key}: {value}</li> }
            })
          }
        </ul>
      </div>
      <Link href="/" class="d-btn">
        home
      </Link>
    </div>
  )
}

export default Profile
