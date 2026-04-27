import type { Metadata } from 'next'
import Link from 'next/link'
import { buildJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Comment Négocier son Salaire en 2026 — Guide Stratégique',
  description: 'Techniques éprouvées pour négocier une augmentation ou un salaire à l\'embauche en 2026. Données de marché, timing idéal, formulations qui fonctionnent et erreurs à éviter.',
  keywords: 'négocier salaire, augmentation salaire, négociation salariale, demander augmentation France, salaire embauche négociation',
  alternates: { canonical: 'https://www.salairebruten.fr/blog/negocier-salaire' },
}

const jsonLd = buildJsonLd({
  '@type': 'Article',
  headline: 'Comment négocier son salaire : guide stratégique 2026',
  datePublished: '2025-12-28',
  author: { '@type': 'Organization', name: 'SalaireBrutNet.fr' },
  url: 'https://www.salairebruten.fr/blog/negocier-salaire',
  inLanguage: 'fr',
})

export default function NegocierSalairePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <section style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)', padding: '40px 20px 32px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: 12 }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link> › <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link> › Négocier son salaire
          </div>
          <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, background: '#e6fcf5', color: '#12b886', marginBottom: 14 }}>💬 Carrière</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: 'var(--gray-900)', lineHeight: 1.2, marginBottom: 14 }}>
            Comment négocier son salaire : guide stratégique 2026
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '1rem', lineHeight: 1.7 }}>Que ce soit à l'embauche ou pour une augmentation, la négociation salariale est une compétence qui s'apprend.</p>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: 12 }}>📅 28 décembre 2025 · ⏱ 12 min de lecture</div>
        </div>
      </section>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '50px 20px 80px' }}>
        <div className="prose-content">
          <p>Seulement 37 % des salariés français négocient leur salaire à l'embauche, selon les enquêtes RH. Pourtant, une négociation réussie peut représenter plusieurs milliers d'euros par an. Voici comment maximiser vos chances.</p>

          <h2>1. Se préparer avec des données de marché</h2>
          <p>Avant toute négociation, documentez-vous sur les salaires pratiqués dans votre secteur, votre région et pour votre niveau d'expérience. Sources fiables :</p>
          <ul>
            <li><strong>DARES</strong> (dares.travail.gouv.fr) : statistiques officielles par secteur</li>
            <li><strong>LinkedIn Salary</strong> : données anonymisées par poste et ville</li>
            <li><strong>Glassdoor / Welcome to the Jungle</strong> : fourchettes déclarées par les salariés</li>
            <li>Grilles de la convention collective de votre branche professionnelle</li>
          </ul>

          <h2>2. Le timing idéal pour demander une augmentation</h2>
          <p>Le moment choisi est crucial. Les périodes les plus favorables :</p>
          <ul>
            <li><strong>Entretien annuel d'évaluation</strong> : moment institutionnel et attendu</li>
            <li><strong>Après un succès notable</strong> : projet réussi, nouveau client, dépassement d'objectifs</li>
            <li><strong>Lors de l'élargissement de vos responsabilités</strong></li>
            <li><strong>En début d'année</strong>, quand les budgets RH sont ouverts</li>
          </ul>
          <p>Évitez les périodes de tension de l'entreprise (restructuration, mauvais résultats) et les fins de trimestre chargées.</p>

          <h2>3. L'ancrage : commencer haut</h2>
          <p>En négociation, la première offre créée un « ancrage » psychologique. Si vous annoncez votre fourchette, commencez par le haut de ce que vous jugez raisonnable. Si c'est l'employeur qui annonce, ne vous arrêtez pas à sa première proposition.</p>

          <div style={{ background: '#e6fcf5', border: '1px solid #96f2d7', borderRadius: 10, padding: '20px 24px', margin: '24px 0' }}>
            <strong style={{ color: '#0b7a57' }}>💡 Formulations qui fonctionnent</strong><br />
            <span style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
              — "Sur la base du marché et de mon expérience, je vise une fourchette de X à Y €."<br />
              — "Ma contribution sur [projet] a généré [résultat]. Compte tenu de cela, je souhaitais aborder ma rémunération."<br />
              — "Est-ce que vous avez une marge de manœuvre sur ce point ?"
            </span>
          </div>

          <h2>4. Négocier au-delà du brut</h2>
          <p>Si l'employeur est bloqué sur le salaire brut, il existe d'autres leviers de rémunération :</p>
          <ul>
            <li><strong>Prime à la signature</strong> (one-shot, neutre pour le budget RH récurrent)</li>
            <li><strong>Télétravail supplémentaire</strong> (économies de transport significatives)</li>
            <li><strong>Jours de RTT supplémentaires</strong></li>
            <li><strong>Titre-restaurant</strong> ou mutuelle renforcée</li>
            <li><strong>Budget formation</strong>, participation aux conférences</li>
            <li><strong>Revue salariale</strong> anticipée à 6 mois</li>
          </ul>

          <h2>5. Erreurs classiques à éviter</h2>
          <ul>
            <li>Parler de ses besoins personnels ("j'ai un crédit immobilier") plutôt que de sa valeur</li>
            <li>Accepter la première offre sans contre-proposition</li>
            <li>Donner une fourchette trop large (signal d'incertitude)</li>
            <li>Ultimatum prématuré sans offre concurrente réelle</li>
            <li>Négliger de formaliser par écrit les engagements oraux</li>
          </ul>

          <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 10, padding: '20px 24px', margin: '32px 0' }}>
            <strong style={{ color: '#3b5bdb' }}>🧮 Avant de négocier</strong><br />
            <span style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>Utilisez notre <Link href="/" style={{ color: '#3b5bdb' }}>calculateur brut en net</Link> pour comparer vos offres et comprendre l'impact réel des différences de salaire brut sur votre net mensuel.</span>
          </div>
        </div>
      </article>
    </>
  )
}
