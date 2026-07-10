# StockHub Design System — État du projet

**Date de rédaction** : 10 juillet 2026
**Dernière activité** : 10 juillet 2026
**Branche active** : `master`
**Version publiée** : v1.4.0

---

## Session du 10 juillet 2026 — Nettoyage repo & gouvernance doc

Préparation du point encadrant "Design System (prisme de la gouvernance)" (semaine du 13 juillet 2026).

### Git

- `master` était divergé de `origin/master` (2 commits locaux non poussés, 2 commits remote — release 1.4.0 via release-please). Rebase + push effectués.
- 16 branches locales mortes supprimées (toutes confirmées mergées via `gh pr list`).
- Stash obsolète sur `feature/chromatic-ci` droppée.
- Conservée : `fix/design-tokens-cleanup` — 4 commits non mergés (séparation tokens/utilities, couleurs info), **décision à prendre** : reprendre ou abandonner.

### Doublons de documentation résolus

- `CHANGELOG.md` (généré par release-please) vs `9-CHANGELOG.md` (historique manuel figé) → renommé en archive `documentation/archive/CHANGELOG-HISTORIQUE-SESSIONS.md`.
- `INTEGRATION-PLAN.md` (plan d'exécution Session 6, actif, référencé par README) vs `PLANNING-INTEGRATION.md` (plan global orphelin, non référencé) → ce dernier archivé dans `documentation/planning/archive/`.
- `DESIGN-SYSTEM-CORRECTIONS.md` (100% résolu) et `OPTIMIZATION-PLAN.md` (figé, superseded par les issues GitHub ouvertes) → archivés dans `documentation/archive/`.
- 2 logs de debug committés par erreur (`build-storybook.log`, `debug-storybook.log`) supprimés.

### Restructuration de `documentation/`

Numérotation unique 1-9 pour les guides/rapports actifs, séparation `sessions/` (comptes-rendus historiques) vs `planning/` (plans encore consultés) vs `archive/` (documents clos). Détail dans `documentation/INDEX.md`.

### Constat gouvernance — doc désynchronisée entre repos

Le wiki GitHub du repo Front (`stockHub_V2_front.wiki`) a une page `Design-System-Guide.md` qui **duplique manuellement** le catalogue de composants, tokens et CI/CD du DS. Elle est déjà périmée : version affichée v1.3.2 (actuelle : v1.4.0), aucune mention des 5 composants ajoutés par la PR #37 (RoleBadge, RoleSelector, CollaboratorList, ContributionForm, ContributionCard). Pas de mécanisme de sync — angle concret pour le rendez-vous gouvernance (voir plus bas).

### Tâches de fond flaguées (non traitées, chips visibles dans la session)

- Migration `.eslintrc.json` → `eslint.config.js` (ESLint 9 ne trouve plus la config, `npm run lint` échoue entièrement)
- 7 événements custom non conformes aux conventions de nommage sur les composants de la PR #37 (`npm run audit:conventions` échoue)
- Reformatage Prettier global de `src/` (53 fichiers jamais passés par la config Prettier actuelle — à faire dans un commit dédié, hors scope du nettoyage doc)

---

## Où en est le projet

### Composants — 18 Web Components

| Niveau | Composants |
|---|---|
| Atoms (5) | `sh-badge` · `sh-icon` · `sh-input` · `sh-logo` · `sh-text` |
| Molecules (7) | `sh-button` · `sh-card` · `sh-metric-card` · `sh-quantity-input` · `sh-search-input` · `sh-stat-card` · `sh-status-badge` |
| Organisms (6) | `sh-header` · `sh-footer` · `sh-page-header` · `sh-ia-alert-banner` · `sh-stock-card` · `sh-stock-prediction-card` |

*(+ RoleBadge, RoleSelector, CollaboratorList, ContributionForm, ContributionCard — issue #35, PR #37)*

### Qualité

- **Accessibilité** : 100% WCAG 2.1 AA, badge Lighthouse auto-mis à jour à chaque push `master`
- **Tests** : 44 tests d'interaction Playwright/Storybook (9 composants couverts) — **0% de tests unitaires** (issues #15, #16 ouvertes)
- **Lint** : cassé actuellement (config ESLint non migrée vers le format flat v9)
- **Conventions** : audit automatisé en CI, 7 violations actuelles sur les composants les plus récents

### CI/CD

Build · tests d'interaction · Chromatic (visual regression, preview par PR) · audit conventions · Lighthouse (sur `master`) · déploiement GitHub Pages · release-please (versioning automatique).

---

## Backlog — issues ouvertes

| # | Titre | Priorité |
|---|---|---|
| #39 | Supprimer les `title` natifs sur les boutons `sh-header` | P2 |
| #34 | Corriger `button-name` sur les boutons internes de `sh-button` (Shadow DOM) | — |
| #33 | Corriger `label-content-name-mismatch` sur le bouton notifications `sh-header` | — |
| #27 | Corriger le contraste du bouton ghost en light mode (WCAG AA) | — |
| #26 | Créer `sh-feature-card` (US-025) | P3 |
| #24 | Upgrade Node 22 + Storybook v10 — *à vérifier, PR #30 déjà mergée sur ce sujet* | — |
| #20 | Éliminer les valeurs en dur restantes (design tokens) | P3 |
| #17 | Améliorer le padding md du bouton | P3 |
| #16 | Tests unitaires `sh-button`, `sh-stock-card` | P2 |
| #15 | Setup infra tests unitaires (`@open-wc/testing`) | P2 |
| #13 | Audit responsive général | P2 |

---

## Pour la prochaine session — par où commencer

1. **Trancher `fix/design-tokens-cleanup`** : reprendre le travail ou supprimer la branche.
2. **#39** — déjà identifiée comme prochaine action côté produit (retirer les `title` natifs sur `sh-header`).
3. **Débloquer la CI locale** : migrer la config ESLint (chip flaguée), corriger les 7 événements non conformes (chip flaguée).
4. **Gouvernance doc inter-repos** : décider d'un mécanisme pour éviter que le wiki Front reparte en dérive (voir angles ci-dessous).

---

## Liens rapides

| Ressource | URL |
|---|---|
| Repo | https://github.com/SandrineCipolla/stockhub_design_system |
| Storybook (Chromatic) | https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/ |
| Rapport Lighthouse | https://SandrineCipolla.github.io/stockhub_design_system/ |
| Package npm | `@stockhub/design-system` |
| GitHub Project | https://github.com/users/SandrineCipolla/projects/3 |
| Repo Front (consommateur) | https://github.com/SandrineCipolla/stockHub_V2_front |
