import { ArrowUpRight } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { EventType } from '@/config/site'
import { eventTypes, whatsappLink } from '@/config/site'

export function Events() {
  return (
    <section
      id="eventos"
      aria-labelledby="eventos-title"
      className="scroll-mt-20 bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="eventos-title"
          eyebrow="Eventos"
          title="Um espaço, muitas comemorações"
          description="Seja qual for o motivo para reunir as pessoas que importam, a chácara se adapta ao seu evento."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {eventTypes.map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function EventCard({ event }: { event: EventType }) {
  return (
    <Card className="group h-full gap-4 rounded-2xl border-mata-100 bg-creme shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-mata-200 hover:bg-white hover:shadow-[0_20px_40px_-20px_rgb(29_63_35/0.3)]">
      <CardHeader className="gap-4">
        <span className="grid size-12 place-items-center rounded-xl bg-mata-700 text-white transition-colors group-hover:bg-broto-500">
          <event.icon className="size-6" />
        </span>
        <CardTitle className="font-display text-xl font-semibold text-mata-900">
          {event.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-6">
        <CardDescription className="text-[15px] leading-relaxed">
          {event.description}
        </CardDescription>
        <a
          href={whatsappLink(
            `Olá! Gostaria de um orçamento para ${event.title.toLowerCase()} na Chácara dos Sonhos.`,
          )}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm font-bold text-mata-700 hover:text-mata-900"
        >
          Consultar datas
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <span className="sr-only"> para {event.title}</span>
        </a>
      </CardContent>
    </Card>
  )
}
