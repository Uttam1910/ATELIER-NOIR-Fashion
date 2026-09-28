import { useSearchParams } from 'react-router'
import { Catalog } from '../components/Catalog'
import { PageHeader } from '../components/ui'
import { products } from '../data/products'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function SearchPage() {
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''
  useDocumentMeta(q ? `Search: ${q}` : 'Search', 'Search the ATELIER NOIR collection.')
  return (
    <>
      <PageHeader title={q ? `Results for “${q}”` : 'Search'} kicker="Search" breadcrumbs={[{ label: 'Search' }]} />
      <Catalog products={products} searchLabel="Search all pieces" emptyAction={{ label: 'Browse the Shop', to: '/shop' }} />
    </>
  )
}
