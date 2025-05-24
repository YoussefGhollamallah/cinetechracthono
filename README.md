# 🎬 CinéTech

**CinéTech** est une application web moderne de découverte de films et séries, développée avec React et TypeScript. Elle utilise l'API TMDB (The Movie Database) pour fournir des informations complètes sur les derniers films et séries populaires.

![CinéTech Preview](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.4.0-purple?style=for-the-badge&logo=vite)

## ✨ Fonctionnalités

### 🏠 **Page d'accueil**
- Affichage des films et séries tendances
- Cartes épurées avec image, titre et bouton détails
- Design responsive pour tous les appareils

### 🔍 **Recherche intelligente**
- **Auto-complétion** en temps réel
- Suggestions visuelles avec posters
- Navigation directe vers les détails
- Debounce pour optimiser les performances

### 📱 **Design responsive**
- **Mobile** (≤ 480px) : Interface optimisée pour smartphones
- **Tablette** (≤ 768px) : Adaptation pour tablettes
- **Desktop** (≥ 1024px) : Interface complète
- Menu hamburger sur mobile

### 🎬 **Pages dédiées**
- **Films populaires** avec pagination
- **Séries populaires** avec pagination
- **Résultats de recherche** filtrés

### 📄 **Page de détails complète**
- Informations détaillées (note, genres, date, durée)
- Synopsis complet
- Distribution principale avec photos
- Réalisateur et équipe technique
- Image de fond immersive
- Design glassmorphism moderne

### 🎨 **Interface moderne**
- Thème sombre avec dégradés
- Animations fluides et transitions
- Effets de verre (glassmorphism)
- Typographie avec dégradés colorés

## 🛠️ Technologies utilisées

- **Frontend** : React 18 + TypeScript
- **Build Tool** : Vite
- **Styling** : CSS3 avec variables et animations
- **Routing** : React Router DOM
- **HTTP Client** : Axios
- **API** : TMDB (The Movie Database)

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 16 ou supérieure) - [Télécharger ici](https://nodejs.org/)
- **npm** (inclus avec Node.js) ou **yarn**
- Un éditeur de code (VS Code recommandé)

## 🚀 Installation

### 1. **Cloner le projet**
```bash
git clone https://github.com/votre-username/cinetech.git
cd cinetech
```

### 2. **Installer les dépendances**
```bash
npm install
```
*ou avec yarn :*
```bash
yarn install
```

### 3. **Configuration de l'API TMDB**

#### a) Créer un compte TMDB
1. Rendez-vous sur [TMDB](https://www.themoviedb.org/)
2. Créez un compte gratuit
3. Allez dans **Paramètres** → **API**
4. Demandez une clé API (gratuite)

#### b) Configurer les variables d'environnement
1. Créez un fichier `.env` à la racine du projet :
```bash
touch .env
```

2. Ajoutez votre clé API dans le fichier `.env` :
```env
VITE_TMDB_API_KEY=votre_cle_api_ici
```

⚠️ **Important** : Ne partagez jamais votre clé API publiquement !

### 4. **Lancer l'application**
```bash
npm run dev
```

L'application sera accessible sur : `http://localhost:5173`

## 📁 Structure du projet

```
cinetech/
├── public/                 # Fichiers statiques
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── Header.tsx      # En-tête avec navigation
│   │   ├── Header.css
│   │   ├── SearchBar.tsx   # Barre de recherche avec auto-complétion
│   │   ├── SearchBar.css
│   │   ├── Footer.tsx      # Pied de page
│   │   └── Footer.css
│   ├── pages/              # Pages principales
│   │   ├── Home.tsx        # Page d'accueil
│   │   ├── Home.css
│   │   ├── Movies.tsx      # Page des films
│   │   ├── Movies.css
│   │   ├── Series.tsx      # Page des séries
│   │   ├── Series.css
│   │   ├── Details.tsx     # Page de détails
│   │   ├── Details.css
│   │   ├── Search.tsx      # Page de recherche
│   │   └── Search.css
│   ├── App.tsx             # Composant principal
│   ├── App.css
│   ├── main.tsx            # Point d'entrée
│   └── index.css           # Styles globaux
├── .env                    # Variables d'environnement
├── package.json
├── vite.config.ts
└── README.md
```

## 🎯 Utilisation

### Navigation
- **Accueil** : Films et séries tendances
- **Films** : Catalogue des films populaires
- **Séries** : Catalogue des séries populaires
- **Recherche** : Utilisez la barre de recherche en haut

### Recherche
1. Tapez dans la barre de recherche
2. Des suggestions apparaissent automatiquement
3. Cliquez sur une suggestion pour voir les détails
4. Ou appuyez sur "Entrée" pour voir tous les résultats

### Détails
- Cliquez sur "Voir les détails" sur n'importe quelle carte
- Accédez aux informations complètes
- Utilisez le bouton "Retour" pour revenir

## 🔧 Scripts disponibles

```bash
# Lancer en mode développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la build de production
npm run preview

# Linter (vérification du code)
npm run lint
```

## 📱 Responsive Design

L'application s'adapte automatiquement à tous les écrans :

- **Mobile** (≤ 480px) : 1-2 colonnes, menu hamburger
- **Tablette** (≤ 768px) : 2-3 colonnes, navigation adaptée
- **Desktop** (≥ 1024px) : 3-4 colonnes, navigation complète

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans les fichiers CSS :
- **Primaire** : `#ff6b6b` (rouge-orange)
- **Secondaire** : `#4ecdc4` (turquoise)
- **Fond** : Dégradé `#1a1a2e` → `#16213e`

### Animations
Toutes les animations utilisent `transition: all 0.3s ease` pour une expérience fluide.

## 🐛 Dépannage

### Problèmes courants

#### 1. **Erreur "API Key manquante"**
- Vérifiez que le fichier `.env` existe
- Vérifiez que la variable `VITE_TMDB_API_KEY` est correctement définie
- Redémarrez le serveur de développement

#### 2. **Images qui ne s'affichent pas**
- Vérifiez votre connexion internet
- Vérifiez que l'API TMDB est accessible

#### 3. **Erreur de build**
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

#### 4. **Port déjà utilisé**
```bash
# Utiliser un autre port
npm run dev -- --port 3000
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. Créez une **branche** pour votre fonctionnalité
3. **Committez** vos changements
4. **Push** vers la branche
5. Ouvrez une **Pull Request**

### Standards de code
- Utilisez **TypeScript** pour tous les nouveaux fichiers
- Suivez les conventions de nommage **camelCase**
- Ajoutez des **commentaires** pour les fonctions complexes
- Testez sur **mobile, tablette et desktop**

## 🙏 Remerciements

- **TMDB** pour leur API gratuite et complète
- **React** et **Vite** pour les outils de développement
- La communauté **open source** pour l'inspiration

## 📞 Support

Si vous rencontrez des problèmes :

1. Vérifiez la section **Dépannage** ci-dessus
2. Consultez les **issues** existantes sur GitHub
3. Créez une **nouvelle issue** si nécessaire

---

**Développé avec ❤️ par Youssef Ghollamallah**

*CinéTech - Découvrez le cinéma autrement* 🎬✨ 