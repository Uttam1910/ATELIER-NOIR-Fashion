import { createContext, useContext } from 'react'
import type { BagItem, Product } from '../types'
import type { Totals } from '../utils/pricing'

export type Panel = 'bag' | 'wishlist' | 'search' | 'menu' | 'filters' | null

export interface BagLine extends BagItem {
  product: Product
  price: number
}

export interface AddOptions {
  color?: string
  selections?: Record<string, string>
  quantity?: number
}

export interface ShopContextValue {
  bagLines: BagLine[]
  totals: Totals
  wishlist: Product[]
  panel: Panel
  quickView: string | null
  openPanel: (panel: Exclude<Panel, null>) => void
  closePanel: () => void
  openQuickView: (slug: string) => void
  closeQuickView: () => void
  addToBag: (slug: string, options?: AddOptions) => void
  setQuantity: (key: string, quantity: number) => void
  removeFromBag: (key: string) => void
  moveToWishlist: (key: string) => void
  clearBag: () => void
  isWishlisted: (slug: string) => boolean
  toggleWishlist: (slug: string) => void
  removeFromWishlist: (slug: string) => void
  moveToBag: (slug: string) => void
}

export const ShopContext = createContext<ShopContextValue | null>(null)

export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used inside ShopProvider')
  return ctx
}
