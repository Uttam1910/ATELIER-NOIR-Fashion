import { Maximize2 } from 'lucide-react'
import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import type { ImageKey } from '../types'
import { imageSrc } from '../utils/images'
import { Img } from './Img'
import { Lightbox } from './Lightbox'

interface ProductGalleryProps {
  images: ImageKey[]
  name: string
}

/**
 * Desktop: thumbnails + main image with hover zoom; click for fullscreen.
 * Mobile: swipeable scroll-snap strip with position dots.
 */
export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setZoom({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }

  const onStripScroll = () => {
    const el = stripRef.current
    if (!el) return
    setActive(Math.round(el.scrollLeft / el.clientWidth))
  }

  const scrollTo = (i: number) => {
    const el = stripRef.current
    el?.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <div>
      {/* Mobile strip */}
      <div className="relative md:hidden">
        <div
          ref={stripRef}
          onScroll={onStripScroll}
          className="-mx-4 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] sm:-mx-6"
          aria-label={`${name} images`}
          role="region"
          tabIndex={0}
        >
          {images.map((image, i) => (
            <button
              key={image}
              type="button"
              onClick={() => setLightbox(i)}
              className="aspect-[4/5] w-full shrink-0 snap-center bg-sand"
              aria-label={`Open image ${i + 1} of ${images.length} fullscreen`}
            >
              <Img image={image} sizes="100vw" priority={i === 0} className="size-full object-cover object-top" draggable={false} />
            </button>
          ))}
        </div>
        {images.length > 1 && (
          <div className="mt-3 flex justify-center gap-1">
            {images.map((image, i) => (
              <button
                key={image}
                type="button"
                onClick={() => scrollTo(i)}
                className="grid size-8 place-items-center"
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active}
              >
                <span className={`block h-0.5 transition-all ${i === active ? 'w-6 bg-ink' : 'w-3 bg-ink/25'}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden gap-4 md:flex">
        {images.length > 1 && (
          <ul className="flex w-[72px] shrink-0 flex-col gap-3 lg:w-[84px]" aria-label="Choose image">
            {images.map((image, i) => (
              <li key={image}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show image ${i + 1} of ${images.length}`}
                  aria-current={i === active}
                  className={`block aspect-[3/4] w-full overflow-hidden bg-sand ring-offset-2 ring-offset-ivory transition ${
                    i === active ? 'ring-1 ring-ink' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Img image={image} sizes="84px" alt="" className="size-full object-cover object-top" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setLightbox(active)}
            onMouseMove={onMove}
            onMouseLeave={() => setZoom(null)}
            className="block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-sand"
            aria-label="Open image fullscreen"
          >
            <Img
              key={images[active]}
              image={images[active]}
              sizes="(min-width: 1280px) 620px, 52vw"
              priority
              className="size-full animate-fade-in object-cover object-top transition-transform duration-300 ease-out"
              draggable={false}
            />
            {zoom && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-no-repeat"
                style={{
                  backgroundImage: `url(${imageSrc(images[active])})`,
                  backgroundSize: '220%',
                  backgroundPosition: `${zoom.x}% ${zoom.y}%`,
                }}
              />
            )}
          </button>
          <span className="pointer-events-none absolute right-4 bottom-4 inline-flex items-center gap-2 bg-ivory/90 px-3 py-2 text-[0.66rem] font-medium tracking-[0.16em] uppercase">
            <Maximize2 className="size-3.5" aria-hidden="true" />
            Hover to zoom · click to expand
          </span>
        </div>
      </div>

      <Lightbox
        items={images.map((image) => ({ image }))}
        index={lightbox}
        onIndexChange={setLightbox}
        onClose={() => setLightbox(null)}
        label={`${name} image viewer`}
      />
    </div>
  )
}
