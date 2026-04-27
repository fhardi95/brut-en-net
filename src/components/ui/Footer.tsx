'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--gray-900)', color: 'var(--gray-400)', marginTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'white', marginBottom: 12 }}>
              SalaireBrutNet<span style={{ color: 'var(--green-400)' }}>.fr</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
              Calculateur salaire brut en net pour la France. Barèmes 2026 officiels. Gratuit et sans inscription.
            </p>
            <div style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--gray-500)' }}>
              SMIC 2026 : 1 766,92 €<br />
              PASS mensuel : 3 864 €
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Calculateurs</div>
            {[
              { href: '/', label: 'Brut en Net (salaire privé)' },
              { href: '/?type=fonctionnaire', label: 'Salaire fonctionnaire' },
              { href: '/?type=horaire', label: 'SMIC horaire en net' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ display: 'block', padding: '4px 0', color: 'var(--gray-400)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.1s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray-400)')}
              >{l.label}</Link>
            ))}
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Outils RH</div>
            {[
              { href: '/outils/calcul-indemnite-licenciement', label: 'Indemnité licenciement' },
              { href: '/outils/calculer-indemnite-rupture-conventionnelle', label: 'Rupture conventionnelle' },
              { href: '/outils/simulation-allocation-chomage', label: 'Allocation chômage ARE' },
              { href: '/outils/simulation-apl', label: 'Simulation APL' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ display: 'block', padding: '4px 0', color: 'var(--gray-400)', textDecoration: 'none', fontSize: '0.875rem' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray-400)')}
              >{l.label}</Link>
            ))}
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Blog & Guides</div>
            {[
              { href: '/blog/comprendre-fiche-de-paie', label: 'Comprendre sa fiche de paie' },
              { href: '/blog/cotisations-sociales-2026', label: 'Cotisations sociales 2026' },
              { href: '/blog/negocier-salaire', label: 'Négocier son salaire' },
              { href: '/blog', label: 'Tous les articles →' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ display: 'block', padding: '4px 0', color: 'var(--gray-400)', textDecoration: 'none', fontSize: '0.875rem' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray-400)')}
              >{l.label}</Link>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--gray-700)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '0.8rem', margin: 0 }}>
            © 2026 SalaireBrutNet.fr — Simulation indicative. Pour un calcul officiel :{' '}
            <a href="https://mon-entreprise.urssaf.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green-400)' }}>mon-entreprise.urssaf.fr</a>
          </p>
          <p style={{ fontSize: '0.8rem', margin: 0, color: 'var(--gray-500)' }}>
            Ce calculateur ne constitue pas un conseil fiscal ou juridique.
          </p>
        </div>
      </div>
    </footer>
  )
}
