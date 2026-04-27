import type { Metadata } from 'next'
import Link from 'next/link'
import SalaireCalculator from '@/components/calculators/SalaireCalculator'
import { buildJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Calculateur Salaire Brut en Net 2026 — Conversion Gratuite France',
  description: 'Convertissez votre salaire brut en net en un clic. Calcul précis 2026 : cotisations sociales, impôt sur le revenu, prime d\'activité et coût employeur. Cadre, non-cadre, fonctionnaire.',
  keywords: 'brut en net, brut en net calcul, brut en net France, brut en net salaire, brut net conversion, calculatrice salaire brut net, conversion brut net, salaire brut en net',
  alternates: { canonical: 'https://www.salairebruten.fr' },
  openGraph: {
    title: 'Calculateur Salaire Brut en Net 2026 — France',
    description: 'Convertissez votre salaire brut en net gratuitement. Barèmes 2026 officiels.',
    url: 'https://www.salairebruten.fr',
    type: 'website',
    locale: 'fr_FR',
  },
}

const jsonLdCalculator = buildJsonLd({
  '@type': 'WebApplication',
  name: 'Calculateur Salaire Brut en Net 2026',
  url: 'https://www.salairebruten.fr',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description: 'Outil gratuit pour convertir un salaire brut en net en France selon les barèmes 2026.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  inLanguage: 'fr',
})

const jsonLdFAQ = buildJsonLd({
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment calculer le salaire brut en net en France ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On déduit du salaire brut les cotisations salariales (22–25%) : maladie, retraite de base, retraite complémentaire, CSG (9,7%) et CRDS (0,5%). Ensuite, on soustrait le prélèvement à la source (impôt sur le revenu). Notre calculateur effectue ce calcul automatiquement selon les taux 2026.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le SMIC net en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le SMIC brut 2026 est de 1 766,92 € par mois. Après cotisations salariales, le net est d\'environ 1 398 € par mois, hors impôt sur le revenu (qui dépend de votre situation fiscale).',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la différence entre brut et net imposable ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le net imposable réintègre la part non déductible de la CSG (2,4%). C\'est la base déclarée aux impôts. Le net à payer est ce que vous recevez réellement chaque mois sur votre compte bancaire.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle différence entre cadre et non-cadre pour les cotisations ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un cadre cotise à l\'AGIRC (retraite complémentaire spécifique) et à l\'APEC (0,024%). Son taux global de cotisations est environ 0,5 point plus élevé qu\'un non-cadre, car il cotise davantage à la retraite complémentaire.',
      },
    },
  ],
})

const tools = [
  {
    href: '/outils/calcul-indemnite-licenciement',
    icon: '⚖️',
    title: 'Indemnité de licenciement',
    desc: 'Calculez votre indemnité légale de licenciement selon votre ancienneté et salaire de référence.',
    badge: '2026',
  },
  {
    href: '/outils/calculer-indemnite-rupture-conventionnelle',
    icon: '🤝',
    title: 'Rupture conventionnelle',
    desc: 'Estimez l\'indemnité spécifique de rupture conventionnelle et comparez avec le licenciement.',
    badge: '2026',
  },
  {
    href: '/outils/simulation-allocation-chomage',
    icon: '📋',
    title: 'Allocation chômage (ARE)',
    desc: 'Simulez vos droits Pôle Emploi (ARE) : montant journalier, durée d\'indemnisation.',
    badge: 'Nouveau',
  },
  {
    href: '/outils/simulation-apl',
    icon: '🏠',
    title: 'Simulation APL',
    desc: 'Estimez votre aide au logement (APL/ALS/ALF) selon vos revenus et votre situation.',
    badge: '2026',
  },
]

const faq = [
  {
    q: 'Comment passer du brut au net ?',
    a: 'On déduit du brut les cotisations salariales (22–25 %) : maladie, retraite de base, retraite complémentaire, CSG (9,7 %) et CRDS (0,5 %). Puis le prélèvement à la source (impôt).',
  },
  {
    q: 'Quel est le SMIC net en 2026 ?',
    a: 'SMIC brut = 1 766,92 €/mois. Après cotisations salariales, le net est d\'environ 1 398 €/mois hors impôt sur le revenu. Le taux horaire SMIC est de 11,65 €.',
  },
  {
    q: 'Cadre vs non-cadre ?',
    a: 'Un cadre cotise à l\'AGIRC (retraite complémentaire) et à l\'APEC (0,024 %). Son taux de cotisation global est environ 0,5 point plus élevé qu\'un non-cadre.',
  },
  {
    q: 'Net imposable vs net à payer ?',
    a: 'Le net imposable réintègre la CSG non déductible (2,4 %). C\'est la base déclarée aux impôts. Le net à payer est ce que vous recevez réellement chaque mois.',
  },
  {
    q: 'Fonctionnaire : comment ça marche ?',
    a: 'Le fonctionnaire cotise à la CNRACL (9,14 %), au RAFP (5 %) et à la CSG/CRDS. Le taux global de cotisations est plus faible (~17 %) que dans le secteur privé.',
  },
  {
    q: 'C\'est quoi la prime d\'activité ?',
    a: 'Versée par la CAF aux travailleurs à faibles revenus, elle peut atteindre plusieurs centaines d\'euros par mois. Simulez officiellement sur caf.fr avec toutes vos ressources de foyer.',
  },
]

const taux2026 = [
  { cot: 'Assurance maladie', sal: '0%', pat: '13%', assiette: 'Brut total' },
  { cot: 'CSG déductible', sal: '6,80%', pat: '—', assiette: '98,25% du brut' },
  { cot: 'CSG/CRDS non déductible', sal: '2,90%', pat: '—', assiette: '98,25% du brut' },
  { cot: 'Retraite de base (plafonné)', sal: '6,90%', pat: '8,55%', assiette: '≤ 1 PASS' },
  { cot: 'Retraite de base (déplafonné)', sal: '0,40%', pat: '1,90%', assiette: 'Brut total' },
  { cot: 'Retraite complémentaire T1', sal: '3,15%', pat: '4,72%', assiette: '≤ 1 PASS' },
  { cot: 'Retraite complémentaire T2 (cadre)', sal: '8,64%', pat: '12,95%', assiette: '1 à 8 PASS' },
  { cot: 'Assurance chômage', sal: '0%', pat: '4,05%', assiette: '≤ 4 PASS' },
  { cot: 'Allocations familiales', sal: '0%', pat: '3,45–5,25%', assiette: 'Brut total' },
  { cot: 'APEC (cadres uniquement)', sal: '0,024%', pat: '0,036%', assiette: '≤ 4 PASS' },
]

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdCalculator }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFAQ }} />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(160deg, #eef2ff 0%, #f8fafc 50%, #e6fcf5 100%)',
        borderBottom: '1px solid var(--gray-200)',
        padding: '60px 20px 50px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div className="hero-badge">
            ✓ Barèmes officiels 2026 · Gratuit · Sans inscription
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: 'var(--gray-900)',
            lineHeight: 1.15,
            marginBottom: 20,
          }}>
            Calculateur <em>Brut → Net</em><br />en France 2026
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--gray-500)', maxWidth: 580, margin: '0 auto 28px', lineHeight: 1.7 }}>
            Conversion brut net instantanée avec cotisations sociales, impôt sur le revenu, prime d'activité CAF et coût employeur. Simple, rapide, précis.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['✓ Salarié privé', '✓ Fonctionnaire', '✓ SMIC horaire', '✓ Cadre & Non-cadre'].map(b => (
              <span key={b} className="badge badge-blue">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <SalaireCalculator />

      {/* SEO Text block */}
      <section style={{ background: 'white', padding: '60px 20px', borderTop: '1px solid var(--gray-100)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 className="section-title" style={{ marginBottom: 8 }}>Calcul salaire brut en net — Comment ça marche ?</h2>
          <p style={{ color: 'var(--gray-400)', marginBottom: 32 }}>Tout ce que vous devez savoir sur la conversion brut net en France</p>
          <div className="prose-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div>
              <h3>La conversion brut en net étape par étape</h3>
              <p>La conversion d'un salaire brut en net repose sur la déduction des cotisations salariales obligatoires. En 2026, ces cotisations représentent entre 22 % et 25 % du salaire brut selon votre statut (cadre ou non-cadre).</p>
              <p>Le calcul se déroule en deux temps : on déduit d'abord les cotisations sociales (retraite, maladie, chômage, CSG/CRDS), puis le prélèvement à la source (impôt sur le revenu). Le résultat est votre salaire <strong>net à payer</strong>.</p>
              <h3>Pourquoi utiliser notre calculatrice salaire brut net ?</h3>
              <p>Notre outil intègre les derniers taux en vigueur, la réforme des retraites et les barèmes 2026 de la Direction Générale des Finances Publiques. Il prend en compte le statut cadre/non-cadre, le temps partiel, les primes et la mutuelle.</p>
            </div>
            <div>
              <h3>Différence entre net à payer et net imposable</h3>
              <p>Le <strong>net à payer</strong> est le montant viré sur votre compte bancaire. Le <strong>net imposable</strong> est légèrement supérieur : il réintègre la fraction non déductible de la CSG (2,4 %) que vous devez déclarer à l'administration fiscale.</p>
              <h3>Le coût employeur : ce que vous coûtez vraiment</h3>
              <p>Au-delà de votre salaire brut, votre employeur verse des cotisations patronales représentant environ 42 à 45 % de votre brut. Pour un salarié au SMIC, le coût réel pour l'entreprise est d'environ 2 100 € alors que le net perçu est d'environ 1 398 €.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section style={{ padding: '70px 20px', background: 'var(--gray-50)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">Tous nos outils RH & Finances</h2>
            <p style={{ color: 'var(--gray-400)', marginTop: 8 }}>Des simulateurs gratuits pour toutes vos démarches</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {tools.map(tool => (
              <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: 24, height: '100%', transition: 'all 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(-4px)'
                    el.style.boxShadow = 'var(--shadow-lg)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{tool.icon}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--gray-800)', margin: 0 }}>{tool.title}</h3>
                    <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>{tool.badge}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', margin: 0, lineHeight: 1.5 }}>{tool.desc}</p>
                  <div style={{ marginTop: 16, fontSize: '0.85rem', color: 'var(--blue-500)', fontWeight: 600 }}>Calculer →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '70px 20px', background: 'white' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 40 }}>Questions fréquentes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {faq.map((item, i) => (
              <div key={i} className="card" style={{ padding: '20px 24px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--gray-800)', marginBottom: 8, fontWeight: 700 }}>{item.q}</h3>
                <p style={{ color: 'var(--gray-500)', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Taux 2026 */}
      <section id="taux" style={{ padding: '70px 20px', background: 'var(--gray-50)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 className="section-title" style={{ marginBottom: 6 }}>Taux de cotisations 2026</h2>
          <p style={{ color: 'var(--gray-400)', marginBottom: 28, fontSize: '0.9rem' }}>
            Barèmes officiels utilisés pour la conversion brut net — PASS mensuel 2026 : 3 864 €
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table className="table-clean">
              <thead>
                <tr>
                  <th>Cotisation</th>
                  <th>Part salariale</th>
                  <th>Part patronale</th>
                  <th>Assiette</th>
                </tr>
              </thead>
              <tbody>
                {taux2026.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{row.cot}</td>
                    <td style={{ color: row.sal === '0%' ? 'var(--gray-300)' : 'var(--blue-600)', fontWeight: row.sal !== '0%' ? 600 : 400 }}>{row.sal}</td>
                    <td style={{ color: row.pat === '—' ? 'var(--gray-300)' : '#12b886', fontWeight: row.pat !== '—' && row.pat !== '0%' ? 600 : 400 }}>{row.pat}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>{row.assiette}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
