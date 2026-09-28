import { Catalog } from '../components/Catalog'
import { PageHeader } from '../components/ui'
import { products } from '../data/products'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Shop() {
  useDocumentMeta('Shop', 'Shop sarees, lehengas, kurta sets, co-ords, occasion wear and accessories from ATELIER NOIR, a contemporary Indian fashion demo.')
  return (
    <>
      <PageHeader title="Shop" kicker="The full collection" copy="Every piece, all in one place. Filter by category, size, colour, price and availability." breadcrumbs={[{ label: 'Shop' }]} />
      <Catalog products={products} />
    </>
  )
}
