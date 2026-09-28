import { Link } from 'react-router'
import { Img } from '../components/Img'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function NotFound() {
  useDocumentMeta('Page not found', 'The page you are looking for may have moved to another collection.')
  return (
    <section className="container-page grid items-center gap-10 py-14 md:grid-cols-2 md:py-24">
      <div className="order-2 md:order-1">
        <p className="eyebrow text-rose">Error 404</p>
        <h1 className="mt-4 text-[2.8rem] leading-[1.02] sm:text-[3.8rem]">This look isn’t available.</h1>
        <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-muted">The page you’re looking for may have moved to another collection.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link to="/shop" className="btn-primary">
            Back to Shop
          </Link>
          <Link to="/collections" className="btn-outline">
            Explore Collections
          </Link>
        </div>
      </div>
      <div className="order-1 aspect-[4/3] overflow-hidden bg-sand md:order-2 md:aspect-[4/5]">
        <Img image="studio-courtyard" sizes="(min-width: 768px) 45vw, 100vw" priority className="size-full object-cover" />
      </div>
    </section>
  )
}
