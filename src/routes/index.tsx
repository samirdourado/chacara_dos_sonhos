import { createFileRoute } from '@tanstack/react-router'

import { ContactCta } from '@/components/sections/contact-cta'
import { Events } from '@/components/sections/events'
import { Hero } from '@/components/sections/hero'
import { HowToBook } from '@/components/sections/how-to-book'
import { Location } from '@/components/sections/location'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <Hero />
      <Events />
      <HowToBook />
      <Location />
      <ContactCta />
    </>
  )
}
