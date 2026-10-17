export interface MegaPackProduct {
  id: number;
  title: string;
  category: string;
  format: string;
  driveUrl: string;
  priceRange: string;
  description: string;
  badge: string;
  isAudio?: boolean;
}

export const MEGA_PACK_PRODUCTS: MegaPackProduct[] = [
  {
    id: 1,
    title: "Formation en Agriculture et Élevage",
    category: "Agrobusiness & Élevage",
    format: "Dossier Google Drive / PDF & Guides",
    driveUrl: "https://drive.google.com/drive/folders/18XX0e3ENGE3vVxaI8CybhYLG3In924Am",
    priceRange: "3000F - 5000F",
    description: "Guides pratiques complets, fiches techniques d'élevage (poulets de chair, porcs, escargots) et techniques d'agriculture moderne rentable en Afrique.",
    badge: "MRR &bull; Revente Autorisée"
  },
  {
    id: 2,
    title: "📚 Pack de 500 E-BOOKS et 100 livres Audios",
    category: "Grande Bibliothèque Digitale",
    format: "Fichier Google Drive / Archives Complètes",
    driveUrl: "https://drive.google.com/file/d/1s-_vsUvQw0_PlDlwmvfs2jI520uVjqh2/view?usp=sharing",
    priceRange: "1500F - 3000F",
    description: "L'immense collection de 500 e-books business, marketing, finance, développement personnel et 100 livres audio à forte valeur ajoutée.",
    badge: "Best-Seller &bull; 500 E-books",
    isAudio: true
  },
  {
    id: 3,
    title: "LIVRES AUDIO SUR LE DEVELOPPEMENT PERSONNEL ET L’ENTREPREUNARIAT",
    category: "Audiobooks & Mindset Business",
    format: "Dossier Google Drive / Audio MP3",
    driveUrl: "https://drive.google.com/drive/folders/1ApCgNqh1fWFnpAk7wS8SufdGy8oM-Kg7?usp=sharing",
    priceRange: "3000F - 5000F",
    description: "Enregistrements audio professionnels sur le leadership, la psychologie de la vente, la discipline des champions et la gestion de la richesse.",
    badge: "Format Audio MP3",
    isAudio: true
  },
  {
    id: 4,
    title: "RITUELS DU MIEL",
    category: "Bien-être & Spiritualité Ancestrale",
    format: "Dossier Google Drive / Guide & Rituels",
    driveUrl: "https://drive.google.com/drive/folders/1MHDEO5VdJIHULKFLQzqcuhHgNXAnyUF-?usp=sharing",
    priceRange: "3000F - 5000F",
    description: "Guide ésotérique et traditions ancestrales sur les propriétés, bienfaits et rituels d'attraction positive à base de miel pur.",
    badge: "Haute Demande"
  },
  {
    id: 5,
    title: "AUDIO POUR APPRENDRE L'ANGLAIS",
    category: "Langues & Formation Audio",
    format: "Dossier Google Drive / Méthode Orale",
    driveUrl: "https://drive.google.com/drive/folders/1z2Aj1J5iFVVklrzwQJa-H91-UT4lemPR?usp=drive_link",
    priceRange: "3000F - 5000F",
    description: "Méthode audio accélérée pour apprendre à s'exprimer avec aisance en anglais des affaires et de la vie quotidienne depuis son smartphone.",
    badge: "Méthode Audio Pratique",
    isAudio: true
  },
  {
    id: 6,
    title: "130 Remèdes Naturels Africains",
    category: "Santé Naturelle & Pharmacopée",
    format: "Fichier Google Drive / Guide PDF",
    driveUrl: "https://drive.google.com/file/d/16A1QMGLDuZtsdbjbhADqR9-SffoQ3BaX/view?usp=sharing",
    priceRange: "3000F - 5000F",
    description: "Recueil pratique illustré de 130 recettes à base de plantes locales africaines, écorces et feuilles médicinales pour soigner les maux courants.",
    badge: "Très Populaire"
  },
  {
    id: 7,
    title: "Purifie ton âme pour ouvrir tes finances",
    category: "Mindset & Prospérité Intérieure",
    format: "Dossier Google Drive / Guide & Méditations",
    driveUrl: "https://drive.google.com/drive/folders/1pY6QMqxX5f0lMON_UWeLZIQWzu76aMTu?usp=sharing",
    priceRange: "3000F - 5000F",
    description: "Méthode pour briser les blocages psychologiques et spirituels liés à l'argent et ouvrir ses canaux de prospérité financière.",
    badge: "Éveil Financier"
  },
  {
    id: 8,
    title: "Reprogrammer son esprit pour accueillir l'abondance divine",
    category: "Spiritualité & Reprogrammation Subconsciente",
    format: "Fichier Google Drive / Manuel PDF",
    driveUrl: "https://drive.google.com/file/d/1ZnIOg3qpKj815rhjh83SFuBtJ9jqM4s3/view?usp=sharing",
    priceRange: "3000F - 5000F",
    description: "Techniques de reprogrammation mentale, affirmations positives quotidiennes et principes d'abondance divine pour réussir ses projets.",
    badge: "Mindset d'Abondance"
  },
  {
    id: 9,
    title: "Totem AFRICAIN sacré",
    category: "Culture & Sagesse Africaine",
    format: "Fichier Google Drive / Document PDF",
    driveUrl: "https://drive.google.com/file/d/1AGZ7HdAVEwg89Qsbh4akFu3dkFVA3KRU/view?usp=sharing",
    priceRange: "3000F - 5000F",
    description: "Comprendre les totems sacrés africains, les forces animales associées aux lignées et la reconnexion avec les racines traditionnelles.",
    badge: "Héritage Sacré"
  },
  {
    id: 10,
    title: "Vendre avec WhatsApp Business",
    category: "Vente & Closing Mobile",
    format: "Dossier Google Drive / Formation & Stratégie",
    driveUrl: "https://drive.google.com/drive/folders/1AGkhmX0E4_s52jsVCx4qC-qXWtvV8x8W",
    priceRange: "3000F - 5000F",
    description: "Le système complet pour vendre des produits digitaux avec WhatsApp : catalogue professionnel, messages de relance et encaissement Mobile Money.",
    badge: "Essentiel Vente M.D.D."
  }
];
