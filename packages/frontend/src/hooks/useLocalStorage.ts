import { useCallback, useEffect, useState } from 'preact/hooks'
import type { StateUpdater } from 'preact/hooks'

export default function useLocalStorage<T extends(string|number|boolean|object|null)>(
  key: string,
  initialValue: T,
): [T, StateUpdater<T>] {
  const [storedValue, setStoredValue] = useState(
    (): T => {
      try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        return initialValue
      }
    },
  )

  const setItem = (value: T | ((prevState: T) => T)) => {
    const valueToSave = typeof value === 'function' ? value(storedValue) : value
    setStoredValue(valueToSave)
    window.localStorage.setItem(key, JSON.stringify(valueToSave))
  }

  useEffect(() => {
    const newRawValue = window.localStorage.getItem(key)
    if (newRawValue) {
      const newValue = JSON.parse(newRawValue)
      if (newValue !== storedValue)
        setStoredValue(newValue)
    }
  })

  const handleStorage = useCallback(
    (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        const newValue = JSON.parse(event.newValue)
        if (newValue !== storedValue)
          setStoredValue(newValue)
      }
    },
    [storedValue],
  )

  useEffect(() => {
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [handleStorage])

  return [storedValue, setItem]
}
