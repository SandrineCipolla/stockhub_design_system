# Documentation - StockHub Design System

**Version** : 2.0
**Date** : 29 Octobre 2025

Bienvenue dans la documentation du Design System StockHub.

---

## 🚦 Automatisation de l’audit des conventions

La cohérence des conventions de nommage (props, événements, fichiers) est vérifiée automatiquement à chaque push ou pull request grâce à la CI (GitHub Actions).

- Si des erreurs sont détectées, le merge est bloqué jusqu’à correction.
- Pour lancer l’audit localement : `npm run audit:conventions`
- Le script utilisé est `audit-conventions.cjs` à la racine du projet.

---

## 🗂️ Parcours de lecture recommandé

1- [1-GETTING-STARTED.md](./1-GETTING-STARTED.md)  
   *Introduction, objectifs et philosophie du Design System.*

2- [2-DESIGN-TOKENS.md](./2-DESIGN-TOKENS.md)  
   *Système de design tokens et bonnes pratiques.*

3- [3-DESIGN-TOKENS-AUDIT.md](./3-DESIGN-TOKENS-AUDIT.md)  
   *Audit de l’utilisation des tokens.*

4- [4-REACT-INTEGRATION-GUIDE.md](./4-REACT-INTEGRATION-GUIDE.md)  
   *Intégration des Web Components dans React.*

5- [5-COMPONENT-DOCUMENTATION.md](./5-COMPONENT-DOCUMENTATION.md)  
   *Documentation détaillée de chaque composant.*

6- [6-STORYBOOK-ORGANIZATION.md](./6-STORYBOOK-ORGANIZATION.md)  
   *Organisation du menu Storybook.*

7- [7-TROUBLESHOOTING.md](./7-TROUBLESHOOTING.md)  
   *Problèmes connus et solutions.*

8- [8-INTERACTION-TESTS-TRACKING.md](./8-INTERACTION-TESTS-TRACKING.md)  
   *Suivi des tests d’interaction.*

9- [9-ACCESSIBILITY-REPORT.md](./9-ACCESSIBILITY-REPORT.md)  
   *Rapport d’accessibilité.*

**Plans & specs** (`./planning/`) : [MIGRATION-PLAN.md](./planning/MIGRATION-PLAN.md), [COMPONENT-SPECIFICATIONS.md](./planning/COMPONENT-SPECIFICATIONS.md), [SPRINT-1-CHECKLIST.md](./planning/SPRINT-1-CHECKLIST.md), [INTEGRATION-PLAN.md](./planning/INTEGRATION-PLAN.md).
**Décisions d'architecture** (`./adr/`) : un ADR par décision structurante (outillage, choix technique avec alternatives pesées) — voir [0001-migration-eslint-flat-config.md](./adr/0001-migration-eslint-flat-config.md).
**Sessions de développement** (`./sessions/`) : comptes-rendus historiques, voir section dédiée plus bas.
**Archive** (`./archive/`) : documents clos ou superseded — voir [DESIGN-SYSTEM-CORRECTIONS.md](./archive/DESIGN-SYSTEM-CORRECTIONS.md), [OPTIMIZATION-PLAN.md](./archive/OPTIMIZATION-PLAN.md), [CHANGELOG-HISTORIQUE-SESSIONS.md](./archive/CHANGELOG-HISTORIQUE-SESSIONS.md), [STOCK-PREDICTION-CARD-IMPLEMENTATION.md](./archive/STOCK-PREDICTION-CARD-IMPLEMENTATION.md), [STOCKHUB-V2-INTEGRATION.md](./archive/STOCKHUB-V2-INTEGRATION.md).

---

## 📚 Index de la Documentation

### 🎨 Organisation Storybook

#### Structure du Menu
L'organisation du menu Storybook respecte exactement la hiérarchie des dossiers dans `src/` :

```
📖 Introduction
   ├── Button Example
   ├── Header Example
   └── Page Example

🎨 Design Tokens

🎨 Icons

📦 Components
   ├── 🔹 Atoms (5)
   │   ├── Badge
   │   ├── Icon
   │   ├── Input
   │   ├── Logo
   │   └── Text
   ├── 🔸 Molecules (6)
   │   ├── Button
   │   ├── Card
   │   ├── MetricCard ✨
   │   ├── QuantityInput
   │   ├── SearchInput ✨
   │   └── StatusBadge
   └── 🔷 Organisms (5)
       ├── Footer ✨
       ├── Header
       ├── IaAlertBanner ✨
       ├── PageHeader ✨
       ├── StockCard
       └── StockItemCard
```

#### Nomenclature des Titres
- **Atomes** : `Components/Atoms/[NomComposant]`
- **Molécules** : `Components/Molecules/[NomComposant]`
- **Organismes** : `Components/Organisms/[NomComposant]`
- **Exemples** : `Introduction/[NomStory] Example`

---

### 📝 Sessions de Développement

Retrouvez les résumés détaillés de toutes les sessions :

- **[Session 1](./sessions/SESSION-1-SUMMARY.md)** (16/10) - Fondations (3h)
- **[Session 2](./sessions/SESSION-2-SUMMARY.md)** (19/10) - Support Thème Global (2h)
- **[Session 3](./sessions/SESSION-3-SUMMARY.md)** (19/10) - Documentation Automatique (1h30)
- **[Session 4](./sessions/SESSION-4-SUMMARY.md)** (19/10) - Theme Toggle Global (2h)
- **[Session 5](./sessions/SESSION-5-SUMMARY.md)** (20/10) - Nouveaux Composants V2 (2h30)
- **[Session 6](./sessions/SESSION-6-SUMMARY.md)** (20/10) - Finalisation Phase 1 (1h30)
- **[Session 7](./sessions/SESSION-7-SUMMARY.md)** (21/10) - Refactoring Atomic Design (2h)
- **[Session 8](./sessions/SESSION-8-SUMMARY.md)** (21/10) - Complétion Composants V2 (2h)

---

### 📋 Planning & Stratégie

#### [MIGRATION-PLAN.md](./planning/MIGRATION-PLAN.md)
Plan complet de migration des composants StockHub V2 vers le Design System Web Components.

**Contenu** :
- Vue d'ensemble et objectifs
- Analyse des composants existants
- Roadmap détaillée (4 sprints)
- Design tokens à synchroniser
- Workflow de développement
- Gestion des risques

**Pour qui** : Chef de projet, Développeurs

---

#### [COMPONENT-SPECIFICATIONS.md](./planning/COMPONENT-SPECIFICATIONS.md)
Spécifications techniques détaillées de chaque composant.

**Contenu** :
- API de chaque composant (props, events)
- Variants et styles
- Stories Storybook
- Accessibilité
- Estimations de temps

**Pour qui** : Développeurs

---

#### [SPRINT-1-CHECKLIST.md](./planning/SPRINT-1-CHECKLIST.md)
Checklist opérationnelle pour le Sprint 1 (Fondations).

**Contenu** :
- Tâches détaillées étape par étape
- Design tokens à créer
- Composants à implémenter (sh-badge, sh-card, amélioration sh-button)
- Validation et tests
- Métriques de progression

**Pour qui** : Développeurs (guide pratique)

---

### 🔧 Guides Techniques

#### [DESIGN-TOKENS.md](./2-DESIGN-TOKENS.md)
Documentation complète du système de Design Tokens.

**Contenu** :
- Qu'est-ce qu'un Design Token et pourquoi les utiliser
- Architecture du système (tokens.json → CSS)
- Workflow complet et scripts disponibles
- Utilisation dans les composants
- Tokens disponibles (couleurs, spacing, typography, etc.)
- Bonnes pratiques et FAQ

**Pour qui** : Tous les développeurs du Design System

---

#### [REACT-INTEGRATION-GUIDE.md](./4-REACT-INTEGRATION-GUIDE.md)
Guide complet d'intégration des Web Components dans React.

**Contenu** :
- Installation et configuration
- Support TypeScript
- Gestion des événements custom
- Patterns avancés (wrappers, hooks)
- Gestion du thème
- Limitations et solutions
- Exemples complets

**Pour qui** : Développeurs React

---

### 📊 Audits & Rapports Techniques

#### [DESIGN-TOKENS-AUDIT.md](./3-DESIGN-TOKENS-AUDIT.md)
Audit complet de l'utilisation des Design Tokens dans tous les composants.

**Contenu** :
- Méthodologie et outils d'audit
- Analyse détaillée composant par composant
- Taux d'adoption des tokens : 86% (363 utilisations)
- Identification des valeurs en dur (~40 dans sh-badge)
- Plan de correction optionnel (priorité basse)
- Conclusion : Production-ready ✅

**Pour qui** : Lead Dev, Audit qualité, Dette technique

**Statut** : 📋 Améliorations optionnelles (priorité basse)

#### [8-INTERACTION-TESTS-TRACKING.md](./8-INTERACTION-TESTS-TRACKING.md) ✨ NOUVEAU
Tracking complet de l'implémentation des tests d'interaction avec @storybook/test.

**Contenu** :
- 100% des composants interactifs testés (9/9 composants, 44 tests)
- Tous les événements custom testés avec leurs payloads
- Documentation des 4 problèmes rencontrés et solutions
- Patterns et bonnes pratiques pour Shadow DOM
- Changelog détaillé par composant

**Composants testés** :
- sh-button, sh-quantity-input, sh-search-input
- sh-input, sh-card, sh-header
- sh-ia-alert-banner, sh-stock-card, sh-stock-item-card

**Pour qui** : Développeurs, QA, Tests automatisés

**Statut** : ✅ Projet terminé - 100% de couverture

---

## 🎯 Guides par Cas d'Usage

### "Je veux comprendre le plan global"
→ Lire [MIGRATION-PLAN.md](./planning/MIGRATION-PLAN.md)

### "Je vais développer un composant"
1. Consulter [COMPONENT-SPECIFICATIONS.md](./planning/COMPONENT-SPECIFICATIONS.md)
2. Suivre [SPRINT-1-CHECKLIST.md](./planning/SPRINT-1-CHECKLIST.md)

### "Je dois intégrer dans StockHub V2"
→ Lire [REACT-INTEGRATION-GUIDE.md](./4-REACT-INTEGRATION-GUIDE.md)

### "Je veux démarrer le Sprint 1"
→ Ouvrir [SPRINT-1-CHECKLIST.md](./planning/SPRINT-1-CHECKLIST.md)

---

## 📊 Résumé du Projet

### Composants Créés (16 total)

| Composant | Type | Statut | Session |
|-----------|------|--------|---------|
| sh-badge | Atom | ✅ Créé | 1 |
| sh-icon | Atom | ✅ Créé | 1 |
| sh-input | Atom | ✅ Créé | 1 |
| sh-logo | Atom | ✅ Créé | 1 |
| sh-text | Atom | ✅ Créé | 1 |
| sh-button | Molecule | ✅ Créé | 1 |
| sh-card | Molecule | ✅ Créé | 1 |
| sh-metric-card | Molecule | ✅ Créé | 5 |
| sh-quantity-input | Molecule | ✅ Créé | 1 |
| sh-search-input | Molecule | ✅ Créé | 7 |
| sh-status-badge | Molecule | ✅ Créé | 5 |
| sh-footer | Organism | ✅ Créé | 7 |
| sh-header | Organism | ✅ Créé | 1 |
| sh-ia-alert-banner | Organism | ✅ Créé | 7 |
| sh-page-header | Organism | ✅ Créé | 8 |
| sh-stock-card | Organism | ✅ Créé | 7 |
| sh-stock-item-card | Organism | ✅ Créé | 5 |

### Progression

- **Sessions 1-2** : Fondations (5h30) - Setup, tokens, composants de base
- **Sessions 3-4** : Thème & Nouveaux composants (4h30) - Système de thème, metric-card, stock-item-card
- **Sessions 5-6** : Documentation & Finalisation (3h30) - Docs automatique, préparation intégration
- **Sessions 7-8** : StockHub V2 Components (4h) - Refactoring, nouveaux composants V2

**Total réalisé** : ~17h30

### 🔗 Voir aussi
- **Historique des versions** → [CHANGELOG.md](../CHANGELOG.md)
- **Problèmes d'intégration StockHub V2** → [DESIGN-SYSTEM-CORRECTIONS.md](./archive/DESIGN-SYSTEM-CORRECTIONS.md)
- **Rapport d'accessibilité WCAG AA** → [9-ACCESSIBILITY-REPORT.md](./9-ACCESSIBILITY-REPORT.md)

---

## 🛠️ Outils & Technologies

**Design System**
- Lit Element (Web Components)
- TypeScript 5.8.3
- Storybook 8.6.12
- Rollup (build)

**StockHub V2**
- React 19.1.0
- TailwindCSS 4.1.10
- Framer Motion 12.23.24
- Lucide React 0.517.0

---

## 📖 Conventions

### Nommage Composants
- Préfixe : `sh-` (StockHub)
- Format : kebab-case
- Exemples : `sh-button`, `sh-metric-card`

### Structure Atomic Design
```
atoms/       # Composants de base
molecules/   # Combinaisons d'atoms
organisms/   # Composants complexes
```

### Commits
```
feat(atoms): add sh-badge component
fix(button): correct disabled state
docs(readme): update installation
```

---

## 🔗 Liens Utiles

### Projet
- [Repo Design System](https://github.com/SandrineCipolla/stockhub_design_system)
- [Repo StockHub V2](https://github.com/SandrineCipolla/stockHub_V2_front)

### Documentation Externe
- [Lit Element](https://lit.dev/)
- [Storybook Web Components](https://storybook.js.org/docs/web-components)
- [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [React + Web Components](https://react.dev/reference/react-dom/components#custom-html-elements)

---

## 🆘 Support

Pour toute question ou problème :
1. Consulter cette documentation
2. Vérifier les issues GitHub
3. Créer une nouvelle issue si nécessaire

---

## 📝 Notes de Version

### v2.0 (29 Octobre 2025)
- ✅ **16 composants Web Components** créés et documentés
- ✅ **8 sessions** de développement complétées (~17h30)
- ✅ Système de thème global (dark/light) avec toggle Storybook
- ✅ Migration complète vers Lucide icons (1000+ icônes)
- ✅ Documentation automatique (JSDoc + Custom Elements Manifest)
- ✅ Composants StockHub V2 : metric-card, stock-card, stock-item-card, page-header, footer, ia-alert-banner
- ✅ Support accessibilité WCAG AA complet
- ✅ Déploiement Chromatic automatique

### v1.0 (16 Octobre 2025)
- Documentation initiale
- Plan de migration complet
- Spécifications composants
- Guide d'intégration React

---

**Maintenu par** : Sandrine Cipolla
**Dernière mise à jour** : 29 Octobre 2025
