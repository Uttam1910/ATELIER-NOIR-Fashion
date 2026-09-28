import { useCallback, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ToastContext } from './toastContext'
import type { Toast } from './toastContext'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(1)

  const dismiss = useCallback((id: number) => setToasts((all) => all.filter((t) => t.id !== id)), [])

  const notify = useCallback(
    (title: string, description?: string) => {
      const id = nextId.current++
      // Keep at most three on screen so toasts never pile up over the page.
      setToasts((all) => [...all.slice(-2), { id, title, description }])
      window.setTimeout(() => dismiss(id), 3200)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ toasts, notify, dismiss }), [toasts, notify, dismiss])
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
