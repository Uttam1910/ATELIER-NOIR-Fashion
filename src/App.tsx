import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ShopProvider } from './context/ShopProvider'
import { ToastProvider } from './context/ToastProvider'
import { SiteLayout } from './layouts/SiteLayout'
import Home from './pages/Home'

const Collections = lazy(() => import('./pages/Collections'))
const CollectionDetail = lazy(() => import('./pages/CollectionDetail'))
const Shop = lazy(() => import('./pages/Shop'))
const Product = lazy(() => import('./pages/Product'))
const Lookbook = lazy(() => import('./pages/Lookbook'))
const OurStory = lazy(() => import('./pages/OurStory'))
const Journal = lazy(() => import('./pages/Journal'))
const JournalArticle = lazy(() => import('./pages/JournalArticle'))
const Styling = lazy(() => import('./pages/Styling'))
const Contact = lazy(() => import('./pages/Contact'))
const Faq = lazy(() => import('./pages/Faq'))
const Policy = lazy(() => import('./pages/Policy'))
const Credits = lazy(() => import('./pages/Credits'))
const Search = lazy(() => import('./pages/Search'))
const Checkout = lazy(() => import('./pages/Checkout'))
const NotFound = lazy(() => import('./pages/NotFound'))

const policyRoutes = ['privacy', 'terms', 'shipping', 'returns', 'care'] as const

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ShopProvider>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path="collections" element={<Collections />} />
              <Route path="collections/:collection" element={<CollectionDetail />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:slug" element={<Product />} />
              <Route path="lookbook" element={<Lookbook />} />
              <Route path="our-story" element={<OurStory />} />
              <Route path="journal" element={<Journal />} />
              <Route path="journal/:slug" element={<JournalArticle />} />
              <Route path="styling" element={<Styling />} />
              <Route path="contact" element={<Contact />} />
              <Route path="faq" element={<Faq />} />
              {policyRoutes.map((slug) => (
                <Route key={slug} path={slug} element={<Policy slug={slug} />} />
              ))}
              <Route path="credits" element={<Credits />} />
              <Route path="search" element={<Search />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ShopProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
