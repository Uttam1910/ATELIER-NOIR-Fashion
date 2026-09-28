import { fashion } from '../config/fashion'
import type { BagItem, Product, ProductOption } from '../types'

/** Options that apply given the current selections (handles dependent options). */
export const visibleOptions = (options: ProductOption[], selections: Record<string, string>) =>
  options.filter((o) => !o.showWhen || o.showWhen.values.includes(selections[o.showWhen.optionId] ?? ''))

export const defaultSelections = (product: Product) => {
  const selections: Record<string, string> = {}
  for (const option of product.options) {
    // Sizes must be chosen by the shopper; other options default to the first choice.
    if (option.kind !== 'size') selections[option.id] = option.choices[0].value
  }
  return selections
}

export const unitPrice = (product: Product, selections: Record<string, string>) =>
  visibleOptions(product.options, selections).reduce((sum, option) => {
    const choice = option.choices.find((c) => c.value === selections[option.id])
    return sum + (choice?.priceDelta ?? 0)
  }, product.price)

export const missingSelections = (product: Product, selections: Record<string, string>) =>
  visibleOptions(product.options, selections).filter((o) => !selections[o.id])

export const describeSelections = (product: Product, item: Pick<BagItem, 'color' | 'selections'>) => {
  const parts: string[] = []
  if (item.color) parts.push(item.color)
  for (const option of visibleOptions(product.options, item.selections)) {
    const choice = option.choices.find((c) => c.value === item.selections[option.id])
    if (choice) parts.push(option.kind === 'size' ? `${option.label} ${choice.label}` : choice.label)
  }
  return parts.join(' · ')
}

export interface Totals {
  subtotal: number
  shipping: number
  gst: number
  total: number
  count: number
}

export const computeTotals = (lines: { price: number; quantity: number }[], giftWrap = 0): Totals => {
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0)
  const count = lines.reduce((sum, l) => sum + l.quantity, 0)
  const shipping = subtotal === 0 || subtotal >= fashion.freeShippingThreshold ? 0 : fashion.shippingFee
  const gst = Math.round(subtotal * fashion.gstRate)
  return { subtotal, shipping, gst, total: subtotal + shipping + gst + giftWrap, count }
}

/** Products that need a size chosen before they can be bagged. */
export const needsChoice = (product: Product) => product.options.some((o) => o.kind === 'size' && !o.showWhen)
