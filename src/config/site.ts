import type { LucideIcon } from 'lucide-react'
import { Briefcase, Cake, Baby, Heart } from 'lucide-react'

const phoneDigits = '11974225123'

const address = {
  street: 'Rua Gralha, 680',
  district: 'Chácara do Rosário',
  city: 'Franco da Rocha',
  state: 'SP',
  zip: '07810-720',
}

const fullAddress = `${address.street} - ${address.district}, ${address.city} - ${address.state}, ${address.zip}`

export const site = {
  name: 'Chácara dos Sonhos',
  tagline: 'Espaço para eventos e confraternizações em Franco da Rocha',
  instagram: {
    handle: '@chacarasonhos680',
    url: 'https://www.instagram.com/chacarasonhos680/',
  },
  phone: {
    display: '(11) 97422-5123',
    tel: `tel:+55${phoneDigits}`,
    whatsapp: `55${phoneDigits}`,
  },
  address: {
    ...address,
    full: fullAddress,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
    embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`,
  },
} as const

export type EventType = {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export const eventTypes: Array<EventType> = [
  {
    id: 'aniversario',
    title: 'Aniversário',
    description:
      'Do primeiro aninho às bodas: festa ao ar livre, piscina e espaço para a família toda.',
    icon: Cake,
  },
  {
    id: 'cha-de-bebe',
    title: 'Chá de bebê',
    description:
      'Um cenário verde e tranquilo para receber quem você ama e celebrar quem está chegando.',
    icon: Baby,
  },
  {
    id: 'cerimonias',
    title: 'Cerimônias',
    description:
      'Casamentos, batizados e renovações de votos em meio à natureza, com o sol como testemunha.',
    icon: Heart,
  },
  {
    id: 'equipes',
    title: 'Almoço e jantar de equipes',
    description:
      'Confraternização da empresa longe do escritório, com espaço para integrar o time.',
    icon: Briefcase,
  },
]

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.phone.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const navItems = [
  { hash: 'eventos', label: 'Eventos' },
  { hash: 'como-reservar', label: 'Como reservar' },
  { hash: 'localizacao', label: 'Localização' },
] as const
