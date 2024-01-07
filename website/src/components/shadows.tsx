import {css, length, shadow, token} from '../css';
import {Demo} from './demo';

export const shadowPresets = ['none', 'dreamy', 'sharp', 'long'] as const;
export const shadowElevations = [1, 2, 3, 4] as const;
const shadowHues = ['red', 'yellow', 'lime', 'blue', 'purple'] as const;

export function ShadowType() {
	return (
		<Demo>
			<div
				style={css({
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-evenly',
					gap: length(10, 'em'),
				})}
			>
				{shadowPresets.map((preset) => {
					return (
						<div
							key={preset}
							style={css({
								display: 'grid',
								placeItems: 'center',
								color: token('gray-9'),
								boxShadow:
									preset === 'none'
										? token('shadow')
										: token(`shadow-${preset}`),
								background: 'white',
								width: token('length-18'),
								height: token('length-18'),
								borderRadius: token('rounded-lg'),
							})}
						>
							{preset}
						</div>
					);
				})}
			</div>
		</Demo>
	);
}

export function ShadowElevation() {
	return (
		<Demo>
			<div
				style={css({
					display: 'grid',
					gridTemplateColumns: 'repeat(4, 1fr)',
					placeItems: 'center',
					rowGap: token('length-16'),
				})}
			>
				{shadowElevations.map((elevation) => {
					return shadowPresets.map((preset) => {
						return (
							<div
								key={elevation}
								style={css({
									display: 'grid',
									placeItems: 'center',
									color: 'var(--gray-8)',
									boxShadow: token(
										elevation === 1
											? preset === 'none'
												? 'shadow'
												: `shadow-${preset}`
											: preset === 'none'
											  ? `shadow-${elevation}`
											  : `shadow-${preset}-${elevation}`,
									),
									background: 'white',
									width: token('length-18'),
									height: token('length-18'),
									borderRadius: token('rounded-lg'),
								})}
							>
								{preset}-{elevation}
							</div>
						);
					});
				})}
			</div>
		</Demo>
	);
}

export function ShadowColor() {
	return (
		<Demo>
			<div
				style={css({
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
					gap: token('length-12'),
					marginBottom: token('length-6'),
				})}
			>
				{shadowHues.map((hue) => {
					return (
						<div
							key={hue}
							style={css({
								display: 'grid',
								placeItems: 'center',
								color: token(`${hue}-10`),
								background: token(`${hue}-1`),
								boxShadow: shadow({
									color: `${hue}-10`,
									preset: 'long',
									intensity: 1.5,
								}),
								width: token('length-18'),
								height: token('length-18'),
								borderRadius: token('rounded-lg'),
							})}
						>
							{hue}
						</div>
					);
				})}
			</div>
		</Demo>
	);
}
