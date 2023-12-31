function toHex(c: number) {
	const hex = c.toString(16);
	return hex.length === 1 ? `0${hex}` : hex;
}

export function rgbToHex([r, g, b]: readonly [number, number, number]) {
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
