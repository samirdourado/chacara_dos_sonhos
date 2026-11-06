import { useRef } from 'react'
import { useNavigate, useRouter, useSearch } from '@tanstack/react-router'
import { ImageOff } from 'lucide-react'

import { GalleryLightbox } from '@/components/gallery/gallery-lightbox'
import { GalleryTile } from '@/components/gallery/gallery-tile'
import { InstagramIcon } from '@/components/icons'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import type { GalleryCategory } from '@/config/gallery'
import {
  filterGallery,
  galleryCategories,
  galleryItems,
} from '@/config/gallery'
import { site } from '@/config/site'
import { cn } from '@/lib/utils'

export function GallerySection() {
  const { galeria: category = 'todos', midia } = useSearch({ from: '/' })
  const navigate = useNavigate({ from: '/' })
  const router = useRouter()
  // true quando o lightbox foi aberto por clique (há uma entrada no histórico para voltar)
  const openedInApp = useRef(false)

  const items = filterGallery(category)
  // Link compartilhado pode apontar para um item fora do filtro atual
  const lightboxItems = items.some((item) => item.id === midia)
    ? items
    : galleryItems

  function setCategory(next: GalleryCategory) {
    navigate({
      search: (prev) => ({
        ...prev,
        galeria: next === 'todos' ? undefined : next,
      }),
      replace: true,
      resetScroll: false,
    })
  }

  function openItem(id: string) {
    openedInApp.current = true
    navigate({ search: (prev) => ({ ...prev, midia: id }), resetScroll: false })
  }

  function selectItem(id: string) {
    navigate({
      search: (prev) => ({ ...prev, midia: id }),
      replace: true,
      resetScroll: false,
    })
  }

  function closeItem() {
    // Fechar volta no histórico: o botão "voltar" do celular também fecha o lightbox
    if (openedInApp.current) {
      openedInApp.current = false
      router.history.back()
      return
    }
    navigate({
      search: (prev) => ({ ...prev, midia: undefined }),
      replace: true,
      resetScroll: false,
    })
    document.getElementById('galeria')?.scrollIntoView()
  }

  return (
    <section
      id="galeria"
      aria-labelledby="galeria-title"
      className="scroll-mt-20 bg-creme py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="galeria-title"
          eyebrow="Galeria"
          title="Conheça o espaço"
          description="Piscinas, salão, varanda com vista para a mata e espaço kids. Veja como a chácara fica em dia de festa."
        />

        <div
          role="group"
          aria-label="Filtrar galeria"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {galleryCategories.map((option) => {
            const active = option.id === category
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(option.id)}
                className={cn(
                  'inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-colors focus-visible:ring-4 focus-visible:ring-mata-500/30 focus-visible:outline-none',
                  active
                    ? 'border-mata-700 bg-mata-700 text-white'
                    : 'border-mata-200 bg-white text-mata-800 hover:border-mata-300 hover:bg-mata-50',
                )}
              >
                {option.label}
                <span
                  className={cn(
                    'rounded-full px-1.5 text-xs tabular-nums',
                    active ? 'bg-white/20' : 'bg-mata-100 text-mata-700',
                  )}
                >
                  {filterGallery(option.id).length}
                </span>
              </button>
            )
          })}
        </div>

        <p role="status" className="sr-only">
          {items.length} {items.length === 1 ? 'item' : 'itens'} na galeria
        </p>

        {items.length > 0 ? (
          <ul className="mt-8 grid grid-cols-3 gap-1 sm:gap-3 lg:grid-cols-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="animate-in duration-500 fade-in zoom-in-95"
              >
                <GalleryTile item={item} onOpen={openItem} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState onReset={() => setCategory('todos')} />
        )}

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-muted-foreground">
            Quer ver mais momentos e eventos recentes?
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-mata-200 bg-white px-7 text-base text-mata-800 hover:bg-mata-50 hover:text-mata-900"
          >
            <a href={site.instagram.url} target="_blank" rel="noreferrer">
              <InstagramIcon className="size-5" />
              Seguir {site.instagram.handle}
            </a>
          </Button>
        </div>
      </div>

      <GalleryLightbox
        items={lightboxItems}
        currentId={midia}
        onSelect={selectItem}
        onClose={closeItem}
      />
    </section>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-mata-200 bg-white px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-mata-50 text-mata-600">
        <ImageOff className="size-7" />
      </span>
      <p className="mt-4 font-display text-xl font-semibold text-mata-900">
        Nenhuma mídia nesta categoria ainda
      </p>
      <p className="mt-2 text-muted-foreground">
        Em breve teremos novidades por aqui.
      </p>
      <Button onClick={onReset} className="mt-6 rounded-full">
        Ver tudo
      </Button>
    </div>
  )
}
