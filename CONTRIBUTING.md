# Contribuer à StockHub Design System

Ce document décrit le process de contribution : branches, commits, pull requests, gestion des issues GitHub. Pour l'architecture, les composants et les standards de code, voir [README.md](README.md) et [AGENTS.md](AGENTS.md).

## Conventions Git

### Branches

Format : `type/issue-number-short-description` (ex : `fix/39-remove-native-title-sh-header`, `chore/52-dependabot-setup`, `docs/document-pr37-components`).

### Commits

```
type(scope): message
```

Types : `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

**Exemples** : `feat(atoms): add sh-badge component`, `fix(molecules): correct sh-button disabled state`.

### Releases

Automatiques via **Release Please** (semver) sur push `master`.

### Revues de PR (Code & Doc Reviews)

Toute revue de PR doit respecter le [guide-redaction.md](documentation/guide-redaction.md) :

1. **Uniquement les points à corriger ou améliorer** : Ne pas lister ce qui est validé ou conforme. Un commentaire de revue sert exclusivement à signaler des éléments à modifier ou améliorer.
2. **Si aucun point à modifier** : Ne pas ajouter de commentaire de revue inutile. Le statut de la PR suffit.
3. **Rédaction concrète et factuelle** :
   - Écrire court pour réduire le temps de relecture.
   - Aucun tiret cadratin (`—`).
   - Aucun point-virgule dans la prose (`;`).
   - Aucun point médian (`·`).
   - Aucun qualificatif subjectif ou formule de remplissage.

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

## Gestion des issues GitHub

Toujours relire cette section avant `gh issue create`, ne pas improviser le format.

### Format User Story (toute nouvelle fonctionnalité)

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

| Information | Où |
| --- | --- |
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

**Avant une feature** : vérifier le GitHub Project, créer une branche depuis `master`, `npm install`.

**Pendant** : `npm run storybook` en dev, `npm run audit-accessibility:quick` régulièrement, respecter les design tokens (jamais de couleurs ou tailles en dur).

**Après chaque session** : mettre à jour README.md (nouveaux composants, badges), ajouter une story Storybook par composant créé ou modifié, mettre à jour le GitHub Project.

## Rappel critique

- Issues : valeur utilisateur uniquement. PR : détails techniques.
- Documenter chaque composant dans Storybook.
- `npm run audit-accessibility` avant tout merge sur `master`.
