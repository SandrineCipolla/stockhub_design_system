---
name: close-issue
description: Documente puis ferme une issue GitHub sur stockhub_design_system. Se déclenche sur des demandes comme "ferme l'issue #X", "on peut clore le ticket", "closes cette issue" — ne JAMAIS fermer une issue via gh issue close sans être passé par ce skill d'abord, même si la correction semble triviale.
---

# Fermer une issue — documenter avant de clore

Une issue résolue mais fermée « à sec » perd son savoir : pourquoi ce choix,
ce que ça change pour un consommateur du Design System, si c'est encore
pertinent dans six mois. Ce skill route la documentation vers le bon
endroit **avant** d'exécuter `gh issue close` — jamais après, jamais sans.

## 0. Avant même de committer le fix — attention à `closes #N`

GitHub ferme automatiquement une issue dès qu'un commit contenant
`closes #N` (ou `fixes`/`resolves #N`) atterrit sur la branche par défaut.
Si le fix mérite un ADR (voir qualification ci-dessous), écrire `closes #N`
dans le commit de correction court-circuite ce skill : l'issue se ferme au
push, avant que la doc existe.

- Le changement va probablement qualifier pour un ADR ou une mise à jour
  README (config/outillage structurant, comportement consommateur) →
  utiliser `refs #N` dans le message de commit du fix, jamais `closes`.
  Fermer explicitement via `gh issue close` à l'étape 3, une fois la doc
  écrite.
- Le changement est un correctif trivial (la seule doc nécessaire est la
  ligne dans `ETAT-DU-PROJET.md`, faisable avant le commit) → `closes #N`
  reste très bien, pas besoin de s'en priver.

Si l'issue s'est déjà auto-fermée avant que tu aies pu documenter
(l'oubli est fait), ne le traite pas comme un échec silencieux : écris la
doc quand même, puis ajoute-la en commentaire sur l'issue déjà fermée
(`gh issue comment`) plutôt que de sauter l'étape.

## 1. Qualifie le changement

Avant de choisir où documenter, détermine ce que l'issue a réellement changé :

- **Décision d'architecture ou d'outillage** — un choix structurant avec un
  "pourquoi" qui ne se lit pas dans le code seul (ex : migration de config,
  choix d'une lib plutôt qu'une autre, changement de convention). Le code
  dit *quoi*, il ne dit jamais *pourquoi celui-là plutôt qu'un autre*.
- **Comportement consommateur** — ça change ce qu'un projet qui installe
  `@stockhub/design-system` voit ou utilise (nouvelle prop, nouveau
  composant, breaking change, changement de rendu).
- **Correctif mineur / suivi de projet pur** — bug ponctuel, ajustement
  cosmétique, tâche sans décision à motiver. Le fait que ce soit fait
  suffit ; il n'y a rien à expliquer.

Une issue peut relever de plusieurs catégories à la fois — documente
chacune à l'endroit qui lui correspond, ne choisis pas une seule case par
paresse.

## 2. Documente à l'endroit qui correspond

### Décision d'architecture/outillage → ADR

Si `documentation/adr/` n'existe pas encore, crée-le au premier besoin.
Un ADR par décision, fichier `documentation/adr/NNNN-titre-court.md`
(numérotation à 4 chiffres, continue depuis le dernier existant) :

```markdown
# NNNN. [Titre de la décision, à l'affirmative]

**Statut** : Acceptée
**Date** : [date du jour]
**Issue** : #[numéro]

## Contexte
[Le problème concret qui forçait à trancher. Pas de généralités.]

## Décision
[Ce qui a été choisi, en une ou deux phrases.]

## Alternatives envisagées
[Ce qu'on aurait pu faire à la place, et pourquoi ce n'était pas retenu —
uniquement s'il y avait un vrai choix, sinon omettre la section.]

## Conséquences
[Ce que ça implique pour la suite : dette assumée, contrainte pour les
prochains composants, gate CI qui change de comportement, etc.]
```

Garde-le court — un ADR qui fait deux pages n'est pas relu. Le but est
qu'un lecteur pressé comprenne le pourquoi en 30 secondes.

**N'en écris pas un** si le changement n'avait pas de vraie alternative à
peser (ex : corriger une faute de frappe n'est pas une décision).

### Comportement consommateur → README.md / documentation/

Si l'issue ajoute, modifie ou retire quelque chose qu'un consommateur du
DS voit (prop, composant, événement, breaking change) : mets à jour la
section concernée du README (catalogue de composants) et/ou le guide
`documentation/` correspondant (ex : `documentation/5-COMPONENT-DOCUMENTATION.md`).
C'est la même règle que pour toute nouvelle feature — voir `AGENTS.md`
("mettre à jour README.md, ajouter une story Storybook").

### Toujours → ETAT-DU-PROJET.md

Que l'issue soit un ADR, un changement consommateur, ou un simple
correctif : retire-la du backlog dans `ETAT-DU-PROJET.md` et ajoute une
ligne dans une section "fait" avec la date. C'est le seul geste
obligatoire dans tous les cas, y compris les issues triviales.

### Si l'issue était suivie dans le Vault → délègue à `capture-connaissances`

Ne réécris pas ici la logique de capitalisation Vault, elle existe déjà et
elle est bonne : `capture-connaissances` (Second Brain, catégorie
Knowledge). Si cette skill est disponible dans la session, invoque-la —
elle vérifiera elle-même si l'issue est mentionnée dans
`01-Projets/stockhub-design-system.md`, si sa résolution a une valeur
future réelle, et proposera la mise à jour avant d'écrire quoi que ce
soit.

Si `capture-connaissances` n'est pas invocable dans cette session
(skill non chargée), applique sa philosophie à la main plutôt que de
l'ignorer : vérifie si l'issue apparaît dans la note Vault existante,
ne capitalise que si sa perte serait une perte réelle dans six mois,
propose la mise à jour et attends validation avant d'écrire — ne duplique
jamais le contenu de l'ADR ou du README dans le Vault, un renvoi suffit
(`voir ADR NNNN` ou `voir #X`).

## 3. Ferme l'issue

Une fois la documentation pertinente écrite (et seulement à ce moment) :
vérifie d'abord si elle n'est pas déjà fermée (`closes #N` auto-close au
push, voir étape 0) — si oui, ajoute la doc en commentaire au lieu de
refermer :

```bash
gh issue view [numéro] --json state -q '.state'
# OPEN → fermer avec le résumé :
gh issue close [numéro] --comment "Résolu par [commit ou PR]. [Une phrase de résumé + lien vers l'ADR/doc si applicable]."
# CLOSED → juste documenter en commentaire :
gh issue comment [numéro] --body "[Une phrase de résumé + lien vers l'ADR/doc]"
```

## Règle de proportionnalité

Ne sur-documente pas. Un ADR pour un changement de padding CSS est aussi
inutile qu'un `gh issue close` sec pour une migration d'outillage
structurante. La question à te poser : **si quelqu'un relit ce repo dans
six mois, qu'est-ce qui lui manquerait pour comprendre ce choix ?** Si la
réponse est "rien, le code et le commit suffisent", ne crée pas de doc en
plus de la mise à jour d'`ETAT-DU-PROJET.md`.
