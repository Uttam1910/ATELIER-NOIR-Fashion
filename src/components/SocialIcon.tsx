interface SocialIconProps {
  network: string
  className?: string
}

/** Simple line marks for social networks (Lucide no longer ships brand icons). */
export function SocialIcon({ network, className = 'size-4' }: SocialIconProps) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  switch (network) {
    case 'instagram':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
      )
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" />
        </svg>
      )
    case 'pinterest':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M10.5 20.5 12 14m-1.2-.2c.4.9 1.3 1.4 2.3 1.4 2.3 0 3.9-2.2 3.9-4.8A4.8 4.8 0 0 0 12 5.8c-3 0-5 2.1-5 4.6 0 1.1.4 2 1.2 2.5" />
        </svg>
      )
    case 'youtube':
      return (
        <svg {...common}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="m10 9.5 5 2.5-5 2.5Z" fill="currentColor" />
        </svg>
      )
    default:
      return null
  }
}
