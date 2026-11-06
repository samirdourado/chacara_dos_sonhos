import { useRef } from 'react'
import { ImageOff, Play } from 'lucide-react'

import type { GalleryItem } from '@/config/gallery'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useMediaStatus } from '@/hooks/use-media-status'
import { cn } from '@/lib/utils'

type GalleryTileProps = {
  item: GalleryItem
  onOpen: (id: string) => void
}

export function GalleryTile({ item, onOpen }: GalleryTileProps) {
  const { status, onLoad, onError } = useMediaStatus()
  const previewRef = useRef<HTMLVideoElement>(null)
  // Prévia do vídeo só em dispositivos com mouse e sem preferência por menos movimento
  const canPreview = useMediaQuery(
    '(hover: hover) and (prefers-reduced-motion: no-preference)',
  )
  const isVideo = item.type === 'video'
  const showPreview = isVideo && canPreview && status !== 'error'

  function startPreview() {
    previewRef.current?.play().catch(() => {})
  }

  function stopPreview() {
    const video = previewRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(item.id)}
      onMouseEnter={showPreview ? startPreview : undefined}
      onMouseLeave={showPreview ? stopPreview : undefined}
      aria-label={`Abrir ${isVideo ? 'vídeo' : 'foto'}: ${item.title}`}
      className="group relative block aspect-square w-full overflow-hidden rounded-md bg-mata-100 outline-none focus-visible:ring-4 focus-visible:ring-mata-500/60 sm:rounded-xl"
    >
      {status === 'loading' && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-linear-to-br from-mata-100 to-mata-50"
        />
      )}

      {status === 'error' ? (
        <span className="absolute inset-0 grid place-content-center justify-items-center gap-2 p-2 text-center text-xs font-semibold text-mata-700">
          <ImageOff className="size-6" />
          Mídia indisponível
        </span>
      ) : (
        <img
          src={item.thumb}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          onLoad={onLoad}
          onError={onError}
          className={cn(
            'size-full object-cover transition duration-700 ease-out group-hover:scale-105',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}

      {showPreview && (
        <video
          ref={previewRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}

      {isVideo && (
        <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-mata-950/60 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-sm sm:top-3 sm:right-3">
          <Play className="size-3 fill-current" />
          {item.duration}
        </span>
      )}

      {/* legenda no hover — no celular a grade fica limpa, como no Instagram */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-2 bg-linear-to-t from-mata-950/80 to-transparent px-4 pt-10 pb-3 text-left text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:block">
        {item.title}
      </span>
    </button>
  )
}
