# StockHub Design System : état du projet

> Mis à jour le 27 septembre 2026

Tableau de bord de l'état courant du design system et point de reprise. La documentation est indexée dans [documentation/INDEX.md](documentation/INDEX.md), le suivi des tickets sur le [GitHub Project](https://github.com/users/SandrineCipolla/projects/3). Les sessions de juillet 2026 sont archivées dans [documentation/sessions/2026-07-JOURNAL.md](documentation/sessions/2026-07-JOURNAL.md).

---

## Vue d'ensemble

| Champ            | Valeur                                                                    |
| ---------------- | ------------------------------------------------------------------------- |
| **Version**      | [CHANGELOG.md](CHANGELOG.md), tag Git installé par le frontend            |
| **Stack**        | Lit, TypeScript, Vite, Storybook (versions dans `package.json`)           |
| **Distribution** | `@stockhub/design-system`, installé depuis GitHub par tag                 |
| **Consommateur** | [stockHub_V2_front](https://github.com/SandrineCipolla/stockHub_V2_front) |
| **Soutenance**   | RNCP7, mars 2027                                                          |

---

## Où en est le projet

Catalogue des composants : section « Composants Disponibles » du [README](README.md) et [Storybook](https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/), qui fait foi.

### Qualité

- **Accessibilité** : WCAG 2.1 AA, badge Lighthouse du README mis à jour à chaque push sur `master`
- **Tests** : tests d'interaction Playwright dans Storybook. Pas de tests unitaires (#15, #16)
- **Lint** : `npm run lint`, configuration ESLint flat ([ADR-001](documentation/adr/ADR-001-migration-eslint-flat-config.md))
- **Conventions** : `npm run audit:conventions`, exécuté en CI (préfixe `sh-` des événements, [ADR-002](documentation/adr/ADR-002-renommage-evenements-prefixe-sh.md))
- **Régression visuelle** : Chromatic, une preview par PR

### CI/CD

Build, tests d'interaction, Chromatic, audit des conventions, Lighthouse (sur `master`), déploiement GitHub Pages, Release Please.

---

## Backlog

Issues ouvertes : [liste GitHub](https://github.com/SandrineCipolla/stockhub_design_system/issues), priorités par label `P0` à `P4`.

---

## Pour la prochaine session

1. **`ci.yml`** : remplacer `npx husky install` par `npx husky` (husky 9 a retiré la sous-commande `install`, simple avertissement pour l'instant).
2. **Tests unitaires** : #15 (infrastructure) puis #16.
3. **Branche locale `fix/design-tokens-cleanup`** : absente du dépôt distant, à reprendre ou supprimer sur le poste de travail.

---

## Liens rapides

| Ressource                 | URL                                                        |
| ------------------------- | ---------------------------------------------------------- |
| Repo                      | https://github.com/SandrineCipolla/stockhub_design_system  |
| Storybook (Chromatic)     | https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/ |
| Rapport Lighthouse        | https://SandrineCipolla.github.io/stockhub_design_system/  |
| Package                   | `@stockhub/design-system`                                  |
| GitHub Project            | https://github.com/users/SandrineCipolla/projects/3        |
| Repo Front (consommateur) | https://github.com/SandrineCipolla/stockHub_V2_front       |
