import { ProductCard } from '../components/ProductCard'
import { NewsletterForm } from '../components/Newsletter'
import { ServiceCards } from '../components/Services'
import { Hero } from '../components/home/Hero'
import {
  CategoryShowcase,
  CraftSection,
  EditsSection,
  FestiveBanner,
  JournalTeaser,
  LookbookBanner,
  SocialGallery,
  StudioSection,
  TrustStrip,
} from '../components/home/sections'
import { SectionHeading } from '../components/ui'
import { fashion } from '../config/fashion'
import { newArrivals } from '../data/products'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Home() {
  useDocumentMeta(undefined, `${fashion.brandName} — ${fashion.descriptor}. Sarees, lehengas, kurta sets, co-ords and occasion wear. A website demo concept.`)

  return (
    <>
      <Hero />
      <TrustStrip />

      <section aria-labelledby="new-arrivals-heading" className="container-page py-16 md:py-24">
        <SectionHeading
          id="new-arrivals-heading"
          title="New Arrivals"
          copy="The latest pieces from ATELIER NOIR."
          action={{ label: 'View All', to: '/shop?sort=newest' }}
        />
        <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
          {newArrivals.slice(0, 8).map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>

      <CraftSection />
      <CategoryShowcase />
      <LookbookBanner />
      <EditsSection />

      <section aria-labelledby="services-heading" className="border-t border-line bg-ivory-deep py-16 md:py-24">
        <div className="container-page">
          <SectionHeading id="services-heading" kicker="Services" title="Our Services" copy="Personal help, from first idea to final drape." action={{ label: 'Book Styling', to: '/styling' }} />
          <ServiceCards />
        </div>
      </section>

      <FestiveBanner />
      <JournalTeaser />
      <SocialGallery />
      <StudioSection />

      <section aria-labelledby="newsletter-heading" className="container-page py-16 text-center md:py-24">
        <h2 id="newsletter-heading" className="text-[2.2rem] leading-tight sm:text-[2.8rem]">
          The Atelier Letter
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">New collections, styling notes and inspiration — occasionally.</p>
        <div className="mx-auto mt-8 max-w-lg">
          <NewsletterForm />
        </div>
      </section>
    </>
  )
}
