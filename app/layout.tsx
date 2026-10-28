import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

const bricolage = localFont({
  variable: '--font-bricolage',
  display: 'swap',
  src: [
    { path: './fonts/bricolage-grotesque-latin-wght-normal.woff2', weight: '200 800' },
    { path: './fonts/bricolage-grotesque-latin-ext-wght-normal.woff2', weight: '200 800' },
  ],
})

const plexMono = localFont({
  variable: '--font-plex-mono',
  display: 'swap',
  src: [
    { path: './fonts/ibm-plex-mono-latin-400-normal.woff2', weight: '400' },
    { path: './fonts/ibm-plex-mono-latin-500-normal.woff2', weight: '500' },
  ],
})

export const metadata: Metadata = {
  title: 'Gota — Fragancias por mililitro en El Poblado, Medellín',
  description:
    'Fragancias propias en 5, 30 y 100 ml. Pruebe en 5 ml antes de comprar el frasco. Pedidos por WhatsApp con envío en Medellín.',
}

export const viewport: Viewport = {
  themeColor: '#f1efea',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO" className={`${bricolage.variable} ${plexMono.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
