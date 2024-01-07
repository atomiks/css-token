import {textGradient, token} from '../css';
import {Demo} from './demo';

const gradient = textGradient({
	stops: [token('red-5'), token('blue-8')],
});

export function TextGradient() {
	return (
		<Demo trueDark>
			<div style={{display: 'flex', justifyContent: 'center'}}>
				<div
					style={{
						display: 'inline-block',
						textAlign: 'center',
						fontSize: token('font-size-2xl'),
						fontWeight: token('font-weight-bold'),
						...gradient,
					}}
				>
					Hello World
				</div>
			</div>
		</Demo>
	);
}
