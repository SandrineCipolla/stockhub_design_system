# StockHub V2 - Projet RNCP7

Application de gestion de stock familial avec intelligence artificielle pour prédire les ruptures de stock.

## Repositories

### Design System (ce repo)
- **URL**: https://github.com/SandrineCipolla/stockhub_design_system
- **Description**: Design system réutilisable (web + mobile) basé sur Web Components (Lit Element)
- **Tech**: Lit Element, TypeScript, Storybook, Lucide Icons
- **Composants**: 18 Web Components (5 atoms, 7 molecules, 6 organisms)
- **Storybook**: https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/
- **Package**: `@stockhub/design-system` v1.3.1

### Backend
- **Chemin local**: `C:\Users\sandr\Dev\RNCP7\StockHubV2\Back_End\stockHub_V2_back`
- **URL GitHub**: [À configurer si nécessaire]
- **Description**: API StockHub avec prédictions ML
- **Tech**: [Node.js/Java/Python - à préciser dans le README du backend]
- **Features**: Gestion stock, prédictions rupture, IA

### Frontend
- **Chemin local**: `C:\Users\sandr\Dev\RNCP7\StockHubV2\Front_End\stockhub_V2_front`
- **URL GitHub**: https://github.com/SandrineCipolla/stockHub_V2_front
- **Démo live**: https://stock-hub-v2-front.vercel.app/
- **Description**: Application React StockHub V2
- **Tech**: React 19.1.0, TypeScript 5.8.3, Vite 6.3.5, TailwindCSS 3.4.1, Lucide React
- **Version**: v1.1.0
- **Tests**: 436 tests (60.67% coverage)
- **Integration DS**: `@stockhub/design-system@github:SandrineCipolla/stockhub_design_system#v1.3.1`

### GitHub Project
- **URL**: https://github.com/users/SandrineCipolla/projects/3
- **Utilisation**: Suivre et mettre à jour les tâches après chaque modification importante

## Conventions de code

### Scripts de vérification disponibles (Design System)
Avant de committer, **TOUJOURS** exécuter:
```bash
npm run audit:conventions      # Vérifie conventions de nommage (CI/CD)
npm run lint                   # ESLint (TypeScript strict)
npm run format                 # Prettier (auto-formatting)
npm run audit-accessibility    # Lighthouse accessibility audit complet
npm run audit-accessibility:quick  # Audit rapide
```

### Scripts de build
```bash
npm run build:lib              # Build composants pour NPM
npm run build-storybook        # Build Storybook statique
npm run build:all              # Tokens + Storybook
npm run tokens:generate        # Régénère design-tokens.css
npm run tokens:watch           # Watch mode pour tokens
```

### Standards de développement
- **Web Components**: Utiliser Lit Element (framework léger 5KB)
- **TypeScript**: Mode strict obligatoire, aucune erreur `TS6133` tolérée
- **Accessibilité**: 100% WCAG AA conforme (badge: ![Accessibility](https://img.shields.io/badge/accessibility-100%2F100-brightgreen?logo=lighthouse))
- **Documentation**: Chaque composant doit avoir une story Storybook
- **Tokens**: **TOUJOURS** utiliser les design tokens de `src/tokens/tokens.json`
    - ❌ Ne JAMAIS hardcoder de couleurs, espacements, tailles
    - ✅ Utiliser `var(--sh-color-primary)`, `var(--sh-spacing-md)`, etc.
- **Préfixe**: Tous les composants utilisent le préfixe `sh-` (StockHub)
- **Icônes**: Utiliser Lucide (PascalCase: `"Package"`, `"TrendingUp"`, pas kebab-case)

### Architecture Atomic Design
```
src/
  components/
    atoms/          # 5 composants de base (badge, icon, input, logo, text)
    molecules/      # 7 combinaisons (button, card, metric-card, search, status-badge, quantity-input, stat-card)
    organisms/      # 6 complexes (header, footer, page-header, ia-alert-banner, stock-card, stock-item-card, stock-prediction-card)
  tokens/
    tokens.json     # SOURCE DE VÉRITÉ (150+ variables CSS)
    design-tokens.css  # Généré automatiquement
  styles/
```

## Gestion des Issues GitHub

### ⚠️ AVANT de créer une issue GitHub

Toujours relire cette section avant d'exécuter `gh issue create`. Ne pas improviser le format.

**Format User Story** (à utiliser pour toute nouvelle fonctionnalité) :

```
**En tant que** [persona]
**Je souhaite** [action souhaitée]
**Afin de** [bénéfice attendu]

---

**Critères d'acceptation**

Étant donné que [contexte]
Lorsque [action]
Alors :
- [ ] Critère 1
- [ ] Critère 2
- [ ] Critère 3
```

**Ce qui est INTERDIT dans le body d'une issue :**
- ❌ Les détails d'implémentation (composants à modifier, lignes de code, etc.)
- ❌ Les étapes techniques de développement
- ❌ Les commandes à exécuter
- ❌ Les TODO techniques

**Ces informations vont dans la PR**, pas dans l'issue.

**Commande gh à utiliser :**
```bash
gh issue create \
  --title "[US-XXX] Titre court orienté utilisateur" \
  --label "user-story" \
  --body "**En tant que** ...
**Je souhaite** ...
**Afin de** ...

---

**Critères d'acceptation**

Étant donné que ...
Lorsque ...
Alors :
- [ ] Critère 1
- [ ] Critère 2"
```

**Où mettre les notes techniques ?**

| Information | Où |
|---|---|
| Valeur utilisateur, critères d'acceptation | Issue GitHub |
| Idées en cours de dev, questions | Commentaire sur l'issue |
| Choix d'implémentation, composants modifiés | Description de la PR |

---

## Workflow de développement

### Avant de commencer une feature
1. Vérifier le GitHub Project pour les tâches assignées
2. Créer une branche depuis `master`
3. S'assurer que les dépendances sont à jour: `npm install`

### Pendant le développement
1. Lancer Storybook en mode dev: `npm run storybook`
2. Tester l'accessibilité: `npm run audit-accessibility:quick`
3. Respecter les design tokens (ne pas hardcoder de couleurs/tailles)

### Après chaque session de développement

**IMPORTANT**: Mettre à jour la documentation suivante:

1. **README.md**:
    - Ajouter les nouveaux composants à la liste
    - Mettre à jour les badges si nécessaire
    - Documenter les nouvelles fonctionnalités

2. **Documentation Storybook**:
    - Chaque composant créé/modifié doit avoir une story
    - Documenter les props et exemples d'utilisation

3. **CHANGELOG** (si existant):
    - Noter les changements apportés

4. **GitHub Project**:
    - Mettre à jour le statut des tâches
    - Fermer les issues résolues
    - Créer de nouvelles issues si nécessaire

5. **Tests d'accessibilité**:
    - Exécuter `npm run audit-accessibility`
    - Mettre à jour le badge si le score a changé

### Avant de pusher
```bash
npm run format              # Formater le code
npm run lint                # Vérifier les erreurs ESLint
npm run audit:conventions   # Vérifier les conventions
npm run build              # S'assurer que le build fonctionne
```

## Design Tokens

Les design tokens sont la source de vérité pour:
- Couleurs
- Typographie (tailles, poids, familles)
- Espacements
- Ombres
- Border-radius
- Transitions

**Ne jamais hardcoder ces valeurs!** Utiliser `var(--sh-*)` dans les styles.

Après modification de `src/tokens/tokens.json`:
```bash
npm run tokens:generate
```

## Naming conventions

### Composants
- Nommage: `sh-[catégorie]-[nom]` (kebab-case)
- Exemples: `sh-button`, `sh-stock-card`, `sh-price-display`
- Fichiers: `sh-component-name.ts`
- Classes: `ShComponentName` (PascalCase)

### CSS Custom Properties
- Format: `--sh-[catégorie]-[propriété]-[variant]`
- Exemples: `--sh-color-primary`, `--sh-spacing-md`, `--sh-font-size-lg`

### Commits (Convention stricte)
- **Format**: `type(scope): message`
- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Exemples**:
    - `feat(sh-button): add loading state`
    - `fix(sh-card): correct shadow on hover`
    - `docs: update README with new components`
    - `refactor(icons): migrate to lucide icons system`
    - `chore: bump version to 1.3.1`

### Messages de commit réels du projet (exemples)
```bash
git log --oneline -10
```
- `docs: add sh-stat-card to README (18 components total)`
- `chore: update accessibility badge to 100% [skip ci]`
- `fix(sh-stat-card): improve hover effect and sizing for better UX (#22)`
- `chore: bump version to 1.3.0 - add sh-stock-prediction-card and sh-stat-card`

## Intégration avec les autres repos

### Backend → Design System
- Le backend ne consomme pas directement le Design System
- Il fournit les APIs pour le frontend qui utilise le DS
- Endpoints principaux: [À documenter dans le backend]

### Frontend → Design System
Le frontend importe le Design System comme dépendance NPM via GitHub:

**Installation dans package.json**:
```json
"dependencies": {
  "@stockhub/design-system": "github:SandrineCipolla/stockhub_design_system#v1.3.1"
}
```

**Import des Web Components**:
```typescript
// Dans main.tsx ou App.tsx
import '@stockhub/design-system';

// Utilisation dans JSX (React)
<sh-button variant="primary" iconBefore="Plus">Ajouter</sh-button>
<sh-card hover clickable>...</sh-card>
<sh-stock-prediction-card
  stockName="Café Arabica"
  riskLevel="critical"
  confidence={92}
/>
```

**Guide complet**: Voir `documentation/REACT-INTEGRATION-GUIDE.md` dans le Design System

## Notes importantes

- **Version actuelle**: 1.3.1
- **Auteur**: Sandrine Cipolla
- **License**: ISC
- **Nombre de composants**: 18 Web Components
- **Méthodologie**: Atomic Design
- **8 sessions de développement** (~17h30) complétées
- **Lighthouse Score**: 100/100 accessibilité (WCAG AA)

## Ressources & Liens utiles

### Storybook & Documentation
- **Storybook local**: `npm run storybook` → http://localhost:6006
- **Storybook online**: https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/
- **Rapport Lighthouse**: https://SandrineCipolla.github.io/stockhub_design_system/
- **Chromatic Dashboard**: https://www.chromatic.com/builds?appId=68f5fbe10f495706cb168751

### Documentation technique
- **Lit Element**: https://lit.dev
- **Storybook**: https://storybook.js.org/docs/web-components
- **Lucide Icons**: https://lucide.dev/icons/ (1000+ icônes disponibles)
- **Web Components MDN**: https://developer.mozilla.org/en-US/docs/Web/Web_Components

### Documentation interne complète
Voir `documentation/INDEX.md` pour:
- Plans de migration et intégration
- Résumés des 8 sessions (~17h30)
- Guides techniques (React integration, JSDoc, Design Tokens)
- CHANGELOG complet

## 🚨 Checklist avant chaque commit

1. ✅ `npm run format` - Code formaté
2. ✅ `npm run lint` - Aucune erreur ESLint/TypeScript
3. ✅ `npm run audit:conventions` - Conventions respectées
4. ✅ `npm run build` - Build fonctionne
5. ✅ Tests manuels dans Storybook
6. ✅ Vérifier contraste couleurs si changements CSS

---

**🎯 Rappel CRITIQUE**:
- Toujours vérifier le GitHub Project et mettre à jour les tâches
- **Issues** = valeur utilisateur uniquement (US + critères d'acceptation)
- **PRs** = détails techniques, choix d'implémentation
- Mettre à jour README.md si nouveau composant ajouté
- Documenter chaque composant dans Storybook
- Exécuter `npm run audit-accessibility` avant merge sur master
# StockHub V2 - Projet RNCP7

Application de gestion de stock familial avec intelligence artificielle pour prédire les ruptures de stock.

## Repositories

### Design System (ce repo)
- **URL**: https://github.com/SandrineCipolla/stockhub_design_system
- **Description**: Design system réutilisable (web + mobile) basé sur Web Components (Lit Element)
- **Tech**: Lit Element, TypeScript, Storybook, Lucide Icons
- **Composants**: 18 Web Components (5 atoms, 7 molecules, 6 organisms)
- **Storybook**: https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/
- **Package**: `@stockhub/design-system` v1.3.1

### Backend
- **Chemin local**: `C:\Users\sandr\Dev\RNCP7\StockHubV2\Back_End\stockHub_V2_back`
- **URL GitHub**: [À configurer si nécessaire]
- **Description**: API StockHub avec prédictions ML
- **Tech**: [Node.js/Java/Python - à préciser dans le README du backend]
- **Features**: Gestion stock, prédictions rupture, IA

### Frontend
- **Chemin local**: `C:\Users\sandr\Dev\RNCP7\StockHubV2\Front_End\stockhub_V2_front`
- **URL GitHub**: https://github.com/SandrineCipolla/stockHub_V2_front
- **Démo live**: https://stock-hub-v2-front.vercel.app/
- **Description**: Application React StockHub V2
- **Tech**: React 19.1.0, TypeScript 5.8.3, Vite 6.3.5, TailwindCSS 3.4.1, Lucide React
- **Version**: v1.1.0
- **Tests**: 436 tests (60.67% coverage)
- **Integration DS**: `@stockhub/design-system@github:SandrineCipolla/stockhub_design_system#v1.3.1`

### GitHub Project
- **URL**: [À REMPLIR - URL de votre GitHub Project Board]
- **Utilisation**: Suivre et mettre à jour les tâches après chaque modification importante

## Conventions de code

### Scripts de vérification disponibles (Design System)
Avant de committer, **TOUJOURS** exécuter:
```bash
npm run audit:conventions      # Vérifie conventions de nommage (CI/CD)
npm run lint                   # ESLint (TypeScript strict)
npm run format                 # Prettier (auto-formatting)
npm run audit-accessibility    # Lighthouse accessibility audit complet
npm run audit-accessibility:quick  # Audit rapide
```

### Scripts de build
```bash
npm run build:lib              # Build composants pour NPM
npm run build-storybook        # Build Storybook statique
npm run build:all              # Tokens + Storybook
npm run tokens:generate        # Régénère design-tokens.css
npm run tokens:watch           # Watch mode pour tokens
```

### Standards de développement
- **Web Components**: Utiliser Lit Element (framework léger 5KB)
- **TypeScript**: Mode strict obligatoire, aucune erreur `TS6133` tolérée
- **Accessibilité**: 100% WCAG AA conforme (badge: ![Accessibility](https://img.shields.io/badge/accessibility-100%2F100-brightgreen?logo=lighthouse))
- **Documentation**: Chaque composant doit avoir une story Storybook
- **Tokens**: **TOUJOURS** utiliser les design tokens de `src/tokens/tokens.json`
  - ❌ Ne JAMAIS hardcoder de couleurs, espacements, tailles
  - ✅ Utiliser `var(--sh-color-primary)`, `var(--sh-spacing-md)`, etc.
- **Préfixe**: Tous les composants utilisent le préfixe `sh-` (StockHub)
- **Icônes**: Utiliser Lucide (PascalCase: `"Package"`, `"TrendingUp"`, pas kebab-case)

### Architecture Atomic Design
```
src/
  components/
    atoms/          # 5 composants de base (badge, icon, input, logo, text)
    molecules/      # 7 combinaisons (button, card, metric-card, search, status-badge, quantity-input, stat-card)
    organisms/      # 6 complexes (header, footer, page-header, ia-alert-banner, stock-card, stock-item-card, stock-prediction-card)
  tokens/
    tokens.json     # SOURCE DE VÉRITÉ (150+ variables CSS)
    design-tokens.css  # Généré automatiquement
  styles/
```

## Workflow de développement

### Avant de commencer une feature
1. Vérifier le GitHub Project pour les tâches assignées
2. Créer une branche depuis `master`
3. S'assurer que les dépendances sont à jour: `npm install`

### Pendant le développement
1. Lancer Storybook en mode dev: `npm run storybook`
2. Tester l'accessibilité: `npm run audit-accessibility:quick`
3. Respecter les design tokens (ne pas hardcoder de couleurs/tailles)

### Après chaque session de développement

**IMPORTANT**: Mettre à jour la documentation suivante:

1. **README.md**:
   - Ajouter les nouveaux composants à la liste
   - Mettre à jour les badges si nécessaire
   - Documenter les nouvelles fonctionnalités

2. **Documentation Storybook**:
   - Chaque composant créé/modifié doit avoir une story
   - Documenter les props et exemples d'utilisation

3. **CHANGELOG** (si existant):
   - Noter les changements apportés

4. **GitHub Project**:
   - Mettre à jour le statut des tâches
   - Fermer les issues résolues
   - Créer de nouvelles issues si nécessaire

5. **Tests d'accessibilité**:
   - Exécuter `npm run audit-accessibility`
   - Mettre à jour le badge si le score a changé

### Avant de pusher
```bash
npm run format              # Formater le code
npm run lint                # Vérifier les erreurs ESLint
npm run audit:conventions   # Vérifier les conventions
npm run build              # S'assurer que le build fonctionne
```

## Design Tokens

Les design tokens sont la source de vérité pour:
- Couleurs
- Typographie (tailles, poids, familles)
- Espacements
- Ombres
- Border-radius
- Transitions

**Ne jamais hardcoder ces valeurs!** Utiliser `var(--sh-*)` dans les styles.

Après modification de `src/tokens/tokens.json`:
```bash
npm run tokens:generate
```

## Naming conventions

### Composants
- Nommage: `sh-[catégorie]-[nom]` (kebab-case)
- Exemples: `sh-button`, `sh-stock-card`, `sh-price-display`
- Fichiers: `sh-component-name.ts`
- Classes: `ShComponentName` (PascalCase)

### CSS Custom Properties
- Format: `--sh-[catégorie]-[propriété]-[variant]`
- Exemples: `--sh-color-primary`, `--sh-spacing-md`, `--sh-font-size-lg`

### Commits (Convention stricte)
- **Format**: `type(scope): message`
- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Exemples**:
  - `feat(sh-button): add loading state`
  - `fix(sh-card): correct shadow on hover`
  - `docs: update README with new components`
  - `refactor(icons): migrate to lucide icons system`
  - `chore: bump version to 1.3.1`

### Messages de commit réels du projet (exemples)
```bash
git log --oneline -10
```
- `docs: add sh-stat-card to README (18 components total)`
- `chore: update accessibility badge to 100% [skip ci]`
- `fix(sh-stat-card): improve hover effect and sizing for better UX (#22)`
- `chore: bump version to 1.3.0 - add sh-stock-prediction-card and sh-stat-card`

## Intégration avec les autres repos

### Backend → Design System
- Le backend ne consomme pas directement le Design System
- Il fournit les APIs pour le frontend qui utilise le DS
- Endpoints principaux: [À documenter dans le backend]

### Frontend → Design System
Le frontend importe le Design System comme dépendance NPM via GitHub:

**Installation dans package.json**:
```json
"dependencies": {
  "@stockhub/design-system": "github:SandrineCipolla/stockhub_design_system#v1.3.1"
}
```

**Import des Web Components**:
```typescript
// Dans main.tsx ou App.tsx
import '@stockhub/design-system';

// Utilisation dans JSX (React)
<sh-button variant="primary" iconBefore="Plus">Ajouter</sh-button>
<sh-card hover clickable>...</sh-card>
<sh-stock-prediction-card
  stockName="Café Arabica"
  riskLevel="critical"
  confidence={92}
/>
```

**Guide complet**: Voir `documentation/REACT-INTEGRATION-GUIDE.md` dans le Design System

## Notes importantes

- **Version actuelle**: 1.3.1
- **Auteur**: Sandrine Cipolla
- **License**: ISC
- **Nombre de composants**: 18 Web Components
- **Méthodologie**: Atomic Design
- **8 sessions de développement** (~17h30) complétées
- **Lighthouse Score**: 100/100 accessibilité (WCAG AA)

## Ressources & Liens utiles

### Storybook & Documentation
- **Storybook local**: `npm run storybook` → http://localhost:6006
- **Storybook online**: https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/
- **Rapport Lighthouse**: https://SandrineCipolla.github.io/stockhub_design_system/
- **Chromatic Dashboard**: https://www.chromatic.com/builds?appId=68f5fbe10f495706cb168751

### Documentation technique
- **Lit Element**: https://lit.dev
- **Storybook**: https://storybook.js.org/docs/web-components
- **Lucide Icons**: https://lucide.dev/icons/ (1000+ icônes disponibles)
- **Web Components MDN**: https://developer.mozilla.org/en-US/docs/Web/Web_Components

### Documentation interne complète
Voir `documentation/INDEX.md` pour:
- Plans de migration et intégration
- Résumés des 8 sessions (~17h30)
- Guides techniques (React integration, JSDoc, Design Tokens)
- CHANGELOG complet

## 🚨 Checklist avant chaque commit

1. ✅ `npm run format` - Code formaté
2. ✅ `npm run lint` - Aucune erreur ESLint/TypeScript
3. ✅ `npm run audit:conventions` - Conventions respectées
4. ✅ `npm run build` - Build fonctionne
5. ✅ Tests manuels dans Storybook
6. ✅ Vérifier contraste couleurs si changements CSS

---

**🎯 Rappel CRITIQUE**:
- Toujours vérifier le GitHub Project et mettre à jour les tâches
- Mettre à jour README.md si nouveau composant ajouté
- Documenter chaque composant dans Storybook
- Exécuter `npm run audit-accessibility` avant merge sur master
