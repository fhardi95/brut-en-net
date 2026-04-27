'use client'
import { useState } from 'react'

function formatEur(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n)
}

export default function LicenciementCalculator() {
  const [salaireMensuel, setSalaireMensuel] = useState('')
  const [anneesAnc, setAnneesAnc] = useState('')
  const [moisAnc, setMoisAnc] = useState('')
  const [motif, setMotif] = useState('personnel')
  const [result, setResult] = useState<null | { indemnite: number; anneesTotal: number; tranche1: number; tranche2: number; salaireRef: number }>(null)

  const calculer = () => {
    const salaire = parseFloat(salaireMensuel) || 0
    const annees = parseInt(anneesAnc) || 0
    const mois = parseInt(moisAnc) || 0
    if (salaire <= 0) return

    const ancienneteTotal = annees + mois / 12

    // Seuil 8 mois
    if (ancienneteTotal < 8 / 12) {
      setResult(null)
      return
    }

    const salaireRef = salaire // simplifié : moyenne 12 mois = salaire mensuel

    // Tranche 1 : jusqu'à 10 ans
    const anneesTranche1 = Math.min(ancienneteTotal, 10)
    const tranche1 = anneesTranche1 * (1 / 4) * salaireRef

    // Tranche 2 : au-delà de 10 ans
    const anneesTranche2 = Math.max(0, ancienneteTotal - 10)
    const tranche2 = anneesTranche2 * (1 / 3) * salaireRef

    const indemnite = tranche1 + tranche2

    setResult({ indemnite, anneesTotal: ancienneteTotal, tranche1, tranche2, salaireRef })
  }

  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }} className="calc-grid">

        {/* Form */}
        <div className="card-elevated" style={{ padding: 28 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 24, color: 'var(--gray-800)' }}>
            ⚙️ Vos informations
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label className="label">Salaire brut mensuel de référence (€)</label>
              <input className="input-field" type="number" placeholder="Ex : 2 800" value={salaireMensuel} onChange={e => setSalaireMensuel(e.target.value)} />
              <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: 4 }}>Moyenne des 12 derniers mois (primes incluses)</p>
            </div>

            <div>
              <label className="label">Ancienneté</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <input className="input-field" type="number" placeholder="Années" min={0} value={anneesAnc} onChange={e => setAnneesAnc(e.target.value)} />
                </div>
                <div>
                  <input className="input-field" type="number" placeholder="Mois" min={0} max={11} value={moisAnc} onChange={e => setMoisAnc(e.target.value)} />
                </div>
              </div>
            </div>

            <div>
              <label className="label">Motif du licenciement</label>
              <select className="select-field" value={motif} onChange={e => setMotif(e.target.value)}>
                <option value="personnel">Motif personnel (non-faute grave)</option>
                <option value="economique">Motif économique</option>
                <option value="inaptitude">Inaptitude professionnelle</option>
              </select>
            </div>

            <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 8, padding: '12px 14px', fontSize: '0.82rem', color: '#92400e' }}>
              ⚠️ Cette simulation ne couvre pas la faute grave ou lourde (aucune indemnité due dans ce cas).
            </div>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={calculer}>
              Calculer mon indemnité →
            </button>
          </div>
        </div>

        {/* Result */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {result ? (
            <>
              <div style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b5bdb 100%)',
                color: 'white', borderRadius: 16, padding: 28,
              }} className="animate-in">
                <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: 8 }}>⚖️ Indemnité légale estimée</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.1 }}>
                  {formatEur(result.indemnite)}
                </div>
                <div style={{ marginTop: 8, fontSize: '0.85rem', opacity: 0.7 }}>
                  Brut — exonéré d'impôt et de cotisations sociales
                </div>
                <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[
                    { label: 'Ancienneté', value: `${result.anneesTotal.toFixed(1)} ans` },
                    { label: 'Salaire réf.', value: formatEur(result.salaireRef) },
                  ].map(s => (
                    <div key={s.label} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '10px 14px' }}>
                      <div style={{ fontSize: '0.72rem', opacity: 0.75, marginBottom: 2 }}>{s.label}</div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontWeight: 700, color: 'var(--gray-700)', marginBottom: 16, fontSize: '0.9rem' }}>📋 Décomposition du calcul</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    {
                      label: `Tranche 1 — ${Math.min(result.anneesTotal, 10).toFixed(1)} ans × ¼ × ${formatEur(result.salaireRef)}`,
                      value: result.tranche1,
                      color: 'var(--blue-500)',
                    },
                    ...(result.tranche2 > 0 ? [{
                      label: `Tranche 2 — ${Math.max(0, result.anneesTotal - 10).toFixed(1)} ans × ⅓ × ${formatEur(result.salaireRef)}`,
                      value: result.tranche2,
                      color: '#7c3aed',
                    }] : []),
                    { label: 'Total indemnité légale', value: result.indemnite, color: '#12b886', bold: true },
                  ].map((row, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '10px 0',
                      borderBottom: i < 2 ? '1px solid var(--gray-100)' : 'none',
                    }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--gray-600)' }}>{row.label}</span>
                      <span style={{ fontWeight: (row as any).bold ? 700 : 600, color: row.color, fontSize: '0.9rem' }}>{formatEur(row.value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: 18, background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '0.82rem', color: '#166534', lineHeight: 1.5 }}>
                  ✅ <strong>Exonération fiscale :</strong> L'indemnité légale de licenciement est totalement exonérée d'impôt sur le revenu et de charges sociales, quel que soit son montant.
                </div>
              </div>
            </>
          ) : (
            <div className="card-elevated" style={{ padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 280, textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>⚖️</div>
              <p style={{ color: 'var(--gray-400)', margin: 0 }}>Renseignez votre salaire et votre ancienneté pour obtenir votre estimation.</p>
              <p style={{ color: 'var(--gray-300)', fontSize: '0.8rem', marginTop: 8 }}>Minimum requis : 8 mois d'ancienneté</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .calc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
