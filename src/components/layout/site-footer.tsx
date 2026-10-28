import { MapPin, Phone } from 'lucide-react'

import logo from '@/assets/logo.webp'
import { InstagramIcon } from '@/components/icons'
import { site } from '@/config/site'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-creme">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img
            src={logo}
            alt={site.name}
            width={1716}
            height={509}
            loading="lazy"
            className="h-14 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {site.tagline}.
          </p>
        </div>

        <div>
          <h3 className="font-sans text-sm font-bold tracking-wider text-mata-800 uppercase">
            Contato
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={site.phone.tel}
                className="inline-flex items-center gap-2 text-foreground/80 hover:text-mata-700"
              >
                <Phone className="size-4 text-mata-600" />
                {site.phone.display}
              </a>
            </li>
            <li>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-foreground/80 hover:text-mata-700"
              >
                <InstagramIcon className="size-4 text-mata-600" />
                {site.instagram.handle}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-sm font-bold tracking-wider text-mata-800 uppercase">
            Endereço
          </h3>
          <address className="mt-4 flex gap-2 text-sm text-foreground/80 not-italic">
            <MapPin className="mt-0.5 size-4 shrink-0 text-mata-600" />
            <span>
              {site.address.street}
              <br />
              {site.address.district}
              <br />
              {site.address.city} - {site.address.state}, {site.address.zip}
            </span>
          </address>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
          © {year} {site.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
