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

export function formatOutboundEmailHTML(bodyText: string, lead?: Partial<ProspectLead>): string {
  // Format body text: bold markdown, paragraphs, linebreaks
  const formattedBody = bodyText
    .split(/\n\n+/)
    .map(paragraph => {
      const cleanP = paragraph
        .trim()
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br/>')
      return `<p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.65; color: #334155;">${cleanP}</p>`
    })
    .join('')

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>La Confrérie Foodtruck</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f1f5f9; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #090d16 0%, #1e293b 100%); padding: 32px 24px 28px 24px; border-bottom: 3px solid #f59e0b;">
              <!-- Logo Container with glowing gold ring -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="background-color: #ffffff; width: 84px; height: 84px; border-radius: 50%; box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.35); padding: 8px;">
                    <a href="https://www.laconfrerietruck.fr" target="_blank" style="text-decoration: none; display: block;">
                      <img src="https://www.laconfrerietruck.fr/images/logo.png" alt="La Confrérie Foodtruck" width="70" height="70" style="display: block; border-radius: 50%; object-fit: contain; border: 0;" />
                    </a>
                  </td>
                </tr>
              </table>

              <h1 style="margin: 16px 0 4px 0; color: #ffffff; font-size: 20px; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase;">
                La Confrérie Foodtruck
              </h1>
              <p style="margin: 0; color: #fbbf24; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
                Traiteur Privatisations & Street Food Gourmet · Montpellier
              </p>

              <!-- Trust Rating Pill -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top: 14px;">
                <tr>
                  <td style="background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(251, 191, 36, 0.4); border-radius: 20px; padding: 4px 14px;">
                    <span style="color: #ffffff; font-size: 11px; font-weight: 700;">
                      ⭐️ 5.0 sur Google · Camion 100% Autonome
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 32px 28px 20px 28px; background-color: #ffffff;">
              ${formattedBody}
            </td>
          </tr>

          <!-- Food Imagery Showcase (Photos réelles de la galerie) -->
          <tr>
            <td style="padding: 0 28px 24px 28px; background-color: #ffffff;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; padding: 14px;">
                <tr>
                  <td width="50%" align="center" style="padding: 6px;">
                    <img src="https://www.laconfrerietruck.fr/images/gallery/burger-frites.jpeg" alt="Burger Gourmet & Frites Maison La Confrérie" width="100%" style="display: block; max-width: 250px; border-radius: 12px; height: 145px; object-fit: cover; box-shadow: 0 4px 8px rgba(0,0,0,0.06);" />
                    <p style="margin: 8px 0 0 0; font-size: 11px; font-weight: 800; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px;">Burgers & Frites Maison</p>
                    <p style="margin: 2px 0 0 0; font-size: 11px; color: #64748b;">Pain artisanal local & frites fraîches</p>
                  </td>
                  <td width="50%" align="center" style="padding: 6px;">
                    <img src="https://www.laconfrerietruck.fr/images/gallery/salade-fraicheur.jpeg" alt="Salade Fraîcheur & Options Veggie" width="100%" style="display: block; max-width: 250px; border-radius: 12px; height: 145px; object-fit: cover; box-shadow: 0 4px 8px rgba(0,0,0,0.06);" />
                    <p style="margin: 8px 0 0 0; font-size: 11px; font-weight: 800; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px;">Salades Fraîches & Veggie</p>
                    <p style="margin: 2px 0 0 0; font-size: 11px; color: #64748b;">Salades composées, bowls & tenders</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Key Pillars Grid -->
          <tr>
            <td style="padding: 0 28px 28px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top: 1px solid #f1f5f9; padding-top: 20px;">
                <tr>
                  <td width="50%" valign="top" style="padding: 6px 8px;">
                    <p style="margin: 0; font-size: 12px; font-weight: 800; color: #0f172a;">⚡️ Cadence Ultra-Fluide</p>
                    <p style="margin: 2px 0 0 0; font-size: 11px; color: #64748b;">Jusqu'à 120 convives servis par heure</p>
                  </td>
                  <td width="50%" valign="top" style="padding: 6px 8px;">
                    <p style="margin: 0; font-size: 12px; font-weight: 800; color: #0f172a;">🚚 Zéro Logistique</p>
                    <p style="margin: 2px 0 0 0; font-size: 11px; color: #64748b;">Camion autonome, zéro vaisselle</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Primary CTA Button -->
          <tr>
            <td align="center" style="padding: 0 28px 32px 28px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; max-width: 440px;">
                <tr>
                  <td align="center" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 14px; box-shadow: 0 8px 20px -3px rgba(245, 158, 11, 0.4);">
                    <a href="https://www.laconfrerietruck.fr/fr/plaquette" target="_blank" style="display: block; padding: 16px 28px; font-size: 15px; font-weight: 900; color: #0f172a; text-decoration: none; text-align: center; letter-spacing: 0.3px;">
                      👉 Consulter notre Plaquette & Formules
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 12px 0 0 0; font-size: 12px; color: #64748b;">
                Ou configurez directement votre événement sur <a href="https://www.laconfrerietruck.fr/fr/devis" target="_blank" style="color: #2563eb; font-weight: 700; text-decoration: underline;">notre simulateur en ligne</a>
              </p>
            </td>
          </tr>

          <!-- Founder Direct Signature Card -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 13px; font-weight: 800; color: #0f172a;">Youssef — La Confrérie Foodtruck</p>
                    <p style="margin: 2px 0 0 0; font-size: 12px; color: #64748b;">Artisan Traiteur Événementiel · Montpellier & Villeneuve</p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top: 8px;">
                      <tr>
                        <td style="padding-right: 14px;">
                          <a href="tel:+33662350953" style="font-size: 12px; font-weight: 700; color: #0284c7; text-decoration: none;">
                            📞 06 62 35 09 53
                          </a>
                        </td>
                        <td>
                          <a href="mailto:contact@laconfrerietruck.fr" style="font-size: 12px; font-weight: 700; color: #0284c7; text-decoration: none;">
                            ✉️ contact@laconfrerietruck.fr
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Legal & Opt-out -->
          <tr>
            <td align="center" style="background-color: #0f172a; padding: 20px 24px; color: #94a3b8; font-size: 11px; line-height: 1.5;">
              <p style="margin: 0 0 4px 0; color: #cbd5e1; font-weight: 600;">
                La Confrérie Foodtruck · <a href="https://www.laconfrerietruck.fr" target="_blank" style="color: #fbbf24; text-decoration: none;">laconfrerietruck.fr</a>
              </p>
              <p style="margin: 0; color: #64748b;">
                Vous recevez cette proposition personnalisée car vous organisez des réceptions ou moments d'équipe.<br/>
                Pour ne plus recevoir nos offres, répondez simplement « Stop » à cet email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

