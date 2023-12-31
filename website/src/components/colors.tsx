import {css, length, token} from '../css';
import {
	type Color,
	type Hue,
	metalHueAngles,
	grayHueAngles,
	colorHueAngles,
} from '../../../src/tokens/color';
import {Demo} from './demo';
import {fontSize} from 'css-token';

const colorHues = Object.keys(colorHueAngles) as Hue[];
const metalHues = Object.keys(metalHueAngles) as Hue[];
const grayHues = Object.keys(grayHueAngles) as Hue[];

function HueSet({hue}: {hue: Hue}) {
	return (
		<div
			style={css({
				display: 'grid',
				gridTemplateColumns: '1fr repeat(16, min(3rem, 5%))',
				placeItems: 'center',
				'&:sm': {
					gridTemplateColumns: '1fr repeat(17, min(3rem, 5%))',
				},
			})}
		>
			<span
				style={css({
					fontSize: fontSize('xs'),
					fontWeight: token('font-weight-semibold'),
					placeSelf: 'center end',
					marginRight: token('length-5'),
					color: token(`${hue}-8`),
					'&:dark': {
						color: token(`${hue}-6`),
					},
				})}
			>
				{hue}
			</span>
			{[...Array(16)].map((_, i) => (
				<div
					key={i + 1}
					style={css({
						position: 'relative',
						display: 'grid',
						placeItems: 'center',
						width: '100%',
						aspectRatio: '1',
						color: i >= 6 ? token('gray-1') : token('gray-16'),
						background: token(`${hue}-${i + 1}` as Color),
						fontSize: token('font-size-xs'),
						transition: 'transform var(--spring-stiff-2)',
						cursor: 'default',
						marginBottom: token('length-1'),
						'&:p3': {
							background: token(`p3_${hue}-${i + 1}` as Color),
							// Make dynamic:
							// background: color(`${hue}-${i + 1}` as Color, {p3: true}),
						},
						'&:hover': {
							zIndex: token('layer-1'),
							transform: 'scale(2)',
						},
					})}
				>
					{i + 1}
				</div>
			))}
		</div>
	);
}

function HueSetTitle({children}: {children: React.ReactNode}) {
	return (
		<h3
			style={css({
				textAlign: 'center',
				fontSize: token('font-size-sm'),
				letterSpacing: token('tracking-loose'),
				fontWeight: token('font-weight-light'),
				textTransform: 'uppercase',
				color: token('gold-12'),
				'&:dark': {
					color: token('mauve-6'),
				},
			})}
		>
			{children}
		</h3>
	);
}

export function Colors() {
	return (
		<Demo trueDark>
			<div
				style={css({
					textAlign: 'center',
					color: token('mauve-12'),
					marginInline: token('length-8'),
					marginBottom: token('length-10'),
					fontSize: token('font-size-xs'),
					'&:dark': {
						color: token('mauve-6'),
					},
				})}
			>
				<span
					style={css({
						'&:p3': {display: 'none'},
						fontSize: token('font-size-lg'),
					})}
				>
					You are viewing this on a <strong>non-HD color</strong> display (sRGB)
				</span>
				<span
					style={css({
						display: 'none',
						fontSize: token('font-size-lg'),
						'&:p3': {display: 'block'},
					})}
				>
					You are viewing this on a <strong>HD color</strong> display (p3)
				</span>
			</div>
			<HueSetTitle>Grays</HueSetTitle>
			{grayHues.map((hue) => (
				<HueSet key={hue} hue={hue} />
			))}
			<HueSetTitle>Metals</HueSetTitle>
			{metalHues.map((hue) => (
				<HueSet key={hue} hue={hue} />
			))}
			<HueSetTitle>Colors</HueSetTitle>
			{colorHues.map((hue) => (
				<HueSet key={hue} hue={hue} />
			))}
		</Demo>
	);
}
