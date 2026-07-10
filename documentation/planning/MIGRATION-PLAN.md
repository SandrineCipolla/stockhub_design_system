# Plan de Migration StockHub V2 → Design System

**Date de création** : 16 Octobre 2025
**Auteur** : Sandrine Cipolla
**Version** : 1.0
**Statut** : 📋 Planification

## 📊 Vue d'Ensemble

Ce document détaille le plan de migration et d'adaptation du Design System Storybook pour répondre aux besoins du projet **StockHub V2**.

### Objectifs
- ✅ Harmoniser les composants React de StockHub V2 avec le Design System Web Components
- ✅ Créer une source unique de vérité pour les composants UI
- ✅ Faciliter la réutilisation cross-platform (web + mobile)
- ✅ Maintenir la cohérence visuelle et comportementale

### Contexte Technique

**StockHub V2 (Front-End)**
- Framework : React 19.1.0 + TypeScript 5.8.3
- Styling : TailwindCSS 4.1.10
- Animations : Framer Motion 12.23.24
- Icônes : Lucide React 0.517.0
- **Déjà installé** : `stockhub_design_system` (via GitHub)

**Design System Actuel**
- Framework : Lit Element (Web Components)
- Build : Rollup + Vite
- Documentation : Storybook 8.6.12
- Package : `@stockhub/design-system`

## 🎯 Composants Identifiés

### Dans StockHub V2

#### `src/components/common/`
| Composant | Priorité | Statut DS | Action |
|-----------|----------|-----------|--------|
| `Badge.tsx` | 🔴 Haute | ❌ Manquant | Créer `sh-badge` |
| `Button.tsx` | 🔴 Haute | ⚠️ Incomplet | Améliorer `sh-button` |
| `Card.tsx` | 🔴 Haute | ❌ Manquant | Créer `sh-card` |
| `Input.tsx` | 🟡 Moyenne | ⚠️ Incomplet | Améliorer `sh-input` |
| `StatusBadge.tsx` | 🟡 Moyenne | ❌ Manquant | Créer `sh-status-badge` |

#### `src/components/dashboard/`
| Composant | Priorité | Statut DS | Action |
|-----------|----------|-----------|--------|
| `MetricCard.tsx` | 🟡 Moyenne | ❌ Manquant | Créer `sh-metric-card` |
| `StockCard.tsx` | 🟠 Haute | ❌ Manquant | Créer `sh-stock-card` |
| `StockGrid.tsx` | 🟢 Basse | ❌ Manquant | Créer `sh-stock-grid` |

### Composants Existants dans le Design System

| Composant | Niveau | Statut | Nécessite MAJ |
|-----------|--------|--------|---------------|
| `sh-icon` | Atom | ✅ OK | Mapper icônes Lucide |
| `sh-input` | Atom | ⚠️ Partiel | Aligner design V2 |
| `sh-logo` | Atom | ✅ OK | Non |
| `sh-text` | Atom | ✅ OK | Non |
| `sh-button` | Molecule | ⚠️ Partiel | Ajouter ghost, loading, icon |
| `sh-quantity-input` | Molecule | ✅ OK | Non |
| `sh-header` | Organism | ✅ OK | Non |

## 🎨 Design Tokens à Synchroniser

### Palette de Couleurs
```json
{
  "purple": {
    "50": "#f5f3ff",
    "100": "#ede9fe",
    "200": "#ddd6fe",
    "300": "#c4b5fd",
    "400": "#a78bfa",
    "500": "#8b5cf6",
    "600": "#7c3aed",  // Primary
    "700": "#6d28d9",
    "800": "#5b21b6",
    "900": "#4c1d95"
  }
}
```

### Dark Mode
- Stratégie : `class` based (`data-theme="dark"`)
- Support backdrop-blur
- Transitions fluides

### Spacing, Typography, Radius
- Aligner avec Tailwind defaults
- Documenter les équivalences

## 📋 Roadmap Détaillée

### Phase 1 : Fondations (Sprint 1) - 3-4h
**Objectif** : Mettre en place les bases communes

#### Tâches
- [ ] **1.1** Créer `documentation/` structure
- [ ] **1.2** Mettre à jour `src/tokens/tokens.json` avec palette purple
- [ ] **1.3** Ajouter tokens dark mode
- [ ] **1.4** Régénérer CSS (`npm run tokens:generate`)
- [ ] **1.5** Tester tokens dans Storybook

#### Livrables
- ✅ Documentation complète
- ✅ Tokens synchronisés avec StockHub V2
- ✅ CSS variables actualisées

---

### Phase 2 : Composants Core (Sprint 2) - 3-4h
**Objectif** : Migrer les composants `common/` prioritaires

#### Tâches

##### 2.1 Améliorer `sh-button`
- [ ] Ajouter variant `ghost`
- [ ] Ajouter état `loading` avec spinner
- [ ] Ajouter support `icon` (avant/après texte)
- [ ] Créer stories complètes
- [ ] Tests d'intégration React

##### 2.2 Créer `sh-badge`
- [ ] Implémenter composant Lit
- [ ] Variants : `success`, `warning`, `danger`, `info`
- [ ] Support dark mode
- [ ] Stories Storybook
- [ ] Documentation props

##### 2.3 Créer `sh-status-badge`
- [ ] Composant spécialisé pour statuts stock
- [ ] Indicateur visuel (point coloré)
- [ ] Variants spécifiques métier
- [ ] Stories Storybook

##### 2.4 Créer `sh-card`
- [ ] Props : `hover`, `onClick`, `role`, `ariaProps`
- [ ] Support backdrop-blur
- [ ] Animations au survol
- [ ] Dark mode adaptatif
- [ ] Stories interactives

##### 2.5 Améliorer `sh-input`
- [ ] Aligner design avec StockHub V2
- [ ] Vérifier états (error, disabled, focus)
- [ ] Accessibilité ARIA
- [ ] Stories complètes

#### Livrables
- ✅ 3 nouveaux composants
- ✅ 2 composants améliorés
- ✅ Documentation Storybook complète

---

### Phase 3 : Composants Dashboard (Sprint 3) - 4-5h
**Objectif** : Créer les composants spécifiques au dashboard

#### Tâches

##### 3.1 Créer `sh-metric-card`
- [ ] Structure : titre, valeur, variation, icône
- [ ] Support animations CountUp (via CSS ou Web Animations API)
- [ ] Variants pour différents types de métriques
- [ ] Dark mode
- [ ] Stories avec données dynamiques

##### 3.2 Créer `sh-stock-card` (Complexe)
- [ ] Analyser `StockCard.tsx` React en détail
- [ ] Structure header (nom, date, badge catégorie)
- [ ] Metrics grid (quantité, valeur)
- [ ] Status indicator (bordure colorée)
- [ ] Action buttons (view, edit, delete)
- [ ] Support callbacks via Custom Events
- [ ] États : `isUpdating`, `isDeleting`
- [ ] Animations (alternatives à Framer Motion)
- [ ] AI suggestions display
- [ ] Fonctionnalité paint-container tracking
- [ ] Accessibilité complète
- [ ] Stories interactives

##### 3.3 Créer `sh-stock-grid`
- [ ] Layout grid responsive
- [ ] Loading state
- [ ] Empty state
- [ ] Stories avec data mock

#### Livrables
- ✅ 3 composants dashboard
- ✅ Système d'événements custom pour callbacks
- ✅ Documentation patterns d'utilisation React

---

### Phase 4 : Intégration & Documentation (Sprint 4) - 2-3h
**Objectif** : Finaliser et tester l'intégration

#### Tâches

##### 4.1 Système d'Icônes
- [ ] Mapper icônes Lucide → `stockhub-icones.ts`
- [ ] Créer script de conversion/import
- [ ] Documenter icônes disponibles
- [ ] Tester `sh-icon` avec toutes les icônes

##### 4.2 Tests d'Intégration
- [ ] Build du Design System (`npm run build:lib`)
- [ ] Tester import dans StockHub V2
- [ ] Vérifier SSR compatibility
- [ ] Tests visuels (Chromatic)
- [ ] Tests accessibilité

##### 4.3 Documentation
- [ ] Guide migration React → Web Components
- [ ] Documenter différences animations
- [ ] Pattern callbacks (Custom Events vs props)
- [ ] Exemples d'intégration complets
- [ ] Troubleshooting FAQ

##### 4.4 Publication
- [ ] Bump version (`npm version minor`)
- [ ] Update CHANGELOG
- [ ] Build Storybook (`npm run build-storybook`)
- [ ] Publish NPM (ou GitHub Packages)
- [ ] Update dépendance dans StockHub V2

#### Livrables
- ✅ Design System v2.0.0 publié
- ✅ Documentation complète
- ✅ StockHub V2 intégré

---

## 🔄 Workflow de Développement

### Pour Chaque Composant

1. **Analyse** : Étudier le composant React source
2. **Conception** : Définir props et API Web Component
3. **Implémentation** : Créer le composant Lit
4. **Stories** : Documenter dans Storybook
5. **Test** : Vérifier dans context React
6. **Review** : Validation visuelle et fonctionnelle

### Bonnes Pratiques

- ✅ Toujours créer les stories avant l'implémentation finale
- ✅ Tester dark mode systématiquement
- ✅ Valider accessibilité (ARIA, keyboard nav)
- ✅ Documenter différences avec version React
- ✅ Utiliser les design tokens (jamais de valeurs en dur)
- ✅ Préfixer tous les composants avec `sh-`

## 📊 Suivi de Progression

### Sprint 1 : Fondations
- [ ] Documentation structure
- [ ] Design tokens
- [ ] Validation Storybook

**Estimation** : 3-4h
**Deadline** : TBD

### Sprint 2 : Composants Core
- [ ] sh-button (amélioration)
- [ ] sh-badge
- [ ] sh-status-badge
- [ ] sh-card
- [ ] sh-input (amélioration)

**Estimation** : 3-4h
**Deadline** : TBD

### Sprint 3 : Dashboard
- [ ] sh-metric-card
- [ ] sh-stock-card
- [ ] sh-stock-grid

**Estimation** : 4-5h
**Deadline** : TBD

### Sprint 4 : Intégration
- [ ] Icônes
- [ ] Tests
- [ ] Documentation
- [ ] Publication

**Estimation** : 2-3h
**Deadline** : TBD

**Total estimé** : 12-16h

## 🚨 Risques & Mitigations

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| Framer Motion incompatible avec Web Components | Moyen | Haute | Utiliser Web Animations API ou CSS transitions |
| Performance dégradée | Faible | Faible | Benchmark avant/après migration |
| Breaking changes dans StockHub V2 | Élevé | Moyenne | Versioning strict, migration progressive |
| Complexité `sh-stock-card` | Moyen | Haute | Découper en sous-composants si nécessaire |

## 📚 Références

- [Documentation StockHub V2](https://github.com/SandrineCipolla/stockHub_V2_front)
- [Lit Element Docs](https://lit.dev/)
- [Storybook Web Components](https://storybook.js.org/docs/web-components)
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

## 📝 Notes

### Décisions Techniques

**Animations** : Préférer CSS transitions et Web Animations API plutôt que Framer Motion pour compatibilité cross-framework.

**Callbacks** : Utiliser Custom Events pour communication parent/enfant (pattern Web Components standard).

**Styling** : Maintenir design tokens centralisés, éviter dépendance directe à Tailwind dans les composants.

---

**Prochaine étape** : Démarrer Sprint 1 - Fondations
