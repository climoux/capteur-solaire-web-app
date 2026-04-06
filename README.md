# Solar Sensor Dashboard (Mobile-Only)

Une application web moderne pour surveiller et contrôler vos capteurs solaires en temps réel.

## 🚀 Lancement Rapide

### Prérequis
- Node.js (v18+)
- npm ou yarn

### Installation
1. Accédez au dossier `web` :
   ```bash
   cd web
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
   L'application sera disponible sur `http://localhost:3000`.

## 🛠️ Configuration API
Par défaut, l'application pointe vers `http://localhost:5001`. Vous pouvez modifier ce comportement dans `vite.config.ts`.

N'oubliez pas de configurer votre **Bearer Token** dans la page **Paramètres** de l'application pour autoriser les requêtes vers l'API IoT.

## 📱 Utilisation Mobile
Cette application est conçue pour être **mobile-only**. Pour simuler l'affichage sur votre navigateur :
1. Ouvrez l'inspecteur (F12).
2. Activez le mode "Toggle Device Toolbar" (Icône smartphone/tablette).
3. Choisissez un modèle (ex: iPhone 12 Pro).

## 📄 Fonctionnalités
- **Identification par QR Code** : Accès direct via `?id=VOTRE_ID` dans l'URL.
- **Dashboard Temps Réel** : Monitoring des températures et flux d'air via WebSockets.
- **Contrôles Manuels** : Ajustement de la température cible, vitesse ventilateur et mode trappe.
- **Historique** : Graphiques de télémétrie sur les dernières 24h.
