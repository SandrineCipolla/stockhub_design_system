# Plan d'Optimisation - StockHub Design System

> Document généré le 31 Octobre 2025
> Score global actuel : **8.5/10** ⭐

## 📊 Résumé Exécutif

Le projet est **excellent** avec des fondations solides. Les optimisations recommandées concernent principalement :
- **Housekeeping** (maintenance et propreté du code)
- **Mise à jour des dépendances**
- **Tests unitaires manquants**

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
├── 10-ACCESSIBILITY-REPORT.md   ❌ Nom avec préfixe numérique
├── ACCESSIBILITY-REPORT.md      ✅ Nom standard
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
rm 10-ACCESSIBILITY-REPORT.md
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

## 📊 Métriques de Succès

### Avant optimisation
```
Score global:          8.5/10
Coverage tests:        0% (unitaires)
Packages outdated:     20 packages
Issues housekeeping:   8 problèmes
Documentation:         ⚠️ Quelques incohérences
```

### Après Sprint 1 (Target)
```
Score global:          9.0/10
Issues housekeeping:   0 problèmes ✅
Fichiers propres:      ✅
LICENSE:               ✅
.gitignore:            ✅
```

### Après Sprint 2 (Target)
```
Score global:          9.3/10
Coverage tests:        50-70% (unitaires)
Packages:              À jour (mineurs)
CONTRIBUTING.md:       ✅
Scripts:               Optimisés ✅
```

### Après Sprint 3 (Target)
```
Score global:          9.7/10 🏆
Coverage tests:        93% ✅
Packages:              Dernières versions ✅
Documentation:         100% à jour ✅
CI/CD:                 Optimal ✅
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
