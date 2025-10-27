# Design System - Corrections à Apporter

**Date de création** : 27 Octobre 2025
**Source** : Tests d'intégration StockHub V2 (21 Octobre 2025)
**Branch** : `feature/stockhub-v2-components`
**Document source** : `StockHub V2 Front/DESIGN-SYSTEM-FEEDBACK.md`

---

## 📊 Vue d'ensemble

### Statistiques
- **Total problèmes** : 23
- **Critiques (❌)** : 15
- **Améliorations (⚠️)** : 8

### Composants par statut
- ✅ **Fonctionnels** : 3 (sh-footer, sh-status-badge, sh-search-input)
- ⚠️ **Partiels** : 3 (sh-button, sh-ia-alert-banner, sh-logo)
- ❌ **Non fonctionnels** : 3 (sh-header, sh-metric-card, sh-stock-card)
- ⏭️ **Non testés** : 1 (sh-badge)

---

## 🔴 PRIORITÉ 1 - Composants Non Fonctionnels (Bloquants)

### sh-header (7 problèmes)

#### ❌ #4 - Logo trop petit
- **Fichier** : `src/components/organisms/header/sh-header.ts`
- **Problème** : Le logo est plus petit que dans le Header React original
- **Solution** : Augmenter la taille du logo
- **Ligne à modifier** : Styles du `<sh-logo>`
- **Statut** : ⏳ À faire

#### ❌ #5 - Toggle thème ne fonctionne pas globalement
- **Fichier** : `src/components/organisms/header/sh-header.ts`
- **Problème** : Le toggle ne change que le header, pas toute l'app
- **Solution** : Émettre un événement `theme-change` sur le `document`
- **Code à ajouter** :
```typescript
private handleThemeToggle() {
  const newTheme = this.theme === 'dark' ? 'light' : 'dark';

  // Émettre sur document pour propagation globale
  document.dispatchEvent(new CustomEvent('theme-change', {
    detail: { theme: newTheme },
    bubbles: true,
    composed: true
  }));

  this.dispatchEvent(new CustomEvent('sh-theme-toggle', {
    detail: { theme: newTheme }
  }));
}
```
- **Statut** : ⏳ À faire

#### ❌ #6 - Nom utilisateur ne s'affiche pas
- **Fichier** : `src/components/organisms/header/sh-header.ts`
- **Problème** : Affiche "Utilisateur" au lieu de la valeur de `user-name`
- **Solution** : Vérifier mapping `user-name` → `userName`
- **Code à vérifier** :
```typescript
@property({ type: String, attribute: 'user-name' })
userName = 'Utilisateur';

// Dans render()
${this.userName}  // Vérifier que c'est bien utilisé
```
- **Statut** : ⏳ À faire

#### ❌ #7 - Badge de notifications vide
- **Fichier** : `src/components/organisms/header/sh-header.ts`
- **Problème** : Le compteur ne s'affiche pas malgré `notification-count={3}`
- **Solution** : Vérifier condition d'affichage
- **Code à vérifier** :
```typescript
@property({ type: Number, attribute: 'notification-count' })
notificationCount = 0;

// Dans render()
${this.notificationCount > 0 ? html`<span>${this.notificationCount}</span>` : ''}
```
- **Statut** : ⏳ À faire

---

### sh-metric-card (4 problèmes)

#### ❌ #8 - Taille trop grande
- **Fichier** : `src/components/molecules/metric-card/sh-metric-card.ts`
- **Problème** : Padding trop important, police trop grande
- **Solution** : Réduire padding et font-size pour matcher StockHub V2
- **Valeurs à ajuster** :
  - Padding : `1.5rem` → `1rem`
  - Font-size label : `0.875rem` → `0.75rem`
  - Font-size value : `2rem` → `1.5rem`
- **Statut** : ⏳ À faire

#### ❌ #9 - Icône non colorée selon variant
- **Fichier** : `src/components/molecules/metric-card/sh-metric-card.ts`
- **Problème** : L'icône est grise au lieu d'avoir la couleur du variant
- **Solution** : Appliquer la couleur du variant à l'icône
- **Code à ajouter** :
```typescript
// Dans render()
<sh-icon
  name="${this.icon}"
  color="${this.variant === 'success' ? 'success' :
         this.variant === 'warning' ? 'warning' :
         this.variant === 'danger' ? 'danger' :
         this.variant === 'info' ? 'primary' : 'inherit'}"
></sh-icon>
```
- **Statut** : ⏳ À faire

#### ❌ #10 - Animation count-up manquante
- **Fichier** : `src/components/molecules/metric-card/sh-metric-card.ts`
- **Problème** : Le nombre s'affiche instantanément
- **Solution** : Ajouter animation de comptage progressif
- **Code à ajouter** :
```typescript
@state()
private displayValue = 0;

firstUpdated() {
  this.animateValue(0, parseInt(this.value) || 0, 1000);
}

private animateValue(start: number, end: number, duration: number) {
  const range = end - start;
  const startTime = performance.now();

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    this.displayValue = Math.floor(start + range * progress);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
}
```
- **Statut** : ⏳ À faire

#### ❌ #11 - Animation cascade manquante
- **Fichier** : `src/components/molecules/metric-card/sh-metric-card.ts`
- **Problème** : Toutes les cards apparaissent simultanément
- **Solution** : Ajouter support pour délai d'animation via index
- **Code à ajouter** :
```typescript
@property({ type: Number })
index = 0;

static styles = css`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  :host {
    animation: fadeInUp 0.4s ease-out;
    animation-delay: calc(var(--index, 0) * 100ms);
    animation-fill-mode: both;
  }
`;

// Dans render()
style="--index: ${this.index}"
```
- **Statut** : ⏳ À faire

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

1. ✅ **sh-header** (7 corrections)
   - [ ] #4 - Logo trop petit
   - [ ] #5 - Toggle thème global
   - [ ] #6 - Nom utilisateur
   - [ ] #7 - Badge notifications

2. ✅ **sh-metric-card** (4 corrections)
   - [ ] #8 - Taille trop grande
   - [ ] #9 - Icône colorée
   - [ ] #10 - Animation count-up
   - [ ] #11 - Animation cascade

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

**Total** : 0/23 (0%)

### Par composant
- [ ] sh-header : 0/7
- [ ] sh-metric-card : 0/4
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
