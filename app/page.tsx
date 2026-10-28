import { StoreProvider } from '@/components/store-provider'
import { Navbar } from '@/components/navbar'
import { OwnerBar } from '@/components/owner-bar'
import { Hero } from '@/components/sections/hero'
import { Catalog } from '@/components/sections/catalog'
import { Footer } from '@/components/sections/footer'
import { Toaster } from '@/components/ui/sonner'

export default function Page() {
  return (
    <StoreProvider>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-tinta focus:p-3 focus:text-hueso">
        Saltar al contenido
      </a>
      <Navbar />
      <OwnerBar />
      <main id="contenido">
        <Hero />
        <Catalog />
      </main>
      <Footer />
      <Toaster position="bottom-center" />
    </StoreProvider>
  )
}
