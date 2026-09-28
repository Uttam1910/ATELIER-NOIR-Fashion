import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { getProduct } from '../data/products'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { BagItem, Product } from '../types'
import { ShopContext } from './shopContext'
import type { AddOptions, Panel, ShopContextValue } from './shopContext'
import { computeTotals, needsChoice, unitPrice } from '../utils/pricing'
import { useToast } from './toastContext'

const lineKey = (slug: string, color: string | undefined, selections: Record<string, string>) =>
  [slug, color ?? '', ...Object.entries(selections).sort().map(([k, v]) => `${k}:${v}`)].join('|')

export function ShopProvider({ children }: { children: ReactNode }) {
  const { notify } = useToast()
  const [bag, setBag] = useLocalStorage<BagItem[]>('atelier-noir:bag', [])
  const [wishlistSlugs, setWishlistSlugs] = useLocalStorage<string[]>('atelier-noir:wishlist', [])
  const [panel, setPanel] = useState<Panel>(null)
  const [quickView, setQuickView] = useState<string | null>(null)

  const bagLines = useMemo(
    () =>
      bag.flatMap((item) => {
        const product = getProduct(item.slug)
        return product ? [{ ...item, product, price: unitPrice(product, item.selections) }] : []
      }),
    [bag],
  )
  const totals = useMemo(() => computeTotals(bagLines), [bagLines])
  const wishlist = useMemo(
    () => wishlistSlugs.map((s) => getProduct(s)).filter((p): p is Product => Boolean(p)),
    [wishlistSlugs],
  )

  const addToBag = useCallback(
    (slug: string, { color, selections = {}, quantity = 1 }: AddOptions = {}) => {
      const product = getProduct(slug)
      if (!product) return
      const chosenColor = color ?? product.colors[0]?.name
      const key = lineKey(slug, chosenColor, selections)
      setBag((items) => {
        const existing = items.find((i) => i.key === key)
        if (existing) {
          return items.map((i) => (i.key === key ? { ...i, quantity: Math.min(10, i.quantity + quantity) } : i))
        }
        return [...items, { key, slug, quantity, color: chosenColor, selections }]
      })
      notify('Added to Bag', product.name)
    },
    [notify, setBag],
  )

  const setQuantity = useCallback(
    (key: string, quantity: number) =>
      setBag((items) => items.map((i) => (i.key === key ? { ...i, quantity: Math.max(1, Math.min(10, quantity)) } : i))),
    [setBag],
  )

  const removeFromBag = useCallback(
    (key: string) => {
      const line = bag.find((i) => i.key === key)
      setBag((items) => items.filter((i) => i.key !== key))
      if (line) notify('Removed from Bag', getProduct(line.slug)?.name)
    },
    [bag, notify, setBag],
  )

  const clearBag = useCallback(() => setBag([]), [setBag])

  const isWishlisted = useCallback((slug: string) => wishlistSlugs.includes(slug), [wishlistSlugs])

  const toggleWishlist = useCallback(
    (slug: string) => {
      const name = getProduct(slug)?.name
      if (wishlistSlugs.includes(slug)) {
        setWishlistSlugs((s) => s.filter((x) => x !== slug))
        notify('Removed from Wishlist', name)
      } else {
        setWishlistSlugs((s) => [...s, slug])
        notify('Added to Wishlist', name)
      }
    },
    [notify, setWishlistSlugs, wishlistSlugs],
  )

  const removeFromWishlist = useCallback(
    (slug: string) => {
      setWishlistSlugs((s) => s.filter((x) => x !== slug))
      notify('Removed from Wishlist', getProduct(slug)?.name)
    },
    [notify, setWishlistSlugs],
  )

  const moveToWishlist = useCallback(
    (key: string) => {
      const line = bag.find((i) => i.key === key)
      if (!line) return
      setBag((items) => items.filter((i) => i.key !== key))
      setWishlistSlugs((s) => (s.includes(line.slug) ? s : [...s, line.slug]))
      notify('Moved to Wishlist', getProduct(line.slug)?.name)
    },
    [bag, notify, setBag, setWishlistSlugs],
  )

  const moveToBag = useCallback(
    (slug: string) => {
      const product = getProduct(slug)
      if (!product) return
      if (needsChoice(product)) {
        // A size is required — let the shopper pick it in Quick View.
        setPanel(null)
        setQuickView(slug)
        return
      }
      setWishlistSlugs((s) => s.filter((x) => x !== slug))
      addToBag(slug)
    },
    [addToBag, setWishlistSlugs],
  )

  const openPanel = useCallback((p: Exclude<Panel, null>) => {
    setQuickView(null)
    setPanel(p)
  }, [])
  const closePanel = useCallback(() => setPanel(null), [])
  const openQuickView = useCallback((slug: string) => setQuickView(slug), [])
  const closeQuickView = useCallback(() => setQuickView(null), [])

  const value = useMemo<ShopContextValue>(
    () => ({
      bagLines,
      totals,
      wishlist,
      panel,
      quickView,
      openPanel,
      closePanel,
      openQuickView,
      closeQuickView,
      addToBag,
      setQuantity,
      removeFromBag,
      moveToWishlist,
      clearBag,
      isWishlisted,
      toggleWishlist,
      removeFromWishlist,
      moveToBag,
    }),
    [bagLines, totals, wishlist, panel, quickView, openPanel, closePanel, openQuickView, closeQuickView, addToBag, setQuantity, removeFromBag, moveToWishlist, clearBag, isWishlisted, toggleWishlist, removeFromWishlist, moveToBag],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
