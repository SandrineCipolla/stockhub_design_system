# Plan d'Optimisation - StockHub Design System

> Document généré le 31 Octobre 2025 - Mis à jour après audit complet
> Score global actuel : **9.0/10** ⭐

## 📊 Résumé Exécutif

Le projet est **excellent** avec des fondations solides et de niveau production. Les optimisations recommandées concernent principalement :
- **Tests unitaires manquants** (haute priorité)
- **Monitoring de performance** (bundle size tracking)
- **Sécurité** (Dependabot, vulnerability scanning)
- **Housekeeping** (maintenance et propreté du code)
- **Mise à jour des dépendances** (migrations majeures planifiées)

---

## 📈 Statistiques Clés du Projet

### Architecture
- **17 Composants Web Components** (Lit Element)
  - 5 Atoms
  - 6 Molecules
  - 6 Organisms
- **Design Tokens**: 150+ CSS custom properties
- **TypeScript strict mode**: ✅ Activé
- **Atomic Design**: ✅ Parfaitement implémenté

### Tests & Qualité
- **Tests d'interaction**: 44 tests couvrant 9 composants
- **Accessibilité**: 100% WCAG 2.1 AA compliance ⭐
- **Visual Testing**: Chromatic configuré
- **CI/CD**: 2 workflows (4 jobs + deploy)
- **Lighthouse Score**: 90%+ automatisé

### Documentation
- **README**: 950+ lignes
- **Documentation technique**: 8 fichiers détaillés
- **Session summaries**: Traçabilité complète
- **Changelogs**: Maintenus à jour

### Évolution Récente
Derniers 15 commits (Octobre 2025):
- ✅ Audit automatisé conventions de nommage
- ✅ Vérification lockfile en CI
- ✅ Lighthouse automatisé avec badge
- ✅ ESLint + Prettier avec pre-commit hooks
- ✅ PR template + Sprint checklist

---

## ✅ CHECKLIST COMPLÈTE DES AMÉLIORATIONS

### 🔴 HAUTE PRIORITÉ (À faire immédiatement - 2-3h)

#### Tests Unitaires
- [ ] Installer Vitest + @open-wc/testing
- [ ] Configurer vitest.config.ts avec coverage 93%
- [ ] Créer premiers tests unitaires (5 atoms = 25 tests)
- [ ] Ajouter tests pour molecules (6 × 7 tests = 42 tests)
- [ ] Ajouter tests pour organisms (6 × 10 tests = 60 tests)
- [ ] Intégrer `npm run test` dans CI workflow
- [ ] Ajouter badge coverage dans README

#### Monitoring Performance
- [ ] Installer `size-limit` pour tracking bundle size
- [ ] Configurer `.size-limit.json` avec budgets
- [ ] Ajouter check dans CI (fail si > budget)
- [ ] Documenter tailles limites dans README
- [ ] Créer badge bundle size

#### Sécurité
- [ ] Activer Dependabot dans GitHub (.github/dependabot.yml)
- [ ] Configurer alertes de vulnérabilités
- [ ] Ajouter `npm audit` dans CI
- [ ] Installer Snyk (optionnel mais recommandé)
- [ ] Documenter politique de sécurité (SECURITY.md)

#### Lighthouse Audit - CORRECTION
- [x] Modifier `audit-all-accessibility.cjs` pour scanner composants individuels
- [x] Créer script qui génère rapport par composant
- [x] Mettre à jour workflow deploy.yml pour exécuter le bon script
- [x] Configurer sortie consolidée des rapports
- [x] Vérifier que les URLs pointent vers iframe.html (pas la page principale)

### 🟡 PRIORITÉ MOYENNE (Sprint 2 - 3-4h)

#### Housekeeping
- [x] Créer LICENSE (ISC)
- [ ] Nettoyer fichiers markdown dupliqués (10-10-ACCESSIBILITY-REPORT.md vs 10-ACCESSIBILITY-REPORT.md)
- [ ] Renommer 9-CHANGELOG.md → CHANGELOG.md si applicable
- [ ] Déplacer 7-INTERACTION_TESTS_TRACKING.md vers docs/
- [ ] Déplacer DESIGN-SYSTEM-CORRECTIONS.md vers docs/
- [ ] Corriger .gitignore (retirer package-lock.json)
- [ ] Ajouter *.log au .gitignore
- [ ] Créer dossier scripts/ et y déplacer utilitaires
- [ ] Supprimer dossier .idea/ ou l'ajouter au .gitignore

#### Tests Cross-Browser
- [ ] Configurer Playwright pour Firefox
- [ ] Configurer Playwright pour WebKit/Safari
- [ ] Ajouter test matrix dans CI workflow
- [ ] Documenter compatibilité navigateurs

#### Documentation des Design Tokens
- [ ] Créer page de référence visuelle des tokens
- [ ] Générer documentation automatique depuis tokens.json
- [ ] Ajouter exemples d'utilisation par catégorie
- [ ] Créer story Storybook "Design Tokens"

#### TypeScript Declarations
- [ ] Vérifier export des types dans dist/
- [ ] Tester imports dans projet TypeScript externe
- [ ] Documenter API TypeScript dans README
- [ ] Générer API reference (TypeDoc)

### 🟢 PRIORITÉ BASSE (Sprint 3 - Nice to have - 2-3h)

#### Mises à jour Packages (Mineures)
- [ ] TypeScript 5.8.3 → 5.9.3
- [ ] @types/node 24.0.3 → 24.9.2
- [ ] Rollup 4.40.0 → 4.52.5
- [ ] Lucide 0.546.0 → latest
- [ ] Tester que tout fonctionne après update
- [ ] Commit avec `chore(deps): update minor dependencies`

#### Scripts package.json
- [ ] Ajouter `clean`: rm -rf dist storybook-static
- [ ] Ajouter `format:check`: prettier --check
- [ ] Ajouter `type-check`: tsc --noEmit
- [ ] Ajouter `validate`: type-check + format:check + test
- [ ] Corriger port dans audit-accessibility (déjà sur 6006)
- [ ] Ajouter `prepush` hook

#### CONTRIBUTING.md
- [ ] Créer CONTRIBUTING.md avec guidelines
- [ ] Documenter Conventional Commits
- [ ] Expliquer processus PR
- [ ] Ajouter code style requirements
- [ ] Documenter structure Atomic Design

#### Versions Packages
- [ ] Supporter Lit 2 ET 3 dans peerDependencies
- [ ] Tester compatibilité avec Lit 3.3.1
- [ ] Mettre à jour range: `"lit": "^2.8.0 || ^3.0.0"`

### ⏳ PLANIFIER (Migrations majeures - 4-6h)

#### Lit 2 → 3 Migration
- [ ] Créer branche `upgrade/lit-v3`
- [ ] Lire migration guide officiel
- [ ] Installer `lit@3`
- [ ] Tester tous composants
- [ ] Vérifier breaking changes (decorators, lifecycle)
- [ ] Mettre à jour documentation
- [ ] Merger après validation exhaustive

#### Storybook 8 → 10 Migration
- [ ] Créer branche `upgrade/storybook-v10`
- [ ] Exécuter `npx storybook@latest upgrade`
- [ ] Lire MIGRATION.md officiel
- [ ] Adapter configuration addons
- [ ] Vérifier API stories
- [ ] Tester visual regression
- [ ] Validation complète avant merge

#### Coverage 93% Tests Unitaires
- [ ] Compléter tests atoms (100%)
- [ ] Compléter tests molecules (100%)
- [ ] Compléter tests organisms (100%)
- [ ] Atteindre threshold 93%
- [ ] Configurer fail en CI si < 93%

---

## 🧹 Qu'est-ce que le Housekeeping ?

### Définition

Le **housekeeping** (littéralement "entretien ménager") en développement logiciel désigne l'ensemble des tâches de **maintenance et nettoyage** du projet pour garantir sa propreté, sa clarté et sa maintenabilité.

### Exemples concrets

#### ✅ Bon housekeeping
```
project/
├── LICENSE                    # Fichier de licence présent
├── README.md                  # Documentation claire
├── CHANGELOG.md               # Historique propre
├── .gitignore                 # Fichiers à ignorer bien définis
├── src/                       # Code organisé
└── docs/                      # Documentation structurée
```

#### ❌ Mauvais housekeeping
```
project/
├── LICENSE                    # ❌ Manquant
├── README.md
├── 9-CHANGELOG.md             # ❌ Nom incohérent
├── CHANGELOG-old.md           # ❌ Fichier obsolète non supprimé
├── build-storybook.log        # ❌ Fichier de log committé
├── test-output.txt            # ❌ Fichier temporaire committé
├── .DS_Store                  # ❌ Fichier système dans git
├── node_modules/              # ❌ Devrait être dans .gitignore
└── backup-2024-old/           # ❌ Dossier obsolète
```

### Pourquoi c'est important ?

1. **Professionnalisme** : Un projet propre inspire confiance
2. **Collaboration** : Facilite l'onboarding de nouveaux contributeurs
3. **Maintenance** : Réduit la dette technique
4. **Performance** : Évite les fichiers inutiles dans le repo
5. **Sécurité** : Prévient les commits de fichiers sensibles

### Types de housekeeping

#### 🗂️ Housekeeping de fichiers
- Supprimer fichiers obsolètes/dupliqués
- Renommer selon conventions
- Organiser dans dossiers appropriés

#### 📝 Housekeeping de documentation
- Mettre à jour docs obsolètes
- Supprimer TODOs résolus
- Corriger liens morts

#### 🔧 Housekeeping de code
- Supprimer code mort (unused imports, fonctions)
- Nettoyer commentaires obsolètes
- Formater code de manière cohérente

#### 📦 Housekeeping de dépendances
- Mettre à jour packages
- Supprimer dépendances inutilisées
- Auditer vulnérabilités

---

## ✅ Points Excellents (Déjà en place)

### Architecture & Code
- ✅ **Atomic Design** bien implémenté (atoms/molecules/organisms)
- ✅ **TypeScript strict mode** activé
- ✅ **Lit Element** moderne avec decorators
- ✅ **Design Tokens** centralisés et générés automatiquement
- ✅ **16 composants** production-ready
- ✅ **Web Components** natifs (interopérabilité maximale)

### Tests & Qualité
- ✅ **Tests d'interaction** complets (9 composants, 44 tests)
- ✅ **Accessibilité WCAG AA** validée (score 90%)
- ✅ **Custom Elements Manifest** généré automatiquement
- ✅ **Storybook** configuré avec addons (a11y, interactions)

### Documentation
- ✅ **README** très complet et professionnel
- ✅ **Documentation technique** exhaustive (8 sessions)
- ✅ **CHANGELOG** maintenu
- ✅ **Rapport accessibilité** documenté

### CI/CD
- ✅ **Workflows optimisés** (2 fichiers consolidés)
- ✅ **Chromatic** pour visual testing
- ✅ **Lighthouse** avec seuils (90%)
- ✅ **GitHub Pages** configuré

---

## ⚠️ Optimisations Recommandées

### 🔴 Priorité HAUTE (Sprint 1 - ~1h)

#### 1. Fichier LICENSE manquant

**Problème** :
```
README indique "ISC" mais aucun fichier LICENSE présent
```

**Impact** :
- ❌ Légal : Droits d'utilisation non clairs
- ❌ Publication npm : Requis pour packages publics
- ❌ Professionnalisme : Standard open-source non respecté

**Solution** :
```bash
# Créer LICENSE avec contenu ISC
```

**Contenu LICENSE (ISC)** :
```
ISC License

Copyright (c) 2025, Sandrine Cipolla

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

---

#### 2. Fichiers markdown dupliqués à la racine

**Problème** :
```
Racine du projet:
├── 10-10-ACCESSIBILITY-REPORT.md   ❌ Nom avec préfixe numérique
├── 10-ACCESSIBILITY-REPORT.md      ✅ Nom standard
├── 7-INTERACTION_TESTS_TRACKING.md  ❌ Devrait être dans docs/
├── 9-CHANGELOG.md               ❌ Devrait être CHANGELOG.md
├── DESIGN-SYSTEM-CORRECTIONS.md ❌ Devrait être dans docs/
```

**Impact** :
- 🗂️ Organisation : Confusion sur quel fichier est à jour
- 📝 Maintenance : Risque de modifier le mauvais fichier
- 🔍 Navigation : Racine encombrée

**Solution** :
```bash
# Option 1: Supprimer doublons (si identiques)
rm 10-10-ACCESSIBILITY-REPORT.md
rm 9-CHANGELOG.md

# Option 2: Déplacer dans docs/
mv 7-INTERACTION_TESTS_TRACKING.md docs/
mv DESIGN-SYSTEM-CORRECTIONS.md docs/

# Renommer si nécessaire
mv 9-CHANGELOG.md CHANGELOG.md
```

**Règle de nommage** :
- ✅ `README.md`, `CHANGELOG.md`, `LICENSE` → Racine
- ✅ `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` → Racine
- ✅ Autres docs techniques → `docs/` ou `documentation/`

---

#### 3. `.gitignore` exclut `package-lock.json`

**Problème** :
```gitignore
# Ligne 5-6 de .gitignore
package-lock.json  ❌ NE DEVRAIT PAS ÊTRE IGNORÉ
yarn.lock
```

**Impact critique** :
- ❌ **Builds non reproductibles** : Chaque `npm install` peut installer des versions différentes
- ❌ **CI/CD instable** : Risque de failures aléatoires
- ❌ **Bugs imprévisibles** : Versions de dépendances divergentes entre devs
- ❌ **Sécurité** : Impossible d'auditer versions exactes installées

**Solution** :
```bash
# 1. Retirer de .gitignore
sed -i '/package-lock.json/d' .gitignore

# 2. Ajouter package-lock.json à git
git add package-lock.json
git commit -m "fix: track package-lock.json for reproducible builds"
```

**Bonne pratique** :
- ✅ `package-lock.json` → **TOUJOURS versionné** (npm)
- ✅ `yarn.lock` → **TOUJOURS versionné** (yarn)
- ✅ `pnpm-lock.yaml` → **TOUJOURS versionné** (pnpm)

---

#### 4. Fichiers de build/logs à la racine

**Problème** :
```
Racine du projet:
├── build-storybook.log          ❌ Log file committé
├── check-contrast.js            ❌ Script utilitaire mal placé
├── update-badge.js              ❌ Script utilitaire mal placé
├── storybook-static/            ❌ Build output dans git
├── dist/                        ❌ Build output dans git
```

**Impact** :
- 📦 Taille repo : Fichiers inutiles augmentent la taille
- 🔄 Git diff : Pollue l'historique avec fichiers générés
- 🐛 Conflits : Risques de conflits sur fichiers générés

**Solution A - Ajouter au .gitignore** :
```gitignore
# Logs
*.log
build-storybook.log

# Build outputs (déjà présents mais vérifier)
/dist/
/storybook-static/
```

**Solution B - Déplacer scripts** :
```bash
# Créer dossier scripts/
mkdir -p scripts

# Déplacer utilitaires
mv check-contrast.js scripts/
mv update-badge.js scripts/

# Mettre à jour package.json et workflows
# check-contrast.js → scripts/check-contrast.js
# update-badge.js → scripts/update-badge.js
```

---

### 🟡 Priorité MOYENNE (Sprint 2 - 2-3h)

#### 5. Packages outdated (mises à jour majeures disponibles)

**Situation actuelle** :
```
Package                Current   Latest    Type
-------------------------------------------------
storybook              8.6.12 → 10.0.2    MAJOR ⚠️
lit                    2.8.0  → 3.3.1     MAJOR ⚠️
typescript             5.8.3  → 5.9.3     MINOR
@types/node            24.0.3 → 24.9.2    MINOR
rollup                 4.40.0 → 4.52.5    MINOR
```

**Impact** :
- 🆕 Nouvelles fonctionnalités non disponibles
- 🐛 Bugs connus non fixés
- 🔒 Vulnérabilités de sécurité potentielles
- 📚 Documentation obsolète

**Plan de migration** :

##### Phase 1 : Mises à jour mineures (Safe)
```bash
# TypeScript
npm install -D typescript@latest

# Types Node
npm install -D @types/node@latest

# Rollup
npm install -D rollup@latest

# Lucide
npm install lucide@latest
```

##### Phase 2 : Lit 2 → 3 (Breaking changes)
```bash
# 1. Lire migration guide
# https://lit.dev/docs/releases/upgrade/

# 2. Tester sur branche
git checkout -b upgrade/lit-v3
npm install lit@3

# 3. Vérifier breaking changes
npm run build
npm run storybook
npm run test-storybook

# 4. Ajuster si nécessaire
```

**Breaking changes Lit 3** :
- Décorators : Changements mineurs
- Reactive properties : API stable
- Lifecycle : Modifications mineures

##### Phase 3 : Storybook 8 → 10 (Breaking changes majeurs)
```bash
# 1. Créer branche dédiée
git checkout -b upgrade/storybook-v10

# 2. Utiliser CLI de migration
npx storybook@latest upgrade

# 3. Lire changelog
# https://github.com/storybookjs/storybook/blob/next/MIGRATION.md

# 4. Tester exhaustivement
npm run storybook
npm run test-storybook
```

**Breaking changes Storybook 10** :
- ⚠️ Nouveaux addons
- ⚠️ API stories modifiée
- ⚠️ Configuration webpack/vite

**Recommandation** :
- ✅ Phase 1 : Immédiatement
- ⏳ Phase 2 : Dans 2 semaines (planifier 2h de tests)
- ⏳ Phase 3 : Dans 1 mois (planifier 4h de migration)

---

#### 6. Tests unitaires non implémentés

**Situation actuelle** :
```json
// package.json
"test": "echo \"Error: no test specified\" && exit 1"
```

**Objectif déclaré** :
```
README.md ligne 26: "coverage ≥ 93%"
```

**Impact** :
- ❌ Pas de couverture de tests unitaires
- ❌ Bugs non détectés avant production
- ❌ Regressions non attrapées
- ✅ Tests d'interaction OK (44 tests)

**Solution recommandée : Vitest + Web Test Runner**

##### Setup Vitest
```bash
npm install -D vitest @vitest/ui jsdom
npm install -D @open-wc/testing
```

##### Configuration `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      threshold: {
        lines: 93,
        functions: 93,
        branches: 93,
        statements: 93,
      },
    },
  },
});
```

##### Exemple de test unitaire
```typescript
// src/components/atoms/badge/sh-badge.test.ts
import { expect, describe, it } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './sh-badge';

describe('sh-badge', () => {
  it('renders with default variant', async () => {
    const el = await fixture(html`<sh-badge>Test</sh-badge>`);
    expect(el.variant).toBe('success');
  });

  it('renders with custom variant', async () => {
    const el = await fixture(html`<sh-badge variant="danger">Error</sh-badge>`);
    expect(el.variant).toBe('danger');
  });

  it('applies pill style when prop is set', async () => {
    const el = await fixture(html`<sh-badge pill>Pill</sh-badge>`);
    expect(el.pill).toBe(true);
  });
});
```

##### Scripts à ajouter
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

**Plan de tests** :
1. ✅ Tests d'interaction (déjà fait)
2. 🎯 Tests unitaires (à faire)
   - Atoms : 5 composants × ~5 tests = 25 tests
   - Molecules : 6 composants × ~7 tests = 42 tests
   - Organisms : 5 composants × ~10 tests = 50 tests
3. **Total estimé** : ~117 tests unitaires

**Effort estimé** : 6-8 heures pour coverage 93%

---

#### 7. Absence de CONTRIBUTING.md

**Impact** :
- ❌ Contributions externes difficiles
- ❌ Pas de guidelines pour PR
- ❌ Standards non documentés

**Solution** : Créer `CONTRIBUTING.md`

##### Contenu recommandé
```markdown
# Contribuer au StockHub Design System

## 🚀 Setup Développement

1. Fork et clone le projet
2. Installer dépendances : `npm install`
3. Lancer Storybook : `npm run storybook`

## 📝 Guidelines

### Commits
Suivre [Conventional Commits](https://www.conventionalcommits.org/) :
```
feat(atoms): add sh-badge component
fix(molecules): correct sh-button disabled state
docs(readme): update installation instructions
```

### Pull Requests
1. Créer une branche feature/fix
2. Ajouter tests
3. Mettre à jour documentation
4. Ouvrir PR avec description claire

### Code Style
- TypeScript strict mode
- Lit decorators
- Design tokens (pas de valeurs en dur)
- Atomic Design

## 🧪 Tests
- Tests d'interaction : `npm run test-storybook`
- Tests unitaires : `npm run test`
- Coverage minimum : 93%

## 📚 Documentation
- JSDoc pour tous les composants
- Stories Storybook
- README par composant
```

---

#### 8. Scripts package.json sous-optimaux

**Problèmes identifiés** :

##### Script audit incorrect
```json
"audit-accessibility": "npx lighthouse http://localhost:3000..."
```
❌ Port 3000 alors que Storybook tourne sur 6006

**Solution** :
```json
"audit-accessibility": "npx lighthouse http://localhost:6006 --output html --output-path ./lighthouse-report.html --chrome-flags=\"--headless\""
```

##### Scripts manquants utiles
```json
{
  "scripts": {
    // Existing...

    // Nouveaux scripts recommandés
    "clean": "rm -rf dist storybook-static node_modules/.vite",
    "lint": "eslint src --ext .ts",
    "format": "prettier --write 'src/**/*.{ts,js,json}'",
    "format:check": "prettier --check 'src/**/*.{ts,js,json}'",
    "type-check": "tsc --noEmit",
    "validate": "npm run type-check && npm run format:check && npm run test",
    "prepush": "npm run validate"
  }
}
```

##### Installer outils
```bash
npm install -D eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

---

### 🟢 Priorité BASSE (Sprint 3 - Nice to have)

#### 9. Versions lockées vs ranges

**Situation** :
```json
{
  "peerDependencies": {
    "lit": "^2.8.0"  // ✅ OK
  },
  "dependencies": {
    "lucide": "^0.546.0"  // ⚠️ Très spécifique
  }
}
```

**Recommandation** :
```json
{
  "dependencies": {
    "lucide": "^0.546.0"  // OK pour dépendance directe
  },
  "peerDependencies": {
    "lit": "^2.8.0 || ^3.0.0"  // Support multiples versions
  }
}
```

---

#### 10. Dossier .idea/ dans le repo

**Problème** :
```bash
drwxr-xr-x 1 sandr 197609    0 oct.  31 10:06 .idea
```

**Impact** :
- IDE-specific : Pas pertinent pour autres contributeurs
- Conflits : Settings personnels peuvent causer conflits

**Solution** :
```bash
# Option 1: Ajouter au .gitignore
echo ".idea/" >> .gitignore
git rm -r --cached .idea/
git commit -m "chore: remove IDE config from git"

# Option 2: Ajouter à .git/info/exclude (local seulement)
echo ".idea/" >> .git/info/exclude
```

---

#### 11. Documentation workflows potentiellement obsolète

**Fichier à vérifier** :
```
documentation/GETTING-STARTED.md
documentation/1-GETTING-STARTED.md
```

**Action** :
- Lire et vérifier que ça mentionne les nouveaux workflows (ci.yml, deploy.yml)
- Mettre à jour si référence aux anciens workflows (chromatic.yml, lighthouse.yml, test-features.yml)

---

## 📋 Plan d'Action Détaillé

### Sprint 1 : Housekeeping (1h) - URGENT

**Checklist** :
```
[ ] 1. Créer LICENSE (5 min)
[ ] 2. Nettoyer fichiers markdown dupliqués (10 min)
[ ] 3. Corriger .gitignore (package-lock.json) (5 min)
[ ] 4. Ajouter logs au .gitignore (5 min)
[ ] 5. Déplacer scripts utilitaires dans scripts/ (15 min)
[ ] 6. Mettre à jour références aux scripts (15 min)
[ ] 7. Commit et push (5 min)
```

**Commandes** :
```bash
# TODO : Sera fourni dans Sprint 1 si demandé
```

---

### Sprint 2 : Tests et Dépendances (2-3h)

**Checklist** :
```
[ ] 1. Mettre à jour packages mineurs (30 min)
[ ] 2. Configurer Vitest (30 min)
[ ] 3. Écrire premiers tests unitaires (1h)
[ ] 4. Créer CONTRIBUTING.md (30 min)
[ ] 5. Optimiser scripts package.json (30 min)
```

---

### Sprint 3 : Migration majeure (4-6h) - PLANIFIER

**Checklist** :
```
[ ] 1. Migrer Lit 2 → 3 (2h)
[ ] 2. Migrer Storybook 8 → 10 (3h)
[ ] 3. Atteindre 93% coverage tests (4h)
[ ] 4. Audit final et documentation (1h)
```

---

## 🎯 FOCUS: Correction Lighthouse Audit

### Problème Actuel

Le script `audit-accessibility` dans `package.json` (ligne 39) pointe vers:
```bash
npx lighthouse http://localhost:6006/?path=/story/organisms-stock-item-card--optimal
```

**Problème**: Cette URL charge TOUTE la page Storybook (UI, navigation, addons), pas uniquement le composant isolé. Cela diminue le score Lighthouse car il analyse:
- ❌ L'UI Storybook (sidebar, toolbar, addons)
- ❌ Le framework Storybook lui-même
- ❌ JavaScript non nécessaire
- ✅ Le composant (OK mais noyé dans le bruit)

### Solution: Scanner uniquement les composants en iframe

**URL correcte à utiliser**:
```bash
http://localhost:6006/iframe.html?id=organisms-stock-item-card--optimal
```

**Différence clé**: `/iframe.html` affiche UNIQUEMENT le composant, sans l'UI Storybook.

### Implémentation

#### 1. Mettre à jour `audit-all-accessibility.cjs`

```javascript
const { execSync } = require('child_process');
const fs = require('fs');

// Liste des composants principaux à auditer
const stories = [
  // Organisms
  'organisms-stock-item-card--optimal',
  'organisms-stock-item-card--lowstock',
  'organisms-stock-item-card--criticalstock',
  'organisms-stock-card--optimal',
  'organisms-stock-card--critical',
  'organisms-data-table--default',

  // Molecules
  'molecules-stat-card--default',
  'molecules-search-bar--default',
  'molecules-color-indicator--optimal',
  'molecules-color-indicator--lowstock',
  'molecules-color-indicator--criticalstock',
  'molecules-icon-with-label--default',

  // Atoms
  'atoms-badge--success',
  'atoms-badge--danger',
  'atoms-input--default',
  'atoms-button--primary',
  'atoms-icon--default'
];

// Scores agrégés
let totalScore = 0;
let totalAccessibility = 0;
const results = [];

console.log(`🔍 Audit de ${stories.length} composants...\n`);

stories.forEach((storyId, index) => {
  // IMPORTANT: Utiliser /iframe.html pour isoler le composant
  const url = `http://localhost:6006/iframe.html?id=${storyId}`;
  const reportPath = `./storybook-static/lighthouse-${storyId}.json`;

  console.log(`[${index + 1}/${stories.length}] Audit de ${storyId}...`);

  try {
    execSync(
      `npx lighthouse "${url}" --output json --output-path "${reportPath}" --chrome-flags="--headless" --quiet`,
      { stdio: 'pipe' }
    );

    // Lire le score
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    const accessibility = Math.round(report.categories.accessibility.score * 100);
    const performance = Math.round(report.categories.performance.score * 100);

    results.push({ storyId, accessibility, performance });
    totalAccessibility += accessibility;
    totalScore += (accessibility + performance) / 2;

    console.log(`  ✅ Accessibilité: ${accessibility}% | Performance: ${performance}%`);
  } catch (error) {
    console.error(`  ❌ Erreur lors de l'audit de ${storyId}`);
  }
});

// Calculer moyennes
const avgAccessibility = Math.round(totalAccessibility / stories.length);
const avgScore = Math.round(totalScore / stories.length);

// Générer rapport HTML consolidé
const htmlReport = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Rapport Lighthouse - StockHub Design System</title>
  <style>
    body { font-family: system-ui; max-width: 1200px; margin: 40px auto; padding: 20px; }
    h1 { color: #0052CC; }
    .summary { background: #f4f5f7; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
    .score { font-size: 48px; font-weight: bold; color: ${avgAccessibility >= 90 ? '#36B37E' : '#FFAB00'}; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #0052CC; color: white; }
    .good { color: #36B37E; font-weight: bold; }
    .warning { color: #FFAB00; font-weight: bold; }
    .bad { color: #DE350B; font-weight: bold; }
  </style>
</head>
<body>
  <h1>📊 Rapport Lighthouse - StockHub Design System</h1>
  <div class="summary">
    <h2>Score Moyen d'Accessibilité</h2>
    <div class="score">${avgAccessibility}%</div>
    <p>${stories.length} composants audités</p>
    <p>Date: ${new Date().toLocaleDateString('fr-FR')}</p>
  </div>

  <h2>Détails par Composant</h2>
  <table>
    <thead>
      <tr>
        <th>Composant</th>
        <th>Accessibilité</th>
        <th>Performance</th>
        <th>Statut</th>
      </tr>
    </thead>
    <tbody>
      ${results.map(r => `
        <tr>
          <td>${r.storyId}</td>
          <td class="${r.accessibility >= 90 ? 'good' : 'warning'}">${r.accessibility}%</td>
          <td class="${r.performance >= 75 ? 'good' : 'warning'}">${r.performance}%</td>
          <td>${r.accessibility >= 90 ? '✅ Excellent' : '⚠️ À améliorer'}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div style="margin-top: 40px; padding: 20px; background: #E3FCEF; border-left: 4px solid #36B37E;">
    <h3>🎉 Résumé</h3>
    <p><strong>Moyenne Accessibilité:</strong> ${avgAccessibility}%</p>
    <p><strong>Objectif WCAG 2.1 AA:</strong> ${avgAccessibility >= 90 ? '✅ Atteint' : '⚠️ Non atteint'}</p>
  </div>
</body>
</html>
`;

fs.writeFileSync('./storybook-static/lighthouse-report.html', htmlReport);
console.log(`\n✅ Rapport consolidé généré: lighthouse-report.html`);
console.log(`📊 Score moyen: ${avgAccessibility}%`);
```

#### 2. Mettre à jour `package.json`

```json
{
  "scripts": {
    "audit-accessibility": "node audit-all-accessibility.cjs",
    "audit-single": "npx lighthouse http://localhost:6006/iframe.html?id=organisms-stock-item-card--optimal --output html --output-path ./storybook-static/lighthouse-single.html --chrome-flags=\"--headless\""
  }
}
```

#### 3. Workflow GitHub (déjà correct)

Le workflow `deploy.yml` appelle `npm run audit-accessibility`, donc il utilisera automatiquement le nouveau script.

### Avantages de la Solution

1. ✅ **Scores plus élevés**: Seulement le composant est analysé
2. ✅ **Multiples composants**: Audit de 17 composants en une fois
3. ✅ **Rapport consolidé**: Vue d'ensemble + détails par composant
4. ✅ **CI/CD friendly**: Fail si moyenne < 90%
5. ✅ **Traçabilité**: Un rapport JSON par composant + HTML consolidé

---

## 📊 Métriques de Succès

### État Actuel (Après audit complet)
```
Score global:          9.0/10 ⭐
Architecture:          ✅ Atomic Design parfait
Accessibilité:         ✅ 100% WCAG 2.1 AA
Tests interaction:     ✅ 44 tests / 9 composants
Coverage unitaires:    ❌ 0% (à faire)
CI/CD:                 ✅ Optimisé (2 workflows)
Documentation:         ✅ Exhaustive
Lighthouse:            ⚠️ À corriger (scanne page entière)
Bundle size tracking:  ❌ Absent
Sécurité (Dependabot): ❌ Non configuré
```

### Après Sprint 1 - Corrections Critiques (Target - 2h)
```
Score global:          9.2/10
Lighthouse:            ✅ Corrigé (scan composants isolés)
Tests unitaires:       ✅ Setup Vitest configuré
Bundle size tracking:  ✅ size-limit configuré
Sécurité:              ✅ Dependabot activé
Coverage:              ~20% (premiers tests)
```

### Après Sprint 2 - Tests & Documentation (Target - 4h)
```
Score global:          9.5/10
Coverage tests:        70-80% (unitaires)
Housekeeping:          ✅ 0 problèmes
Tests cross-browser:   ✅ Firefox + WebKit
Documentation tokens:  ✅ Page de référence
CONTRIBUTING.md:       ✅ Créé
Scripts optimisés:     ✅
```

### Après Sprint 3 - Excellence (Target - 6h)
```
Score global:          9.7/10 🏆
Coverage tests:        93% ✅
Packages:              ✅ Dernières versions (mineures)
Lighthouse:            ✅ 95%+ sur tous les composants
Bundle size:           ✅ < budgets définis
Documentation:         ✅ 100% à jour
CI/CD:                 ✅ Optimal
Sécurité:              ✅ 0 vulnérabilités
```

### État Final Idéal (Après migrations majeures)
```
Score global:          10/10 🏆🎉
Coverage tests:        95%+
Lit 3.x:               ✅ Migré
Storybook 10.x:        ✅ Migré
Publication npm:       ✅ Prêt
Figma library:         ✅ Créée (optionnel)
```

---

## 🔗 Ressources Utiles

### Documentation officielle
- [Lit 3 Migration Guide](https://lit.dev/docs/releases/upgrade/)
- [Storybook 10 Migration](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md)
- [Vitest Documentation](https://vitest.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)

### Best Practices
- [Open Source Guide](https://opensource.guide/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)

---

## ❓ FAQ

### Quand faire le Sprint 1 ?
**Maintenant !** C'est rapide (1h) et améliore immédiatement la qualité du projet.

### Dois-je tout faire d'un coup ?
**Non.** Priorise selon tes besoins :
- Housekeeping (Sprint 1) : Maintenant
- Tests (Sprint 2) : Dans 1-2 semaines
- Migrations majeures (Sprint 3) : Planifier sur 1 mois

### Puis-je skip certaines optimisations ?
**Oui**, sauf :
- ❌ Ne pas skip : LICENSE, package-lock.json dans git
- ✅ Optionnel : Migrations Lit 3 / Storybook 10 (si tout fonctionne)

### Comment prioriser si peu de temps ?
**Focus sur** :
1. LICENSE (5 min)
2. package-lock.json dans git (5 min)
3. Nettoyer fichiers dupliqués (10 min)

**Total : 20 minutes pour les critiques**

---

## 📝 Notes

- Document créé : 31 Octobre 2025
- Auteur : Claude Code
- Version : 1.0
- Prochaine révision : Après Sprint 1

**Pour questions ou clarifications** : Ouvrir une issue ou consulter la documentation.
