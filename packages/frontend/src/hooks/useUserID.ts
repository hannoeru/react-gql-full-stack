import useLocalStorage from './useLocalStorage'

export function useUserID() {
  return useLocalStorage<string | null>('user', null)
}
