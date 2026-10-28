import { CalendarHeart, MapPin } from 'lucide-react'

import { InstagramIcon, WhatsAppIcon } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { eventTypes, site, whatsappLink } from '@/config/site'

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-linear-to-b from-mata-50 via-white to-white"
    >
      <HeroBackdrop />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-14 pb-20 sm:px-6 md:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pb-28">
        <div>
          <Badge
            variant="outline"
            className="gap-1.5 rounded-full border-sol-300 bg-sol-100 px-3 py-1 text-sm font-semibold text-sol-800"
          >
            <span aria-hidden="true">🌼</span> Agenda aberta para
            confraternizações
          </Badge>

          <h1
            id="hero-title"
            className="mt-6 text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-mata-900 text-balance sm:text-6xl"
          >
            Seu dia especial,{' '}
            <span className="relative whitespace-nowrap text-mata-600 italic">
              cercado de verde
              <LeafUnderline className="absolute -bottom-2 left-0 w-full text-broto-500" />
            </span>
            .
          </h1>

          <p className="mt-7 max-w-xl text-lg text-muted-foreground text-pretty sm:text-xl">
            Piscina, gramado e sombra de árvore para aniversários, chás de bebê,
            cerimônias e confraternizações de equipe em Franco da Rocha.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full px-7 text-base"
            >
              <a
                href={whatsappLink(
                  'Olá! Gostaria de fazer um orçamento para um evento na Chácara dos Sonhos.',
                )}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon className="size-5" />
                Pedir orçamento
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-mata-200 px-7 text-base text-mata-800 hover:bg-mata-50 hover:text-mata-900"
            >
              <a href={site.instagram.url} target="_blank" rel="noreferrer">
                <InstagramIcon className="size-5" />
                Ver fotos no Instagram
              </a>
            </Button>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <MapPin className="size-4 text-telha-500" />
            {site.address.district} · {site.address.city} - {site.address.state}
          </p>
        </div>

        <InvitationCard />
      </div>
    </section>
  )
}

function InvitationCard() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:mr-0">
      {/* sol */}
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-6 size-32 rounded-full bg-radial from-sol-300 to-sol-400 opacity-90 blur-[1px] sm:size-40"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-6 -left-6 size-28 rounded-full bg-broto-300/50 blur-2xl"
      />

      <div className="relative rotate-[1.5deg] rounded-3xl bg-white p-3 shadow-[0_30px_60px_-20px_rgb(29_63_35/0.35)] ring-1 ring-mata-100 transition-transform duration-500 hover:rotate-0">
        <div className="rounded-3xl border-2 border-dashed border-mata-200 px-6 py-8 sm:px-8">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-telha-500 uppercase">
            <CalendarHeart className="size-4" />
            Você está convidado
          </p>
          <p className="mt-3 font-display text-3xl font-semibold text-mata-900">
            Agenda aberta
          </p>

          <ul className="mt-6 space-y-4">
            {eventTypes.map((event) => (
              <li key={event.id} className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mata-50 text-mata-700">
                  <event.icon className="size-5" />
                </span>
                <span className="font-semibold text-foreground/85">
                  {event.title}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-dashed border-mata-200 pt-5">
            <p className="text-sm text-muted-foreground">Orçamento</p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center gap-2 text-xl font-bold text-mata-700 hover:text-mata-800"
            >
              <WhatsAppIcon className="size-5 text-whatsapp" />
              {site.phone.display}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div className="absolute -top-40 -left-40 size-128 rounded-full bg-mata-100/60 blur-3xl" />
      <div className="absolute top-20 -right-40 size-104 rounded-full bg-sol-100/70 blur-3xl" />
      {/* colina no rodapé do hero */}
      <svg
        className="absolute bottom-0 left-0 h-24 w-full text-white"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0 64c160-32 320-48 480-40s320 40 480 40 320-24 480-40v72H0z"
        />
      </svg>
    </div>
  )
}

function LeafUnderline({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 12"
      preserveAspectRatio="none"
      className={className}
    >
      <path
        d="M2 9C80 2 200 1 298 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}
