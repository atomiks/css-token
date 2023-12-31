import {css, length, token} from '../css';
import type {LengthScale} from '../../../src/tokens/length';
import {Demo} from './demo';
import {Fragment} from 'react';

function Node({index}: {index: LengthScale}) {
	return (
		<div
			style={css({
				width: length(index),
				height: token('length-2'),
				backgroundColor: token('purple-10'),
				marginBottom: token('length-7'),
				fontSize: token('length-6'),
				'&:dark': {
					backgroundColor: token('purple-5'),
				},
			})}
		>
			<span style={{position: 'relative', top: token('length-1')}}>
				{index}
			</span>
		</div>
	);
}

export function Length() {
	return (
		<Demo style={{overflowX: 'auto'}} trueDark>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: token('length-2'),
				}}
			>
				{[...Array(32)].map((_, i) => (
					<Fragment key={i + 1}>
						{i < 5 && <Node index={(i + 0.5) as LengthScale} />}
						<Node index={(i + 1) as LengthScale} />
					</Fragment>
				))}
			</div>
		</Demo>
	);
}
