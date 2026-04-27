import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://www.salairebruten.fr/sitemap.xml',
    host: 'https://www.salairebruten.fr',
  }
}
