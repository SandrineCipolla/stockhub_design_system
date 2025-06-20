import tokensJson from './tokens.json';

// Types pour les tokens
export interface DesignToken {
    value: string | string[];
    type: string;
    description?: string;
    lineHeight?: string;
}

export interface TokenGroup {
    [key: string]: DesignToken | TokenGroup;
}

// Export des tokens bruts
export const tokens = tokensJson;

// Helpers pour accéder aux tokens
export const getToken = (path: string): string => {
    const keys = path.split('.');
    let current: any = tokens;

    for (const key of keys) {
        current = current[key];
        if (!current) return '';
    }

    return current.value || '';
};

// Tokens typés pour TypeScript
export const stockhubTokens = {
    color: {
        primary: {
            50: '#f8f7ff',
            100: '#f0ebff',
            200: '#e0d4ff',
            300: '#c7b6ff',
            400: '#a688ff',
            500: '#8b5cf6',
            600: '#7c3aed',
            700: '#6d28d9',
            800: '#5b21b6',
            900: '#4c1d95',
        },
        success: {
            50: '#ecfdf5',
            500: '#10b981',
            600: '#059669',
        },
        warning: {
            50: '#fffbeb',
            500: '#f59e0b',
            600: '#d97706',
        },
        danger: {
            50: '#fef2f2',
            500: '#ef4444',
            600: '#dc2626',
        },
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '64px',
    },
    fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
    },
    borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
    },
} as const;

export type ColorScale = keyof typeof stockhubTokens.color.primary;
export type SpacingScale = keyof typeof stockhubTokens.spacing;
export type FontSizeScale = keyof typeof stockhubTokens.fontSize;
export type BorderRadiusScale = keyof typeof stockhubTokens.borderRadius;