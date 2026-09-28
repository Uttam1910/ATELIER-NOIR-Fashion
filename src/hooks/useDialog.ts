import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

interface Entry {
  node: RefObject<HTMLElement | null>
  close: RefObject<() => void>
}

/** Open dialogs, topmost last. Only the topmost one reacts to Escape and Tab. */
const stack: Entry[] = []

const onDocumentKey = (e: KeyboardEvent) => {
  const top = stack[stack.length - 1]
  if (!top) return
  if (e.key === 'Escape') {
    e.preventDefault()
    top.close.current()
    return
  }
  const node = top.node.current
  if (e.key !== 'Tab' || !node) return
  const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null)
  if (items.length === 0) {
    e.preventDefault()
    node.focus()
    return
  }
  const first = items[0]
  const last = items[items.length - 1]
  const active = document.activeElement
  if (!node.contains(active)) {
    e.preventDefault()
    ;(e.shiftKey ? last : first).focus()
  } else if (e.shiftKey && active === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && active === last) {
    e.preventDefault()
    first.focus()
  }
}

/**
 * Shared behaviour for modal surfaces: Escape to close, focus trapping,
 * body scroll locking and focus restoration on close.
 */
export function useDialog<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const ref = useRef<T>(null)
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const entry: Entry = { node: ref, close: closeRef }

    if (stack.length === 0) {
      document.documentElement.style.overflow = 'hidden'
      document.addEventListener('keydown', onDocumentKey)
    }
    stack.push(entry)

    const frame = requestAnimationFrame(() => {
      const node = ref.current
      const target = node?.querySelector<HTMLElement>('[data-autofocus]') ?? node?.querySelector<HTMLElement>(FOCUSABLE)
      ;(target ?? node)?.focus()
    })

    return () => {
      cancelAnimationFrame(frame)
      stack.splice(stack.indexOf(entry), 1)
      if (stack.length === 0) {
        document.documentElement.style.overflow = ''
        document.removeEventListener('keydown', onDocumentKey)
      }
      previouslyFocused?.focus?.({ preventScroll: true })
    }
  }, [open])

  return ref
}
