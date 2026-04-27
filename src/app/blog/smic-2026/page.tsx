import type { Metadata } from 'next'
import Link from 'next/link'
import { buildJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'SMIC 2026 : Montant Brut, Net et Horaire — Guide Complet',
  description: 'Le SMIC 2026 est fixé à 11,65 €/heure brut, soit 1 766,92 € brut mensuel et environ 1 398 € net. Calcul, évolution, heures supplémentaires et cas particuliers expliqués.',
  keywords: 'SMIC 2026, montant SMIC 2026, SMIC horaire 2026, SMIC net 2026, SMIC mensuel 2026, salaire minimum France 2026',
  alternates: { canonical: 'https://www.salairebruten.fr/blog/smic-2026' },
}

const jsonLd = buildJsonLd({
  '@type': 'Article',
  headline: 'SMIC 2026 : montant brut, net et évolution',
  datePublished: '2026-01-01',
  author: { '@type': 'Organization', name: 'SalaireBrutNet.fr' },
  url: 'https://www.salairebruten.fr/blog/smic-2026',
  inLanguage: 'fr',
})

const smicHistory = [
  { year: '2020', horaire: '10,15 €', mensuel: '1 539,42 €', net: '1 219 €' },
  { year: '2021', horaire: '10,25 €', mensuel: '1 554,58 €', net: '1 231 €' },
  { year: '2022', horaire: '10,85 → 11,07 €', mensuel: '1 645,58 €', net: '1 302 €' },
  { year: '2023', horaire: '11,27 → 11,52 €', mensuel: '1 747,20 €', net: '1 383 €' },
  { year: '2024', horaire: '11,65 €', mensuel: '1 766,92 €', net: '1 398 €' },
  { year: '2025', horaire: '11,65 €', mensuel: '1 766,92 €', net: '1 398 €' },
  { year: '2026', horaire: '11,65 €', mensuel: '1 766,92 €', net: '~1 398 €', current: true },
]

export default function Smic2026Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <section style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)', padding: '40px 20px 32px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 12 }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link> › <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link> › SMIC 2026
          </div>
          <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, background: '#fff1f2', color: '#e11d48', marginBottom: 14 }}>💶 Réglementation</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: 'var(--gray-900)', lineHeight: 1.2, marginBottom: 14 }}>
            SMIC 2026 : montant brut, net horaire et mensuel
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '1rem', lineHeight: 1.7 }}>Tout ce qu'il faut savoir sur le salaire minimum 2026 en France.</p>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: 12 }}>📅 1er janvier 2026 · ⏱ 6 min de lecture</div>
        </div>
      </section>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '50px 20px 80px' }}>

        {/* Key numbers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }} className="smic-grid">
          {[
            { label: 'Taux horaire brut', value: '11,65 €', sub: 'SMIC 2026' },
            { label: 'Mensuel brut', value: '1 766,92 €', sub: '35h / mois' },
            { label: 'Mensuel net ~', value: '1 398 €', sub: 'hors impôt' },
          ].map(c => (
            <div key={c.label} style={{ background: 'linear-gradient(135deg, var(--blue-500), var(--blue-700))', color: 'white', borderRadius: 12, padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, marginBottom: 4 }}>{c.value}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>{c.label}</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.65, marginTop: 2 }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div className="prose-content">
          <h2>Calcul du SMIC mensuel brut 2026</h2>
          <p>Le SMIC mensuel brut est calculé sur la base de <strong>151,67 heures</strong> (durée légale de travail mensuelle pour un temps plein à 35h) :</p>
          <p style={{ background: 'var(--gray-50)', padding: '12px 16px', borderRadius: 8, fontFamily: 'monospace' }}>
            11,65 € × 151,67 h = <strong>1 766,92 €</strong> brut mensuel
          </p>

          <h2>Du brut au net : comment passer du SMIC brut au net ?</h2>
          <p>Les cotisations salariales représentent environ 21 % du brut pour un salarié au SMIC. Le taux est légèrement réduit grâce à des allègements spécifiques aux bas salaires :</p>
          <ul>
            <li>Cotisations salariales : ~370 €</li>
            <li>Net imposable : ~1 397 €</li>
            <li>Prélèvement à la source : ≈ 0 € (exonéré sous 1 part pour revenus modestes)</li>
            <li><strong>Net à payer ≈ 1 398 €</strong></li>
          </ul>

          <h2>Évolution du SMIC de 2020 à 2026</h2>
        </div>

        <div style={{ overflowX: 'auto', margin: '16px 0 36px' }}>
          <table className="table-clean">
            <thead>
              <tr>
                <th>Année</th>
                <th>Taux horaire</th>
                <th>Mensuel brut</th>
                <th>Net estimé</th>
              </tr>
            </thead>
            <tbody>
              {smicHistory.map(row => (
                <tr key={row.year} style={{ background: (row as any).current ? '#eef2ff' : 'transparent' }}>
                  <td style={{ fontWeight: (row as any).current ? 700 : 400, color: (row as any).current ? '#3b5bdb' : 'inherit' }}>
                    {row.year} {(row as any).current && '← Actuel'}
                  </td>
                  <td>{row.horaire}</td>
                  <td style={{ fontWeight: (row as any).current ? 600 : 400 }}>{row.mensuel}</td>
                  <td style={{ color: '#12b886', fontWeight: (row as any).current ? 600 : 400 }}>{row.net}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose-content">
          <h2>Heures supplémentaires au SMIC</h2>
          <p>Les heures supplémentaires (au-delà de 35h) sont majorées :</p>
          <ul>
            <li><strong>25 %</strong> de majoration pour les 8 premières heures sup (36h à 43h)</li>
            <li><strong>50 %</strong> pour les heures suivantes (44h et plus)</li>
          </ul>
          <p>Ces majorations sont exonérées d'impôt et de cotisations salariales dans la limite de 7 500 €/an.</p>

          <h2>SMIC et apprentis / stagiaires</h2>
          <p>Les apprentis perçoivent un pourcentage du SMIC selon leur âge et leur année d'apprentissage. Les stagiaires doivent recevoir une gratification à partir de 2 mois consécutifs (15 % du PASS horaire soit 3,75 €/h en 2026).</p>

          <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 10, padding: '20px 24px', margin: '32px 0' }}>
            <strong style={{ color: '#3b5bdb' }}>🧮 Simulez votre net exactement</strong><br />
            <span style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
              Notre <Link href="/" style={{ color: '#3b5bdb' }}>calculateur SMIC horaire en net</Link> vous donne le détail précis selon vos heures travaillées et votre situation fiscale.
            </span>
          </div>
        </div>

        <style>{`@media (max-width: 640px) { .smic-grid { grid-template-columns: 1fr !important; } }`}</style>
      </article>
    </>
  )
}
