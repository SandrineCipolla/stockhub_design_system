# AGENTS.md

Règles de méthode pour tout agent IA travaillant sur ce repo (Claude Code,
Cursor, etc.). Indépendant du modèle et de l'outil.

Stack technique, architecture Atomic Design, liste des composants, design
tokens, thèmes, tests, CI/CD : voir [`README.md`](./README.md), pas
dupliqué ici. Process de contribution (branches, commits, issues) : voir
[`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Repositories du projet StockHub V2

Ce repo (Design System) ne vit pas seul, trois repos composent le
projet :

| Repo | Chemin local | GitHub |
|---|---|---|
| Design System (ce repo) | `C:\Users\sandr\Dev\RNCP7\stockhub_design_system` | github.com/SandrineCipolla/stockhub_design_system |
| Backend | `C:\Users\sandr\Dev\Perso\Projets\stockhub\stockhub_back` | github.com/SandrineCipolla/stockhub_back |
| Frontend | `C:\Users\sandr\Dev\RNCP7\StockHubV2\Front_End\stockHub_V2_front` | github.com/SandrineCipolla/stockHub_V2_front |

**GitHub Project** : https://github.com/users/SandrineCipolla/projects/3,
à mettre à jour après chaque modification importante.

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
