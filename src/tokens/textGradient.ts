interface TextGradientOptions {
	stops: Array<string>;
	direction?: number;
	colorSpace?: string;
}

export function textGradient(options: TextGradientOptions) {
	const {stops, direction = '90deg', colorSpace = 'oklch'} = options;
	return {
		color: 'transparent',
		backgroundImage: `linear-gradient(in ${colorSpace} ${direction},${stops.join(
			',',
		)})`,
		backgroundClip: 'text',
	};
}
