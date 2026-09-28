import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { BagDrawer } from '../components/BagDrawer'
import { BottomNav } from '../components/BottomNav'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { QuickView } from '../components/QuickView'
import { SearchOverlay } from '../components/SearchOverlay'
import { ToastViewport } from '../components/ToastViewport'
import { WishlistDrawer } from '../components/WishlistDrawer'
import { useShop } from '../context/shopContext'

/** Scrolls to the top on navigation, or to the #hash target when present. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  const { closePanel, closeQuickView } = useShop()

  useEffect(() => {
    closePanel()
    closeQuickView()
  }, [pathname, closePanel, closeQuickView])

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // Lazily loaded routes may not be in the DOM yet, so retry for a few frames.
      let frame = 0
      let tries = 0
      const find = () => {
        const target = document.getElementById(id)
        if (target) target.scrollIntoView({ block: 'start' })
        else if (tries++ < 30) frame = requestAnimationFrame(find)
      }
      frame = requestAnimationFrame(find)
      return () => cancelAnimationFrame(frame)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

function PageFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status">
      <span className="font-serif text-[1.4rem] text-muted italic">Loading…</span>
    </div>
  )
}

export function SiteLayout() {
  return (
    <div className="flex min-h-dvh flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <BottomNav />
      <BagDrawer />
      <WishlistDrawer />
      <SearchOverlay />
      <QuickView />
      <ToastViewport />
    </div>
  )
}
