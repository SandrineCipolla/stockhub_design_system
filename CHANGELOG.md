# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0](https://github.com/SandrineCipolla/stockhub_design_system/compare/v1.2.2...v1.3.0) (2026-04-02)


### Features

* add issue templates for bug reports, technical tasks, and user stories ([08d41f2](https://github.com/SandrineCipolla/stockhub_design_system/commit/08d41f23dc57d87c9670d8c334237da90a53470d))
* add issue templates for bug reports, technical tasks, and user stories ([5944640](https://github.com/SandrineCipolla/stockhub_design_system/commit/59446408a9436f962ed0e53fea9eabc723de8047))
* add issue templates for bug reports, technical tasks, and user stories ([928eef2](https://github.com/SandrineCipolla/stockhub_design_system/commit/928eef2a774275df415d328b4b105a68a97163a2))
* **sh-stat-card:** add new molecule component for interactive filtering with selected state ([42feb02](https://github.com/SandrineCipolla/stockhub_design_system/commit/42feb0285450bfd6148215337645faeb0149e630))
* **stock-prediction-card:** add new ML prediction card component with detailed metrics and interactive features ([ddb42d8](https://github.com/SandrineCipolla/stockhub_design_system/commit/ddb42d8cb2d72aac5141b328f8d774f25c6e4cd9))
* **stock-prediction-card:** add new ML prediction card component with detailed metrics and interactive features ([9c72797](https://github.com/SandrineCipolla/stockhub_design_system/commit/9c72797cb0229a7b482bdfffd9efb4352b7efecf))
* **stock-prediction-card:** add new ML prediction card component with detailed metrics and interactive features ([bb73edc](https://github.com/SandrineCipolla/stockhub_design_system/commit/bb73edc7cbac3a6849464ad2edbc1072805341c7))


### Bug Fixes

* **a11y:** map aria-label attribute to ariaLabel property in sh-button — closes [#28](https://github.com/SandrineCipolla/stockhub_design_system/issues/28) ([#29](https://github.com/SandrineCipolla/stockhub_design_system/issues/29)) ([64ffd63](https://github.com/SandrineCipolla/stockhub_design_system/commit/64ffd633b01e1d77de5fe85c3b6ea156f23af471))
* **sh-stat-card:** improve hover effect and sizing for better UX ([#22](https://github.com/SandrineCipolla/stockhub_design_system/issues/22)) ([8f87e63](https://github.com/SandrineCipolla/stockhub_design_system/commit/8f87e6391693d63100c3fa38af39e8746ed68507))

## [Unreleased]

## [1.3.1] - 2025-01-16

### Changed
- **sh-stat-card**: Amélioration de l'UX et du design
  - Effet hover : bordure primary au lieu de changement de background (plus cohérent avec les autres composants)
  - Hauteur réduite : `min-height: 72px` (vs 88px) pour meilleur centrage dans NavSection
  - Padding optimisé : `var(--spacing-xs) var(--spacing-sm)` pour un design plus compact
  - Gap réduit entre valeur et label : `var(--spacing-2xs)` pour meilleure lisibilité

## [1.3.0] - 2025-01-16

### Added
- **sh-stat-card**: Nouveau composant molecule pour filtrage interactif des prédictions par niveau de risque
  - Design minimaliste pour affichage de statistiques (valeur + label)
  - Layout centré vertical
  - 5 niveaux de risque alignés avec `sh-stock-prediction-card` : default, critical, high, medium, low
  - Couleurs différenciées pour meilleure distinction visuelle (high/medium utilisent warning-500/400)
  - État sélectionné avec bordure primary pour indiquer le filtre actif
  - Support thème clair/sombre avec couleurs adaptées pour contraste WCAG AA
  - Cliquable avec émission d'événement personnalisé (`sh-stat-click`)
  - 7 stories Storybook incluant le cas d'usage réel des filtres Analytics avec tests d'interaction
  - Conformité WCAG AA avec attributs ARIA appropriés (role="button", aria-pressed, aria-label)
- **sh-stock-prediction-card**: Nouveau composant organism pour afficher les prédictions ML de rupture de stock avec métriques détaillées, indicateurs de confiance et fonctionnalités interactives ([#18](https://github.com/SandrineCipolla/stockhub_design_system/issues/18))
  - 4 niveaux de risque : critique, élevé, moyen, faible
  - Badge de confiance avec couleurs adaptatives pour conformité WCAG AA
  - Barre de progression avec intervalle de confiance
  - Métriques détaillées (taux de consommation, date de rupture)
  - Recommandations d'action (date et quantité de réapprovisionnement)
  - Support thème clair/sombre
  - Mode cliquable avec émission d'événements personnalisés
  - 9 stories Storybook et 3 tests d'interaction
  - Conformité accessibilité WCAG AA à 100%
- Documentation technique complète dans `documentation/STOCK-PREDICTION-CARD-IMPLEMENTATION.md`

### Fixed
- package.json: Réorganisation des exports pour placer la condition "types" en premier, éliminant l'avertissement TypeScript

## [1.2.2] - 2025-11-XX

### Added
- **sh-stock-card**: IA badge now inherits color from stock status for better visual consistency ([#9](https://github.com/SandrineCipolla/stockhub_design_system/issues/9))

### Fixed
- **sh-button**: Center icons properly in mobile mode with hide-text-mobile attribute ([#10](https://github.com/SandrineCipolla/stockhub_design_system/issues/10))
- **sh-button**: Increase md size padding for better visual presence ([#11](https://github.com/SandrineCipolla/stockhub_design_system/issues/11))
- **sh-stock-card**: Add `reflect:true` to status property for CSS selectors to work properly ([#12](https://github.com/SandrineCipolla/stockhub_design_system/issues/12))

### Changed
- Updated custom-elements manifest after component updates

## [1.2.1] - 2025-11-XX

### Added
- CI/CD workflow optimizations: merged jobs and automated Lighthouse audits with GitHub Pages deployment
- Automated accessibility badge updates in README
- Quick accessibility audit script for development
- Comprehensive accessibility audit scanning all components via iframe

### Fixed
- Corrected GitHub Pages links in README
- Lighthouse audit script to target Storybook on port 6006

### Changed
- Deployment workflow now publishes Lighthouse report as docs/index.html
- Refactored accessibility audit to improve robustness and reporting
- Updated sprint checklist and PR template to reflect automated code quality and accessibility checks

## [1.2.0] - 2025-11-XX

### Added
- **sh-footer**: New organism component for application footer
- **sh-search-input**: New molecule component for search functionality
- **sh-ia-alert-banner**: New organism component for AI-powered alerts

### Changed
- Migrated icon system from custom SVG icons to Lucide Icons library
- Updated all components to use Lucide icons via sh-icon
- Improved design token system

### Deprecated
- Custom SVG icon system (replaced by Lucide Icons)

## [1.1.0] - 2025-XX-XX

### Added
- **sh-stock-item-card**: Organism component for stock item details
- **sh-page-header**: Organism component for page headers
- **sh-quantity-input**: Molecule component for quantity input with +/- controls
- **sh-metric-card**: Molecule component for displaying metrics

### Changed
- Enhanced Storybook documentation with more examples
- Improved TypeScript type coverage

## [1.0.0] - 2025-XX-XX

### Added
- Initial release of StockHub Design System
- **Atoms**: sh-badge, sh-icon, sh-input, sh-logo, sh-text
- **Molecules**: sh-button, sh-card, sh-status-badge
- **Organisms**: sh-header, sh-stock-card
- Design tokens system with CSS custom properties
- Storybook setup for component documentation
- TypeScript strict mode
- Lit Element as base framework
- Comprehensive accessibility testing with axe-core
- Lighthouse integration for automated audits

[Unreleased]: https://github.com/SandrineCipolla/stockhub_design_system/compare/v1.2.2...HEAD
[1.2.2]: https://github.com/SandrineCipolla/stockhub_design_system/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/SandrineCipolla/stockhub_design_system/releases/tag/v1.2.1
