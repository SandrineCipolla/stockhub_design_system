# Session 6 - Intégration StockHub V2 : Phase 1 - Composants Simples

**Date prévue** : 21 Octobre 2025
**Durée estimée** : 2-3h
**Objectif** : Intégrer les composants simples du Design System dans StockHub V2
**Repo cible** : `StockHub_V2/Front_End/stockHub_V2_front`

---

## 🎯 Objectif de la Session

Intégrer les **3 premiers composants** du Design System dans StockHub V2 :
1. ✅ Badge → sh-badge
2. ✅ Button → sh-button
3. ✅ Input → sh-input

---

## 📋 Checklist Complète

### Préparation (10 min)

- [ ] **Ouvrir le repo StockHub V2**
  ```bash
  cd C:/Users/sandr/Dev/RNCP7/StockHub_V2
  ```

- [ ] **Créer une branche d'intégration**
  ```bash
  git checkout -b feature/integrate-design-system
  git push -u origin feature/integrate-design-system
  ```

- [ ] **Installer le Design System**
  ```bash
  cd Front_End/stockHub_V2_front
  npm install git+https://github.com/SandrineCipolla/stockhub_design_system.git
  ```

- [ ] **Créer types TypeScript**

  Créer `src/types/web-components.d.ts` :
  ```typescript
  declare namespace JSX {
    interface IntrinsicElements {
      'sh-button': any;
      'sh-badge': any;
      'sh-card': any;
      'sh-icon': any;
      'sh-input': any;
      'sh-metric-card': any;
      'sh-status-badge': any;
      'sh-stock-item-card': any;
      'sh-header': any;
    }
  }
  ```

- [ ] **Importer les composants**

  Dans `src/main.tsx` (ou `src/App.tsx`) :
  ```typescript
  import '@stockhub/design-system';
  ```

- [ ] **Tester que ça compile**
  ```bash
  npm run dev
  ```

---

### 1. Migration Badge (30 min)

#### A. Rechercher les occurrences

- [ ] Chercher tous les fichiers utilisant `<Badge>` :
  ```bash
  grep -r "import.*Badge" src/
  grep -r "<Badge" src/
  ```

- [ ] Lister les fichiers à modifier (noter dans un fichier texte)

#### B. Remplacer Badge → sh-badge

**Exemple avant** :
```tsx
import Badge from '@/components/common/Badge';

<Badge variant="success">Active</Badge>
```

**Exemple après** :
```tsx
<sh-badge variant="success">Active</sh-badge>
```

- [ ] Remplacer **tous les imports** `import Badge` par rien (supprimer la ligne)
- [ ] Remplacer **tous les `<Badge>`** par **`<sh-badge>`**
- [ ] Remplacer **tous les `</Badge>`** par **`</sh-badge>`**
- [ ] Vérifier que les props sont identiques (variant, size, pill)

#### C. Supprimer l'ancien composant

- [ ] Supprimer `src/components/common/Badge.tsx` (ou le fichier équivalent)
- [ ] Supprimer le fichier de style associé (si existant)

#### D. Tester

- [ ] Lancer l'app : `npm run dev`
- [ ] Vérifier visuellement toutes les pages avec badges
- [ ] Vérifier light/dark mode
- [ ] Prendre des screenshots (avant/après)

- [ ] **Commit**
  ```bash
  git add .
  git commit -m "feat: migrate Badge to sh-badge web component"
  ```

---

### 2. Migration Button (45 min)

#### A. Rechercher les occurrences

- [ ] Chercher tous les fichiers utilisant `<Button>` :
  ```bash
  grep -r "import.*Button" src/
  grep -r "<Button" src/
  ```

- [ ] Lister les fichiers à modifier

#### B. Remplacer Button → sh-button

**Exemple avant** :
```tsx
import Button from '@/components/common/Button';
import { Plus } from 'lucide-react';

<Button variant="primary" onClick={handleClick}>
  <Plus size={16} />
  Add Item
</Button>
```

**Exemple après** :
```tsx
<sh-button
  variant="primary"
  iconBefore="Plus"
  onsh-button-click={handleClick}
>
  Add Item
</sh-button>
```

⚠️ **Points d'attention** :
- `onClick` devient `onsh-button-click`
- Les icônes React `<Plus />` deviennent attributs `iconBefore="Plus"` ou `iconAfter="Plus"`
- Noms d'icônes en **PascalCase** (Plus, Edit, Trash2, etc.)

#### C. Migrer les icônes lucide-react → Lucide vanilla

**Mapping des icônes courantes** :

| lucide-react | sh-button attribut | Remarque |
|--------------|-------------------|----------|
| `<Plus />` | `iconBefore="Plus"` | - |
| `<Edit />` | `iconBefore="Edit"` | - |
| `<Trash2 />` | `iconBefore="Trash2"` | ⚠️ Trash**2** (pas Trash) |
| `<Eye />` | `iconBefore="Eye"` | - |
| `<Save />` | `iconBefore="Save"` | - |
| `<Download />` | `iconBefore="Download"` | - |
| `<Upload />` | `iconBefore="Upload"` | - |
| `<Search />` | `iconBefore="Search"` | - |
| `<Filter />` | `iconBefore="Filter"` | - |

- [ ] Remplacer **tous les imports** `import Button` par rien
- [ ] Remplacer **tous les imports** `lucide-react` (Plus, Edit, etc.) par rien
- [ ] Remplacer **tous les `<Button>`** par **`<sh-button>`**
- [ ] Remplacer **tous les `</Button>`** par **`</sh-button>`**
- [ ] Remplacer **icônes React** par attributs `iconBefore` / `iconAfter`
- [ ] Remplacer **`onClick`** par **`onsh-button-click`**

#### D. Supprimer l'ancien composant

- [ ] Supprimer `src/components/common/Button.tsx`
- [ ] Supprimer le fichier de style associé

#### E. Tester

- [ ] Lancer l'app : `npm run dev`
- [ ] Vérifier **toutes les pages** avec boutons
- [ ] Tester les **clics** (événements fonctionnent ?)
- [ ] Vérifier les **états** (loading, disabled)
- [ ] Vérifier les **icônes** (affichées correctement ?)
- [ ] Vérifier light/dark mode
- [ ] Prendre des screenshots

- [ ] **Commit**
  ```bash
  git add .
  git commit -m "feat: migrate Button to sh-button and lucide-react icons to Lucide vanilla"
  ```

---

### 3. Migration Input (30 min)

#### A. Rechercher les occurrences

- [ ] Chercher tous les fichiers utilisant `<Input>` :
  ```bash
  grep -r "import.*Input" src/
  grep -r "<Input" src/
  ```

- [ ] Lister les fichiers à modifier

#### B. Remplacer Input → sh-input

**Exemple avant** :
```tsx
import Input from '@/components/common/Input';

<Input
  type="text"
  placeholder="Enter name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  error={errors.name}
/>
```

**Exemple après** :
```tsx
<sh-input
  type="text"
  placeholder="Enter name"
  value={name}
  error={!!errors.name}
  errorMessage={errors.name}
  onsh-input-change={(e: CustomEvent) => setName(e.detail.value)}
/>
```

⚠️ **Points d'attention** :
- `onChange` devient `onsh-input-change`
- `e.target.value` devient `e.detail.value`
- `error` est un boolean (pas une string)
- `errorMessage` est la string à afficher

#### C. Adapter les event handlers

**Helper recommandé** (créer dans `src/utils/event-handlers.ts`) :

```typescript
export function handleCustomEvent<T = any>(
  handler: (detail: T) => void
) {
  return (e: CustomEvent<T>) => handler(e.detail);
}

// Usage
<sh-input
  onsh-input-change={handleCustomEvent((detail) => setName(detail.value))}
/>
```

- [ ] Créer le helper `handleCustomEvent` (optionnel)
- [ ] Remplacer **tous les imports** `import Input` par rien
- [ ] Remplacer **tous les `<Input>`** par **`<sh-input>`**
- [ ] Remplacer **tous les `</Input>`** par **`</sh-input>`**
- [ ] Adapter **événements** (onChange → onsh-input-change)
- [ ] Adapter **error handling** (error + errorMessage)

#### D. Supprimer l'ancien composant

- [ ] Supprimer `src/components/common/Input.tsx`
- [ ] Supprimer le fichier de style associé

#### E. Tester

- [ ] Lancer l'app : `npm run dev`
- [ ] Tester **tous les formulaires**
- [ ] Vérifier la **saisie** fonctionne
- [ ] Vérifier les **erreurs** s'affichent
- [ ] Vérifier la **validation** fonctionne
- [ ] Vérifier light/dark mode
- [ ] Prendre des screenshots

- [ ] **Commit**
  ```bash
  git add .
  git commit -m "feat: migrate Input to sh-input with custom events"
  ```

---

### 4. Tests & Validation (30 min)

#### A. Tests visuels

- [ ] Parcourir **toutes les pages** de l'application
- [ ] Vérifier que rien n'est cassé visuellement
- [ ] Comparer avec la version avant migration (screenshots)
- [ ] Tester le **responsive** (mobile, tablet, desktop)

#### B. Tests fonctionnels

- [ ] Tester **tous les formulaires** (création, édition)
- [ ] Tester **tous les boutons** (actions, navigation)
- [ ] Tester les **clics** et **interactions**
- [ ] Vérifier les **états** (loading, disabled, error)

#### C. Tests thème

- [ ] Vérifier le **dark mode** fonctionne
- [ ] Vérifier le **light mode** fonctionne
- [ ] Vérifier la **transition** entre thèmes

#### D. Tests accessibilité

- [ ] Navigation clavier (Tab, Enter, Espace)
- [ ] Screen reader (si possible)
- [ ] Contraste des couleurs (vérifier dans DevTools)

---

### 5. Documentation & Commit Final (15 min)

#### A. Créer SESSION-6-SUMMARY.md

- [ ] Créer `documentation/planning/SESSION-6-SUMMARY.md`
- [ ] Documenter ce qui a été fait
- [ ] Lister les problèmes rencontrés
- [ ] Noter les leçons apprises
- [ ] Temps réel vs temps estimé

#### B. Push et PR

- [ ] **Push la branche**
  ```bash
  git push origin feature/integrate-design-system
  ```

- [ ] **Créer une Pull Request** sur GitHub
  - Titre : "feat: integrate Design System Phase 1 (Badge, Button, Input)"
  - Description : Lien vers SESSION-6-SUMMARY.md
  - Ajouter screenshots avant/après

- [ ] **Review et merge** (ou attendre validation)

---

## 📊 Métriques à Tracker

- **Nombre de fichiers modifiés** : ___
- **Nombre de lignes ajoutées** : ___
- **Nombre de lignes supprimées** : ___
- **Composants migrés** : 3 (Badge, Button, Input)
- **Temps réel** : ___ h
- **Bugs trouvés** : ___
- **Bugs fixés** : ___

---

## 🚨 Problèmes Potentiels & Solutions

### Problème 1 : Web Component ne s'affiche pas

**Symptômes** :
- Composant invisible
- Erreur console "sh-button is not defined"

**Solutions** :
1. Vérifier l'import : `import '@stockhub/design-system';` dans `main.tsx`
2. Vérifier que le package est installé : `npm list @stockhub/design-system`
3. Redémarrer le serveur : `npm run dev`

---

### Problème 2 : Événement ne se déclenche pas

**Symptômes** :
- Clic sur bouton ne fait rien
- `onsh-button-click` n'est pas appelé

**Solutions** :
1. Vérifier le nom : `onsh-button-click` (pas `onClick`)
2. Vérifier que c'est une fonction : `onsh-button-click={handleClick}`
3. Console log pour debug : `onsh-button-click={(e) => console.log('Click!', e)}`

---

### Problème 3 : Icône ne s'affiche pas

**Symptômes** :
- Pas d'icône dans le bouton
- Carré vide ou rien

**Solutions** :
1. Vérifier le nom en **PascalCase** : `"Plus"` (pas `"plus"` ou `"icon-plus"`)
2. Vérifier que l'icône existe dans Lucide : https://lucide.dev/icons/
3. Vérifier l'attribut : `iconBefore="Plus"` (pas `icon="Plus"`)

---

### Problème 4 : TypeScript erreurs

**Symptômes** :
- Erreur : "Property 'sh-button' does not exist on type 'JSX.IntrinsicElements'"

**Solutions** :
1. Vérifier que `src/types/web-components.d.ts` existe
2. Vérifier qu'il contient `'sh-button': any;`
3. Redémarrer TypeScript server dans VS Code (Ctrl+Shift+P → "Restart TS Server")

---

### Problème 5 : Styles cassés / Thème ne fonctionne pas

**Symptômes** :
- Composants ne s'adaptent pas au thème
- Couleurs incorrectes

**Solutions** :
1. Ajouter `data-theme` sur un parent :
   ```tsx
   <div data-theme={theme}>
     <sh-button>Button</sh-button>
   </div>
   ```
2. Vérifier que le thème est bien propagé depuis `App.tsx`

---

## 🎯 Critères de Succès

✅ Session réussie si :
- [ ] Les 3 composants sont migrés (Badge, Button, Input)
- [ ] Aucun bug visuel
- [ ] Tous les événements fonctionnent
- [ ] Light/dark mode fonctionne
- [ ] Build réussit : `npm run build`
- [ ] Aucune régression fonctionnelle
- [ ] Documentation SESSION-6-SUMMARY.md créée
- [ ] Pull Request créée

---

## 🚀 Prochaines Sessions

### Session 7 - Phase 2 : Composants Métier (2-3h)
- [ ] StatusBadge → sh-status-badge
- [ ] MetricCard → sh-metric-card
- [ ] StockCard → sh-stock-item-card
- [ ] Header → sh-header

### Session 8 - Phase 3 : Finalisation (2-3h)
- [ ] Card → sh-card
- [ ] Icônes lucide-react → sh-icon
- [ ] Cleanup final
- [ ] Tests E2E
- [ ] Release

---

## 📚 Ressources

- **Guide d'intégration complet** : `documentation/integration/STOCKHUB-V2-INTEGRATION.md`
- **Storybook Design System** : https://68f5fbe10f495706cb168751-nufqfdjaoc.chromatic.com/
- **Lucide Icons** : https://lucide.dev/icons/
- **Repo Design System** : https://github.com/SandrineCipolla/stockhub_design_system

---

**Maintenu par** : Sandrine Cipolla
**Dernière mise à jour** : 20 Octobre 2025
**Version** : 1.0
