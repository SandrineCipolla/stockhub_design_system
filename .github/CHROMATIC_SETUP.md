# Configuration Chromatic

## 🎨 Accès au Storybook en ligne

Le Design System est automatiquement déployé sur Chromatic à chaque commit et PR.

### URLs d'accès :

- **Storybook en ligne** : https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/
- **Dashboard Chromatic** : https://www.chromatic.com/builds?appId=68f5fbe10f495706cb168751
- **App ID** : `68f5fbe10f495706cb168751`

### Comment accéder au Storybook d'une PR :

1. Ouvrez la Pull Request sur GitHub
2. Scrollez jusqu'aux checks en bas de la PR
3. Cliquez sur **"Details"** à côté de "Chromatic"
4. Vous serez redirigé vers le Storybook publié pour cette PR

## 🔧 Configuration Chromatic (pour les mainteneurs)

### Le project token est déjà configuré

Le token Chromatic est stocké dans les **GitHub Secrets** : `CHROMATIC_PROJECT_TOKEN`

**Pour retrouver ou modifier le token** :
1. Allez sur : https://github.com/SandrineCipolla/stockhub_design_system/settings/secrets/actions
2. Le secret `CHROMATIC_PROJECT_TOKEN` est listé (la valeur est chiffrée)
3. Pour modifier : Delete le secret + recréer avec la nouvelle valeur

**Pour récupérer le token depuis Chromatic** :
1. Allez sur le [dashboard Chromatic](https://www.chromatic.com/builds?appId=68f5fbe10f495706cb168751)
2. Settings → Manage → Project Tokens
3. Le token actuel est visible dans le dashboard Chromatic, sous Settings → Manage → Project Tokens. Ne copiez jamais le token dans la documentation ou le code, utilisez-le uniquement pour configurer le secret GitHub `CHROMATIC_PROJECT_TOKEN`.

## 📊 Fonctionnalités

- ✅ **Déploiement automatique** : Chaque push déclenche un build
- ✅ **Preview URL** : Chaque PR a son propre Storybook
- ✅ **Visual Testing** : Détection automatique des changements visuels
- ✅ **Historique** : Tous les builds sont archivés

## 🔗 Liens utiles

- [Documentation Chromatic](https://www.chromatic.com/docs/)
- [Chromatic Dashboard](https://www.chromatic.com/builds)
