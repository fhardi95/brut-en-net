import type { Metadata } from 'next'
import RuptureCalculator from './RuptureCalculator'
import { buildJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Calculer Indemnité Rupture Conventionnelle 2026 — Simulateur Gratuit',
  description: 'Calculez votre indemnité de rupture conventionnelle selon les barèmes 2026. Formule officielle, comparaison avec l\'indemnité de licenciement, fiscalité et droits au chômage expliqués.',
  keywords: 'indemnité rupture conventionnelle, calculer rupture conventionnelle, simulation rupture conventionnelle 2026, montant rupture conventionnelle, indemnité spécifique rupture conventionnelle',
  alternates: { canonical: 'https://www.salairebruten.fr/outils/calculer-indemnite-rupture-conventionnelle' },
  openGraph: {
    title: 'Calculer Indemnité Rupture Conventionnelle 2026',
    description: 'Estimez votre indemnité de rupture conventionnelle en un clic. Barèmes officiels 2026.',
    url: 'https://www.salairebruten.fr/outils/calculer-indemnite-rupture-conventionnelle',
    type: 'website',
    locale: 'fr_FR',
  },
}

const jsonLd = buildJsonLd({
  '@type': 'WebApplication',
  name: 'Simulateur Rupture Conventionnelle 2026',
  url: 'https://www.salairebruten.fr/outils/calculer-indemnite-rupture-conventionnelle',
  applicationCategory: 'FinanceApplication',
  description: 'Outil gratuit pour calculer l\'indemnité spécifique de rupture conventionnelle en France selon les barèmes 2026.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  inLanguage: 'fr',
})

const jsonLdFaq = buildJsonLd({
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quelle est la formule de calcul de la rupture conventionnelle ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L\'indemnité spécifique de rupture conventionnelle est au moins égale à l\'indemnité légale de licenciement : 1/4 de mois de salaire par année pour les 10 premières années d\'ancienneté, puis 1/3 de mois par année au-delà. Le salarié et l\'employeur peuvent négocier un montant supérieur.',
      },
    },
    {
      '@type': 'Question',
      name: 'La rupture conventionnelle ouvre-t-elle droit au chômage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, la rupture conventionnelle ouvre droit à l\'Allocation chômage (ARE) versée par France Travail, à condition d\'avoir cotisé au moins 6 mois sur les 24 derniers mois. C\'est l\'un des avantages majeurs par rapport à une démission.',
      },
    },
    {
      '@type': 'Question',
      name: 'La rupture conventionnelle est-elle imposable ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L\'indemnité de rupture conventionnelle est exonérée d\'impôt sur le revenu dans la limite du montant de l\'indemnité légale de licenciement. La partie excédentaire est imposable. Elle est soumise au forfait social de 20 % pour l\'employeur.',
      },
    },
  ],
})

export default function RupturePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />

      <section style={{
        background: 'linear-gradient(160deg, #f0fdf4 0%, #f8fafc 60%)',
        borderBottom: '1px solid var(--gray-200)',
        padding: '50px 20px 40px',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 12 }}>
            <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</a> › Outils › Rupture conventionnelle
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: '#dcfce7', border: '1px solid #86efac', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, color: '#166534', marginBottom: 16 }}>
            🤝 Barèmes officiels 2026
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--gray-900)', lineHeight: 1.2, marginBottom: 16 }}>
            Calculer son Indemnité de Rupture Conventionnelle 2026
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '1rem', maxWidth: 600, lineHeight: 1.7 }}>
            Estimez l'indemnité spécifique de rupture conventionnelle selon la formule officielle du Code du travail. Comparez avec l'indemnité de licenciement.
          </p>
        </div>
      </section>

      <RuptureCalculator />

      <section style={{ padding: '60px 20px', background: 'white', borderTop: '1px solid var(--gray-100)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gray-900)', marginBottom: 20 }}>
            Tout savoir sur la rupture conventionnelle
          </h2>
          <div className="prose-content">
            <h3>Qu'est-ce que la rupture conventionnelle ?</h3>
            <p>La rupture conventionnelle homologuée (RCH) est un mode de rupture du contrat de travail à durée indéterminée (CDI) d'un commun accord entre le salarié et l'employeur. Elle donne droit à une indemnité spécifique et à l'allocation chômage.</p>

            <h3>La formule de calcul officielle</h3>
            <p>L'indemnité spécifique de rupture conventionnelle ne peut pas être inférieure à l'indemnité légale de licenciement :</p>
            <ul>
              <li><strong>¼ de mois</strong> de salaire par année pour les 10 premières années</li>
              <li><strong>⅓ de mois</strong> de salaire par année au-delà de 10 ans d'ancienneté</li>
            </ul>

            <h3>Avantages vs licenciement vs démission</h3>
            <p>Contrairement à la démission, la rupture conventionnelle ouvre droit à l'ARE (allocation chômage). Contrairement au licenciement, elle est négociée à l'amiable — le salarié peut obtenir une indemnité supérieure au minimum légal.</p>

            <h3>Délai de carence avant le chômage</h3>
            <p>Après une rupture conventionnelle, un délai de carence de 7 jours (délai de carence fixe) s'applique avant le versement de l'ARE par France Travail. À cela s'ajoute un délai différé d'indemnisation calculé en fonction du montant des indemnités perçues.</p>
          </div>
        </div>
      </section>
    </>
  )
}
