import type { Metadata } from 'next'
import Link from 'next/link'
import { buildJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Comment Lire sa Fiche de Paie 2026 — Guide Complet',
  description: 'Guide complet pour comprendre votre bulletin de salaire 2026 : cotisations salariales, net imposable, prélèvement à la source, avantages en nature. Exemples pratiques et explications claires.',
  keywords: 'comprendre fiche de paie, lire bulletin de salaire, cotisations fiche de paie, net imposable, prélèvement à la source fiche de paie',
  alternates: { canonical: 'https://www.salairebruten.fr/blog/comprendre-fiche-de-paie' },
}

const jsonLd = buildJsonLd({
  '@type': 'Article',
  headline: 'Comment lire et comprendre sa fiche de paie en 2026',
  description: 'Guide complet pour comprendre toutes les lignes de votre bulletin de salaire 2026.',
  datePublished: '2026-01-12',
  author: { '@type': 'Organization', name: 'SalaireBrutNet.fr' },
  publisher: { '@type': 'Organization', name: 'SalaireBrutNet.fr' },
  url: 'https://www.salairebruten.fr/blog/comprendre-fiche-de-paie',
  inLanguage: 'fr',
})

export default function FicheDePaiePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <section style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)', padding: '40px 20px 32px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 12 }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link> ›{' '}
            <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link> › Comprendre sa fiche de paie
          </div>
          <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, background: '#eef2ff', color: '#3b5bdb', marginBottom: 14 }}>📄 Fiche de paie</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: 'var(--gray-900)', lineHeight: 1.2, marginBottom: 14 }}>
            Comment lire et comprendre sa fiche de paie en 2026
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 16 }}>
            Votre bulletin de salaire est un document légal complexe. On vous explique chaque ligne, de haut en bas.
          </p>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>📅 12 janvier 2026 · ⏱ 8 min de lecture</div>
        </div>
      </section>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '50px 20px 80px' }}>
        <div className="prose-content">

          <p>La fiche de paie (ou bulletin de salaire) est remise chaque mois par l'employeur. Obligatoire depuis 1970, elle doit mentionner un certain nombre d'informations légales. Voici comment la déchiffrer de A à Z.</p>

          <h2>1. Les informations d'en-tête</h2>
          <p>La partie haute de votre fiche de paie contient les informations d'identification :</p>
          <ul>
            <li><strong>Coordonnées de l'employeur</strong> : raison sociale, adresse, SIRET, NAF/APE</li>
            <li><strong>Vos informations</strong> : nom, prénom, numéro de sécurité sociale, poste, convention collective</li>
            <li><strong>Période de paie</strong> : mois et année concernés</li>
            <li><strong>Statut</strong> : cadre ou non-cadre (détermine certains taux de cotisations)</li>
          </ul>

          <h2>2. Le salaire brut de base</h2>
          <p>C'est le salaire négocié dans votre contrat de travail, avant toute déduction. Il est calculé sur la base de <strong>151,67 heures par mois</strong> (35h × 52 semaines / 12) pour un temps plein.</p>

          <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 10, padding: '20px 24px', margin: '24px 0' }}>
            <strong style={{ color: '#3b5bdb' }}>💡 Exemple concret</strong><br />
            <span style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>Un salarié non-cadre au salaire brut de 2 500 € :<br />
            Cotisations salariales ≈ 530 € → Net imposable ≈ 1 970 € → Impôt PAS ≈ 185 € → <strong>Net à payer ≈ 1 785 €</strong></span>
          </div>

          <h2>3. Les cotisations salariales</h2>
          <p>C'est la partie la plus dense de votre bulletin. Les cotisations sont présentées en deux colonnes : votre part (salariale) et la part de l'employeur (patronale). Seule votre part est déduite de votre salaire.</p>

          <h3>Assurance maladie, maternité, invalidité, décès</h3>
          <p>La cotisation salariale est de <strong>0 %</strong> depuis 2018 (elle était de 0,75 % avant). L'employeur cotise à 13 % sur la totalité du salaire brut. Cette cotisation finance la Sécurité Sociale.</p>

          <h3>CSG et CRDS</h3>
          <p>La <strong>Contribution Sociale Généralisée (CSG)</strong> est prélevée à 9,2 % sur 98,25 % du brut. Une partie (6,8 %) est déductible du revenu imposable ; l'autre (2,4 %) ne l'est pas. La <strong>CRDS</strong> est de 0,5 %, entièrement non déductible.</p>

          <h3>Retraite de base (CNAV)</h3>
          <p>Elle finance votre retraite au régime général : 6,90 % sur la tranche plafonnée au PASS (Plafond Annuel de la Sécurité Sociale, soit 46 368 €/an en 2026) + 0,40 % sur la totalité du salaire.</p>

          <h3>Retraite complémentaire (AGIRC-ARRCO)</h3>
          <p>3,15 % sur la tranche 1 (jusqu'au PASS) pour les non-cadres. Les cadres cotisent en plus sur la tranche 2 (entre 1 et 8 PASS) à un taux plus élevé.</p>

          <h2>4. Le net imposable</h2>
          <p>Le net imposable n'est <em>pas</em> ce que vous recevez sur votre compte. C'est la base déclarée à l'administration fiscale. Il est légèrement supérieur au net à payer car la CSG non déductible (2,4 %) et la CRDS (0,5 %) sont réintégrées dans le revenu imposable.</p>

          <h2>5. Le prélèvement à la source (PAS)</h2>
          <p>Depuis 2019, l'impôt sur le revenu est collecté directement sur la fiche de paie. Le taux s'affiche sur votre bulletin. Il est personnalisé selon votre situation fiscale (transmis par la DGFiP à votre employeur). Si vous ne souhaitez pas que votre employeur connaisse votre taux, vous pouvez opter pour le taux non personnalisé.</p>

          <h2>6. Le net à payer</h2>
          <p>C'est enfin le montant viré sur votre compte bancaire. Le calcul simplifié :</p>
          <ul>
            <li>Brut − Cotisations salariales = Net imposable</li>
            <li>Net imposable − Prélèvement à la source = <strong>Net à payer</strong></li>
          </ul>

          <h2>7. Cumuls annuels</h2>
          <p>En bas de la fiche de paie figurent généralement les cumuls depuis janvier : brut cumulé, cotisations cumulées, net imposable cumulé et impôt cumulé. Ces données sont utiles pour remplir votre déclaration d'impôts (la DGFiP le fait en principe automatiquement).</p>

          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '20px 24px', margin: '32px 0' }}>
            <strong style={{ color: '#166534' }}>✅ Prochaine étape : calculez votre salaire</strong><br />
            <span style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>Utilisez notre <Link href="/#calculateur" style={{ color: '#12b886', fontWeight: 600 }}>calculateur brut en net</Link> pour simuler votre fiche de paie avec les taux 2026.</span>
          </div>
        </div>

        {/* Related articles */}
        <div style={{ marginTop: 60, borderTop: '1px solid var(--gray-200)', paddingTop: 40 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--gray-800)', marginBottom: 24 }}>📚 Articles liés</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { href: '/blog/cotisations-sociales-2026', label: 'Taux de cotisations 2026', icon: '📊' },
              { href: '/blog/smic-2026', label: 'SMIC 2026 : montant net', icon: '💶' },
              { href: '/', label: 'Calculateur brut en net', icon: '🧮' },
            ].map(r => (
              <Link key={r.href} href={r.href} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: 16, display: 'flex', gap: 10, alignItems: 'center', transition: 'all 0.15s' }}>
                  <span style={{ fontSize: 22 }}>{r.icon}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-700)' }}>{r.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  )
}
