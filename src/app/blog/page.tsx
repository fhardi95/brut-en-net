import type { Metadata } from 'next'
import { buildJsonLd } from '@/lib/seo'
import BlogGrid from './BlogGrid'

export const metadata: Metadata = {
  title: 'Blog & Guides Salaire — Conseils RH et Finances Personnelles 2026',
  description: 'Guides pratiques sur le salaire brut en net, les cotisations sociales, la fiche de paie, la négociation salariale et les aides sociales en France. Mis à jour en 2026.',
  keywords: 'guide salaire France, comprendre fiche de paie, cotisations sociales 2026, négocier salaire, aide au logement, chômage France',
  alternates: { canonical: 'https://www.salairebruten.fr/blog' },
}

export const articles = [
  {
    slug: 'comprendre-fiche-de-paie',
    category: 'Fiche de paie',
    categoryColor: '#3b5bdb',
    categoryBg: '#eef2ff',
    title: 'Comment lire et comprendre sa fiche de paie en 2026',
    excerpt: "Décryptage complet des lignes de votre bulletin de salaire : cotisations, net imposable, prélèvement à la source, avantages en nature. Tout ce qu'il faut savoir.",
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
    excerpt: 'Tous les taux de cotisations salariales et patronales en vigueur en 2026. URSSAF, retraite, chômage, maladie. Mise à jour avec les dernières réformes.',
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
    excerpt: "Techniques éprouvées pour négocier une augmentation ou un salaire à l'embauche. Données de marché, timing, formulations et erreurs à éviter.",
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
    excerpt: 'Le SMIC 2026 est fixé à 11,65 €/h soit 1 766,92 €/mois brut. Calcul du net, heures supplémentaires et primes expliqués.',
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
    excerpt: 'Comparatif complet des deux modes de rupture du CDI : indemnités, droits au chômage, fiscalité et délais. Cas pratiques et conseils.',
    date: '15 décembre 2025',
    readTime: '9 min',
    icon: '⚖️',
  },
  {
    slug: 'prime-activite-caf',
    category: 'Aides sociales',
    categoryColor: '#059669',
    categoryBg: '#f0fdf4',
    title: "Prime d'activité CAF 2026 : qui y a droit et comment la calculer ?",
    excerpt: "La prime d'activité peut atteindre 600 €/mois. Conditions d'éligibilité, calcul, simulation et démarches en ligne sur caf.fr. Mise à jour 2026.",
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
      <BlogGrid articles={articles} />
    </>
  )
}
