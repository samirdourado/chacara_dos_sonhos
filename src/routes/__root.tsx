import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { Button } from '@/components/ui/button'
import { WhatsAppFloat } from '@/components/whatsapp-float'

import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">
        <Outlet />
      </main>
      <SiteFooter />
      <WhatsAppFloat />

      {import.meta.env.DEV && (
        <TanStackDevtools
          config={{ position: 'bottom-left' }}
          plugins={[
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      )}
    </>
  )
}

function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
      <p className="text-sm font-bold tracking-[0.18em] text-mata-600 uppercase">
        Erro 404
      </p>
      <h1 className="mt-3 text-4xl font-semibold text-mata-900">
        Essa trilha não leva a lugar nenhum
      </h1>
      <p className="mt-4 text-muted-foreground">
        A página que você procura não existe ou foi movida.
      </p>
      <Button asChild size="lg" className="mt-8 rounded-full">
        <Link to="/">Voltar para o início</Link>
      </Button>
    </section>
  )
}
