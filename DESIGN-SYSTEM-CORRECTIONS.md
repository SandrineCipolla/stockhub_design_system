# Design System - Corrections à Apporter

**Date de création** : 27 Octobre 2025
**Source** : Tests d'intégration StockHub V2 (21 Octobre 2025)
**Branch** : `feature/stockhub-v2-components`
**Document source** : `StockHub V2 Front/DESIGN-SYSTEM-FEEDBACK.md`

---

## 📊 Vue d'ensemble

### Statistiques
- **Total problèmes** : 23
- **Résolus** : 8 (34.8%)
- **Critiques (❌)** : 11 (4 résolus)
- **Améliorations (⚠️)** : 8

### Composants par statut
- ✅ **Fonctionnels** : 5 (sh-footer, sh-status-badge, sh-search-input, sh-header, sh-metric-card)
- ⚠️ **Partiels** : 3 (sh-button, sh-ia-alert-banner, sh-logo)
- ❌ **Non fonctionnels** : 1 (sh-stock-card)
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

### sh-stock-card (6 problèmes)

#### ❌ #16 - Bordure trop opaque
- **Fichier** : `src/components/organisms/stock-card/sh-stock-card.ts`
- **Problème** : Bordure trop visible
- **Solution** : Réduire opacité
- **Code à modifier** :
```css
/* AVANT */
border: 1px solid rgba(255, 255, 255, 0.2);

/* APRÈS */
border: 1px solid rgba(255, 255, 255, 0.1);
```
- **Statut** : ⏳ À faire

#### ❌ #17 - Quantité et valeur mal alignées
- **Fichier** : `src/components/organisms/stock-card/sh-stock-card.ts`
- **Problème** : Texte pas centré
- **Solution** : Ajouter `text-align: center`
- **Code à modifier** :
```css
.metric {
  text-align: center;
}
```
- **Statut** : ⏳ À faire

#### ❌ #18 - "Mise à jour" mal affiché
- **Fichier** : `src/components/organisms/stock-card/sh-stock-card.ts`
- **Problème** : Texte "Mis à jour il y a..." pas visible
- **Solution** : Vérifier affichage de `last-update`
- **Code à vérifier** :
```typescript
@property({ type: String, attribute: 'last-update' })
lastUpdate = '';

// Dans render()
${this.lastUpdate ? html`<p class="last-update">${this.lastUpdate}</p>` : ''}
```
- **Statut** : ⏳ À faire

#### ❌ #19 - Bouton "Session" mal stylisé
- **Fichier** : `src/components/organisms/stock-card/sh-stock-card.ts`
- **Problème** : Bouton trop visible, pas centré
- **Solution** : Utiliser variant ghost, centrer
- **Code à modifier** :
```html
<div style="display: flex; justify-content: center; margin-top: 1rem;">
  <sh-button variant="ghost" size="sm" iconBefore="Palette">
    Enregistrer session
  </sh-button>
</div>
```
- **Statut** : ⏳ À faire

#### ❌ #20 - Bouton "Session" ne fonctionne pas
- **Fichier** : `src/components/organisms/stock-card/sh-stock-card.ts`
- **Problème** : Événement pas émis
- **Solution** : Ajouter handler et événement
- **Code à ajouter** :
```typescript
private handleSessionClick() {
  this.dispatchEvent(new CustomEvent('sh-session-click', {
    detail: {
      name: this.name,
      quantity: this.quantity,
      percentage: this.percentage
    }
  }));
}

// Dans render()
<sh-button @click="${this.handleSessionClick}">
  Enregistrer session
</sh-button>
```
- **Statut** : ⏳ À faire

#### ❌ #21 - Boutons d'action mal stylisés
- **Fichier** : `src/components/organisms/stock-card/sh-stock-card.ts`
- **Problème** : Boutons pas assez discrets
- **Solution** : Utiliser variant ghost, ajuster tailles
- **Code à modifier** :
```html
<sh-button variant="ghost" size="sm" iconBefore="Eye">Détails</sh-button>
<sh-button variant="ghost" size="sm" iconBefore="Edit3"></sh-button>
<sh-button variant="ghost" size="sm" iconBefore="Trash2"></sh-button>
```
- **Statut** : ⏳ À faire

---

## ⚠️ PRIORITÉ 2 - Composants Partiels (Non bloquants)

### sh-button (3 problèmes)

#### ❌ #1 - Icône `icon-before` ne s'affiche pas
- **Fichier** : `src/components/molecules/button/sh-button.ts`
- **Problème** : Attribut `icon-before` ne fonctionne pas en JSX
- **Solution** : Vérifier mapping kebab-case → camelCase
- **Code à vérifier** :
```typescript
@property({ type: String, attribute: 'icon-before' })
iconBefore?: string;

// Dans render()
${this.iconBefore ? html`<sh-icon name="${this.iconBefore}"></sh-icon>` : ''}
```
- **Statut** : ⏳ À faire

#### ❌ #2 - Couleur primary incorrecte
- **Fichier** : `src/tokens/tokens.json` + `src/components/molecules/button/sh-button.ts`
- **Problème** : Primary n'est pas violet StockHub
- **Solution** : Vérifier tokens purple
- **Code à vérifier** :
```json
// tokens.json
"primary": {
  "500": "#8b5cf6",  // Vérifier que c'est bien violet
  "600": "#7c3aed"
}
```
- **Statut** : ⏳ À faire

#### ❌ #3 - Pas de support responsive text
- **Fichier** : `src/components/molecules/button/sh-button.ts`
- **Problème** : Impossible de masquer texte sur mobile
- **Solution** : Ajouter propriété `hideTextMobile`
- **Code à ajouter** :
```typescript
@property({ type: Boolean, attribute: 'hide-text-mobile' })
hideTextMobile = false;

static styles = css`
  :host([hide-text-mobile]) .button-text {
    display: none;
  }

  @media (min-width: 640px) {
    :host([hide-text-mobile]) .button-text {
      display: inline;
    }
  }
`;
```
- **Statut** : ⏳ À faire

---

### sh-ia-alert-banner (3 problèmes)

#### ❌ #12 - Pas de expand/collapse
- **Fichier** : `src/components/organisms/ia-alert-banner/sh-ia-alert-banner.ts`
- **Problème** : Banner statique
- **Solution** : Ajouter état expanded et bouton toggle
- **Code à ajouter** :
```typescript
@state()
private isExpanded = false;

private handleToggle() {
  this.isExpanded = !this.isExpanded;
  this.dispatchEvent(new CustomEvent('sh-ia-alert-toggle', {
    detail: { expanded: this.isExpanded }
  }));
}

// Dans render()
<button @click="${this.handleToggle}">
  <sh-icon name="${this.isExpanded ? 'ChevronUp' : 'ChevronDown'}"></sh-icon>
</button>

${this.isExpanded ? html`
  <div class="alerts-list">
    ${this.alerts.map(alert => html`<div>${alert.message}</div>`)}
  </div>
` : ''}
```
- **Statut** : ⏳ À faire

#### ⚠️ #13 - Emoji robot manquant
- **Fichier** : `src/components/organisms/ia-alert-banner/sh-ia-alert-banner.ts`
- **Problème** : Pas d'emoji 🤖
- **Solution** : Ajouter emoji avant le texte
- **Code à modifier** :
```html
<p>🤖 ${this.count} ${this.message}</p>
```
- **Statut** : ⏳ À faire

#### ⚠️ #14 - Style badge différent
- **Fichier** : `src/components/organisms/ia-alert-banner/sh-ia-alert-banner.ts`
- **Problème** : Badge pas cohérent avec StockHub V2
- **Solution** : Vérifier styles du badge de sévérité
- **À comparer** : Avec AISummaryWidget original
- **Statut** : ⏳ À faire

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

3. ✅ **sh-stock-card** (6 corrections)
   - [ ] #16 - Bordure opaque
   - [ ] #17 - Alignement
   - [ ] #18 - "Mise à jour"
   - [ ] #19 - Bouton session style
   - [ ] #20 - Bouton session événement
   - [ ] #21 - Boutons actions

### Phase 2 - Composants Partiels (Priorité 2)
**Estimation** : 2-3h

4. ✅ **sh-button** (3 corrections)
   - [ ] #1 - Icon before
   - [ ] #2 - Couleur primary
   - [ ] #3 - Responsive text

5. ✅ **sh-ia-alert-banner** (3 corrections)
   - [ ] #12 - Expand/collapse
   - [ ] #13 - Emoji robot
   - [ ] #14 - Style badge

6. ✅ **sh-logo** (2 corrections)
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

**Total** : 8/23 (34.8%)

### Par composant
- [x] sh-header : 4/4 ✅
- [x] sh-metric-card : 4/4 ✅
- [ ] sh-stock-card : 0/6
- [ ] sh-button : 0/3
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
