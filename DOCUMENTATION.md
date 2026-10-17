# LES MILLIONNAIRES DU DIGITAL (M.D.D.)
## Documentation Technique, Guide de Déploiement & Architecture

### 1. Vision et Spécifications
- **Nom officiel :** LES MILLIONNAIRES DU DIGITAL (M.D.D.)
- **Cible :** Entrepreneurs, étudiants et salariés d'Afrique francophone (Cameroun, Côte d'Ivoire, Sénégal, Bénin, Togo, Gabon, Tchad, Congo, RDC).
- **Langue principale :** Français.
- **Devise de référence :** FCFA (XAF/XOF).
- **Tarif initial configurable :** 6 550 FCFA (équivalent indicatif 9,99 €), paramétrable directement dans la console administrateur.
- **Fuseau horaire de référence :** Afrique/Douala (GMT+1).
- **Charte visuelle :** Fond noir profond (`#0A0A0A`), textes blancs (`#FFFFFF`), accent bleu électrique (`#4FC3F7`), accent or (`#FFD700`). Typographies : Montserrat & Plus Jakarta Sans.

---

### 2. Comptes d'Accès et de Démonstration
Pour faciliter les revues et tests immédiats sans friction :
- **Compte Administrateur Principal :**
  - Nom : Amadou Diallo (Fondateur & Super Admin)
  - E-mail : `admin@mdd.africa`
  - WhatsApp : `+237 691 23 45 67`
  - Code Affilié : `MDD-ADMIN-01`
  - Rôle : `admin` (Accès complet à la console d'administration, prix, audits, gestion des membres et commissions)
- **Compte Membre Actif (Côte d'Ivoire) :**
  - Nom : Koffi Mensah
  - E-mail : `koffi@gmail.com`
  - WhatsApp : `+225 07 88 99 00 11`
  - Code Affilié : `MDD-KOFFI-92`
  - Rôle : `member`
- **Compte Membre Actif (Sénégal) :**
  - Nom : Aminata Traoré
  - E-mail : `aminata@gmail.com`
  - WhatsApp : `+221 77 123 45 67`
  - Code Affilié : `MDD-AMINA-44`
  - Rôle : `member`
- **Compte en attente de validation (RDC) :**
  - Nom : Christian Mukendi
  - E-mail : `mukendi.chr@gmail.com`
  - WhatsApp : `+243 81 987 65 43`
  - Statut : `pending_payment`

*Note : Ces données sont des démonstrateurs réalistes pré-chargés permettant d'évaluer le système de commissions, les tickets de support et les modules de cours sans délai.*

---

### 3. Schéma de Base de Données PostgreSQL
Le fichier DDL complet et prêt pour la production est situé dans `/src/db/schema.sql`. Il intègre :
1. `users` : Comptes utilisateurs, rôles (admin, member), statuts (active, suspended, pending_payment), affiliations.
2. `digital_products` : Catalogue des produits, prix FCFA, types de licences stricts (MRR, PLR, affiliation, consultation), statistiques.
3. `courses`, `course_modules`, `lessons`, `user_lesson_progress` : Système complet LMS avec suivi de progression par élève.
4. `sales_page_templates` : Modèles de pages de vente avec accroches et code source.
5. `marketing_resources` : Scripts vidéo, swipes WhatsApp, accroches publicitaires, calendriers.
6. `orders` : Enregistrement de chaque commande, devise FCFA, moyen de paiement et références de transaction.
7. `commissions` : Calcul transparent des commissions dues aux affiliés selon le taux défini.
8. `community_events` & `community_announcements` : Rencontres du samedi 19h Douala et alertes officielles.
9. `support_tickets` : Messagerie bidirectionnelle entre membres et administrateurs.
10. `platform_settings` : Configuration dynamique du tarif FCFA et des passerelles.
11. `audit_logs` : Journalisation de sécurité horodatée Afrique/Douala.

---

### 4. Architecture des Solutions de Paiement en Afrique Francophone
La plateforme a été conçue pour s'interfacer avec les prestataires agrégateurs leaders :
- **CinetPay :** Couverture Cameroun, Côte d'Ivoire, Sénégal, Bénin, Togo, Mali, RDC (Orange Money, MTN MoMo, Wave, Moov, Carte).
- **FedaPay :** Couverture Bénin, Togo, Côte d'Ivoire, Sénégal.
- **Wave Business :** Intégration QR Code et Checkout direct pour Sénégal et Côte d'Ivoire.
- **Notch Pay :** Agrégateur Cameroun pour encaissement Orange & MTN.

#### Règle de Sécurité Absolue :
1. **Pas de faux succès par redirection :** Une commande n'est **JAMAIS** marquée comme confirmée sur la simple redirection du navigateur web. Seul le webhook serveur vérifié par signature cryptographique (HMAC SHA-256) ou une validation manuelle formelle par l'administrateur autorise le passage au statut `confirmed` et le déblocage des accès.
2. **Protection du Code PIN :** La plateforme **ne demande jamais et ne manipule jamais** le code PIN Mobile Money d'un acheteur.

---

### 5. État des Fonctionnalités & Checklist de Production

| Fonctionnalité | Statut Actuel | Action requise pour Production |
| :--- | :--- | :--- |
| **Interface & Expérience Mobile** | ✅ 100% Fonctionnel | Prêt à l'emploi |
| **Authentification & Gestion des Rôles** | ✅ 100% Fonctionnel | Prêt à l'emploi |
| **Catalogue & Licences (MRR/PLR/Affiliation)** | ✅ 100% Fonctionnel | Prêt à l'emploi |
| **Formations & Suivi de Progression** | ✅ 100% Fonctionnel | Téléverser vos vidéos privées définitives |
| **Pages de Vente & Copie de Code** | ✅ 100% Fonctionnel | Prêt à l'emploi |
| **Ressources Marketing & Scripts WhatsApp** | ✅ 100% Fonctionnel | Prêt à l'emploi |
| **Suivi d'Affiliation & Commissions** | ✅ 100% Fonctionnel | Prêt à l'emploi |
| **Espace Administrateur & Exports CSV** | ✅ 100% Fonctionnel | Prêt à l'emploi |
| **Journal d'Audit & Sécurité** | ✅ 100% Fonctionnel | Prêt à l'emploi |
| **Passerelles CinetPay / FedaPay en mode Réel** | ⚙️ Architecture prête (Mode Test/Sandbox actif) | Renseigner les clés d'API réelles dans `.env` |

---

### 6. Instructions d'Installation et d'Exécution Locale
```bash
# 1. Cloner le projet ou ouvrir le dossier racine
cd les-millionnaires-du-digital

# 2. Installer les dépendances Node.js
npm install

# 3. Configurer l'environnement (dupliquer .env.example)
cp .env.example .env

# 4. Lancer le serveur de développement
npm run dev

# 5. Compiler l'application pour la production
npm run build
```
