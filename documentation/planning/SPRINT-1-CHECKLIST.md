# Sprint 1 : Fondations - Checklist

**Durée estimée** : 3-4h
**Objectif** : Mettre en place les fondations (tokens, configuration, premiers composants)

---

## ✅ Préparation

- [x] Créer structure `documentation/`
- [x] Documenter plan de migration
- [x] Spécifier les composants
- [ ] Définir date de début du sprint

---

## 🎨 Design Tokens

### 1.1 Palette Purple (Tailwind)

- [ ] Ouvrir `src/tokens/tokens.json`
- [ ] Ajouter palette purple (50-900) :
  ```json
  {
    "colors": {
      "purple": {
        "50": "#f5f3ff",
        "100": "#ede9fe",
        "200": "#ddd6fe",
        "300": "#c4b5fd",
        "400": "#a78bfa",
        "500": "#8b5cf6",
        "600": "#7c3aed",
        "700": "#6d28d9",
        "800": "#5b21b6",
        "900": "#4c1d95"
      }
    }
  }
  ```
- [ ] Définir `--color-primary-*` basé sur purple
- [ ] Tester génération CSS (`npm run tokens:generate`)

### 1.2 Dark Mode Tokens

- [ ] Ajouter tokens pour dark mode :
  ```json
  {
    "theme": {
      "light": {
        "background": "#ffffff",
        "text": "#1f2937",
        "border": "rgba(0, 0, 0, 0.1)"
      },
      "dark": {
        "background": "rgba(255, 255, 255, 0.05)",
        "text": "#f9fafb",
        "border": "rgba(255, 255, 255, 0.1)"
      }
    }
  }
  ```
- [ ] Générer variables CSS
- [ ] Tester switch dark/light dans Storybook

### 1.3 Spacing, Typography, Radius

- [ ] Vérifier tokens spacing alignés avec Tailwind
- [ ] Vérifier tokens typography
- [ ] Vérifier tokens border-radius
- [ ] Documenter équivalences dans README

### 1.4 Validation

- [ ] Lancer Storybook : `npm run storybook`
- [ ] Vérifier que tokens sont appliqués
- [ ] Tester en mode dark
- [ ] Commit : `feat(tokens): add purple palette and dark mode`

---

## 🔘 sh-button (Amélioration)

### 2.1 Variant Ghost

- [ ] Ouvrir `src/components/molecules/button/sh-button.ts`
- [ ] Ajouter styles variant `ghost` :
  ```css
  .ghost {
    background: transparent;
    color: var(--color-purple-600);
    border: none;
  }
  .ghost:hover {
    background: rgba(124, 58, 237, 0.1);
  }
  ```
- [ ] Tester dans Storybook

### 2.2 État Loading

- [ ] Ajouter propriété `@property({ type: Boolean }) loading = false;`
- [ ] Créer spinner animé :
  ```typescript
  private renderSpinner() {
    return html`
      <svg class="spinner" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" />
      </svg>
    `;
  }
  ```
- [ ] Intégrer spinner dans render() si `loading`
- [ ] Ajouter animation rotation
- [ ] Désactiver button automatiquement si loading
- [ ] Tester dans Storybook

### 2.3 Support Icône

- [ ] Ajouter props `iconBefore` et `iconAfter`
- [ ] Intégrer `sh-icon` dans render() :
  ```typescript
  ${this.iconBefore ? html`<sh-icon name="${this.iconBefore}"></sh-icon>` : ''}
  <slot></slot>
  ${this.iconAfter ? html`<sh-icon name="${this.iconAfter}"></sh-icon>` : ''}
  ```
- [ ] Ajuster spacing avec CSS
- [ ] Tester combinaisons (icon seule, avec texte)

### 2.4 Stories

- [ ] Créer story "Ghost Variant"
- [ ] Créer story "Loading States"
- [ ] Créer story "With Icons"
- [ ] Créer story "Icon Only"
- [ ] Vérifier dark mode pour toutes les stories

### 2.5 Validation

- [ ] Tester tous les variants
- [ ] Vérifier accessibilité (ARIA)
- [ ] Tester navigation clavier
- [ ] Commit : `feat(button): add ghost variant, loading state, and icon support`

---

## 🏷️ sh-badge (Nouveau)

### 3.1 Créer Structure

- [ ] Créer dossier `src/components/atoms/badge/`
- [ ] Créer fichier `sh-badge.ts`
- [ ] Créer fichier `sh-badge.stories.ts`

### 3.2 Implémenter Composant

- [ ] Définir interface props :
  ```typescript
  @property() variant: 'success' | 'warning' | 'danger' | 'info' | 'default' = 'default';
  @property() size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean }) pill = false;
  ```
- [ ] Créer styles CSS (variants + sizes)
- [ ] Ajouter support dark mode
- [ ] Implémenter render() avec slot
- [ ] Tester rendu de base

### 3.3 Variants de Couleur

- [ ] Style variant `success` (green)
- [ ] Style variant `warning` (amber)
- [ ] Style variant `danger` (red)
- [ ] Style variant `info` (blue)
- [ ] Style variant `default` (gray)
- [ ] Vérifier contraste dark mode

### 3.4 Stories

- [ ] Story : All variants
- [ ] Story : All sizes
- [ ] Story : Pill variant
- [ ] Story : With icons (via slot)
- [ ] Story : Dark mode showcase

### 3.5 Validation

- [ ] Tester tous les variants
- [ ] Vérifier responsive
- [ ] Vérifier lisibilité
- [ ] Export dans `src/index.ts`
- [ ] Commit : `feat(atoms): add sh-badge component`

---

## 🏷️ sh-status-badge (Nouveau)

### 4.1 Créer Structure

- [ ] Créer dossier `src/components/molecules/status-badge/`
- [ ] Créer `sh-status-badge.ts`
- [ ] Créer `sh-status-badge.stories.ts`

### 4.2 Implémenter Composant

- [ ] Définir type `StockStatus`
- [ ] Définir props (status, showIndicator, label)
- [ ] Créer mapping status → config :
  ```typescript
  const statusConfig = {
    'in-stock': { label: 'En stock', color: 'success', pulse: true },
    'low-stock': { label: 'Stock faible', color: 'warning', pulse: true },
    'out-of-stock': { label: 'Rupture', color: 'danger', pulse: false },
    'restock-needed': { label: 'À réapprovisionner', color: 'info', pulse: true }
  };
  ```
- [ ] Implémenter render()

### 4.3 Indicateur Animé

- [ ] Créer élément indicateur (point coloré)
- [ ] Ajouter animation pulse CSS :
  ```css
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  ```
- [ ] Conditionner pulse selon status
- [ ] Tester animations

### 4.4 Stories

- [ ] Story : All status types
- [ ] Story : With/without indicator
- [ ] Story : Custom labels
- [ ] Story : Dark mode

### 4.5 Validation

- [ ] Tester tous les statuts
- [ ] Vérifier animations
- [ ] Export dans `src/index.ts`
- [ ] Commit : `feat(molecules): add sh-status-badge component`

---

## 📦 sh-card (Nouveau)

### 5.1 Créer Structure

- [ ] Créer dossier `src/components/molecules/card/`
- [ ] Créer `sh-card.ts`
- [ ] Créer `sh-card.stories.ts`

### 5.2 Implémenter Composant

- [ ] Définir props (hover, clickable, padding)
- [ ] Créer styles de base avec backdrop-blur
- [ ] Ajouter support dark mode
- [ ] Implémenter slots (header, default, footer)

### 5.3 Interactivité

- [ ] Ajouter styles hover conditionnels
- [ ] Implémenter Custom Event `sh-card-click`
- [ ] Support navigation clavier (Enter/Space)
- [ ] Ajouter ARIA attributes

### 5.4 Variants Padding

- [ ] Style padding `none`
- [ ] Style padding `sm`
- [ ] Style padding `md` (default)
- [ ] Style padding `lg`

### 5.5 Stories

- [ ] Story : Basic card
- [ ] Story : With slots (header/footer)
- [ ] Story : Hover variations
- [ ] Story : Clickable avec event
- [ ] Story : Different paddings
- [ ] Story : Dark mode

### 5.6 Validation

- [ ] Tester interactivité
- [ ] Vérifier accessibilité
- [ ] Tester dark mode
- [ ] Export dans `src/index.ts`
- [ ] Commit : `feat(molecules): add sh-card component`

---

## 🧪 Tests d'Intégration

### 6.1 Build

- [ ] Lancer `npm run build:lib`
- [ ] Vérifier absence d'erreurs
- [ ] Vérifier fichiers générés dans `dist/`

### 6.2 Storybook

- [ ] Vérifier toutes les stories
- [ ] Tester dark mode global
- [ ] Vérifier responsive
- [ ] Build Storybook : `npm run build-storybook`

### 6.3 Test React (Optionnel)

- [ ] Créer test app React simple
- [ ] Importer le Design System
- [ ] Tester sh-button, sh-badge, sh-card
- [ ] Vérifier événements custom

---

## 📝 Documentation

### 7.1 README

- [ ] Mettre à jour section "Composants Disponibles"
- [ ] Ajouter exemples sh-badge, sh-status-badge, sh-card
- [ ] Documenter nouvelles features sh-button

### 7.2 CHANGELOG

- [ ] Créer `CHANGELOG.md` si inexistant
- [ ] Documenter changements Sprint 1 :
  ```markdown
  ## [1.1.0] - 2025-10-XX

  ### Added
  - Purple palette and dark mode tokens
  - sh-badge component (atoms)
  - sh-status-badge component (molecules)
  - sh-card component (molecules)

  ### Enhanced
  - sh-button: ghost variant, loading state, icon support
  ```

### 7.3 Migration Guide

- [ ] Vérifier `REACT-INTEGRATION-GUIDE.md` à jour
- [ ] Ajouter exemples nouveaux composants

---

## ✅ Validation Finale Sprint 1

- [ ] Tous les composants fonctionnent
- [ ] Storybook build sans erreur
- [ ] Documentation à jour
- [ ] Git status clean
- [ ] Créer tag version : `git tag v1.1.0`

---

## 📊 Métriques

**Composants créés** : 3 (sh-badge, sh-status-badge, sh-card)
**Composants améliorés** : 1 (sh-button)
**Stories créées** : ~15-20
**Temps estimé** : 3-4h
**Temps réel** : ___ h

---

## 🚀 Prochaines Étapes

Après validation Sprint 1 :
- [ ] Planifier Sprint 2 (sh-metric-card)
- [ ] Définir deadline Sprint 2
- [ ] Review avec équipe (si applicable)

---

**Date de début** : ___________
**Date de fin** : ___________
**Statut** : 🔜 À démarrer
