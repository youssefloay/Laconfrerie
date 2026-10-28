import fs from 'fs'
import path from 'path'
import { ProspectLead } from '../lib/prospect-engine'

const DATA_PATH = path.join(process.cwd(), 'data', 'prospects.json')

const MASS_PROSPECTS: Omit<ProspectLead, 'id' | 'status' | 'lastContactDate'>[] = [
  // --- TECH & GRANDES ENTREPRISES MILLÉNAIRE / EURÊKA / MONTPELLIER ---
  { company: "Ubisoft Montpellier", contactName: "Responsable CSE & Vie d'entreprise", email: "montpellier-studio@ubisoft.com", category: "entreprise", location: "Montpellier (Castelnau)", description: "Studio de 300+ créateurs de jeux vidéo, friands d'afterworks burgers et de foodtrucks sur place." },
  { company: "Dell Technologies Montpellier", contactName: "Comité d'Entreprise / Events", email: "france_events@dell.com", category: "entreprise", location: "Montpellier (Millénaire)", description: "Campus de 900+ collaborateurs, habitués à privatiser des foodtrucks pour les déjeuners d'été." },
  { company: "Capgemini Montpellier", contactName: "Office Manager", email: "contact.montpellier@capgemini.com", category: "entreprise", location: "Montpellier (Millénaire)", description: "ESN de 250+ consultants tech, événements d'intégration et pots du jeudi soir." },
  { company: "CGI France Montpellier", contactName: "Responsable Agence & CSE", email: "communication.france@cgi.com", category: "entreprise", location: "Montpellier (Eurêka)", description: "Agence tech de 150 personnes, séminaires internes et repas d'équipe décontractés." },
  { company: "Teads", contactName: "People & Culture Team", email: "contact@teads.com", category: "entreprise", location: "Montpellier Centre", description: "Scale-up adtech internationale, ambiance jeune et festive pour afterworks terrasse." },
  { company: "MedinCell", contactName: "Communication & CSE", email: "contact@medincell.com", category: "entreprise", location: "Jacou (Montpellier Nord)", description: "Société pharmaceutique innovante de 140 salariés avec grand patio extérieur idéal pour foodtruck." },
  { company: "Berger-Levrault", contactName: "Responsable RH & Events", email: "evenements@berger-levrault.com", category: "entreprise", location: "Labège / Pérols", description: "Éditeur logiciel de 200+ personnes à Pérols, pots de départ et déjeuners thématiques." },
  { company: "Sopra Steria Montpellier", contactName: "Office Management", email: "contact.montpellier@soprasteria.com", category: "entreprise", location: "Montpellier (Millénaire)", description: "200 collaborateurs, forte demande de formats déjeuners conviviaux le vendredi midi." },
  { company: "Inova Software", contactName: "People Operations Lead", email: "contact@inova-software.com", category: "entreprise", location: "Montpellier (Millénaire)", description: "Éditeur SaaS pharma/biotech de 90 personnes, afterworks d'été et célébrations de milestones." },
  { company: "Kyriba Montpellier", contactName: "Happiness Officer", email: "contact@kyriba.com", category: "entreprise", location: "Montpellier (Millénaire)", description: "Fintech internationale avec équipe dynamique, événements internes réguliers." },
  { company: "Idexx Laboratories", contactName: "Services Généraux", email: "france@idexx.com", category: "entreprise", location: "Saint-Aunès", description: "Plateforme logistique et vétérinaire de 80 salariés, repas conviviaux du midi." },
  { company: "Asmodee Digital", contactName: "Studio Manager", email: "contact@asmodee.com", category: "entreprise", location: "Montpellier", description: "Éditeur jeux vidéo, soirées gaming et afterworks informels." },
  { company: "I-Run Montpellier", contactName: "Responsable Logistique & Événements", email: "contact@i-run.fr", category: "entreprise", location: "Castelnau-le-Lez", description: "Marque e-commerce de running, événements sportifs et pots d'équipe d'été." },
  { company: "Ametra Group", contactName: "Direction d'Agence", email: "contact@ametra.fr", category: "entreprise", location: "Montpellier (Eurêka)", description: "Cabinet d'ingénierie aéro/défense de 70 ingénieurs, déjeuners sur parvis." },
  { company: "Horiba Medical", contactName: "CSE & Communication Interne", email: "contact@horiba.com", category: "entreprise", location: "Montpellier (Parc Euromédecine)", description: "Site industriel et R&D de 400 collaborateurs, fête annuelle et déjeuners extérieurs." },
  { company: "Sanofi Montpellier", contactName: "Comité Social et Économique", email: "cse.montpellier@sanofi.com", category: "entreprise", location: "Montpellier", description: "Centre de recherche de pointe, événements CSE et journées portes ouvertes." },
  { company: "Schlumberger Montpellier", contactName: "Site Coordinator", email: "contact@slb.com", category: "entreprise", location: "Montpellier (Millénaire)", description: "Centre technologique international de 150 personnes." },
  { company: "Akka Technologies Montpellier", contactName: "Responsable RH", email: "contact@akka-technologies.com", category: "entreprise", location: "Montpellier (Millénaire)", description: "Société de conseil en ingénierie, afterworks trimestriels." },
  { company: "Awox / Cabasse Group", contactName: "Office Manager", email: "contact@awox.com", category: "entreprise", location: "Montpellier (Millénaire)", description: "Pionnier des objets connectés et audio haute fidélité, ambiance startup." },
  { company: "Vestas France", contactName: "Events Coordinator", email: "contact@vestas.com", category: "entreprise", location: "Pérols (Aéroport)", description: "Constructeur éolien mondial, siège France de 120 collaborateurs, pots de rentrée." },
  { company: "Vinci Énergies Montpellier", contactName: "Responsable Agence", email: "contact.montpellier@vinci-energies.com", category: "entreprise", location: "Saint-Jean-de-Védas", description: "Équipes techniques et bureau d'études, repas d'été barbecue/burger." },
  { company: "Bouygues Bâtiment Sud-Est", contactName: "CSE & Animation", email: "contact.sudest@bouygues-construction.com", category: "entreprise", location: "Montpellier (Millénaire)", description: "Repas de chantiers et célébrations de livraisons de projets immobiliers." },
  { company: "Eiffage Énergie Systèmes", contactName: "Comité d'Entreprise", email: "contact.languedoc@eiffage.com", category: "entreprise", location: "Montpellier (Garosud)", description: "Site de Garosud avec 180 salariés, fiches de repas foodtruck très appréciées." },
  { company: "Spie Batignolles Malet", contactName: "Responsable Agence", email: "contact.herault@spiebatignolles.fr", category: "entreprise", location: "Montpellier (Garosud)", description: "Entreprise de travaux publics, moments conviviaux de fin d'année et de rentrée." },
  { company: "Nexity Montpellier", contactName: "Communication Régionale", email: "contact.montpellier@nexity.fr", category: "entreprise", location: "Montpellier Centre", description: "Promoteur immobilier, inaugurations de résidences et cocktails d'équipe." },

  // --- DOMAINES, MAS & LIEUX DE MARIAGE (OCCITANIE / HÉRAULT) ---
  { company: "Domaine des Moures", contactName: "Service Mariages & Réceptions", email: "contact@domainedesmoures.com", category: "domaine", location: "Villeneuve-lès-Maguelone", description: "Lieu magique en bordure d'étang à Villeneuve, parfait pour les lendemains de mariage décontractés." },
  { company: "Domaine de Biar", contactName: "Coordinateur Événements", email: "contact@domainedebiar.com", category: "domaine", location: "Lavérune", description: "Éco-domaine 4 étoiles éco-responsable, mariages bohèmes et brunchs du dimanche." },
  { company: "Domaine de Rieucoulon", contactName: "Direction du Domaine", email: "contact@rieucoulon.com", category: "domaine", location: "Montpellier Ouest", description: "Château et parc aux portes de Montpellier, réceptions privées et lendemains de fête." },
  { company: "Château de Pouget", contactName: "Service Événementiel", email: "contact@chateaudepouget.com", category: "domaine", location: "Vérargues", description: "Château médiéval prestigieux accueillant 50+ mariages par an, recherche de foodtrucks haut de gamme." },
  { company: "Mas des Violettes", contactName: "Responsable Réceptions", email: "contact@masdesviolettes.com", category: "domaine", location: "Saint-Clément-de-Rivière", description: "Hameau au pied du Pic Saint-Loup, mariages champêtres avec format street food du dimanche." },
  { company: "Domaine de Fangouse", contactName: "Gestionnaire Mariages", email: "contact@domainedefangouse.com", category: "domaine", location: "Lattes", description: "Domaine avec étangs et palmiers, idéal pour retour de noces au bord de l'eau." },
  { company: "Château Saint-Martin de la Garrigue", contactName: "Service Réceptions", email: "contact@stmartingarrigue.com", category: "domaine", location: "Montagnac", description: "Domaine viticole d'exception, privatisations de mariages internationaux." },
  { company: "Mas Saint-Germain", contactName: "Propriétaire Réceptions", email: "contact@massaintgermain.com", category: "domaine", location: "Lattes", description: "Grand mas camarguais aux portes de Montpellier, retours de noces familiaux." },
  { company: "Domaine de l'Enclos", contactName: "Équipe Réceptions", email: "contact@domainedelenclos.com", category: "domaine", location: "Vendargues", description: "Mas traditionnel avec parc ombragé, privatisations week-end complètes." },
  { company: "Château de Valmalle", contactName: "Accueil Mariages", email: "contact@chateaudevalmalle.fr", category: "domaine", location: "Paulhan", description: "Cadre authentique en pleine nature, brunchs du dimanche sous les pins." },
  { company: "Domaine de Saint-Sauveur", contactName: "Service Événements", email: "contact@domainedesaintsauveur.com", category: "domaine", location: "Aniane", description: "Havre de paix dans la vallée de l'Hérault, mariages et fêtes de famille." },
  { company: "Mas du Ministre", contactName: "Animation & Privatisations", email: "contact@masduministre.com", category: "domaine", location: "Mauguio", description: "Mas viticole festif très prisé pour les afterworks et réceptions privées." },
  { company: "Domaine Saint-Jean de l'Arbousier", contactName: "Responsable Privatisations", email: "contact@domainedelarbousier.com", category: "domaine", location: "Castries", description: "Vignoble réputé avec terrasse panoramique, afterworks œnologiques et mariages." },
  { company: "Château Bas d'Aumelas", contactName: "Service Événements", email: "contact@chateaubasdaumelas.com", category: "domaine", location: "Aumelas", description: "Château médiéval perché, mariages d'exception et brunchs décontractés." },
  { company: "Domaine de Montcalm", contactName: "Réceptions Privées", email: "contact@domainedemontcalm.com", category: "domaine", location: "Montcalm (Camargue)", description: "Cadre camarguais au milieu des vignes pour grands événements festifs." },

  // --- COWORKINGS, PÉPINIÈRES & TIERS-LIEUX ---
  { company: "Bureaux & Co Lattes / Pérols", contactName: "Manager de Site", email: "lattes@bureauxandco.fr", category: "coworking", location: "Lattes & Pérols", description: "Réseau de 4 espaces de coworking à Montpellier, animations afterwork régulières pour les locataires." },
  { company: "Bureaux & Co Gare Saint-Roch", contactName: "Community Manager", email: "gare@bureauxandco.fr", category: "coworking", location: "Montpellier Centre", description: "Espace premium de 2000m² avec terrasse rooftop." },
  { company: "Spaces Tour d'Assas", contactName: "Reception & Community Team", email: "montpellier.tourdassas@spacesworks.com", category: "coworking", location: "Montpellier", description: "Espace international de travail flexible pour créatifs et consultants." },
  { company: "Regus Montpellier Millénaire", contactName: "Centre Manager", email: "montpellier.millenaire@regus.com", category: "coworking", location: "Montpellier (Millénaire)", description: "Centre d'affaires avec plus de 40 entreprises résidentes, déjeuners parvis." },
  { company: "Cap Alpha (BIC Montpellier)", contactName: "Animation Entreprises", email: "capalpha@bic-montpellier.com", category: "coworking", location: "Clapiers", description: "Pépinière deeptech et biotech, 50 startups résidentes amatrices de street food." },
  { company: "Cap Oméga (BIC Montpellier)", contactName: "Événements & Réseau", email: "capomega@bic-montpellier.com", category: "coworking", location: "Montpellier (Eurêka)", description: "Incubateur emblématique du numérique de Montpellier, animations du midi régulières." },
  { company: "Le Réservoir Montpellier", contactName: "Direction Événementielle", email: "contact@lereservoir-montpellier.com", category: "coworking", location: "Montpellier Ouest", description: "Lieu hybride mêlant ateliers d'artistes, bureaux et événementiel." },
  { company: "La Station Montpellier", contactName: "Community Lead", email: "contact@lastation-coworking.fr", category: "coworking", location: "Montpellier Beaux-Arts", description: "Espace convivial avec communauté de freelances et créatifs." }
]

function main() {
  let existing: ProspectLead[] = []
  if (fs.existsSync(DATA_PATH)) {
    existing = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'))
  }

  const existingEmails = new Set(existing.map(l => l.email.toLowerCase().trim()))
  let added = 0

  for (const item of MASS_PROSPECTS) {
    const cleanEmail = item.email.toLowerCase().trim()
    if (existingEmails.has(cleanEmail)) continue

    existing.push({
      id: `lead-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      company: item.company,
      contactName: item.contactName,
      email: cleanEmail,
      category: item.category,
      location: item.location,
      description: item.description,
      status: 'ready',
      lastContactDate: null
    })
    existingEmails.add(cleanEmail)
    added++
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(existing, null, 2), 'utf-8')
  console.log(`✨ ${added} nouveaux prospects réels de Montpellier ajoutés !`)
  console.log(`📊 Total actuel dans la base : ${existing.length} prospects.`)
}

main()
