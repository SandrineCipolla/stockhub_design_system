# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [Unreleased]

### ✨ Ajouté

#### CI/CD et Déploiement Automatique

- **Chromatic CI/CD** : Configuration complète de Chromatic pour le déploiement automatique du Storybook
  - 🌐 **Storybook en ligne** : https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/
  - 🔄 **GitHub Actions** : Workflow automatique sur tous les push et PR
  - 📸 **Visual Testing** : Snapshots visuels capturés pour détecter les régressions visuelles
  - 🎯 **Preview de PR** : Chaque PR génère automatiquement une URL de preview
  - 📊 **Dashboard** : https://www.chromatic.com/builds?appId=68f5fbe10f495706cb168751

- **Documentation CI/CD** :
  - `.github/workflows/chromatic.yml` : Workflow GitHub Actions
  - `.github/CHROMATIC_SETUP.md` : Guide complet de configuration
  - README mis à jour avec les liens d'accès

### 📦 Dépendances

- ➕ **chromatic** (^13.3.0) : Visual testing et déploiement Storybook

---

## [1.2.1] - 2025-10-20

### 🐛 Corrigé

#### Configuration Build
- **package.json** : Ajout de `"type": "module"` pour permettre l'utilisation de la syntaxe ESM dans rollup.config.js
  - Problème : `npm run build:lib` échouait avec "Cannot use import statement outside a module"
  - Solution : Configuration du package comme module ES pour compatibilité avec Rollup
  - Impact : Le build de la bibliothèque NPM fonctionne maintenant correctement
  - Formats générés : CommonJS (`dist/index.js`), ES Modules (`dist/index.esm.js`), TypeScript types (`dist/index.d.ts`)

#### Corrections Issues GitHub Copilot (PR #2)

**Composants - Bugs & Améliorations** :
- **sh-card** : Supprimé caractères parasites `q page` dans le template (ligne 133)
- **sh-status-badge** : Supprimé bloc CSS invalide `role: status;` (les rôles ARIA ne peuvent pas être définis en CSS)
- **sh-header** :
  - Mise à jour automatique de `this.theme` après le toggle pour synchroniser l'icône et les labels ARIA
  - Ajout de `reflect: true` et `attribute: 'data-theme'` pour la propriété `theme`
  - Suppression de l'import inutilisé `sh-badge`
- **sh-logo** :
  - Remplacement de `<h1>` par `<span>` pour éviter les conflits de structure sémantique
  - Ajout de `reflect: true` sur la propriété `size` pour synchronisation CSS
- **sh-icon** : Typage strict de la propriété `name` avec `IconName` (validation compile-time)

**Stories - Syntaxe Template Strings** :
- **sh-header.stories.ts** : Remplacement de `?isLoggedIn="${...}"` (syntaxe Lit) par `${args.isLoggedIn ? 'isLoggedIn' : ''}` (8 occurrences)
- **sh-quantity-input.stories.ts** : Remplacement de `?dirty` et `?hideArrows` par syntaxe conditionnelle (2 occurrences)
- **sh-button.stories.ts** : Correction de `?disabled`, `?loading`, et attributs icônes avec `|| undefined` (4 attributs)

**Configuration & Optimisation** :
- **src/index.ts** : Export explicite de `design-tokens.js` au lieu de `design-tokens` (résolution ambiguïté .ts/.css)
- **.storybook/preview.ts** : Réutilisation du même élément `<style>` via ID pour éviter l'accumulation (memory leak fix)
- **tsconfig.json** : Exclusion explicite des fichiers `.md` pour éviter les erreurs TypeScript sur les blocs de code
- **fix-stories.py** : Suppression du script temporaire contenant des chemins absolus Windows

**Améliorations UX Storybook** :
- **sh-header.stories.ts** : Ajout de listeners pour simuler le comportement logout/login dans les stories (Default & LoggedOut)
- **sh-quantity-input.stories.ts** : Amélioration de la documentation du "dirty state" avec explications claires
- **sh-button.stories.ts** : Correction du débordement dans GhostShowcase (`max-width: 100%` au lieu de `width: 100%`)

### 🎯 Problèmes Résolus

1. **Bindings booléens Lit invalides** : Les syntaxes `?disabled`, `?loading`, `?isLoggedIn` ne fonctionnent que dans les `html` tagged templates de Lit, pas dans les template strings simples de Storybook
2. **Memory leak Storybook** : Création répétée d'éléments `<style>` à chaque render → solution : réutilisation avec ID
3. **Propriétés non reflétées** : Sans `reflect: true`, les changements programmatiques ne mettent pas à jour les attributs HTML et donc les sélecteurs CSS
4. **Structure sémantique HTML** : Utilisation de `<h1>` dans un composant atom créait des conflits de hiérarchie de headings
5. **Type safety** : Propriété `name` de `sh-icon` acceptait n'importe quelle string au lieu des noms d'icônes valides

### ✅ Tests Effectués
- ✅ `npm run build:lib` - Build bibliothèque NPM réussi
- ✅ `npm run build-storybook` - Build Storybook réussi
- ✅ Génération des fichiers dist (871KB ESM, 872KB CJS)
- ✅ Génération des source maps
- ✅ Génération des types TypeScript
- ✅ Toutes les stories Storybook fonctionnent correctement

---

## [1.2.0] - 2025-10-19

### ✨ Ajouté

#### Support Thème Complet dans Storybook
- **Thème global light/dark** : Toggle dans la toolbar Storybook pour basculer entre les thèmes
- **Decorator global** : Synchronisation automatique du thème avec tous les composants via `data-theme`
- **Backgrounds adaptatifs** : Dégradés dynamiques selon le thème dans toutes les stories
  - Dark : `linear-gradient(to bottom right, #0f172a, #1e1b4b)`
  - Light : `linear-gradient(to bottom right, #f8fafc, #f0ebff)`

#### Composants avec Support Thème

- **`sh-text`** (Atoms) :
  - ✨ Ajout de CSS variables pour les couleurs selon le thème
  - ✨ Propriété `theme` avec l'attribut `data-theme` reflété
  - ✨ Couleurs automatiques : Dark (#f1f5f9, #cbd5e1) / Light (#1e293b, #475569)
  - ✨ 5 stories enrichies : Playground, AllHeadingLevels, Paragraphs, CustomColors, ContentExample

- **`sh-icon`** (Atoms) :
  - ✨ Stories mises à jour avec support thème (6 stories)
  - ✨ Backgrounds adaptatifs et couleurs de texte dynamiques

- **`sh-button`** (Molecules) :
  - ✨ Stories mises à jour avec support thème (10 stories)
  - ✨ Tous les variants testables avec les deux thèmes

- **`sh-quantity-input`** (Molecules) :
  - ✨ 6 nouvelles stories complètes avec support thème
  - ✨ Stories : Default, DifferentValues, DirtyState, WithoutArrows, InContext, Playground

- **`sh-badge`**, **`sh-input`**, **`sh-status-badge`** :
  - ✨ Stories mises à jour avec support thème
  - ✨ Sélecteur de thème dans les argTypes

### 🔄 Modifié

#### Storybook Configuration
- **`.storybook/preview.ts`** :
  - Decorator global qui applique automatiquement `data-theme` à tous les composants
  - Synchronisation `context.args.theme` avec `context.globals.theme`
  - Injection des CSS variables globales selon le thème

#### Migration Icônes Lucide
- **`sh-quantity-input`** :
  - 🔄 Remplacement de l'ancien système d'icônes custom par Lucide
  - ✨ Utilisation de `<sh-icon name="RefreshCw">` pour le bouton sync
  - ✨ Amélioration du style du bouton (padding, border-radius, transitions)
  - ✨ Ajout de `aria-label` pour l'accessibilité
  - ❌ Suppression de l'import `{icons} from '../../../icons/icons.ts'`

### 🐛 Corrigé

- ✅ **sh-text** : Composant ne réagissait pas aux changements de thème
  - Problème : Pas de propriété `theme` ni de CSS variables
  - Solution : Ajout de `:host([data-theme="dark"])` et variables CSS

- ✅ **sh-quantity-input** : Icône sync utilisant l'ancien système
  - Problème : Import de `icons.sync` (système deprecated)
  - Solution : Migration vers `<sh-icon name="RefreshCw" size="sm">`

- ✅ **Stories Storybook** : Pas de support du thème global
  - Problème : Chaque story utilisait des valeurs en dur pour les backgrounds
  - Solution : Utilisation de `args.theme` synchronisé avec le toggle global

### 📚 Documentation

#### Améliorations du README
- Documentation du système de thème global
- Exemples d'utilisation du toggle Storybook
- Guide de migration pour les icônes Lucide
- Instructions pour le decorator global

### 🎯 Problèmes Rencontrés & Solutions

#### 1. Composant sh-text sans support du thème
**Problème** :
- Le composant `sh-text` ne réagissait pas à l'attribut `data-theme`
- Pas de propriété TypeScript pour le thème
- CSS colors en dur sans variables

**Solution** :
```typescript
// Ajout de la propriété theme
@property({ type: String, reflect: true, attribute: 'data-theme' })
theme: 'light' | 'dark' = 'dark';

// CSS variables selon le thème
:host {
  --text-color-primary: #1e293b;  // Light
}
:host([data-theme="dark"]) {
  --text-color-primary: #f1f5f9;  // Dark
}
```

#### 2. Icône sh-quantity-input utilisant l'ancien système
**Problème** :
- Import de `{icons}` depuis le système deprecated
- Utilisation de `${icons.sync}` (SVG hardcodé)
- Incompatible avec Lucide

**Solution** :
```typescript
// Avant
import {icons} from '../../../icons/icons.ts'
${icons.sync}

// Après
import '../../atoms/icon/sh-icon.ts'
<sh-icon name="RefreshCw" size="sm" color="inherit"></sh-icon>
```

#### 3. Stories sans support du thème global
**Problème** :
- Chaque story définissait `theme` individuellement
- Pas de synchronisation avec le toggle global
- Backgrounds en dur dans les templates

**Solution** :
- Le decorator dans `.storybook/preview.ts` synchronise automatiquement
- Ajout de `args.theme` dans toutes les stories
- Backgrounds dynamiques : `${args.theme === 'dark' ? '...' : '...'}`

### 📊 Métriques Session

- **Composants mis à jour** : 6 (sh-text, sh-icon, sh-button, sh-quantity-input, sh-badge, sh-input, sh-status-badge)
- **Stories créées/mises à jour** : 35+
- **Fichiers modifiés** : 10
- **Problèmes résolus** : 3 majeurs
- **Migrations techniques** : 1 (sh-quantity-input → Lucide)

---

## [1.1.0] - 2025-10-16

### ✨ Ajouté

#### Nouveaux Composants
- **`sh-badge`** (Atoms) : Badge coloré pour statuts et labels
  - Variants: success, warning, danger, info, default
  - Sizes: sm, md, lg
  - Option `pill` pour forme arrondie
  - Support dark mode

- **`sh-status-badge`** (Molecules) : Badge spécialisé pour statuts de stock
  - Statuts: in-stock, low-stock, out-of-stock, restock-needed
  - Indicateur animé avec effet pulse CSS
  - Labels personnalisables
  - Couleurs automatiques selon le statut

- **`sh-card`** (Molecules) : Conteneur de contenu avec effets glassmorphism
  - Props: hover, clickable, padding (none/sm/md/lg)
  - 3 slots: header, default, footer
  - Custom Event `sh-card-click`
  - Navigation clavier (Enter/Space)
  - Backdrop-blur: blur(10px)
  - Accessibilité complète (ARIA)

#### Améliorations de Composants Existants

- **`sh-button`** (Molecules) :
  - ✨ Nouveau variant **ghost** (background transparent)
  - ✨ État **loading** avec spinner SVG animé
  - ✨ Support **iconBefore** et **iconAfter**
  - ✨ Accessibilité améliorée (aria-busy pour loading)

- **`sh-icon`** (Atoms) :
  - 🔄 **Migration complète vers Lucide** (bibliothèque d'icônes)
  - ✨ 1000+ icônes disponibles (vs 27 hardcodées avant)
  - ✨ Compatibilité totale avec StockHub V2 (lucide-react)
  - ✨ Nommage en PascalCase (Package, TrendingUp, etc.)
  - ✨ Export type `IconName` pour TypeScript
  - ✨ Utilisation `unsafeHTML` pour injection SVG depuis lucide

#### Documentation
- ✨ README.md complètement réécrit avec exemples détaillés
- ✨ SESSION-1-SUMMARY.md créé (résumé de la session de développement)
- ✨ SPRINT-1-CHECKLIST.md mis à jour avec progression
- ✨ CHANGELOG.md créé (ce fichier)

### 🔄 Modifié

#### Système d'Icônes
- **BREAKING**: Noms d'icônes en PascalCase au lieu de kebab-case
  - Avant: `name="package"`, `name="trending-up"`
  - Maintenant: `name="Package"`, `name="TrendingUp"`
- Migration de `stockhub-icones.ts` (système custom) vers `lucide` (package npm)

#### Storybook
- Correction de toutes les stories pour utiliser template strings simples (pas `html` de Lit)
- Ajout de render() explicite pour Logo, Text, Header, QuantityInput
- Correction erreurs de parsing (apostrophes échappées, event handlers inline)
- Injection complète des variables CSS dans `.storybook/preview.ts`

### 🐛 Corrigé

- ✅ **Storybook**: Stories utilisant `html` de Lit ne s'affichaient pas
- ✅ **CSS Variables**: Noms incorrects (`--font-family-base` → `--font-fontFamily-base`)
- ✅ **Parsing**: Erreurs acorn avec event handlers inline TypeScript
- ✅ **Rendering**: Composants sans fonction render() n'affichaient rien
- ✅ **Icon Stories**: AllIcons story utilisant `.map()` incompatible avec template strings

### 📦 Dépendances

- ➕ **lucide** : Ajouté pour le système d'icônes (compatible StockHub V2)

### 🗑️ Déprécié

- ⚠️ `src/icons/stockhub-icones.ts` : Système d'icônes custom remplacé par Lucide
  - Fichier conservé temporairement pour référence
  - À supprimer dans une prochaine version

### 📊 Métriques Session 1

- **Composants créés** : 3 (sh-badge, sh-status-badge, sh-card)
- **Composants améliorés** : 2 (sh-button, sh-icon)
- **Stories créées** : 25+
- **Fichiers modifiés** : ~25
- **Migrations techniques** : 1 (icônes → Lucide)
- **Temps total** : ~3h30

---

## [1.0.0] - 2025-10-14

### ✨ Ajouté

#### Configuration Initiale
- Setup Storybook 8.6.12 pour Web Components
- Configuration Lit Element 3.2.1
- Configuration TypeScript 5.8.3 en mode strict
- Structure Atomic Design (Atoms/Molecules/Organisms)

#### Composants de Base
- **`sh-icon`** : Système d'icônes custom (27 icônes hardcodées)
- **`sh-input`** : Champ de saisie avec validation
- **`sh-logo`** : Logo StockHub
- **`sh-text`** : Composant typographique
- **`sh-button`** : Bouton avec variants (primary, secondary, danger)
- **`sh-quantity-input`** : Input numérique avec +/-
- **`sh-header`** : Header de l'application

#### Design Tokens
- Système de tokens centralisé (`tokens.json`)
- Génération automatique en CSS
- Palette de couleurs complète (primary, success, warning, danger, neutral)
- Support dark mode
- Tokens spacing, typography, border-radius

#### Documentation
- README.md initial
- Architecture et structure documentées
- Guide de contribution

### 📦 Dépendances Principales

- `lit` : 3.2.1
- `@storybook/web-components` : 8.6.12
- `typescript` : 5.8.3
- `vite` : 6.0.7

---

## Légende des Icônes

- ✨ **Ajouté** : Nouvelles fonctionnalités
- 🔄 **Modifié** : Changements dans des fonctionnalités existantes
- 🐛 **Corrigé** : Corrections de bugs
- 🗑️ **Déprécié** : Fonctionnalités bientôt supprimées
- ❌ **Supprimé** : Fonctionnalités supprimées
- 🔒 **Sécurité** : Corrections de vulnérabilités
- ➕ **Dépendances** : Ajout de dépendances
- ➖ **Dépendances** : Retrait de dépendances
- ⚠️ **BREAKING** : Changements non rétrocompatibles

---

**Note** : Les versions suivent le [Semantic Versioning](https://semver.org/lang/fr/) :
- **MAJOR** version pour changements incompatibles (breaking changes)
- **MINOR** version pour ajout de fonctionnalités rétrocompatibles
- **PATCH** version pour corrections de bugs rétrocompatibles
