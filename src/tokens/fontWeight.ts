export const FONT_WEIGHT_SCALE_READABLE = {
	hairline: 1,
	thin: 2,
	light: 3,
	normal: 4,
	medium: 5,
	semibold: 6,
	bold: 7,
	extrabold: 8,
	black: 9,
} as const;

export const FONT_WEIGHT_SCALE = {
	1: '100',
	2: '200',
	3: '300',
	4: '400',
	5: '500',
	6: '600',
	7: '700',
	8: '800',
	9: '900',
} as const;

export type FontWeightScale = keyof typeof FONT_WEIGHT_SCALE;
export type FontWeightScaleReadable = keyof typeof FONT_WEIGHT_SCALE_READABLE;

export function fontWeight(
	value: FontWeightScale | FontWeightScaleReadable,
): string {
	if (typeof value === 'number') {
		return FONT_WEIGHT_SCALE[value];
	}
	return FONT_WEIGHT_SCALE[FONT_WEIGHT_SCALE_READABLE[value]];
}
