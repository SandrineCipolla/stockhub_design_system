# AGENTS.md

Règles de méthode pour tout agent IA travaillant sur ce repo (Claude Code,
Cursor, etc.). Indépendant du modèle et de l'outil. `CLAUDE.md` importe ce fichier.

Stack technique, architecture Atomic Design, liste des composants, design
tokens, thèmes, tests, CI/CD : voir [`README.md`](./README.md), pas
dupliqué ici. Process de contribution (branches, commits, issues) : voir
[`CONTRIBUTING.md`](./CONTRIBUTING.md).

<!-- commun:debut repositories v1 -->
<!-- Bloc commun aux trois repos StockHub : le modifier à l'identique dans les trois, en incrémentant la version. Vérifié par check-docs. -->

## Repositories du projet StockHub

| Repo          | GitHub                                                    | Branche principale | Chemin local (poste de Sandrine)                                  |
| ------------- | --------------------------------------------------------- | ------------------ | ----------------------------------------------------------------- |
| Frontend      | https://github.com/SandrineCipolla/stockHub_V2_front      | `main`             | `C:\Users\sandr\Dev\RNCP7\StockHubV2\Front_End\stockHub_V2_front` |
| Backend       | https://github.com/SandrineCipolla/stockhub_back          | `main`             | `C:\Users\sandr\Dev\Perso\Projets\stockhub\stockhub_back`         |
| Design System | https://github.com/SandrineCipolla/stockhub_design_system | `master`           | `C:\Users\sandr\Dev\RNCP7\stockhub_design_system`                 |

### Environnements

| Env        | Frontend                                                                                                 | Backend                                                                                             | Base de données             |
| ---------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------- |
| Local      | `localhost:5173`                                                                                         | `localhost:3006` (Docker)                                                                           | MySQL Docker, port 3308     |
| Staging    | Vercel, branche `staging` : https://stock-hub-v2-front-git-staging-sandrinecipollas-projects.vercel.app/ | Render.com, suit `main` : https://stockhub-back.onrender.com/api                                    | Aiven MySQL                 |
| Production | Azure Static Web Apps, branche `main` : https://brave-field-03611eb03.5.azurestaticapps.net              | Azure App Service, plan F1 : https://stockhub-back-bqf8e6fbf6dzd6gs.westeurope-01.azurewebsites.net | Azure MySQL Flexible Server |

- Répartition des hébergeurs : [ADR-013 du frontend](https://github.com/SandrineCipolla/stockHub_V2_front/blob/main/docs/adr/ADR-013-production-azure-previews-vercel.md). Le staging est en réparation (frontend #314).
- Le plan F1 d'Azure App Service a un quota CPU journalier : `npm run azure:start` avant de tester en production, `npm run azure:stop` après (repo backend).
- Design System : Storybook sur https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/, package `@stockhub/design-system` installé depuis GitHub (version dans le `package.json` du frontend).

### Suivi

- GitHub Project commun aux trois repos : https://github.com/users/SandrineCipolla/projects/3, à mettre à jour après chaque modification importante.
- Wiki transverse : https://github.com/SandrineCipolla/stockHub_V2_front/wiki

<!-- commun:fin repositories -->

## Contexte propre à ce repo

**Contexte veille/RNCP7** (notes personnelles hors dépôt, lisibles
seulement sur le poste de Sandrine) : benchmark produit, plan de veille et
benchmark technique (choix d'un fournisseur d'auth) dans
`C:\Users\sandr\SecondBrain\SecondBrainSandrine\01-Projets\stockhub-veille.md`.
Référentiel de certification (Expert en Architecture et Développement
Logiciel, INGETIS) :
`C:\Users\sandr\SecondBrain\SecondBrainSandrine\03-Ressources\Cours\referentiel-eadl-ingetis.md`.

**Intégration Frontend → Design System** : dépendance NPM via GitHub
(`@stockhub/design-system`). Détail des imports/usage : voir README.md et
[`documentation/4-REACT-INTEGRATION-GUIDE.md`](./documentation/4-REACT-INTEGRATION-GUIDE.md).

## Avant de committer, toujours exécuter

```bash
npm run format               # Prettier
npm run lint                 # ESLint (TypeScript strict)
npm run audit:conventions    # Conventions de nommage (CI/CD)
npm run build                # Le build doit passer
npm run audit-accessibility  # Lighthouse, avant merge sur master
```

Commits : `type(scope): message` (`feat`, `fix`, `docs`, `style`,
`refactor`, `test`, `chore`).

## Gestion des issues GitHub et workflow de développement

Voir [CONTRIBUTING.md](./CONTRIBUTING.md) : format User Story, ce qui est interdit dans le body d'une issue, workflow avant/pendant/après une feature.

## Rappel critique

- Issues : valeur utilisateur uniquement. PR : détails techniques.
- Documenter chaque composant dans Storybook.
- `npm run audit-accessibility` avant tout merge sur `master`.
