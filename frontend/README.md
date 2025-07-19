# QuadraStats – Frontend

## Description
QuadraStats est un tableau de bord interactif en React + Vite affichant des statistiques pour la NFL, la NHL, le Golf et le Tennis. Il inclut des graphiques interactifs (Recharts) et une interface bilingue (anglais/français).

## Prérequis
- Node.js (v18+ recommandé)
- npm

## Installation
```bash
cd frontend
npm install
```

## Développement
Lancer le serveur de développement :
```bash
npm run dev
```

Le site sera accessible via : `http://localhost:5173`

## Construction pour la production
```bash
npm run build
```

## Déploiement sur GitHub Pages
1. Assurez-vous de configurer `base` dans `vite.config.js` avec votre nom de dépôt (ex : `/QuadraStats/`).
2. Installer `gh-pages` :
   ```bash
   npm install gh-pages --save-dev
   ```
3. Ajouter le script suivant dans `package.json` :
   ```json
   "deploy": "gh-pages -d dist"
   ```
4. Exécuter :
   ```bash
   npm run build
   npm run deploy
   ```
