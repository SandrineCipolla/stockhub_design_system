# Contribuer à StockHub Design System

Ce document décrit le process de contribution : branches, commits, pull requests, gestion des issues GitHub. Pour l'architecture, les composants et les standards de code, voir [README.md](README.md) et [AGENTS.md](AGENTS.md). Guide de rédaction de ce repo : [documentation/guide-redaction.md](documentation/guide-redaction.md).

Les sections entre marqueurs `commun` sont identiques dans les trois repos StockHub et vérifiées par le workflow `docs-check`. Les modifier à l'identique dans les trois repos.

<!-- commun:debut contributing-conventions v1 -->
<!-- Bloc commun aux trois repos StockHub : le modifier à l'identique dans les trois, en incrémentant la version. Vérifié par check-docs. -->

## Conventions Git

### Branches

Format strict :

```
type/numero-description-courte
```

| Type        | Usage                                       |
| ----------- | ------------------------------------------- |
| `feat/`     | Nouvelle fonctionnalité                     |
| `fix/`      | Correction de bug                           |
| `chore/`    | Tâche technique sans valeur métier          |
| `docs/`     | Documentation uniquement                    |
| `test/`     | Tests uniquement                            |
| `refactor/` | Refactoring sans changement de comportement |

**Exemples corrects** : `feat/118-update-item-command`, `fix/84-msal-cache-security`, `docs/101-openapi-endpoints`
**Formats refusés** : `feature/...`, `feat-issue-93-...`, `feat/issue-44-...`.

### Commits (Conventional Commits)

```
type(scope): message concis (closes #numero)
```

- Message en minuscules, verbe à l'infinitif
- Inclure `(closes #numero)` si le commit clôt une issue
- Aucune mention d'outil ou d'IA dans le message
- Pas de tiret cadratin, y compris dans cette syntaxe : parenthèses pour `closes #numero`

**Exemples** : `feat(items): add item edit modal (closes #110)`, `fix(auth): correct msal cache storage (closes #84)`

### Pull requests

- Titre : `type(scope): #numero description`, numéro de ticket juste après `type(scope):`, avant la description, même principe que les branches
- Body : ce qui change, test plan, `Closes #numero`, en suivant le template de PR du repo
- Sections du template sans objet : les supprimer, ne pas écrire « Sans objet »
- Aucune mention d'outil ou d'IA (signature, lien de session, « Generated with ») dans les titres, bodies et commentaires de PR et d'issues
- Vérifier que la CI passe avant de merger

### Revues de PR

Toute revue de PR respecte le guide de rédaction du repo :

1. **Uniquement les points à corriger ou améliorer** : ne pas lister ce qui est validé ou conforme.
2. **Si aucun point à modifier** : ne publier aucun commentaire (ni « Prêt pour fusion », ni « RAS », ni « OK »). Le statut natif de la PR suffit.
3. **Rédaction concrète et factuelle** : écrire court, sans tiret cadratin, sans point-virgule dans la prose, sans point médian, sans qualificatif subjectif ni formule de remplissage.

### Releases

Automatiques via **Release Please** (semver) à chaque push sur la branche principale du repo.

<!-- commun:fin contributing-conventions -->

Dans ce repo, la branche principale est `master`, et le body d'une PR liste les composants modifiés.

## Avant de committer

```bash
npm run format               # Prettier
npm run lint                 # ESLint (TypeScript strict)
npm run audit:conventions    # Conventions de nommage (CI)
npm run build                # Le build doit passer
npm run audit-accessibility  # Lighthouse, avant merge sur master
```

## Guidelines composant

1. Suivre l'architecture Atomic Design
2. Nommer les composants avec le préfixe `sh-`
3. Créer une story Storybook pour chaque composant
4. Utiliser des template strings simples (pas `html` de Lit) dans les stories
5. Icônes : Lucide en PascalCase (ex : `"Package"`, `"TrendingUp"`)
6. Utiliser les design tokens, pas de valeurs en dur
7. Documenter les props TypeScript
8. Maintenir la compatibilité arrière

<!-- commun:debut contributing-issues v1 -->
<!-- Bloc commun aux trois repos StockHub : le modifier à l'identique dans les trois, en incrémentant la version. Vérifié par check-docs. -->

## Gestion des issues GitHub

Les trois repos alimentent un seul [GitHub Project](https://github.com/users/SandrineCipolla/projects/3) : labels et champs sont les mêmes partout.

### Labels obligatoires

Toute issue porte au minimum un label de chaque catégorie :

| Catégorie | Valeurs                                                                        |
| --------- | ------------------------------------------------------------------------------ |
| Scope     | `front`, `back` ou `design-system`, selon le repo                              |
| Type      | `feature`, `improvement`, `bug`, `tech` ou `documentation`                     |
| Priorité  | `P0` à `P4` (critères ci-dessous)                                              |
| Thème     | facultatif : `ai`, `a11y`, `security`, `test`, `rncp`, `seo`, `legal`, `demo`… |

Sens des types :

- `feature` : nouveau comportement visible
- `improvement` : amélioration d'un comportement existant
- `bug` : comportement incorrect
- `tech` : travail sans valeur visible pour l'utilisateur (outillage, dépendances, refactoring, nettoyage, dette technique)
- `documentation` : documentation uniquement

Les labels `dependencies`, `javascript`, `autorelease: pending` et `autorelease: tagged` sont posés par Dependabot et Release Please, ne pas les utiliser à la main.

### Critères de priorité

| Label  | Niveau     | Quand l'utiliser                                                                                  |
| ------ | ---------- | ------------------------------------------------------------------------------------------------- |
| **P0** | Bloquant   | Production inaccessible, fuite de données, vulnérabilité exploitée, CI cassée bloquant tout merge |
| **P1** | Haute      | Fonctionnalité principale cassée sans contournement, régression en prod, blocage de démo RNCP     |
| **P2** | Moyenne    | Bug avec contournement, fonctionnalité importante du sprint, dette qui freine le développement    |
| **P3** | Basse      | Amélioration UX, finition, fonctionnalité secondaire, documentation non urgente                   |
| **P4** | Très basse | Hors périmètre de la soutenance, après RNCP, refactoring cosmétique                               |

### GitHub Project

Toute issue est ajoutée au GitHub Project à sa création, sinon elle n'apparaît pas sur le board. Champs à remplir :

| Champ          | Valeurs                                                 | Règle                                                  |
| -------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| **Priorité**   | 🔴 Très haute à ⚪ Très basse                           | P0 → 🔴, P1 → 🟠, P2 → 🟡, P3 → 🟢, P4 → ⚪, ajustable |
| **Module**     | `Frontend` / `Backend` / `Design System` / `Transverse` | Selon le repo, `Transverse` si plusieurs repos         |
| **Estimation** | Nombre d'heures                                         | Repères : XS 1, S 2, M 5, L 11, XL 20                  |

### Titre d'une issue

Une phrase courte qui décrit le résultat attendu ou le problème observé, compréhensible sans ouvrir l'issue.

- Pas de préfixe manuel (`[US-XXX]`, `[BUG]`, `[TECH]`) : GitHub numérote déjà l'issue
- Pas de préfixe `type(scope):` : ce format sert aux commits et aux PR, le type d'une issue passe par son label

**Exemples** : `Afficher la couverture de tests dans le README`, `Le login échoue après réinitialisation du mot de passe`

### Format User Story

Obligatoire pour toute nouvelle fonctionnalité. Une section **Contexte** facultative peut suivre les critères d'acceptation : le constat qui motive l'issue, sans solution technique.

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

**Interdit dans le body d'une issue** : détails d'implémentation, étapes techniques, commandes, TODO techniques. Ça va dans la PR.

| Information                                | Où                                  |
| ------------------------------------------ | ----------------------------------- |
| Valeur utilisateur, critères d'acceptation | Issue GitHub                        |
| Idées en cours de développement, questions | Commentaire sur l'issue             |
| Choix d'implémentation, fichiers modifiés  | Description de la PR                |
| Décisions d'architecture importantes       | ADR, dans le dossier `adr/` du repo |

<!-- commun:fin contributing-issues -->

Exemple de création pour ce repo :

```bash
gh issue create \
  --title "Phrase courte orientée résultat" \
  --label "design-system,feature,P2" \
  --project "StockHub V2" \
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

**Avant une feature** : vérifier le GitHub Project, créer une branche depuis `master`, `npm install`.

**Version de npm** : npm 11 minimum pour toute modification des dépendances (Node 24, ou `npm install -g npm@11`). npm 10 retire du `package-lock.json` les métadonnées `libc` qu'écrivent npm 11 et Dependabot, et la vérification du lockfile en CI échoue.

**Pendant** : `npm run storybook` en dev, `npm run audit-accessibility:quick` régulièrement, respecter les design tokens (jamais de couleurs ou tailles en dur).

**Après chaque session** : mettre à jour README.md (nouveaux composants, badges), ajouter une story Storybook par composant créé ou modifié, mettre à jour le GitHub Project.

## Rappel critique

- Issues : valeur utilisateur uniquement. PR : détails techniques.
- Documenter chaque composant dans Storybook.
- `npm run audit-accessibility` avant tout merge sur `master`.
