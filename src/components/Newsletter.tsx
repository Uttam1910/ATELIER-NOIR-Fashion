import { ArrowRight } from 'lucide-react'
import { useId, useState } from 'react'
import { useToast } from '../context/toastContext'
import { EMAIL_PATTERN } from '../utils/forms'

export function NewsletterForm({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const { notify } = useToast()
  const id = useId()
  const dark = tone === 'dark'

  if (done) {
    return (
      <p role="status" className={`font-serif text-[1.35rem] ${dark ? 'text-ivory' : ''}`}>
        Thank you — you’re on the list. <span className={`block font-sans text-[0.85rem] ${dark ? 'text-ivory/60' : 'text-muted'}`}>Demo only: no email will be sent.</span>
      </p>
    )
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        if (!EMAIL_PATTERN.test(email.trim())) {
          setError('Please enter a valid email address.')
          return
        }
        setError('')
        setDone(true)
        notify('Newsletter subscribed', 'Welcome to The Atelier Letter')
      }}
      className="w-full"
    >
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-0">
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`min-h-12 w-full min-w-0 flex-1 border px-4 text-[0.95rem] focus:outline-none ${
            dark
              ? 'border-ivory/30 bg-transparent text-ivory placeholder:text-ivory/50 focus:border-ivory'
              : 'border-line bg-white/70 placeholder:text-muted/70 focus:border-ink'
          }`}
        />
        <button type="submit" className={`${dark ? 'btn-light' : 'btn-primary'} min-h-12 shrink-0`}>
          Subscribe <ArrowRight className="size-3.5" aria-hidden="true" />
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className={`mt-2 text-[0.82rem] ${dark ? 'text-rose-soft' : 'text-burgundy'}`}>
          {error}
        </p>
      )}
    </form>
  )
}
