import { useCallback, useState } from 'react'

export type MediaStatus = 'loading' | 'loaded' | 'error'

/**
 * Acompanha o carregamento de um <img> ou <video>.
 * Para reiniciar ao trocar de mídia, monte o componente com uma `key` diferente.
 */
export function useMediaStatus() {
  const [status, setStatus] = useState<MediaStatus>('loading')

  const onLoad = useCallback(() => setStatus('loaded'), [])
  const onError = useCallback(() => setStatus('error'), [])

  return { status, onLoad, onError }
}
