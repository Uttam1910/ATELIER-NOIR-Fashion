import { cloneElement, isValidElement } from 'react'
import type { ReactElement } from 'react'

interface FieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  optional?: boolean
  className?: string
  children: ReactElement<Record<string, unknown>>
}

/** Label + control + error wiring. The child control receives id and aria attributes. */
export function Field({ id, label, error, hint, optional, className = '', children }: FieldProps) {
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {optional && <span className="ml-1 font-normal tracking-normal text-muted normal-case">(optional)</span>}
      </label>
      {isValidElement(children) && cloneElement(children, { id, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy })}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.8rem] text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  )
}

