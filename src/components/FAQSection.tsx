import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Faut-il avoir de l'expérience pour démarrer ?",
      a: "Non. Le programme a été structuré en partant de zéro absolu. Vous n'avez pas besoin de savoir programmer, ni de créer des sites web complexes. Nous vous montrons comment utiliser des outils gratuits ou très accessibles (Canva, WhatsApp Business, Google Drive) directement depuis votre smartphone ou un ordinateur."
    },
    {
      q: "Comment fonctionne concrètement le système M.D.D. ?",
      a: "Le système repose sur un modèle d'accès à des produits numériques déjà créés (e-books, templates, vidéos) avec des droits légaux de commercialisation (MRR / PLR ou affiliation). Vous apprenez à générer du trafic qualifié, à présenter ces offres avec nos modèles de pages de vente, et à encaisser vos clients via les solutions locales de Mobile Money."
    },
    {
      q: "Quels outils sont concrètement fournis dans l'espace membre ?",
      a: "Vous recevez l'accès immédiat à : 1) La bibliothèque de plus de 100 produits digitaux prêts à être exploités ; 2) Plus de 20 modèles de pages de vente orientées conversion mobile ; 3) Une banque de scripts vidéo, messages WhatsApp et accroches publicitaires ; 4) Le parcours de formation vidéo en 5 modules ; 5) Les replays et invitations aux sessions hebdomadaires privées."
    },
    {
      q: "Comment accéder à la formation après mon inscription ?",
      a: "Dès la création de votre compte, votre espace membre est automatiquement déverrouillé, sans aucune modalité ni frais de paiement. Vous pouvez vous connecter à n'importe quel moment 24h/24 et 7j/7 depuis votre téléphone ou votre ordinateur pour visionner les vidéos et télécharger les documents."
    },
    {
      q: "Comment fonctionne l'accès aux 4 pôles et au programme d'affiliation ?",
      a: "Les 4 pôles sont conçus pour votre autonomie. Les formations vidéo, le méga pack de produits digitaux MRR et les lives du samedi sont en accès direct. Concernant le programme d'affiliation et ses produits prêts à vendre, l'accès se fait sur invitation : il vous suffit de contacter le +237 691906670 sur WhatsApp en fournissant votre adresse e-mail et votre nom pour recevoir votre code ou validation officielle."
    },
    {
      q: "Comment fonctionne la vente des produits et les licences ?",
      a: "Chaque produit du catalogue possède une étiquette de droits explicite : 1) 'Droits de Revente (MRR)' : vous pouvez vendre le produit et garder 100% de la somme encaissée ; 2) 'Droits de Label Privé (PLR)' : vous pouvez modifier le contenu, y apposer votre nom et le vendre ; 3) 'Affiliation Uniquement' : vous partagez votre lien officiel et recevez une commission automatique par vente (entre 40% et 60%) ; 4) 'Consultation Personnelle' : réservé à votre usage propre."
    },
    {
      q: "Les revenus sont-ils garantis ?",
      a: "NON. Aucun revenu n'est garanti. Tout business comporte une part d'effort et d'apprentissage. Ceux qui prétendent qu'on devient riche en un clic sans travailler mentent. Chez M.D.D., nous vous fournissons un système complet, des ressources de haute qualité et un accompagnement sérieux. Vos résultats dépendront entièrement de votre sérieux, de votre assiduité et de votre passage à l'action régulier."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 border-b border-neutral-800 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 md:mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#FFD700] mb-2">
            Transparence &amp; Réponses
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4 text-balance">
            Questions Fréquentes
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Toutes les réponses à vos interrogations avant de rejoindre la communauté.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-neutral-900/40 border border-neutral-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <div className="p-1 rounded bg-neutral-800 text-neutral-300 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
