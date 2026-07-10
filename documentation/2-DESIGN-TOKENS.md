# Design Tokens - StockHub Design System

**Version** : 2.0
**Date** : 29 Octobre 2025
**Auteur** : Sandrine Cipolla

---

## 📋 Table des Matières

1. [Qu'est-ce qu'un Design Token ?](#quest-ce-quun-design-token-)
2. [Pourquoi Utiliser des Design Tokens ?](#pourquoi-utiliser-des-design-tokens-)
3. [Architecture du Système](#architecture-du-système)
4. [Workflow Complet](#workflow-complet)
5. [Utilisation dans les Composants](#utilisation-dans-les-composants)
6. [Modifier les Tokens](#modifier-les-tokens)
7. [Tokens Disponibles](#tokens-disponibles)
8. [Bonnes Pratiques](#bonnes-pratiques)

---

## Qu'est-ce qu'un Design Token ?

Un **Design Token** est une **valeur nommée et réutilisable** qui représente une décision de design (couleur, espacement, typographie, etc.).

### Exemple Concret

```typescript
// ❌ SANS tokens : Valeur codée en dur
static styles = css`
  button {
    background: #8b5cf6;  // Quelle couleur ? Pourquoi celle-ci ?
    padding: 12px;         // D'où vient cette valeur ?
  }
`;

// ✅ AVEC tokens : Valeur sémantique et réutilisable
static styles = css`
  button {
    background: var(--color-primary-500);  // Couleur principale du DS
    padding: var(--spacing-md);            // Espacement moyen standard
  }
`;
```

### Avantages Immédiats

- ✅ **Sémantique** : Le nom explique l'usage (`--color-primary-500` vs `#8b5cf6`)
- ✅ **Réutilisable** : Même valeur partout où c'est nécessaire
- ✅ **Maintenable** : Changer 1 ligne = met à jour tout le Design System
- ✅ **Cohérent** : Impossible d'utiliser une valeur non-standard

---

## Pourquoi Utiliser des Design Tokens ?

### Le Problème Sans Tokens

Imaginons un projet **sans** Design Tokens :

```typescript
// Composant Button
static styles = css`
  button { background: #8b5cf6; padding: 12px; }
`;

// Composant Card
static styles = css`
  .card { background: #8b5cf6; padding: 12px; }
`;

// Composant Badge
static styles = css`
  .badge { background: #7c3aed; padding: 10px; }  // Oups, couleur différente !
`;
```

**Problèmes** :
- ❌ **Duplication** : Valeurs répétées 50+ fois dans le code
- ❌ **Incohérence** : `#8b5cf6` vs `#7c3aed` - Quelle est la bonne couleur ?
- ❌ **Maintenance cauchemar** : Pour changer le violet, il faut éditer 50 fichiers
- ❌ **Pas de thématisation** : Impossible de passer en dark/light mode
- ❌ **Erreurs humaines** : Typo dans une couleur = bug visuel

### La Solution : Design Tokens Centralisés

```typescript
// tokens.json - SOURCE UNIQUE DE VÉRITÉ
{
  "color": {
    "primary": {
      "500": { "value": "#8b5cf6", "type": "color" }
    }
  },
  "spacing": {
    "md": { "value": "12px", "type": "dimension" }
  }
}
```

**Avantages** :
- ✅ **Source unique** : Une seule définition par valeur
- ✅ **Cohérence garantie** : Tout le monde utilise le même violet
- ✅ **Maintenance facile** : Changer 1 ligne dans tokens.json = mis à jour partout
- ✅ **Thématisation native** : Support dark/light intégré
- ✅ **Évolutivité** : Ajouter un thème "high contrast" = ajouter des tokens
- ✅ **Documentation automatique** : Les noms documentent l'usage

---

## Architecture du Système

### 📁 Structure des Fichiers

```
src/tokens/
├── tokens.json          ← SOURCE UNIQUE (tu modifies ici)
├── generate-css.ts      ← Script de génération
├── design-tokens.css    ← Fichier CSS généré (ne pas éditer)
├── design-tokens.ts     ← Types TypeScript
└── index.ts             ← Helpers et utilitaires
```

### Rôle de Chaque Fichier

| Fichier | Type | Rôle | Éditable ? |
|---------|------|------|------------|
| **tokens.json** | Source (JSON) | Définit TOUS les tokens | ✅ **OUI** |
| **design-tokens.css** | Sortie (CSS) | CSS variables générées | ❌ Généré auto |
| **design-tokens.ts** | Code (TS) | Types pour TypeScript | ✅ Oui (rarement) |
| **generate-css.ts** | Script (TS) | Générateur CSS | ✅ Oui (config) |
| **index.ts** | Utilitaires (TS) | Helpers d'accès | ✅ Oui (helpers) |

---

## Workflow Complet

### 🔄 Du JSON au CSS

```
┌─────────────────────────────────────────────┐
│ 1. Éditer tokens.json                       │
│    {                                        │
│      "color": {                             │
│        "primary": {                         │
│          "500": { "value": "#8b5cf6" }      │
│        }                                    │
│      }                                      │
│    }                                        │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│ 2. Exécuter                                 │
│    npm run tokens:generate                  │
│    (lance generate-css.ts)                  │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│ 3. Fichier design-tokens.css généré        │
│    :root {                                  │
│      --color-primary-500: #8b5cf6;          │
│    }                                        │
│    [data-theme="light"] {                   │
│      --color-surface-primary: #ffffff;      │
│    }                                        │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│ 4. Importé dans .storybook/preview.ts       │
│    import "../src/tokens/design-tokens.css" │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│ 5. Variables CSS disponibles globalement    │
│    dans tous les composants !               │
│                                             │
│    var(--color-primary-500) ✅              │
│    var(--spacing-md) ✅                     │
└─────────────────────────────────────────────┘
```

### 📜 Scripts NPM Disponibles

```bash
# Générer design-tokens.css depuis tokens.json
npm run tokens:generate

# Régénérer automatiquement au changement de tokens.json
npm run tokens:watch

# Configurer dark mode par défaut
npm run setup:dark

# Générer tokens + build Storybook
npm run build:all
```

---

## Utilisation dans les Composants

### Dans un Composant Lit Element

```typescript
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('sh-button')
export class ShButton extends LitElement {
  static styles = css`
    button {
      /* Couleurs */
      background: var(--color-primary-500);
      color: var(--color-neutral-50);

      /* Espacement */
      padding: var(--spacing-sm) var(--spacing-md);

      /* Typographie */
      font-size: var(--font-fontSize-base);
      font-weight: var(--font-fontWeight-medium);

      /* Bordures */
      border-radius: var(--border-radius-md);
      border: 1px solid var(--color-primary-600);

      /* Ombres */
      box-shadow: var(--shadow-sm);
    }

    button:hover {
      background: var(--color-primary-600);
    }

    /* Support du thème dark/light */
    :host([data-theme="light"]) button {
      background: var(--color-primary-400);
    }
  `;

  render() {
    return html`<button><slot></slot></button>`;
  }
}
```

### Accès Programmatique (JavaScript/TypeScript)

Bien que l'utilisation en CSS soit **préférée**, tu peux accéder aux tokens en JS si nécessaire :

```typescript
import { getToken, stockhubTokens } from './tokens';

// Méthode 1 : Via l'objet typé
const primaryColor = stockhubTokens.color.primary[500];
// → "#8b5cf6"

// Méthode 2 : Via la fonction helper
const primaryColor = getToken('color.primary.500');
// → "#8b5cf6"

// Utilisation dans du code dynamique
const generateGradient = (color: string) => {
  return `linear-gradient(to right, ${color}, ${stockhubTokens.color.primary[600]})`;
};
```

---

## Modifier les Tokens

### Étape 1 : Éditer tokens.json

**Fichier** : `src/tokens/tokens.json`

```json
{
  "color": {
    "primary": {
      "500": {
        "value": "#NEW_COLOR",
        "type": "color",
        "description": "Couleur principale StockHub"
      }
    }
  }
}
```

### Étape 2 : Régénérer le CSS

```bash
npm run tokens:generate
```

### Étape 3 : Vérifier le Résultat

```bash
# Lancer Storybook pour voir les changements
npm run storybook
```

**Résultat** : TOUS les composants utilisant `var(--color-primary-500)` sont automatiquement mis à jour ! 🎉

### Ajouter un Nouveau Token

```json
{
  "spacing": {
    "xxl": {
      "value": "48px",
      "type": "dimension",
      "description": "Espacement extra large"
    }
  }
}
```

Après `npm run tokens:generate`, la variable `--spacing-xxl` est disponible partout.

---

## Tokens Disponibles

### 🎨 Couleurs

#### Palettes de Base (9 nuances chacune : 50 → 900)

```css
/* Primary (Violet) */
--color-primary-50: #f8f7ff;
--color-primary-500: #8b5cf6;  /* Couleur principale */
--color-primary-900: #4c1d95;

/* Success (Vert) */
--color-success-50: #f0fdf4;
--color-success-500: #22c55e;
--color-success-900: #14532d;

/* Warning (Ambre) */
--color-warning-50: #fffbeb;
--color-warning-500: #f59e0b;
--color-warning-900: #78350f;

/* Danger (Rouge) */
--color-danger-50: #fef2f2;
--color-danger-500: #ef4444;
--color-danger-900: #7f1d1d;

/* Neutral (Gris) */
--color-neutral-50: #f9fafb;
--color-neutral-500: #6b7280;
--color-neutral-900: #111827;

/* Info (Bleu) */
--color-info-50: #eff6ff;
--color-info-500: #3b82f6;
--color-info-900: #1e3a8a;
```

#### Couleurs Sémantiques (Thématisables)

```css
/* Surfaces (adaptatives selon thème) */
--color-surface-primary
--color-surface-secondary
--color-surface-tertiary
--color-surface-accent

/* Textes */
--color-text-primary
--color-text-secondary
--color-text-muted
--color-text-on-primary

/* Bordures */
--color-border-primary
--color-border-secondary
--color-border-subtle
```

### 📏 Spacing (Espacement)

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 24px;
--spacing-2xl: 32px;
--spacing-3xl: 48px;
--spacing-4xl: 64px;
```

### 🔤 Typography

#### Tailles de Police

```css
--font-fontSize-xs: 12px;
--font-fontSize-sm: 14px;
--font-fontSize-base: 16px;
--font-fontSize-lg: 18px;
--font-fontSize-xl: 20px;
--font-fontSize-2xl: 24px;
--font-fontSize-3xl: 30px;
--font-fontSize-4xl: 36px;
```

#### Poids de Police

```css
--font-fontWeight-normal: 400;
--font-fontWeight-medium: 500;
--font-fontWeight-semibold: 600;
--font-fontWeight-bold: 700;
```

#### Autres Propriétés

```css
--font-lineHeight-tight: 1.25;
--font-lineHeight-normal: 1.5;
--font-lineHeight-relaxed: 1.75;

--font-letterSpacing-tight: -0.025em;
--font-letterSpacing-normal: 0;
--font-letterSpacing-wide: 0.025em;
```

### 🔲 Border Radius

```css
--border-radius-none: 0;
--border-radius-sm: 6px;
--border-radius-md: 8px;
--border-radius-lg: 12px;
--border-radius-xl: 16px;
--border-radius-2xl: 24px;
--border-radius-full: 9999px;
```

### 🌓 Ombres

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

---

## Bonnes Pratiques

### ✅ À Faire

1. **Toujours utiliser les tokens** au lieu de valeurs en dur
   ```typescript
   // ✅ BON
   background: var(--color-primary-500);

   // ❌ MAUVAIS
   background: #8b5cf6;
   ```

2. **Utiliser les tokens sémantiques** quand ils existent
   ```typescript
   // ✅ BON (s'adapte au thème)
   background: var(--color-surface-primary);

   // ⚠️ MOINS BON (fixe)
   background: var(--color-neutral-800);
   ```

3. **Nommer les tokens de façon descriptive** (pas par couleur)
   ```json
   // ✅ BON
   "button": { "primary": { "value": "#8b5cf6" } }

   // ❌ MAUVAIS
   "button": { "purple": { "value": "#8b5cf6" } }
   ```

4. **Regénérer le CSS après modification**
   ```bash
   npm run tokens:generate
   ```

5. **Versionner tokens.json** mais **PAS design-tokens.css** (fichier généré)

### ❌ À Éviter

1. **Ne jamais éditer directement design-tokens.css**
   - Ce fichier est **généré automatiquement**
   - Tes modifications seront **écrasées** au prochain `npm run tokens:generate`

2. **Ne pas dupliquer les valeurs**
   ```typescript
   // ❌ MAUVAIS
   padding: 12px;  // Utilise var(--spacing-md) !
   ```

3. **Ne pas créer trop de tokens**
   - Trop de tokens = difficile à maintenir
   - Préférer **réutiliser** les tokens existants

4. **Ne pas utiliser de valeurs magiques**
   ```typescript
   // ❌ MAUVAIS
   padding: 13px;  // Pourquoi 13 ?

   // ✅ BON
   padding: var(--spacing-md);
   ```

---

## Support du Thème Dark/Light

### Comment ça fonctionne

Les tokens sémantiques **changent automatiquement** selon le thème :

```css
/* Dark mode (défaut) */
:root {
  --color-surface-primary: #1e293b;  /* Sombre */
  --color-text-primary: #f8fafc;     /* Clair */
}

/* Light mode */
[data-theme="light"] {
  --color-surface-primary: #ffffff;  /* Clair */
  --color-text-primary: #1e293b;     /* Sombre */
}
```

### Utilisation dans les Composants

```typescript
static styles = css`
  /* Utilise les tokens sémantiques */
  :host {
    background: var(--color-surface-primary);
    color: var(--color-text-primary);
  }

  /* S'adapte automatiquement au thème ! */
`;
```

---

## Ressources Additionnelles

### Fichiers Importants

- **Source des tokens** : `src/tokens/tokens.json`
- **CSS généré** : `src/tokens/design-tokens.css`
- **Script générateur** : `src/tokens/generate-css.ts`
- **Import global** : `.storybook/preview.ts` (ligne 4)

### Scripts NPM

```json
{
  "tokens:generate": "tsx src/tokens/generate-css.ts",
  "tokens:watch": "chokidar 'src/tokens/tokens.json' -c 'npm run tokens:generate'",
  "setup:dark": "npm run tokens:generate && echo 'Dark mode configuré!'"
}
```

### Standards de l'Industrie

Les Design Tokens suivent les spécifications :
- [Design Tokens W3C Community Group](https://www.w3.org/community/design-tokens/)
- [Style Dictionary](https://amzn.github.io/style-dictionary/) (inspiration)
- Convention de nommage : `category-type-scale` (ex: `color-primary-500`)

---

## 📊 Statistiques du Système

- **Tokens totaux** : ~150+ variables CSS
- **Palettes de couleurs** : 6 (primary, success, warning, danger, neutral, info)
- **Nuances par palette** : 9 (50 → 900)
- **Tokens d'espacement** : 8 tailles
- **Tokens typographiques** : 12+ propriétés
- **Support thème** : ✅ Dark (défaut) + Light

---

## ❓ Questions Fréquentes

### Pourquoi ne pas mettre les valeurs directement dans le CSS ?

**Sans tokens** : Changer une couleur = éditer 50 fichiers
**Avec tokens** : Changer une couleur = éditer 1 ligne dans `tokens.json`

### Dois-je régénérer le CSS à chaque modification ?

Oui ! Le fichier `design-tokens.css` est généré depuis `tokens.json`.
Utilise `npm run tokens:watch` pour régénérer automatiquement.

### Puis-je créer mes propres tokens ?

Absolument ! Ajoute-les dans `tokens.json` et lance `npm run tokens:generate`.

### Les tokens fonctionnent-ils en dehors de Storybook ?

Oui, tant que tu importes `design-tokens.css` dans ton application.

---

## 🔗 Voir aussi

- **[DESIGN-TOKENS-AUDIT.md](./3-DESIGN-TOKENS-AUDIT.md)** : Audit complet de l'utilisation des tokens dans les composants (taux d'adoption : 86%)
- **[INDEX.md](./INDEX.md)** : Navigation complète de la documentation

---

**Maintenu par** : Sandrine Cipolla
**Dernière mise à jour** : 29 Octobre 2025
**Projet** : StockHub Design System v2.0
