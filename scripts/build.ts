import fs from 'node:fs';
import path from 'path';
import {
	type Color,
	type Hue,
	color,
	getChannels,
	hueAngles,
	round,
} from '../src/tokens/color';
import {SYSTEM_FONTS, fontFamily} from '../src/tokens/fontFamily';
import {FONT_SIZE_SCALE_READABLE, fontSize} from '../src/tokens/fontSize';
import {FONT_WEIGHT_SCALE_READABLE, fontWeight} from '../src/tokens/fontWeight';
import {layer} from '../src/tokens/layer';
import {LEADING_SCALE_READABLE, leading} from '../src/tokens/leading';
import {length} from '../src/tokens/length';
import {ROUNDED_SCALE, rounded} from '../src/tokens/rounded';
import {type ShadowPreset, shadow} from '../src/tokens/shadow';
import {NONELESS_SCALE, SPRING_SCALE, spring} from '../src/tokens/spring';
import {TRACKING_SCALE_READABLE, tracking} from '../src/tokens/tracking';
import {rgbToHex} from '../src/utils/rgbToHex';

function toCssVariables(data: Array<Record<string, unknown>>) {
	return `:root {\n${data
		.map(({key, value}) => `  --${key}: ${value};`)
		.join('\n')}\n}`;
}

function keys<T extends Record<string, unknown>>(object: T) {
	return Object.keys(object) as Array<keyof typeof object>;
}

function getColors(
	colors: Array<Color | Hue>,
	{
		only = [],
		p3,
	}: {
		only?: Array<Hue | Color>;
		p3?: boolean;
	} = {only: [], p3: false},
) {
	const entries: {key: Color | `p3_${Color}`; value: string}[] = [];

	for (const colorKey of colors) {
		if (only.length && !only.includes(colorKey)) continue;
		if (colorKey.includes('-')) {
			const key = colorKey as Color;
			entries.push({
				key: p3 ? `p3_${key}` : key,
				value: p3
					? color(key, {p3})
					: rgbToHex(
							getChannels(key).map((n) => round(n)) as [number, number, number],
					  ),
			});
		} else {
			[...Array(16)].map((_, i) => {
				const key = `${colorKey}-${i + 1}` as Color;
				entries.push({
					key: p3 ? `p3_${key}` : key,
					value: p3
						? color(key, {p3})
						: rgbToHex(
								getChannels(key).map((n) => round(n)) as [
									number,
									number,
									number,
								],
						  ),
				});
			});
		}
	}

	return entries;
}

function getShadows(shadows: Array<ShadowPreset>) {
	const entries: {
		key:
			| `shadow${`-${1 | 2 | 3 | 4}` | ''}`
			| `shadow-${ShadowPreset}${`-${1 | 2 | 3 | 4}` | ''}`;
		value: string;
	}[] = [];

	for (const preset of shadows) {
		for (let elevation = 1; elevation < 5; elevation++) {
			const e = elevation as 1 | 2 | 3 | 4;
			const key =
				preset === 'none'
					? (`shadow${e === 1 ? '' : (`-${e}` as const)}` as const)
					: (`shadow-${preset}${e === 1 ? '' : (`-${e}` as const)}` as const);
			entries.push({key, value: shadow({preset, elevation})});
		}
	}

	return entries;
}

function getLengths() {
	const entries: {
		key:
			| `length-${number}`
			| `length-${number}_5`
			| `length-scale-${number}`
			| `length-scale-${number}_5`;
		value: string;
	}[] = [];

	for (let i = 1; i <= 32; i++) {
		if (i < 5) {
			entries.push({key: `length-${i - 1}_5`, value: length((i - 0.5) as 1)});
			entries.push({
				key: `length-scale-${i - 1}_5`,
				value: length((i - 0.5) as 0.5, ''),
			});
		}
		entries.push({key: `length-${i}`, value: length(i as 1)});
		entries.push({key: `length-scale-${i}`, value: length(i as 1, '')});
	}

	return entries;
}

function getFontSizeScale() {
	const entries: {
		key: `font-size-scale-${string}`;
		value: string;
	}[] = [];

	const readableKeys = keys(FONT_SIZE_SCALE_READABLE);

	for (let i = 1; i <= 16; i++) {
		entries.push({key: `font-size-scale-${i}`, value: fontSize(i as 1, '')});
		if (i < 5) {
			entries.push({
				key: `font-size-scale-${i}_5`,
				value: fontSize((i - 0.5) as 0.5, ''),
			});
		}
	}

	for (const key of readableKeys) {
		entries.push({key: `font-size-scale-${key}`, value: fontSize(key, '')});
	}

	return entries;
}

function getLengthScale() {
	const entries: {
		key: `length-scale-${string}`;
		value: string;
	}[] = [];

	for (let i = 1; i <= 32; i++) {
		entries.push({key: `length-scale-${i}`, value: length(i as 1, '')});
		if (i < 5) {
			entries.push({
				key: `length-scale-${i}_5`,
				value: length((i - 0.5) as 0.5, ''),
			});
		}
	}

	return entries;
}

function getText() {
	function getSizes() {
		const entries: {
			key:
				| `font-size-${number}`
				| `font-size-${number}_5`
				| `font-size-${string}`;
			value: string;
		}[] = [];

		const readableKeys = keys(FONT_SIZE_SCALE_READABLE);

		for (let i = 1; i <= 16; i++) {
			entries.push({key: `font-size-${i}`, value: fontSize(i as 1)});
			entries.push({
				key: `font-size-scale-${i}`,
				value: fontSize(i as 1, ''),
			});
			if (i < 5) {
				entries.push({
					key: `font-size-${i}_5`,
					value: fontSize((i + 0.5) as 1.5),
				});
				entries.push({
					key: `font-size-scale-${i}_5`,
					value: fontSize((i + 0.5) as 1.5, ''),
				});
			}
		}

		for (const key of readableKeys) {
			entries.push({key: `font-size-${key}`, value: fontSize(key)});
			entries.push({key: `font-size-scale-${key}`, value: fontSize(key, '')});
		}

		return entries;
	}

	function getLeadings() {
		const entries: {
			key: `leading-${number}` | `leading-${string}`;
			value: string;
		}[] = [];

		const readableKeys = keys(LEADING_SCALE_READABLE);

		for (let i = 1; i <= 9; i++) {
			entries.push({key: `leading-${i}`, value: leading(i as 1, 'em')});
		}

		for (const key of readableKeys) {
			entries.push({key: `leading-${key}`, value: leading(key, 'em')});
		}

		return entries;
	}

	function getTrackings() {
		const entries: {
			key: `tracking-${number}` | `tracking-${string}`;
			value: string;
		}[] = [];

		const readableKeys = keys(TRACKING_SCALE_READABLE);

		for (let i = 1; i <= 9; i++) {
			entries.push({key: `tracking-${i}`, value: tracking(i as 1, 'em')});
		}

		for (const key of readableKeys) {
			entries.push({key: `tracking-${key}`, value: tracking(key, 'em')});
		}

		return entries;
	}

	function getWeights() {
		const entries: {
			key: `font-weight-${string}` | `font-weight-${string}`;
			value: string;
		}[] = [];

		const readableKeys = keys(FONT_WEIGHT_SCALE_READABLE);

		for (let i = 1; i <= 9; i++) {
			entries.push({key: `font-weight-${i}`, value: fontWeight(i as 1)});
		}

		for (const key of readableKeys) {
			entries.push({key: `font-weight-${key}`, value: fontWeight(key)});
		}

		return entries;
	}

	function getFamilies() {
		const entries: {
			key: `font-${string}`;
			value: string;
		}[] = [];

		const readableKeys = keys(SYSTEM_FONTS);

		for (const key of readableKeys) {
			entries.push({key: `font-${key}`, value: fontFamily(key)});
		}

		return entries;
	}

	return [
		...getFamilies(),
		...getSizes(),
		...getLeadings(),
		...getTrackings(),
		...getWeights(),
	];
}

function getRounded() {
	const entries: {
		key: 'rounded' | `rounded-${number}` | `rounded-${string}`;
		value: string;
	}[] = [];

	const readableKeys = keys(ROUNDED_SCALE);

	entries.push({key: 'rounded', value: rounded('md')});
	for (const key of readableKeys) {
		entries.push({key: `rounded-${key}`, value: rounded(key)});
	}

	return entries;
}

function getSprings() {
	const entries: {
		key: 'spring' | `spring-${(typeof NONELESS_SCALE)[number]}`;
		value: string;
	}[] = [];

	for (let i = 0; i < 5; i++) {
		const preset = SPRING_SCALE[i];
		entries.push({
			key: preset === 'none' ? 'spring' : `spring-${preset}`,
			value: spring({preset}),
		});
	}

	return entries;
}

function getLayers() {
	const entries: {
		key: `layer-${number}` | `layer-max`;
		value: string;
	}[] = [];

	for (let i = 1; i <= 6; i++) {
		const name = i === 6 ? 'max' : (i as 1);
		entries.push({key: `layer-${name}`, value: layer(name)});
	}

	return entries;
}

function write(name: string, value: string) {
	fs.writeFileSync(path.join(__dirname, `../${name}.css`), value, 'utf-8');
}

const hues = keys(hueAngles);

const tokens = [
	...hues.map((hue) => ({key: hue, value: getColors(hues, {only: [hue]})})),
	...hues.map((hue) => ({
		key: `${hue}-p3`,
		value: getColors(hues, {only: [hue], p3: true}),
	})),
	{key: 'color', value: getColors(hues)},
	{key: 'color-p3', value: getColors(hues, {p3: true})},
	{key: 'shadow', value: getShadows(['none', 'dreamy', 'long', 'sharp'])},
	{key: 'length', value: getLengths()},
	{key: 'text', value: getText()},
	{key: 'rounded', value: getRounded()},
	{key: 'spring', value: getSprings()},
	{key: 'font-size-scale', value: getFontSizeScale()},
	{key: 'layer', value: getLayers()},
];

for (const {key, value} of tokens) {
	write(key, toCssVariables(value));
}

write(
	'all',
	[
		toCssVariables(
			Object.values(
				tokens.filter((n) => n.key !== 'color' && n.key !== 'color-p3'),
			).reduce((acc: Array<Record<string, unknown>>, {value}) => {
				return acc.concat(value);
			}, []),
		),
		fs.readFileSync(`${__dirname}/../src/css/prose.css`, 'utf-8'),
	].join('\n'),
);

const copyFiles = ['reset', 'prose'];

for (const file of copyFiles) {
	fs.copyFileSync(
		path.join(__dirname, `../src/css/${file}.css`),
		path.join(__dirname, `../${file}.css`),
	);
}
