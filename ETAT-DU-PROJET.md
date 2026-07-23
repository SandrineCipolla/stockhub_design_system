# StockHub Design System — État du projet

**Date de rédaction** : 10 juillet 2026
**Dernière activité** : 23 juillet 2026
**Branche active** : `master`
**Version publiée** : v2.0.3 — v2.0.0 = breaking change renommage d'événements custom, voir #42 (patch #78/#83 mergé, pas encore publié via release-please)

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

### Constat gouvernance — doc désynchronisée entre repos (résolu)

Le wiki GitHub du repo Front (`stockHub_V2_front.wiki`) avait une page `Design-System-Guide.md` qui **dupliquait manuellement** le catalogue de composants, tokens et CI/CD du DS. Elle était déjà périmée : version affichée v1.3.2 (actuelle : v1.4.0), aucune mention des 5 composants ajoutés par la PR #37 (RoleBadge, RoleSelector, CollaboratorList, ContributionForm, ContributionCard). **Corrigé le 10 juillet 2026** : page remplacée par des liens vers les sources vivantes du DS (README, ce fichier, Storybook, CHANGELOG) — élimine le risque de dérive plutôt que d'automatiser une synchro.

### Issues créées suite au nettoyage

Trois anomalies trouvées en marge du nettoyage (pas de rapport avec les doublons de doc), transformées en issues GitHub et ajoutées au [Project #3](https://github.com/users/SandrineCipolla/projects/3) :

| # | Titre | Labels |
|---|---|---|
| [#41](https://github.com/SandrineCipolla/stockhub_design_system/issues/41) | `npm run lint` échoue — config ESLint non migrée vers le format flat (v9) | bug, design-system, P1 |
| [#42](https://github.com/SandrineCipolla/stockhub_design_system/issues/42) | `npm run audit:conventions` échoue — 7 événements custom non conformes (composants issue #35) | bug, design-system, P1 |
| [#43](https://github.com/SandrineCipolla/stockhub_design_system/issues/43) | Reformater `src/` avec Prettier (jamais appliqué depuis un moment) | technique, design-system, P2 |

Au passage : le label `technique` référencé par le template d'issue `.github/ISSUE_TEMPLATE/tache_technique.yml` n'existait pas dans le repo — créé pour que le template soit utilisable.

### Fait le 10 juillet 2026

- **#41** — Migration ESLint 9 flat config, `npm run lint` fonctionne de nouveau (0 erreur, 70 warnings pré-existants inchangés). Détail et alternatives pesées : [ADR 0001](documentation/adr/0001-migration-eslint-flat-config.md).
- **#42** — Renommage des 7 événements custom avec préfixe `sh-` (PR [#44](https://github.com/SandrineCipolla/stockhub_design_system/pull/44), mergée). **Breaking change** publié en v2.0.0 : `stockHub_V2_front` (pinné `v1.3.3`) consomme encore les anciens noms dans 4 fichiers — coordination en cours via [stockHub_V2_front#192](https://github.com/SandrineCipolla/stockHub_V2_front/issues/192), **ne pas installer v2.0.0 côté Front avant que cette issue soit traitée**. Détail : [ADR 0002](documentation/adr/0002-renommage-evenements-prefixe-sh.md).
- **#45** — Job CI `chromatic` cassé depuis un moment (`preview-stats.json` manquant pour TurboSnap) réparé en ajoutant `--stats-json` à `build-storybook` (PR [#46](https://github.com/SandrineCipolla/stockhub_design_system/pull/46), mergée). 35 changements visuels accumulés pendant la panne, revus et acceptés comme nouvelles baselines Chromatic.
- **#48** — 10 composants jamais documentés dans le README (5 de la PR #37 + 5 organisms plus anciens, dont `sh-stock-item-card` repositionné depuis Molecules vers Organisms) (PR [#49](https://github.com/SandrineCipolla/stockhub_design_system/pull/49), mergée). Props/événements vérifiés contre le code source. Trouvaille au passage : JSDoc de `sh-ia-alert-banner.ts` incohérent avec son propre code (`@fires sh-ia-alert-click` vs `sh-ia-alert-toggle` réellement émis) — voir #51.

### Fait le 19-20 juillet 2026

- **#51** — JSDoc `sh-ia-alert-banner` incohérent avec le code réel corrigé (PR [#53](https://github.com/SandrineCipolla/stockhub_design_system/pull/53), mergée). Trouvaille au passage : `sh-quantity-input.ts` dispatchait `sync` sans préfixe `sh-` alors que son propre JSDoc documentait déjà `sh-sync` — code corrigé pour respecter la convention plutôt que la doc affaiblie.
- **#52** — Dependabot mis en place (PR [#54](https://github.com/SandrineCipolla/stockhub_design_system/pull/54), mergée). 16/21 vulnérabilités npm corrigées (les 9 *high* incluses) via `npm audit fix`. 5 *moderate* restantes sur `uuid` (transitive, dev-only) — pas forcées, jugées non critiques.
- **Vague de bumps Dependabot** (56, 59, 61, 62, 63, 66, 68, 70/71, 72, 73) passée en revue une par une et mergée. 3 bumps majeurs fermés avec `@dependabot ignore this major version` car réellement bloquants (`typescript-eslint` ne supporte ni TS7 ni ESLint 10 ; `@storybook/builder-vite` ne supporte pas Vite 8) — suivi dans [#64](https://github.com/SandrineCipolla/stockhub_design_system/issues/64) (Vite 8) et [#65](https://github.com/SandrineCipolla/stockhub_design_system/issues/65) (ESLint 10). `lit` 2.8→3.3.3 mergé après vérification (aucune API dépréciée utilisée dans le repo).
- **`husky` 8→9** : mergé, mais `npx husky install` (utilisé dans `ci.yml`) affiche `DEPRECATED` — husky 9 a retiré cette commande au profit de `npx husky` seul. Pas bloquant aujourd'hui, à corriger à l'occasion.
- Version publiée : v2.0.2 (release-please, PR #67).
- **#39** — `title` natifs retirés sur les boutons notifications/thème/connexion de `sh-header` (PR [#75](https://github.com/SandrineCipolla/stockhub_design_system/pull/75), mergée), + le `title` du nom d'utilisateur du même header, même souci (PR [#77](https://github.com/SandrineCipolla/stockhub_design_system/pull/77), mergée). Vérifié manuellement dans Storybook : aria-label toujours fonctionnels, 0 violation d'accessibilité détectée par l'addon a11y.
- **Trouvaille en marge de #39** : les boutons Login/Logout de `sh-header` n'ont jamais eu de vrai `aria-label` fonctionnel — `.ariaLabel="chaîne statique"` sans `${}` n'est pas reconnu comme binding de propriété par Lit-html (qui n'active les préfixes `.`/`@`/`?` qu'en présence d'une interpolation). Bug pré-existant, aggravé sur mobile (texte visible masqué en CSS) → [#78](https://github.com/SandrineCipolla/stockhub_design_system/issues/78), pas encore corrigé.
- **Coordination Front (stockHub_V2_front#192) — ✅ close le 21 juillet 2026.** PR [#193](https://github.com/SandrineCipolla/stockHub_V2_front/pull/193) mergée : bump `@stockhub/design-system` `v1.3.3` → `v2.0.3`, 4 fichiers adaptés aux nouveaux noms d'événements. Vérifié en conditions réelles (backend staging Render.com, données réelles) : changement de rôle collaborateur testé bout-en-bout dans l'UI, événement `sh-collaborator-role-change` reçu, appel API réussi. 556 tests unitaires + build Front passants. Mergée avec 3 autres PR Front en attente depuis mi-juin : [#191](https://github.com/SandrineCipolla/stockHub_V2_front/pull/191) (fix auth reconnexion, vérifiée en simulant le bug réel — verrou `interaction.status` périmé nettoyé avec succès), [#185](https://github.com/SandrineCipolla/stockHub_V2_front/pull/185) (bump js-yaml), [#187](https://github.com/SandrineCipolla/stockHub_V2_front/pull/187) (release-please 1.15.0, mergée en dernier). Build final sur `main` vérifié après coup, tout passe. **Le Front est maintenant sur la dernière version du DS.**

### Fait le 23 juillet 2026

- **#78 (P1/majeur) — ✅ réglé** (PR [#82](https://github.com/SandrineCipolla/stockhub_design_system/pull/82), mergée). `aria-label` cassé sur les boutons Login/Logout de `sh-header` : `.ariaLabel="chaîne statique"` n'est jamais reconnu comme binding de propriété par lit-html (les préfixes `.`/`@`/`?` ne s'activent qu'en présence d'une interpolation `${}`, contrairement au bouton theme-toggle du même composant qui fonctionnait déjà pour cette raison). Remplacé par l'attribut standard `aria-label="..."` sur les deux boutons — `sh-button` déclare déjà `ariaLabel` avec `attribute: 'aria-label'`, donc l'attribut est correctement reflété en propriété et propagé au `<button>` interne du Shadow DOM. Vérifié en conditions réelles dans Storybook (états `isLoggedIn=true`/`false`), pas seulement en lecture de code. Diff volontairement scopé aux 2 lignes concernées — la dette Prettier pré-existante sur ce fichier (#43) n'a pas été traitée au passage.
- **Chore sans issue dédiée — ✅ mergé** (PR [#83](https://github.com/SandrineCipolla/stockhub_design_system/pull/83)). `custom-elements.json` régénéré via `npm run analyze` (était périmé, `sh-role-badge` et d'autres composants absents du manifest bien que présents dans `src/`). Config `.claude/` locale versionnée au passage (agents `code-reviewer`/`test-writer`, `launch.json` preview Storybook) — jusque-là non trackée alors qu'utile à quiconque travaille sur ce repo avec Claude Code.
- **Nettoyage doc sans issue dédiée** (PR [#86](https://github.com/SandrineCipolla/stockhub_design_system/pull/86)). `documentation/INDEX.md` était périmé depuis octobre 2025 (16 composants, sessions 1-8 seulement, aucun renvoi vers ce fichier). Mis à jour : renvoi explicite vers `ETAT-DU-PROJET.md` en tête de fichier, comptage composants et arborescence Storybook 16→24, sessions 1-8 marquées comme historique figé, section "Notes de Version" dupliquée remplacée par un repère de jalons + renvoi vers `CHANGELOG.md`, versions outillage corrigées (Storybook 10.2.15, Vite au lieu de Rollup, Lit 3.3.3), lien ajouté vers ADR 0002.

---

## Où en est le projet

### Composants — 24 Web Components

| Niveau | Composants |
|---|---|
| Atoms (6) | `sh-badge` · `sh-icon` · `sh-input` · `sh-logo` · `sh-role-badge` · `sh-text` |
| Molecules (10) | `sh-button` · `sh-card` · `sh-contribution-card` · `sh-contribution-form` · `sh-metric-card` · `sh-quantity-input` · `sh-role-selector` · `sh-search-input` · `sh-stat-card` · `sh-status-badge` |
| Organisms (8) | `sh-collaborator-list` · `sh-footer` · `sh-header` · `sh-ia-alert-banner` · `sh-page-header` · `sh-stock-card` · `sh-stock-item-card` · `sh-stock-prediction-card` |

Tous documentés dans le README depuis le 10 juillet 2026 (voir #48).

### Qualité

- **Accessibilité** : 100% WCAG 2.1 AA, badge Lighthouse auto-mis à jour à chaque push `master`
- **Tests** : 44 tests d'interaction Playwright/Storybook (9 composants couverts) — **0% de tests unitaires** (issues #15, #16 ouvertes)
- **Lint** : fonctionne à nouveau depuis le 10 juillet 2026 (0 erreur, 70 warnings pré-existants) — voir [ADR 0001](documentation/adr/0001-migration-eslint-flat-config.md)
- **Conventions** : audit automatisé en CI, 0 violation depuis le 10 juillet 2026 (était 7)
- **Chromatic** : job CI de nouveau fonctionnel depuis le 10 juillet 2026 (était cassé, voir #45)

### CI/CD

Build · tests d'interaction · Chromatic (visual regression, preview par PR) · audit conventions · Lighthouse (sur `master`) · déploiement GitHub Pages · release-please (versioning automatique).

---

## Backlog — issues ouvertes

| # | Titre | Priorité |
|---|---|---|
| #43 | Reformater `src/` avec Prettier | P2 |
| #50 | Documentation riche des composants via pages MDX Storybook (guidelines, do's/don'ts, a11y) | P3 |
| #64 | Migrer vers Vite 8 (config rollupOptions + vérification bundle) | P3 |
| #65 | Migrer vers ESLint 10 (coordonner avec @eslint/js et typescript-eslint) | P3 |
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
2. **#43** — reformatage Prettier global, quand un créneau se libère (peu urgent, P2).
3. **`ci.yml`** — remplacer `npx husky install` par `npx husky` (husky 9 a supprimé la sous-commande `install`, juste un warning de dépréciation pour l'instant).
4. Plus aucun P1 ouvert sur ce repo après #78 — sinon reprendre le backlog P2/P3 ci-dessus (#15/#16 tests unitaires en priorité, 0% de couverture actuellement).

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
