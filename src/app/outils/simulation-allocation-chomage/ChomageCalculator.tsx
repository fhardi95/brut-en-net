'use client'
import { useState } from 'react'

function formatEur(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n)
}

export default function ChomageCalculator() {
  const [salaireBrut, setSalaireBrut] = useState('')
  const [moisTravailles, setMoisTravailles] = useState('')
  const [age, setAge] = useState('moins53')
  const [motifFin, setMotifFin] = useState('licenciement')
  const [result, setResult] = useState<null | {
    sjr: number; areJour1: number; areJour2: number; areJour: number
    areMensuel: number; areAnnuel: number; dureeJours: number; dureeMois: number
    eligible: boolean; raison?: string
  }>(null)

  const calculer = () => {
    const sal = parseFloat(salaireBrut) || 0
    const mois = parseInt(moisTravailles) || 0

    if (mois < 6) {
      setResult({ eligible: false, raison: 'Vous devez avoir travaillé au moins 6 mois (130 jours) dans les 24 derniers mois.', sjr: 0, areJour1: 0, areJour2: 0, areJour: 0, areMensuel: 0, areAnnuel: 0, dureeJours: 0, dureeMois: 0 })
      return
    }
    if (sal <= 0) return

    // SJR = salaire brut mensuel / 30.42 (jours moyens)
    const sjr = (sal / 30.42)

    // Formule 1 : 40.4% SJR + 12.12
    const areJour1 = sjr * 0.404 + 12.12
    // Formule 2 : 57% SJR
    const areJour2 = sjr * 0.57
    // Retenir le plus élevé, plafonné à 75% SJR, plancher 29.26
    let areJour = Math.max(areJour1, areJour2)
    areJour = Math.min(areJour, sjr * 0.75)
    areJour = Math.max(areJour, 29.26)

    const areMensuel = areJour * 30.42
    const areAnnuel = areMensuel * 12

    // Durée : égale à durée travaillée, plafond selon âge
    const plafond = age === 'plus55' ? 36 : age === '5354' ? 30 : 24
    const dureeMois = Math.min(mois, plafond)
    const dureeJours = dureeMois * 30

    setResult({ eligible: true, sjr, areJour1, areJour2, areJour, areMensuel, areAnnuel, dureeJours, dureeMois })
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
              <label className="label">Salaire brut mensuel moyen (€)</label>
              <input className="input-field" type="number" placeholder="Ex : 2 500" value={salaireBrut} onChange={e => setSalaireBrut(e.target.value)} />
              <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: 4 }}>Moyenne sur les 12 derniers mois de travail</p>
            </div>

            <div>
              <label className="label">Mois travaillés (sur les 24 derniers mois)</label>
              <input className="input-field" type="number" placeholder="Ex : 18" min={0} max={24} value={moisTravailles} onChange={e => setMoisTravailles(e.target.value)} />
            </div>

            <div>
              <label className="label">Tranche d'âge</label>
              <select className="select-field" value={age} onChange={e => setAge(e.target.value)}>
                <option value="moins53">Moins de 53 ans</option>
                <option value="5354">53 à 54 ans</option>
                <option value="plus55">55 ans et plus</option>
              </select>
            </div>

            <div>
              <label className="label">Motif de fin de contrat</label>
              <select className="select-field" value={motifFin} onChange={e => setMotifFin(e.target.value)}>
                <option value="licenciement">Licenciement (économique ou personnel)</option>
                <option value="rupture">Rupture conventionnelle</option>
                <option value="fin-cdd">Fin de CDD</option>
                <option value="demission-legit">Démission légitime</option>
              </select>
            </div>

            {motifFin === 'demission-legit' && (
              <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 8, padding: '12px 14px', fontSize: '0.82rem', color: '#92400e' }}>
                ⚠️ La démission simple n'ouvre pas droit à l'ARE, sauf cas de démission légitime reconnus par France Travail (suivi de conjoint, création d'entreprise, etc.).
              </div>
            )}

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#7c3aed' }} onClick={calculer}>
              Simuler mon ARE →
            </button>
          </div>
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {result ? (
            result.eligible ? (
              <>
                <div style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)', color: 'white', borderRadius: 16, padding: 28 }} className="animate-in">
                  <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: 8 }}>📋 Allocation journalière estimée</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.1 }}>
                    {formatEur(result.areJour)}
                    <span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.8 }}> /jour</span>
                  </div>
                  <div style={{ marginTop: 4, fontSize: '0.85rem', opacity: 0.7 }}>
                    ≈ {formatEur(result.areMensuel)} par mois
                  </div>
                  <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {[
                      { label: 'Durée max', value: `${result.dureeMois} mois` },
                      { label: 'SJR', value: formatEur(result.sjr) },
                    ].map(s => (
                      <div key={s.label} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '10px 14px' }}>
                        <div style={{ fontSize: '0.72rem', opacity: 0.75, marginBottom: 2 }}>{s.label}</div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{s.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card" style={{ padding: 24 }}>
                  <div style={{ fontWeight: 700, color: 'var(--gray-700)', marginBottom: 16, fontSize: '0.9rem' }}>📊 Détail du calcul</div>
                  {[
                    { label: 'SJR (Salaire Journalier de Référence)', value: formatEur(result.sjr), note: '= salaire mensuel brut / 30,42' },
                    { label: 'Formule 1 : 40,4% × SJR + 12,12€', value: formatEur(result.areJour1), highlight: result.areJour1 >= result.areJour2 },
                    { label: 'Formule 2 : 57% × SJR', value: formatEur(result.areJour2), highlight: result.areJour2 > result.areJour1 },
                    { label: 'ARE retenue (formule la plus favorable)', value: formatEur(result.areJour), bold: true },
                    { label: 'ARE mensuelle estimée', value: formatEur(result.areMensuel), bold: true },
                    { label: 'Total sur toute la durée', value: formatEur(result.areJour * result.dureeJours) },
                  ].map((row, i, arr) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                      padding: '9px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--gray-100)' : 'none',
                      fontSize: '0.83rem',
                    }}>
                      <div>
                        <span style={{ color: 'var(--gray-600)', fontWeight: (row as any).bold ? 600 : 400 }}>{row.label}</span>
                        {(row as any).note && <div style={{ fontSize: '0.72rem', color: 'var(--gray-400)', marginTop: 1 }}>{(row as any).note}</div>}
                        {(row as any).highlight && <span style={{ fontSize: '0.68rem', background: '#7c3aed', color: 'white', borderRadius: 4, padding: '1px 5px', marginLeft: 4 }}>Retenue</span>}
                      </div>
                      <span style={{ fontWeight: (row as any).bold ? 700 : 500, color: (row as any).bold ? '#7c3aed' : 'var(--gray-700)', whiteSpace: 'nowrap', marginLeft: 8 }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="card" style={{ padding: 16, background: '#faf5ff', border: '1px solid #e9d5ff' }}>
                  <div style={{ fontSize: '0.82rem', color: '#6b21a8' }}>
                    ⏱ <strong>Délai de carence :</strong> 7 jours fixes + différé lié aux indemnités perçues. Inscription obligatoire à France Travail dans les 12 mois suivant la fin du contrat.
                  </div>
                </div>
              </>
            ) : (
              <div className="card-elevated" style={{ padding: 32, textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>❌</div>
                <div style={{ fontWeight: 700, color: '#dc2626', marginBottom: 8 }}>Conditions non remplies</div>
                <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>{result.raison}</p>
              </div>
            )
          ) : (
            <div className="card-elevated" style={{ padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 280, textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
              <p style={{ color: 'var(--gray-400)', margin: 0 }}>Renseignez vos informations pour simuler votre allocation chômage (ARE).</p>
              <p style={{ color: 'var(--gray-300)', fontSize: '0.8rem', marginTop: 8 }}>Minimum requis : 6 mois travaillés</p>
            </div>
          )}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .calc-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
