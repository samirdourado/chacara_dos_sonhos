import { WhatsAppIcon } from '@/components/icons'
import { whatsappLink } from '@/config/site'

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink('Olá! Vim pelo site e gostaria de um orçamento.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg ring-4 ring-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mata-700 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  )
}
