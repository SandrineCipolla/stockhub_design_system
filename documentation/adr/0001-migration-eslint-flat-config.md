# 0001. Migrer vers eslint.config.js (flat config)

**Statut** : Acceptée
**Date** : 10 juillet 2026
**Issue** : #41

## Contexte

ESLint 9.38.0 est installé dans le repo, mais la config restait au format
`.eslintrc.json` (déprécié depuis ESLint v9, qui exige un
`eslint.config.js` par défaut). Résultat : `npm run lint` échouait
immédiatement avec *"ESLint couldn't find an eslint.config.(js|mjs|cjs)
file"* — aucune règle de lint n'était vérifiée, ni en local ni en CI.

## Décision

Remplacer `.eslintrc.json` par `eslint.config.js` (format flat), en
conservant strictement les mêmes règles custom (`camelcase`,
`@typescript-eslint/no-unused-vars` en warn, `no-explicit-any` en warn,
`no-console` en warn) plutôt que de les redéfinir ou d'adopter un preset
plus strict à cette occasion.

Deux ajustements ont été nécessaires pour que le flat config soit
réellement équivalent à l'ancien comportement, pas juste syntaxiquement
migré :

- `no-undef` désactivé pour les fichiers TypeScript — la règle de base
  ESLint ne connaît pas les types DOM globaux (`EventListener`, etc.) et
  générait des faux positifs sur du code valide. TypeScript vérifie déjà
  ces références à la compilation, donc `no-undef` n'apporte rien côté TS
  et coûte du bruit.
- Les globals Node (`__dirname`, etc.) sont scopés uniquement à
  `src/tokens/generate-css.ts`, le seul fichier du repo qui s'exécute côté
  Node (script de génération des tokens) plutôt que dans le navigateur.

## Conséquences

- `npm run lint` fonctionne à nouveau : 0 erreur, 70 warnings
  pré-existants (`any`/`console`), inchangés par rapport à avant la
  migration — cette dette n'est pas traitée ici, elle reste visible.
- La remise en route du lint a révélé 3 erreurs réelles et pré-existantes
  (imports Storybook incorrects sur 3 composants organisms), corrigées
  dans le même commit car mécaniques et sans risque.
- **Constat non résolu par cet ADR** : `npm run lint` n'est toujours pas
  appelé dans `.github/workflows/ci.yml` (seul `audit:conventions` l'est).
  Le lint cassé n'a donc jamais fait échouer de build CI — ce qui explique
  en partie pourquoi la dérive est passée inaperçue aussi longtemps.
  Ajouter `npm run lint` comme gate CI reste une décision à prendre
  séparément (pas tranchée ici).
