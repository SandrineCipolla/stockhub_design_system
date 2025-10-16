# Guide de Démarrage Rapide

**Version** : 1.0
**Date** : 16 Octobre 2025

Ce guide vous aide à démarrer avec le projet de migration StockHub V2 → Design System.

---

## 🎯 Pour Commencer

### 1. Vous découvrez le projet ?

**Lire d'abord** :
1. [README principal](../README.md) - Vue d'ensemble du Design System
2. [Documentation Index](./README.md) - Navigation dans la documentation
3. [Plan de Migration](./planning/MIGRATION-PLAN.md) - Comprendre la stratégie globale

### 2. Vous allez développer ?

**Suivre ces étapes** :
1. Lire [MIGRATION-PLAN.md](./planning/MIGRATION-PLAN.md) - Comprendre le contexte
2. Consulter [COMPONENT-SPECIFICATIONS.md](./planning/COMPONENT-SPECIFICATIONS.md) - API des composants
3. Ouvrir [SPRINT-1-CHECKLIST.md](./planning/SPRINT-1-CHECKLIST.md) - Guide opérationnel
4. Commencer à coder !

### 3. Vous intégrez dans React ?

**Lire** :
- [REACT-INTEGRATION-GUIDE.md](./REACT-INTEGRATION-GUIDE.md) - Guide complet d'intégration

---

## 📋 Prochaines Actions

### Option A : Démarrer Sprint 1 (Recommandé)

**Durée** : 3-4h
**Objectif** : Fondations (tokens + composants de base)

**Checklist** :
- [ ] Ouvrir `documentation/planning/SPRINT-1-CHECKLIST.md`
- [ ] Suivre les tâches étape par étape
- [ ] Créer sh-badge, sh-card, sh-status-badge
- [ ] Améliorer sh-button (ghost, loading, icons)
- [ ] Mettre à jour design tokens (purple, dark mode)

**Commencer** : `npm run storybook` puis éditer les composants

---

### Option B : Explorer le Code Existant

**Commandes utiles** :
```bash
# Installer dépendances
npm install

# Lancer Storybook
npm run storybook

# Build composants
npm run build:lib

# Générer tokens CSS
npm run tokens:generate
```

**Composants existants à explorer** :
- `src/components/atoms/` - icon, input, logo, text
- `src/components/molecules/` - button, quantity-input
- `src/components/organisms/` - header
- `src/tokens/` - design tokens

---

### Option C : Consulter StockHub V2

**Repo** : https://github.com/SandrineCipolla/stockHub_V2_front

**Branches importantes** :
- `main` - Branche principale
- `feature/visual-creativity` - Design et UI
- `feature/ai-business-intelligence` - IA et composants complexes

**Composants sources à analyser** :
- `src/components/common/` - Badge, Button, Card, Input, StatusBadge
- `src/components/dashboard/` - MetricCard, StockCard, StockGrid

---

## 🛠️ Configuration Environnement

### Prérequis

- Node.js >= 18
- npm >= 9
- Git

### Installation

```bash
# Cloner le repo
git clone https://github.com/SandrineCipolla/stockhub_design_system.git
cd stockhub_design_system

# Installer dépendances
npm install

# Vérifier que tout fonctionne
npm run storybook
```

---

## 📊 Statut Actuel

### Composants Existants ✅
- sh-icon
- sh-input (partiel)
- sh-logo
- sh-text
- sh-button (partiel)
- sh-quantity-input
- sh-header

### À Créer 🆕
- sh-badge
- sh-status-badge
- sh-card
- sh-metric-card
- sh-stock-card
- sh-stock-grid

### À Améliorer ⚠️
- sh-button (ajouter ghost, loading, icons)
- sh-input (aligner avec StockHub V2)

---

## 🗺️ Roadmap

| Sprint | Durée | Objectif | Statut |
|--------|-------|----------|--------|
| Sprint 1 | 3-4h | Fondations (tokens + composants de base) | 🔜 À démarrer |
| Sprint 2 | 3-4h | Composants core (input, metric-card) | ⏳ Planifié |
| Sprint 3 | 4-5h | Dashboard (stock-card, stock-grid) | ⏳ Planifié |
| Sprint 4 | 2-3h | Intégration & publication | ⏳ Planifié |

**Total estimé** : 12-16h

---

## 💬 Questions Fréquentes

### Pourquoi migrer vers Web Components ?

- Réutilisabilité cross-framework (React, Vue, Angular, vanilla JS)
- Performance native du navigateur
- Encapsulation CSS (Shadow DOM)
- Future-proof (standard web)

### Quelle est la différence avec le code React actuel ?

| Aspect | React (StockHub V2) | Web Components (Design System) |
|--------|---------------------|-------------------------------|
| Framework | React 19 | Lit Element (Web Components) |
| Styling | TailwindCSS | CSS + Design Tokens |
| Animations | Framer Motion | Web Animations API / CSS |
| Events | Props callbacks | Custom Events |
| Utilisation | React uniquement | Tous frameworks |

### Comment tester mes composants ?

1. **Storybook** : `npm run storybook` - Développement visuel
2. **Build** : `npm run build:lib` - Vérifier compilation
3. **React** : Créer une app React test et importer le DS

### Où poser des questions ?

- Créer une issue GitHub
- Consulter cette documentation
- Voir les exemples dans Storybook

---

## 🔗 Liens Rapides

**Documentation** :
- [Index Documentation](./README.md)
- [Plan Migration](./planning/MIGRATION-PLAN.md)
- [Spécifications](./planning/COMPONENT-SPECIFICATIONS.md)
- [Sprint 1](./planning/SPRINT-1-CHECKLIST.md)
- [React Guide](./REACT-INTEGRATION-GUIDE.md)

**Repos** :
- [Design System](https://github.com/SandrineCipolla/stockhub_design_system)
- [StockHub V2](https://github.com/SandrineCipolla/stockHub_V2_front)

**Ressources** :
- [Lit Element Docs](https://lit.dev/)
- [Storybook Docs](https://storybook.js.org/docs/web-components)
- [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

---

## ✅ Checklist Avant de Démarrer

- [ ] J'ai lu le README principal
- [ ] J'ai compris le plan de migration
- [ ] J'ai installé les dépendances (`npm install`)
- [ ] Storybook fonctionne (`npm run storybook`)
- [ ] J'ai choisi mon point d'entrée (Sprint 1 recommandé)

**Prêt à démarrer ?** Ouvrir [SPRINT-1-CHECKLIST.md](./planning/SPRINT-1-CHECKLIST.md) !

---

**Maintenu par** : Sandrine Cipolla
**Dernière mise à jour** : 16 Octobre 2025
