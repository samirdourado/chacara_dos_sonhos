import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'

import logo from '@/assets/logo.webp'
import { WhatsAppIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { navItems, site, whatsappLink } from '@/config/site'

const quoteMessage = 'Olá! Gostaria de fazer um orçamento para um evento.'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <Link to="/" className="shrink-0" aria-label={`${site.name} — início`}>
          <img
            src={logo}
            alt={site.name}
            width={1716}
            height={509}
            className="h-11 w-auto sm:h-14"
          />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.hash}>
                <Link
                  to="/"
                  hash={item.hash}
                  className="text-[15px] font-semibold text-foreground/75 transition-colors hover:text-mata-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="lg"
            className="hidden rounded-full sm:inline-flex"
          >
            <a
              href={whatsappLink(quoteMessage)}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon />
              Pedir orçamento
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                className="md:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] max-w-sm bg-creme">
              <SheetHeader>
                <SheetTitle className="font-display text-xl text-mata-900">
                  {site.name}
                </SheetTitle>
                <SheetDescription>{site.tagline}</SheetDescription>
              </SheetHeader>
              <nav aria-label="Menu mobile" className="px-4">
                <ul className="flex flex-col">
                  {navItems.map((item) => (
                    <li key={item.hash}>
                      <Link
                        to="/"
                        hash={item.hash}
                        onClick={() => setOpen(false)}
                        className="block border-b border-border py-4 text-lg font-semibold text-mata-900"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="mt-6 w-full rounded-full">
                  <a
                    href={whatsappLink(quoteMessage)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsAppIcon />
                    Pedir orçamento
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
