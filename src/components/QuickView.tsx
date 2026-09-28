import { X } from 'lucide-react'
import { Link } from 'react-router'
import { useShop } from '../context/shopContext'
import { getProduct } from '../data/products'
import { Img } from './Img'
import { ProductPurchase } from './ProductPurchase'
import { Modal } from './Overlay'

export function QuickView() {
  const { quickView, closeQuickView } = useShop()
  const product = getProduct(quickView ?? undefined)
  if (!product) return null

  return (
    <Modal open onClose={closeQuickView} label={`Quick view: ${product.name}`} className="bg-ivory sm:max-w-4xl">
      <button
        type="button"
        onClick={closeQuickView}
        className="absolute top-2 right-2 z-10 grid size-11 place-items-center bg-ivory/90"
        aria-label="Close quick view"
      >
        <X className="size-5" aria-hidden="true" />
      </button>
      <div className="grid sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="aspect-[4/3] bg-sand sm:aspect-auto sm:h-full">
          <Img image={product.images[0]} sizes="(min-width: 640px) 380px, 100vw" className="size-full object-cover object-top" />
        </div>
        <div className="p-5 sm:p-8">
          <p className="eyebrow text-rose">Quick View</p>
          <h2 className="mt-2 text-[2rem] leading-tight">{product.name}</h2>
          <p className="mt-2 mb-6 text-[0.92rem] leading-relaxed text-muted">{product.description}</p>
          <ProductPurchase key={product.slug} product={product} onAdded={closeQuickView} compact />
          <Link to={`/product/${product.slug}`} onClick={closeQuickView} className="link-underline mt-6">
            View full details
          </Link>
        </div>
      </div>
    </Modal>
  )
}
