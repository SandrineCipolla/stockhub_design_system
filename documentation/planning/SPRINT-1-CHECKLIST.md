# Sprint 1 : Fondations - Checklist

**Durée estimée** : 3-4h
**Objectif** : Mettre en place les fondations (tokens, configuration, premiers composants)

---

## ✅ Préparation

- [x] Créer structure `documentation/`
- [x] Documenter plan de migration
- [x] Spécifier les composants
- [x] Définir date de début du sprint (16/10/2025 - Session 1)

---

## 🎨 Design Tokens

### 1.1 Palette Purple (Tailwind)

- [x] Ouvrir `src/tokens/tokens.json`
- [x] Ajouter palette purple (50-900) - Déjà présent dans tokens.json
- [x] Définir `--color-primary-*` basé sur purple
- [x] Tester génération CSS (`npm run tokens:generate`) - ✅ Tokens générés correctement

### 1.2 Dark Mode Tokens

- [x] Ajouter tokens pour dark mode - ✅ Présent dans design-tokens.css
- [x] Générer variables CSS - ✅ Variables générées
- [x] Tester switch dark/light dans Storybook - ✅ Fonctionne avec preview.ts decorator

### 1.3 Spacing, Typography, Radius

- [x] Vérifier tokens spacing alignés avec Tailwind - ✅ Alignés
- [x] Vérifier tokens typography - ✅ Présents
- [x] Vérifier tokens border-radius - ✅ Présents
- [ ] Documenter équivalences dans README - ⏭️ À faire en Session 2

### 1.4 Validation

- [x] Lancer Storybook : `npm run storybook` - ✅ Lancé
- [x] Vérifier que tokens sont appliqués - ✅ Variables CSS injectées dans preview.ts
- [x] Tester en mode dark - ✅ Toolbar Storybook fonctionne
- [ ] Commit : `feat(tokens): add purple palette and dark mode` - ⏭️ Sera fait avec commit global Sprint 1

---

## 🔘 sh-button (Amélioration)

### 2.1 Variant Ghost

- [x] Ouvrir `src/components/molecules/button/sh-button.ts` - ✅ Ouvert
- [x] Ajouter styles variant `ghost` - ✅ Ajouté avec hover effects
- [x] Tester dans Storybook - ✅ Story "GhostShowcase" créée

### 2.2 État Loading

- [x] Ajouter propriété `@property({ type: Boolean }) loading = false;` - ✅ Ajouté
- [x] Créer spinner animé - ✅ SVG spinner avec animation spin
- [x] Intégrer spinner dans render() si `loading` - ✅ Intégré
- [x] Ajouter animation rotation - ✅ @keyframes spin ajouté
- [x] Désactiver button automatiquement si loading - ✅ disabled={this.loading}
- [x] Tester dans Storybook - ✅ Story "Loading" créée

### 2.3 Support Icône

- [x] Ajouter props `iconBefore` et `iconAfter` - ✅ Props ajoutés
- [x] Intégrer `sh-icon` dans render() - ✅ Intégré avec conditions
- [x] Ajuster spacing avec CSS - ✅ gap: var(--spacing-sm)
- [x] Tester combinaisons (icon seule, avec texte) - ✅ Stories créées

### 2.4 Stories

- [x] Créer story "Ghost Variant" - ✅ GhostShowcase créé
- [x] Créer story "Loading States" - ✅ Loading créé
- [x] Créer story "With Icons" - ✅ WithIconBefore, WithIconAfter, IconOnly
- [x] Créer story "Icon Only" - ✅ IconOnly créé
- [x] Vérifier dark mode pour toutes les stories - ✅ Vérifié

### 2.5 Validation

- [x] Tester tous les variants - ✅ Tous fonctionnels (primary, secondary, ghost, danger)
- [x] Vérifier accessibilité (ARIA) - ✅ aria-busy ajouté pour loading
- [x] Tester navigation clavier - ✅ focus-visible styles présents
- [ ] Commit : `feat(button): add ghost variant, loading state, and icon support` - ⏭️ Commit global Sprint 1

---

## 🏷️ sh-badge (Nouveau)

### 3.1 Créer Structure

- [x] Créer dossier `src/components/atoms/badge/` - ✅ Créé
- [x] Créer fichier `sh-badge.ts` - ✅ Créé
- [x] Créer fichier `sh-badge.stories.ts` - ✅ Créé

### 3.2 Implémenter Composant

- [x] Définir interface props - ✅ variant, size, pill définis
- [x] Créer styles CSS (variants + sizes) - ✅ Styles complets
- [x] Ajouter support dark mode - ✅ :host([data-theme="dark"]) ajouté
- [x] Implémenter render() avec slot - ✅ <slot></slot> intégré
- [x] Tester rendu de base - ✅ Fonctionne dans Storybook

### 3.3 Variants de Couleur

- [x] Style variant `success` (green) - ✅ Ajouté avec success-100/800
- [x] Style variant `warning` (amber) - ✅ Ajouté avec warning-100/800
- [x] Style variant `danger` (red) - ✅ Ajouté avec danger-100/800
- [x] Style variant `info` (blue) - ✅ Ajouté avec hardcoded blue
- [x] Style variant `default` (gray) - ✅ Ajouté avec neutral-100/800
- [x] Vérifier contraste dark mode - ✅ Mode dark avec 900/200 colors

### 3.4 Stories

- [x] Story : All variants - ✅ AllVariants créé
- [x] Story : All sizes - ✅ AllSizes créé
- [x] Story : Pill variant - ✅ PillShape créé
- [x] Story : With icons (via slot) - ✅ WithIcons créé
- [x] Story : Dark mode showcase - ✅ DarkMode créé

### 3.5 Validation

- [x] Tester tous les variants - ✅ Tous affichés correctement
- [x] Vérifier responsive - ✅ inline-flex adaptatif
- [x] Vérifier lisibilité - ✅ Contraste vérifié
- [x] Export dans `src/index.ts` - ✅ Exporté
- [ ] Commit : `feat(atoms): add sh-badge component` - ⏭️ Commit global Sprint 1

---

## 🏷️ sh-status-badge (Nouveau)

### 4.1 Créer Structure

- [x] Créer dossier `src/components/molecules/status-badge/` - ✅ Créé
- [x] Créer `sh-status-badge.ts` - ✅ Créé
- [x] Créer `sh-status-badge.stories.ts` - ✅ Créé

### 4.2 Implémenter Composant

- [x] Définir type `StockStatus` - ✅ Type défini avec 4 statuts
- [x] Définir props (status, showIndicator, label) - ✅ Props définis
- [x] Créer mapping status → config - ✅ STATUS_CONFIG créé avec label/variant/pulse
- [x] Implémenter render() - ✅ Render avec indicateur conditionnel

### 4.3 Indicateur Animé

- [x] Créer élément indicateur (point coloré) - ✅ .indicator span 8x8px
- [x] Ajouter animation pulse CSS - ✅ @keyframes pulse ajouté
- [x] Conditionner pulse selon status - ✅ pulse: true/false dans config
- [x] Tester animations - ✅ Animation fonctionne pour in-stock, low-stock, restock-needed

### 4.4 Stories

- [x] Story : All status types - ✅ AllStatusTypes créé
- [x] Story : With/without indicator - ✅ IndicatorComparison créé
- [x] Story : Custom labels - ✅ CustomLabels créé
- [x] Story : Dark mode - ✅ DarkMode créé

### 4.5 Validation

- [x] Tester tous les statuts - ✅ 4 statuts fonctionnels
- [x] Vérifier animations - ✅ Pulse vérifié
- [x] Export dans `src/index.ts` - ✅ Exporté
- [ ] Commit : `feat(molecules): add sh-status-badge component` - ⏭️ Commit global Sprint 1

---

## 📦 sh-card (Nouveau)

### 5.1 Créer Structure

- [x] Créer dossier `src/components/molecules/card/` - ✅ Créé
- [x] Créer `sh-card.ts` - ✅ Créé
- [x] Créer `sh-card.stories.ts` - ✅ Créé

### 5.2 Implémenter Composant

- [x] Définir props (hover, clickable, padding) - ✅ Props définis
- [x] Créer styles de base avec backdrop-blur - ✅ backdrop-filter: blur(10px) ajouté
- [x] Ajouter support dark mode - ✅ :host([data-theme="dark"]) styles
- [x] Implémenter slots (header, default, footer) - ✅ 3 slots implémentés

### 5.3 Interactivité

- [x] Ajouter styles hover conditionnels - ✅ transform + box-shadow
- [x] Implémenter Custom Event `sh-card-click` - ✅ Émis au click
- [x] Support navigation clavier (Enter/Space) - ✅ handleKeyDown ajouté
- [x] Ajouter ARIA attributes - ✅ role="button", tabindex ajoutés

### 5.4 Variants Padding

- [x] Style padding `none` - ✅ padding: 0
- [x] Style padding `sm` - ✅ padding: 0.75rem
- [x] Style padding `md` (default) - ✅ padding: 1rem
- [x] Style padding `lg` - ✅ padding: 1.5rem

### 5.5 Stories

- [x] Story : Basic card - ✅ Basic créé
- [x] Story : With slots (header/footer) - ✅ WithSlots créé
- [x] Story : Hover variations - ✅ HoverEffects créé
- [x] Story : Clickable avec event - ✅ Clickable créé (event handler retiré pour compatibilité)
- [x] Story : Different paddings - ✅ DifferentPadding créé
- [x] Story : Dark mode - ✅ DarkMode créé

### 5.6 Validation

- [x] Tester interactivité - ✅ Click et keyboard navigation OK
- [x] Vérifier accessibilité - ✅ ARIA et keyboard OK
- [x] Tester dark mode - ✅ Styles dark mode OK
- [x] Export dans `src/index.ts` - ✅ Exporté
- [ ] Commit : `feat(molecules): add sh-card component` - ⏭️ Commit global Sprint 1

---

## 🧪 Tests d'Intégration

### 6.1 Build

- [ ] Lancer `npm run build:lib` - ⏭️ À faire en Session 2
- [ ] Vérifier absence d'erreurs
- [ ] Vérifier fichiers générés dans `dist/`

### 6.2 Storybook

- [x] Vérifier toutes les stories - ✅ Badge, Button, Card, StatusBadge affichés
- [x] Tester dark mode global - ✅ Toolbar theme switcher fonctionne
- [ ] Vérifier responsive - ⏭️ À vérifier en Session 2
- [ ] Build Storybook : `npm run build-storybook` - ⏭️ À faire en Session 2

### 6.3 Test React (Optionnel)

- [ ] Créer test app React simple - ⏭️ Sprint 3-4
- [ ] Importer le Design System
- [ ] Tester sh-button, sh-badge, sh-card
- [ ] Vérifier événements custom

---

## 📝 Documentation

### 7.1 README

- [x] Mettre à jour section "Composants Disponibles" - ✅ README réécrit complètement
- [x] Ajouter exemples sh-badge, sh-status-badge, sh-card - ✅ Exemples détaillés ajoutés
- [x] Documenter nouvelles features sh-button - ✅ Section complète avec exemples
- [x] Documenter migration Lucide - ✅ Section dédiée avec guide de migration

### 7.2 CHANGELOG

- [x] Créer `CHANGELOG.md` si inexistant - ✅ CHANGELOG créé
- [x] Documenter changements Sprint 1 - ✅ Version 1.1.0 documentée complètement
- [x] Ajouter breaking changes migration Lucide - ✅ BREAKING marqué pour noms icônes

### 7.3 Migration Guide

- [ ] Vérifier `REACT-INTEGRATION-GUIDE.md` à jour - ⏭️ À faire
- [ ] Ajouter exemples nouveaux composants - ⏭️ À faire
- [ ] Documenter utilisation Lucide depuis React - ⏭️ À faire

---

## ✅ Validation Finale Sprint 1

- [x] Tous les composants fonctionnent - ✅ Badge, Button, Card, StatusBadge, Icon (Lucide) OK
- [ ] Storybook build sans erreur - ⏭️ À tester en Session 2
- [x] Documentation à jour - ✅ README, CHANGELOG, SESSION-1-SUMMARY, SPRINT-1-CHECKLIST mis à jour
- [ ] Git status clean - ⏭️ Commit à faire
- [ ] Créer tag version : `git tag v1.1.0` - ⏭️ Après commit

---

## 📊 Métriques

**Composants créés** : 3 (sh-badge, sh-status-badge, sh-card)
**Composants améliorés** : 2 (sh-button, sh-icon)
**Migrations techniques** : 1 (système d'icônes → Lucide)
**Stories créées** : ~25+ (incluant multiples stories par composant)
**Fichiers modifiés** : ~25
**Documentation créée/mise à jour** : 4 fichiers (README, CHANGELOG, SESSION-1-SUMMARY, SPRINT-1-CHECKLIST)
**Temps estimé** : 3-4h
**Temps réel Session 1** : ~3h30 (création + debugging Storybook + migration Lucide)

---

## 🚀 Prochaines Étapes

Après validation Sprint 1 :
- [ ] Planifier Sprint 2 (sh-metric-card)
- [ ] Définir deadline Sprint 2
- [ ] Review avec équipe (si applicable)

---

## 🐛 Issues Identifiées Session 1

- ✅ **Résolu**: Stories utilisaient `html` de Lit → Converti en template strings simples
- ✅ **Résolu**: Variables CSS manquantes dans preview.ts → Ajoutées avec noms corrects
- ✅ **Résolu**: Parsing error avec event handlers inline → Retirés des template strings
- ✅ **Résolu**: Icônes custom incompatibles avec StockHub V2 → Migration vers Lucide
- ⏭️ **À faire**: Logo ne s'affiche pas (couleur blanche sur fond clair)
- ⏭️ **À faire**: Header et Logo à mettre à jour selon StockHub V2

---

**Date de début** : 16/10/2025
**Date Session 1** : 16/10/2025
**Statut** : ✅ Session 1 Complétée - Documentation à jour - En attente commit final
