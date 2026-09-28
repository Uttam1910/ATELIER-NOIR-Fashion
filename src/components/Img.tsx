import { images } from '../data/images'
import type { ImageKey } from '../types'
import { imageSrc } from '../utils/images'

interface ImgProps {
  image: ImageKey
  /** The `sizes` attribute — describe how wide the image renders. */
  sizes: string
  className?: string
  /** Load eagerly with high priority (above-the-fold only). */
  priority?: boolean
  /** Pass an empty string for purely decorative uses. */
  alt?: string
  draggable?: boolean
}

export function Img({ image, sizes, className = '', priority = false, alt, draggable }: ImgProps) {
  const asset = images[image]
  const largest = asset.widths[asset.widths.length - 1]
  const fallback = Math.min(1200, largest)
  return (
    <img
      src={imageSrc(image, fallback)}
      srcSet={asset.widths.map((w) => `${imageSrc(image, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt ?? asset.alt}
      width={fallback}
      height={Math.round(fallback / asset.ratio)}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      draggable={draggable}
      className={className}
    />
  )
}
