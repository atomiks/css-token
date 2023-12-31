import {ROUNDED_SCALE} from '../../../src/tokens/rounded';
import {Demo} from './demo';
import {token} from '../css';

const scale = Object.entries(ROUNDED_SCALE) as [
	keyof typeof ROUNDED_SCALE,
	string,
][];

export function Rounded() {
	return (
		<Demo trueDark>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
					gap: token('length-8'),
				}}
			>
				{scale.map(([key, value]) => (
					<div
						key={key}
						style={{
							display: 'grid',
							placeItems: 'center',
							borderRadius: value,
							width: token('length-20'),
							height: token('length-20'),
							backgroundColor: token('slate-5'),
							color: token('slate-14'),
							fontWeight: token('font-weight-bold'),
						}}
					>
						{key}
					</div>
				))}
			</div>
		</Demo>
	);
}
