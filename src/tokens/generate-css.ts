import fs from "fs"
import path from "path"
import tokens from "./tokens.json"

interface TokenValue {
    value: string | number
    type?: string
    description?: string
}

interface TokenGroup {
    [key: string]: TokenValue | TokenGroup
}

function generateCSSVariables(obj: TokenGroup, prefix = ""): string {
    let css = ""

    for (const [key, value] of Object.entries(obj)) {
        const cssVarName = `--${prefix}${prefix ? "-" : ""}${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`

        if (value && typeof value === "object" && "value" in value) {
            // C'est un token final
            css += `  ${cssVarName}: ${value.value};\n`
        } else if (value && typeof value === "object") {
            // C'est un groupe, on continue récursivement
            css += generateCSSVariables(value as TokenGroup, `${prefix}${prefix ? "-" : ""}${key}`)
        }
    }

    return css
}

function generateCompleteCSS(): string {
    let css = `/* DESIGN TOKENS STOCKHUB - DARK MODE PAR DÉFAUT */\n`
    css += `/* Généré automatiquement depuis tokens.json */\n\n`

    // Dark mode par défaut dans :root
    css += `:root {\n`
    css += `  /* ===== DARK MODE PAR DÉFAUT ===== */\n\n`

    // Couleurs sémantiques pour dark mode
    css += `  /* Couleurs de surface - Dark */\n`
    css += `  --color-surface-primary: ${tokens.color.semantic.surface.primary.dark.value};\n`
    css += `  --color-surface-secondary: ${tokens.color.semantic.surface.secondary.dark.value};\n`
    css += `  --color-surface-tertiary: ${tokens.color.semantic.surface.tertiary.dark.value};\n`
    css += `  --color-surface-accent: ${tokens.color.semantic.surface.accent.dark.value};\n\n`

    css += `  /* Couleurs de texte - Dark */\n`
    css += `  --color-text-primary: ${tokens.color.semantic.text.primary.dark.value};\n`
    css += `  --color-text-secondary: ${tokens.color.semantic.text.secondary.dark.value};\n`
    css += `  --color-text-tertiary: ${tokens.color.semantic.text.tertiary.dark.value};\n`
    css += `  --color-text-muted: ${tokens.color.semantic.text.muted.dark.value};\n`
    css += `  --color-text-on-primary: ${tokens.color.semantic.text.onPrimary.value};\n\n`

    css += `  /* Couleurs de bordure */\n`
    css += `  --color-border-primary: ${tokens.color.semantic.border.primary.value};\n`
    css += `  --color-border-secondary: ${tokens.color.semantic.border.secondary.value};\n`
    css += `  --color-border-subtle: ${tokens.color.semantic.border.subtle.value};\n\n`

    // Générer tous les autres tokens
    css += `  /* Couleurs système */\n`
    css += generateCSSVariables(tokens.color.primary, "color-primary")
    css += generateCSSVariables(tokens.color.success, "color-success")
    css += generateCSSVariables(tokens.color.warning, "color-warning")
    css += generateCSSVariables(tokens.color.danger, "color-danger")
    css += generateCSSVariables(tokens.color.neutral, "color-neutral")
    css += `\n`

    css += `  /* Espacements */\n`
    css += generateCSSVariables(tokens.spacing, "spacing")
    css += `\n`

    css += `  /* Typographie */\n`
    css += generateCSSVariables(tokens.typography, "font")
    css += `\n`

    css += `  /* Bordures */\n`
    css += generateCSSVariables(tokens.border, "border")
    css += `\n`

    // Ombres pour dark mode
    css += `  /* Ombres - Dark Mode */\n`
    css += generateCSSVariables(tokens.shadow.dark, "shadow")
    css += `\n`

    css += `  /* Transitions */\n`
    css += generateCSSVariables(tokens.transition, "transition")
    css += `\n`

    css += `  /* Z-index */\n`
    css += generateCSSVariables(tokens.zIndex, "z")
    css += `\n`

    css += `  /* Composants */\n`
    css += generateCSSVariables(tokens.component, "component")
    css += `\n`

    css += `  /* Animations */\n`
    css += generateCSSVariables(tokens.animation, "animation")
    css += `\n`

    css += `  /* Breakpoints */\n`
    css += generateCSSVariables(tokens.breakpoint, "breakpoint")
    css += `}\n\n`

    // Light mode comme override
    css += `/* ===== LIGHT MODE COMME OVERRIDE ===== */\n`
    css += `[data-theme="light"] {\n`
    css += `  /* Couleurs de surface - Light */\n`
    css += `  --color-surface-primary: ${tokens.color.semantic.surface.primary.light.value};\n`
    css += `  --color-surface-secondary: ${tokens.color.semantic.surface.secondary.light.value};\n`
    css += `  --color-surface-tertiary: ${tokens.color.semantic.surface.tertiary.light.value};\n`
    css += `  --color-surface-accent: ${tokens.color.semantic.surface.accent.light.value};\n\n`

    css += `  /* Couleurs de texte - Light */\n`
    css += `  --color-text-primary: ${tokens.color.semantic.text.primary.light.value};\n`
    css += `  --color-text-secondary: ${tokens.color.semantic.text.secondary.light.value};\n`
    css += `  --color-text-tertiary: ${tokens.color.semantic.text.tertiary.light.value};\n`
    css += `  --color-text-muted: ${tokens.color.semantic.text.muted.light.value};\n\n`

    // Ombres pour light mode
    css += `  /* Ombres - Light Mode */\n`
    css += generateCSSVariables(tokens.shadow, "shadow")
    css += `}\n\n`

    // Ajouter les utilitaires CSS
    css += generateUtilitiesCSS()

    return css
}

function generateUtilitiesCSS(): string {
    return `/* ===== CLASSES UTILITAIRES ===== */

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
  50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.6); }
}

@keyframes slideInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-float { animation: float 6s ease-in-out infinite; }
.animate-glow { animation: glow 2s ease-in-out infinite alternate; }
.animate-slideInUp { animation: slideInUp 0.6s ease-out forwards; }
.animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
.animate-spin { animation: spin 1s linear infinite; }

/* Scrollbar personnalisé */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--color-surface-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--color-primary-500);
  border-radius: var(--border-radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-primary-600);
}

/* Focus states pour l'accessibilité */
.focus-ring {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary-500);
  border-radius: var(--border-radius-md);
}

/* Classes de transition */
.transition-all {
  transition: all var(--transition-duration-normal) var(--transition-timing-ease);
}

.transition-colors {
  transition: color var(--transition-duration-fast) var(--transition-timing-ease),
              background-color var(--transition-duration-fast) var(--transition-timing-ease),
              border-color var(--transition-duration-fast) var(--transition-timing-ease);
}

.transition-transform {
  transition: transform var(--transition-duration-normal) var(--transition-timing-ease);
}

/* Utilitaires de thème */
.dark-mode {
  color-scheme: dark;
}

.light-mode {
  color-scheme: light;
}

/* Responsive helpers */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --color-border-primary: currentColor;
    --color-border-secondary: currentColor;
  }
}

/* Print styles */
@media print {
  * {
    background: transparent !important;
    color: black !important;
    box-shadow: none !important;
  }
}
`
}

// Générer le fichier CSS
const cssContent = generateCompleteCSS()
const outputPath = path.join(__dirname, "design-tokens.css")

fs.writeFileSync(outputPath, cssContent, "utf8")

console.log("✅ Design tokens CSS générés avec succès!")
console.log(`📁 Fichier créé: ${outputPath}`)
console.log(`🎨 ${Object.keys(tokens).length} catégories de tokens générées`)
console.log(`🌙 Dark mode configuré par défaut`)

// Générer aussi un fichier TypeScript pour l'autocomplétion
const tsContent = generateTypeScriptTokens()
const tsOutputPath = path.join(__dirname, "design-tokens.ts")
fs.writeFileSync(tsOutputPath, tsContent, "utf8")

console.log(`📝 Types TypeScript générés: ${tsOutputPath}`)

function generateTypeScriptTokens(): string {
    return `/* Types générés automatiquement depuis tokens.json */

export const designTokens = ${JSON.stringify(tokens, null, 2)} as const

export type ColorTokens = typeof designTokens.color
export type SpacingTokens = typeof designTokens.spacing
export type TypographyTokens = typeof designTokens.typography
export type BorderTokens = typeof designTokens.border
export type ShadowTokens = typeof designTokens.shadow
export type TransitionTokens = typeof designTokens.transition
export type ZIndexTokens = typeof designTokens.zIndex
export type ComponentTokens = typeof designTokens.component
export type AnimationTokens = typeof designTokens.animation
export type BreakpointTokens = typeof designTokens.breakpoint

export type DesignTokens = typeof designTokens
`
}
