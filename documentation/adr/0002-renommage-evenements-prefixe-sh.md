# 0002. Renommer 7 événements custom non conformes avec le préfixe `sh-`

**Statut** : Acceptée
**Date** : 10 juillet 2026
**Issue** : #42

## Contexte

`npm run audit:conventions` (gate CI) échouait sur 7 événements custom
introduits par la PR #37 (issue #35 — RoleSelector, CollaboratorList,
ContributionForm, ContributionCard) : aucun ne respectait la règle
`isShPrefix` d'`audit-conventions.cjs`, qui exige que tout événement
custom commence par `sh-` (cohérent avec les événements déjà en place,
ex. `sh-metric-click`, `sh-stat-click`).

Ces événements ne sont pas un détail interne : `stockHub_V2_front`
(pinné sur le tag `v1.3.3` du DS) les consomme déjà dans 4 fichiers
(`ContributionFormModal.tsx`, `CollaboratorsModal.tsx`,
`PendingContributionsSection.tsx`, `web-components.d.ts`). Renommer un
événement public sans coordination casserait silencieusement ces usages.

## Décision

Renommer les 7 événements avec le préfixe `sh-`, sans période de
transition ni double-émission :

| Ancien nom | Nouveau nom |
|---|---|
| `contribution-approve` | `sh-contribution-approve` |
| `contribution-reject` | `sh-contribution-reject` |
| `contribution-submit` | `sh-contribution-submit` |
| `contribution-cancel` | `sh-contribution-cancel` |
| `role-change` | `sh-role-change` |
| `collaborator-role-change` | `sh-collaborator-role-change` |
| `collaborator-remove` | `sh-collaborator-remove` |

## Alternatives envisagées

- **Dual-dispatch temporaire** (émettre l'ancien et le nouveau nom en
  parallèle) : évitait la casse immédiate côté Front, mais ajoutait de
  la dette (code à nettoyer plus tard, deux noms qui cohabitent) pour un
  gain limité — ces composants viennent d'être livrés (PR #37, avril
  2026), la fenêtre de coordination avec le seul consommateur (Front)
  est courte.
- **Ignorer l'audit sur ces 4 composants** (exception dans
  `audit-conventions.cjs`) : rejeté, ça viderait la gate de son sens et
  créerait un précédent pour ne jamais corriger la dette de nommage.

## Conséquences

- Breaking change assumé, versionné comme tel (commit `fix!:` avec
  footer `BREAKING CHANGE`, release-please doit faire un bump majeur).
- Issue de suivi ouverte côté Front pour coordonner la mise à jour des 4
  fichiers consommateurs avant d'installer une version du DS postérieure
  à `v1.3.3` : [stockHub_V2_front#192](https://github.com/SandrineCipolla/stockHub_V2_front/issues/192).
- Constat séparé, pas traité ici : le README du DS ne documentait déjà
  pas ces 4 composants depuis leur ajout — flaggé comme tâche de fond
  indépendante, pas un blocage pour ce renommage.
