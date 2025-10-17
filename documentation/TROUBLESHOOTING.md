# Troubleshooting - StockHub Design System

Ce document recense tous les problèmes rencontrés lors du développement du Design System et leurs solutions.

---

## 🎨 Icônes Lucide

### Problème : Les icônes ne s'affichent pas dans Storybook

**Symptômes** :
- Cases vides à la place des icônes
- Le nom de l'icône s'affiche mais pas le SVG
- Pas d'erreur JavaScript visible dans la console

**Causes** :

1. **Noms d'icônes en kebab-case au lieu de PascalCase**
   ```html
   <!-- ❌ INCORRECT -->
   <sh-icon name="check"></sh-icon>
   <sh-icon name="alert-triangle"></sh-icon>
   <sh-icon name="shopping-cart"></sh-icon>

   <!-- ✅ CORRECT -->
   <sh-icon name="Check"></sh-icon>
   <sh-icon name="AlertTriangle"></sh-icon>
   <sh-icon name="ShoppingCart"></sh-icon>
   ```

2. **Utilisation de `createElement()` de Lucide**
   - `createElement()` nécessite l'objet `document` du DOM
   - Pas optimal pour Web Components avec Shadow DOM
   - Erreur potentielle : `Failed to resolve module specifier 'lucide'`

**Solution** :

1. **Corriger tous les noms d'icônes en PascalCase** dans les fichiers `.stories.ts` et `.ts`

2. **Construire le SVG manuellement** au lieu d'utiliser `createElement()` :

```typescript
// ❌ AVANT (ne fonctionnait pas)
import { icons, createElement } from 'lucide';

private getIconSVG(): string {
  const iconData = icons[this.name];
  const svg = createElement({
    tag: 'svg',
    attrs: {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    },
    children: iconData
  });
  return svg.outerHTML;
}
```

```typescript
// ✅ APRÈS (fonctionne)
import * as lucideIcons from 'lucide';

private buildSVGFromIconData(iconData: any[]): string {
  // Construire manuellement le SVG à partir des données d'icône
  let pathsHTML = '';

  for (const [tag, attrs] of iconData) {
    const attrsString = Object.entries(attrs)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
    pathsHTML += `<${tag} ${attrsString}/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${pathsHTML}</svg>`;
}

private getIconSVG(): string {
  try {
    const iconsObj = (lucideIcons as any).icons || lucideIcons;
    const iconData = iconsObj[this.name];

    if (!iconData) {
      console.warn(`Icon "${this.name}" not found in lucide icons, using CircleHelp`);
      const fallbackData = iconsObj.CircleHelp;
      if (fallbackData) {
        return this.buildSVGFromIconData(fallbackData);
      }
      return '<svg>...</svg>'; // SVG de fallback
    }

    return this.buildSVGFromIconData(iconData);
  } catch (error) {
    console.error('Error loading icon:', error);
    return '<svg>...</svg>'; // SVG de fallback
  }
}
```

**Fichiers concernés** :
- `src/components/atoms/icon/sh-icon.ts`
- `src/components/atoms/badge/sh-badge.stories.ts`
- `src/components/molecules/card/sh-card.stories.ts`
- `src/components/molecules/button/sh-button.stories.ts`

**Avantages de cette approche** :
- ✅ Pas de manipulation DOM (juste génération de string)
- ✅ Performance optimale
- ✅ Compatible avec tous les bundlers (Vite, Webpack, etc.)
- ✅ Fonctionne dans Shadow DOM

**Mapping des noms courants** :
| Kebab-case (❌) | PascalCase (✅) |
|----------------|----------------|
| `check` | `Check` |
| `alert-triangle` | `AlertTriangle` |
| `x` | `X` |
| `info` | `Info` |
| `bell` | `Bell` |
| `folder` | `Folder` |
| `shopping-cart` | `ShoppingCart` |
| `users` | `Users` |
| `trending-up` | `TrendingUp` |
| `package` | `Package` |
| `edit` | `Edit` |
| `trash-2` | `Trash2` |

**Référence** : [Documentation Lucide](https://lucide.dev/guide/packages/lucide)

---

## 📦 Storybook

### Problème : Les composants ne s'affichent pas dans Storybook

**Symptômes** :
- Storybook charge mais les stories sont vides
- Seuls certains composants s'affichent (ex: sh-input)
- Pas d'erreur visible

**Causes** :

1. **Utilisation de `html` tagged template de Lit dans les stories**
   ```typescript
   // ❌ INCORRECT
   import { html } from 'lit';
   export const Default: Story = {
     render: () => html`<sh-badge>Badge</sh-badge>`
   };
   ```

2. **Variables CSS manquantes dans `.storybook/preview.ts`**

3. **Event handlers inline TypeScript dans template strings**
   ```typescript
   // ❌ INCORRECT
   render: () => `
     <sh-card @sh-card-click="${(e: CustomEvent) => console.log(e)}">
       Card
     </sh-card>
   `
   ```

**Solution** :

1. **Utiliser des template strings simples** (pas `html` de Lit) :
   ```typescript
   // ✅ CORRECT
   export const Default: Story = {
     render: () => `<sh-badge>Badge</sh-badge>`
   };
   ```

2. **Ajouter toutes les variables CSS** dans `.storybook/preview.ts` :
   ```typescript
   const decorator = (story, context) => {
     const theme = context.globals.theme || 'light';
     return `
       <div data-theme="${theme}" style="
         --color-primary-600: #8b5cf6;
         --color-success-600: #22c55e;
         /* ... toutes les variables */
       ">
         ${story()}
       </div>
     `;
   };
   ```

3. **Retirer les event handlers inline** :
   ```typescript
   // ✅ CORRECT
   render: () => `
     <sh-card clickable>
       Card
     </sh-card>
   `
   ```

4. **Ajouter fonction `render()` explicite** pour les composants :
   ```typescript
   // ✅ CORRECT
   export const Default: Story = {
     args: { variant: 'primary' },
     render: (args) => `
       <sh-button variant="${args.variant}">
         Button
       </sh-button>
     `
   };
   ```

**Fichiers concernés** :
- Tous les fichiers `*.stories.ts`
- `.storybook/preview.ts`

---

## 🎨 Dark Mode

### Problème : Le dark mode ne fonctionne pas

**Solution** :

1. **Vérifier que le decorator est configuré** dans `.storybook/preview.ts`
2. **Utiliser `data-theme="dark"`** sur les composants :
   ```typescript
   <sh-badge variant="success" data-theme="dark">Success</sh-badge>
   ```
3. **Vérifier les styles CSS** avec `:host([data-theme="dark"])`

---

## 🔧 Build & Compilation

### Problème : Erreurs TypeScript lors du build

**Vérifications** :
- Les imports sont corrects
- Les types sont bien exportés
- `tsconfig.json` est à jour

---

## 📝 Documentation

Pour signaler un nouveau problème ou proposer une amélioration, créez une issue sur le repository ou ajoutez-le directement dans ce fichier.

**Date de dernière mise à jour** : 17/10/2025
