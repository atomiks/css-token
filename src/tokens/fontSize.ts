export const FONT_SIZE_SCALE_READABLE = {
	'5xs': 2.5,
	'4xs': 3,
	'3xs': 3.5,
	'2xs': 4,
	xs: 4.5,
	sm: 5,
	md: 6,
	lg: 8,
	xl: 10,
	'2xl': 11,
	'3xl': 12,
	'4xl': 14,
	'5xl': 16,
} as const;

export const FONT_SIZE_SCALE = {
	0.5: 5 / 16,
	1: 6 / 16,
	1.5: 7 / 16,
	2: 8 / 16,
	2.5: 9 / 16,
	3: 10 / 16,
	3.5: 11 / 16,
	4: 12 / 16,
	4.5: 13 / 16,
	5: 14 / 16,
	6: 16 / 16,
	7: 18 / 16,
	8: 20 / 16,
	9: 24 / 16,
	10: 28 / 16,
	11: 32 / 16,
	12: 40 / 16,
	13: 48 / 16,
	14: 56 / 16,
	15: 64 / 16,
	16: 72 / 16,
} as const;

export type FontSizeScale = keyof typeof FONT_SIZE_SCALE;
export type FontSizeScaleReadable = keyof typeof FONT_SIZE_SCALE_READABLE;
export type CSSFontSizeScale =
	| '0_5'
	| 1
	| '1_5'
	| 2
	| '2_5'
	| 3
	| '3_5'
	| 4
	| '4_5'
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16;

export function fontSize(
	value: FontSizeScale | FontSizeScaleReadable,
	unit = 'rem',
): string {
	if (typeof value === 'number') {
		return FONT_SIZE_SCALE[value] + unit;
	}
	return FONT_SIZE_SCALE[FONT_SIZE_SCALE_READABLE[value]] + unit;
}
