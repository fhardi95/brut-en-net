import type { Metadata } from 'next'
import LicenciementCalculator from './LicenciementCalculator'
import { buildJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Calcul Indemnité de Licenciement 2026 — Simulateur Gratuit',
  description: 'Calculez votre indemnité légale de licenciement selon la loi française 2026. Formule officielle basée sur votre ancienneté, salaire de référence et motif de rupture. Résultat immédiat.',
  keywords: 'calcul indemnité licenciement, indemnité licenciement 2026, simulateur indemnité licenciement, indemnité légale licenciement France, montant indemnité licenciement',
  alternates: { canonical: 'https://www.salairebruten.fr/outils/calcul-indemnite-licenciement' },
  openGraph: {
    title: 'Calcul Indemnité de Licenciement 2026 — Simulateur Gratuit',
    description: 'Calculez votre indemnité légale de licenciement en quelques secondes. Formule officielle 2026.',
    url: 'https://www.salairebruten.fr/outils/calcul-indemnite-licenciement',
    type: 'website',
    locale: 'fr_FR',
  },
}

const jsonLd = buildJsonLd({
  '@type': 'WebApplication',
  name: 'Calculateur Indemnité de Licenciement 2026',
  url: 'https://www.salairebruten.fr/outils/calcul-indemnite-licenciement',
  applicationCategory: 'FinanceApplication',
  description: 'Outil gratuit pour calculer l\'indemnité légale de licenciement en France selon les barèmes 2026.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  inLanguage: 'fr',
})

const jsonLdFaq = buildJsonLd({
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment calculer l\'indemnité de licenciement ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L\'indemnité légale de licenciement est calculée selon la formule : 1/4 de mois de salaire de référence par année d\'ancienneté pour les 10 premières années, puis 1/3 de mois par année au-delà. Le salaire de référence est le plus favorable entre la moyenne des 12 derniers mois et celle des 3 derniers mois.',
      },
    },
    {
      '@type': 'Question',
      name: 'À partir de quelle ancienneté a-t-on droit à l\'indemnité de licenciement ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Depuis septembre 2017, le seuil d\'ancienneté pour bénéficier de l\'indemnité légale de licenciement est de 8 mois de travail effectif. Avant la loi Travail, ce seuil était d\'un an.',
      },
    },
    {
      '@type': 'Question',
      name: 'L\'indemnité de licenciement est-elle imposable ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L\'indemnité légale de licenciement est exonérée d\'impôt sur le revenu. En cas d\'indemnité supra-légale (supérieure au minimum légal), seule la partie excédant certains plafonds est imposable.',
      },
    },
  ],
})

export default function LicenciementPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(160deg, #fff7ed 0%, #f8fafc 60%)',
        borderBottom: '1px solid var(--gray-200)',
        padding: '50px 20px 40px',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 12 }}>
            <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</a> › Outils › Indemnité de licenciement
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: '#fff3cd', border: '1px solid #ffd966', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, color: '#92400e', marginBottom: 16 }}>
            ⚖️ Barèmes officiels 2026
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--gray-900)', lineHeight: 1.2, marginBottom: 16 }}>
            Calcul Indemnité de Licenciement 2026
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '1rem', maxWidth: 600, lineHeight: 1.7 }}>
            Calculez votre indemnité légale de licenciement selon la formule officielle du Code du travail. Résultat immédiat basé sur votre ancienneté et salaire de référence.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <LicenciementCalculator />

      {/* Content SEO */}
      <section style={{ padding: '60px 20px', background: 'white', borderTop: '1px solid var(--gray-100)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gray-900)', marginBottom: 20 }}>
            Comment est calculée l'indemnité de licenciement ?
          </h2>
          <div className="prose-content">
            <h3>La formule légale (Code du travail, Art. R1234-2)</h3>
            <p>L'indemnité légale de licenciement est calculée selon une double formule progressive :</p>
            <ul>
              <li><strong>1/4 de mois</strong> de salaire de référence × nombre d'années pour les <strong>10 premières années</strong></li>
              <li><strong>1/3 de mois</strong> de salaire de référence × nombre d'années au-delà des 10 ans</li>
            </ul>

            <h3>Le salaire de référence</h3>
            <p>Le salaire pris en compte est le <strong>plus favorable</strong> entre :</p>
            <ul>
              <li>La moyenne des 12 derniers mois précédant le licenciement</li>
              <li>1/3 des 3 derniers mois (+ primes et accessoires au prorata)</li>
            </ul>

            <h3>Conditions d'éligibilité</h3>
            <p>Vous avez droit à l'indemnité légale de licenciement si vous justifiez d'au moins <strong>8 mois d'ancienneté</strong> chez le même employeur (depuis l'ordonnance Macron de 2017). Le licenciement ne doit pas être pour faute grave ou lourde.</p>

            <h3>Fiscalité de l'indemnité</h3>
            <p>L'indemnité légale de licenciement est totalement exonérée d'impôt sur le revenu et de cotisations sociales. Les indemnités conventionnelles supérieures au minimum légal bénéficient également d'une exonération dans certaines limites.</p>
          </div>
        </div>
      </section>
    </>
  )
}
