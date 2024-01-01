export const SPRING_SCALE = [
	'none',
	'wobbly',
	'wobbly-2',
	'stiff',
	'stiff-2',
] as const;
export const NONELESS_SCALE = [
	'wobbly',
	'wobbly-2',
	'stiff',
	'stiff-2',
] as const;

export type SpringScale = (typeof NONELESS_SCALE)[number];

// https://linear-easing-generator.netlify.app/
// https://github.com/jakearchibald/linear-easing-generator/blob/b263bdbfda190aa2b0c4de622c621f121e2d924c/LICENSE
function createSpring({
	mass,
	stiffness,
	damping,
	velocity,
}: {
	mass: number;
	stiffness: number;
	damping: number;
	velocity: number;
}) {
	const w0 = Math.sqrt(stiffness / mass);
	const zeta = damping / (2 * Math.sqrt(stiffness * mass));
	const wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
	const b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;

	function solver(t: number) {
		let computedT = t;
		if (zeta < 1) {
			computedT =
				Math.exp(-t * zeta * w0) *
				(1 * Math.cos(wd * t) + b * Math.sin(wd * t));
		} else {
			computedT = (1 + b * t) * Math.exp(-t * w0);
		}
		return 1 - computedT;
	}

	const duration = (() => {
		const step = 1 / 6;
		let time = 0;

		while (true) {
			if (Math.abs(1 - solver(time)) < 0.001) {
				const restStart = time;
				let restSteps = 1;
				while (true) {
					time += step;
					if (Math.abs(1 - solver(time)) >= 0.001) break;
					restSteps++;
					if (restSteps === 16) return restStart;
				}
			}
			time += step;
		}
	})();

	return [duration, (t: number) => solver(duration * t)] as const;
}

export function spring({
	mass = 1,
	stiffness = 250,
	damping = 20,
	velocity = 0,
	samples = 20,
	preset = 'none',
}: {
	mass?: number;
	stiffness?: number;
	damping?: number;
	velocity?: number;
	samples?: number;
	preset?: (typeof SPRING_SCALE)[number];
} = {}) {
	function significantPoint(value: number) {
		// Implement logic to determine if a point is significant
		// This could be based on the rate of change or other criteria
		// For simplicity, let's assume every fifth point is significant
		return Math.abs(value % 0.2) < 0.001;
	}

	const options = {mass, stiffness, damping, velocity};

	if (preset === 'stiff') {
		options.mass = 0.75;
		options.stiffness = 500;
		options.damping = 50;
	} else if (preset === 'stiff-2') {
		options.mass = 0.75;
		options.stiffness = 1000;
		options.damping = 100;
	} else if (preset === 'wobbly') {
		options.stiffness = 100;
		options.damping = 10;
		samples = 25;
	} else if (preset === 'wobbly-2') {
		options.stiffness = 120;
		options.damping = 5;
		samples = 50;
	}

	const [duration, springResolver] = createSpring(options);

	let linearEasing = `${duration}s linear(`;

	for (let i = 0; i <= samples; i++) {
		const t = i / samples;
		const value = springResolver(t);
		const formattedValue = value.toFixed(3);
		const percentage = `${(t * 100).toFixed(1)}%`;

		linearEasing += formattedValue;
		if (i < samples) {
			if (significantPoint(value)) {
				linearEasing += ` ${percentage}`;
			}
			linearEasing += ', ';
		}
	}

	return `${linearEasing})`;
}
