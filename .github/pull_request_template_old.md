# Checklist de revue de code – StockHub Design System

Merci de compléter cette checklist avant de soumettre la PR :

## Qualité du code
- [ ] Typage TypeScript strict et cohérent (manuel)
- [ ] Props, slots et événements bien nommés et documentés (manuel)
- [ ] Aucun style ou valeur “hardcodée” : tout passe par les design tokens (manuel)
- [ ] Respect des conventions de nommage (fichiers, variables, composants) (manuel)

## Accessibilité
- [ ] Tests d’accessibilité passés (axe-core, Lighthouse) (`deploy.yml` - automatisé)
- [ ] Attributs ARIA, rôles et navigation clavier vérifiés (manuel)
- [ ] Contraste et focus visuel conformes (`deploy.yml` + audit Lighthouse - automatisé)

## Tests
- [ ] Tests unitaires et/ou d’intégration ajoutés ou mis à jour (`ci.yml` - automatisé)
- [ ] Storybook mis à jour et vérifié visuellement (Chromatic - automatisé)

## Documentation
- [ ] JSDoc présent et à jour sur les nouveaux composants/props (manuel)
- [ ] Documentation technique et guides mis à jour si besoin (manuel)
- [ ] Changelog mis à jour pour les changements importants (manuel)

## Validation
- [ ] Vérification responsive et cross-browser (`deploy.yml` + Chromatic - automatisé)
- [ ] Relecture par un autre membre de l’équipe (manuel)

---
Merci de cocher chaque point et d’ajouter des commentaires si besoin. Cette checklist garantit la qualité et la cohérence du design system.

## Description
<!-- Explique le contexte, les changements apportés, l'impact et les points d'attention -->

## Screenshots / Preuves (si pertinent)
<!-- Ajoute des captures d'écran, liens Chromatic, rapport Lighthouse, etc. -->

## Points à surveiller / Questions
<!-- Liste les points à valider ou les questions pour les reviewers -->
