import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mocemilanko - Cemilan Rasa Asyik 🌶️🧀',
  description: 'Banyak Rasa, Banyak Cerita! Mocemilanko menghadirkan cemilan lezat dengan berbagai pilihan rasa yang menggugah selera - dari pedas, gurih, hingga manis. Pesan sekarang via WhatsApp!',
  keywords: ['cemilan', 'snack', 'basreng', 'mie lidi', 'Indonesia'],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://mocemilanko.com',
    title: 'Mocemilanko - Cemilan Rasa Asyik',
    description: 'Banyak Rasa, Banyak Cerita! Cemilan lezat dengan berbagai pilihan rasa.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
        {children}
      </body>
    </html>
  )
}
