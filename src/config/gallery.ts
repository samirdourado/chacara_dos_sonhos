// Mídias otimizadas geradas por `npm run media:optimize` (ver scripts/optimize-media.mjs).
// img-01…05 são cópias em baixa resolução de img-10…14, por isso não entram aqui.
import decoracaoGirassois from '@/assets/gallery/img-10.webp'
import decoracaoGirassoisThumb from '@/assets/gallery/img-10-thumb.webp'
import varanda from '@/assets/gallery/img-11.webp'
import varandaThumb from '@/assets/gallery/img-11-thumb.webp'
import espacoKids from '@/assets/gallery/img-12.webp'
import espacoKidsThumb from '@/assets/gallery/img-12-thumb.webp'
import piscina from '@/assets/gallery/img-13.webp'
import piscinaThumb from '@/assets/gallery/img-13-thumb.webp'
import salao from '@/assets/gallery/img-14.webp'
import salaoThumb from '@/assets/gallery/img-14-thumb.webp'
import festaInfantil from '@/assets/gallery/img-06.webp'
import festaInfantilThumb from '@/assets/gallery/img-06-thumb.webp'
import buffet from '@/assets/gallery/img-07.webp'
import buffetThumb from '@/assets/gallery/img-07-thumb.webp'
import mesasAzuis from '@/assets/gallery/img-08.webp'
import mesasAzuisThumb from '@/assets/gallery/img-08-thumb.webp'
import mesaDeDoces from '@/assets/gallery/img-09.webp'
import mesaDeDocesThumb from '@/assets/gallery/img-09-thumb.webp'
import tourSalao from '@/assets/gallery/video-01.mp4'
import tourSalaoPoster from '@/assets/gallery/video-01-poster.webp'
import tourChacara from '@/assets/gallery/video-02.mp4'
import tourChacaraPoster from '@/assets/gallery/video-02-poster.webp'
import tourVaranda from '@/assets/gallery/video-03.mp4'
import tourVarandaPoster from '@/assets/gallery/video-03-poster.webp'

export const galleryCategories = [
  { id: 'todos', label: 'Tudo' },
  { id: 'espaco', label: 'O espaço' },
  { id: 'festas', label: 'Festas' },
  { id: 'videos', label: 'Vídeos' },
] as const

export type GalleryCategory = (typeof galleryCategories)[number]['id']

type GalleryItemBase = {
  /** Usado na URL (?midia=) para abrir o item direto no lightbox */
  id: string
  title: string
  alt: string
  category: Exclude<GalleryCategory, 'todos' | 'videos'>
  thumb: string
}

export type GalleryImage = GalleryItemBase & {
  type: 'image'
  src: string
}

export type GalleryVideo = GalleryItemBase & {
  type: 'video'
  src: string
  /** Duração exibida na miniatura, ex.: "0:19" */
  duration: string
}

export type GalleryItem = GalleryImage | GalleryVideo

export const galleryItems: Array<GalleryItem> = [
  {
    id: 'piscina',
    type: 'image',
    category: 'espaco',
    title: 'Piscinas adulto e infantil',
    alt: 'Piscina adulto e piscina infantil ao ar livre, com a mata ao fundo e céu azul',
    src: piscina,
    thumb: piscinaThumb,
  },
  {
    id: 'salao',
    type: 'image',
    category: 'espaco',
    title: 'Salão de festas',
    alt: 'Salão coberto com mesas montadas e toalhas brancas e lilás',
    src: salao,
    thumb: salaoThumb,
  },
  {
    id: 'decoracao-girassois',
    type: 'image',
    category: 'festas',
    title: 'Decoração com girassóis',
    alt: 'Mesa de bolo com arco de balões dourados e brancos e arranjos de girassóis sobre painel verde',
    src: decoracaoGirassois,
    thumb: decoracaoGirassoisThumb,
  },
  {
    id: 'tour-chacara',
    type: 'video',
    category: 'espaco',
    title: 'Tour pela chácara',
    alt: 'Vídeo percorrendo a chácara: estacionamento, piscinas, varanda, salão e espaço kids',
    src: tourChacara,
    thumb: tourChacaraPoster,
    duration: '0:33',
  },
  {
    id: 'varanda',
    type: 'image',
    category: 'espaco',
    title: 'Varanda com vista para a mata',
    alt: 'Varanda coberta com mesas e cadeiras e janelas amplas com vista para as árvores',
    src: varanda,
    thumb: varandaThumb,
  },
  {
    id: 'espaco-kids',
    type: 'image',
    category: 'espaco',
    title: 'Espaço kids e sinuca',
    alt: 'Área de lazer com brinquedos infantis, pula-pula, escorregador e mesa de sinuca',
    src: espacoKids,
    thumb: espacoKidsThumb,
  },
  {
    id: 'festa-infantil',
    type: 'image',
    category: 'festas',
    title: 'Festa infantil temática',
    alt: 'Mesa de festa infantil com tema de desenho animado, arco de balões coloridos e cilindros decorados',
    src: festaInfantil,
    thumb: festaInfantilThumb,
  },
  {
    id: 'tour-salao',
    type: 'video',
    category: 'festas',
    title: 'Salão decorado para evento',
    alt: 'Vídeo mostrando o salão montado com mesas decoradas em lilás e a mesa do bolo',
    src: tourSalao,
    thumb: tourSalaoPoster,
    duration: '0:19',
  },
  {
    id: 'mesa-de-doces',
    type: 'image',
    category: 'festas',
    title: 'Mesa de doces',
    alt: 'Mesa de doces com forminhas azuis, balões azuis e brancos e arranjo de flores',
    src: mesaDeDoces,
    thumb: mesaDeDocesThumb,
  },
  {
    id: 'mesas-azuis',
    type: 'image',
    category: 'festas',
    title: 'Recepção em azul',
    alt: 'Mesas com toalhas azuis montadas na varanda, com vista para a mata',
    src: mesasAzuis,
    thumb: mesasAzuisThumb,
  },
  {
    id: 'buffet',
    type: 'image',
    category: 'festas',
    title: 'Buffet e bebidas',
    alt: 'Mesa de buffet com réchauds e dispensers de suco e água',
    src: buffet,
    thumb: buffetThumb,
  },
  {
    id: 'tour-varanda',
    type: 'video',
    category: 'espaco',
    title: 'Varanda e área de jogos',
    alt: 'Vídeo percorrendo a varanda com mesas montadas e a mesa de sinuca',
    src: tourVaranda,
    thumb: tourVarandaPoster,
    duration: '0:20',
  },
]

export function filterGallery(category: GalleryCategory) {
  if (category === 'todos') return galleryItems
  if (category === 'videos') {
    return galleryItems.filter((item) => item.type === 'video')
  }
  return galleryItems.filter((item) => item.category === category)
}

export function isGalleryCategory(value: unknown): value is GalleryCategory {
  return galleryCategories.some((category) => category.id === value)
}
