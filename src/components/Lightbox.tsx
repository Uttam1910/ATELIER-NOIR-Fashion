import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { images as imageRegistry } from '../data/images'
import { useSwipe } from '../hooks/useSwipe'
import type { ImageKey } from '../types'
import { Img } from './Img'
import { Modal } from './Overlay'

interface LightboxProps {
  items: { image: ImageKey; caption?: string }[]
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
  label: string
}

export function Lightbox({ items, index, onIndexChange, onClose, label }: LightboxProps) {
  const count = items.length
  const go = (i: number) => onIndexChange((i + count) % count)
  const swipe = useSwipe(
    () => index !== null && go(index + 1),
    () => index !== null && go(index - 1),
  )
  // Keep the latest navigation in a ref so the window listener never goes stale.
  const goRef = useRef(go)
  useEffect(() => {
    goRef.current = go
  })
  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goRef.current(index + 1)
      if (e.key === 'ArrowLeft') goRef.current(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index])

  if (index === null) return null
  const item = items[index]

  const nav = 'grid size-12 place-items-center rounded-full border border-ivory/30 text-ivory transition-colors hover:bg-ivory hover:text-espresso'

  return (
    <Modal open onClose={onClose} label={label} tone="dark" className="on-dark h-[100dvh] sm:h-auto sm:max-w-6xl">
      <div className="flex h-full flex-col text-ivory">
        <div className="flex items-center justify-between px-4 py-3 sm:px-0">
          <p className="text-[0.8rem] tracking-[0.14em] tabular-nums">
            {index + 1} / {count}
          </p>
          <button type="button" onClick={onClose} className="grid size-11 place-items-center" aria-label="Close image viewer" data-autofocus>
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>
        <div className="relative flex min-h-0 flex-1 items-center justify-center touch-pan-y" {...swipe}>
          <Img
            key={item.image}
            image={item.image}
            sizes="(min-width: 1200px) 1100px, 100vw"
            className="max-h-[calc(100dvh-9rem)] w-auto max-w-full animate-fade-in object-contain sm:max-h-[78vh]"
            draggable={false}
          />
          {count > 1 && (
            <>
              <button type="button" onClick={() => go(index - 1)} className={`${nav} absolute left-3 max-sm:hidden`} aria-label="Previous image">
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(index + 1)} className={`${nav} absolute right-3 max-sm:hidden`} aria-label="Next image">
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-0">
          <p className="text-[0.88rem] text-ivory/75">{item.caption ?? imageRegistry[item.image].alt}</p>
          {count > 1 && (
            <div className="flex gap-2 sm:hidden">
              <button type="button" onClick={() => go(index - 1)} className={nav} aria-label="Previous image">
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(index + 1)} className={nav} aria-label="Next image">
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
