export const ROUNDED_SCALE = {
	xs: '0.075rem',
	sm: '0.125rem',
	md: '0.25rem',
	lg: '0.5rem',
	xl: '0.75rem',
	'2xl': '1rem',
	'3xl': '1.25rem',
	'4xl': '1.5rem',
	'5xl': '2rem',
	full: '100%',
};

export type RoundedScale = keyof typeof ROUNDED_SCALE;

export function rounded(value: RoundedScale) {
	return ROUNDED_SCALE[value];
}
