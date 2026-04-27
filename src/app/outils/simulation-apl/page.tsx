import type { Metadata } from 'next'
import AplCalculator from './AplCalculator'
import { buildJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Simulation APL 2026 — Calculateur Aide au Logement Gratuit',
  description: 'Simulez votre APL, ALS ou ALF en 2026. Estimez votre aide au logement CAF selon vos revenus, votre loyer, votre situation familiale et votre zone géographique. Résultat immédiat.',
  keywords: 'simulation APL, calculer APL 2026, aide au logement CAF, simulateur APL, montant APL, ALS ALF calcul France',
  alternates: { canonical: 'https://www.salairebruten.fr/outils/simulation-apl' },
  openGraph: {
    title: 'Simulation APL 2026 — Calculateur Aide au Logement',
    description: 'Estimez votre APL ou ALS selon vos revenus et votre loyer. Barèmes CAF 2026.',
    url: 'https://www.salairebruten.fr/outils/simulation-apl',
    type: 'website',
    locale: 'fr_FR',
  },
}

const jsonLd = buildJsonLd({
  '@type': 'WebApplication',
  name: 'Simulateur APL 2026 — Aide au Logement',
  url: 'https://www.salairebruten.fr/outils/simulation-apl',
  applicationCategory: 'GovernmentService',
  description: 'Outil gratuit pour estimer le montant de l\'APL, ALS ou ALF en France selon les barèmes CAF 2026.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  inLanguage: 'fr',
})

const jsonLdFaq = buildJsonLd({
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qui peut bénéficier de l\'APL ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L\'APL (Aide Personnalisée au Logement) est réservée aux locataires de logements conventionnés. L\'ALS (Allocation de Logement Sociale) concerne les logements non conventionnés. Toute personne, quel que soit son âge, peut en bénéficier sous conditions de ressources.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment est calculée l\'APL ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L\'APL est calculée selon une formule prenant en compte le loyer plafonné selon la zone géographique, les revenus du foyer (N-2 ou revenus contemporains), la composition familiale et un taux de participation du ménage. La CAF utilise les revenus des 12 derniers mois pour les situations récentes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le loyer plafond pour l\'APL ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les loyers plafonds 2026 varient selon la zone : Zone 1 (Île-de-France) : 347€ pour une personne seule, Zone 2 (grandes villes) : 275€, Zone 3 (reste de la France) : 252€. Ces montants sont légèrement augmentés pour les couples et par enfant à charge.',
      },
    },
  ],
})

export default function AplPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />

      <section style={{
        background: 'linear-gradient(160deg, #fff1f2 0%, #f8fafc 60%)',
        borderBottom: '1px solid var(--gray-200)',
        padding: '50px 20px 40px',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 12 }}>
            <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</a> › Outils › Simulation APL
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: '#ffe4e6', border: '1px solid #fca5a5', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, color: '#9f1239', marginBottom: 16 }}>
            🏠 Barèmes CAF 2026
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--gray-900)', lineHeight: 1.2, marginBottom: 16 }}>
            Simulation APL / ALS 2026
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '1rem', maxWidth: 620, lineHeight: 1.7 }}>
            Estimez votre aide au logement (APL, ALS ou ALF) selon vos revenus, votre loyer et votre situation familiale. Barèmes CAF 2026 intégrés.
          </p>
        </div>
      </section>

      <AplCalculator />

      <section style={{ padding: '60px 20px', background: 'white', borderTop: '1px solid var(--gray-100)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gray-900)', marginBottom: 20 }}>
            Guide complet de l'aide au logement en France
          </h2>
          <div className="prose-content">
            <h3>APL, ALS, ALF : quelle différence ?</h3>
            <p>Il existe trois types d'aides au logement en France :</p>
            <ul>
              <li><strong>APL (Aide Personnalisée au Logement)</strong> : pour les logements conventionnés (HLM, logements ayant signé une convention avec l'État)</li>
              <li><strong>ALS (Allocation de Logement Sociale)</strong> : pour les logements non conventionnés, principalement pour les jeunes, étudiants, personnes âgées</li>
              <li><strong>ALF (Allocation de Logement Familiale)</strong> : pour les familles avec enfants à charge</li>
            </ul>
            <p>En pratique, la CAF détermine automatiquement quelle aide vous est applicable selon votre logement.</p>

            <h3>Les zones géographiques APL</h3>
            <p>Le montant de l'APL dépend de la zone géographique de votre logement :</p>
            <ul>
              <li><strong>Zone 1</strong> : Paris et communes limitrophes (loyers plafonds les plus élevés)</li>
              <li><strong>Zone 2</strong> : Île-de-France hors zone 1, grandes agglomérations</li>
              <li><strong>Zone 3</strong> : Le reste du territoire français</li>
            </ul>

            <h3>Revenus pris en compte pour le calcul</h3>
            <p>Depuis la réforme de 2021, la CAF utilise les <strong>revenus contemporains</strong> (des 12 derniers mois glissants) plutôt que les revenus N-2. Cela permet un ajustement plus rapide en cas de perte d'emploi ou de baisse de revenus significative.</p>

            <h3>Quand faire sa demande ?</h3>
            <p>La demande d'APL doit être effectuée directement sur <strong>caf.fr</strong>, le plus tôt possible après la signature du bail. Les aides ne sont pas rétroactives au-delà du mois de la demande. Notre simulateur vous donne une estimation ; le montant définitif est calculé par la CAF.</p>
          </div>
        </div>
      </section>
    </>
  )
}
