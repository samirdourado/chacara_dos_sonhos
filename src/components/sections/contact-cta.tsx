import { Phone } from 'lucide-react'

import { WhatsAppIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { site, whatsappLink } from '@/config/site'

export function ContactCta() {
  return (
    <section
      aria-labelledby="contato-title"
      className="bg-white px-4 pb-20 sm:px-6 sm:pb-28"
    >
      <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl bg-mata-700 px-6 py-14 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-16 -z-10 size-64 rounded-full bg-sol-400/90"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-20 -z-10 size-72 rounded-full bg-mata-600"
        />

        <h2
          id="contato-title"
          className="mx-auto max-w-2xl text-3xl font-semibold text-white text-balance sm:text-5xl"
        >
          Vamos garantir a sua data?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-mata-100">
          A agenda está aberta. Chame a gente no WhatsApp e receba seu
          orçamento.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-white px-7 text-base text-mata-800 hover:bg-mata-50"
          >
            <a
              href={whatsappLink(
                'Olá! Gostaria de verificar datas disponíveis.',
              )}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon className="size-5 text-whatsapp" />
              Falar no WhatsApp
            </a>
          </Button>
          <a
            href={site.phone.tel}
            className="inline-flex items-center gap-2 px-4 py-3 text-base font-semibold text-white/90 hover:text-white"
          >
            <Phone className="size-4" />
            {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  )
}
