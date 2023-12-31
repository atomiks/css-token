export const TRACKING_SCALE = {
	1: -0.05,
	2: -0.025,
	3: 0,
	4: 0.025,
	5: 0.05,
	6: 0.1,
	7: 0.25,
	8: 0.5,
	9: 1,
} as const;

export const TRACKING_SCALE_READABLE = {
	tight: 1,
	snug: 2,
	normal: 3,
	relaxed: 4,
	loose: 5,
} as const;

export type TrackingScale = keyof typeof TRACKING_SCALE;
export type TrackingScaleReadable = keyof typeof TRACKING_SCALE_READABLE;

export function tracking(
	value: TrackingScale | TrackingScaleReadable,
	unit = 'em',
): string {
	if (typeof value === 'number') {
		return TRACKING_SCALE[value] + unit;
	}
	return TRACKING_SCALE[TRACKING_SCALE_READABLE[value]] + unit;
}
