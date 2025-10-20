# Spécifications des Composants

**Date** : 16 Octobre 2025
**Version** : 1.0

Ce document détaille les spécifications techniques de chaque composant à créer ou améliorer.

---

## 🔴 Priorité Haute

### `sh-badge`

**Type** : Atom
**Statut** : 🆕 À créer
**Source** : `Badge.tsx` (StockHub V2)

#### API

```typescript
interface ShBadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;  // Bordures arrondies complètes
}
```

#### Variants

| Variant | Couleur (light) | Couleur (dark) | Usage |
|---------|----------------|----------------|--------|
| success | green-100/green-800 | green-900/green-200 | Actions positives |
| warning | amber-100/amber-800 | amber-900/amber-200 | Alertes |
| danger | red-100/red-800 | red-900/red-200 | Erreurs |
| info | blue-100/blue-800 | blue-900/blue-200 | Informations |
| default | gray-100/gray-800 | gray-900/gray-200 | Neutre |

#### Styles

```css
/* Base */
display: inline-flex;
align-items: center;
font-weight: 500;
border-radius: var(--radius-md);

/* Sizes */
sm: padding: 0.25rem 0.5rem; font-size: 0.75rem;
md: padding: 0.375rem 0.75rem; font-size: 0.875rem;
lg: padding: 0.5rem 1rem; font-size: 1rem;

/* Pill */
border-radius: 9999px;
```

#### Stories

- Default variants
- All sizes
- Pill variant
- Dark mode
- With icons (using slot)

---

### `sh-card`

**Type** : Molecule
**Statut** : 🆕 À créer
**Source** : `Card.tsx` (StockHub V2)

#### API

```typescript
interface ShCardProps {
  hover?: boolean;  // Activer effets hover (default: true)
  clickable?: boolean;  // Curseur pointer
  padding?: 'none' | 'sm' | 'md' | 'lg';  // default: 'md'
}

// Events
interface ShCardEvents {
  'sh-card-click': CustomEvent<void>;
}
```

#### Styles

```css
/* Base */
backdrop-filter: blur(8px);
border: 1px solid;
border-radius: var(--radius-xl);
transition: all 0.3s ease;

/* Light mode */
background: rgba(255, 255, 255, 0.8);
border-color: rgba(0, 0, 0, 0.1);
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Dark mode */
background: rgba(255, 255, 255, 0.05);
border-color: rgba(255, 255, 255, 0.1);

/* Hover (si activé) */
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
border-color: var(--color-purple-300);
```

#### Slots

```html
<sh-card>
  <div slot="header">Header content</div>
  <div>Main content</div>
  <div slot="footer">Footer content</div>
</sh-card>
```

#### Accessibilité

- Support `role="button"` si clickable
- Support navigation clavier (Enter/Space)
- ARIA attributes via properties

#### Stories

- Basic card
- With header/footer slots
- Hover variations
- Clickable with event
- Different paddings
- Dark mode

---

### `sh-button` (Amélioration)

**Type** : Molecule
**Statut** : ⚠️ À améliorer
**Existant** : Oui

#### Nouvelles Features

##### 1. Variant `ghost`

```css
/* Ghost variant */
background: transparent;
color: var(--color-purple-600);
border: none;

/* Hover */
background: rgba(124, 58, 237, 0.1);
```

##### 2. État `loading`

```typescript
@property({ type: Boolean }) loading = false;
```

```html
<sh-button loading>
  <sh-icon name="spinner" class="animate-spin"></sh-icon>
  Loading...
</sh-button>
```

##### 3. Support icône

```typescript
@property() iconBefore?: string;
@property() iconAfter?: string;
```

```html
<sh-button iconBefore="plus">Add Item</sh-button>
<sh-button iconAfter="arrow-right">Continue</sh-button>
```

#### API Complète

```typescript
interface ShButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  iconBefore?: string;
  iconAfter?: string;
  type?: 'button' | 'submit' | 'reset';
}
```

#### Stories à Ajouter

- Ghost variant showcase
- Loading states
- With icons (before/after/both)
- Icon only buttons

---

### `sh-status-badge`

**Type** : Molecule
**Statut** : 🆕 À créer
**Source** : `StatusBadge.tsx` (StockHub V2)

#### API

```typescript
type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock' | 'restock-needed';

interface ShStatusBadgeProps {
  status: StockStatus;
  showIndicator?: boolean;  // Point coloré animé
  label?: string;  // Override label par défaut
}
```

#### Mapping Status

| Status | Label | Couleur | Indicateur |
|--------|-------|---------|------------|
| in-stock | En stock | success | green pulse |
| low-stock | Stock faible | warning | amber pulse |
| out-of-stock | Rupture | danger | red static |
| restock-needed | À réapprovisionner | info | blue pulse |

#### Styles

```css
/* Indicateur animé */
.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 0.5rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

#### Stories

- All status types
- With/without indicator
- Custom labels
- Dark mode

---

## 🟡 Priorité Moyenne

### `sh-metric-card`

**Type** : Molecule
**Statut** : 🆕 À créer
**Source** : `MetricCard.tsx` (StockHub V2)

#### API

```typescript
interface ShMetricCardProps {
  title: string;
  value: string | number;
  variation?: number;  // Pourcentage de variation
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  animated?: boolean;  // Animation CountUp
}

// Events
interface ShMetricCardEvents {
  'sh-metric-click': CustomEvent<void>;
}
```

#### Structure

```html
<sh-metric-card>
  <div class="header">
    <sh-icon name={icon}></sh-icon>
    <h3>{title}</h3>
  </div>
  <div class="value">{value}</div>
  <div class="variation">
    <sh-icon name="trend-{up|down}"></sh-icon>
    <span>{variation}%</span>
  </div>
</sh-metric-card>
```

#### Animation CountUp

Utiliser Web Animations API :

```typescript
private animateValue(start: number, end: number, duration: number) {
  const range = end - start;
  const startTime = performance.now();

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const current = start + range * this.easeOutQuart(progress);
    this.displayValue = Math.round(current);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}
```

#### Stories

- Different metrics types
- With/without variation
- Trend indicators
- Animated values
- Clickable cards
- Dark mode

---

### `sh-stock-card`

**Type** : Organism
**Statut** : 🆕 À créer (COMPLEXE)
**Source** : `StockCard.tsx` (StockHub V2)

#### API

```typescript
interface StockItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  value: number;
  lastUpdate: string;
  status: StockStatus;
  containerCapacity?: number;
  usePercentage?: boolean;
}

interface ShStockCardProps {
  stock: StockItem;
  index?: number;  // Pour animation cascade
  isUpdating?: boolean;
  isDeleting?: boolean;
  aiSuggestions?: string[];
}

// Events
interface ShStockCardEvents {
  'sh-stock-view': CustomEvent<{ id: string }>;
  'sh-stock-edit': CustomEvent<{ id: string }>;
  'sh-stock-delete': CustomEvent<{ id: string }>;
  'sh-stock-record-usage': CustomEvent<{ id: string; amount: number }>;
}
```

#### Structure Complète

```html
<sh-stock-card>
  <!-- Status Border -->
  <div class="status-border" data-status={status}></div>

  <!-- Header -->
  <header>
    <div class="title-section">
      <h3>{stock.name}</h3>
      <span class="last-update">{formatDate(lastUpdate)}</span>
    </div>
    <sh-badge variant={categoryVariant}>{category}</sh-badge>
  </header>

  <!-- Metrics Grid -->
  <div class="metrics">
    <div class="metric">
      <span class="label">Quantité</span>
      <span class="value">{formatQuantity(quantity, unit)}</span>
    </div>
    <div class="metric">
      <span class="label">Valeur</span>
      <span class="value">{formatCurrency(value)}</span>
    </div>
  </div>

  <!-- AI Suggestions (si présentes) -->
  <div class="ai-suggestions" ?hidden={!aiSuggestions?.length}>
    <sh-icon name="sparkles"></sh-icon>
    <ul>
      ${aiSuggestions.map(s => html`<li>${s}</li>`)}
    </ul>
  </div>

  <!-- Paint Container Tracking (conditionnel) -->
  <div class="paint-tracking" ?hidden={!showPaintTracking}>
    <sh-button
      size="sm"
      variant="secondary"
      iconBefore="palette"
      @click={handleRecordUsage}>
      Enregistrer session
    </sh-button>
  </div>

  <!-- Actions -->
  <footer class="actions">
    <sh-button
      size="sm"
      variant="ghost"
      iconBefore="eye"
      @click={handleView}
      ?disabled={isDeleting}>
      Voir
    </sh-button>
    <sh-button
      size="sm"
      variant="ghost"
      iconBefore="edit"
      @click={handleEdit}
      ?disabled={isUpdating || isDeleting}>
      Modifier
    </sh-button>
    <sh-button
      size="sm"
      variant="ghost"
      iconBefore="trash"
      ?loading={isDeleting}
      @click={handleDelete}>
      Supprimer
    </sh-button>
  </footer>
</sh-stock-card>
```

#### Animations

Alternative à Framer Motion :

```typescript
// Entrance animation
firstUpdated() {
  if (!this.reducedMotion) {
    this.animate([
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], {
      duration: 400,
      delay: this.index * 50,  // Cascade
      easing: 'ease-out',
      fill: 'backwards'
    });
  }
}
```

#### Styles Clés

```css
/* Status border */
.status-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

.status-border[data-status="in-stock"] {
  background: linear-gradient(90deg, #10b981, #059669);
}

.status-border[data-status="low-stock"] {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.status-border[data-status="out-of-stock"] {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}
```

#### Accessibilité

- `role="article"`
- ARIA labels pour tous les boutons
- Support navigation clavier
- Screen reader friendly

#### Stories

- Basic stock card
- Different statuses
- With AI suggestions
- Paint container variant
- Loading states
- Actions interactions
- Dark mode
- Responsive layouts

---

### `sh-stock-grid`

**Type** : Organism
**Statut** : 🆕 À créer
**Source** : `StockGrid.tsx` (StockHub V2)

#### API

```typescript
interface ShStockGridProps {
  items: StockItem[];
  loading?: boolean;
  emptyMessage?: string;
  columns?: 1 | 2 | 3 | 4 | 'auto';
}

// Events (propagés depuis sh-stock-card)
interface ShStockGridEvents {
  'sh-stock-view': CustomEvent<{ id: string }>;
  'sh-stock-edit': CustomEvent<{ id: string }>;
  'sh-stock-delete': CustomEvent<{ id: string }>;
  'sh-stock-record-usage': CustomEvent<{ id: string; amount: number }>;
}
```

#### Structure

```html
<sh-stock-grid>
  <!-- Loading State -->
  <div class="loading" ?hidden={!loading}>
    ${[...Array(6)].map(() => html`
      <div class="skeleton-card"></div>
    `)}
  </div>

  <!-- Empty State -->
  <div class="empty" ?hidden={!isEmpty}>
    <sh-icon name="inbox" size="48"></sh-icon>
    <p>${emptyMessage || 'Aucun article en stock'}</p>
  </div>

  <!-- Grid -->
  <div class="grid" ?hidden={loading || isEmpty}>
    ${items.map((item, index) => html`
      <sh-stock-card
        .stock={item}
        .index={index}
        @sh-stock-view={handleView}
        @sh-stock-edit={handleEdit}
        @sh-stock-delete={handleDelete}>
      </sh-stock-card>
    `)}
  </div>
</sh-stock-grid>
```

#### Responsive Grid

```css
.grid {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

/* Custom columns */
.grid[data-columns="1"] {
  grid-template-columns: 1fr;
}

.grid[data-columns="2"] {
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}

/* Responsive */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

#### Skeleton Loading

```css
.skeleton-card {
  height: 280px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 25%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-xl);
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

#### Stories

- Grid with items
- Loading state
- Empty state
- Different columns
- Responsive behavior
- Event handling

---

## 🟢 Priorité Basse

### `sh-input` (Amélioration)

**Type** : Atom
**Statut** : ⚠️ À améliorer
**Existant** : Oui

#### Alignement avec StockHub V2

- Vérifier cohérence visuelle
- Valider états (error, disabled, focus)
- Améliorer feedback visuel
- Tester avec formulaires React

#### Stories à Compléter

- All input types
- With labels
- With helper text
- Error states
- Disabled state
- Dark mode

---

## 📊 Tableau Récapitulatif

| Composant | Type | Priorité | Complexité | Estimation |
|-----------|------|----------|------------|------------|
| sh-badge | Atom | 🔴 Haute | Faible | 1h |
| sh-status-badge | Molecule | 🟡 Moyenne | Faible | 1h |
| sh-card | Molecule | 🔴 Haute | Moyenne | 2h |
| sh-button (MAJ) | Molecule | 🔴 Haute | Faible | 1.5h |
| sh-input (MAJ) | Atom | 🟡 Moyenne | Faible | 1h |
| sh-metric-card | Molecule | 🟡 Moyenne | Moyenne | 2h |
| sh-stock-card | Organism | 🟠 Haute | Élevée | 4h |
| sh-stock-grid | Organism | 🟢 Basse | Faible | 1.5h |

**Total estimé** : ~14h (composants uniquement, hors tokens et docs)

---

## 🎨 Conventions de Style

### Nomenclature CSS

```css
/* BEM pattern adapté */
.sh-component { }
.sh-component__element { }
.sh-component--modifier { }
```

### Custom Properties

```css
/* Toujours utiliser tokens */
background: var(--color-purple-600);  /* ✅ Bon */
background: #7c3aed;  /* ❌ Mauvais */
```

### Dark Mode

```css
:host {
  /* Light mode (default) */
  --component-bg: var(--color-white);
  --component-text: var(--color-gray-900);
}

:host([data-theme="dark"]) {
  /* Dark mode */
  --component-bg: rgba(255, 255, 255, 0.05);
  --component-text: var(--color-gray-100);
}
```

---

**Dernière mise à jour** : 16 Octobre 2025
