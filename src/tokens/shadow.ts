import type {Base16Scale} from '../types';
import {type Color, type Hue, color} from './color';

export type ShadowPreset = 'none' | 'dreamy' | 'long' | 'sharp';

export function shadow({
	preset = 'none',
	elevation: e = 1,
	intensity: i = 1,
	color: shadowColor,
}: {
	preset?: ShadowPreset;
	elevation?: number;
	color?: Color;
	intensity?: number;
} = {}) {
	const [h, sh = 12] = shadowColor
		? (shadowColor.split('-') as [Hue, `${Base16Scale}`])
		: [];
	const hSh = h && sh ? (`${h}-${sh}` as const) : null;
	const black = `rgba(0,0,0,${0.04 * i})`;

	if (preset === 'sharp') {
		const c = hSh ? color(hSh, {alpha: 0.06 * i * e}) : black;
		return [
			`0 0 0 1px ${e === 1 ? black : `rgba(0,0,0,${(0.03 * e) / 1.25})`}`,
			`0 ${e}px ${e}px -0.5px ${c}`,
			`0 ${e * 3}px ${e * 3}px -1.5px ${c}`,
			`0 ${e * 6}px ${e * 6}px -3px ${c}`,
			`0 ${e * 12}px ${e * 12}px -6px ${c}`,
			`0 ${e * 24}px ${e * 24}px -12px ${c}`,
		].join(',');
	}

	if (preset === 'long') {
		return [
			`0 0 ${e * 4}px ${hSh ? color(hSh, {alpha: 0.01 * i}) : black}`,
			`0 ${e}px ${e * 2}px ${hSh ? color(hSh, {alpha: 0.01 * i}) : black}`,
			`0 ${e * 4}px ${e * 2}px ${hSh ? color(hSh, {alpha: 0.01 * i}) : black}`,
			`0 ${e * 8}px ${e * 4}px ${hSh ? color(hSh, {alpha: 0.02 * i}) : black}`,
			`0 ${e * 16}px ${e * 8}px ${hSh ? color(hSh, {alpha: 0.02 * i}) : black}`,
			`0 ${e * 32}px ${e * 16}px ${
				hSh ? color(hSh, {alpha: 0.02 * i}) : black
			}`,
			`0 ${e * 64}px ${e * 32}px ${
				hSh ? color(hSh, {alpha: 0.03 * i}) : black
			}`,
		].join(',');
	}

	if (preset === 'dreamy') {
		return [
			`0 ${e * 4}px ${e * 8}px ${hSh ? color(hSh, {alpha: 0.04 * i}) : black}`,
			`0 ${e * 16}px ${e * 32}px ${hSh ? color(hSh, {alpha: 0.1 * i}) : black}`,
		].join(',');
	}

	return [
		`0 ${e / 2}px ${e}px ${hSh ? color(hSh, {alpha: 0.02 * i}) : black}`,
		`0 ${e}px ${e * 2}px ${hSh ? color(hSh, {alpha: 0.04 * i}) : black}`,
		`0 ${e * 2}px ${e * 4}px ${hSh ? color(hSh, {alpha: 0.06 * i}) : black}`,
		`0 ${e * 4}px ${e * 8}px ${hSh ? color(hSh, {alpha: 0.08 * i}) : black}`,
	].join(',');
}
