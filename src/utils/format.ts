import { fashion } from '../config/fashion'

const inr = new Intl.NumberFormat(fashion.locale, {
  style: 'currency',
  currency: fashion.currency,
  maximumFractionDigits: 0,
})

export const formatPrice = (value: number) => inr.format(value)

const dateFmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export const formatDate = (iso: string) => dateFmt.format(new Date(`${iso}T00:00:00`))

export const formatShortDate = (date: Date) =>
  new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }).format(date)

export const demoReference = (prefix: string) =>
  `${prefix}-${Date.now().toString(36).slice(-4).toUpperCase()}${Math.floor(Math.random() * 900 + 100)}`
