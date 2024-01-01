import type {Base16Scale} from '../types';
import {oklch2rgb} from '../utils/oklchToRgb';

export const metalHueAngles = {
	bronze: 30,
	gold: 75,
	emerald: 140,
	sapphire: 220,
	amethyst: 300,
} as const;

export const grayHueAngles = {
	stone: 20,
	gray: 0,
	slate: 235,
	mauve: 275,
} as const;

export const colorHueAngles = {
	red: 25,
	orange: 50,
	yellow: 85,
	lime: 120,
	grass: 135,
	green: 150,
	teal: 165,
	mint: 180,
	cyan: 195,
	sky: 220,
	blue: 245,
	indigo: 275,
	purple: 300,
	magenta: 325,
	pink: 350,
	crimson: 370,
} as const;

export const hueAngles = {
	...metalHueAngles,
	...grayHueAngles,
	...colorHueAngles,
} as const;

export function round(value: number, to = 1) {
	return Math.round(value * to) / to;
}

export function getChannels(hueShade: Color, {vibrance = 1, p3 = false} = {}) {
	const [hue, shadeStr] = hueShade.split('-') as [Hue, `${Base16Scale}`];
	const shade = Number(shadeStr);

	let l: number;
	let c: number;
	let h: number = hueAngles[hue];

	if (shade === 1) l = 98;
	else if (shade === 2) l = 95;
	else if (shade === 3) l = 92.5;
	else l = 112 - shade * 5.8;

	const isMetal =
		hue === 'bronze' ||
		hue === 'gold' ||
		hue === 'emerald' ||
		hue === 'sapphire' ||
		hue === 'amethyst';

	c = (() => {
		if (hue === 'gray') return 0;
		if (hue === 'stone') return 1.5;
		if (hue === 'slate') return 2.5;
		if (hue === 'mauve') return 3;
		if (isMetal) return 7 + shade / 10;
		if (hue === 'blue') {
			if (shade < 4) h += 15;
			if (shade === 4) h += 10;
			if (shade === 5) h += 5;
		}
		if (hue === 'sky') {
			if (shade === 1) h += 20;
			else if (shade < 5) h += 15;
			else if (shade === 5) h += 5;
		}
		if (hue === 'pink') {
			if (shade < 6) h += 5;
		}
		if (shade === 1) return 10;
		if (shade === 2) {
			if (hue === 'cyan') return 17.5;
			return 20;
		}
		if (shade === 3) {
			if (hue === 'cyan') return 26;
			if (hue === 'sky' || hue === 'mint') return 27.5;
			if (hue === 'teal') return 30;
			return 35;
		}
		if (shade === 4) {
			if (hue === 'cyan') return 32.5;
			return 37.5;
		}
		if (shade === 6) {
			if (hue === 'sky') return 37.5;
		}
		if (shade >= 5 && shade <= 8) return 42.5;
		return -5 * (shade - 17);
	})();

	switch (hue) {
		case 'red':
		case 'orange':
		case 'yellow':
		case 'indigo':
		case 'crimson':
		case 'lime':
			c *= 1.2;
			break;
		case 'grass':
		case 'green':
		case 'teal':
		case 'pink':
		case 'magenta':
		case 'purple':
			c *= 1.1;
			break;
		case 'sky':
			c *= 0.925;
			break;
	}

	c *= vibrance;

	const fL = round(l / 100, 1000);
	const fC = round(c / 225, 1000);

	if (p3) {
		return [fL, fC, h] as const;
	}

	return oklch2rgb([fL, fC, h]);
}

export type Hue = keyof typeof hueAngles;
export type Color = `${Hue}-${Base16Scale}`;

export function color(
	hueShade: Color,
	{
		alpha = 1,
		vibrance = 1,
		p3 = false,
	}: {
		alpha?: number;
		vibrance?: number;
		p3?: boolean;
	} = {},
): string {
	const [x, y, z] = getChannels(hueShade, {p3, vibrance});
	const a = alpha !== 1 ? ` /${alpha}` : '';

	if (p3) {
		return `oklch(${x} ${y} ${z}${a})`;
	}

	return `rgb(${[x, y, z].map((n) => round(n)).join(' ')}${a})`;
}
