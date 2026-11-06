import { useEffect, useRef } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ImageOff,
  LoaderCircle,
  X,
} from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import type { GalleryItem } from '@/config/gallery'
import { useMediaStatus } from '@/hooks/use-media-status'
import { cn } from '@/lib/utils'

const SWIPE_THRESHOLD = 50

type GalleryLightboxProps = {
  items: Array<GalleryItem>
  currentId: string | undefined
  onSelect: (id: string) => void
  onClose: () => void
}

export function GalleryLightbox({
  items,
  currentId,
  onSelect,
  onClose,
}: GalleryLightboxProps) {
  const index = items.findIndex((item) => item.id === currentId)
  const current = index >= 0 ? items[index] : undefined
  const touchStartX = useRef<number | null>(null)

  const prev = items[(index - 1 + items.length) % items.length]
  const next = items[(index + 1) % items.length]

  // Pré-carrega as fotos vizinhas para a troca ser instantânea
  useEffect(() => {
    if (!current) return
    for (const item of [prev, next]) {
      if (item.type === 'image') new Image().src = item.src
    }
  }, [current, prev, next])

  function handleKeyDown(event: React.KeyboardEvent) {
    // No player de vídeo as setas avançam/voltam o vídeo
    if (event.target instanceof HTMLVideoElement) return
    if (event.key === 'ArrowLeft') onSelect(prev.id)
    if (event.key === 'ArrowRight') onSelect(next.id)
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (touchStartX.current === null) return
    const delta = event.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (delta > SWIPE_THRESHOLD) onSelect(prev.id)
    if (delta < -SWIPE_THRESHOLD) onSelect(next.id)
  }

  return (
    <Dialog open={!!current} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        onKeyDown={handleKeyDown}
        className="flex h-dvh w-screen max-w-none flex-col gap-0 rounded-none border-0 bg-mata-950/97 p-0 text-white shadow-none sm:max-w-none"
      >
        {current && (
          <>
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <p className="text-sm font-semibold text-white/70 tabular-nums">
                {index + 1} / {items.length}
              </p>
              <DialogClose
                aria-label="Fechar galeria"
                className="grid size-11 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
              >
                <X className="size-6" />
              </DialogClose>
            </div>

            <div
              className="relative min-h-0 flex-1 px-2 sm:px-20"
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0].clientX
              }}
              onTouchEnd={handleTouchEnd}
            >
              <LightboxMedia key={current.id} item={current} />

              {items.length > 1 && (
                <>
                  <NavButton
                    direction="prev"
                    label={`Anterior: ${prev.title}`}
                    onClick={() => onSelect(prev.id)}
                  />
                  <NavButton
                    direction="next"
                    label={`Próxima: ${next.title}`}
                    onClick={() => onSelect(next.id)}
                  />
                </>
              )}
            </div>

            <div className="px-4 pt-4 pb-5 text-center sm:px-6">
              <DialogTitle className="font-display text-lg font-semibold text-white sm:text-xl">
                {current.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {current.alt}
              </DialogDescription>

              <ul
                aria-label="Miniaturas"
                className="mx-auto mt-4 hidden max-w-full justify-center gap-2 overflow-x-auto pb-1 sm:flex"
              >
                {items.map((item) => (
                  <li key={item.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => onSelect(item.id)}
                      aria-label={`Ver ${item.title}`}
                      aria-current={item.id === current.id}
                      className={cn(
                        'block size-14 overflow-hidden rounded-md ring-2 transition focus-visible:outline-none',
                        item.id === current.id
                          ? 'opacity-100 ring-sol-400'
                          : 'opacity-50 ring-transparent hover:opacity-90 focus-visible:ring-white/60',
                      )}
                    >
                      <img
                        src={item.thumb}
                        alt=""
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function LightboxMedia({ item }: { item: GalleryItem }) {
  const { status, onLoad, onError } = useMediaStatus()

  return (
    <div className="flex h-full items-center justify-center">
      {status === 'loading' && (
        <LoaderCircle
          aria-label="Carregando"
          className="absolute size-10 animate-spin text-white/60"
        />
      )}

      {status === 'error' ? (
        <div className="flex flex-col items-center gap-3 text-center text-white/80">
          <ImageOff className="size-10" />
          <p className="font-semibold">Não foi possível carregar esta mídia.</p>
          <p className="text-sm text-white/60">
            Verifique sua conexão e tente novamente.
          </p>
        </div>
      ) : item.type === 'video' ? (
        <video
          src={item.src}
          poster={item.thumb}
          controls
          autoPlay
          playsInline
          onLoadedData={onLoad}
          onError={onError}
          className="max-h-full max-w-full rounded-lg bg-black"
        >
          {item.alt}
        </video>
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          onLoad={onLoad}
          onError={onError}
          className={cn(
            'max-h-full max-w-full rounded-lg object-contain transition-opacity duration-300 select-none',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
    </div>
  )
}

function NavButton({
  direction,
  label,
  onClick,
}: {
  direction: 'prev' | 'next'
  label: string
  onClick: () => void
}) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none sm:size-12',
        direction === 'prev' ? 'left-2 sm:left-5' : 'right-2 sm:right-5',
      )}
    >
      <Icon className="size-6" />
    </button>
  )
}
