# Guide d'Intégration React

**Version** : 1.1
**Date** : 16 Octobre 2025
**Dernière mise à jour** : Session 1 - Migration Lucide

Ce guide explique comment utiliser les Web Components du Design System StockHub dans une application React.

## 🆕 Nouveautés Version 1.1

### Migration vers Lucide Icons
- ✅ **Icônes Lucide** : Le Design System utilise désormais Lucide (1000+ icônes)
- ✅ **Compatibilité totale** avec StockHub V2 (qui utilise lucide-react)
- ✅ **Même API** : Utilisez les mêmes noms d'icônes en PascalCase

### Nouveaux Composants
- ✅ **`sh-badge`** : Badge coloré pour statuts et labels
- ✅ **`sh-card`** : Conteneur de contenu avec effets glassmorphism
- ✅ **`sh-status-badge`** : Badge spécialisé pour statuts de stock avec indicateur animé

### Composants Améliorés
- ✅ **`sh-button`** : Variant ghost, état loading, support iconBefore/iconAfter
- ✅ **`sh-icon`** : Migration complète vers Lucide

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
      stock: any;  // Utiliser le type StockItem approprié
      index?: number;
      isUpdating?: boolean;
      isDeleting?: boolean;
      aiSuggestions?: string[];
    };

    'sh-stock-grid': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      items: any[];
      loading?: boolean;
      emptyMessage?: string;
      columns?: 1 | 2 | 3 | 4 | 'auto';
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

Les Web Components utilisent des Custom Events. Voici comment les gérer en React :

```tsx
import { useRef, useEffect } from 'react';

function StockDashboard() {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Écouter les événements custom
    const handleView = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      console.log('View stock:', customEvent.detail.id);
    };

    const handleEdit = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      console.log('Edit stock:', customEvent.detail.id);
    };

    const handleDelete = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      console.log('Delete stock:', customEvent.detail.id);
    };

    card.addEventListener('sh-stock-view', handleView);
    card.addEventListener('sh-stock-edit', handleEdit);
    card.addEventListener('sh-stock-delete', handleDelete);

    // Cleanup
    return () => {
      card.removeEventListener('sh-stock-view', handleView);
      card.removeEventListener('sh-stock-edit', handleEdit);
      card.removeEventListener('sh-stock-delete', handleDelete);
    };
  }, []);

  const stockData = {
    id: '123',
    name: 'Article Test',
    category: 'Peinture',
    quantity: 50,
    unit: 'L',
    value: 450,
    lastUpdate: new Date().toISOString(),
    status: 'in-stock'
  };

  return (
    <sh-stock-card
      ref={cardRef}
      stock={JSON.stringify(stockData)}>
    </sh-stock-card>
  );
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

function MyComponent() {
  const cardRef = useRef<HTMLElement>(null);

  useWebComponentEvent(cardRef, 'sh-stock-view', ({ id }) => {
    console.log('View:', id);
  });

  useWebComponentEvent(cardRef, 'sh-stock-edit', ({ id }) => {
    console.log('Edit:', id);
  });

  return <sh-stock-card ref={cardRef} stock={stockData}></sh-stock-card>;
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

Créer des wrappers React pour une meilleure ergonomie :

```typescript
// src/components/StockCard.tsx
import React, { useRef } from 'react';
import { useWebComponentEvent } from '../hooks/useWebComponentEvent';

interface StockCardProps {
  stock: StockItem;
  index?: number;
  isUpdating?: boolean;
  isDeleting?: boolean;
  aiSuggestions?: string[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRecordUsage?: (id: string, amount: number) => void;
}

export function StockCard({
  stock,
  index,
  isUpdating,
  isDeleting,
  aiSuggestions,
  onView,
  onEdit,
  onDelete,
  onRecordUsage
}: StockCardProps) {
  const ref = useRef<HTMLElement>(null);

  useWebComponentEvent(ref, 'sh-stock-view', ({ id }) => onView?.(id));
  useWebComponentEvent(ref, 'sh-stock-edit', ({ id }) => onEdit?.(id));
  useWebComponentEvent(ref, 'sh-stock-delete', ({ id }) => onDelete?.(id));
  useWebComponentEvent(ref, 'sh-stock-record-usage', ({ id, amount }) =>
    onRecordUsage?.(id, amount)
  );

  return (
    <sh-stock-card
      ref={ref}
      stock={JSON.stringify(stock)}
      index={index}
      isUpdating={isUpdating}
      isDeleting={isDeleting}
      aiSuggestions={aiSuggestions ? JSON.stringify(aiSuggestions) : undefined}>
    </sh-stock-card>
  );
}
```

Utilisation simplifiée :

```tsx
function Dashboard() {
  const handleView = (id: string) => {
    console.log('View:', id);
  };

  return (
    <StockCard
      stock={stockData}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
```

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

**Problème** : Les attributs HTML ne supportent que les strings.

**Solution** : Utiliser JSON.stringify() pour objets/arrays

```tsx
// ❌ Ne fonctionne pas
<sh-stock-card stock={stockObject}></sh-stock-card>

// ✅ Fonctionne
<sh-stock-card stock={JSON.stringify(stockObject)}></sh-stock-card>
```

Ou créer un setter via ref :

```tsx
const cardRef = useRef<any>(null);

useEffect(() => {
  if (cardRef.current) {
    cardRef.current.stock = stockObject;  // Setter direct
  }
}, [stockObject]);

<sh-stock-card ref={cardRef}></sh-stock-card>
```

### 2. Événements Synthétiques React

**Problème** : React ne capture pas automatiquement les Custom Events.

**Solution** : Utiliser addEventListener directement (voir exemples ci-dessus).

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

### Dashboard avec Stock Grid

```tsx
import { useState, useRef } from 'react';
import { useWebComponentEvent } from './hooks/useWebComponentEvent';

function StockDashboard() {
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Fetch stocks
    fetchStocks().then(data => {
      setStocks(data);
      setLoading(false);
    });
  }, []);

  useWebComponentEvent(gridRef, 'sh-stock-view', ({ id }) => {
    navigate(`/stock/${id}`);
  });

  useWebComponentEvent(gridRef, 'sh-stock-edit', ({ id }) => {
    navigate(`/stock/${id}/edit`);
  });

  useWebComponentEvent(gridRef, 'sh-stock-delete', async ({ id }) => {
    if (confirm('Delete this item?')) {
      await deleteStock(id);
      setStocks(stocks.filter(s => s.id !== id));
    }
  });

  return (
    <div className="dashboard">
      <h1>Stock Management</h1>

      <sh-stock-grid
        ref={gridRef}
        items={JSON.stringify(stocks)}
        loading={loading}
        columns="auto"
        emptyMessage="No items in stock">
      </sh-stock-grid>
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
