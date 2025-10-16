# Documentation - StockHub Design System

**Version** : 1.0
**Date** : 16 Octobre 2025

Bienvenue dans la documentation du Design System StockHub.

---

## 📚 Index de la Documentation

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

#### [REACT-INTEGRATION-GUIDE.md](./REACT-INTEGRATION-GUIDE.md)
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

## 🎯 Guides par Cas d'Usage

### "Je veux comprendre le plan global"
→ Lire [MIGRATION-PLAN.md](./planning/MIGRATION-PLAN.md)

### "Je vais développer un composant"
1. Consulter [COMPONENT-SPECIFICATIONS.md](./planning/COMPONENT-SPECIFICATIONS.md)
2. Suivre [SPRINT-X-CHECKLIST.md](./planning/SPRINT-1-CHECKLIST.md)

### "Je dois intégrer dans StockHub V2"
→ Lire [REACT-INTEGRATION-GUIDE.md](./REACT-INTEGRATION-GUIDE.md)

### "Je veux démarrer le Sprint 1"
→ Ouvrir [SPRINT-1-CHECKLIST.md](./planning/SPRINT-1-CHECKLIST.md)

---

## 📊 Résumé du Projet

### Composants Identifiés

| Composant | Type | Priorité | Statut | Sprint |
|-----------|------|----------|--------|--------|
| sh-badge | Atom | 🔴 Haute | 🆕 À créer | 1 |
| sh-status-badge | Molecule | 🟡 Moyenne | 🆕 À créer | 1 |
| sh-card | Molecule | 🔴 Haute | 🆕 À créer | 1 |
| sh-button | Molecule | 🔴 Haute | ⚠️ À améliorer | 1 |
| sh-input | Atom | 🟡 Moyenne | ⚠️ À améliorer | 2 |
| sh-metric-card | Molecule | 🟡 Moyenne | 🆕 À créer | 2 |
| sh-stock-card | Organism | 🟠 Haute | 🆕 À créer | 3 |
| sh-stock-grid | Organism | 🟢 Basse | 🆕 À créer | 3 |

### Timeline

- **Sprint 1** : Fondations (3-4h) - Tokens + sh-badge, sh-card, sh-button
- **Sprint 2** : Composants Core (3-4h) - sh-input, sh-metric-card
- **Sprint 3** : Dashboard (4-5h) - sh-stock-card, sh-stock-grid
- **Sprint 4** : Intégration (2-3h) - Tests, docs, publication

**Total estimé** : 12-16h

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

### v1.0 (16 Octobre 2025)
- Documentation initiale
- Plan de migration complet
- Spécifications composants
- Guide d'intégration React

---

**Maintenu par** : Sandrine Cipolla
**Dernière mise à jour** : 16 Octobre 2025
