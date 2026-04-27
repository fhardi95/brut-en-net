'use client'
import { useState } from 'react'

function formatEur(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n)
}

// Loyers plafonds 2026 (personne seule)
const LOYER_PLAFOND: Record<string, number> = { z1: 347, z2: 275, z3: 252 }
const ZONE_LABELS: Record<string, string> = {
  z1: 'Zone 1 (Paris / Île-de-France proche)',
  z2: 'Zone 2 (Grandes agglomérations)',
  z3: 'Zone 3 (Reste de la France)',
}

// Participation minimale du locataire (Po) 2026
const PO_BASE = 36.18

export default function AplCalculator() {
  const [loyer, setLoyer] = useState('')
  const [revenus, setRevenus] = useState('')
  const [zone, setZone] = useState('z2')
  const [situation, setSituation] = useState('seul')
  const [enfants, setEnfants] = useState(0)
  const [result, setResult] = useState<null | {
    apl: number; loyerPlafond: number; loyerRetenu: number; participation: number
    tauxEffort: number; loyerReel: number
  }>(null)

  const calculer = () => {
    const loyerReel = parseFloat(loyer) || 0
    const rev = parseFloat(revenus) || 0
    if (loyerReel <= 0 || rev <= 0) return

    // Loyer plafond selon zone + situation
    let plafond = LOYER_PLAFOND[zone]
    if (situation === 'couple') plafond += 62
    plafond += enfants * 14

    const loyerRetenu = Math.min(loyerReel, plafond)

    // Taux de participation (simplifié)
    // Tp = Taux de participation = f(revenus)
    const rMensuel = rev / 12
    let tauxPart = 0.3
    if (rMensuel < 800) tauxPart = 0.1
    else if (rMensuel < 1200) tauxPart = 0.15
    else if (rMensuel < 1600) tauxPart = 0.20
    else if (rMensuel < 2000) tauxPart = 0.25
    else if (rMensuel < 2500) tauxPart = 0.30
    else tauxPart = 0.35

    const participation = Math.max(PO_BASE, rMensuel * tauxPart)
    let apl = loyerRetenu - participation
    apl = Math.max(0, apl)

    // Minimum de versement CAF : 10€
    if (apl < 10) apl = 0

    const tauxEffort = apl > 0 ? ((loyerReel - apl) / rMensuel) * 100 : (loyerReel / rMensuel) * 100

    setResult({ apl, loyerPlafond: plafond, loyerRetenu, participation, tauxEffort, loyerReel })
  }

  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }} className="calc-grid">

        {/* Form */}
        <div className="card-elevated" style={{ padding: 28 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 24, color: 'var(--gray-800)' }}>
            ⚙️ Votre situation
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            <div>
              <label className="label">Loyer mensuel charges comprises (€)</label>
              <input className="input-field" type="number" placeholder="Ex : 650" value={loyer} onChange={e => setLoyer(e.target.value)} />
            </div>

            <div>
              <label className="label">Revenus annuels nets imposables du foyer (€)</label>
              <input className="input-field" type="number" placeholder="Ex : 18 000" value={revenus} onChange={e => setRevenus(e.target.value)} />
              <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: 4 }}>12 derniers mois — tous membres du foyer</p>
            </div>

            <div>
              <label className="label">Zone géographique</label>
              <select className="select-field" value={zone} onChange={e => setZone(e.target.value)}>
                {Object.entries(ZONE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label className="label">Situation familiale</label>
                <select className="select-field" value={situation} onChange={e => setSituation(e.target.value)}>
                  <option value="seul">Personne seule</option>
                  <option value="couple">Couple</option>
                </select>
              </div>
              <div>
                <label className="label">Enfants à charge</label>
                <select className="select-field" value={enfants} onChange={e => setEnfants(parseInt(e.target.value))}>
                  {[0, 1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n} enfant{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ background: '#fff1f2', border: '1px solid #fca5a5', borderRadius: 8, padding: '12px 14px', fontSize: '0.82rem', color: '#9f1239' }}>
              ⚠️ Estimation indicative. Le montant définitif est calculé par la CAF sur <a href="https://www.caf.fr" target="_blank" rel="noopener noreferrer" style={{ color: '#be123c' }}>caf.fr</a>.
            </div>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#e11d48' }} onClick={calculer}>
              Simuler mon APL →
            </button>
          </div>
        </div>

        {/* Result */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {result ? (
            <>
              {result.apl > 0 ? (
                <div style={{ background: 'linear-gradient(135deg, #9f1239 0%, #e11d48 100%)', color: 'white', borderRadius: 16, padding: 28 }} className="animate-in">
                  <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: 8 }}>🏠 APL estimée</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.1 }}>
                    {formatEur(result.apl)}
                    <span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.8 }}> /mois</span>
                  </div>
                  <div style={{ marginTop: 4, fontSize: '0.85rem', opacity: 0.7 }}>
                    Soit {formatEur(result.apl * 12)} par an
                  </div>
                  <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {[
                      { label: 'Loyer après APL', value: formatEur(result.loyerReel - result.apl) },
                      { label: 'Taux d\'effort', value: `${result.tauxEffort.toFixed(1)}%` },
                    ].map(s => (
                      <div key={s.label} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '10px 14px' }}>
                        <div style={{ fontSize: '0.72rem', opacity: 0.75, marginBottom: 2 }}>{s.label}</div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{s.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="card-elevated" style={{ padding: 28, textAlign: 'center', border: '2px solid #fca5a5' }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>❌</div>
                  <div style={{ fontWeight: 700, color: '#dc2626', marginBottom: 6 }}>Pas d'APL estimée</div>
                  <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem' }}>Vos revenus semblent trop élevés par rapport à votre loyer pour bénéficier d'une aide. Vérifiez sur caf.fr pour un calcul officiel.</p>
                </div>
              )}

              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontWeight: 700, color: 'var(--gray-700)', marginBottom: 16, fontSize: '0.9rem' }}>📊 Détail du calcul</div>
                {[
                  { label: 'Loyer réel', value: formatEur(result.loyerReel) },
                  { label: `Loyer plafond (zone ${zone.toUpperCase()})`, value: formatEur(result.loyerPlafond) },
                  { label: 'Loyer retenu pour le calcul', value: formatEur(result.loyerRetenu), note: 'min(loyer, plafond)' },
                  { label: 'Participation du locataire (Po)', value: `- ${formatEur(result.participation)}`, red: true },
                  { label: 'APL estimée', value: formatEur(result.apl), bold: true, green: result.apl > 0 },
                ].map((row, i, arr) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                    padding: '9px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--gray-100)' : 'none',
                    fontSize: '0.83rem',
                  }}>
                    <div>
                      <span style={{ color: 'var(--gray-600)', fontWeight: (row as any).bold ? 600 : 400 }}>{row.label}</span>
                      {(row as any).note && <div style={{ fontSize: '0.7rem', color: 'var(--gray-400)' }}>{(row as any).note}</div>}
                    </div>
                    <span style={{
                      fontWeight: (row as any).bold ? 700 : 500,
                      color: (row as any).green ? '#12b886' : (row as any).red ? '#dc2626' : 'var(--gray-700)',
                      marginLeft: 8,
                    }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="card" style={{ padding: 16, background: '#fff1f2', border: '1px solid #fecaca' }}>
                <div style={{ fontSize: '0.82rem', color: '#9f1239' }}>
                  🔗 Pour votre simulation officielle, rendez-vous sur{' '}
                  <a href="https://www.caf.fr/allocataires/mes-services-en-ligne/faire-une-simulation" target="_blank" rel="noopener noreferrer" style={{ color: '#be123c', fontWeight: 600 }}>
                    caf.fr → Simulateur APL
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="card-elevated" style={{ padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 280, textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🏠</div>
              <p style={{ color: 'var(--gray-400)', margin: 0 }}>Renseignez votre loyer, revenus et situation pour estimer votre APL.</p>
            </div>
          )}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .calc-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
