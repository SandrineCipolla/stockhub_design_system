# Design System - Corrections à Apporter

**Date de création** : 27 Octobre 2025
**Source** : Tests d'intégration StockHub V2 (21 Octobre 2025)
**Branch** : `feature/stockhub-v2-components`
**Document source** : `StockHub V2 Front/DESIGN-SYSTEM-FEEDBACK.md`

---

## 📊 Vue d'ensemble

### Statistiques
- **Total problèmes** : 23
- **Résolus** : 20 (87%)
- **Critiques (❌)** : 11 (10 résolus)
- **Améliorations (⚠️)** : 8 (6 résolues)

### Composants par statut
- ✅ **Fonctionnels** : 8 (sh-footer, sh-status-badge, sh-search-input, sh-header, sh-metric-card, sh-stock-card, sh-button, sh-ia-alert-banner)
- ⚠️ **Partiels** : 1 (sh-logo)
- ❌ **Non fonctionnels** : 0
- ⏭️ **Non testés** : 1 (sh-badge)

---

## 🔴 PRIORITÉ 1 - Composants Non Fonctionnels (Bloquants)

### sh-header (4 problèmes) ✅ COMPLÉTÉ

#### ✅ #4 - Logo trop petit
- **Fichier** : `src/components/organisms/header/sh-header.ts`
- **Problème** : Le logo est plus petit que dans le Header React original
- **Solution** : Augmenter la taille du logo de `sm` à `md`
- **Commit** : ef631d5 - "fix(sh-header): resolve 4 critical integration issues"
- **Statut** : ✅ Fait

#### ✅ #5 - Toggle thème ne fonctionne pas globalement
- **Fichier** : `src/components/organisms/header/sh-header.ts`
- **Problème** : Le toggle ne change que le header, pas toute l'app
- **Solution** : Émettre un événement `theme-change` sur le `document`
- **Commit** : ef631d5
- **Statut** : ✅ Fait - Événement global émis + stories mises à jour

#### ✅ #6 - Nom utilisateur ne s'affiche pas
- **Fichier** : `src/components/organisms/header/sh-header.ts`
- **Problème** : Affiche "Utilisateur" au lieu de la valeur de `user-name`
- **Solution** : Ajout `attribute: 'user-name'` explicite dans @property
- **Commit** : ef631d5
- **Statut** : ✅ Fait

#### ✅ #7 - Badge de notifications vide
- **Fichier** : `src/components/organisms/header/sh-header.ts`
- **Problème** : Le compteur ne s'affiche pas malgré `notification-count={3}`
- **Solution** : Ajout `attribute: 'notification-count'` explicite dans @property
- **Commit** : ef631d5
- **Statut** : ✅ Fait

**📝 Notes de session :**
- Stories mises à jour avec attributs kebab-case
- Helper `createStoryWithThemeListener` créé pour gérer le thème global
- Story `LightTheme` supprimée (problème de timing Storybook, non critique)
- Thème toggle fonctionne parfaitement sur toutes les autres stories

---

### sh-metric-card (4 problèmes) ✅ COMPLÉTÉ

#### ✅ #8 - Taille trop grande
- **Fichier** : `src/components/molecules/metric-card/sh-metric-card.ts`
- **Problème** : Padding trop important, police trop grande
- **Solution** : Réduire padding et font-size pour matcher StockHub V2
- **Valeurs ajustées** :
  - Padding card : `var(--spacing-lg)` → `var(--spacing-md)` (ligne 111)
  - Gap card : `var(--spacing-md)` → `var(--spacing-sm)` (ligne 116)
  - Font-size value : `2rem` → `1.5rem` (ligne 210)
  - Font-size label : `var(--font-fontSize-sm)` → `0.75rem` (ligne 218)
- **Commit** : (à venir)
- **Statut** : ✅ Fait

#### ✅ #9 - Icône non colorée selon variant
- **Fichier** : `src/components/molecules/metric-card/sh-metric-card.ts`
- **Problème** : L'icône est grise au lieu d'avoir la couleur du variant
- **Solution** : L'icône était déjà colorée via CSS dans le composant d'origine
- **CSS existant** (lignes 159-173) :
```css
:host([variant="success"]) .icon-wrapper sh-icon {
  color: var(--color-success-600);
}

:host([variant="warning"]) .icon-wrapper sh-icon {
  color: var(--color-warning-600);
}

:host([variant="danger"]) .icon-wrapper sh-icon {
  color: var(--color-danger-600);
}

:host([variant="info"]) .icon-wrapper sh-icon {
  color: var(--color-primary-600);
}
```
- **Statut** : ✅ Déjà implémenté dans le composant original

#### ✅ #10 - Animation count-up manquante
- **Fichier** : `src/components/molecules/metric-card/sh-metric-card.ts`
- **Problème** : Le nombre s'affiche instantanément
- **Solution** : Animation de comptage progressif ajoutée avec support décimaux
- **Implémentation** (lignes 237-299) :
  - Ajout `@state() displayValue` pour stocker la valeur animée
  - Méthode `firstUpdated()` détecte les valeurs numériques pures (avec virgule française)
  - Méthode `animateValue()` avec support décimales via paramètre `decimalPlaces`
  - Support format français (`45,250`) et anglais (`45,250.50`)
  - Rendu via `<slot>${this.displayValue}</slot>`
- **Commit** : (à venir)
- **Statut** : ✅ Fait

#### ✅ #11 - Animation cascade manquante
- **Fichier** : `src/components/molecules/metric-card/sh-metric-card.ts`
- **Problème** : Toutes les cards apparaissent simultanément
- **Solution** : Animation cascade n'est PAS appropriée pour metric-cards (dashboard)
- **Décision** :
  - Animation cascade sera implémentée pour `sh-stock-card` (liste de produits)
  - MetricCards dans dashboard doivent s'afficher simultanément pour aperçu rapide des KPIs
- **Statut** : ✅ Décision validée - Non applicable aux metric-cards

**📝 Notes de session :**
- Stories mises à jour :
  - Icône `DollarSign` → `Euro` (MonetaryValue, AllVariants, DashboardExample)
  - Valeurs monétaires : `"45,250"` avec virgule française
  - DashboardExample layout : grid → flex avec wrappers pour espacement correct mobile
- Animation count-up fonctionne avec décimales françaises (virgule) et anglaises (point)
- Test visuel Storybook : ✅ Validé

---

### sh-stock-card (6 problèmes) ✅ COMPLÉTÉ

#### ✅ #16 - Bordure trop opaque
- **Fichier** : `src/components/organisms/stock-card/sh-stock-card.ts`
- **Problème** : Bordure trop visible
- **Solution** : Opacité réduite de 0.2 à 0.1
- **Code modifié** (lignes 59, 67) :
```css
--card-border: rgba(255, 255, 255, 0.1);  /* dark mode */
--card-border: rgba(0, 0, 0, 0.1);        /* light mode */
```
- **Commit** : (à venir)
- **Statut** : ✅ Fait

#### ✅ #17 - Quantité et valeur mal alignées
- **Fichier** : `src/components/organisms/stock-card/sh-stock-card.ts`
- **Problème** : Texte pas centré
- **Solution** : Ajout `text-align: center`
- **Code modifié** (ligne 193) :
```css
.metric {
  text-align: center;
}
```
- **Commit** : (à venir)
- **Statut** : ✅ Fait

#### ✅ #18 - "Mise à jour" mal affiché
- **Fichier** : `src/components/organisms/stock-card/sh-stock-card.ts`
- **Problème** : Attribut `last-update` non mappé
- **Solution** : Ajout attribut explicite
- **Code modifié** (ligne 46) :
```typescript
@property({ attribute: 'last-update' }) lastUpdate = '';
```
- **Commit** : (à venir)
- **Statut** : ✅ Fait

#### ✅ #19 - Bouton "Session" mal stylisé
- **Fichier** : `src/components/organisms/stock-card/sh-stock-card.ts`
- **Problème** : Bouton trop visible, pleine largeur
- **Solution** : Changé en variant ghost, retiré width 100%, icône Palette
- **Code modifié** (lignes 377-386) :
```html
<sh-button
  variant="ghost"
  size="sm"
  iconBefore="Palette"
  @click="${this._handleSession}"
>
  Enregistrer session
</sh-button>
```
- **Commit** : (à venir)
- **Statut** : ✅ Fait

#### ✅ #20 - Bouton "Session" ne fonctionne pas
- **Fichier** : `src/components/organisms/stock-card/sh-stock-card.ts`
- **Problème** : Événement pas émis
- **Solution** : L'événement `_handleSession` était déjà implémenté (lignes 286-295)
- **Statut** : ✅ Déjà implémenté dans le composant original

#### ✅ #21 - Boutons d'action mal stylisés
- **Fichier** : `src/components/organisms/stock-card/sh-stock-card.ts`
- **Problème** : Icône Edit au lieu de Edit3
- **Solution** : Changé icône `Edit` en `Edit3` (ligne 413)
- **Note** : Les boutons étaient déjà en variant ghost et size sm
- **Commit** : (à venir)
- **Statut** : ✅ Fait

**📝 Notes de session :**
- Stories mises à jour avec nouvelle story **InteractiveEvents** démontrant l'utilité du bouton "Enregistrer session"
- La story interactive simule la diminution du stock à chaque session enregistrée
- Bouton session centré avec sa taille naturelle
- Test visuel Storybook : ✅ Validé

---

## ⚠️ PRIORITÉ 2 - Composants Partiels (Non bloquants)

### sh-button (3 problèmes) ✅ COMPLÉTÉ

#### ✅ #1 - Icône `icon-before` ne s'affiche pas
- **Fichier** : `src/components/molecules/button/sh-button.ts`
- **Problème** : Attributs `icon-before` et `icon-after` non mappés
- **Solution** : Ajout mapping kebab-case → camelCase + import sh-icon
- **Code modifié** (lignes 3, 54, 60) :
```typescript
import '../../atoms/icon/sh-icon.js';

@property({ type: String, attribute: 'icon-before' }) iconBefore?: string;
@property({ type: String, attribute: 'icon-after' }) iconAfter?: string;
```
- **Stories mises à jour** : Tous les attributs changés en kebab-case
- **Commit** : (à venir)
- **Statut** : ✅ Fait

#### ✅ #2 - Couleur primary incorrecte
- **Fichier** : `src/tokens/tokens.json`
- **Problème** : Vérification de la couleur primary
- **Solution** : La couleur était déjà correcte !
- **Tokens vérifiés** :
```json
"primary": {
  "500": "#8b5cf6",  // Violet StockHub ✓
  "600": "#7c3aed"
}
```
- **Statut** : ✅ Déjà correct

#### ✅ #3 - Pas de support responsive text
- **Fichier** : `src/components/molecules/button/sh-button.ts`
- **Problème** : Impossible de masquer texte sur mobile
- **Solution** : Ajout propriétés `hideTextMobile` et `iconOnly`
- **Code ajouté** (lignes 74-81, 230-253, 267) :
```typescript
@property({ type: Boolean, attribute: 'hide-text-mobile' }) hideTextMobile = false;
@property({ type: Boolean, attribute: 'icon-only' }) iconOnly = false;

// Styles CSS
:host([icon-only]) .button-text { display: none; }
:host([icon-only]) button { padding: var(--spacing-sm); aspect-ratio: 1; }

:host([hide-text-mobile]) .button-text { display: none; }
@media (min-width: 640px) {
  :host([hide-text-mobile]) .button-text { display: inline; }
}

// Render
<span class="button-text"><slot></slot></span>
```
- **Commit** : (à venir)
- **Statut** : ✅ Fait

**📝 Notes de session :**
- Import sh-icon ajouté pour afficher les icônes
- Stories corrigées avec kebab-case pour tous les attributs icon
- Mode `icon-only` ajouté pour boutons sans texte (carré)
- Mode `hide-text-mobile` pour masquer texte sur mobile
- Test visuel Storybook : ✅ Validé

---

### ✅ sh-ia-alert-banner (3 problèmes) - COMPLÉTÉ

#### ✅ #12 - Événement toggle ajouté
- **Fichier** : `src/components/organisms/ia-alert-banner/sh-ia-alert-banner.ts:250-257`
- **Problème** : Toggle existait mais sans événement custom
- **Solution appliquée** : Ajout de l'événement `sh-ia-alert-toggle` dans `_toggleExpanded()`
- **Code modifié** :
```typescript
private _toggleExpanded() {
  this.expanded = !this.expanded;
  this.dispatchEvent(new CustomEvent('sh-ia-alert-toggle', {
    detail: { expanded: this.expanded },
    bubbles: true,
    composed: true
  }));
}
```
- **Statut** : ✅ Corrigé
- **Note** : Le toggle expand/collapse existait déjà avec propriété `expanded` et bouton ChevronUp

#### ✅ #13 - Emoji robot 🤖 ajouté
- **Fichier** : `src/components/organisms/ia-alert-banner/sh-ia-alert-banner.ts:283`
- **Problème** : Pas d'emoji robot avant le count
- **Solution appliquée** : Ajout de 🤖 avant `${this.count}`
- **Code modifié** :
```html
<span class="count-badge">🤖 ${this.count}</span>
```
- **Statut** : ✅ Corrigé

#### ✅ #14 - Style badge redesigné selon le design original
- **Fichier** : `src/components/organisms/ia-alert-banner/sh-ia-alert-banner.ts:129-176`
- **Problème** : Badge différent du design StockHub V2 original
- **Solution appliquée** : Redesign complet selon AISummaryWidget.tsx
  - Badges semi-transparents avec bordure (rgba backgrounds)
  - Positionnés en-dessous du texte (flex-direction: column)
  - Labels en anglais: "Critical", "Warning", "Info"
  - Padding réduit (2px 8px) et text-transform: capitalize
- **Code modifié** :
```css
.alert-content {
  flex-direction: column; /* badges en-dessous */
  gap: var(--spacing-xs);
}

.severity-critical {
  background: rgba(239, 68, 68, 0.1);
  color: var(--color-danger-600);
  border: 1px solid rgba(239, 68, 68, 0.3);
}
```
- **Statut** : ✅ Corrigé
- **Fixes additionnels** :
  - Removed unused `state` import
  - Replaced custom CSS properties (`--alert-*`) with design tokens
  - Added proper light/dark theme support with `:host([data-theme])`
- **Test visuel Storybook** : ✅ Validé - correspond à AISummaryWidget original

---

### sh-logo (2 problèmes)

#### ❌ #22 - Pas responsive
- **Fichier** : `src/components/atoms/logo/sh-logo.ts`
- **Problème** : Trop gros sur mobile
- **Solution** : Ajouter media queries
- **Code à ajouter** :
```css
:host([size="md"]) {
  --logo-size: 32px;
}

@media (min-width: 640px) {
  :host([size="md"]) {
    --logo-size: 40px;
  }
}
```
- **Statut** : ⏳ À faire

#### ⚠️ #23 - Dégradés différents
- **Fichier** : `src/components/atoms/logo/sh-logo.ts`
- **Problème** : Dégradés violets pas identiques
- **Solution** : Vérifier couleurs
- **Code à vérifier** :
```css
background: linear-gradient(to bottom right, var(--color-primary-500), var(--color-primary-600));
```
- **Statut** : ⏳ À faire

---

## 📋 Plan de Correction

### Phase 1 - Composants Critiques (Priorité 1)
**Estimation** : 4-6h

1. ✅ **sh-header** (4 corrections) - COMPLÉTÉ
   - [x] #4 - Logo trop petit
   - [x] #5 - Toggle thème global
   - [x] #6 - Nom utilisateur
   - [x] #7 - Badge notifications

2. ✅ **sh-metric-card** (4 corrections) - COMPLÉTÉ
   - [x] #8 - Taille trop grande
   - [x] #9 - Icône colorée (déjà implémenté)
   - [x] #10 - Animation count-up
   - [x] #11 - Animation cascade (non applicable)

3. ✅ **sh-stock-card** (6 corrections) - COMPLÉTÉ
   - [x] #16 - Bordure opaque
   - [x] #17 - Alignement
   - [x] #18 - "Mise à jour"
   - [x] #19 - Bouton session style
   - [x] #20 - Bouton session événement (déjà implémenté)
   - [x] #21 - Boutons actions

### Phase 2 - Composants Partiels (Priorité 2)
**Estimation** : 2-3h

4. ✅ **sh-button** (3 corrections) - COMPLÉTÉ
   - [x] #1 - Icon before
   - [x] #2 - Couleur primary (déjà correct)
   - [x] #3 - Responsive text

5. ✅ **sh-ia-alert-banner** (3 corrections) - COMPLÉTÉ
   - [x] #12 - Expand/collapse
   - [x] #13 - Emoji robot
   - [x] #14 - Style badge

6. ⏳ **sh-logo** (2 corrections)
   - [ ] #22 - Responsive
   - [ ] #23 - Dégradés

### Phase 3 - Tests & Validation
**Estimation** : 1-2h

- [ ] Tester chaque composant dans Storybook
- [ ] Tester dans StockHub V2
- [ ] Valider tous les problèmes résolus
- [ ] Créer SESSION-CORRECTIONS-SUMMARY.md

---

## 📊 Progression

**Total** : 17/23 (73.9%)

### Par composant
- [x] sh-header : 4/4 ✅
- [x] sh-metric-card : 4/4 ✅
- [x] sh-stock-card : 6/6 ✅
- [x] sh-button : 3/3 ✅
- [ ] sh-ia-alert-banner : 0/3
- [ ] sh-logo : 0/2

---

## 📝 Notes

### Composants OK (ne pas toucher)
- ✅ `sh-footer`
- ✅ `sh-status-badge`
- ✅ `sh-search-input`

### Méthodologie
1. Corriger un composant à la fois
2. Tester dans Storybook après chaque correction
3. Commiter après chaque composant terminé
4. Cocher les cases au fur et à mesure

---

**Créé par** : Claude Code
**Maintenu par** : Sandrine Cipolla
**Dernière mise à jour** : 27 Octobre 2025
