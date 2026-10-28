import { MapPin, Navigation } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { site } from '@/config/site'

export function Location() {
  return (
    <section
      id="localizacao"
      aria-labelledby="localizacao-title"
      className="scroll-mt-20 bg-white py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionHeading
            id="localizacao-title"
            align="left"
            eyebrow="Localização"
            title="Pertinho da cidade, longe da correria"
            description={`Estamos no bairro ${site.address.district}, em ${site.address.city}.`}
          />

          <address className="mt-8 flex gap-4 rounded-2xl border border-mata-100 bg-creme p-5 not-italic">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-telha-100 text-telha-500">
              <MapPin className="size-5" />
            </span>
            <span className="leading-relaxed text-foreground/85">
              <strong className="block text-mata-900">
                {site.address.street}
              </strong>
              {site.address.district}
              <br />
              {site.address.city} - {site.address.state} · CEP{' '}
              {site.address.zip}
            </span>
          </address>

          <Button
            asChild
            size="lg"
            className="mt-6 h-12 rounded-full px-7 text-base"
          >
            <a href={site.address.mapsUrl} target="_blank" rel="noreferrer">
              <Navigation className="size-5" />
              Como chegar
            </a>
          </Button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-mata-100 bg-mata-50 shadow-[0_30px_60px_-30px_rgb(29_63_35/0.35)]">
          <iframe
            title={`Mapa: ${site.address.full}`}
            src={site.address.embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-4/3 w-full border-0 sm:aspect-16/10"
          />
        </div>
      </div>
    </section>
  )
}
