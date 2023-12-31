import {toKebabCase} from '../utils/toKebabCase';

type Styles = Record<string, CSSStyleDeclaration> | Record<string, unknown>;
type SelectorProperties = Record<string, Record<string, string | number>>;

export function global(container: string, styles: Styles): string {
	function processStyles(
		baseSelector: string,
		styles: Styles,
		parentSelector = '',
	): string {
		let css = '';
		const combinedSelector = `${parentSelector.trim()} ${baseSelector}`;
		const propertiesBySelector: SelectorProperties = Object.create(null);

		for (const [selector, value] of Object.entries(styles)) {
			if (typeof value === 'object' && value !== null) {
				// Nested style, recurse
				css += processStyles(selector, value as Styles, combinedSelector);
			} else {
				// Accumulate properties for the same selector
				if (!propertiesBySelector[combinedSelector]) {
					propertiesBySelector[combinedSelector] = Object.create(null);
				}
				// Ensure the value is treated as a CSS property value
				propertiesBySelector[combinedSelector][selector] = value as
					| string
					| number;
			}
		}

		// Generate CSS strings for each selector
		for (const [selector, properties] of Object.entries(propertiesBySelector)) {
			css += `${selector}{${Object.entries(properties)
				.map(([key, value]) => `${toKebabCase(key)}:${value}`)
				.join(';')}}`;
		}

		return css;
	}

	return processStyles(container, styles);
}
