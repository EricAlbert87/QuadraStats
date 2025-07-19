# QuadraStats – Backend

## Description
Backend Node.js (Express) servant d'API pour les données en temps réel des 4 sports : NFL, NHL, Golf et Tennis.

## Prérequis
- Node.js (v18+ recommandé)
- npm

## Installation
```bash
cd backend
npm install
```

## Lancement du serveur
```bash
npm start
```

Le backend sera accessible sur `http://localhost:5000`.

## Endpoints disponibles
- `GET /api/nfl` – Données NFL
- `GET /api/nhl` – Données NHL
- `GET /api/golf` – Données Golf
- `GET /api/tennis` – Données Tennis

## Notes
- Les scrapers (`scrapers/*.js`) contiennent des données factices. Pour connecter des données en direct, remplacez-les par vos scripts Puppeteer ou API calls.
