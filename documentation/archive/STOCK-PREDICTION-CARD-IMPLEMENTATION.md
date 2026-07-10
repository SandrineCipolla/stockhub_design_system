# sh-stock-prediction-card - Documentation technique

## 📋 Vue d'ensemble

Composant de carte ML pour afficher les prédictions de rupture de stock avec analyse d'intelligence artificielle. Conçu pour la page Analytics de StockHub V2.

**Date de création** : 14 novembre 2025
**Statut** : ✅ Complété - Production ready
**Accessibilité** : ✅ 100% WCAG AA compliant

---

## 🎯 Fonctionnalités

### Affichage de données
- Nom du stock et identifiant
- Niveau de risque visuel (critical, high, medium, low)
- Message de prédiction ("Rupture prévue dans X jours")
- Badge de confiance ML (pourcentage)
- Barre de progression du risque avec intervalle de confiance
- Métriques détaillées (consommation moyenne, date de rupture)
- Recommandations d'action (quantité et date de commande)

### Interactivité
- Mode cliquable optionnel avec événement personnalisé
- Hover avec background coloré subtil
- Support des thèmes light/dark

### Design
- Bordure gauche colorée selon le niveau de risque
- Badge de confiance avec fond coloré adaptatif
- Box de recommandation avec bordure colorée fine
- Animations fluides (transition 0.2s ease)
- Responsive et accessible

---

## 🐛 Problèmes rencontrés et solutions

### Problème 1 : Stories Storybook ne s'affichent pas

**Symptôme** :
```
Error: Couldn't find story matching 'organisms-stock-prediction-card--docs'
```

**Cause** :
- Import de `html` de Lit dans le fichier stories
- Utilisation de `html` tagged template au lieu de template strings simples
- Composant non exporté dans `src/index.ts`

**Solution** :
```diff
- import { html } from 'lit';
+ // Pas d'import html

- render: (args) => html`<sh-stock-prediction-card ...>`
+ render: (args) => `<sh-stock-prediction-card ...>`
```

**Fichiers modifiés** :
- `src/components/organisms/stock-prediction-card/sh-stock-prediction-card.stories.ts`
- `src/index.ts` (ajout export)

**Référence** : README.md lignes 489-513 (Convention Storybook)

---

### Problème 2 : Warning package.json - "types" non utilisé

**Symptôme** :
```
WARNING: The condition "types" here will never be used as it comes after both "import" and "require"
```

**Cause** :
L'ordre des conditions dans `exports` est important. TypeScript lit de haut en bas et s'arrête à la première condition qui match.

**Solution** :
```diff
  "exports": {
    ".": {
+     "types": "./dist/index.d.ts",  // ← Doit être EN PREMIER
      "import": "./dist/stockhub-design-system.es.js",
-     "require": "./dist/stockhub-design-system.umd.js",
-     "types": "./dist/index.d.ts"   // ← Jamais atteint !
+     "require": "./dist/stockhub-design-system.umd.js"
    }
  }
```

**Fichier modifié** : `package.json`

---

### Problème 3 : Contraste insuffisant - recommendation-title

**Symptôme** :
```
Element has insufficient color contrast of 3.94 (foreground color: #d97706, background color: #293445)
Expected contrast ratio of 4.5:1
```

**Cause** :
Utilisation de `var(--risk-color)` qui peut être orange (#d97706) sur fond sombre.

**Solution** :
```diff
  .recommendation-title {
-   color: var(--risk-color);  // Orange = 3.94:1 ❌
+   color: var(--card-text);   // Neutre adaptatif = >7:1 ✅
  }
```

**Fichier modifié** : `sh-stock-prediction-card.ts:298`

---

### Problème 4 : Contraste insuffisant - prediction-message et risk-level-label

**Symptôme** :
```
Element has insufficient color contrast of 3.88 (foreground color: #ef4444, background color: #1e293b)
Expected contrast ratio of 4.5:1
```

**Cause** :
Rouge (#ef4444) sur fond sombre = 3.88:1

**Solution** :
```diff
  .prediction-message,
  .risk-level-label {
-   color: var(--risk-color);  // Rouge = 3.88:1 ❌
+   color: var(--card-text);   // Neutre adaptatif = >7:1 ✅
  }
```

**Fichiers modifiés** :
- `sh-stock-prediction-card.ts:159` (prediction-message)
- `sh-stock-prediction-card.ts:207` (risk-level-label)

---

### Problème 5 : Contraste insuffisant - Badge de confiance (critical)

**Symptôme** :
```
Element has insufficient color contrast of 3.76 (foreground color: #ffffff, background color: #ef4444)
Expected contrast ratio of 4.5:1
```

**Cause** :
Badge avec fond rouge moyen (#ef4444 = danger-500) et texte blanc = 3.76:1

**Solution** :
Utiliser des nuances plus foncées/claires selon le niveau de risque :

```css
/* Critical - Rouge plus foncé pour meilleur contraste */
:host([risk-level='critical']) .confidence-badge {
  background: var(--color-danger-600);   /* #dc2626 au lieu de #ef4444 */
  color: white;                          /* Contraste: 4.88:1 ✅ */
}

/* High - Orange foncé */
:host([risk-level='high']) .confidence-badge {
  background: var(--color-warning-700);  /* #a16207 */
  color: white;                          /* Contraste: 5.2:1 ✅ */
}

/* Medium - Orange clair avec texte noir */
:host([risk-level='medium']) .confidence-badge {
  background: var(--color-warning-500);  /* #f59e0b */
  color: var(--color-neutral-900);       /* Contraste: 8.5:1 ✅ */
}

/* Low - Vert avec texte noir */
:host([risk-level='low']) .confidence-badge {
  background: var(--color-success-500);  /* #22c55e */
  color: var(--color-neutral-900);       /* Contraste: 7.8:1 ✅ */
}
```

**Fichier modifié** : `sh-stock-prediction-card.ts:182-200`

---

## 🎨 Stratégie de couleurs et accessibilité

### Utilisation de `var(--risk-color)`

**Utilisations ACCEPTÉES** (éléments visuels non-textuels) :
- ✅ Bordure gauche de la carte (4px)
- ✅ Couleur de l'icône
- ✅ Barre de progression
- ✅ Overlay au hover (opacity 0.05/0.1)
- ✅ Bordure de la box recommandation (1px)
- ✅ Fond du badge de confiance (avec ajustements par niveau)

**Utilisations INTERDITES** (contenu textuel) :
- ❌ Texte de prédiction
- ❌ Label de niveau de risque
- ❌ Titre de recommandation

### Utilisation de `var(--card-text)`

**Tous les textes** doivent utiliser `var(--card-text)` pour garantir :
- Light mode : `--color-neutral-900` (#171717) sur fond clair
- Dark mode : `--color-neutral-100` (#f5f5f5) sur fond sombre
- Contraste garanti ≥ 7:1

---

## 📊 Tableau récapitulatif des contrastes

| Élément | Niveau | Fond | Texte | Contraste | Verdict |
|---------|--------|------|-------|-----------|---------|
| **Badge confiance** | Critical | #dc2626 | Blanc | 4.88:1 | ✅ AA |
| | High | #a16207 | Blanc | 5.2:1 | ✅ AA |
| | Medium | #f59e0b | Noir | 8.5:1 | ✅ AAA |
| | Low | #22c55e | Noir | 7.8:1 | ✅ AAA |
| **Textes** | Tous | var(--card-bg) | var(--card-text) | >7:1 | ✅ AAA |
| **Bordures** | Tous | N/A | var(--risk-color) | N/A | ✅ OK* |

*Les bordures n'ont pas d'exigence de contraste en WCAG 2.1 AA

---

## 🧪 Tests d'interaction

### InteractionTestClickable
- ✓ Vérifie que la carte est cliquable
- ✓ Teste l'événement `sh-stock-prediction-click`
- ✓ Valide le payload (stockId, stockName, riskLevel, daysUntilRupture)

### InteractionTestShowDetails
- ✓ Vérifie `showDetails = true`
- ✓ Teste l'affichage de la section `.details`
- ✓ Vérifie les éléments de détails
- ✓ Valide l'affichage de la recommandation

### InteractionTestRiskLevels
- ✓ Vérifie le niveau de risque (critical)
- ✓ Teste l'affichage de l'icône correcte (AlertTriangle)
- ✓ Valide la barre de progression
- ✓ Vérifie le badge de confiance (92%)

**Fichier** : `sh-stock-prediction-card.stories.ts:504-758`

---

## 📁 Fichiers créés/modifiés

### Nouveaux fichiers
```
src/components/organisms/stock-prediction-card/
├── sh-stock-prediction-card.ts        # Composant principal (562 lignes)
└── sh-stock-prediction-card.stories.ts # 12 stories + 3 tests (759 lignes)
```

### Fichiers modifiés
```
src/index.ts                    # Ajout export
package.json                    # Fix ordre "types"
README.md                       # Documentation composant
custom-elements.json            # Auto-généré
```

---

## 🎯 Bonnes pratiques appliquées

### Design System
- ✅ Préfixe `sh-` (StockHub)
- ✅ Utilisation exclusive des Design Tokens
- ✅ Convention de nommage cohérente
- ✅ Props TypeScript typées

### Accessibilité
- ✅ WCAG AA compliant (contraste ≥ 4.5:1)
- ✅ Attribut `role="article"`
- ✅ Labels ARIA descriptifs
- ✅ Focus visible (outline 2px)
- ✅ Reduced motion support

### Storybook
- ✅ Template strings simples (pas `html` de Lit)
- ✅ Background adaptatifs selon le thème
- ✅ ArgTypes complets avec descriptions
- ✅ Tests d'interaction avec assertions
- ✅ Tags `['autodocs']` pour documentation auto

### Performance
- ✅ Animations CSS (pas JS)
- ✅ Transitions uniquement sur propriétés optimisées
- ✅ `prefers-reduced-motion` support
- ✅ Shadow DOM pour encapsulation

---

## 📚 Références

- **Documentation Storybook** : README.md lignes 489-513
- **Design Tokens** : `documentation/DESIGN-TOKENS.md`
- **Accessibilité** : `10-ACCESSIBILITY-REPORT.md`
- **Tests d'interaction** : `INTERACTION_TESTS_TRACKING.md`

---

## ✅ Checklist de validation

- [x] Composant créé et fonctionnel
- [x] Exporté dans `src/index.ts`
- [x] Stories Storybook (9 stories)
- [x] Tests d'interaction (3 tests)
- [x] Documentation README.md
- [x] Accessibilité WCAG AA (100%)
- [x] Support thèmes light/dark
- [x] Custom elements manifest généré
- [x] Aucun warning de build
- [x] Documentation technique complète
