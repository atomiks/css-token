import type {Color} from './tokens/color';
import type {FontSizeScaleReadable, CSSFontSizeScale} from './tokens/fontSize';
import type {
	FontWeightScale,
	FontWeightScaleReadable,
} from './tokens/fontWeight';
import type {LayerScale} from './tokens/layer';
import type {LeadingScale, LeadingScaleReadable} from './tokens/leading';
import type {CSSLengthScale} from './tokens/length';
import type {RoundedScale} from './tokens/rounded';
import type {SpringScale} from './tokens/spring';
import type {TrackingScale, TrackingScaleReadable} from './tokens/tracking';

type TokensList = Array<
	| 'length'
	| 'shadow'
	| 'color'
	| 'rounded'
	| 'font'
	| 'font-size'
	| 'font-weight'
	| 'tracking'
	| 'leading'
	| 'layer'
>;

type LengthToken = `length-${CSSLengthScale}`;
type ShadowPreset = 'sharp' | 'dreamy' | 'long';
type ShadowToken = `shadow${`-${ShadowPreset}` | ''}${
	| `-${1 | 2 | 3 | 4}`
	| ''}`;
type RoundedToken = `rounded${`-${RoundedScale}` | ''}`;
type FontSizeToken =
	| `font-size-${CSSFontSizeScale}`
	| `font-size-${FontSizeScaleReadable}`;
type FontWeightToken = `font-weight-${
	| FontWeightScale
	| FontWeightScaleReadable}`;
type TrackingToken = `tracking-${TrackingScale | TrackingScaleReadable}`;
type LeadingToken = `leading-${LeadingScale | LeadingScaleReadable}`;
type FontFamilyToken = 'font-sans' | 'font-serif' | 'font-mono';
type LayerToken = `layer-${LayerScale}`;
type SpringToken = `spring${`-${SpringScale}` | ''}`;

interface TokenMap {
	length: LengthToken;
	shadow: ShadowToken;
	color: Color;
	rounded: RoundedToken;
	font: FontFamilyToken;
	'font-size': FontSizeToken;
	'font-weight': FontWeightToken;
	tracking: TrackingToken;
	leading: LeadingToken;
	layer: LayerToken;
	spring: SpringToken;
}

type Token<T extends TokensList> = T[number] extends infer U
	? U extends keyof TokenMap
		? TokenMap[U]
		: never
	: never;

/**
 * Creates a typed token function that returns a CSS variable string.
 */
export function createToken<T extends TokensList = TokensList>(
	tokensList?: T,
): (name: Token<T>) => string {
	return function token(name: Token<T>): string {
		return `var(--${name})`;
	};
}
