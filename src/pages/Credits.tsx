import { Img } from '../components/Img'
import { PageHeader } from '../components/ui'
import { images } from '../data/images'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import type { ImageKey } from '../types'

export default function Credits() {
  useDocumentMeta('Image Credits', 'Photography credits for the ATELIER NOIR website demo. All images from Unsplash.')
  const entries = Object.entries(images) as [ImageKey, (typeof images)[ImageKey]][]

  return (
    <>
      <PageHeader
        title="Image Credits"
        kicker="Photography"
        copy={`All ${entries.length} photographs are from Unsplash, used under the Unsplash License. The people pictured are not affiliated with this fictional brand and no endorsement is implied.`}
        breadcrumbs={[{ label: 'Credits' }]}
      />
      <div className="container-page pb-20">
        <p className="mb-8 text-[0.9rem] text-muted">
          Licence:{' '}
          <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            Unsplash License
          </a>
          . Images were resized and converted to WebP for this site.
        </p>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {entries.map(([key, asset]) => (
            <li key={key}>
              <Img image={key} sizes="(min-width: 1024px) 190px, (min-width: 640px) 31vw, 46vw" className="aspect-[3/4] w-full bg-sand object-cover" />
              <p className="mt-2 text-[0.82rem] leading-snug">
                Photo by{' '}
                <a href={`https://unsplash.com/@${asset.credit.username}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-burgundy">
                  {asset.credit.author}
                </a>
              </p>
              <a href={asset.credit.url} target="_blank" rel="noopener noreferrer" className="text-[0.75rem] text-muted underline underline-offset-2 hover:text-ink">
                View on Unsplash<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
