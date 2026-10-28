import { NextResponse } from "next/server"

interface DevisRequestBody {
  prenom: string
  nom: string
  email: string
  telephone: string
  typeEvenement: string
  dateEvenement: string
  heureDebut?: string
  heureFin?: string
  nombrePersonnes: string
  budget?: string
  lieu: string
  codePostal: string
  prestations: string[]
  commentaires?: string
  formuleChoisie?: string
  estimationPrix?: string
}

export async function POST(request: Request) {
  try {
    const data: DevisRequestBody = await request.json()

    // Validation des champs obligatoires
    if (!data.prenom || !data.nom || !data.email || !data.telephone || !data.dateEvenement || !data.lieu) {
      return NextResponse.json(
        { error: "Veuillez renseigner tous les champs obligatoires." },
        { status: 400 }
      )
    }

    const referenceId = `LCF-${Date.now().toString().slice(-6)}`
    const nowFormatted = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })

    // 1. Notification Telegram (optionnelle et gratuite, alerte immédiate sur mobile)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID

    if (telegramToken && telegramChatId) {
      try {
        const telegramMessage = `🚚 *NOUVELLE DEMANDE DE DEVIS (${referenceId})* 🚚
━━━━━━━━━━━━━━━━━━━━━
👤 *Client :* ${data.prenom} ${data.nom}
📞 *Tél :* [${data.telephone}](tel:${data.telephone})
✉️ *Email :* ${data.email}
📅 *Date :* ${data.dateEvenement} ${data.heureDebut ? `(${data.heureDebut} - ${data.heureFin || '?'})` : ''}
📍 *Lieu :* ${data.lieu} (${data.codePostal})
👥 *Invités :* ${data.nombrePersonnes} personnes
🎯 *Type :* ${data.typeEvenement}
${data.formuleChoisie ? `🍽️ *Formule :* ${data.formuleChoisie}` : ''}
${data.estimationPrix ? `💰 *Est. indicative :* ${data.estimationPrix}` : ''}
${data.budget ? `💳 *Budget annoncé :* ${data.budget}` : ''}
📦 *Prestations :* ${data.prestations?.join(', ') || 'Standard'}
💬 *Message :* ${data.commentaires || 'Aucun'}
━━━━━━━━━━━━━━━━━━━━━
🕒 _Reçu le ${nowFormatted}_`

        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: telegramMessage,
            parse_mode: "Markdown",
          }),
        })
      } catch (tgError) {
        console.error("Erreur Telegram webhook :", tgError)
      }
    }

    // 2. Webhook CRM (Make.com / Zapier / Google Sheets / Airtable)
    const webhookUrl = process.env.MAKE_WEBHOOK_URL || process.env.ZAPIER_WEBHOOK_URL
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            referenceId,
            dateCreation: nowFormatted,
            ...data,
          }),
        })
      } catch (webhookError) {
        console.error("Erreur Webhook CRM :", webhookError)
      }
    }

    // 3. Email via Resend (au propriétaire + confirmation au client)
    const resendApiKey = process.env.RESEND_API_KEY
    const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "contact@laconfrerietruck.fr"
    const fromEmail = process.env.RESEND_FROM_EMAIL || "La Confrérie Foodtruck <onboarding@resend.dev>"

    if (resendApiKey) {
      try {
        // A) Email pour le gérant de La Confrérie
        const resManager = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [notificationEmail],
            reply_to: data.email,
            subject: `🚨 Nouveau Devis Prestation - ${data.prenom} ${data.nom} (${data.dateEvenement})`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h2 style="color: #1E88E5; border-bottom: 2px solid #1E88E5; padding-bottom: 8px;">Nouvelle demande de devis [${referenceId}]</h2>
                <p><strong>Client :</strong> ${data.prenom} ${data.nom}</p>
                <p><strong>Téléphone :</strong> <a href="tel:${data.telephone}">${data.telephone}</a></p>
                <p><strong>Email :</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;">
                <p><strong>Date de l'événement :</strong> ${data.dateEvenement} ${data.heureDebut ? `de ${data.heureDebut} à ${data.heureFin || '?'}` : ''}</p>
                <p><strong>Lieu :</strong> ${data.lieu} (${data.codePostal})</p>
                <p><strong>Type d'événement :</strong> ${data.typeEvenement}</p>
                <p><strong>Nombre d'invités :</strong> ${data.nombrePersonnes} personnes</p>
                ${data.formuleChoisie ? `<p><strong>Formule sélectionnée :</strong> ${data.formuleChoisie}</p>` : ''}
                ${data.estimationPrix ? `<p><strong>Estimation budgétaire :</strong> ${data.estimationPrix}</p>` : ''}
                ${data.budget ? `<p><strong>Budget client :</strong> ${data.budget}</p>` : ''}
                <p><strong>Prestations souhaitées :</strong> ${data.prestations?.join(', ') || 'Non spécifié'}</p>
                <p><strong>Détails & Commentaires :</strong><br/>${data.commentaires || 'Aucun commentaire'}</p>
              </div>
            `,
          }),
        })

        if (!resManager.ok) {
          const errData = await resManager.json()
          console.warn("[Resend Manager Warning] :", errData)
        }

        // B) Email de confirmation automatique pour le client
        const resClient = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [data.email],
            subject: `Votre demande de devis pour La Confrérie Foodtruck [${referenceId}]`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #333; line-height: 1.6; border: 1px solid #eaeaea; border-radius: 12px;">
                <div style="text-align: center; margin-bottom: 24px;">
                  <h1 style="color: #1E88E5; margin: 0; font-size: 26px;">LA CONFRÉRIE</h1>
                  <p style="color: #888; font-size: 14px; margin-top: 4px;">Foodtruck & Événementiel · Montpellier & Occitanie</p>
                </div>
                <p>Bonjour <strong>${data.prenom}</strong>,</p>
                <p>Nous avons bien reçu votre demande de devis pour votre événement prévu le <strong>${data.dateEvenement}</strong> à <strong>${data.lieu}</strong>.</p>
                <p>Notre équipe étudie actuellement votre projet afin de vous faire parvenir une proposition sur-mesure sous <strong>24h ouvrées</strong>.</p>
                
                <div style="background-color: #FFF8E1; border-left: 4px solid #FFB300; padding: 14px; margin: 20px 0; border-radius: 4px;">
                  <h3 style="margin: 0 0 8px 0; color: #D84315; font-size: 16px;">Récapitulatif de votre demande :</h3>
                  <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
                    <li><strong>Référence :</strong> ${referenceId}</li>
                    <li><strong>Invités prévus :</strong> ${data.nombrePersonnes}</li>
                    <li><strong>Type d'événement :</strong> ${data.typeEvenement}</li>
                    ${data.formuleChoisie ? `<li><strong>Formule :</strong> ${data.formuleChoisie}</li>` : ''}
                  </ul>
                </div>

                <p>Une question urgente ou une précision ? N'hésitez pas à nous contacter directement par téléphone au <a href="tel:+33662350953" style="color: #1E88E5; font-weight: bold;">06 62 35 09 53</a>.</p>
                
                <p style="margin-top: 30px;">À très bientôt gourmandement,<br><strong>L'équipe La Confrérie</strong></p>
              </div>
            `,
          }),
        })
      } catch (emailError) {
        console.error("Erreur lors de l'envoi email Resend :", emailError)
      }
    } else {
      console.log(`[DEVIS REÇU - MOCK LOG] Réf: ${referenceId}`, data)
    }

    return NextResponse.json({
      success: true,
      referenceId,
      message: "Demande de devis enregistrée avec succès.",
    })
  } catch (error) {
    console.error("Erreur API devis :", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi de votre demande." },
      { status: 500 }
    )
  }
}
