import { createContext, useContext } from 'react'

export interface Toast {
  id: number
  title: string
  description?: string
}

export interface ToastContextValue {
  toasts: Toast[]
  notify: (title: string, description?: string) => void
  dismiss: (id: number) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
