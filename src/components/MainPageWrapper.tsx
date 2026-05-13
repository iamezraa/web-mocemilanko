'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FlavorExperience from '@/components/FlavorExperience'
import NewProductShowcase from '@/components/NewProductShowcase'
import About from '@/components/About'
import HowToOrder from '@/components/HowToOrder'
import Testimonials from '@/components/Testimonials'
import InstagramConnect from '@/components/InstagramConnect'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import CartButton from '@/components/CartButton'

export default function MainPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isCartOpen])

  return (
    <main>
      <Header cartButton={<CartButton onClick={() => setIsCartOpen(true)} />} />
      <Hero />
      <FlavorExperience />
      <NewProductShowcase />
      <About />
      <HowToOrder />
      <Testimonials />
      <InstagramConnect />
      <CTA />
      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  )
}
