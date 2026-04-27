'use client'
import { useState, useCallback } from 'react'
import { calculerSalaire, formatEur, SMIC_BRUT_MENSUEL, PASS_MENSUEL, type SalaireResult } from '@/lib/calculations'

type Mode = 'prive' | 'fonctionnaire' | 'horaire'
type Periode = 'mensuel' | 'annuel'
type Statut = 'non-cadre' | 'cadre'
type Tab = 'detail' | 'graphique' | 'employeur'

export default function SalaireCalculator() {
  const [mode, setMode] = useState<Mode>('prive')
  const [periode, setPeriode] = useState<Periode>('mensuel')
  const [statut, setStatut] = useState<Statut>('non-cadre')
  const [brut, setBrut] = useState('')
  const [parts, setParts] = useState(1)
  const [prime, setPrime] = useState('')
  const [mutuelle, setMutuelle] = useState('')
  const [tempsPartiel, setTempsPartiel] = useState(100)
  const [result, setResult] = useState<SalaireResult | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('detail')
  const [heures, setHeures] = useState('')
  const [tauxHoraire, setTauxHoraire] = useState('')

  const handleCalculer = useCallback(() => {
    let brutMensuel = 0
    if (mode === 'horaire') {
      const h = parseFloat(heures) || 0
      const taux = parseFloat(tauxHoraire) || 0
      brutMensuel = h * taux
    } else {
      brutMensuel = parseFloat(brut) || 0
      if (periode === 'annuel') brutMensuel = brutMensuel / 12
    }
    if (brutMensuel <= 0) return

    const res = calculerSalaire({
      brutMensuel,
      statut,
      partsFiscales: parts,
      prime: parseFloat(prime) || 0,
      mutuelle: parseFloat(mutuelle) || 0,
      avantagesNature: 0,
      tempsPartiel,
    })
    setResult(res)
  }, [mode, brut, periode, statut, parts, prime, mutuelle, tempsPartiel, heures, tauxHoraire])

  const barData = result
    ? [
        { label: 'Brut', value: result.brutMensuel, color: '#3b5bdb' },
        { label: 'Cotisations', value: result.cotisationsSalariales, color: '#f59e0b' },
        { label: 'Impôt', value: result.prelevementSource, color: '#ef4444' },
        { label: 'Net', value: result.netAPayer, color: '#12b886' },
      ]
    : []

  const maxBar = barData.length ? Math.max(...barData.map(d => d.value)) : 1

  return (
    <section id="calculateur" style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="calc-grid">

        {/* LEFT: Form */}
        <div className="card-elevated" style={{ padding: 28 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', marginBottom: 16, color: 'var(--gray-800)' }}>
              ⚙️ Paramètres de votre simulation
            </div>

            {/* Mode tabs */}
            <div style={{ display: 'flex', gap: 4, background: 'var(--gray-100)', borderRadius: 8, padding: 4, marginBottom: 24 }}>
              {([['prive', 'Salarié privé'], ['fonctionnaire', 'Fonctionnaire'], ['horaire', 'SMIC horaire']] as [Mode, string][]).map(([m, label]) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`tab-btn ${mode === m ? 'active' : ''}`}
                  style={{ flex: 1, fontSize: '0.82rem' }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {mode === 'horaire' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label className="label">Heures travaillées / mois</label>
                <input className="input-field" type="number" placeholder="151,67" value={heures} onChange={e => setHeures(e.target.value)} />
              </div>
              <div>
                <label className="label">Taux horaire brut (€/h)</label>
                <input className="input-field" type="number" placeholder={String(11.65)} value={tauxHoraire} onChange={e => setTauxHoraire(e.target.value)} />
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label className="label">
                  Salaire brut {mode === 'fonctionnaire' ? 'indiciaire' : ''}
                  <span style={{ color: 'var(--gray-400)', fontWeight: 400, marginLeft: 4 }}>?</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    className="input-field"
                    type="number"
                    placeholder={mode === 'prive' ? '2 500' : '2 200'}
                    value={brut}
                    onChange={e => setBrut(e.target.value)}
                    style={{ paddingRight: 40 }}
                  />
                  <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)', fontSize: '0.9rem' }}>€</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label className="label">Période</label>
                  <select className="select-field" value={periode} onChange={e => setPeriode(e.target.value as Periode)}>
                    <option value="mensuel">Mensuel</option>
                    <option value="annuel">Annuel</option>
                  </select>
                </div>
                {mode === 'prive' && (
                  <div>
                    <label className="label">Statut</label>
                    <select className="select-field" value={statut} onChange={e => setStatut(e.target.value as Statut)}>
                      <option value="non-cadre">Non-cadre</option>
                      <option value="cadre">Cadre</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="label">Parts fiscales</label>
                <select className="select-field" value={parts} onChange={e => setParts(parseFloat(e.target.value))}>
                  <option value={1}>1 part — célibataire</option>
                  <option value={1.5}>1,5 parts</option>
                  <option value={2}>2 parts — couple / 1 enfant</option>
                  <option value={2.5}>2,5 parts</option>
                  <option value={3}>3 parts — 2 enfants</option>
                  <option value={3.5}>3,5 parts</option>
                  <option value={4}>4 parts — 3 enfants</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label className="label">Prime mensuelle (€)</label>
                  <input className="input-field" type="number" placeholder="0" value={prime} onChange={e => setPrime(e.target.value)} />
                </div>
                <div>
                  <label className="label">Mutuelle salarié (€)</label>
                  <input className="input-field" type="number" placeholder="0" value={mutuelle} onChange={e => setMutuelle(e.target.value)} />
                </div>
              </div>

              {mode === 'prive' && (
                <div>
                  <label className="label">Temps de travail : <strong>{tempsPartiel}%</strong></label>
                  <input
                    type="range" min={10} max={100} step={5}
                    value={tempsPartiel}
                    onChange={e => setTempsPartiel(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--blue-500)' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                    <span>10%</span><span>Temps plein</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <button className="btn-primary" style={{ width: '100%', marginTop: 24, justifyContent: 'center' }} onClick={handleCalculer}>
            Calculer mon salaire net →
          </button>

          <p style={{ marginTop: 12, fontSize: '0.78rem', color: 'var(--gray-400)', textAlign: 'center' }}>
            ⚠️ Simulation estimative — barèmes 2026 officiels
          </p>

          {/* Key stats */}
          <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { label: 'SMIC brut', value: '1 766,92 €' },
              { label: 'SMIC net ~', value: '1 398 €' },
              { label: 'PASS mensuel', value: '3 864 €' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--gray-50)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--gray-400)', marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--blue-600)' }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {result ? (
            <>
              {/* Main result */}
              <div className="result-card animate-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: 6 }}>💶 Salaire net à payer</div>
                    <div className="result-value">{formatEur(result.netAPayer)}</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: 4 }}>par mois</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Annuel net</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{formatEur(result.netAPayer * 12)}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 20 }}>
                  {[
                    { label: 'Cotisations', value: formatEur(result.cotisationsSalariales) },
                    { label: 'Impôt PAS', value: formatEur(result.prelevementSource) },
                    { label: 'Taux global', value: `${result.tauxGlobal.toFixed(1)}%` },
                  ].map(s => (
                    <div key={s.label} className="stat-pill">
                      <div style={{ fontSize: '0.7rem', opacity: 0.75, marginBottom: 2 }}>{s.label}</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: 'var(--gray-100)', borderRadius: 8, padding: 4 }}>
                  {([['detail', '📋 Décomposition'], ['graphique', '📊 Graphique'], ['employeur', '🏢 Employeur']] as [Tab, string][]).map(([t, label]) => (
                    <button key={t} className={`tab-btn ${activeTab === t ? 'active' : ''}`} style={{ flex: 1, fontSize: '0.8rem' }} onClick={() => setActiveTab(t)}>
                      {label}
                    </button>
                  ))}
                </div>

                {activeTab === 'detail' && (
                  <div>
                    {[
                      { label: 'Salaire brut', value: result.brutMensuel, bold: true },
                      { label: '— Cotisations salariales', value: -result.cotisationsSalariales, red: true },
                      { label: '— Impôt sur le revenu (PAS)', value: -result.prelevementSource, red: true },
                      { label: '= Net à payer', value: result.netAPayer, green: true, bold: true },
                      { label: 'Net imposable', value: result.netImposable, sub: true },
                    ].map((row, i) => (
                      <div key={i} style={{
                        display: 'flex', justifyContent: 'space-between',
                        padding: '8px 0',
                        borderBottom: i < 4 ? '1px solid var(--gray-100)' : 'none',
                        fontSize: row.sub ? '0.8rem' : '0.9rem',
                      }}>
                        <span style={{ color: row.bold ? 'var(--gray-800)' : 'var(--gray-600)', fontWeight: row.bold ? 600 : 400 }}>{row.label}</span>
                        <span style={{
                          fontWeight: row.bold ? 700 : 500,
                          color: row.green ? '#12b886' : row.red ? '#e03131' : 'var(--gray-700)'
                        }}>
                          {row.value < 0 ? `−${formatEur(Math.abs(row.value))}` : formatEur(row.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'graphique' && (
                  <div>
                    {barData.map(bar => (
                      <div key={bar.label} style={{ marginBottom: 14 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.8rem' }}>
                          <span style={{ color: 'var(--gray-600)' }}>{bar.label}</span>
                          <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>{formatEur(bar.value)}</span>
                        </div>
                        <div style={{ height: 8, background: 'var(--gray-100)', borderRadius: 4, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${(bar.value / maxBar) * 100}%`, background: bar.color, borderRadius: 4, transition: 'width 0.6s ease' }} />
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: 16, padding: 12, background: 'var(--gray-50)', borderRadius: 8, fontSize: '0.8rem', color: 'var(--gray-500)' }}>
                      Taux de cotisations salariales : <strong>{result.tauxCotisations.toFixed(1)}%</strong> — Taux PAS estimé : <strong>{result.tauxImpot.toFixed(1)}%</strong>
                    </div>
                  </div>
                )}

                {activeTab === 'employeur' && (
                  <div>
                    <div style={{ padding: '16px', background: 'var(--blue-50)', borderRadius: 10, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: 'var(--blue-700)' }}>Coût total employeur</span>
                      <span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--blue-600)', fontFamily: 'var(--font-display)' }}>{formatEur(result.coutEmployeur)}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--gray-600)', marginBottom: 4 }}>Brut : {formatEur(result.brutMensuel)}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--gray-600)' }}>+ Charges patronales : {formatEur(result.cotisationsPatronales)}</div>
                    <div style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--gray-400)' }}>
                      Ratio : pour 100€ de net, l'employeur paie ~{((result.coutEmployeur / result.netAPayer) * 100).toFixed(0)}€
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="card-elevated" style={{ padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320, textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>💶</div>
              <p style={{ color: 'var(--gray-400)', marginBottom: 8 }}>Renseignez vos paramètres et cliquez sur <strong>Calculer</strong></p>
              <p style={{ color: 'var(--gray-300)', fontSize: '0.875rem' }}>Résultat instantané avec le détail complet</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .calc-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
