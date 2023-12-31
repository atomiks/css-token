export const SYSTEM_FONTS = {
	sans: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
	mono: 'JetBrains Mono, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
	serif: 'Georgia, Cambria, Times New Roman, Times, serif',
} as const;

export type FontFamily = keyof typeof SYSTEM_FONTS;

export function fontFamily(type: 'sans' | 'mono' | 'serif') {
	return SYSTEM_FONTS[type];
}
