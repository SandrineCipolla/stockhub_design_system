# StockHub Design System

[![Accessibilité Lighthouse](https://img.shields.io/badge/accessibility-100%2F100-brightgreen?logo=lighthouse)](https://SandrineCipolla.github.io/stockhub_design_system/)

> Web Components (Lit) réutilisables de StockHub V2, documentés dans Storybook

[Storybook](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/), [Rapport Lighthouse (accessibilité)](https://SandrineCipolla.github.io/stockhub_design_system/), [CHANGELOG](CHANGELOG.md), [État du projet](ETAT_DU_PROJET.md), [Documentation](documentation/INDEX.md)

Ce Design System fournit les composants d'interface de [StockHub V2](https://github.com/SandrineCipolla/stockHub_V2_front), une application de gestion de stocks avec prédictions. Les composants sont des Web Components Lit, organisés selon l'Atomic Design et préfixés `sh-`. Ils sont indépendants de React et s'utilisent dans n'importe quelle page HTML.

## Installation

Le package n'est pas publié sur le registre npm. Il s'installe depuis GitHub, par tag :

```bash
npm install github:SandrineCipolla/stockhub_design_system#vX.Y.Z
```

`vX.Y.Z` est un tag des [releases](https://github.com/SandrineCipolla/stockhub_design_system/releases), créé par Release Please.

## Utilisation

**Dans React (StockHub V2)** : les composants sont utilisés à travers des wrappers React, voir le [guide du frontend](https://github.com/SandrineCipolla/stockHub_V2_front/blob/main/docs/2-WEB-COMPONENTS-GUIDE.md) et [documentation/4-REACT-INTEGRATION-GUIDE.md](documentation/4-REACT-INTEGRATION-GUIDE.md).

**Dans une page HTML** :

```html
<script type="module" src="./dist/index.js"></script>

<sh-button variant="primary" size="lg" iconBefore="Plus">Add Item</sh-button>

<sh-card hover clickable>
  <h3 slot="header">Card Title</h3>
  <p>Card content...</p>
</sh-card>
```

## Composants Disponibles

Props, événements, slots et exemples interactifs de chaque composant : [Storybook](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/). L'API y est générée depuis le code (JSDoc et Custom Elements Manifest).

### Atoms : composants de base

| Composant | Rôle |
|---|---|
| [`sh-badge`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-atoms-badge--docs) | Badge coloré pour statuts et labels |
| [`sh-icon`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/story/components-atoms-icon--default) | Icône depuis la bibliothèque Lucide (1000+ icônes) |
| [`sh-input`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-atoms-input--docs) | Champ de saisie avec validation et états |
| [`sh-logo`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-atoms-logo--docs) | Logo StockHub avec variants |
| [`sh-role-badge`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-atoms-rolebadge--docs) | Badge affichant le rôle d'un collaborateur sur un stock partagé |
| [`sh-text`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-atoms-text--docs) | Composant texte typographique |

### Molecules : combinaisons

| Composant | Rôle |
|---|---|
| [`sh-button`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-molecules-button--docs) | Bouton avec variants, états, et support d'icônes |
| [`sh-card`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-molecules-card--docs) | Conteneur de contenu avec effets glassmorphism |
| [`sh-contribution-card`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-molecules-contributioncard--docs) | Carte affichant une contribution en attente, avec actions approuver/rejeter |
| [`sh-contribution-form`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-molecules-contributionform--docs) | Formulaire de soumission d'une contribution de quantité par un `VIEWER_CONTRIBUTOR` |
| [`sh-metric-card`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-molecules-metriccard--docs) | Carte métrique pour afficher des KPIs avec icône, valeur et tendance |
| [`sh-quantity-input`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-molecules-quantityinput--docs) | Input numérique avec boutons +/- |
| [`sh-role-selector`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-molecules-roleselector--docs) | Dropdown pour sélectionner le rôle d'un collaborateur |
| [`sh-search-input`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-molecules-searchinput--docs) | Input de recherche avec icône pour la recherche de produits |
| [`sh-stat-card`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-molecules-statcard--docs) | Carte statistique minimaliste pour filtrage interactif |
| [`sh-status-badge`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-molecules-statusbadge--docs) | Badge spécialisé pour statuts de stock, avec animation pulse pour états critiques |

### Organisms : composants complexes

| Composant | Rôle |
|---|---|
| [`sh-collaborator-list`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-organisms-collaboratorlist--docs) | Liste des collaborateurs d'un stock, actions selon le rôle de l'utilisateur connecté |
| [`sh-footer`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-organisms-footer--docs) | Footer de l'application avec copyright dynamique et liens légaux |
| [`sh-header`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-organisms-header--docs) | Header de l'application |
| [`sh-ia-alert-banner`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-organisms-iaalertbanner--docs) | Bandeau d'alertes IA pour les stocks nécessitant attention |
| [`sh-page-header`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-organisms-pageheader--docs) | En-tête de page avec fil d'Ariane, titre, sous-titre et boutons d'action |
| [`sh-stock-card`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-organisms-stockcard--docs) | Carte de stock pour le dashboard avec statut, métriques et actions |
| [`sh-stock-item-card`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-organisms-stockitemcard--docs) | Carte de produit pour l'inventaire familial avec statut, métriques et actions |
| [`sh-stock-prediction-card`](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/?path=/docs/components-organisms-stockpredictioncard--docs) | Carte de prédiction ML pour les ruptures de stock prévues |

## Développement

```bash
npm install
npm run storybook        # Storybook sur http://localhost:6006
npm run build:lib        # build de la bibliothèque
npm run build-storybook  # Storybook statique dans storybook-static/
npm run tokens:generate  # design-tokens.css depuis src/tokens/tokens.json
npm run lint
npm run audit:conventions
```

- Créer un composant, thèmes, tests, CI/CD : [documentation/10-GUIDE-DEVELOPPEMENT.md](documentation/10-GUIDE-DEVELOPPEMENT.md)
- Design tokens : [documentation/2-DESIGN-TOKENS.md](documentation/2-DESIGN-TOKENS.md)
- Contribuer (branches, commits, PR, issues) : [CONTRIBUTING.md](CONTRIBUTING.md)
