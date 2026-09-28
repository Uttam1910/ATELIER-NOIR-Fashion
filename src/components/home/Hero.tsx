import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Link } from 'react-router'
import { fashion } from '../../config/fashion'
import { heroSlides } from '../../data/home'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSwipe } from '../../hooks/useSwipe'
import { Img } from '../Img'

const INTERVAL = 6500

export function Hero() {
  const reducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  const count = heroSlides.length
  // Reduced-motion users start paused; they can still press play.
  const [motionPaused, setMotionPaused] = useState(reducedMotion)
  const paused = userPaused || motionPaused || hovering || focusWithin

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count])
  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  useEffect(() => {
    if (paused) return
    const timer = window.setTimeout(next, INTERVAL)
    return () => window.clearTimeout(timer)
  }, [paused, next])

  const swipe = useSwipe(next, prev)

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    }
  }

  const isPlaying = !(userPaused || motionPaused)
  const togglePlay = () => {
    if (isPlaying) setUserPaused(true)
    else {
      setUserPaused(false)
      setMotionPaused(false)
    }
  }

  const ctrl =
    'grid size-11 place-items-center rounded-full border border-ivory/40 text-ivory transition-colors hover:bg-ivory hover:text-espresso'

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured stories"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusWithin(false)
      }}
      className="on-dark relative isolate overflow-hidden bg-espresso text-ivory"
      {...swipe}
    >
      <h1 className="sr-only">
        {fashion.brandName} — {fashion.tagline}
      </h1>
      <div className="relative h-[min(92svh,820px)] min-h-[600px] touch-pan-y">
        {heroSlides.map((slide, i) => {
          const active = i === index
          return (
            <div
              key={slide.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              inert={!active}
              className={`absolute inset-0 transition-opacity duration-[1200ms] ease-[var(--ease-soft)] ${active ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}
            >
              {/* Image: full-bleed on mobile, right-weighted on desktop */}
              <div className="absolute inset-0 overflow-hidden lg:left-[38%]">
                <Img
                  image={slide.image}
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  priority={i === 0}
                  className={`size-full object-cover transition-transform duration-[7000ms] ease-out ${
                    active && !reducedMotion ? 'scale-[1.04]' : 'scale-100'
                  }`}
                  alt={slide.alt}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/35 to-espresso/10 lg:bg-gradient-to-r lg:from-espresso lg:via-espresso/20 lg:to-transparent" />
              </div>

              <div className="container-page relative flex h-full flex-col justify-end pb-32 lg:justify-center lg:pb-0">
                <div className="max-w-[560px]">
                  <p className="eyebrow text-champagne">{fashion.descriptor}</p>
                  <h2 className="mt-5 text-[3.1rem] leading-[0.98] sm:text-[4.2rem] lg:text-[5.4rem]">{slide.title}</h2>
                  <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-ivory/80 sm:text-[1.05rem]">{slide.copy}</p>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Link to={slide.primary.to} className="btn-primary border-burgundy">
                      {slide.primary.label}
                    </Link>
                    <Link to={slide.secondary.to} className="btn-light">
                      {slide.secondary.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="container-page flex items-center justify-between gap-4 pb-8 lg:pb-12">
          <div className="flex items-center gap-1" role="group" aria-label="Choose slide">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show slide ${i + 1}: ${slide.title}`}
                aria-current={i === index}
                className="group flex min-h-11 items-center gap-2 px-1.5 text-[0.8rem] tabular-nums"
              >
                <span className={i === index ? 'text-ivory' : 'text-ivory/50 group-hover:text-ivory/80'}>{String(i + 1).padStart(2, '0')}</span>
                {i < count - 1 && (
                  <span className="relative block h-px w-6 bg-ivory/30 sm:w-10" aria-hidden="true">
                    {i === index && (
                      <span
                        key={`${index}-${paused}`}
                        className="absolute inset-y-0 left-0 bg-ivory"
                        style={{
                          width: paused ? '100%' : undefined,
                          animation: paused ? undefined : `hero-progress ${INTERVAL}ms linear forwards`,
                        }}
                      />
                    )}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={togglePlay} className={ctrl} aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}>
              {isPlaying ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
            </button>
            <button type="button" onClick={prev} className={ctrl} aria-label="Previous slide">
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={next} className={ctrl} aria-label="Next slide">
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {count}: {heroSlides[index].title}
      </p>
    </section>
  )
}
