import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { useDialog } from '../hooks/useDialog'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  side?: 'left' | 'right'
  children: ReactNode
  footer?: ReactNode
  /** Extra classes for the panel, e.g. width */
  className?: string
}

/** Slide-in dialog panel. Full-screen on small screens. */
export function Drawer({ open, onClose, title, side = 'right', children, footer, className = '' }: DrawerProps) {
  const ref = useDialog<HTMLDivElement>(open, onClose)
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 animate-fade-in bg-espresso/45" onClick={onClose} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`absolute inset-y-0 flex w-full flex-col bg-ivory shadow-2xl outline-none sm:max-w-[440px] ${
          side === 'right' ? 'right-0 animate-[drawer-in-right_0.4s_var(--ease-soft)]' : 'left-0 animate-[drawer-in-left_0.4s_var(--ease-soft)]'
        } ${className}`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <h2 className="font-serif text-2xl">{title}</h2>
          <button type="button" onClick={onClose} className="-mr-2 grid size-11 place-items-center" aria-label={`Close ${title}`}>
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
        {footer && <div className="shrink-0 border-t border-line bg-ivory px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">{footer}</div>}
      </div>
    </div>
  )
}

interface ModalProps {
  open: boolean
  onClose: () => void
  label: string
  children: ReactNode
  className?: string
  tone?: 'light' | 'dark'
}

/** Centred dialog. Used for quick view, service details and the image lightbox. */
export function Modal({ open, onClose, label, children, className = '', tone = 'light' }: ModalProps) {
  const ref = useDialog<HTMLDivElement>(open, onClose)
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <div
        className={`absolute inset-0 animate-fade-in ${tone === 'dark' ? 'bg-espresso/95' : 'bg-espresso/50'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={`relative max-h-[100dvh] w-full animate-fade-up overflow-y-auto overscroll-contain outline-none sm:max-h-[90dvh] ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
