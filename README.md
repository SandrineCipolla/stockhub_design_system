# StockHub Design System

> Design System réutilisable (web + mobile) basé sur Web Components (Lit Element)

## 📋 Contexte & Stratégie Complète

**Ce Design System est développé selon la stratégie documentée dans** :
- **Repo** : StockHubV2
- **Branche** : `feature/ai-business-intelligence`
- **Chemin** : `Front_End/stockHub_V2_front/documentation/planning/STORYBOOK-ARCHITECTURE-STRATEGY.md`

Cette stratégie définit :
- Architecture à 2 niveaux (CategoryCard → StockItemCard)
- Migration progressive vers Web Components
- Méthodologie Atomic Design (Atoms, Molecules, Organisms)
- Plan de développement en sessions

## 🎯 Vision & Objectifs

### Objectifs Principaux
- Créer des composants UI réutilisables pour web **et mobile**
- Éviter toute duplication de code entre projets
- Valider le design visuellement avant implémentation
- Maintenir une qualité de code élevée (coverage ≥ 93%, Lighthouse ≥ 98)
- **Compatibilité totale avec StockHub V2** (React + lucide-react)

### Technologies
- **Lit Element** : Framework léger (5KB) pour Web Components
- **TypeScript** : Type safety strict mode
- **Storybook** : Documentation interactive et prototypage
- **Design Tokens** : Système de tokens centralisé pour cohérence visuelle
- **Lucide Icons** : Bibliothèque d'icônes (1000+ icônes, compatible StockHub V2)

## 🏗️ Architecture

### Structure Atomic Design

```
src/
├── components/
│   ├── atoms/                    # Composants de base
│   │   ├── badge/               # sh-badge (NEW)
│   │   ├── icon/                # sh-icon (Lucide)
│   │   ├── input/               # sh-input
│   │   ├── logo/                # sh-logo
│   │   └── text/                # sh-text
│   ├── molecules/                # Combinaisons d'atoms
│   │   ├── button/              # sh-button (ghost, loading, icons)
│   │   ├── card/                # sh-card (NEW)
│   │   ├── quantity-input/      # sh-quantity-input
│   │   └── status-badge/        # sh-status-badge (NEW)
│   └── organisms/                # Composants complexes
│       └── header/              # sh-header
├── tokens/                       # Design tokens (colors, spacing, etc.)
├── icons/                        # DEPRECATED: Remplacé par Lucide
└── styles/                       # Global styles et CSS utilities
```

### Convention de Nommage
Tous les composants utilisent le préfixe `sh-` (StockHub) :
- `<sh-button>`
- `<sh-input>`
- `<sh-icon>`
- `<sh-badge>`
- `<sh-card>`

## 📦 Installation & Usage

### Installation
```bash
npm install @stockhub/design-system
```

### Utilisation en React
```tsx
import '@stockhub/design-system/dist/index.js';

function App() {
  return (
    <>
      <sh-button variant="primary" size="lg" iconBefore="Plus">
        Add Item
      </sh-button>

      <sh-card hover clickable padding="md">
        <h3>Product Card</h3>
        <p>Description...</p>
      </sh-card>

      <sh-badge variant="success" size="md">In Stock</sh-badge>
    </>
  );
}
```

### Utilisation Directe (HTML)
```html
<script type="module" src="./dist/index.js"></script>

<sh-button variant="primary" size="lg" iconBefore="Plus">
  Add Item
</sh-button>

<sh-card hover clickable>
  <h3 slot="header">Card Title</h3>
  <p>Card content...</p>
</sh-card>
```

## 🎨 Composants Disponibles

### Atoms (Composants de Base)

#### `<sh-icon>` ⚡ NOUVELLE VERSION (Lucide)
Affiche une icône depuis la bibliothèque **Lucide** (1000+ icônes).

**Props** :
- `name`: Nom de l'icône en PascalCase (ex: `"Package"`, `"TrendingUp"`, `"AlertTriangle"`)
- `size`: `"xs"` | `"sm"` | `"md"` | `"lg"` | `"xl"`
- `color`: `"inherit"` | `"primary"` | `"success"` | `"warning"` | `"danger"` | `"muted"`
- `clickable`: boolean - Ajoute effets hover
- `spin`: boolean - Animation de rotation

```html
<sh-icon name="Package" size="md" color="primary"></sh-icon>
<sh-icon name="TrendingUp" size="lg" color="success"></sh-icon>
<sh-icon name="RefreshCw" size="md" spin></sh-icon>
```

**Migration depuis l'ancien système** :
```html
<!-- AVANT (système custom) -->
<sh-icon name="package" size="24"></sh-icon>

<!-- MAINTENANT (Lucide) -->
<sh-icon name="Package" size="md"></sh-icon>
```

**Icônes principales disponibles** :
- Actions: `Plus`, `Edit`, `Trash2`, `Eye`, `Download`, `Upload`
- Navigation: `Home`, `Settings`, `Menu`, `ChevronRight`, `ArrowUpRight`
- Statut: `AlertTriangle`, `CheckCircle`, `XCircle`, `Info`
- Business: `Package`, `TrendingUp`, `BarChart`, `Calendar`, `MapPin`
- UI: `Search`, `Filter`, `MoreVertical`, `Bell`, `User`, `Sun`, `Moon`

[Voir toutes les icônes Lucide](https://lucide.dev/icons/)

#### `<sh-badge>` 🆕 NOUVEAU
Badge coloré pour statuts et labels.

**Props** :
- `variant`: `"success"` | `"warning"` | `"danger"` | `"info"` | `"default"`
- `size`: `"sm"` | `"md"` | `"lg"`
- `pill`: boolean - Forme arrondie

```html
<sh-badge variant="success" size="md">Active</sh-badge>
<sh-badge variant="danger" size="sm" pill>Urgent</sh-badge>
```

#### `<sh-input>`
Champ de saisie avec validation et états.
```html
<sh-input
  type="text"
  placeholder="Enter text"
  error="Invalid input"
></sh-input>
```

#### `<sh-text>`
Composant texte typographique.
```html
<sh-text type="title" tag="h1" content="Title"></sh-text>
```

#### `<sh-logo>`
Logo StockHub avec variants.
```html
<sh-logo style="--logo-size: 150px;"></sh-logo>
```

### Molecules (Combinaisons)

#### `<sh-button>` ⚡ AMÉLIORÉ
Bouton avec variants, états, et support d'icônes.

**Props** :
- `variant`: `"primary"` | `"secondary"` | `"ghost"` | `"danger"`
- `size`: `"sm"` | `"md"` | `"lg"`
- `disabled`: boolean
- `loading`: boolean - État de chargement avec spinner
- `iconBefore`: string - Icône Lucide avant le texte
- `iconAfter`: string - Icône Lucide après le texte

```html
<!-- Bouton avec icône -->
<sh-button variant="primary" iconBefore="Plus">Add Item</sh-button>

<!-- Bouton ghost (transparent) -->
<sh-button variant="ghost" iconBefore="Edit">Edit</sh-button>

<!-- Bouton en chargement -->
<sh-button loading variant="primary">Saving...</sh-button>

<!-- Icône seule -->
<sh-button iconBefore="Trash2" variant="danger" aria-label="Delete"></sh-button>
```

#### `<sh-card>` 🆕 NOUVEAU
Conteneur de contenu avec effets glassmorphism.

**Props** :
- `hover`: boolean - Effets au survol
- `clickable`: boolean - Interactivité et événements
- `padding`: `"none"` | `"sm"` | `"md"` | `"lg"`

**Slots** :
- `header` - En-tête de la carte
- `default` - Contenu principal
- `footer` - Pied de page

**Événements** :
- `sh-card-click` - Émis au clic (si `clickable`)

```html
<sh-card hover clickable padding="md">
  <h3 slot="header">Product Title</h3>
  <p>Product description...</p>
  <div slot="footer">
    <sh-button size="sm">View Details</sh-button>
  </div>
</sh-card>
```

#### `<sh-status-badge>` 🆕 NOUVEAU
Badge spécialisé pour statuts de stock avec indicateur animé.

**Props** :
- `status`: `"in-stock"` | `"low-stock"` | `"out-of-stock"` | `"restock-needed"`
- `showIndicator`: boolean - Affiche l'indicateur pulse
- `label`: string - Override du label par défaut

```html
<sh-status-badge status="in-stock"></sh-status-badge>
<sh-status-badge status="low-stock" showIndicator></sh-status-badge>
<sh-status-badge status="out-of-stock" label="Rupture de stock"></sh-status-badge>
```

#### `<sh-quantity-input>`
Input numérique avec boutons +/-.
```html
<sh-quantity-input
  value="5"
  min="0"
  max="100"
></sh-quantity-input>
```

### Organisms (Complexes)

#### `<sh-header>`
Header de l'application.
```html
<sh-header userName="Sandrine" isLoggedIn></sh-header>
```

## 📖 Storybook

### 🌐 Accès en ligne (Chromatic)

Le Storybook est **automatiquement déployé** sur Chromatic à chaque commit :

- **Voir le Storybook en ligne** : Rendez-vous sur le [dashboard Chromatic](https://www.chromatic.com/builds?appId=VOTRE_APP_ID)
- **Preview de PR** : Chaque Pull Request génère automatiquement une URL de preview
- **Visual Testing** : Détection automatique des changements visuels entre versions

Pour plus d'informations, consultez [`.github/CHROMATIC_SETUP.md`](.github/CHROMATIC_SETUP.md)

### Lancer Storybook Localement
```bash
npm run storybook
```
Accès : `http://localhost:6006`

### Build Storybook
```bash
npm run build-storybook
```
Génère un build statique dans `storybook-static/`

## 🛠️ Développement

### Setup Projet
```bash
# Installation dépendances
npm install

# Lancer Storybook en développement
npm run storybook

# Build composants pour production
npm run build:lib

# Générer Design Tokens
npm run tokens:generate

# Watch mode pour tokens
npm run tokens:watch
```

### Structure d'un Composant

Chaque composant suit cette structure :
```
components/atoms/badge/
├── sh-badge.ts              # Composant Lit
├── sh-badge.stories.ts      # Storybook stories
└── README.md                # Documentation (optionnel)
```

### Créer un Nouveau Composant

1. **Créer le fichier TypeScript**
```typescript
// src/components/atoms/badge/sh-badge.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('sh-badge')
export class ShBadge extends LitElement {
  @property() variant: 'success' | 'warning' | 'danger' = 'success';

  static styles = css`
    :host {
      display: inline-block;
    }
  `;

  render() {
    return html`
      <span class="badge ${this.variant}">
        <slot></slot>
      </span>
    `;
  }
}
```

2. **Créer les Stories (IMPORTANT: Utiliser template strings simples)**
```typescript
// src/components/atoms/badge/sh-badge.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components';
// NE PAS IMPORTER html de Lit !
import './sh-badge';

const meta: Meta = {
  title: 'Components/Atoms/Badge',
  component: 'sh-badge',
};

export default meta;
type Story = StoryObj;

// ✅ BON: Template string simple
export const Success: Story = {
  render: () => `<sh-badge variant="success">Success</sh-badge>`,
};

// ❌ MAUVAIS: html tagged template de Lit
// export const Success: Story = {
//   render: () => html`<sh-badge variant="success">Success</sh-badge>`,
// };
```

3. **Exporter dans `index.ts`**
```typescript
export * from './components/atoms/badge/sh-badge';
```

## 🎨 Design Tokens

Les design tokens sont centralisés dans `src/tokens/tokens.json` et générés automatiquement en CSS.

### Utiliser les Tokens

Dans les composants Lit :
```typescript
static styles = css`
  button {
    background: var(--color-primary-600);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    font-size: var(--font-fontSize-base);
  }
`;
```

### Tokens Disponibles

#### Couleurs
- **Primary (Purple)** : `--color-primary-50` à `--color-primary-900`
- **Success (Green)** : `--color-success-50` à `--color-success-900`
- **Warning (Amber)** : `--color-warning-50` à `--color-warning-900`
- **Danger (Red)** : `--color-danger-50` à `--color-danger-900`
- **Neutral (Gray)** : `--color-neutral-50` à `--color-neutral-900`

#### Spacing
- `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`, `--spacing-xl`

#### Typography
- `--font-fontSize-xs`, `--font-fontSize-sm`, `--font-fontSize-base`, etc.
- `--font-fontWeight-normal`, `--font-fontWeight-medium`, `--font-fontWeight-bold`

#### Border Radius
- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`

### Générer les Tokens
```bash
npm run tokens:generate
```

## 🚀 Build & Distribution

### Build pour Production
```bash
# Build bibliothèque NPM
npm run build:lib

# Build Storybook statique
npm run build-storybook

# Build tout
npm run build:all
```

### Publication NPM
```bash
# Préparer release
npm version patch|minor|major

# Publier (actuellement restricted)
npm publish
```

## 🧪 Tests

**Note** : Tests à implémenter selon stratégie (coverage objectif : ≥ 93%)

```bash
npm run test
```

## 🌙 Thèmes

Le Design System supporte les thèmes dark/light via CSS custom properties avec synchronisation globale dans Storybook.

### Système de Thème Global (Storybook)

Le thème est géré de manière centralisée via un **decorator global** dans `.storybook/preview.ts` :

**Fonctionnalités** :
- 🎨 **Toggle global** : Bouton dans la toolbar Storybook (icône pinceau)
- 🔄 **Synchronisation automatique** : Le thème s'applique à tous les composants via `data-theme`
- 🎭 **Backgrounds adaptatifs** : Dégradés dynamiques selon le thème sélectionné
- ✨ **CSS Variables** : Injection automatique des variables de couleur selon le thème

**Configuration** (`.storybook/preview.ts`) :
```typescript
globalTypes: {
  theme: {
    defaultValue: "dark",
    toolbar: {
      title: "Theme",
      icon: "paintbrush",
      items: [
        { value: "light", icon: "sun", title: "Light" },
        { value: "dark", icon: "moon", title: "Dark" },
      ],
    },
  },
}
```

**Le decorator applique automatiquement** :
1. Synchronise `context.args.theme` avec le toggle global
2. Applique `data-theme` à tous les composants `sh-*`
3. Injecte les CSS variables globales selon le thème
4. Applique un background dégradé adaptatif

### Utilisation dans les Stories

Toutes les stories utilisent maintenant `args.theme` pour tester les deux thèmes :

```typescript
export const MyStory: Story = {
  args: {
    theme: 'dark',  // Valeur par défaut
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark'
      ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)'
      : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'};
      padding: 2rem;">
      <sh-button variant="primary" data-theme="${args.theme}">
        Button
      </sh-button>
    </div>
  `,
};
```

### Utilisation dans les Composants

Les composants supportent le thème via l'attribut `data-theme` :

```typescript
// Dans un composant Lit
@property({ type: String, reflect: true, attribute: 'data-theme' })
theme: 'light' | 'dark' = 'dark';

static styles = css`
  :host {
    --text-color: #1e293b;  /* Light */
  }

  :host([data-theme="dark"]) {
    --text-color: #f1f5f9;  /* Dark */
  }

  p {
    color: var(--text-color);
  }
`;
```

### Configuration Dark Mode par Défaut
```bash
npm run setup:dark
```

### Utilisation Manuelle
```html
<html data-theme="dark">
  <sh-button data-theme="dark">Dark Button</sh-button>
  <sh-text data-theme="dark" content="Dark text"></sh-text>
</html>
```

### Composants avec Support Thème Complet

- ✅ `sh-text` - Couleurs adaptatives selon le thème
- ✅ `sh-icon` - Couleurs héritées du parent
- ✅ `sh-button` - Tous les variants supportent les deux thèmes
- ✅ `sh-badge` - Couleurs adaptatives
- ✅ `sh-input` - Bordures et backgrounds adaptatifs
- ✅ `sh-status-badge` - Support complet du thème
- ✅ `sh-quantity-input` - Input et bouton sync adaptés au thème

## 🔗 Liens Utiles

### Documentation
- [Storybook Docs](https://storybook.js.org/docs/web-components)
- [Lit Element](https://lit.dev/)
- [Lucide Icons](https://lucide.dev/icons/)
- [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

### Stratégie & Planning
Consulter la documentation complète dans le repo StockHubV2 :
```
StockHubV2/Front_End/stockHub_V2_front/documentation/planning/
├── STORYBOOK-ARCHITECTURE-STRATEGY.md    # Stratégie complète
├── planning_ameliorations_v2.md          # Planning global
└── SESSION-1-SUMMARY.md                  # Résumé Session 1
```

## 📈 Progression

### ✅ Session 1 (Complétée - 3h30)
- ✅ Storybook configuré
- ✅ Lit Element setup
- ✅ 3 nouveaux composants: `sh-badge`, `sh-status-badge`, `sh-card`
- ✅ `sh-button` amélioré (ghost, loading, icons)
- ✅ **Migration vers Lucide** (compatibilité StockHub V2)
- ✅ Résolution problèmes affichage Storybook
- ✅ Documentation complète

### ✅ Session 2 (Complétée - 2h)
- ✅ **Système de thème global** dans Storybook (toggle light/dark)
- ✅ **sh-text** amélioré avec support thème complet
- ✅ **35+ stories** mises à jour avec support thème
- ✅ **sh-quantity-input** migré vers Lucide (RefreshCw icon)
- ✅ Decorator global pour synchronisation automatique
- ✅ Backgrounds adaptatifs dans toutes les stories
- ✅ Documentation CHANGELOG et README mise à jour

### 🔄 Session 3 (À venir)
- [ ] Build & tests
- [ ] Créer `sh-metric-card`
- [ ] Créer `sh-stock-item-card`
- [ ] Fixer `sh-logo` (couleur adaptative)
- [ ] Mettre à jour `sh-header` selon StockHub V2

### 📋 Sessions 3-4 (À venir)
- [ ] Prototypage CategoryCard
- [ ] Refactoring architecture finale
- [ ] Tests unitaires

## 📝 Contribution

### Guidelines
1. Suivre l'architecture Atomic Design
2. Nommer les composants avec préfixe `sh-`
3. Créer une story pour chaque composant
4. **Utiliser template strings simples** (pas `html` de Lit) dans stories
5. **Icônes**: Utiliser Lucide en PascalCase (ex: `"Package"`, `"TrendingUp"`)
6. Utiliser les design tokens (pas de valeurs en dur)
7. Documenter les props TypeScript
8. Maintenir backward compatibility

### Commits
Suivre le format :
```
feat(atoms): add sh-badge component
fix(molecules): correct sh-button disabled state
docs(readme): update installation instructions
refactor(icons): migrate to lucide icons system
```

## 🎯 Leçons Apprises (Session 1)

1. **Storybook + Web Components**: Template strings simples > `html` tagged templates de Lit
2. **CSS Variables**: Toujours vérifier noms générés vs noms utilisés
3. **Event Handlers**: Ne pas utiliser inline TypeScript dans template strings
4. **Documentation**: Tenir CHECKLIST à jour en temps réel = gain de temps
5. **Debugging**: Examiner composants qui fonctionnent (sh-input) = solution rapide
6. **Compatibilité StockHub V2**: Utiliser Lucide (vanilla) pour aligner avec lucide-react
7. **Nommage des icônes**: Lucide utilise PascalCase (Package, TrendingUp) vs kebab-case

## 📄 License

ISC - Sandrine Cipolla

---

**Version** : 1.2.0
**Dernière mise à jour** : 19 Octobre 2025
**Statut** : En développement actif
**Nouveautés** : Support thème global, sh-text amélioré, sh-quantity-input migré vers Lucide, 35+ stories avec toggle light/dark
