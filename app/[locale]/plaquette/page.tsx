"use client"

import { Printer, Download, ArrowLeft, Phone, Mail, MapPin, Check, Sparkles, ShieldCheck, HeartHandshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@/src/i18n/routing"
import { SiteLogo } from "@/components/site-logo"

export default function PlaquettePage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white">
      {/* Top Bar non imprimable */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8 print:hidden">
        <Link href="/">
          <Button variant="ghost" className="text-[#1E88E5]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button
            onClick={handlePrint}
            className="bg-[#1E88E5] hover:bg-[#1565C0] text-white gap-2 rounded-xl text-xs sm:text-sm font-bold shadow-md"
          >
            <Printer className="h-4 w-4" />
            <span>Imprimer / Télécharger en PDF</span>
          </Button>
        </div>
      </div>

      {/* Document Plaquette */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 print:shadow-none print:border-none print:p-0">
        
        {/* Header Plaquette */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b-2 border-yellow-300">
          <div className="flex items-center gap-4">
            <SiteLogo size="medium" background="yellow" />
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#FF5722] bg-[#FFF8E1] px-3 py-1 rounded-full border border-[#FFD54F]">
                Dossier Prestations & Privatisations
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1E88E5] mt-2">
                LA CONFRÉRIE FOODTRUCK
              </h1>
              <p className="text-sm font-medium text-gray-600 mt-0.5">
                Street Food Gourmet & Événementiel · Montpellier & Occitanie
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-gray-600 space-y-1 sm:border-l sm:pl-6 sm:border-gray-200">
            <p className="flex items-center gap-1.5 font-bold text-gray-900 justify-end">
              <Phone className="h-3.5 w-3.5 text-[#1E88E5]" /> 06 62 35 09 53
            </p>
            <p className="flex items-center gap-1.5 justify-end">
              <Mail className="h-3.5 w-3.5 text-[#1E88E5]" /> contact@laconfrerietruck.fr
            </p>
            <p className="flex items-center gap-1.5 justify-end">
              <MapPin className="h-3.5 w-3.5 text-[#1E88E5]" /> Montpellier & Rayon 50km
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="py-8 border-b border-gray-100">
          <h2 className="font-display text-xl font-bold text-[#D84315] uppercase tracking-wide mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Une expérience culinaire festive & sans contrainte
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Que ce soit pour un <strong>lendemain de mariage décontracté</strong>, une <strong>fête d'entreprise (afterwork, séminaire, pot de rentrée)</strong> ou un <strong>anniversaire privé</strong>, La Confrérie installe son camion gourmand directement sur votre lieu de réception. Nous garantissons une cuisine 100% maison, préparée minute sous vos yeux avec des produits frais, dans une atmosphère chaleureuse et conviviale.
          </p>
        </div>

        {/* Les 3 Formules */}
        <div className="py-8 border-b border-gray-100">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-6 text-center sm:text-left">
            Nos Formules Traiteur Clés en Main
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Formule 1 */}
            <div className="rounded-2xl border-2 border-gray-200 p-5 bg-gray-50/50 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-display font-bold text-base text-gray-900">Street Food Festive</h3>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#FF5722] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">Sur-Mesure B2B</span>
                </div>
                <p className="text-xs text-gray-600 mb-4">Idéal afterworks rythmés et pauses déjeuner d'entreprise.</p>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-start gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />1 Burger gourmet ou Bo-Bun au choix</li>
                  <li className="flex items-start gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />Frites fraîches maison croustillantes</li>
                  <li className="flex items-start gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />1 Boisson fraîche au choix</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 text-[11px] font-semibold text-gray-600 text-center">
                Service rapide & continu au camion
              </div>
            </div>

            {/* Formule 2 */}
            <div className="rounded-2xl border-2 border-[#1E88E5] p-5 bg-[#E3F2FD]/30 relative flex flex-col justify-between">
              <span className="absolute -top-3 right-4 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FFD54F] text-[#D84315]">
                Le Coup de Cœur
              </span>
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-display font-bold text-base text-[#1E88E5]">Conviviale Gourmande</h3>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#D84315] bg-[#FFF8E1] px-2.5 py-1 rounded-full border border-[#FFD54F]">Clé en Main</span>
                </div>
                <p className="text-xs text-gray-600 mb-4">La formule reine pour les lendemains de mariage et fêtes privées.</p>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-start gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />Choix étendu : Burgers, Pokebowls, Tenders</li>
                  <li className="flex items-start gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />Frites maison à volonté pendant le service</li>
                  <li className="flex items-start gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />1 Dessert maison du chef</li>
                  <li className="flex items-start gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />1 Boisson (bière locale ou soft)</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-200 text-[11px] font-semibold text-[#1E88E5] text-center">
                Grand choix salé & sucré
              </div>
            </div>

            {/* Formule 3 */}
            <div className="rounded-2xl border-2 border-gray-200 p-5 bg-gray-50/50 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-display font-bold text-base text-gray-900">Prestige & Cocktail</h3>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#1E88E5] bg-[#E3F2FD] px-2.5 py-1 rounded-full border border-[#BBDEFB]">Prestation Complète</span>
                </div>
                <p className="text-xs text-gray-600 mb-4">Cocktail déjeunatoire complet avec accueil apéritif.</p>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-start gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />Apéritif finger food d'accueil (bouchées & sauces)</li>
                  <li className="flex items-start gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />Carte festive complète minute au camion</li>
                  <li className="flex items-start gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />Buffet desserts artisanaux & bar à cafés</li>
                  <li className="flex items-start gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />Boissons incluses</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 text-[11px] font-semibold text-gray-600 text-center">
                Animation dînatoire complète
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 italic">
              💡 Tarification personnalisée étudiée selon vos effectifs, les options choisies et le lieu de réception.
            </p>
          </div>
        </div>

        {/* Nos Atouts & Fiche Logistique */}
        <div className="py-8 border-b border-gray-100 grid gap-6 sm:grid-cols-2">
          <div className="bg-[#FFF8E1] rounded-2xl p-5 border border-[#FFD54F]/60">
            <h4 className="font-display font-bold text-sm text-[#D84315] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              Pourquoi choisir La Confrérie ?
            </h4>
            <ul className="space-y-2 text-xs text-gray-700">
              <li>• <strong>100% Fait Maison :</strong> Pain artisanal, sauces signatures et frites coupées sur place.</li>
              <li>• <strong>Options Végétariennes & Veggie :</strong> Alternatives gourmandes pour tous les régimes.</li>
              <li>• <strong>Zéro Vaisselle :</strong> Emballages écologiques biodégradables fournis, nous repartons sans laisser de trace.</li>
              <li>• <strong>Débit rapide :</strong> Capacité jusqu'à 250 convives sans attente prolongée.</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
            <h4 className="font-display font-bold text-sm text-[#1E88E5] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <HeartHandshake className="h-4 w-4" />
              Fiche Technique & Logistique
            </h4>
            <ul className="space-y-2 text-xs text-gray-700">
              <li>• <strong>Emprise au sol :</strong> Espace plat requis de 6 mètres de long sur 2,5 mètres de large.</li>
              <li>• <strong>Électricité :</strong> 1 prise standard 220V 16A (ou option groupe électrogène autonome silencieux).</li>
              <li>• <strong>Installation :</strong> Arrivée 1h à 1h30 avant l'heure souhaitée de début du service.</li>
              <li>• <strong>Réservation :</strong> Acompte de 30% à la commande pour bloquer la date.</li>
            </ul>
          </div>
        </div>

        {/* Footer & CTA Plaquette */}
        <div className="pt-8 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left text-xs text-gray-500">
            <p className="font-bold text-gray-800">Besoin d'un devis immédiat ?</p>
            <p>Rendez-vous sur <strong>laconfrerietruck.fr/devis</strong> pour tester notre simulateur en direct.</p>
          </div>

          <Link href="/devis" className="print:hidden">
            <Button className="bg-[#1E88E5] hover:bg-[#1565C0] text-white px-6 py-3 rounded-xl font-bold text-sm">
              Demander mon devis en ligne
            </Button>
          </Link>
        </div>

      </div>
    </div>
  )
}
