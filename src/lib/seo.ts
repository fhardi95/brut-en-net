import type { Metadata } from 'next'

export const SITE_NAME = 'SalaireBrutNet.fr'
export const SITE_URL = 'https://www.salairebruten.fr'
export const SITE_DESCRIPTION = 'Calculateur salaire brut en net 2026 gratuit et précis pour la France. Conversion brut net avec cotisations sociales, impôt sur le revenu et prime d\'activité. Résultat instantané.'

export function buildMetadata({
  title,
  description,
  path = '',
  keywords = [],
}: {
  title: string
  description: string
  path?: string
  keywords?: string[]
}): Metadata {
  const url = `${SITE_URL}${path}`
  return {
    title: {
      absolute: title,
    },
    description,
    keywords: keywords.join(', '),
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}

export function buildJsonLd(data: object) {
  return JSON.stringify({ '@context': 'https://schema.org', ...data })
}
