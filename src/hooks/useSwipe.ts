import { useRef } from 'react'
import type { PointerEvent } from 'react'

/** Horizontal swipe detection for touch/pen pointers. Mouse drags are ignored. */
export function useSwipe(onLeft: () => void, onRight: () => void, threshold = 45) {
  const start = useRef<{ x: number; y: number } | null>(null)

  return {
    onPointerDown: (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return
      start.current = { x: e.clientX, y: e.clientY }
    },
    onPointerUp: (e: PointerEvent) => {
      if (!start.current) return
      const dx = e.clientX - start.current.x
      const dy = e.clientY - start.current.y
      start.current = null
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy)) return
      if (dx < 0) onLeft()
      else onRight()
    },
    onPointerCancel: () => {
      start.current = null
    },
  }
}
