import {css, token} from '../css';
import {SPRING_SCALE} from '../../../src/tokens/spring';
import {Demo} from './demo';

const scaleToColorMap = {
	none: token('red-5'),
	wobbly: token('pink-5'),
	'wobbly-2': token('purple-5'),
	stiff: token('indigo-5'),
	'stiff-2': token('blue-5'),
};

function Box(props: {
	preset: (typeof SPRING_SCALE)[number];
	children: React.ReactNode;
}) {
	return (
		<div
			{...props}
			style={css({
				display: 'grid',
				placeItems: 'center',
				width: 'calc(50% - calc(var(--length-scale-12) * 1rem))',
				aspectRatio: '1',
				backgroundColor: scaleToColorMap[props.preset],
				color: token('gold-16'),
				borderRadius: token('rounded-xl'),
				transition: `transform var(--spring${
					props.preset !== 'none' ? `-${props.preset}` : ''
				})`,
				cursor: 'default',
				backgroundClip: 'padding-box',
				'&:hover': {
					position: 'relative',
					zIndex: token('layer-1'),
					transform: 'scale(1.25)',
				},
				'&:lg': {
					width: 'calc(20% - calc(var(--length-scale-12) * 1rem))',
					'&:hover': {
						transform: 'scale(1.5) rotate(10deg)',
					},
				},
			})}
		/>
	);
}

export function Springs() {
	return (
		<Demo trueDark>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
					gap: token('length-12'),
				}}
			>
				{SPRING_SCALE.map((preset) => (
					<Box key={preset} preset={preset}>
						{preset === 'none' ? 'default' : preset}
					</Box>
				))}
			</div>
		</Demo>
	);
}
