# AGENTS.md

Règles de méthode pour tout agent IA travaillant sur ce repo (Claude Code,
Cursor, etc.). Indépendant du modèle/outil.

Stack technique, architecture Atomic Design, liste des composants, design
tokens, thèmes, tests, CI/CD : voir [`README.md`](./README.md) — pas
dupliqué ici.

## Repositories du projet StockHub V2

Ce repo (Design System) ne vit pas seul — trois repos composent le
projet :

| Repo | Chemin local | GitHub |
|---|---|---|
| Design System (ce repo) | — | github.com/SandrineCipolla/stockhub_design_system |
| Backend | `C:\Users\sandr\Dev\RNCP7\StockHubV2\Back_End\stockHub_V2_back` | [À configurer si nécessaire] |
| Frontend | `C:\Users\sandr\Dev\RNCP7\StockHubV2\Front_End\stockhub_V2_front` | github.com/SandrineCipolla/stockHub_V2_front |

**GitHub Project** : https://github.com/users/SandrineCipolla/projects/3 —
à mettre à jour après chaque modification importante.

**Contexte veille/RNCP7** : benchmark produit, plan de veille et
benchmark technique (choix d'un fournisseur d'auth) documentés dans le
Second Brain — `C:\Users\sandr\SecondBrain\SecondBrainSandrine\01-Projets\stockhub-veille.md`.
Référentiel de certification (EADL, Ingétis) :
`C:\Users\sandr\SecondBrain\SecondBrainSandrine\03-Ressources\Cours\referentiel-eadl-ingetis.md`.

**Intégration Frontend → Design System** : dépendance NPM via GitHub
(`@stockhub/design-system`). Détail des imports/usage : voir README.md et
`documentation/REACT-INTEGRATION-GUIDE.md`.

## Avant de committer — toujours exécuter

```bash
npm run format               # Prettier
npm run lint                 # ESLint (TypeScript strict)
npm run audit:conventions    # Conventions de nommage (CI/CD)
npm run build                # Le build doit passer
npm run audit-accessibility  # Lighthouse — avant merge sur master
```

Commits : `type(scope): message` (`feat`, `fix`, `docs`, `style`,
`refactor`, `test`, `chore`).

## Gestion des Issues GitHub

Toujours relire cette section avant d'exécuter `gh issue create`. Ne pas
improviser le format.

**Format User Story** (toute nouvelle fonctionnalité) :

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
```

**Interdit dans le body d'une issue** : détails d'implémentation, étapes
techniques, commandes, TODO techniques — ça va dans la **PR**, pas
l'issue.

| Information | Où |
|---|---|
| Valeur utilisateur, critères d'acceptation | Issue GitHub |
| Idées en cours de dev, questions | Commentaire sur l'issue |
| Choix d'implémentation, composants modifiés | Description de la PR |

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
- [ ] Critère 1"
```

## Workflow de développement

**Avant une feature** : vérifier le GitHub Project → créer une branche
depuis `master` → `npm install`.

**Pendant** : `npm run storybook` en dev, `npm run audit-accessibility:quick`
régulièrement, respecter les design tokens (jamais de couleurs/tailles en
dur).

**Après chaque session** : mettre à jour README.md (nouveaux composants,
badges), ajouter une story Storybook par composant créé/modifié, mettre à
jour le GitHub Project (statuts, issues fermées/créées).

## Rappel critique

- **Issues** = valeur utilisateur uniquement. **PRs** = détails
  techniques.
- Documenter chaque composant dans Storybook.
- `npm run audit-accessibility` avant tout merge sur `master`.
