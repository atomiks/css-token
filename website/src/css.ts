import {createHooks} from '@css-hooks/react';

export const [hooks, css] = createHooks({
	'&:hover': '&:hover',
	'&:dark': '@media (prefers-color-scheme: dark)',
	'&:sm': '@media (min-width: 540px)',
	'&:md': '@media (min-width: 768px)',
	'&:lg': '@media (min-width: 992px)',
	'&:p3': '@media (color-gamut: p3)',
});

export {spring} from '../../src/tokens/spring';
export {color} from '../../src/tokens/color';
export {shadow} from '../../src/tokens/shadow';
export {rounded} from '../../src/tokens/rounded';
export {length} from '../../src/tokens/length';
export {fontSize} from '../../src/tokens/fontSize';
export {fontWeight} from '../../src/tokens/fontWeight';
export {fontFamily} from '../../src/tokens/fontFamily';
export {tracking} from '../../src/tokens/tracking';
export {leading} from '../../src/tokens/leading';
export {textGradient} from '../../src/tokens/textGradient';
export {global} from '../../src/tokens/global';
import {createToken} from '../../src/createToken';
export {createToken};

export const token = createToken();

export type BaseScale =
	| 1
	| 2
	| 3
	| 4
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
	| 16;
