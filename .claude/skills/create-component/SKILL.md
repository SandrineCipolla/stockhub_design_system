---
name: create-component
description: Crée un nouveau Web Component pour le StockHub Design System (atom/molecule/organism, Lit Element), en respectant l'architecture Atomic Design et les conventions du projet. Se déclenche sur des demandes comme "crée un composant sh-...", "ajoute un nouvel atom/molecule/organism", "nouveau composant Design System".
---

# Créer un nouveau composant

Crée un nouveau Web Component en respectant strictement l'architecture
Atomic Design et les conventions du Design System.

## Instructions

1. Demande les informations manquantes si elles ne sont pas fournies :
   - **Nom du composant** (sans préfixe, ex: `price-tag`)
   - **Niveau Atomic Design** : atom / molecule / organism
   - **Props attendues** (nom, type, valeurs possibles)
   - **Événements custom** émis, s'il y en a
   - **Interactif ?** (détermine si un test d'interaction est nécessaire)

2. Crée le fichier composant dans
   `src/components/<niveau>/<nom>/sh-<nom>.ts` :

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('sh-<nom>')
export class Sh<Nom> extends LitElement {
  @property() variant: '...' = '...';

  static styles = css`
    :host {
      display: inline-block;
    }
    /* Utiliser var(--sh-*) exclusivement, jamais de valeurs en dur */
  `;

  render() {
    return html`
      <span class="<nom> ${this.variant}">
        <slot></slot>
      </span>
    `;
  }
}
```

3. Crée la story dans
   `src/components/<niveau>/<nom>/sh-<nom>.stories.ts` :

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
// NE PAS IMPORTER html de Lit !
import './sh-<nom>';

const meta: Meta = {
  title: 'Components/<Niveau>/<Nom>',
  component: 'sh-<nom>',
};

export default meta;
type Story = StoryObj;

// Template string simple, jamais html`` de Lit
export const Default: Story = {
  render: () => `<sh-<nom> variant="...">Contenu</sh-<nom>>`,
};
```

4. Si le composant est **interactif** (clic, saisie, événements custom),
   ajoute une story `InteractionTest*` avec `@storybook/test` — voir
   `INTERACTION_TESTS_TRACKING.md` pour les patterns Shadow DOM déjà
   rencontrés (simple vs imbriqué).

5. Exporte le composant dans `index.ts` :

```typescript
export * from './components/<niveau>/<nom>/sh-<nom>';
```

6. Met à jour la documentation :
   - `README.md` — ajouter le composant à la liste (section Composants
     Disponibles) et au compteur total
   - Storybook — la story sert de documentation, vérifier qu'elle couvre
     les cas d'usage réels (contexte StockHub : inventaire familial, pas
     entrepôt commercial — exemples réalistes)

## Règles ABSOLUES

- ✅ Préfixe **`sh-`** obligatoire sur tous les composants
- ✅ **Toujours** utiliser les design tokens (`var(--sh-color-primary)`,
  `var(--sh-spacing-md)`...) — ❌ jamais de couleur/taille en dur
- ✅ Icônes Lucide en **PascalCase** (`"Package"`, pas `"package"`)
- ✅ TypeScript strict — ❌ aucun import/variable inutilisé (erreur
  `TS6133` interdite, vérifier avec `npx tsc --noEmit`)
- ✅ Stories : template strings simples — ❌ jamais `html` tagged
  template de Lit dans les stories
- ✅ Accessibilité WCAG AA — contraste texte ≥ 4.5:1, vérifier avec
  `npm run audit-accessibility:quick`
- ✅ État hover/focus : privilégier CSS `:hover`/`:focus` natif plutôt
  qu'un état JS (`@state`)

## Avant de committer

```bash
npm run format
npm run lint
npm run audit:conventions
npm run build
npm run audit-accessibility:quick
```
