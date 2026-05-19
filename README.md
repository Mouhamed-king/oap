# OPTIMUM ASSUR PRO — Site Cinématique Ultra-Premium

Site web cinématique pour **Optimum Assur Pro**, une compagnie d'assurance sénégalaise. Expérience immersive de type Apple/Awwwards avec animations scroll-driven, transitions cinématiques et storytelling visuel.

---

## Stack technique

- **React 18** + **Vite 5**
- **Framer Motion** — animations & scroll-driven transitions
- **Lucide React** — icônes premium
- **Google Fonts** — Cormorant Garamond + Outfit

---

## Installation

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
npm run preview
```

---

## Structure du projet

```
optimum-assur-pro/
├── index.html                          # Entry HTML
├── public/                             # Images statiques (vos assets)
│   ├── logo.png
│   ├── pdg.png
│   ├── dg.png
│   ├── drh.png
│   ├── seo.png
│   ├── djolof.png
│   ├── askia.png
│   ├── saar.png
│   ├── providence.png
│   ├── vp.png
│   ├── taxi.png
│   ├── moto.png
│   ├── camion.png
│   ├── campus_baobab.png
│   ├── chantier.jpeg
│   └── entreprise.jpg
├── src/
│   ├── main.jsx                        # Entry point React
│   ├── App.jsx                         # Root: assemble les sections
│   ├── index.css                       # Variables CSS globales + reset
│   ├── hooks/
│   │   └── useScrollProgress.js        # Custom hooks scroll
│   └── components/
│       └── cinematic/
│           ├── Navbar.jsx              # Navigation fixe + mobile burger
│           ├── HeroSection.jsx         # Hero fullscreen cinématique
│           ├── VehicleOrbit.jsx        # Orbite véhicules scroll-driven
│           ├── DroneSection.jsx        # Section drone avec animation SVG
│           ├── InfrastructureSection.jsx # Scroll horizontal infrastructures
│           ├── InsuranceCards.jsx      # Cards flottantes autres assurances
│           ├── AccidentScene.jsx       # Scène accident cinématique
│           ├── TeamSection.jsx         # Cartes équipe premium
│           ├── PartnersSection.jsx     # Orbite partenaires animée
│           ├── Footer.jsx              # Footer minimaliste premium
│           └── Particles.jsx           # Canvas particules réutilisable
```

---

## Sections & fonctionnalités

### 🎬 Hero Section
- Headline animé mot par mot (`UN SERVICE PROCHE DE VOUS`)
- Image PDG flottante avec halo lumineux
- Particules canvas animées en arrière-plan
- Boutons CTA : Nous contacter / Découvrir nos services
- Transition scroll : scale + blur + opacity

### 🚗 Vehicle Orbit (scroll-driven)
- 4 scènes : Véhicule particulier, Taxi, Moto, Camion
- Chaque 100vh de scroll = changement de véhicule
- Image flottante, panneau de services animé
- Réflexion sol + éclairage coloré par catégorie
- Indicateurs de progression (dots)

### 🚁 Drone Section (400vh)
- Drone SVG animé traversant l'écran pendant le scroll
- 3 phases textuelles : "Plus besoin de vous déplacer" → livraison → offre gratuite 2 mois
- Badge exclusif doré avec effet glow
- Nuages et atmosphère cinématique

### 🏗️ Infrastructure Section (scroll horizontal)
- 3 scènes : Établissements scolaires, Chantiers, Entreprises
- Défilement horizontal piloté par le scroll
- Images en arrière-plan avec overlay coloré
- Services affichés sous forme de pills

### 📋 Insurance Cards
- 7 autres types d'assurance
- Cards flottantes avec icônes colorées
- Animation d'entrée `whileInView` + hover lift

### 🚨 Accident Scene (500vh, cinématique)
- Taxi et VP approchent en sens inverse
- 3 messages émotionnels séquentiels
- Overlay chaud pour la transition stress → réconfort

### 👥 Team Section
- 4 membres avec images flottantes
- Hover : glow coloré + border dynamique

### 🌐 Partners Section
- Orbite CSS animée avec les logos partenaires
- DJOLOF ASSUR SA mis en avant au centre
- Déclaration de confiance en Cormorant Garamond

### 📄 Footer
- Logo + slogan
- Liste de services
- Contacts (téléphone, email, adresse)
- Réseaux sociaux
- Mentions légales

---

## Assets requis (dossier `/public`)

Placez vos images dans le dossier `public/` :

| Fichier | Usage |
|---------|-------|
| `logo.png` | Logo navbar |
| `pdg.png` | PDG dans le hero |
| `dg.png` | Équipe |
| `drh.png` | Équipe |
| `seo.png` | Équipe |
| `djolof.png` | Partenaire principal |
| `askia.png` | Partenaire |
| `saar.png` | Partenaire |
| `providence.png` | Partenaire |
| `vp.png` | Véhicule particulier |
| `taxi.png` | Taxi |
| `moto.png` | Moto |
| `camion.png` | Camion |
| `campus_baobab.png` | École |
| `chantier.jpeg` | Chantier |
| `entreprise.jpg` | Entreprise |

---

## Palette de couleurs

```css
--blue-deep:   #0A1628  /* Fond principal */
--blue-navy:   #0D2347
--blue-royal:  #1A3A6B
--blue-mid:    #1E5FA8
--blue-bright: #2D82D8
--blue-glow:   #4FA3F7
--gold:        #C9A84C  /* Accent premium */
--silver:      #B8C5D6
```

## Typographie

- **Cormorant Garamond** — titres cinématiques, slogans
- **Outfit** — corps de texte, interface

---

## Personnalisation

### Modifier les infos de contact
Dans `Footer.jsx`, ligne avec `href="tel:..."` et `href="mailto:..."`.

### Ajouter un véhicule
Dans `VehicleOrbit.jsx`, ajouter un objet au tableau `vehicles`.

### Modifier les textes du drone
Dans `DroneSection.jsx`, modifier les éléments de texte dans les 3 phases.

---

*Conçu pour OPTIMUM ASSUR PRO — Sénégal*
