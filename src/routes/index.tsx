import { createFileRoute } from '@tanstack/react-router'

import { GallerySection } from '@/components/gallery/gallery-section'
import { ContactCta } from '@/components/sections/contact-cta'
import { Events } from '@/components/sections/events'
import { Hero } from '@/components/sections/hero'
import { HowToBook } from '@/components/sections/how-to-book'
import { Location } from '@/components/sections/location'
import type { GalleryCategory } from '@/config/gallery'
import { galleryItems, isGalleryCategory } from '@/config/gallery'

type HomeSearch = {
  /** Filtro da galeria; ausente = "todos" */
  galeria?: Exclude<GalleryCategory, 'todos'>
  /** Id da mídia aberta no lightbox */
  midia?: string
}

export const Route = createFileRoute('/')({
  // Valida a URL: valores desconhecidos são descartados em vez de quebrar a página
  validateSearch: (search: Record<string, unknown>): HomeSearch => ({
    galeria:
      isGalleryCategory(search.galeria) && search.galeria !== 'todos'
        ? search.galeria
        : undefined,
    midia: galleryItems.some((item) => item.id === search.midia)
      ? (search.midia as string)
      : undefined,
  }),
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <Events />
      <GallerySection />
      <HowToBook />
      <Location />
      <ContactCta />
    </>
  )
}
