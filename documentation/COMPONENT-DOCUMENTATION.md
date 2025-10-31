# Guide de Documentation des Composants

## Vue d'ensemble

Tous les composants du Design System StockHub sont documentés avec des commentaires JSDoc et une documentation générée automatiquement via le Custom Elements Manifest Analyzer.

## Système de documentation

### Stack technique

- **@custom-elements-manifest/analyzer** : Analyse les composants Lit et génère le fichier `custom-elements.json`
- **Storybook autodocs** : Génère automatiquement les pages de documentation à partir du manifest
- **JSDoc** : Format standard de documentation JavaScript pour les métadonnées des composants

### Fonctionnement

1. Les commentaires JSDoc sont ajoutés aux classes et propriétés des composants
2. La commande `npm run analyze` génère le fichier `custom-elements.json` à partir du code source
3. Storybook lit le manifest et affiche la documentation dans l’onglet **Docs**
4. La documentation se met à jour automatiquement lors du lancement de `npm run storybook`

## Rédiger la documentation des composants

### Documentation au niveau du composant

Ajoutez un bloc JSDoc avant le décorateur `@customElement` :

```typescript
/**
 * Brève description du composant.
 *
 * @element nom-du-composant
 *
 * @slot - Description du slot par défaut
 * @slot nomDuSlot - Description du slot nommé
 *
 * @fires nom-evenement - Description de l’événement custom
 *
 * @csspart nomPartie - Description de la partie CSS
 * @cssproperty --nom-variable - Description de la variable CSS
 *
 * @example
 * ```html
 * <nom-du-composant prop="valeur">Contenu</nom-du-composant>
 * ```
 */
@customElement('nom-du-composant')
export class NomDuComposant extends LitElement {
```

### Documentation des propriétés

Ajoutez un bloc JSDoc pour chaque `@property` :

```typescript
/**
 * Description de la propriété
 * @type {string | 'option1' | 'option2'}
 * @default 'valeurParDefaut'
 */
@property({ type: String }) nomPropriete = 'valeurParDefaut';
```

## Composants documentés

### Atomes

| Composant   | Élément      | Documentation |
|-------------|--------------|---------------|
| ShBadge     | `sh-badge`   | ✅ Complète    |
| ShIcon      | `sh-icon`    | ✅ Complète    |
| ShInput     | `sh-input`   | ✅ Complète    |
| ShLogo      | `sh-logo`    | ✅ Complète    |
| ShText      | `sh-text`    | ✅ Complète    |

### Molécules

| Composant        | Élément             | Documentation |
|------------------|---------------------|---------------|
| ShButton         | `sh-button`         | ✅ Complète    |
| ShCard           | `sh-card`           | ✅ Complète    |
| ShStatusBadge    | `sh-status-badge`   | ✅ Complète    |
| ShQuantityInput  | `sh-quantity-input` | ✅ Complète    |

### Organismes

| Composant   | Élément      | Documentation |
|-------------|--------------|---------------|
| ShHeader    | `sh-header`  | ✅ Complète    |

## Consulter la documentation

### Dans Storybook

1. Démarrer Storybook : `npm run storybook`
2. Naviguer vers n’importe quel composant dans la barre latérale
3. Cliquer sur l’onglet **Docs**
4. Voir :
   - Description du composant
   - Tableau des propriétés (types, valeurs par défaut, descriptions)
   - Slots et événements (si applicables)
   - Parties CSS et variables custom (si applicables)

### Dans le code

Le fichier `custom-elements.json` contient le manifest complet et peut être utilisé par :
- Les IDE pour l’autocomplétion et les tooltips
- Les générateurs de documentation
- D’autres outils de développement

## Scripts

```bash
# Générer le manifest des custom elements
npm run analyze

# Démarrer Storybook (génère le manifest automatiquement)
npm run storybook

# Build Storybook pour la production (génère le manifest automatiquement)
npm run build-storybook
```

## Bonnes pratiques

### 1. Soyez descriptif

❌ Mauvais :
```typescript
/** Taille */
@property() size = 'md';
```

✅ Bon :
```typescript
/**
 * Taille du bouton
 * @type {'sm' | 'md' | 'lg'}
 * @default 'md'
 */
@property() size: 'sm' | 'md' | 'lg' = 'md';
```

### 2. Ajoutez des exemples

Toujours fournir des exemples d’utilisation dans le JSDoc du composant :

```typescript
/**
 * @example
 * ```html
 * <sh-button variant="primary">Cliquez-moi</sh-button>
 * <sh-button variant="danger" iconBefore="Trash">Supprimer</sh-button>
 * ```
 */
```

### 3. Documentez les événements

Listez tous les événements custom avec `@fires` :

```typescript
/**
 * @fires sh-button-click - Émis lors du clic sur le bouton
 * @fires sh-input-change - Émis lors du changement de valeur de l’input
 */
```

### 4. Documentez les slots

Documentez tous les slots, y compris le slot par défaut :

```typescript
/**
 * @slot - Contenu du bouton (texte ou autres éléments)
 * @slot icon - Slot pour une icône personnalisée
 */
```

### 5. Documentez les parties CSS et variables custom

```typescript
/**
 * @csspart badge - Élément conteneur du badge
 * @cssproperty --logo-size - Contrôle la taille du logo (par défaut : 48px)
 */
```

## Dépannage

### La documentation ne se met pas à jour

1. Arrêter Storybook
2. Supprimer `custom-elements.json`
3. Lancer `npm run analyze`
4. Redémarrer Storybook

### Les propriétés n’apparaissent pas

- Vérifier que le décorateur `@property()` est utilisé (pas seulement une propriété de classe)
- Vérifier que le JSDoc est juste au-dessus de la propriété
- Vérifier que l’annotation `@type` correspond au type TypeScript

### Composant manquant

- Vérifier que le fichier du composant est dans `src/components/**/*.ts`
- Vérifier qu’il n’est pas exclu dans `custom-elements-manifest.config.mjs`
- Le composant doit utiliser le décorateur `@customElement()`

## Fichiers de configuration

### custom-elements-manifest.config.mjs

```javascript
export default {
  globs: ['src/components/**/*.ts'],
  exclude: ['src/**/*.stories.ts', 'src/**/*.spec.ts', 'src/**/*.test.ts'],
  outdir: '.',
  litelement: true,
};
```

### .storybook/preview.ts

```typescript
import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../custom-elements.json';

setCustomElementsManifest(customElements);
```

## Maintenance

- **Avant chaque release** : Vérifier que tous les composants ont une documentation complète
- **À chaque ajout de composant** : Ajouter les commentaires JSDoc immédiatement
- **À chaque ajout de propriété** : Documenter avec JSDoc
- **Chaque semaine** : Relire et améliorer la clarté de la documentation

## Ressources

- [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/)
- [Référence JSDoc](https://jsdoc.app/)
- [Storybook Web Components Docs](https://storybook.js.org/docs/web-components/writing-docs/autodocs)
