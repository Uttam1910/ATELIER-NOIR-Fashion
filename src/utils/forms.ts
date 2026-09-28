export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PHONE_PATTERN = /^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/

/** Focuses the first invalid control after a failed submit. */
export const focusFirstError = (form: HTMLFormElement | null) =>
  requestAnimationFrame(() => form?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
