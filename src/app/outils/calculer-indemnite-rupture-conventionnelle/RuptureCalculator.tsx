'use client'
import { useState } from 'react'

function formatEur(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n)
}

export default function RuptureCalculator() {
  const [salaire, setSalaire] = useState('')
  const [annees, setAnnees] = useState('')
  const [mois, setMois] = useState('')
  const [majorationPct, setMajorationPct] = useState(0)
  const [result, setResult] = useState<null | {
    indemniteBase: number; majoration: number; total: number; anneesTotal: number;
    tranche1: number; tranche2: number; delaiCarence: number;
  }>(null)

  const calculer = () => {
    const sal = parseFloat(salaire) || 0
    const ans = parseInt(annees) || 0
    const mo = parseInt(mois) || 0
    if (sal <= 0) return

    const ancienneteTotal = ans + mo / 12
    if (ancienneteTotal < 8 / 12) { setResult(null); return }

    const anneesTranche1 = Math.min(ancienneteTotal, 10)
    const anneesTranche2 = Math.max(0, ancienneteTotal - 10)
    const tranche1 = anneesTranche1 * 0.25 * sal
    const tranche2 = anneesTranche2 * (1 / 3) * sal
    const indemniteBase = tranche1 + tranche2
    const majoration = indemniteBase * (majorationPct / 100)
    const total = indemniteBase + majoration
    // Délai de carence différé (simplifié) : indemnité / (SJR * 75)
    const sjrEstime = (sal / 30) * 0.75
    const delaiCarence = Math.min(Math.round(total / sjrEstime), 150)

    setResult({ indemniteBase, majoration, total, anneesTotal: ancienneteTotal, tranche1, tranche2, delaiCarence })
  }

  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }} className="calc-grid">
        <div className="card-elevated" style={{ padding: 28 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 24, color: 'var(--gray-800)' }}>⚙️ Vos informations</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label className="label">Salaire brut mensuel de référence (€)</label>
              <input className="input-field" type="number" placeholder="Ex : 3 000" value={salaire} onChange={e => setSalaire(e.target.value)} />
              <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: 4 }}>Moyenne des 12 derniers mois (1/12 des primes annuelles incluses)</p>
            </div>

            <div>
              <label className="label">Ancienneté dans l'entreprise</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <input className="input-field" type="number" placeholder="Années" min={0} value={annees} onChange={e => setAnnees(e.target.value)} />
                <input className="input-field" type="number" placeholder="Mois" min={0} max={11} value={mois} onChange={e => setMois(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="label">Majoration négociée : <strong>+{majorationPct}%</strong></label>
              <input type="range" min={0} max={100} step={5} value={majorationPct} onChange={e => setMajorationPct(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#12b886' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                <span>0% (minimum légal)</span><span>+100%</span>
              </div>
            </div>

            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: '12px 14px', fontSize: '0.82rem', color: '#166534' }}>
              ✅ La rupture conventionnelle ouvre droit à l'ARE (allocation chômage) contrairement à la démission.
            </div>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#12b886' }} onClick={calculer}>
              Calculer mon indemnité →
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {result ? (
            <>
              <div style={{ background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)', color: 'white', borderRadius: 16, padding: 28 }} className="animate-in">
                <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: 8 }}>🤝 Indemnité de rupture conventionnelle</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.1 }}>{formatEur(result.total)}</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: 4 }}>
                  {majorationPct > 0 ? `Dont ${formatEur(result.indemniteBase)} légal + ${formatEur(result.majoration)} négocié` : 'Montant légal minimum'}
                </div>
                <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[
                    { label: 'Ancienneté', value: `${result.anneesTotal.toFixed(1)} ans` },
                    { label: 'Délai de carence ~', value: `${result.delaiCarence}j` },
                  ].map(s => (
                    <div key={s.label} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '10px 14px' }}>
                      <div style={{ fontSize: '0.72rem', opacity: 0.75, marginBottom: 2 }}>{s.label}</div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontWeight: 700, color: 'var(--gray-700)', marginBottom: 16, fontSize: '0.9rem' }}>📋 Décomposition</div>
                {[
                  { label: `Tranche 1 — ${Math.min(result.anneesTotal, 10).toFixed(1)} ans × ¼`, value: result.tranche1, color: '#12b886' },
                  ...(result.tranche2 > 0 ? [{ label: `Tranche 2 — ${Math.max(0, result.anneesTotal - 10).toFixed(1)} ans × ⅓`, value: result.tranche2, color: '#059669' }] : []),
                  ...(result.majoration > 0 ? [{ label: `Majoration négociée (+${majorationPct}%)`, value: result.majoration, color: '#7c3aed' }] : []),
                  { label: 'Total indemnité', value: result.total, color: '#065f46', bold: true },
                ].map((row, i, arr) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--gray-100)' : 'none', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--gray-600)' }}>{row.label}</span>
                    <span style={{ fontWeight: (row as any).bold ? 700 : 600, color: row.color }}>{formatEur(row.value)}</span>
                  </div>
                ))}
              </div>

              <div className="card" style={{ padding: 16, background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                <div style={{ fontSize: '0.82rem', color: '#1e40af' }}>
                  💡 <strong>Droits chômage :</strong> Après homologation par la DREETS, vous pouvez vous inscrire à France Travail et bénéficier de l'ARE après le délai de carence (~{result.delaiCarence} jours estimés).
                </div>
              </div>
            </>
          ) : (
            <div className="card-elevated" style={{ padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 280, textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🤝</div>
              <p style={{ color: 'var(--gray-400)', margin: 0 }}>Renseignez votre salaire et ancienneté pour simuler votre indemnité.</p>
            </div>
          )}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .calc-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
