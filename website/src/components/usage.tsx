import {token} from '../css';

export function Usage() {
	return (
		<div
			style={{
				display: 'inline-block',
				backgroundColor: token('blue-4'),
				color: token('blue-14'),
				borderRadius: token('rounded-md'),
				padding: token('length-10'),
			}}
		>
			Hello World
		</div>
	);
}
