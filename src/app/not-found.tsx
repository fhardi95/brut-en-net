import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🔍</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--gray-900)', marginBottom: 12 }}>
        Page introuvable
      </h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 32, lineHeight: 1.6 }}>
        Cette page n'existe pas ou a été déplacée. Utilisez notre calculateur brut en net depuis la page d'accueil.
      </p>
      <Link href="/" style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '12px 24px', background: 'var(--blue-500)', color: 'white',
        borderRadius: 8, textDecoration: 'none', fontWeight: 600,
      }}>
        ← Retour au calculateur
      </Link>
    </div>
  )
}
