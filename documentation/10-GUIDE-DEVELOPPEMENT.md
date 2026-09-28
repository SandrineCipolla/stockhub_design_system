# Guide de développement

Création d'un composant, gestion des thèmes, tests et CI/CD du Design System. Le processus de contribution (branches, commits, PR) est dans [CONTRIBUTING.md](../CONTRIBUTING.md), les design tokens dans [2-DESIGN-TOKENS.md](2-DESIGN-TOKENS.md).

## Structure d'un composant

```
src/components/<atoms|molecules|organisms>/<nom>/
├── sh-<nom>.ts              # Composant Lit
└── sh-<nom>.stories.ts      # Stories Storybook et tests d'interaction
```

## Créer un composant

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

## Règles pour les composants

1. Suivre l'architecture Atomic Design
2. Nommer les composants avec préfixe `sh-`
3. Créer une story pour chaque composant
4. **Utiliser template strings simples** (pas `html` de Lit) dans stories
5. **Icônes**: Utiliser Lucide en PascalCase (ex: `"Package"`, `"TrendingUp"`)
6. Utiliser les design tokens (pas de valeurs en dur)
7. Documenter les props TypeScript
8. Maintenir backward compatibility

## Thèmes

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

## Tests

- **Tests d'interaction** : dans les stories, avec `@storybook/test`. Visibles dans l'onglet Interactions du [Storybook](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/), lancés en local avec `npm run test-storybook` (Storybook démarré) et en CI. Problèmes rencontrés et patterns Shadow DOM : [8-INTERACTION-TESTS-TRACKING.md](8-INTERACTION-TESTS-TRACKING.md).
- **Tests unitaires** : pas encore en place (#15, #16).

## CI/CD

Le projet utilise **un workflow GitHub Actions optimisé** (`.github/workflows/ci.yml`) pour assurer la qualité et le déploiement automatique.

### Jobs du Workflow CI

#### Job 1 : Build (Toujours)
- Build Storybook une seule fois
- Partage l'artifact avec les autres jobs (optimisation)
- Évite les builds redondants

#### Job 2 : Tests d'Interaction (Toujours)
- **Déclenché sur** : Toutes les branches et PR
- Tests Playwright + Storybook automatiques
- Gratuit et illimité

#### Job 3 : Chromatic (Conditionnel)
- **Déclenché sur** : PR et push `master`/`v2` uniquement
- Visual regression testing
- Économise les quotas sur les features

#### Job 4 : Audit Conventions (Toujours)
- Vérifie les conventions de nommage des composants
- S'exécute en parallèle des autres jobs

#### Job 5 : Lighthouse Audit (Master uniquement)
- **Déclenché sur** : Push `master` uniquement
- Audite **tous les composants individuellement**
- Génère un rapport HTML consolidé avec score moyen
- Réutilise le build de l'artifact (optimisation)

#### Job 6 : Deploy GitHub Pages (Master uniquement)
- **Dépend de** : Lighthouse Audit
- Déploie le rapport Lighthouse sur GitHub Pages
- Accessible publiquement : https://SandrineCipolla.github.io/stockhub_design_system/

### Workflow typique

```
feature branch → push → Build + Tests + Audit conventions
       ↓
    Ouvre PR → Build + Tests + Chromatic + Audit conventions
       ↓
  Merge master → Build + Tests + Chromatic + Audit conventions
                   ↓
              Lighthouse Audit (tous les composants)
                   ↓
              Deploy GitHub Pages
```

### Optimisations

- **Build unique** : Storybook n'est build qu'une seule fois, même sur master
- **Audit complet** : Tous les variants de composants sont audités individuellement

