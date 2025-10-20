# Configuration Chromatic

## 🎨 Accès au Storybook en ligne

Le Design System est automatiquement déployé sur Chromatic à chaque commit et PR.

### URLs d'accès :

- **Production (master)** : Sera disponible après la première publication
- **Dernière version** : Visible sur https://www.chromatic.com/builds?appId=VOTRE_APP_ID

### Comment accéder au Storybook d'une PR :

1. Ouvrez la Pull Request sur GitHub
2. Scrollez jusqu'aux checks en bas de la PR
3. Cliquez sur **"Details"** à côté de "Chromatic"
4. Vous serez redirigé vers le Storybook publié pour cette PR

## 🔧 Configuration Chromatic (pour les mainteneurs)

### Obtenir le project token :

1. Allez sur https://www.chromatic.com/
2. Sign in with GitHub
3. Ajoutez le projet `stockhub_design_system`
4. Copiez le project token

### Ajouter le token dans GitHub :

1. Repository Settings → Secrets and variables → Actions
2. New repository secret
3. Name: `CHROMATIC_PROJECT_TOKEN`
4. Value: Le token de Chromatic
5. Add secret

## 📊 Fonctionnalités

- ✅ **Déploiement automatique** : Chaque push déclenche un build
- ✅ **Preview URL** : Chaque PR a son propre Storybook
- ✅ **Visual Testing** : Détection automatique des changements visuels
- ✅ **Historique** : Tous les builds sont archivés

## 🔗 Liens utiles

- [Documentation Chromatic](https://www.chromatic.com/docs/)
- [Chromatic Dashboard](https://www.chromatic.com/builds)
