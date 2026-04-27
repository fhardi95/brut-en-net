import type { Metadata } from 'next'
import Link from 'next/link'
import { buildJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Prime d\'Activité CAF 2026 — Qui y a Droit et Calcul',
  description: 'Tout sur la prime d\'activité 2026 : conditions d\'éligibilité, montant maximum, calcul sur caf.fr et démarches. Complément de revenu pour les travailleurs à faibles revenus.',
  keywords: 'prime activité 2026, prime activité CAF, calculer prime activité, montant prime activité, éligibilité prime activité France',
  alternates: { canonical: 'https://www.salairebruten.fr/blog/prime-activite-caf' },
}

const jsonLd = buildJsonLd({
  '@type': 'Article',
  headline: 'Prime d\'activité CAF 2026 : qui y a droit et comment la calculer ?',
  datePublished: '2025-12-05',
  author: { '@type': 'Organization', name: 'SalaireBrutNet.fr' },
  url: 'https://www.salairebruten.fr/blog/prime-activite-caf',
  inLanguage: 'fr',
})

export default function PrimeActivitePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <section style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)', padding: '40px 20px 32px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 12 }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link> › <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link> › Prime d'activité CAF
          </div>
          <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, background: '#f0fdf4', color: '#059669', marginBottom: 14 }}>🏦 Aides sociales</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: 'var(--gray-900)', lineHeight: 1.2, marginBottom: 14 }}>
            Prime d'activité CAF 2026 : qui y a droit ?
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '1rem', lineHeight: 1.7 }}>La prime d'activité peut atteindre plusieurs centaines d'euros par mois pour les travailleurs à faibles revenus.</p>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: 12 }}>📅 5 décembre 2025 · ⏱ 7 min de lecture</div>
        </div>
      </section>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '50px 20px 80px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }} className="pa-grid">
          {[
            { label: 'Montant max. (personne seule)', value: '~630 €', sub: 'par mois' },
            { label: 'Plafond revenus (seul)', value: '~2 400 €', sub: 'net mensuel' },
            { label: 'Revalorisation', value: 'Trimestrielle', sub: 'avril, juillet, oct., janv.' },
          ].map(c => (
            <div key={c.label} style={{ background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white', borderRadius: 12, padding: '18px 14px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, marginBottom: 4 }}>{c.value}</div>
              <div style={{ fontSize: '0.72rem', opacity: 0.9, lineHeight: 1.4 }}>{c.label}</div>
              <div style={{ fontSize: '0.65rem', opacity: 0.7, marginTop: 3 }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div className="prose-content">
          <h2>Qu'est-ce que la prime d'activité ?</h2>
          <p>La prime d'activité est une aide de la CAF (Caisse d'Allocations Familiales) destinée aux travailleurs (salariés, indépendants, apprentis…) dont les revenus sont modestes. Elle remplace depuis 2016 la prime pour l'emploi (PPE) et le RSA activité.</p>

          <h2>Conditions d'éligibilité</h2>
          <p>Pour bénéficier de la prime d'activité en 2026, vous devez :</p>
          <ul>
            <li>Avoir <strong>18 ans ou plus</strong> (ou être majeur émancipé)</li>
            <li>Résider en France de manière stable et effective</li>
            <li>Exercer une activité professionnelle (salarié, indépendant, apprenti…)</li>
            <li>Avoir des revenus d'activité <strong>inférieurs à environ 2 400 € net/mois</strong> pour une personne seule (le plafond varie selon la composition du foyer)</li>
          </ul>

          <h2>Qui peut faire la demande ?</h2>
          <p>Tout travailleur dont les revenus sont inférieurs aux plafonds peut faire une demande, y compris les :</p>
          <ul>
            <li>Salariés à temps partiel ou temps plein</li>
            <li>Apprentis (sous conditions de revenus)</li>
            <li>Auto-entrepreneurs et indépendants</li>
            <li>Étudiants salariés travaillant suffisamment</li>
          </ul>

          <h2>Comment est calculée la prime d'activité ?</h2>
          <p>La prime d'activité est calculée trimestriellement selon une formule complexe qui prend en compte :</p>
          <ul>
            <li>Un <strong>montant forfaitaire</strong> (base de 628,08 €/mois pour une personne seule en 2026)</li>
            <li>Une <strong>bonification individuelle</strong> liée à vos revenus d'activité</li>
            <li>Les ressources du foyer (salaires, allocations, revenus du patrimoine…)</li>
            <li>La composition du foyer (nombre de personnes, enfants)</li>
          </ul>
          <p>Le calcul exact est effectué par la CAF. La formule simplifiée est : <em>Prime = Forfait + Bonification − 61 % × Ressources</em>.</p>

          <h2>Comment faire sa demande ?</h2>
          <p>La démarche est entièrement en ligne, sur <strong>caf.fr</strong> ou via l'application mobile CAF. La demande nécessite vos 3 derniers bulletins de salaire et vos relevés de compte récents. Le premier versement intervient généralement 2 à 3 mois après la demande.</p>

          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '20px 24px', margin: '32px 0' }}>
            <strong style={{ color: '#166534' }}>✅ Simulation officielle</strong><br />
            <span style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
              Faites votre simulation directement sur{' '}
              <a href="https://www.caf.fr/allocataires/mes-services-en-ligne/faire-une-simulation/prime-d-activite" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', fontWeight: 600 }}>
                caf.fr → Simuler ma prime d'activité
              </a>
            </span>
          </div>

          <p>Notre calculateur brut en net ne simule pas la prime d'activité (calcul trop dépendant de la situation globale du foyer), mais vous aide à calculer votre <Link href="/" style={{ color: '#3b5bdb' }}>salaire net à payer</Link> que vous devrez déclarer à la CAF.</p>
        </div>

        <style>{`@media (max-width: 640px) { .pa-grid { grid-template-columns: 1fr !important; } }`}</style>
      </article>
    </>
  )
}
