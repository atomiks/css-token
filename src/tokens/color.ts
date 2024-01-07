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
	amber: 83,
	yellow: 95,
	lime: 125,
	grass: 140,
	green: 155,
	teal: 170,
	mint: 188,
	cyan: 210,
	sky: 230,
	blue: 256,
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
			h += 23 - shade * 1.75;
		}
		if (hue === 'pink') {
			if (shade < 6) h += 5;
		}
		if (hue === 'indigo') {
			if (shade < 6) h += 12 - shade * 2;
		}
		if (hue === 'yellow') {
			if (shade < 5) h += 6 - shade;
		}
		if (hue === 'amber') {
			if (shade < 5) h -= 25 - 5 * shade;
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
		if (shade === 5) {
			if (hue === 'cyan') return 40;
		}
		if (shade === 6) {
			if (hue === 'sky') return 41;
		}
		if (shade >= 5 && shade <= 10) return 42.5;
		return -5 * (shade - 19);
	})();

	switch (hue) {
		case 'red':
		case 'amber':
		case 'indigo':
		case 'crimson':
		case 'lime':
			c *= 1.2;
			break;
		case 'green':
		case 'grass':
		case 'teal':
		case 'yellow':
			c *= 1.15;
			break;
		case 'pink':
		case 'magenta':
		case 'purple':
		case 'blue':
		case 'orange':
			c *= 1.1;
			break;
		case 'cyan':
		case 'mint':
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
