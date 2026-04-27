import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.salairebruten.fr'),
  title: {
    template: '%s | SalaireBrutNet.fr',
    default: 'Calculateur Salaire Brut en Net 2026 — Conversion Gratuite France',
  },
  description: 'Calculez votre salaire brut en net en quelques secondes. Outil gratuit, barèmes 2026 officiels, cotisations salariales, impôt sur le revenu et coût employeur pour la France.',
  keywords: 'brut en net, brut en net calcul, brut en net France, brut en net salaire, brut net conversion, calculatrice salaire brut net, conversion brut net, salaire brut en net',
  authors: [{ name: 'SalaireBrutNet.fr' }],
  creator: 'SalaireBrutNet.fr',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'SalaireBrutNet.fr',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
