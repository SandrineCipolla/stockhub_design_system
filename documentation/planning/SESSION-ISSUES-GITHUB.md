3# Session : Résolution Issues GitHub Design System

**Date de création** : 11 Novembre 2025
**Durée estimée** : 1h30 (quick wins) ou 3h30 (avec audit responsive)
**Objectif** : Résoudre les 5 issues ouvertes identifiées dans le projet GitHub

---

## ✅ ISSUES RÉSOLUES

### Issue #11 - Doublon d'icônes bannière IA ✅ FERMÉE

**Date résolution** : 11 Novembre 2025
**Temps réel** : 30 min (investigation + fix)
**Status** : ✅ Fixed in stockhub_v2_front

#### 🔍 Diagnostic initial (erroné)
L'issue suggérait que le doublon venait de :
- Puce CSS `•` (::before)
- Icône `<sh-icon name="AlertTriangle">` du DS

**Solution proposée** : Retirer l'icône AlertTriangle du DS

#### 💡 Vrai problème découvert
Après investigation dans le frontend, le doublon venait en réalité de :
1. **Emoji ⚠️** hardcodé dans le titre de la suggestion IA (`aiPredictions.ts:333`)
2. **Icône AlertTriangle** affichée par le composant DS `sh-ia-alert-banner`

**Résultat visuel avant fix** :
```
• Acrylique Rouge Vermillon ⚠️ ⚠️ Risque de rupture détecté
  (puce CSS)               (emoji) (icône DS)
```

#### ✅ Solution appliquée
**Fichier modifié** : `stockhub_v2_front/src/utils/aiPredictions.ts`
- Ligne 333 : `title: '⚠️ Risque de rupture détecté'` → `title: 'Risque de rupture détecté'`
- **Aucune modification requise dans le Design System**

**Résultat visuel après fix** :
```
• Acrylique Rouge Vermillon ⚠️ Risque de rupture détecté
  (puce CSS)               (icône DS)
```

#### 📝 Commit
```bash
# Frontend (stockhub_v2_front)
git commit -m "fix: remove duplicate warning emoji from IA alert titles"
```

#### 🎯 Apprentissages
- Le doublon n'était pas dans le DS mais dans le contenu passé par le frontend
- Toujours vérifier la source des données avant de modifier les composants
- L'issue GitHub pointait vers le mauvais repository (DS au lieu de frontend)

---

## 📊 Vue d'Ensemble

**Issues à traiter** : 5
- ✅ **1 issue fermée** (#11)
- 🔴 **3 issues actives** (#9, #10, #12)
- ⚠️ **1 audit à planifier** (#13)

**Temps total estimé** :
- Quick wins (#9, #11, #12) : ~17 min
- Issue moyenne (#10) : ~30 min
- Audit complet (#13) : ~2h

**Stratégie** : Commencer par les quick wins pour améliorer l'UX rapidement

---

## ✅ PHASE 1 : Quick Wins (17 minutes)

### Issue #11 - Doublon d'icônes bannière IA (2 min)

**Fichier** : `src/components/organisms/ia-alert-banner/sh-ia-alert-banner.ts`

#### Tâches
- [ ] Ouvrir `sh-ia-alert-banner.ts`
- [ ] Aller à la ligne 373
- [ ] Supprimer la ligne contenant `<sh-icon name="AlertTriangle" size="xs" class="warning-icon"></sh-icon>`
- [ ] Vérifier que la puce `•` via CSS `::before` est toujours présente
- [ ] Sauvegarder

#### Validation
- [ ] Lancer Storybook : `npm run storybook`
- [ ] Ouvrir story `IaAlertBanner` → `Critical`
- [ ] Développer la liste des alertes
- [ ] Vérifier : Une seule puce `•` par ligne (pas d'icône AlertTriangle)

#### Commit
```bash
git add src/components/organisms/ia-alert-banner/sh-ia-alert-banner.ts
git commit -m "fix(ia-alert-banner): remove duplicate AlertTriangle icon

Removes redundant AlertTriangle icon from alert list items.
The CSS ::before pseudo-element already displays a bullet point.

Fixes #11"
```

---

### Issue #9 - Padding bouton insuffisant (5 min)

**Fichier** : `src/tokens/design-tokens.css`

#### Tâches
- [ ] Ouvrir `src/tokens/design-tokens.css`
- [ ] Aller à la ligne 164
- [ ] Modifier `--component-button-padding-md: 8px 12px;`
- [ ] Nouvelle valeur : `--component-button-padding-md: 10px 16px;`
- [ ] Sauvegarder

#### Validation
- [ ] Lancer Storybook : `npm run storybook`
- [ ] Ouvrir story `Button` → `AllVariants`
- [ ] Vérifier visuellement : boutons `md` ont plus d'espace autour du texte
- [ ] Tester `size="md"` avec/sans icône
- [ ] Vérifier que `sm` et `lg` ne sont pas affectés

#### Commit
```bash
git add src/tokens/design-tokens.css
git commit -m "fix(button): increase md size padding for better visual presence

Changes padding from 8px 12px to 10px 16px (+2px vertical, +4px horizontal).
Improves button visual presence without requiring size='lg'.

Fixes #9"
```

---

### Issue #12 - Centrage icônes mobile (10 min)

**Fichier** : `src/components/molecules/button/sh-button.ts`

#### Tâches
- [ ] Ouvrir `sh-button.ts`
- [ ] Aller à la section responsive (lignes 266-275)
- [ ] Ajouter les styles suivants après la ligne 269 :

```css
:host([hide-text-mobile]) button {
  justify-content: center;
  min-width: var(--component-button-height-md); /* Assure un bouton carré */
}

@media (min-width: 640px) {
  :host([hide-text-mobile]) button {
    justify-content: flex-start; /* Retour à l'alignement normal */
    min-width: auto;
  }
}
```

- [ ] Sauvegarder

#### Validation
- [ ] Lancer Storybook : `npm run storybook`
- [ ] Ouvrir story `Button` → `ResponsiveText`
- [ ] Réduire la fenêtre à < 640px (mobile)
- [ ] Vérifier : icônes parfaitement centrées dans les boutons carrés
- [ ] Agrandir fenêtre > 640px (desktop)
- [ ] Vérifier : texte réapparaît, alignement normal

#### Commit
```bash
git add src/components/molecules/button/sh-button.ts
git commit -m "fix(button): center icons properly in mobile mode

When hide-text-mobile is active, buttons now:
- Use justify-content: center for perfect icon centering
- Have min-width equal to button height (square shape)
- Revert to normal alignment on desktop (≥640px)

Fixes #12"
```

---

## ✅ PHASE 2 : Issue Moyenne (30 minutes)

### Issue #10 - Badge IA couleur adaptative (30 min)

**Fichier** : `src/components/organisms/stock-card/sh-stock-card.ts`

#### Tâches

##### Étape 1 : Ajouter la propriété (ligne ~50)
- [ ] Ouvrir `sh-stock-card.ts`
- [ ] Trouver la section des `@property`
- [ ] Ajouter après les autres props :

```typescript
@property({ attribute: 'ia-severity', reflect: true })
iaSeverity: 'info' | 'warning' | 'critical' = 'info';
```

##### Étape 2 : Modifier les styles CSS (lignes 187-197)
- [ ] Trouver la classe `.ia-badge` (ligne ~192)
- [ ] Remplacer le bloc existant par :

```css
.ia-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: var(--color-primary-600); /* Bleu par défaut (info) */
  color: white;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-fontSize-xs);
  font-weight: var(--font-fontWeight-semibold);
}

/* Badge Warning/Medium */
:host([ia-severity="warning"]) .ia-badge {
  background: var(--color-warning-600);
}

/* Badge Critical/High */
:host([ia-severity="critical"]) .ia-badge {
  background: var(--color-danger-600);
}
```

##### Étape 3 : Mettre à jour la story
- [ ] Ouvrir `sh-stock-card.stories.ts`
- [ ] Trouver la story avec suggestions IA (probablement `WithIASuggestions` ou `Default`)
- [ ] Ajouter des exemples avec différentes sévérités :

```typescript
// Exemple critical
{
  ...args,
  'ia-suggestions-count': 3,
  'ia-severity': 'critical'
}

// Exemple warning
{
  ...args,
  'ia-suggestions-count': 2,
  'ia-severity': 'warning'
}

// Exemple info (par défaut)
{
  ...args,
  'ia-suggestions-count': 1,
  'ia-severity': 'info'
}
```

#### Validation
- [ ] Lancer Storybook : `npm run storybook`
- [ ] Ouvrir story `StockCard` avec suggestions IA
- [ ] Vérifier les 3 couleurs de badge :
  - 🔵 Bleu (info) : `ia-severity="info"`
  - 🟠 Orange (warning) : `ia-severity="warning"`
  - 🔴 Rouge (critical) : `ia-severity="critical"`
- [ ] Vérifier en dark mode
- [ ] Vérifier avec compteur 99+

#### Documentation
- [ ] Ouvrir `documentation/COMPONENT-DOCUMENTATION.md`
- [ ] Trouver la section `sh-stock-card`
- [ ] Ajouter la nouvelle prop dans la documentation :

```markdown
#### Props
- `ia-severity` : `'info' | 'warning' | 'critical'` (défaut: `'info'`)
  - Adapte la couleur du badge IA selon la priorité des suggestions
  - `info` : bleu (suggestions basses priorités)
  - `warning` : orange (suggestions moyennes priorités)
  - `critical` : rouge (suggestions hautes priorités)
```

#### Note pour StockHub V2
- [ ] Créer note dans `DESIGN-SYSTEM-CORRECTIONS.md` :

```markdown
### sh-stock-card - Badge IA adaptatif

**Changement** : Ajout de la prop `ia-severity`

**Action requise côté front (StockHub V2)** :
1. Calculer la sévérité maximale des suggestions IA pour chaque stock
2. Passer la prop lors du render :
   ```tsx
   <sh-stock-card
     ia-suggestions-count={suggestions.length}
     ia-severity={getMaxSeverity(suggestions)} // 'info' | 'warning' | 'critical'
   />
   ```
```

#### Commit
```bash
git add src/components/organisms/stock-card/sh-stock-card.ts
git add src/components/organisms/stock-card/sh-stock-card.stories.ts
git add documentation/COMPONENT-DOCUMENTATION.md
git add DESIGN-SYSTEM-CORRECTIONS.md
git commit -m "feat(stock-card): add adaptive color for IA badge based on severity

Adds 'ia-severity' prop to dynamically color the IA badge:
- info (blue): low priority suggestions
- warning (orange): medium priority suggestions
- critical (red): high priority suggestions

Breaking: Requires front-end to pass ia-severity prop.
Default remains 'info' (blue) if not specified.

Fixes #10"
```

---

## ✅ PHASE 3 : Build & Tests Globaux (10 min)

### Build du Design System
- [ ] Arrêter Storybook
- [ ] Lancer build : `npm run build:lib`
- [ ] Vérifier absence d'erreurs TypeScript
- [ ] Vérifier fichiers générés dans `dist/`

### Rebuild Storybook
- [ ] Lancer build Storybook : `npm run build-storybook`
- [ ] Vérifier absence d'erreurs
- [ ] (Optionnel) Ouvrir `storybook-static/index.html` pour vérifier

### Tests d'Interaction
- [ ] Lancer tests : `npm run test-storybook`
- [ ] Vérifier que tous les tests passent
- [ ] Si échecs : corriger et relancer

### Custom Elements Manifest
- [ ] Regénérer : `npm run analyze`
- [ ] Vérifier que `custom-elements.json` est mis à jour avec nouvelle prop `iaSeverity`

---

## ✅ PHASE 4 : Documentation & Commit Final (10 min)

### Mettre à jour CHANGELOG.md
- [ ] Ouvrir `9-CHANGELOG.md`
- [ ] Ajouter section dans `[Unreleased]` :

```markdown
## [Unreleased]

### 🐛 Corrections Issues GitHub

#### Issue #11 - Doublon d'icônes bannière IA
- **Composant** : `sh-ia-alert-banner`
- **Fix** : Suppression de l'icône `AlertTriangle` redondante dans la liste des alertes
- **Impact** : Liste plus épurée, une seule puce par ligne

#### Issue #9 - Padding bouton insuffisant
- **Composant** : `sh-button` (design tokens)
- **Fix** : Padding `md` augmenté de `8px 12px` à `10px 16px`
- **Impact** : Meilleure présence visuelle des boutons sans nécessiter `size="lg"`

#### Issue #12 - Centrage icônes mobile
- **Composant** : `sh-button`
- **Fix** : Ajout `justify-content: center` pour mode `hide-text-mobile`
- **Impact** : Icônes parfaitement centrées dans boutons carrés en mobile

### ✨ Nouvelles Fonctionnalités

#### Issue #10 - Badge IA adaptatif selon sévérité
- **Composant** : `sh-stock-card`
- **Nouvelle prop** : `ia-severity: 'info' | 'warning' | 'critical'`
- **Comportement** :
  - `info` (défaut) : Badge bleu (suggestions basses priorités)
  - `warning` : Badge orange (suggestions moyennes priorités)
  - `critical` : Badge rouge (suggestions hautes priorités)
- **Breaking change** : Nécessite que le front-end calcule et passe la sévérité
- **Migration** : Voir `DESIGN-SYSTEM-CORRECTIONS.md`
```

### Mettre à jour DESIGN-SYSTEM-CORRECTIONS.md
- [ ] Ajouter section "Session Issues GitHub - 11 Novembre 2025"
- [ ] Documenter les 4 corrections appliquées
- [ ] Ajouter note migration pour `ia-severity`

### README.md
- [ ] Vérifier que les exemples `sh-stock-card` incluent la nouvelle prop (optionnel)

---

## ✅ PHASE 5 : Push & Fermeture Issues (5 min)

### Push vers GitHub
```bash
# Vérifier status
git status

# Si tout est commité
git push origin master

# Si pas encore commité les docs
git add 9-CHANGELOG.md DESIGN-SYSTEM-CORRECTIONS.md
git commit -m "docs: update changelog and corrections for issues #9-#12"
git push origin master
```

### Fermer les issues sur GitHub
- [ ] Aller sur https://github.com/SandrineCipolla/stockhub_design_system/issues
- [ ] Fermer issue #11 avec commentaire : "Fixed in commit [hash]"
- [ ] Fermer issue #9 avec commentaire : "Fixed in commit [hash]"
- [ ] Fermer issue #12 avec commentaire : "Fixed in commit [hash]"
- [ ] Fermer issue #10 avec commentaire : "Fixed in commit [hash] - Requires front-end integration"
- [ ] Laisser issue #13 ouverte (audit à planifier)

---

## ⏸️ PHASE OPTIONNELLE : Audit Responsive (#13) - 2h

**À faire dans une session dédiée séparée**

### Préparation
- [ ] Créer branche : `git checkout -b feature/responsive-audit`
- [ ] Créer document `documentation/AUDIT-RESPONSIVE.md`

### sh-metric-card
- [ ] Ouvrir story `MetricCard` → `DashboardExample`
- [ ] Tester breakpoints : 320px, 375px, 768px, 1024px
- [ ] Vérifier espacement entre cards
- [ ] Vérifier gap en mode mobile
- [ ] Noter problèmes dans AUDIT-RESPONSIVE.md

### sh-button (hide-text-mobile)
- [ ] Déjà corrigé en Phase 1 (#12) ✅
- [ ] Valider à nouveau après corrections

### sh-stock-card
- [ ] Ouvrir story `StockCard` → `Default`
- [ ] Tester largeur mobile vs desktop
- [ ] Vérifier layout métriques (grid 2 colonnes)
- [ ] Vérifier responsive boutons actions
- [ ] Noter problèmes

### sh-ia-alert-banner
- [ ] Ouvrir story `IaAlertBanner` → `Critical`
- [ ] Tester collapse/expand en mobile
- [ ] Vérifier espacement en mobile
- [ ] Vérifier lisibilité texte
- [ ] Noter problèmes

### sh-footer
- [ ] Ouvrir story `Footer` → `Mobile`
- [ ] Vérifier liens empilés verticalement
- [ ] Vérifier espacement
- [ ] Vérifier lisibilité
- [ ] Noter problèmes

### sh-header
- [ ] Ouvrir story `Header` → `Default`
- [ ] Tester breakpoints (nom utilisateur masqué < 768px)
- [ ] Vérifier icônes notifications/theme/logout
- [ ] Vérifier logo responsive
- [ ] Noter problèmes

### Créer issues si nécessaire
- [ ] Pour chaque problème trouvé : créer issue GitHub dédiée
- [ ] Labelliser : `responsive`, `ux`, priorité appropriée
- [ ] Estimer temps de correction

### Commit audit
```bash
git add documentation/AUDIT-RESPONSIVE.md
git commit -m "docs: responsive design audit report for all components"
git push origin feature/responsive-audit
```

### Fermer issue #13
- [ ] Commenter avec lien vers le document d'audit
- [ ] Lister les nouvelles issues créées suite à l'audit
- [ ] Fermer l'issue

---

## 📊 Métriques Session

### Temps estimé par phase
- Phase 1 (Quick wins) : 17 min
- Phase 2 (Issue moyenne) : 30 min
- Phase 3 (Build & Tests) : 10 min
- Phase 4 (Documentation) : 10 min
- Phase 5 (Push & Issues) : 5 min
- **Total (Phases 1-5)** : ~1h12

- Phase Optionnelle (Audit #13) : 2h
- **Total avec audit** : ~3h12

### Fichiers modifiés (Phases 1-5)
- `src/components/organisms/ia-alert-banner/sh-ia-alert-banner.ts` (1 ligne supprimée)
- `src/tokens/design-tokens.css` (1 ligne modifiée)
- `src/components/molecules/button/sh-button.ts` (~10 lignes ajoutées)
- `src/components/organisms/stock-card/sh-stock-card.ts` (~20 lignes modifiées/ajoutées)
- `src/components/organisms/stock-card/sh-stock-card.stories.ts` (~15 lignes ajoutées)
- `documentation/COMPONENT-DOCUMENTATION.md` (~10 lignes ajoutées)
- `9-CHANGELOG.md` (~40 lignes ajoutées)
- `DESIGN-SYSTEM-CORRECTIONS.md` (~20 lignes ajoutées)

**Total** : 8 fichiers, ~117 lignes

### Issues résolues
- ✅ #9 - Padding bouton
- ✅ #10 - Badge IA adaptatif
- ✅ #11 - Doublon icônes
- ✅ #12 - Centrage mobile
- ⏸️ #13 - Audit responsive (reporté)

---

## 🚀 Prochaines Étapes

Après cette session :
1. **Notifier StockHub V2** du nouveau prop `ia-severity` (#10)
2. **Réinstaller DS** dans StockHub V2 : `npm install github:SandrineCipolla/stockhub_design_system`
3. **Planifier session audit responsive** (#13)
4. **Tester intégration** dans StockHub V2

---

## 📝 Notes

### Priorité des corrections
1. **Quick wins** (#11, #9, #12) : Impact UX immédiat, effort minimal
2. **Badge IA adaptatif** (#10) : Amélioration UX significative, coordination front requise
3. **Audit responsive** (#13) : Approfondi, nécessite session dédiée

### Breaking Changes
⚠️ **Issue #10** introduit une nouvelle prop `ia-severity` sur `sh-stock-card`.
- Le composant reste **backward compatible** (valeur par défaut : `'info'`)
- Mais pour bénéficier des couleurs adaptatives, le front doit passer la prop

### Coordination avec StockHub V2
Après merge de ces corrections, créer issue dans `stockhub_v2_front` :
```markdown
Title: feat: integrate DS ia-severity prop for adaptive badge colors

Tasks:
- [ ] Upgrade @stockhub/design-system to latest
- [ ] Calculate max severity per stock from AI suggestions
- [ ] Pass ia-severity prop to <sh-stock-card>
- [ ] Test all severity levels (info/warning/critical)
```

---

**Créé par** : Claude Code
**Dernière mise à jour** : 11 Novembre 2025
**Statut** : ✅ Prêt pour exécution
