import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Services from '@/components/sections/Services'
import Journey from '@/components/sections/Journey'
import Stack from '@/components/sections/Stack'
import Work from '@/components/sections/Work'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <Journey />
      <Stack />
      <Work />
      <Testimonials />
      <Contact />
    </main>
  )
}
