# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

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
