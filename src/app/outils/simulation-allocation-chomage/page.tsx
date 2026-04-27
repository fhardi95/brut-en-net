import type { Metadata } from 'next'
import ChomageCalculator from './ChomageCalculator'
import { buildJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Simulateur Allocation Chômage ARE 2026 — Calcul Gratuit France Travail',
  description: 'Calculez votre allocation chômage (ARE) selon les règles France Travail 2026. Montant journalier, durée d\'indemnisation, SJR et conditions d\'ouverture de droits expliqués.',
  keywords: 'allocation chômage ARE, simulateur chômage 2026, calcul ARE France Travail, montant allocation chômage, indemnisation chômage France',
  alternates: { canonical: 'https://www.salairebruten.fr/outils/simulation-allocation-chomage' },
  openGraph: {
    title: 'Simulateur Allocation Chômage ARE 2026',
    description: 'Simulez vos droits à l\'allocation chômage (ARE) selon les règles France Travail 2026.',
    url: 'https://www.salairebruten.fr/outils/simulation-allocation-chomage',
    type: 'website',
    locale: 'fr_FR',
  },
}

const jsonLd = buildJsonLd({
  '@type': 'WebApplication',
  name: 'Simulateur Allocation Chômage ARE 2026',
  url: 'https://www.salairebruten.fr/outils/simulation-allocation-chomage',
  applicationCategory: 'FinanceApplication',
  description: 'Estimez votre allocation chômage (ARE) : montant journalier, SJR, durée d\'indemnisation selon France Travail 2026.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  inLanguage: 'fr',
})

const jsonLdFaq = buildJsonLd({
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment est calculé le montant de l\'ARE ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L\'allocation d\'aide au retour à l\'emploi (ARE) est calculée sur la base du Salaire Journalier de Référence (SJR). Le montant journalier est le plus élevé entre : 40,4% du SJR + 12,12€, ou 57% du SJR. Le montant ne peut pas dépasser 75% du SJR ni être inférieur à 29,26€/jour.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps dure l\'indemnisation chômage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La durée d\'indemnisation est égale à la durée d\'affiliation, plafonnée à 24 mois (36 mois pour les demandeurs d\'emploi de 53 ans et plus à la date de fin du contrat). Il faut avoir travaillé au moins 6 mois dans les 24 derniers mois.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le délai avant de toucher le chômage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Après inscription à France Travail, un délai de carence fixe de 7 jours s\'applique. S\'y ajoute un différé spécifique calculé sur les indemnités supra-légales perçues. Pour une rupture conventionnelle ou licenciement sans indemnités élevées, le premier paiement intervient généralement après 1 mois.',
      },
    },
  ],
})

export default function ChomageSimPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />

      <section style={{
        background: 'linear-gradient(160deg, #faf5ff 0%, #f8fafc 60%)',
        borderBottom: '1px solid var(--gray-200)',
        padding: '50px 20px 40px',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 12 }}>
            <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</a> › Outils › Allocation chômage
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: '#f3e8ff', border: '1px solid #d8b4fe', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, color: '#6b21a8', marginBottom: 16 }}>
            📋 Règles France Travail 2026
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--gray-900)', lineHeight: 1.2, marginBottom: 16 }}>
            Simuler son Allocation Chômage (ARE) 2026
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '1rem', maxWidth: 620, lineHeight: 1.7 }}>
            Estimez votre allocation d'aide au retour à l'emploi selon les règles France Travail 2026. Montant journalier, durée d'indemnisation et conditions d'éligibilité.
          </p>
        </div>
      </section>

      <ChomageCalculator />

      <section style={{ padding: '60px 20px', background: 'white', borderTop: '1px solid var(--gray-100)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gray-900)', marginBottom: 20 }}>
            Comment fonctionne l'allocation chômage en France ?
          </h2>
          <div className="prose-content">
            <h3>Conditions d'ouverture des droits à l'ARE</h3>
            <p>Pour bénéficier de l'Allocation de Retour à l'Emploi (ARE), vous devez :</p>
            <ul>
              <li>Avoir travaillé au moins <strong>6 mois (130 jours ou 910 heures)</strong> dans les 24 derniers mois</li>
              <li>Être involontairement privé d'emploi (licenciement, rupture conventionnelle, fin de CDD…)</li>
              <li>Être inscrit comme demandeur d'emploi à France Travail</li>
              <li>Être en recherche active d'emploi et résider en France</li>
            </ul>

            <h3>Calcul du Salaire Journalier de Référence (SJR)</h3>
            <p>Le SJR est calculé en divisant l'ensemble des salaires bruts perçus sur la période de référence par le nombre de jours calendaires de cette période (plafonné à 365 jours). Il constitue la base de calcul de votre allocation journalière.</p>

            <h3>Formule de calcul de l'ARE journalière</h3>
            <p>France Travail retient le montant le plus élevé entre :</p>
            <ul>
              <li>40,4 % du SJR + 12,12 € (partie fixe)</li>
              <li>57 % du SJR</li>
            </ul>
            <p>Ce montant est plafonné à <strong>75 % du SJR</strong> et ne peut pas être inférieur à <strong>29,26 €/jour</strong> (en 2026).</p>

            <h3>Durée d'indemnisation maximale</h3>
            <p>La durée d'indemnisation est égale à la durée des périodes travaillées, avec un maximum de <strong>24 mois</strong> pour les moins de 53 ans, <strong>30 mois</strong> pour les 53-54 ans et <strong>36 mois</strong> pour les 55 ans et plus.</p>
          </div>
        </div>
      </section>
    </>
  )
}
