export const LEADING_SCALE = {
	1: 0.875,
	2: 1,
	3: 1.125,
	4: 1.25,
	5: 1.375,
	6: 1.5,
	7: 1.75,
	8: 2,
	9: 2.5,
} as const;

export const LEADING_SCALE_READABLE = {
	tight: 2,
	snug: 4,
	normal: 6,
	relaxed: 7,
	loose: 8,
} as const;

export type LeadingScale = keyof typeof LEADING_SCALE;
export type LeadingScaleReadable = keyof typeof LEADING_SCALE_READABLE;

export function leading(
	value: LeadingScale | LeadingScaleReadable,
	unit = 'em',
): string {
	if (typeof value === 'number') {
		return LEADING_SCALE[value] + unit;
	}
	return LEADING_SCALE[LEADING_SCALE_READABLE[value]] + unit;
}
