# Organisation Storybook - StockHub Design System

**Version** : 1.0  
**Date** : 16 Octobre 2025

Ce guide détaille l'organisation et la structure du menu Storybook pour le Design System StockHub.

---

## 📖 Vue d'ensemble

L'organisation du menu Storybook respecte **exactement** la hiérarchie des dossiers dans `src/`, garantissant une navigation intuitive et cohérente avec la structure du code.

---

## 🗂️ Structure du Menu

### Organisation Hiérarchique

```
📖 Introduction
   ├── Button Example      (Story d'exemple Storybook)
   ├── Header Example      (Story d'exemple Storybook)
   └── Page Example        (Story d'exemple Storybook)

🎨 Design Tokens          (Configuration future)

🎨 Icons                  (Configuration future)

📦 Components
   ├── 🔹 Atoms
   │   ├── Badge          (sh-badge)
   │   ├── Icon           (sh-icon)
   │   ├── Input          (sh-input + Test)
   │   ├── Logo           (sh-logo)
   │   └── Text           (sh-text)
   ├── 🔸 Molecules
   │   ├── Button         (sh-button)
   │   ├── Card           (sh-card)
   │   ├── QuantityInput  (sh-quantity-input)
   │   └── StatusBadge    (sh-status-badge)
   └── 🔷 Organisms
       └── Header         (sh-header)
```

---

## 🏷️ Nomenclature des Titres

### Convention de Nommage

| Type | Format | Exemple |
|------|--------|---------|
| **Atomes** | `Components/Atoms/[NomComposant]` | `Components/Atoms/Badge` |
| **Molécules** | `Components/Molecules/[NomComposant]` | `Components/Molecules/Button` |
| **Organismes** | `Components/Organisms/[NomComposant]` | `Components/Organisms/Header` |
| **Exemples** | `Introduction/[NomStory] Example` | `Introduction/Button Example` |

### Règles de Nommage

1. **Capitaliser** le nom du composant (PascalCase)
2. **Éviter** les répétitions de préfixes (`sh-`)
3. **Grouper** les variantes sous le même composant
4. **Utiliser** des noms descriptifs et courts

---

## ⚙️ Configuration Technique

### Fichier de Configuration

La configuration de l'ordre est définie dans `.storybook/preview.ts` :

```typescript
options: {
  storySort: {
    order: [
      'Introduction',
      'Design Tokens', 
      'Icons',
      'Components',
      ['Atoms', ['Badge', 'Icon', 'Input', 'Logo', 'Text'], 
       'Molecules', ['Button', 'Card', 'QuantityInput', 'StatusBadge'], 
       'Organisms', ['Header']],
      '*',
    ],
    method: 'alphabetical',
  },
}
```

### Correspondance Dossiers/Menu

| Dossier Physique | Menu Storybook |
|------------------|----------------|
| `src/stories/` | `Introduction/` |
| `src/components/atoms/badge/` | `Components/Atoms/Badge` |
| `src/components/atoms/icon/` | `Components/Atoms/Icon` |
| `src/components/molecules/button/` | `Components/Molecules/Button` |
| `src/components/organisms/header/` | `Components/Organisms/Header` |

---

## 📝 Exemples de Stories

### Story d'Atome

```typescript
// src/components/atoms/badge/sh-badge.stories.ts
const meta: Meta = {
  title: 'Components/Atoms/Badge',  // ← Titre standardisé
  component: 'sh-badge',
  // ...
};
```

### Story de Molécule

```typescript
// src/components/molecules/button/sh-button.stories.ts
const meta: Meta = {
  title: 'Components/Molecules/Button',  // ← Titre standardisé
  component: 'sh-button',
  // ...
};
```

### Story d'Organisme

```typescript
// src/components/organisms/header/sh-header.stories.ts
const meta: Meta = {
  title: 'Components/Organisms/Header',  // ← Titre standardisé
  component: 'sh-header',
  // ...
};
```

---

## 🔄 Processus de Mise à Jour

### Ajout d'un Nouveau Composant

1. **Créer** le composant dans le bon dossier (`atoms/`, `molecules/`, `organisms/`)
2. **Créer** le fichier `.stories.ts` avec le bon titre
3. **Mettre à jour** la configuration dans `preview.ts` si nécessaire
4. **Tester** l'ordre dans Storybook

### Modification de l'Ordre

1. **Modifier** le tableau `order` dans `.storybook/preview.ts`
2. **Redémarrer** Storybook pour voir les changements
3. **Documenter** les changements dans ce guide

---

## 🎯 Avantages de cette Organisation

### Pour les Développeurs

- ✅ **Navigation intuitive** : L'ordre du menu correspond aux dossiers
- ✅ **Cohérence** : Même logique partout dans le projet
- ✅ **Maintenance facile** : Un seul endroit pour configurer l'ordre

### Pour les Designers

- ✅ **Atomic Design** : Structure claire par niveau de complexité
- ✅ **Progression logique** : Des composants simples aux complexes
- ✅ **Recherche rapide** : Organisation prévisible

### Pour l'Équipe

- ✅ **Standards clairs** : Nomenclature définie
- ✅ **Scalabilité** : Facile d'ajouter de nouveaux composants
- ✅ **Documentation** : Auto-documenté par la structure

---

## 🚀 Commandes Utiles

```bash
# Lancer Storybook
npm run storybook

# Builder Storybook
npm run build-storybook

# Générer les tokens CSS
npm run tokens:generate
```

---

## 🔧 Dépannage

### Le Menu Ne S'Affiche Pas Correctement

1. Vérifier le titre dans le fichier `.stories.ts`
2. Redémarrer Storybook
3. Vérifier la configuration dans `preview.ts`

### Composant Manquant

1. Vérifier l'import du composant dans la story
2. Vérifier le chemin du fichier
3. Vérifier la compilation TypeScript

### Ordre Incorrect

1. Modifier `preview.ts`
2. Redémarrer Storybook
3. Vider le cache si nécessaire

---

## 📖 Références

- [Configuration Storybook](https://storybook.js.org/docs/web-components/configure/story-rendering)
- [Story Ordering](https://storybook.js.org/docs/web-components/writing-stories/naming-components-and-hierarchy)
- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)

---

**Maintenu par** : Sandrine Cipolla  
**Dernière mise à jour** : 16 Octobre 2025
