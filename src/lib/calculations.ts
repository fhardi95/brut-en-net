// Taux 2026 officiels
export const SMIC_BRUT_MENSUEL = 1766.92
export const PASS_MENSUEL = 3864
export const SMIC_HORAIRE = 11.65

export interface SalaireInput {
  brutMensuel: number
  statut: 'non-cadre' | 'cadre'
  partsFiscales: number
  prime: number
  mutuelle: number
  avantagesNature: number
  tempsPartiel: number // 100 = plein temps
}

export interface SalaireResult {
  brutMensuel: number
  cotisationsSalariales: number
  netImposable: number
  prelevementSource: number
  netAPayer: number
  cotisationsPatronales: number
  coutEmployeur: number
  tauxCotisations: number
  tauxImpot: number
  tauxGlobal: number
  detail: CotisationDetail[]
}

export interface CotisationDetail {
  label: string
  tauxSalarie: number
  tauxPatronal: number
  assiette: number
  montantSalarie: number
  montantPatronal: number
}

// Barème PAS 2026 (mensuel, pour 1 part)
const BAREME_PAS_1_PART = [
  { min: 0, max: 1620, taux: 0 },
  { min: 1620, max: 1928, taux: 0.075 },
  { min: 1928, max: 2478, taux: 0.15 },
  { min: 2478, max: 3248, taux: 0.20 },
  { min: 3248, max: 4000, taux: 0.25 },
  { min: 4000, max: 5070, taux: 0.305 },
  { min: 5070, max: 6700, taux: 0.33 },
  { min: 6700, max: 10700, taux: 0.38 },
  { min: 10700, max: Infinity, taux: 0.43 },
]

function calculerPAS(netImposable: number, parts: number): number {
  // Le barème est divisé par le nombre de parts (quotient familial simplifié)
  const base = netImposable / parts
  let impotBase = 0
  for (let i = 0; i < BAREME_PAS_1_PART.length - 1; i++) {
    const tranche = BAREME_PAS_1_PART[i]
    const next = BAREME_PAS_1_PART[i + 1]
    if (base <= tranche.min) break
    const imposable = Math.min(base, next.min) - tranche.min
    impotBase += imposable * tranche.taux
  }
  // Dernière tranche
  const lastTranche = BAREME_PAS_1_PART[BAREME_PAS_1_PART.length - 1]
  if (base > lastTranche.min) {
    impotBase += (base - lastTranche.min) * lastTranche.taux
  }
  return impotBase * parts
}

export function calculerSalaire(input: SalaireInput): SalaireResult {
  const { brutMensuel, statut, partsFiscales, prime, mutuelle, tempsPartiel } = input
  const brut = brutMensuel * (tempsPartiel / 100) + prime

  const assiettePlafonnee = Math.min(brut, PASS_MENSUEL)
  const assietteDeplafonnee = brut

  // CSG / CRDS sur 98,25% du brut
  const assietteCSG = brut * 0.9825

  const details: CotisationDetail[] = [
    {
      label: 'Assurance maladie',
      tauxSalarie: 0,
      tauxPatronal: 0.13,
      assiette: assietteDeplafonnee,
      montantSalarie: 0,
      montantPatronal: assietteDeplafonnee * 0.13,
    },
    {
      label: 'CSG déductible',
      tauxSalarie: 0.068,
      tauxPatronal: 0,
      assiette: assietteCSG,
      montantSalarie: assietteCSG * 0.068,
      montantPatronal: 0,
    },
    {
      label: 'CSG/CRDS non déductible',
      tauxSalarie: 0.029,
      tauxPatronal: 0,
      assiette: assietteCSG,
      montantSalarie: assietteCSG * 0.029,
      montantPatronal: 0,
    },
    {
      label: 'Retraite base (plafonné)',
      tauxSalarie: 0.069,
      tauxPatronal: 0.0855,
      assiette: assiettePlafonnee,
      montantSalarie: assiettePlafonnee * 0.069,
      montantPatronal: assiettePlafonnee * 0.0855,
    },
    {
      label: 'Retraite base (déplafonné)',
      tauxSalarie: 0.004,
      tauxPatronal: 0.019,
      assiette: assietteDeplafonnee,
      montantSalarie: assietteDeplafonnee * 0.004,
      montantPatronal: assietteDeplafonnee * 0.019,
    },
    {
      label: 'Retraite complémentaire T1',
      tauxSalarie: 0.0315,
      tauxPatronal: 0.0472,
      assiette: assiettePlafonnee,
      montantSalarie: assiettePlafonnee * 0.0315,
      montantPatronal: assiettePlafonnee * 0.0472,
    },
    {
      label: 'Assurance chômage',
      tauxSalarie: 0,
      tauxPatronal: 0.0405,
      assiette: Math.min(brut, PASS_MENSUEL * 4),
      montantSalarie: 0,
      montantPatronal: Math.min(brut, PASS_MENSUEL * 4) * 0.0405,
    },
    {
      label: 'Allocations familiales',
      tauxSalarie: 0,
      tauxPatronal: brut < SMIC_BRUT_MENSUEL * 3.5 ? 0.0345 : 0.0525,
      assiette: assietteDeplafonnee,
      montantSalarie: 0,
      montantPatronal: assietteDeplafonnee * (brut < SMIC_BRUT_MENSUEL * 3.5 ? 0.0345 : 0.0525),
    },
    {
      label: 'Accident du travail',
      tauxSalarie: 0,
      tauxPatronal: 0.015,
      assiette: assietteDeplafonnee,
      montantSalarie: 0,
      montantPatronal: assietteDeplafonnee * 0.015,
    },
    {
      label: 'FNAL + CSA',
      tauxSalarie: 0,
      tauxPatronal: 0.004,
      assiette: assietteDeplafonnee,
      montantSalarie: 0,
      montantPatronal: assietteDeplafonnee * 0.004,
    },
  ]

  if (statut === 'cadre') {
    details.push({
      label: 'Retraite complémentaire T2',
      tauxSalarie: 0.0864,
      tauxPatronal: 0.1295,
      assiette: Math.max(0, Math.min(brut, PASS_MENSUEL * 8) - PASS_MENSUEL),
      montantSalarie: Math.max(0, Math.min(brut, PASS_MENSUEL * 8) - PASS_MENSUEL) * 0.0864,
      montantPatronal: Math.max(0, Math.min(brut, PASS_MENSUEL * 8) - PASS_MENSUEL) * 0.1295,
    })
    details.push({
      label: 'APEC (cadres)',
      tauxSalarie: 0.00024,
      tauxPatronal: 0.00036,
      assiette: Math.min(brut, PASS_MENSUEL * 4),
      montantSalarie: Math.min(brut, PASS_MENSUEL * 4) * 0.00024,
      montantPatronal: Math.min(brut, PASS_MENSUEL * 4) * 0.00036,
    })
  }

  const cotisationsSalariales = details.reduce((s, d) => s + d.montantSalarie, 0) + mutuelle
  const cotisationsPatronales = details.reduce((s, d) => s + d.montantPatronal, 0)

  const netImposable = brut - cotisationsSalariales + assietteCSG * 0.029 // On réintègre CSG non déductible
  const prelevementSource = Math.max(0, calculerPAS(netImposable, partsFiscales))
  const netAPayer = brut - cotisationsSalariales - prelevementSource
  const coutEmployeur = brut + cotisationsPatronales

  return {
    brutMensuel: brut,
    cotisationsSalariales,
    netImposable,
    prelevementSource,
    netAPayer,
    cotisationsPatronales,
    coutEmployeur,
    tauxCotisations: (cotisationsSalariales / brut) * 100,
    tauxImpot: (prelevementSource / netImposable) * 100,
    tauxGlobal: ((cotisationsSalariales + prelevementSource) / brut) * 100,
    detail: details,
  }
}

export function formatEur(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
