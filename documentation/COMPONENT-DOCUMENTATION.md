# Component Documentation Guide

## Overview

All StockHub Design System components are documented using JSDoc comments and automatically generated documentation via the Custom Elements Manifest Analyzer.

## Documentation System

### Technology Stack

- **@custom-elements-manifest/analyzer** - Analyzes Lit components and generates `custom-elements.json`
- **Storybook autodocs** - Automatically generates documentation pages from the manifest
- **JSDoc** - Standard JavaScript documentation format for component metadata

### How It Works

1. JSDoc comments are added to component classes and properties
2. Running `npm run analyze` generates `custom-elements.json` from the source code
3. Storybook reads the manifest and displays documentation in the **Docs** tab
4. Documentation updates automatically when running `npm run storybook`

## Writing Component Documentation

### Component-Level Documentation

Add a JSDoc block before the `@customElement` decorator:

```typescript
/**
 * Brief description of the component.
 *
 * @element component-name
 *
 * @slot - Description of default slot
 * @slot slotName - Description of named slot
 *
 * @fires event-name - Description of custom event
 *
 * @csspart partName - Description of CSS part
 * @cssproperty --var-name - Description of CSS custom property
 *
 * @example
 * ```html
 * <component-name prop="value">Content</component-name>
 * ```
 */
@customElement('component-name')
export class ComponentName extends LitElement {
```

### Property Documentation

Add JSDoc blocks for each `@property`:

```typescript
/**
 * Property description
 * @type {string | 'option1' | 'option2'}
 * @default 'defaultValue'
 */
@property({ type: String }) propertyName = 'defaultValue';
```

## Documented Components

### Atoms

| Component | Element | Documentation |
|-----------|---------|---------------|
| ShBadge | `sh-badge` | ✅ Complete |
| ShIcon | `sh-icon` | ✅ Complete |
| ShInput | `sh-input` | ✅ Complete |
| ShLogo | `sh-logo` | ✅ Complete |
| ShText | `sh-text` | ✅ Complete |

### Molecules

| Component | Element | Documentation |
|-----------|---------|---------------|
| ShButton | `sh-button` | ✅ Complete |
| ShCard | `sh-card` | ✅ Complete |
| ShStatusBadge | `sh-status-badge` | ✅ Complete |
| ShQuantityInput | `sh-quantity-input` | ✅ Complete |

### Organisms

| Component | Element | Documentation |
|-----------|---------|---------------|
| ShHeader | `sh-header` | ✅ Complete |

## Viewing Documentation

### In Storybook

1. Start Storybook: `npm run storybook`
2. Navigate to any component in the sidebar
3. Click the **Docs** tab
4. View:
   - Component description
   - Property table with types, defaults, and descriptions
   - Slots and events (if applicable)
   - CSS parts and custom properties (if applicable)

### In Code

The `custom-elements.json` file contains the complete manifest and can be used by:
- IDEs for autocomplete and tooltips
- Documentation generators
- Other development tools

## Scripts

```bash
# Generate custom elements manifest
npm run analyze

# Start Storybook (auto-generates manifest first)
npm run storybook

# Build Storybook for production (auto-generates manifest first)
npm run build-storybook
```

## Best Practices

### 1. Be Descriptive

❌ Bad:
```typescript
/** Size */
@property() size = 'md';
```

✅ Good:
```typescript
/**
 * Size of the button
 * @type {'sm' | 'md' | 'lg'}
 * @default 'md'
 */
@property() size: 'sm' | 'md' | 'lg' = 'md';
```

### 2. Include Examples

Always provide usage examples in the component-level JSDoc:

```typescript
/**
 * @example
 * ```html
 * <sh-button variant="primary">Click me</sh-button>
 * <sh-button variant="danger" iconBefore="Trash">Delete</sh-button>
 * ```
 */
```

### 3. Document Events

List all custom events with `@fires`:

```typescript
/**
 * @fires sh-button-click - Fired when button is clicked
 * @fires sh-input-change - Fired when input value changes
 */
```

### 4. Document Slots

Document all slots, including the default slot:

```typescript
/**
 * @slot - Button content (text or other elements)
 * @slot icon - Custom icon slot
 */
```

### 5. Document CSS Parts and Custom Properties

```typescript
/**
 * @csspart badge - The badge container element
 * @cssproperty --logo-size - Controls the size of the logo (default: 48px)
 */
```

## Troubleshooting

### Documentation Not Updating

1. Stop Storybook
2. Delete `custom-elements.json`
3. Run `npm run analyze`
4. Restart Storybook

### Properties Not Showing

- Ensure `@property()` decorator is used (not just class properties)
- Check that JSDoc is directly above the property
- Verify `@type` annotation matches the TypeScript type

### Missing Component

- Check that component file is in `src/components/**/*.ts`
- Verify it's not excluded in `custom-elements-manifest.config.mjs`
- Component must use `@customElement()` decorator

## Configuration Files

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

- **Before each release**: Verify all components have complete documentation
- **When adding new components**: Add JSDoc comments immediately
- **When adding new properties**: Document them with JSDoc
- **Weekly**: Review and improve documentation clarity

## Resources

- [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/)
- [JSDoc Reference](https://jsdoc.app/)
- [Storybook Web Components Docs](https://storybook.js.org/docs/web-components/writing-docs/autodocs)
