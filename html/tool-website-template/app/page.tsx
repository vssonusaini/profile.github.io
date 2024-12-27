import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Features } from '@/components/Features'
import { Pricing } from '@/components/Pricing'
import { ToolsListWithFilter } from '@/components/ToolsListWithFilter'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Features />
        <Pricing />
        <ToolsListWithFilter />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

