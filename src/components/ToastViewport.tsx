import { Check, X } from 'lucide-react'
import { useShop } from '../context/shopContext'
import { useToast } from '../context/toastContext'

/**
 * Desktop: bottom-left, clear of the right-hand drawers.
 * Mobile: above the bottom navigation, or just under the drawer header
 * when a full-screen drawer is open so it never covers checkout actions.
 */
export function ToastViewport() {
  const { toasts, dismiss } = useToast()
  const { panel, quickView } = useShop()
  const overlayOpen = panel !== null || quickView !== null

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className={`pointer-events-none fixed inset-x-3 z-[60] flex flex-col gap-2 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:top-auto sm:w-[340px] ${
        overlayOpen ? 'top-[4.5rem]' : 'bottom-[calc(4.75rem+env(safe-area-inset-bottom))]'
      }`}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="pointer-events-auto flex animate-fade-up items-start gap-3 bg-espresso px-4 py-3 text-ivory shadow-xl"
        >
          <Check className="mt-0.5 size-4 shrink-0 text-champagne" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-[0.78rem] font-medium tracking-[0.12em] uppercase">{t.title}</p>
            {t.description && <p className="truncate text-[0.85rem] text-ivory/75">{t.description}</p>}
          </div>
          <button
            type="button"
            onClick={() => dismiss(t.id)}
            className="on-dark -m-1 grid size-7 shrink-0 place-items-center text-ivory/70 hover:text-ivory"
            aria-label="Dismiss notification"
          >
            <X className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  )
}
