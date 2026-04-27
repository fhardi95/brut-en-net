'use client'
import Link from 'next/link'

interface Article {
  slug: string
  category: string
  categoryColor: string
  categoryBg: string
  title: string
  excerpt: string
  date: string
  readTime: string
  icon: string
}

export default function BlogGrid({ articles }: { articles: Article[] }) {
  return (
    <section style={{ maxWidth: 1000, margin: '0 auto', padding: '50px 20px 80px' }}>
      {/* Featured article */}
      <div style={{ marginBottom: 48 }}>
        <Link href={`/blog/${articles[0].slug}`} style={{ textDecoration: 'none' }}>
          <div
            className="card featured-card"
            style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 160px', gap: 28, transition: 'all 0.2s', cursor: 'pointer' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'var(--shadow-lg)'; el.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'var(--shadow-sm)'; el.style.transform = 'translateY(0)' }}
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
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--gray-900)', marginBottom: 12 }}>
                {articles[0].title}
              </h2>
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: 16 }}>
                {articles[0].excerpt}
              </p>
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

      {/* Article grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {articles.slice(1).map(article => (
          <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: 'none' }}>
            <article
              className="card"
              style={{ padding: 24, height: '100%', transition: 'all 0.2s', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'var(--shadow-lg)'; el.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'var(--shadow-sm)'; el.style.transform = 'translateY(0)' }}
            >
              <div style={{ fontSize: 32, marginBottom: 14 }}>{article.icon}</div>
              <span style={{
                display: 'inline-block', padding: '3px 10px', borderRadius: 20,
                fontSize: '0.72rem', fontWeight: 600,
                background: article.categoryBg, color: article.categoryColor,
                marginBottom: 10, alignSelf: 'flex-start',
              }}>
                {article.category}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--gray-800)', marginBottom: 10, flex: 1 }}>
                {article.title}
              </h2>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: 14 }}>
                {article.excerpt.substring(0, 110)}…
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--gray-400)', borderTop: '1px solid var(--gray-100)', paddingTop: 12 }}>
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .featured-card { grid-template-columns: 1fr !important; }
          .featured-card > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  )
}
