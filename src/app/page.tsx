import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FlavorExperience from '@/components/FlavorExperience'
import ProductShowcase from '@/components/ProductShowcase'
import About from '@/components/About'
import HowToOrder from '@/components/HowToOrder'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <FlavorExperience />
      <ProductShowcase />
      <About />
      <HowToOrder />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
