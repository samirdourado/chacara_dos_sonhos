import { CalendarCheck, MessageCircle, PartyPopper } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'

const steps = [
  {
    icon: MessageCircle,
    title: 'Chame no WhatsApp',
    description:
      'Conte o tipo de evento, a data desejada e o número de convidados.',
  },
  {
    icon: CalendarCheck,
    title: 'Receba o orçamento',
    description:
      'Confirmamos a disponibilidade da agenda e enviamos os valores.',
  },
  {
    icon: PartyPopper,
    title: 'É só celebrar',
    description:
      'Data reservada! Agora é chegar, aproveitar e criar boas memórias.',
  },
]

export function HowToBook() {
  return (
    <section
      id="como-reservar"
      aria-labelledby="como-reservar-title"
      className="scroll-mt-20 bg-mata-50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="como-reservar-title"
          eyebrow="Como reservar"
          title="Reservar é simples"
          description="Em três passos sua data está garantida."
        />

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => (
            <li key={step.title} className="relative text-center">
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-8 left-[calc(50%+3rem)] hidden h-px w-[calc(100%-6rem)] border-t-2 border-dashed border-mata-300 md:block"
                />
              )}
              <span className="relative mx-auto grid size-16 place-items-center rounded-full bg-white text-mata-700 shadow-sm ring-1 ring-mata-200">
                <step.icon className="size-7" />
                <span className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-sol-400 text-xs font-extrabold text-sol-800">
                  {index + 1}
                </span>
              </span>
              <h3 className="mt-5 text-xl font-semibold text-mata-900">
                {step.title}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
