import type { ImageKey } from '../types'

export const imageSrc = (image: ImageKey, width = 1200) => `/images/${image}-${width}.webp`
