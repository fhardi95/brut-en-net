'use client'
import { useState } from 'react'
import Link from 'next/link'

const outils = [
  { href: '/outils/calcul-indemnite-licenciement', label: 'Indemnité de licenciement' },
  { href: '/outils/calculer-indemnite-rupture-conventionnelle', label: 'Rupture conventionnelle' },
  { href: '/outils/simulation-allocation-chomage', label: 'Allocation chômage (ARE)' },
  { href: '/outils/simulation-apl', label: 'Simulation APL' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [outilsOpen, setOutilsOpen] = useState(false)

  return (
    <header style={{
      background: 'white',
      borderBottom: '1px solid var(--gray-200)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'linear-gradient(135deg, var(--blue-500), var(--blue-700))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: '0.9rem',
            }}>€</div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--gray-900)', fontWeight: 700 }}>
              SalaireBrutNet<span style={{ color: 'var(--blue-500)' }}>.fr</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
            <Link href="/" style={{ padding: '8px 14px', color: 'var(--gray-600)', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', borderRadius: 6, transition: 'all 0.15s' }}>
              Calculateur
            </Link>

            <div style={{ position: 'relative' }} onMouseEnter={() => setOutilsOpen(true)} onMouseLeave={() => setOutilsOpen(false)}>
              <button style={{ padding: '8px 14px', color: 'var(--gray-600)', fontSize: '0.9rem', fontWeight: 500, border: 'none', background: 'none', cursor: 'pointer', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                Outils ▾
              </button>
              {outilsOpen && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0,
                  background: 'white', border: '1px solid var(--gray-200)',
                  borderRadius: 10, boxShadow: 'var(--shadow-lg)',
                  padding: 8, minWidth: 260, zIndex: 100,
                }}>
                  {outils.map(o => (
                    <Link key={o.href} href={o.href} style={{
                      display: 'block', padding: '9px 14px',
                      color: 'var(--gray-700)', fontSize: '0.875rem',
                      textDecoration: 'none', borderRadius: 6,
                      transition: 'all 0.1s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-50)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      {o.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/blog" style={{ padding: '8px 14px', color: 'var(--gray-600)', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', borderRadius: 6 }}>
              Blog & Guides
            </Link>

            <Link href="/#calculateur" style={{
              padding: '9px 18px',
              background: 'var(--blue-500)', color: 'white',
              fontSize: '0.875rem', fontWeight: 600,
              textDecoration: 'none', borderRadius: 8,
              transition: 'all 0.15s',
            }}>
              Calculer →
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: 'none', border: 'none', background: 'none', cursor: 'pointer', padding: 8 }}
            className="mobile-menu-btn"
            aria-label="Menu"
          >
            <div style={{ width: 22, height: 2, background: 'var(--gray-700)', marginBottom: 5, borderRadius: 2 }} />
            <div style={{ width: 22, height: 2, background: 'var(--gray-700)', marginBottom: 5, borderRadius: 2 }} />
            <div style={{ width: 22, height: 2, background: 'var(--gray-700)', borderRadius: 2 }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ borderTop: '1px solid var(--gray-100)', padding: '12px 0 16px' }}>
            <Link href="/" style={{ display: 'block', padding: '10px 4px', color: 'var(--gray-700)', textDecoration: 'none', fontWeight: 500 }}>Calculateur</Link>
            <div style={{ padding: '8px 4px', fontSize: '0.8rem', color: 'var(--gray-400)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Outils</div>
            {outils.map(o => (
              <Link key={o.href} href={o.href} style={{ display: 'block', padding: '8px 4px', color: 'var(--gray-600)', textDecoration: 'none', paddingLeft: 12 }}>{o.label}</Link>
            ))}
            <Link href="/blog" style={{ display: 'block', padding: '10px 4px', color: 'var(--gray-700)', textDecoration: 'none', fontWeight: 500 }}>Blog & Guides</Link>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  )
}
