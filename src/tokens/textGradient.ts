interface TextGradientOptions {
	stops: Array<string>;
	direction?: number;
	colorSpace?: string | null;
}

export function textGradient(options: TextGradientOptions) {
	const {stops, direction = '90deg', colorSpace = null} = options;
	return {
		color: 'transparent',
		backgroundImage: colorSpace
			? `linear-gradient(in ${colorSpace} ${direction},${stops.join(',')})`
			: `linear-gradient(${direction},${stops.join(',')})`,
		backgroundClip: 'text',
	};
}
