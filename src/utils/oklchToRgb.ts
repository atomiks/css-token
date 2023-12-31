export function oklch2rgb(lch: [number, number, number]) {
	const lab = lch2lab(lch);
	const rgb = oklab2rgb(lab).map((x) => lrgb2rgb(x));
	return rgb.map((x) => clamp(x * 255, 0, 255)) as [number, number, number];
}

function lch2lab([l, c, h]: readonly [number, number, number]) {
	h = (h * Math.PI) / 180;
	return [l, Math.cos(h) * c, Math.sin(h) * c] as const;
}

function oklab2rgb([L, a, b]: readonly [number, number, number]) {
	const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
	const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
	const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
	return [
		+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
	] as const;
}

function lrgb2rgb(c: number) {
	const absC = Math.abs(c);
	if (absC > 0.0031308) {
		return Math.sign(c) * (1.055 * absC ** (1 / 2.4) - 0.055);
	}
	return 12.92 * c;
}

function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(max, value));
}
