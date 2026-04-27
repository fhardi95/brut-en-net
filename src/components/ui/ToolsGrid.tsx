'use client'
import Link from 'next/link'

interface Tool {
  href: string
  icon: string
  title: string
  desc: string
  badge: string
}

export default function ToolsGrid({ tools }: { tools: Tool[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
      {tools.map(tool => (
        <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
          <div
            className="card"
            style={{ padding: 24, height: '100%', transition: 'all 0.2s', cursor: 'pointer' }}
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
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--gray-800)', margin: 0 }}>
                {tool.title}
              </h3>
              <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>{tool.badge}</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', margin: 0, lineHeight: 1.5 }}>
              {tool.desc}
            </p>
            <div style={{ marginTop: 16, fontSize: '0.85rem', color: 'var(--blue-500)', fontWeight: 600 }}>
              Calculer →
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
