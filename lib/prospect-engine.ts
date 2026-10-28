export interface ProspectLead {
  id: string
  company: string
  contactName?: string
  email: string
  category: 'entreprise' | 'domaine' | 'coworking' | 'autre'
  location: string
  description?: string
  status: 'ready' | 'contacted' | 'followed_up' | 'replied' | 'converted'
  lastContactDate?: string | null
  generatedEmail?: {
    subject: string
    body: string
    generatedAt: string
  }
}

export async function generateProspectEmailWithGemini(
  lead: ProspectLead,
  customAngle?: string
): Promise<{ subject: string; body: string }> {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return generateProspectEmail(lead, customAngle)
  }

  const prompt = `
Tu es le fondateur de "La Confrérie Foodtruck" (burgers gourmets maison, pains boulangers locaux, pokebowls frais, capacité 100+ personnes/h, 100% autonome en logistique, basé à Montpellier et Villeneuve-lès-Maguelone).
Site web : https://laconfrerietruck.fr
Plaquette : https://laconfrerietruck.fr/fr/plaquette
Téléphone : 06 62 35 09 53

Rédige un email de prospection B2B personnalisé, court, chaleureux et percutant pour le prospect suivant :
- Nom de la structure : ${lead.company}
- Contact : ${lead.contactName || "Responsable Événements / Office Manager"}
- Catégorie : ${lead.category} (${lead.category === 'domaine' ? 'Lieu de réception / mariage : proposer un partenariat brunch lendemain de mariage' : lead.category === 'coworking' ? 'Coworking / Tiers-lieu : proposer un afterwork du jeudi ou déjeuner parvis' : 'Entreprise : proposer un afterwork d\'équipe ou déjeuner foodtruck sans aucune logistique'})
- Localisation : ${lead.location}
- Contexte / Description : ${lead.description || "Entreprise ciblée dans la région de Montpellier"}
${customAngle ? `- Consigne spécifique demandée : "${customAngle}"` : ""}

Règles de style impératives :
1. Ton : Professionnel mais convivial, chaleureux, méridional, pas pompeux, pas de blabla corporate artificiel.
2. Longueur : Moins de 180 mots. Doit se lire en 40 secondes.
3. Points forts à mentionner selon la cible : zéro logistique (on gère tout sur le parking/parvis, pas de vaisselle), rapidité d'envoi minute, produits frais et locaux, lien vers la plaquette.
4. Call to action : Un appel téléphonique informel de 5 minutes.
5. Format de réponse STRICT en JSON avec deux clés : "subject" et "body". Ne mets aucun texte en dehors du JSON.
`

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    })

    if (!res.ok) {
      console.warn(`[Gemini API] Échec (${res.status}), bascule sur le moteur modèle standard.`)
      return generateProspectEmail(lead, customAngle)
    }

    const data = await res.json()
    const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (textOutput) {
      const parsed = JSON.parse(textOutput)
      if (parsed.subject && parsed.body) {
        return {
          subject: parsed.subject,
          body: parsed.body
        }
      }
    }
  } catch (err: any) {
    console.warn(`[Gemini API] Erreur: ${err.message}. Utilisation du fallback.`)
  }

  return generateProspectEmail(lead, customAngle)
}

export function generateProspectEmail(lead: ProspectLead, customAngle?: string): { subject: string; body: string } {
  const salutation = lead.contactName && !lead.contactName.toLowerCase().includes('responsable') && !lead.contactName.toLowerCase().includes('équipe')
    ? `Bonjour ${lead.contactName},`
    : `Bonjour à toute l'équipe de ${lead.company},`

  if (lead.category === 'domaine') {
    return {
      subject: `Partenariat Foodtruck & Brunch lendemain de mariage · La Confrérie x ${lead.company}`,
      body: `${salutation}

Je me permets de vous contacter car j'admire beaucoup le cadre et la qualité des réceptions organisées chez ${lead.company} à ${lead.location}.

Je suis le fondateur de **La Confrérie Foodtruck**, basé à Montpellier. Avec la saison des mariages qui bat son plein, de plus en plus de futurs mariés nous sollicitent pour un format convivial et décontracté le dimanche midi : **le brunch / retour de noces en foodtruck**.

Ce que nous apportons aux mariés et aux gestionnaires de domaine :
• **Autonomie logistique totale** : notre camion est 100% autonome (électricité, froid, cuisson). Nous n'encombrons ni votre office ni votre cuisine de domaine.
• **Service rapide & chaleureux** : capacité d'envoi fluide de 60 à 250 convives (burgers gourmets minute, wraps frais, frites maison, options végétariennes).
• **Zéro contrainte pour vous** : le domaine reste impeccable, départ propre et rapide après le service.

Seriez-vous ouverts à ce que nous vous fassions parvenir notre plaquette traiteur pour vos mariés en recherche d'une solution originale ?

Vous pouvez jeter un œil à notre formule et nos engagements ici : https://laconfrerietruck.fr/fr/plaquette

Au plaisir d'échanger 5 minutes par téléphone à votre convenance,

Bien cordialement,

**L'équipe de La Confrérie Foodtruck**
Montpellier & Occitanie
📞 06 62 35 09 53
🌐 https://laconfrerietruck.fr`
    }
  }

  if (lead.category === 'coworking') {
    return {
      subject: `Animation Foodtruck & Afterwork pour la communauté ${lead.company}`,
      body: `${salutation}

Je suis le fondateur de **La Confrérie Foodtruck** à Montpellier. Nous suivons régulièrement la belle dynamique de la communauté ${lead.company}.

Nous privatisons régulièrement notre foodtruck pour des afterworks du jeudi, des pots de rentrée ou des déjeuners animés au pied des espaces de bureaux et coworkings.

L'idée : offrir à vos résidents et coworkers un vrai moment de déconnexion gourmande (burgers artisanaux minute au pain boulanger local, pokebowls / bobuns frais, frites maison croustillantes) avec zéro prise de tête logistique pour vous.

${customAngle ? `*Note : ${customAngle}*\n` : ''}
Nous nous installons en 15 minutes, nous servons jusqu'à 150 personnes en un temps record, et l'ambiance fait l'unanimité !

Seriez-vous disponibles pour un court appel de 5 minutes cette semaine pour voir si une date d'afterwork ou de déjeuner pourrait intéresser vos membres ?

Notre plaquette de présentation : https://laconfrerietruck.fr/fr/plaquette

Très belle journée,

**La Confrérie Foodtruck**
📞 06 62 35 09 53
🌐 https://laconfrerietruck.fr`
    }
  }

  // Entreprise / Startup standard
  return {
    subject: `Idée Afterwork / Déjeuner d'équipe sans logistique pour ${lead.company}`,
    body: `${salutation}

Je prends contact avec vous car vous pilotez l'organisation des moments d'équipe chez ${lead.company} à ${lead.location}.

Chez **La Confrérie Foodtruck** (Montpellier), nous accompagnons les entreprises pour leurs événements internes : **afterworks festifs, anniversaires d'entreprise, séminaires ou déjeuners d'été**.

Pourquoi nos clients nous choisissent :
1. **Zéro logistique pour vous** : nous venons directement sur votre parking ou parvis avec notre foodtruck équipé. Vous n'avez aucune vaisselle ni salle à gérer.
2. **Qualité artisanale** : smash burgers gourmets préparés à la minute (pain boulanger frais du matin, viandes bouchères, sauces maison) + options fraîches (pokebowls, options veggie).
3. **Cadence ultra-rapide** : plus de 100 personnes servies par heure dans la bonne humeur.

${customAngle ? `*Focus adapté : ${customAngle}*\n` : ''}
Avez-vous un événement d'équipe ou un afterwork prévu dans les prochaines semaines pour lequel vous souhaiteriez une proposition sur-mesure ?

Notre plaquette digitale : https://laconfrerietruck.fr/fr/plaquette
Simulateur et avis : https://laconfrerietruck.fr/fr/devis

Bien à vous,

**Youssef — La Confrérie Foodtruck**
📞 06 62 35 09 53
✉️ contact@laconfrerietruck.fr`
  }
}

export function generateFollowUpEmail(lead: ProspectLead): { subject: string; body: string } {
  return {
    subject: `Re: ${lead.company} · Moment convivial avec notre Foodtruck ?`,
    body: `Bonjour,

Je me permets une toute petite relance suite à mon message de la semaine dernière concernant l'animation d'un déjeuner ou afterwork d'équipe chez ${lead.company}.

Avez-vous eu l'occasion d'en discuter en interne, ou prévoyez-vous un événement d'entreprise d'ici la fin du trimestre ?

Si vous avez 5 minutes, je serais ravi de vous présenter nos formats au 06 62 35 09 53.

Excellente semaine,

**Youssef — La Confrérie Foodtruck**
https://laconfrerietruck.fr`
  }
}
