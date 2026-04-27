import type { Metadata } from 'next'
import Link from 'next/link'
import { buildJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Taux de Cotisations Sociales 2026 — Guide Complet Salarié & Employeur',
  description: 'Tous les taux de cotisations sociales 2026 : part salariale et patronale. Maladie, retraite, chômage, CSG, CRDS, AGIRC-ARRCO. Tableaux détaillés avec exemples de calcul.',
  keywords: 'cotisations sociales 2026, taux cotisations salariales, cotisations patronales 2026, URSSAF 2026, retraite complémentaire AGIRC-ARRCO',
  alternates: { canonical: 'https://www.salairebruten.fr/blog/cotisations-sociales-2026' },
}

const jsonLd = buildJsonLd({
  '@type': 'Article',
  headline: 'Taux de cotisations sociales 2026 : le guide complet',
  datePublished: '2026-01-03',
  author: { '@type': 'Organization', name: 'SalaireBrutNet.fr' },
  url: 'https://www.salairebruten.fr/blog/cotisations-sociales-2026',
  inLanguage: 'fr',
})

const taux = [
  { cot: 'Assurance maladie', sal: '0,00%', pat: '13,00%', base: 'Brut total' },
  { cot: 'CSG déductible', sal: '6,80%', pat: '—', base: '98,25% du brut' },
  { cot: 'CSG non déductible', sal: '2,40%', pat: '—', base: '98,25% du brut' },
  { cot: 'CRDS', sal: '0,50%', pat: '—', base: '98,25% du brut' },
  { cot: 'Retraite base T1', sal: '6,90%', pat: '8,55%', base: '≤ 1 PASS (3 864 €/mois)' },
  { cot: 'Retraite base T2', sal: '0,40%', pat: '1,90%', base: 'Brut total' },
  { cot: 'Retraite compl. T1 (AGIRC-ARRCO)', sal: '3,15%', pat: '4,72%', base: '≤ 1 PASS' },
  { cot: 'Retraite compl. T2 (cadres)', sal: '8,64%', pat: '12,95%', base: '1 à 8 PASS' },
  { cot: 'Assurance chômage', sal: '0,00%', pat: '4,05%', base: '≤ 4 PASS' },
  { cot: 'Allocations familiales', sal: '0,00%', pat: '3,45 ou 5,25%', base: 'Brut total' },
  { cot: 'APEC (cadres)', sal: '0,024%', pat: '0,036%', base: '≤ 4 PASS' },
  { cot: 'FNAL', sal: '0,00%', pat: '0,10 ou 0,50%', base: 'Brut total' },
  { cot: 'Accident du travail', sal: '0,00%', pat: 'variable', base: 'Brut total' },
  { cot: 'Versement mobilités', sal: '0,00%', pat: 'variable', base: 'Brut total' },
]

export default function CotisationsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <section style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)', padding: '40px 20px 32px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 12 }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link> ›{' '}
            <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link> › Cotisations sociales 2026
          </div>
          <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, background: '#f3e8ff', color: '#7c3aed', marginBottom: 14 }}>📊 Cotisations</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: 'var(--gray-900)', lineHeight: 1.2, marginBottom: 14 }}>
            Taux de cotisations sociales 2026 : guide complet
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '1rem', lineHeight: 1.7 }}>
            Tous les taux en vigueur au 1er janvier 2026, avec exemples de calcul. PASS mensuel 2026 : 3 864 €.
          </p>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: 12 }}>📅 3 janvier 2026 · ⏱ 10 min de lecture</div>
        </div>
      </section>

      <article style={{ maxWidth: 860, margin: '0 auto', padding: '50px 20px 80px' }}>
        <div className="prose-content">
          <p>Les cotisations sociales constituent le financement de notre système de protection sociale. Elles se décomposent en cotisations salariales (déduites de votre brut) et patronales (payées en plus par l'employeur). Voici le tableau complet pour 2026.</p>

          <h2>Tableau des taux de cotisations 2026</h2>
        </div>

        <div style={{ overflowX: 'auto', margin: '20px 0 36px' }}>
          <table className="table-clean">
            <thead>
              <tr>
                <th>Cotisation</th>
                <th>Part salariale</th>
                <th>Part patronale</th>
                <th>Assiette / Base de calcul</th>
              </tr>
            </thead>
            <tbody>
              {taux.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{row.cot}</td>
                  <td style={{ color: row.sal === '0,00%' || row.sal === '—' ? 'var(--gray-300)' : '#3b5bdb', fontWeight: row.sal !== '0,00%' && row.sal !== '—' ? 600 : 400 }}>{row.sal}</td>
                  <td style={{ color: row.pat === '—' ? 'var(--gray-300)' : '#059669', fontWeight: row.pat !== '—' ? 600 : 400 }}>{row.pat}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{row.base}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose-content">
          <h2>Le PASS (Plafond Annuel de la Sécurité Sociale) 2026</h2>
          <p>Le PASS est le plafond de référence pour le calcul de nombreuses cotisations. En 2026 :</p>
          <ul>
            <li>PASS annuel : <strong>46 368 €</strong></li>
            <li>PASS mensuel : <strong>3 864 €</strong></li>
            <li>PASS journalier : <strong>214 €</strong></li>
          </ul>

          <h2>Comment calculer ses cotisations salariales totales ?</h2>
          <p>Sur un salaire brut de 3 000 € pour un non-cadre :</p>
          <ul>
            <li>CSG (9,2 % × 98,25 % × 3 000) = <strong>270,93 €</strong></li>
            <li>CRDS (0,5 % × 98,25 % × 3 000) = <strong>14,74 €</strong></li>
            <li>Retraite base T1 (6,9 % × 3 000) = <strong>207 €</strong></li>
            <li>Retraite base T2 (0,4 % × 3 000) = <strong>12 €</strong></li>
            <li>Retraite complémentaire T1 (3,15 % × 3 000) = <strong>94,50 €</strong></li>
          </ul>
          <p>Total cotisations salariales ≈ <strong>599 €</strong> soit ~20 % du brut → Net imposable ≈ 2 401 €</p>

          <h2>Réductions de cotisations patronales</h2>
          <p>Les employeurs bénéficient de la <strong>réduction Fillon</strong> (réduction générale de cotisations patronales) pour les salaires inférieurs à 1,6 SMIC. Cette réduction peut atteindre jusqu'à 6,89 points de cotisations pour les salaires au SMIC. Elle diminue progressivement jusqu'à s'annuler à 1,6 SMIC.</p>

          <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 10, padding: '20px 24px', margin: '32px 0' }}>
            <strong style={{ color: '#3b5bdb' }}>🧮 Simulez vos cotisations précisément</strong><br />
            <span style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>Notre <Link href="/" style={{ color: '#3b5bdb' }}>calculateur brut en net</Link> intègre tous ces taux automatiquement avec le détail complet.</span>
          </div>
        </div>
      </article>
    </>
  )
}
