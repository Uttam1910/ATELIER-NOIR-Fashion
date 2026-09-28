import { useEffect, useState } from 'react'

/** State mirrored to localStorage. Falls back to in-memory state if storage is unavailable. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage can be blocked (private mode); the in-memory state still works.
    }
  }, [key, value])

  return [value, setValue] as const
}
