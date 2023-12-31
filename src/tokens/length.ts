export const LENGTH_SCALE = {
	0: 0,
	0.5: 1 / 16,
	1: 2 / 16,
	1.5: 3 / 16,
	2: 4 / 16,
	2.5: 5 / 16,
	3: 6 / 16,
	3.5: 7 / 16,
	4: 8 / 16,
	4.5: 9 / 16,
	5: 10 / 16,
	6: 12 / 16,
	7: 14 / 16,
	8: 16 / 16,
	9: 20 / 16,
	10: 24 / 16,
	11: 28 / 16,
	12: 32 / 16,
	13: 40 / 16,
	14: 48 / 16,
	15: 60 / 16,
	16: 72 / 16,
	17: 84 / 16,
	18: 96 / 16,
	19: 108 / 16,
	20: 120 / 16,
	21: 144 / 16,
	22: 168 / 16,
	23: 192 / 16,
	24: 216 / 16,
	25: 240 / 16,
	26: 288 / 16,
	27: 336 / 16,
	28: 384 / 16,
	29: 432 / 16,
	30: 480 / 16,
	31: 576 / 16,
	32: 672 / 16,
};

export type LengthScale = keyof typeof LENGTH_SCALE;

export type CSSLengthScale =
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
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23
	| 24
	| 25
	| 26
	| 27
	| 28
	| 29
	| 30
	| 31
	| 32;

export function length(value: LengthScale, unit = 'rem'): string {
	return LENGTH_SCALE[value] + unit;
}
