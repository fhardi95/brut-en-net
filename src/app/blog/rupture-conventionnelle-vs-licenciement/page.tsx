import type { Metadata } from 'next'
import Link from 'next/link'
import { buildJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Rupture Conventionnelle vs Licenciement 2026 — Comparatif Complet',
  description: 'Comparatif entre rupture conventionnelle et licenciement : indemnités, droits au chômage, fiscalité, délais et impact professionnel. Guide 2026 pour faire le bon choix.',
  keywords: 'rupture conventionnelle vs licenciement, différence licenciement rupture conventionnelle, choisir rupture conventionnelle ou licenciement',
  alternates: { canonical: 'https://www.salairebruten.fr/blog/rupture-conventionnelle-vs-licenciement' },
}

const jsonLd = buildJsonLd({
  '@type': 'Article',
  headline: 'Rupture conventionnelle vs licenciement : que choisir ?',
  datePublished: '2025-12-15',
  author: { '@type': 'Organization', name: 'SalaireBrutNet.fr' },
  url: 'https://www.salairebruten.fr/blog/rupture-conventionnelle-vs-licenciement',
  inLanguage: 'fr',
})

const comparatif = [
  { critere: 'Indemnité minimale', rc: 'Indemnité légale licenciement (même formule)', lic: 'Indemnité légale' },
  { critere: 'Droits au chômage', rc: '✅ Oui (ARE)', lic: '✅ Oui (ARE)' },
  { critere: 'Initiative', rc: 'Accord des deux parties', lic: 'Employeur uniquement' },
  { critere: 'Homologation', rc: 'DREETS (15 jours ouvrables)', lic: 'Pas nécessaire' },
  { critere: 'Délai de rétractation', rc: '15 jours calendaires', lic: 'Non applicable' },
  { critere: 'Délai de carence ARE', rc: '7j fixes + différé indemnités', lic: '7j fixes + différé indemnités' },
  { critere: 'Fiscalité indemnité', rc: 'Exo dans limite légale', lic: 'Exo totale (légale)' },
  { critere: 'Négociation possible', rc: '✅ Oui (montant, date départ)', lic: '❌ Non (cadre légal strict)' },
]

export default function RCvsLicPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <section style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)', padding: '40px 20px 32px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 12 }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link> › <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link> › Rupture conventionnelle vs licenciement
          </div>
          <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, background: '#fffbeb', color: '#92400e', marginBottom: 14 }}>⚖️ Rupture contrat</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: 'var(--gray-900)', lineHeight: 1.2, marginBottom: 14 }}>
            Rupture conventionnelle vs licenciement : que choisir ?
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '1rem', lineHeight: 1.7 }}>Comparatif complet pour prendre la meilleure décision selon votre situation.</p>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: 12 }}>📅 15 décembre 2025 · ⏱ 9 min de lecture</div>
        </div>
      </section>

      <article style={{ maxWidth: 860, margin: '0 auto', padding: '50px 20px 80px' }}>
        <div style={{ overflowX: 'auto', marginBottom: 40 }}>
          <table className="table-clean">
            <thead>
              <tr>
                <th>Critère</th>
                <th style={{ color: '#059669' }}>🤝 Rupture conventionnelle</th>
                <th style={{ color: '#dc2626' }}>⚖️ Licenciement</th>
              </tr>
            </thead>
            <tbody>
              {comparatif.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{row.critere}</td>
                  <td style={{ color: 'var(--gray-700)' }}>{row.rc}</td>
                  <td style={{ color: 'var(--gray-700)' }}>{row.lic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose-content">
          <h2>Quand préférer la rupture conventionnelle ?</h2>
          <p>La rupture conventionnelle est avantageuse quand les deux parties souhaitent mettre fin au contrat. Elle permet au salarié de négocier les conditions de départ (montant, date), d'obtenir une indemnité potentiellement supérieure au minimum légal, et de bénéficier des allocations chômage.</p>

          <h2>Quand le licenciement s'impose ?</h2>
          <p>Le licenciement intervient quand l'employeur initie seul la rupture pour des motifs légaux (économique, faute, inaptitude…). Le salarié n'a pas le choix mais conserve ses droits : indemnités, ARE, et possibilité de contester devant les prud'hommes en cas de licenciement sans cause réelle et sérieuse.</p>

          <h2>Impact sur le délai de carence chômage</h2>
          <p>Le délai différé d'indemnisation est identique pour les deux modes de rupture : il dépend du montant des indemnités perçues au-delà du plancher légal. Un délai maximum de 150 jours (5 mois) s'applique depuis la réforme de l'assurance chômage.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '32px 0' }}>
            <Link href="/outils/calculer-indemnite-rupture-conventionnelle" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: 20, textAlign: 'center', cursor: 'pointer', transition: 'all 0.15s' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🤝</div>
                <div style={{ fontWeight: 700, color: '#059669', marginBottom: 4 }}>Simuler ma RC</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>Calculer l'indemnité de rupture conventionnelle</div>
              </div>
            </Link>
            <Link href="/outils/calcul-indemnite-licenciement" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: 20, textAlign: 'center', cursor: 'pointer', transition: 'all 0.15s' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>⚖️</div>
                <div style={{ fontWeight: 700, color: '#3b5bdb', marginBottom: 4 }}>Simuler mon licenciement</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>Calculer l'indemnité légale de licenciement</div>
              </div>
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
