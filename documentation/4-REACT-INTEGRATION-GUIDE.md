# Guide d'Intégration React

Ce guide explique comment utiliser les Web Components du Design System StockHub dans une application React. Historique des versions : [CHANGELOG.md](../CHANGELOG.md). API exacte de chaque composant (propriétés, événements) : Storybook et les commentaires `@property` / `@fires` du code source.

---

## 📦 Installation

### Option 1 : NPM (Recommandé après publication)

```bash
npm install @stockhub/design-system
```

### Option 2 : GitHub (Développement)

```json
// package.json
{
  "dependencies": {
    "stockhub_design_system": "github:SandrineCipolla/stockhub_design_system"
  }
}
```

```bash
npm install
```

---

## 🚀 Configuration

### 1. Import Global (App.tsx)

```typescript
// src/App.tsx ou src/main.tsx
import '@stockhub/design-system/dist/index.js';
import '@stockhub/design-system/dist/styles/tokens.css';

function App() {
  return (
    <div className="app">
      {/* Vos composants */}
    </div>
  );
}
```

### 2. TypeScript Support

Créer un fichier de déclaration pour TypeScript :

```typescript
// src/types/web-components.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'sh-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
      size?: 'sm' | 'md' | 'lg';
      disabled?: boolean;
      loading?: boolean;
      iconBefore?: string;
      iconAfter?: string;
    };

    'sh-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
      size?: 'sm' | 'md' | 'lg';
      pill?: boolean;
    };

    'sh-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      hover?: boolean;
      clickable?: boolean;
      padding?: 'none' | 'sm' | 'md' | 'lg';
    };

    'sh-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      type?: string;
      value?: string;
      placeholder?: string;
      disabled?: boolean;
      error?: string;
    };

    'sh-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      name: string; // Nom d'icône Lucide en PascalCase (ex: "Package", "TrendingUp")
      size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
      color?: 'inherit' | 'primary' | 'success' | 'warning' | 'danger' | 'muted';
      clickable?: boolean;
      spin?: boolean;
    };

    'sh-status-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'restock-needed';
      showIndicator?: boolean;
      label?: string;
    };

    'sh-metric-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      title: string;
      value: string | number;
      variation?: number;
      icon?: string;
      trend?: 'up' | 'down' | 'neutral';
      animated?: boolean;
    };

    'sh-stock-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      name?: string;
      category?: string;
      'last-update'?: string;
      percentage?: string | number;
      quantity?: string;
      value?: string;
      status?: 'optimal' | 'low' | 'critical' | 'out-of-stock' | 'overstocked';
      'hide-details'?: boolean;
      'data-theme'?: 'light' | 'dark';
    };
  }
}
```

---

## 💡 Utilisation de Base

### Composants Simples

```tsx
import React from 'react';

function MyComponent() {
  return (
    <div>
      {/* Button avec icône (Lucide) */}
      <sh-button variant="primary" size="lg" iconBefore="Plus">
        Add Item
      </sh-button>

      {/* Button ghost */}
      <sh-button variant="ghost" iconBefore="Edit">
        Edit
      </sh-button>

      {/* Button loading */}
      <sh-button loading variant="primary">
        Saving...
      </sh-button>

      {/* Badge */}
      <sh-badge variant="success" size="md" pill>
        In Stock
      </sh-badge>

      {/* Status Badge avec indicateur */}
      <sh-status-badge status="low-stock" showIndicator></sh-status-badge>

      {/* Icon Lucide (⚡ NOUVELLE VERSION) */}
      <sh-icon name="Package" size="lg" color="primary"></sh-icon>
      <sh-icon name="TrendingUp" size="md" color="success"></sh-icon>
      <sh-icon name="RefreshCw" size="md" spin></sh-icon>

      {/* Card avec effets */}
      <sh-card hover clickable padding="md">
        <h3>Card Title</h3>
        <p>Card content goes here</p>
      </sh-card>
    </div>
  );
}
```

### ⚠️ Migration Icônes vers Lucide

**BREAKING CHANGE** : Les noms d'icônes ont changé de kebab-case vers PascalCase.

```tsx
// ❌ AVANT (v1.0 - système custom)
<sh-icon name="home" size="24"></sh-icon>
<sh-icon name="trending-up" size="24"></sh-icon>

// ✅ MAINTENANT (v1.1 - Lucide)
<sh-icon name="Home" size="md"></sh-icon>
<sh-icon name="TrendingUp" size="md"></sh-icon>
```

**Liste des icônes principales** :
- Actions: `Plus`, `Edit`, `Trash2`, `Eye`, `Download`, `Upload`
- Navigation: `Home`, `Settings`, `Menu`, `ChevronRight`, `ArrowUpRight`
- Statut: `AlertTriangle`, `CheckCircle`, `XCircle`, `Info`
- Business: `Package`, `TrendingUp`, `BarChart`, `Calendar`, `MapPin`
- UI: `Search`, `Filter`, `MoreVertical`, `Bell`, `User`, `Sun`, `Moon`

[Voir toutes les icônes Lucide](https://lucide.dev/icons/)

### Composants avec Slots

```tsx
function CardWithSlots() {
  return (
    <sh-card>
      <div slot="header">
        <h2>Header Content</h2>
      </div>

      <p>Main card content</p>

      <div slot="footer">
        <sh-button variant="primary">Action</sh-button>
      </div>
    </sh-card>
  );
}
```

---

## 🔄 Gestion des Événements

### Custom Events

Les Web Components émettent des Custom Events préfixés `sh-`. Liste par composant : commentaires `@fires` du code source. Exemple avec `sh-stock-card`, qui émet `sh-details-click`, `sh-edit-click`, `sh-delete-click` et `sh-session-click`.

Le `detail` de ces événements contient les propriétés affichées (`name`, `status`), pas l'identifiant métier du stock. Le composant React garde l'identifiant et le passe lui-même au handler.

Avec React 19, une prop `on` suivie du nom exact de l'événement s'abonne à l'événement sur l'élément custom :

```tsx
function StockCard({ stock, onEdit, onDelete }: StockCardProps) {
  return (
    <sh-stock-card
      name={stock.label}
      category={stock.category}
      quantity={String(stock.quantity)}
      status={stock.status}
      onsh-edit-click={() => onEdit(stock.id)}
      onsh-delete-click={() => onDelete(stock.id)}
    />
  );
}
```

Exemple réel : `src/components/dashboard/StockCardWrapper.tsx` du repo frontend.

Avant React 19, ou pour écouter un événement sur un ancêtre (les événements ont `bubbles` et `composed`), passer par `addEventListener` :

```tsx
import { useRef, useEffect } from 'react';

function StockCard({ stock, onEdit }: StockCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleEdit = () => onEdit(stock.id);
    card.addEventListener('sh-edit-click', handleEdit);
    return () => card.removeEventListener('sh-edit-click', handleEdit);
  }, [stock.id, onEdit]);

  return <sh-stock-card ref={cardRef} name={stock.label} status={stock.status} />;
}
```

### Hook Personnalisé

Créer un hook pour simplifier l'écoute des événements :

```typescript
// src/hooks/useWebComponentEvent.ts
import { useEffect, RefObject } from 'react';

export function useWebComponentEvent<T = any>(
  ref: RefObject<HTMLElement>,
  eventName: string,
  handler: (detail: T) => void
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const listener = (e: Event) => {
      const customEvent = e as CustomEvent<T>;
      handler(customEvent.detail);
    };

    element.addEventListener(eventName, listener);
    return () => element.removeEventListener(eventName, listener);
  }, [ref, eventName, handler]);
}
```

Utilisation :

```tsx
import { useRef } from 'react';
import { useWebComponentEvent } from './hooks/useWebComponentEvent';

function MyComponent({ stock }: { stock: Stock }) {
  const cardRef = useRef<HTMLElement>(null);

  useWebComponentEvent(cardRef, 'sh-details-click', () => {
    console.log('Détails du stock', stock.id);
  });

  useWebComponentEvent(cardRef, 'sh-edit-click', () => {
    console.log('Édition du stock', stock.id);
  });

  return <sh-stock-card ref={cardRef} name={stock.label} status={stock.status} />;
}
```

---

## 🎨 Gestion du Thème

### Dark Mode

```tsx
import { useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Appliquer le thème à tous les Web Components
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>

      <sh-card>
        Le thème est automatiquement appliqué
      </sh-card>
    </div>
  );
}
```

### Custom Tokens

```tsx
// Surcharger les tokens CSS
import './custom-tokens.css';

/* custom-tokens.css */
:root {
  --color-primary-500: #8b5cf6;  /* Override purple */
  --spacing-lg: 2rem;
}
```

---

## 🔧 Patterns Avancés

### Wrapper React Component

Un wrapper React par composant du Design System garde le typage côté application et traduit les événements `sh-*` en callbacks qui reçoivent l'identifiant métier. Le frontend StockHub applique ce modèle : voir `src/components/dashboard/StockCardWrapper.tsx` et `docs/V2/DESIGN-SYSTEM-WRAPPERS.md` dans le repo frontend, plutôt qu'un exemple recopié ici.

### Formulaires Contrôlés

```tsx
import { useState, useRef, useEffect } from 'react';

function MyForm() {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      setInputValue(target.value);
    };

    input.addEventListener('input', handleInput);
    return () => input.removeEventListener('input', handleInput);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit:', inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <sh-input
        ref={inputRef}
        type="text"
        placeholder="Enter text"
        value={inputValue}>
      </sh-input>

      <sh-button type="submit" variant="primary">
        Submit
      </sh-button>
    </form>
  );
}
```

---

## 🚨 Limitations & Solutions

### 1. Passage de Props Complexes

**Problème** : un attribut HTML ne transporte que des chaînes.

**Solution** : pour une propriété objet ou tableau, affecter la propriété JavaScript via une ref. `sh-collaborator-list` accepte aussi un JSON stringifié en attribut, grâce à un convertisseur déclaré dans le composant.

```tsx
const listRef = useRef<HTMLElement & { collaborators: CollaboratorItem[] }>(null);

useEffect(() => {
  if (listRef.current) {
    listRef.current.collaborators = collaborators;
  }
}, [collaborators]);

<sh-collaborator-list ref={listRef}></sh-collaborator-list>
```

### 2. Événements Synthétiques React

**Problème** : avant React 19, React ne s'abonne pas aux Custom Events.

**Solution** : avec React 19, prop `on` suivie du nom exact de l'événement (`onsh-edit-click`). Sinon, `addEventListener` via une ref. Exemples dans [Custom Events](#custom-events).

### 3. Refs avec TypeScript

**Problème** : TypeScript ne connaît pas les propriétés des Web Components.

**Solution** : Typer les refs explicitement

```tsx
interface ShStockCard extends HTMLElement {
  stock: StockItem;
  isUpdating: boolean;
}

const cardRef = useRef<ShStockCard>(null);
```

### 4. SSR (Server-Side Rendering)

**Problème** : Web Components ne sont pas supportés côté serveur.

**Solution** : Charger les composants uniquement côté client

```tsx
import dynamic from 'next/dynamic';

// Next.js
const StockCard = dynamic(() => import('./StockCard'), { ssr: false });

// Ou charger conditionnellement
useEffect(() => {
  if (typeof window !== 'undefined') {
    import('@stockhub/design-system/dist/index.js');
  }
}, []);
```

---

## 📊 Exemples Complets

### Dashboard avec des cartes de stock

```tsx
import { useNavigate } from 'react-router-dom';

function StockDashboard({ stocks, onDelete }: { stocks: Stock[]; onDelete: (id: number) => void }) {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {stocks.map(stock => (
        <sh-stock-card
          key={stock.id}
          name={stock.label}
          category={stock.category}
          quantity={String(stock.quantity)}
          status={stock.status}
          onsh-details-click={() => navigate(`/stocks/${stock.id}`)}
          onsh-edit-click={() => navigate(`/stocks/${stock.id}/edit`)}
          onsh-delete-click={() => onDelete(stock.id)}
        />
      ))}
    </div>
  );
}
```

### Metrics avec CountUp Animation

```tsx
function MetricsDashboard() {
  const metrics = [
    { title: 'Total Value', value: 125000, variation: 12, icon: 'dollar-sign', trend: 'up' },
    { title: 'Items', value: 342, variation: -5, icon: 'package', trend: 'down' },
    { title: 'Low Stock', value: 23, variation: 0, icon: 'alert-triangle', trend: 'neutral' }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {metrics.map(metric => (
        <sh-metric-card
          key={metric.title}
          title={metric.title}
          value={metric.value}
          variation={metric.variation}
          icon={metric.icon}
          trend={metric.trend}
          animated>
        </sh-metric-card>
      ))}
    </div>
  );
}
```

---

## 🔍 Debugging

### Vérifier que les Composants sont Enregistrés

```tsx
useEffect(() => {
  console.log('sh-button registered:', customElements.get('sh-button'));
  console.log('sh-card registered:', customElements.get('sh-card'));
}, []);
```

### Inspecter les Props

```tsx
useEffect(() => {
  const card = cardRef.current;
  if (card) {
    console.log('Card props:', {
      stock: card.getAttribute('stock'),
      isUpdating: card.hasAttribute('isUpdating')
    });
  }
}, []);
```

---

## 📚 Ressources

- [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [React + Web Components](https://react.dev/reference/react-dom/components#custom-html-elements)
- [Lit Element Docs](https://lit.dev/)

---

**Dernière mise à jour** : 16 Octobre 2025
