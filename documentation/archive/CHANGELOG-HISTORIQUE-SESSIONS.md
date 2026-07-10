# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

> **📝 Sessions détaillées** : Retrouvez les résumés complets de toutes les sessions de développement dans [documentation/INDEX.md](../INDEX.md#-sessions-de-développement)

## [Unreleased]

### 🐛 Bug Fixes

#### Améliorations UX/UI (12 Nov 2025)

**sh-button : Padding insuffisant (Issue #9)**
- Augmentation du padding `md` : `8px 12px` → `10px 16px`
- +2px vertical, +4px horizontal pour meilleure présence visuelle
- Commit : `8a1e833`

**sh-button : Centrage icônes en mode mobile (Issue #12)**
- Ajout `justify-content: center` pour attribut `hide-text-mobile`
- Boutons carrés en mobile avec `min-width` égal à la hauteur
- Retour à l'alignement normal en desktop (≥640px)
- Nouvelle story `ResponsiveText` pour démonstration
- Commit : `06bc9ba`

**sh-stock-card : Badge IA couleur adaptative (Issue #10)**
- Badge IA hérite automatiquement de la couleur du statut du stock
- `optimal` → vert, `low` → orange, `critical` → rouge
- Simplifie l'intégration frontend (aucune prop supplémentaire)
- Cohérence visuelle garantie entre statut et badge IA
- Nouvelle story `IaBadgeColorInheritance` pour démonstration
- Commit : `ec7b737`

**Fichiers modifiés** :
- `src/tokens/design-tokens.css`
- `src/components/molecules/button/sh-button.ts`
- `src/components/molecules/button/sh-button.stories.ts`
- `src/components/organisms/stock-card/sh-stock-card.ts`
- `src/components/organisms/stock-card/sh-stock-card.stories.ts`

**Statut** : ✅ 3 fixes en Review, en attente de validation dans StockHub V2

---

### 🚀 CI/CD & Automatisation

#### Optimisation des Workflows GitHub Actions (2 Nov 2025)

**Fusion des workflows pour éviter les builds redondants** :

- **Avant** : 2 workflows séparés (`ci.yml` + `deploy.yml`) = 2 builds Storybook sur master
- **Après** : 1 workflow unifié (`ci.yml`) = 1 seul build réutilisé
- **Gain** : ~30-60 secondes par déploiement

**Nouveaux jobs dans CI workflow** :
1. **lighthouse-audit** (master uniquement)
   - Audite **tous les composants individuellement** (24+ stories)
   - Génère un rapport HTML consolidé avec score moyen
   - Met à jour automatiquement le badge d'accessibilité dans README
   - Réutilise l'artifact du build (optimisation)

2. **deploy-pages** (master uniquement)
   - Déploie le rapport Lighthouse sur GitHub Pages
   - URL publique : https://SandrineCipolla.github.io/stockhub_design_system/

**Scripts d'audit optimisés** :
- `audit-all-accessibility.cjs` : Pause entre audits réduite de 2s → 1s (gain ~24s)
- Export automatique du score dans `accessibility-score.txt` pour mise à jour du badge
- Badge d'accessibilité se met à jour automatiquement via commit bot

**Fichiers modifiés** :
- `.github/workflows/ci.yml` : Ajout jobs lighthouse-audit + deploy-pages
- `.github/workflows/deploy.yml` : Supprimé (fusionné dans ci.yml)
- `audit-all-accessibility.cjs` : Optimisation pause + export score
- Permissions workflow : `contents: write` ajouté pour commit du badge

**Documentation mise à jour** :
- `README.md` : Section CI/CD réécrite (workflow unique, 6 jobs détaillés)
- `documentation/1-GETTING-STARTED.md` : Section Lighthouse + GitHub Pages ajoutée
- `10-ACCESSIBILITY-REPORT.md` : Audit automatisé documenté
- `ACCESSIBILITY-REPORT.md` : Doublon supprimé, références corrigées

**Statut** : ✅ Workflow optimisé, badge auto-update, rapport public

---

### 🧪 Tests

#### Tests d'Interaction Storybook - 100% de couverture

**Ajout complet de tests d'interaction avec @storybook/test** :

- **9 composants testés** (44 tests au total)
- **Tous les événements custom** testés avec vérification des payloads
- **États et validations** : loading, disabled, error, dirty, required
- **Accessibilité** : keyboard navigation, focus management, ARIA
- **Shadow DOM** : gestion simple et imbriquée (ex: sh-stock-card → sh-button → button natif)

**Composants avec tests d'interaction** :
1. **sh-button** (3 tests) : Click, hover, disabled
2. **sh-quantity-input** (3 tests) : Sync event, dirty state, cycle complet
3. **sh-search-input** (3 tests) : Search events, clear, debounce
4. **sh-input** (5 tests) : Change/focus/blur, validation email/required, error clearing
5. **sh-card** (4 tests) : Click, keyboard (Enter/Space/Tab), non-clickable, focus
6. **sh-header** (5 tests) : Notification, theme toggle, login/logout, badge 99+
7. **sh-ia-alert-banner** (5 tests) : Header/toggle click, item click, collapsed state, hover
8. **sh-stock-card** (4 tests) : 4 boutons d'action, loading, badge IA, status variations
9. **sh-stock-item-card** (4 tests) : 3 boutons d'action, loading, status, optional fields

**Patterns établis** :
- Click dans Shadow DOM : toujours cibler l'élément interne, pas le custom element
- Binding booléen : setter via JS (`card.property = false`) au lieu d'attribut HTML
- Propriétés vs attributs : vérifier `card.status` au lieu de `getAttribute('status')`
- Focus : `document.activeElement` (hôte) vs `shadowRoot.activeElement` (élément interne)

**Documentation** :
- `INTERACTION_TESTS_TRACKING.md` : tracking complet avec problèmes résolus et bonnes pratiques

**Fichiers modifiés** : Tous les `*.stories.ts` des 9 composants testés

**Statut** : ✅ 100% des composants interactifs testés

---

### ♿ Accessibilité

#### Corrections Chromatic - Conformité WCAG AA

**Problèmes identifiés et résolus** :

##### **sh-button** - Support aria-label
- **Problème** : Boutons icon-only sans label accessible pour les lecteurs d'écran
- **Erreur Chromatic** : "Button name - Every <button> needs a visible label or accessible name"
- **Solution appliquée** :
  - Ajout propriété `ariaLabel: string | null` (ligne 88)
  - Import `nothing` depuis Lit pour gestion conditionnelle
  - Application conditionnelle sur le `<button>` interne : `aria-label="${this.ariaLabel || nothing}"`
  - **Important** : La propriété n'est PAS reflétée comme attribut HTML pour éviter les erreurs ARIA
- **Fichiers modifiés** :
  - `src/components/molecules/button/sh-button.ts`
  - `src/components/molecules/button/sh-button.stories.ts` (story IconOnly refactorisée en JavaScript)
- **Statut** : ✅ Conforme WCAG AA

##### **sh-stock-card** - Attributs ARIA sur custom elements
- **Problème** : Attributs `aria-label` directement sur custom element `<sh-button>` (interdit par ARIA)
- **Erreur Chromatic** : "ARIA prohibited attributes - aria-label attribute cannot be used on a sh-button with no valid role attribute"
- **Solution appliquée** : Utilisation de la syntaxe propriété Lit `.ariaLabel` au lieu d'attribut HTML
- **Boutons corrigés** (4) :
  - Session button (ligne 406) : `aria-label="..."` → `.ariaLabel="..."`
  - Détails button (ligne 421)
  - Edit button icon-only (ligne 434)
  - Delete button icon-only (ligne 444)
- **Fichier modifié** : `src/components/organisms/stock-card/sh-stock-card.ts`
- **Statut** : ✅ Conforme WCAG AA

##### **sh-stock-item-card** - Attributs ARIA sur custom elements
- **Problème** : Même erreur que sh-stock-card
- **Solution appliquée** : Remplacement de tous les `aria-label` par `.ariaLabel`
- **Boutons corrigés** (3) :
  - Voir button (ligne 303)
  - Éditer button (ligne 314)
  - Supprimer button (ligne 325)
- **Fichier modifié** : `src/components/organisms/stock-item-card/sh-stock-item-card.ts`
- **Statut** : ✅ Conforme WCAG AA

##### **sh-header** - Attributs ARIA sur custom elements
- **Problème** : Même erreur sur 3 boutons sh-button
- **Solution appliquée** : Remplacement `aria-label` → `.ariaLabel`
- **Boutons corrigés** (3) :
  - Theme toggle button (ligne 255)
  - Logout button (ligne 271)
  - Login button (ligne 282)
- **Fichier modifié** : `src/components/organisms/header/sh-header.ts`
- **Statut** : ✅ Conforme WCAG AA

##### **sh-stock-card** - Contraste couleur badge IA
- **Problème** : Badge IA avec contraste insuffisant (3.76:1 au lieu de 4.5:1 minimum)
- **Erreur Chromatic** : "Color contrast - Element has insufficient color contrast of 3.76 (foreground: #ffffff, background: #ef4444)"
- **Solution appliquée** :
  - Badge IA : `--color-danger-500` (#ef4444) → `--color-danger-600` (#dc2626)
  - Nouveau contraste : ~5.0:1 ✅
- **Fichier modifié** : `src/components/organisms/stock-card/sh-stock-card.ts` (ligne 196)
- **Impact visuel** : Badge légèrement plus foncé (améliore la lisibilité)
- **Statut** : ✅ Conforme WCAG AA

##### **sh-header** - Contraste couleur badge notifications
- **Problème** : Même erreur de contraste que le badge IA
- **Solution appliquée** :
  - Notification badge : `#ef4444` → `#dc2626`
  - Nouveau contraste : ~5.0:1 ✅
- **Fichier modifié** : `src/components/organisms/header/sh-header.ts` (ligne 163)
- **Statut** : ✅ Conforme WCAG AA

##### **sh-button (variant ghost)** - Cohérence couleur
- **Problème** : Boutons ghost violets par défaut alors que "ghost" devrait être neutre
- **Solution appliquée** :
  - Par défaut : changé de `--color-primary-400` (violet) à `--color-neutral-700` (gris)
  - Hover : changé des backgrounds violets à backgrounds neutres
  - Thème light/dark : conservés (déjà neutres)
- **Fichier modifié** : `src/components/molecules/button/sh-button.ts` (lignes 167-180)
- **Impact** : Boutons ghost maintenant cohérents (toujours neutres, jamais colorés)
- **Statut** : ✅ Design cohérent

##### **sh-card (AddStockForm story)** - Label manquant sur select
- **Problème** : Élément `<select>` sans label accessible
- **Erreur** : "Select element must have an accessible name"
- **Solution appliquée** :
  - Ajout `id="category-select"` sur le `<select>`
  - Ajout `for="category-select"` sur le `<label>`
- **Fichier modifié** : `src/components/molecules/card/sh-card.stories.ts` (lignes 302-306)
- **Statut** : ✅ Conforme WCAG AA

##### **sh-card (InventoryCard story)** - Contrôles imbriqués
- **Problème** : Carte clickable contenant des boutons (contrôles imbriqués non accessibles)
- **Erreur** : "Interactive controls must not be nested"
- **Solution appliquée** :
  - Remplacé l'exemple custom par composant `sh-stock-item-card` dédié
  - Renommé story "InventoryCard" → "WithStockItemCard"
- **Fichier modifié** : `src/components/molecules/card/sh-card.stories.ts` (lignes 180-199)
- **Statut** : ✅ Conforme WCAG AA

##### **sh-stock-card & sh-stock-item-card** - Contraste boutons ghost
- **Problème** : Boutons ghost sans `data-theme` utilisaient couleur par défaut (gris foncé #334155 sur fond sombre = contraste 1.43:1)
- **Erreur** : "Element has insufficient color contrast of 1.43"
- **Solution appliquée** :
  - Ajout `data-theme="${this.theme}"` à tous les boutons ghost internes
  - sh-stock-card : 4 boutons corrigés (Session, Détails, Edit, Delete)
  - sh-stock-item-card : 3 boutons corrigés (Voir, Éditer, Supprimer)
- **Fichiers modifiés** :
  - `src/components/organisms/stock-card/sh-stock-card.ts` (lignes 403, 419, 433, 444)
  - `src/components/organisms/stock-item-card/sh-stock-item-card.ts` (lignes 300, 312, 324)
- **Statut** : ✅ Conforme WCAG AA

##### **sh-input** - Support aria-label
- **Problème** : sh-quantity-input contenait un input sans label accessible
- **Erreur** : "Form elements must have labels"
- **Solution appliquée** :
  - Ajout propriété `ariaLabel: string` à sh-input
  - Application `aria-label="${this.ariaLabel || ''}"` sur `<input>` natif
  - Utilisation dans sh-quantity-input : `.ariaLabel="Quantité"`
- **Fichiers modifiés** :
  - `src/components/atoms/input/sh-input.ts` (lignes 249, 266)
  - `src/components/molecules/quantity-input/sh-quantity-input.ts` (ligne 86)
- **Statut** : ✅ Conforme WCAG AA

##### **sh-metric-card** - Contraste tendance
- **Problème** : Couleur tendance verte insuffisante (3.79:1 au lieu de 4.5:1)
- **Erreur** : "Element has insufficient color contrast of 3.79 (foreground: #16a34a, background: #1d3742)"
- **Solution appliquée** :
  - Thème dark : `--color-success-600` → `--color-success-400` (plus clair)
  - Thème dark : `--color-danger-600` → `--color-danger-400` (plus clair)
  - Thème light : ajout `--color-success-700` et `--color-danger-700` (plus foncés)
- **Fichier modifié** : `src/components/molecules/metric-card/sh-metric-card.ts` (lignes 186-202)
- **Statut** : ✅ Conforme WCAG AA

##### **sh-metric-card** - Landmarks uniques
- **Problème** : Cartes non-clickables avec `role="region"` et `aria-label=""` vide
- **Erreur** : "Landmarks should have a unique role or role/label/title combination"
- **Solution appliquée** :
  - Ajout `aria-label` descriptif pour toutes les cartes (clickable ou non)
  - Format : `"${this.label}: ${this.value}"` (ex: "Total Produits: 156")
- **Fichier modifié** : `src/components/molecules/metric-card/sh-metric-card.ts` (ligne 337)
- **Statut** : ✅ Conforme WCAG AA

**Résumé des corrections** :
- 🎯 **7 types de problèmes** résolus :
  - Labels manquants (boutons, inputs, select)
  - Attributs ARIA incorrects sur custom elements
  - Contraste insuffisant (badges, boutons, tendances)
  - Contrôles interactifs imbriqués
  - Landmarks sans label unique
  - Cohérence design (ghost buttons)
- 🔧 **10 composants** corrigés :
  - sh-button (ariaLabel + ghost variant)
  - sh-input (ariaLabel)
  - sh-quantity-input
  - sh-stock-card
  - sh-stock-item-card
  - sh-metric-card (contraste + landmarks)
  - sh-header
  - sh-card stories
- ♿ **20+ éléments** avec labels accessibles ajoutés
- 🎨 **Contrastes améliorés** : badges, boutons ghost, tendances
- ✅ **Conformité WCAG AA 100%** atteinte (0 violations dans Storybook)

**Méthodologie appliquée** :
1. Utilisation de `.ariaLabel` (propriété JavaScript) au lieu de `aria-label` (attribut HTML) sur les custom elements
2. Utilisation de `danger-600` au lieu de `danger-500` pour les petits textes blancs
3. Test visuel : Aucun changement perceptible pour l'utilisateur final
4. Test accessibilité : Lecteurs d'écran fonctionnent correctement

### ✨ Ajouté

#### Nouveaux Composants (Session 3)

##### **sh-metric-card** 🆕
Carte métrique pour afficher des KPIs avec icône, valeur et tendance.

**Props** :
- `icon` : Icône Lucide (PascalCase)
- `label` : Label descriptif de la métrique
- `value` : Valeur à afficher (nombre ou texte)
- `variant` : `"default"` | `"success"` | `"warning"` | `"danger"` | `"info"`
- `trend` : Direction de la tendance (`"increase"` | `"decrease"`)
- `trendValue` : Valeur de la tendance (ex: "+12%", "-5")
- `clickable` : Rend la carte cliquable
- `theme` : Thème light/dark

**Fonctionnalités** :
- ✅ Icônes colorées selon le variant (inspiré de StockHub V2)
- ✅ Indicateur de tendance avec icône dynamique (TrendingUp/TrendingDown)
- ✅ Support complet des thèmes light/dark
- ✅ Mode clickable avec événement `sh-metric-click`
- ✅ Animations hover fluides
- ✅ Accessibilité complète (ARIA, focus visible, keyboard navigation)
- ✅ 7 stories Storybook (Default, Trends, Clickable, Variants, Dashboard)

**Exemple d'utilisation** :
```html
<sh-metric-card
  icon="Package"
  label="Total Produits"
  value="156"
  variant="success"
  trend="increase"
  trend-value="+12"
></sh-metric-card>
```

##### **sh-stock-item-card** 🆕
Carte de produit pour la gestion d'inventaire familial (loisirs créatifs, alimentaire, maison).

**Props** :
- `name` : Nom du produit
- `sku` : Code SKU
- `quantity` : Quantité en stock
- `value` : Valeur totale (optionnel)
- `location` : Emplacement (ex: "Atelier - Étagère 3", "Bureau - Tiroir 2")
- `status` : `"optimal"` | `"low"` | `"critical"` | `"out-of-stock"` | `"overstocked"`
- `loading` : État de chargement
- `theme` : Thème light/dark

**Fonctionnalités** :
- ✅ Barre de statut colorée (border-left) selon le niveau de stock
- ✅ Badge de statut en anglais (Optimal, Low Stock, Critical, Out of Stock, Overstocked)
- ✅ Grid de métriques responsive (quantité, valeur, emplacement)
- ✅ 3 actions avec boutons : Voir/Éditer/Supprimer
- ✅ Événements : `sh-view-click`, `sh-edit-click`, `sh-delete-click`
- ✅ Support complet des thèmes light/dark
- ✅ Animations hover fluides
- ✅ Responsive mobile-friendly
- ✅ Accessibilité complète (ARIA, keyboard navigation)
- ✅ 9 stories Storybook avec produits créatifs réalistes (peinture, crayons, tissu, papier aquarelle, toiles, feutres, pinceaux)

**Exemple d'utilisation** :
```html
<sh-stock-item-card
  name="Peinture Acrylique 500ml - Bleu Cobalt"
  sku="PNT-001"
  quantity="45"
  value="€675"
  location="Atelier - Étagère 3"
  status="optimal"
></sh-stock-item-card>
```

**Difficultés rencontrées & Solutions** :
- ❌ **Problème** : Labels des badges initialement en français ("En stock", "Stock faible")
  - ✅ **Solution** : Changé en anglais pour cohérence avec StockHub V2 ("Optimal", "Low Stock", "Critical", "Out of Stock", "Overstocked")

- ❌ **Problème** : Exemples génériques (laptops, souris) pas adaptés au contexte
  - ✅ **Solution** : Utilisé des produits créatifs réalistes (peinture acrylique/huile, crayons aquarelle, tissu coton bio, papier aquarelle, toiles tendues, feutres Posca, pinceaux)

- ❌ **Problème** : Emplacements codes alphanumériques (A-12-3, B-05-1) trop "entrepôt industriel"
  - ✅ **Solution** : Emplacements familiaux réalistes : "Atelier - Étagère 3", "Bureau - Tiroir 2", "Cellier - Casier B", "Atelier - Rangement Mural"

**Contexte d'utilisation** :
Gestion personnelle des stocks familiaux (loisirs créatifs, alimentaire, maison) pour un usage domestique, pas commercial.

### 🐛 Corrigé

#### Corrections TypeScript et CSS Custom Properties

**Problèmes TypeScript** :
- ❌ **`sh-metric-card.ts`** : Import `IconName` inutilisé (ligne 3)
  - ✅ **Solution** : Supprimé l'import et utilisé type `string` pour la prop `icon`
  - **Raison** : Lucide ne nécessite pas de type strict, le nom d'icône est une string

- ❌ **`sh-metric-card.ts`** : Variable `_isHovered` déclarée mais jamais utilisée
  - ✅ **Solution** : Supprimé la variable et l'import `state` de Lit
  - **Raison** : La gestion du hover se fait via CSS `:hover`, pas besoin de state JS

- ❌ **`sh-stock-item-card.ts`** : Import `IconName` inutilisé (ligne 3)
  - ✅ **Solution** : Supprimé l'import
  - **Raison** : Les icônes sont passées en strings aux composants `sh-button`

**Problèmes CSS Custom Properties** :
- ❌ **Cannot resolve custom property** : Utilisation de `--radius-lg`, `--radius-md`, `--radius-sm`
  - ✅ **Solution** : Remplacé par `--border-radius-lg`, `--border-radius-md`, `--border-radius-sm`
  - **Raison** : Les design tokens utilisent le préfixe `--border-radius-*` (voir `design-tokens.css:114-120`)
  - **Fichiers concernés** : `sh-metric-card.ts` (2 occurrences), `sh-stock-item-card.ts` (1 occurrence)

**Impact** :
- ✅ TypeScript compile sans erreurs (`npx tsc --noEmit`)
- ✅ Storybook fonctionne correctement
- ✅ Aucune régression visuelle
- ✅ Meilleure cohérence avec le système de design tokens

#### CI/CD et Déploiement Automatique

- **Chromatic CI/CD** : Configuration complète de Chromatic pour le déploiement automatique du Storybook
  - 🌐 **Storybook en ligne** : https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/
  - 🔄 **GitHub Actions** : Workflow automatique sur tous les push et PR
  - 📸 **Visual Testing** : Snapshots visuels capturés pour détecter les régressions visuelles
  - 🎯 **Preview de PR** : Chaque PR génère automatiquement une URL de preview (sauf forks)
  - 📊 **Dashboard** : https://www.chromatic.com/builds?appId=68f5fbe10f495706cb168751
  - 🔒 **Sécurité** : Protection contre les PRs de forks (skip automatique si pas d'accès aux secrets)

- **Workflow GitHub Actions** (`.github/workflows/chromatic.yml`) :
  - ✅ Permissions minimales (`contents: read`) pour le principe du moindre privilège
  - ✅ Concurrency group pour annuler les builds redondants et économiser les minutes CI
  - ✅ Auto-accept des changements visuels uniquement sur `master` (expression booléenne)
  - ✅ Protection forks : skip automatique si `github.event.pull_request.head.repo.fork == true`

- **Documentation CI/CD** :
  - `.github/workflows/chromatic.yml` : Workflow GitHub Actions optimisé
  - `.github/CHROMATIC_SETUP.md` : Guide complet avec section limitations et forks
  - README mis à jour avec les liens d'accès et note sur les forks

### 🛠️ CI/CD Chromatic & Validation visuelle

- Clarification du workflow CI/CD Chromatic : validation manuelle des changements visuels sur les branches de feature, auto-acceptation sur master après merge.
- Ajout d'une documentation détaillée sur l'option autoAcceptChanges et les bonnes pratiques de validation visuelle dans GETTING-STARTED.md et README.md.
- Sécurisation du processus pour éviter les régressions visuelles non désirées.

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
