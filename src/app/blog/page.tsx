import type { Metadata } from 'next'
import Link from 'next/link'
import { buildJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Blog & Guides Salaire — Conseils RH et Finances Personnelles 2026',
  description: 'Guides pratiques sur le salaire brut en net, les cotisations sociales, la fiche de paie, la négociation salariale et les aides sociales en France. Mis à jour en 2026.',
  keywords: 'guide salaire France, comprendre fiche de paie, cotisations sociales 2026, négocier salaire, aide au logement, chômage France',
  alternates: { canonical: 'https://www.salairebruten.fr/blog' },
}

const articles = [
  {
    slug: 'comprendre-fiche-de-paie',
    category: 'Fiche de paie',
    categoryColor: '#3b5bdb',
    categoryBg: '#eef2ff',
    title: 'Comment lire et comprendre sa fiche de paie en 2026',
    excerpt: 'Décryptage complet des lignes de votre bulletin de salaire : cotisations, net imposable, prélèvement à la source, avantages en nature… Tout ce qu\'il faut savoir.',
    date: '12 janvier 2026',
    readTime: '8 min',
    icon: '📄',
  },
  {
    slug: 'cotisations-sociales-2026',
    category: 'Cotisations',
    categoryColor: '#7c3aed',
    categoryBg: '#f3e8ff',
    title: 'Taux de cotisations sociales 2026 : le guide complet',
    excerpt: 'Tous les taux de cotisations salariales et patronales en vigueur en 2026. URSSAF, retraite, chômage, maladie… Mise à jour avec les dernières réformes.',
    date: '3 janvier 2026',
    readTime: '10 min',
    icon: '📊',
  },
  {
    slug: 'negocier-salaire',
    category: 'Carrière',
    categoryColor: '#12b886',
    categoryBg: '#e6fcf5',
    title: 'Comment négocier son salaire : guide stratégique 2026',
    excerpt: 'Techniques éprouvées pour négocier une augmentation ou un salaire à l\'embauche. Données de marché, timing, formulations et erreurs à éviter.',
    date: '28 décembre 2025',
    readTime: '12 min',
    icon: '💬',
  },
  {
    slug: 'smic-2026',
    category: 'Réglementation',
    categoryColor: '#e11d48',
    categoryBg: '#fff1f2',
    title: 'SMIC 2026 : montant brut, net et évolution',
    excerpt: 'Le SMIC 2026 est fixé à 11,65 €/h soit 1 766,92 €/mois brut. On vous explique tout sur le calcul du net, les heures supplémentaires et les primes.',
    date: '1er janvier 2026',
    readTime: '6 min',
    icon: '💶',
  },
  {
    slug: 'rupture-conventionnelle-vs-licenciement',
    category: 'Rupture contrat',
    categoryColor: '#f59e0b',
    categoryBg: '#fffbeb',
    title: 'Rupture conventionnelle vs licenciement : que choisir ?',
    excerpt: 'Comparatif complet des deux modes de rupture du CDI : indemnités, droits au chômage, fiscalité et délais. Cas pratiques et conseils pour faire le bon choix.',
    date: '15 décembre 2025',
    readTime: '9 min',
    icon: '⚖️',
  },
  {
    slug: 'prime-activite-caf',
    category: 'Aides sociales',
    categoryColor: '#059669',
    categoryBg: '#f0fdf4',
    title: 'Prime d\'activité CAF 2026 : qui y a droit et comment la calculer ?',
    excerpt: 'La prime d\'activité peut atteindre 600 €/mois. Conditions d\'éligibilité, calcul, simulation et démarches en ligne sur caf.fr. Mise à jour 2026.',
    date: '5 décembre 2025',
    readTime: '7 min',
    icon: '🏦',
  },
]

const jsonLd = buildJsonLd({
  '@type': 'Blog',
  name: 'Blog SalaireBrutNet.fr — Guides Salaire & RH',
  url: 'https://www.salairebruten.fr/blog',
  description: 'Articles et guides pratiques sur la paie, les cotisations sociales et les aides en France.',
  inLanguage: 'fr',
  blogPost: articles.map(a => ({
    '@type': 'BlogPosting',
    headline: a.title,
    description: a.excerpt,
    url: `https://www.salairebruten.fr/blog/${a.slug}`,
    datePublished: a.date,
  })),
})

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <section style={{
        background: 'linear-gradient(160deg, #f8fafc 0%, #eef2ff 100%)',
        borderBottom: '1px solid var(--gray-200)',
        padding: '50px 20px 40px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 12 }}>
            <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</a> › Blog & Guides
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--gray-900)', lineHeight: 1.2, marginBottom: 16 }}>
            Blog & Guides Salaire 2026
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '1rem', maxWidth: 600, lineHeight: 1.7 }}>
            Tout ce qu'il faut savoir sur le salaire brut en net, les cotisations sociales, la fiche de paie et vos droits. Guides mis à jour en 2026.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '50px 20px 80px' }}>

        {/* Featured article */}
        <div style={{ marginBottom: 48 }}>
          <Link href={`/blog/${articles[0].slug}`} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 160px', gap: 28, transition: 'all 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
              className="featured-card"
            >
              <div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                  <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, background: articles[0].categoryBg, color: articles[0].categoryColor }}>
                    {articles[0].category}
                  </span>
                  <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, background: '#fffbeb', color: '#92400e' }}>
                    ⭐ À la une
                  </span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--gray-900)', marginBottom: 12 }}>{articles[0].title}</h2>
                <p style={{ color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: 16 }}>{articles[0].excerpt}</p>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>
                  {articles[0].date} · {articles[0].readTime} de lecture
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, background: 'var(--gray-50)', borderRadius: 12 }}>
                {articles[0].icon}
              </div>
            </div>
          </Link>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {articles.slice(1).map(article => (
            <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: 'none' }}>
              <article className="card" style={{ padding: 24, height: '100%', transition: 'all 0.2s', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>{article.icon}</div>
                <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 600, background: article.categoryBg, color: article.categoryColor, marginBottom: 10, alignSelf: 'flex-start' }}>
                  {article.category}
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--gray-800)', marginBottom: 10, flex: 1 }}>{article.title}</h2>
                <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: 14 }}>{article.excerpt.substring(0, 110)}…</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--gray-400)', borderTop: '1px solid var(--gray-100)', paddingTop: 12 }}>
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .featured-card { grid-template-columns: 1fr !important; }
          .featured-card > div:last-child { display: none !important; }
        }
      `}</style>
    </>
  )
}
