import {css, fontSize, shadow, token} from '../css';

const figureStyles = css({
	boxShadow: shadow({preset: 'sharp', color: 'gold-10'}),
	borderRadius: token('rounded-xl'),
	marginBlock: token('length-12'),
	overflow: 'clip',
});

const figcaptionStyles = css({
	position: 'sticky',
	left: 0,
	color: token('purple-1'),
	background: token('amethyst-10'),
	paddingInline: token('length-5'),
	paddingBlock: token('length-3'),
	margin: 0,
	fontSize: fontSize('4xs', 'em'),
	fontWeight: token('font-weight-bold'),
	textTransform: 'uppercase',
	'&:dark': {
		background: token('mauve-12'),
		color: token('purple-3'),
	},
});

export function Demo({
	children,
	style,
	trueDark = false,
}: {
	children: React.ReactNode;
	style?: React.CSSProperties;
	trueDark?: boolean;
}) {
	return (
		<figure
			style={css({
				...figureStyles,
				...style,
				backgroundColor: 'white',
				'&:dark': {
					backgroundColor: trueDark ? token('mauve-14') : 'white',
					color: token(trueDark ? 'mauve-1' : 'mauve-14'),
					boxShadow: 'none',
				},
			})}
		>
			<figcaption style={figcaptionStyles}>Demo</figcaption>
			<div
				style={css({
					paddingBlock: token('length-12'),
					paddingInline: token('length-8'),
					'&:md': {
						paddingBlock: token('length-14'),
						paddingInline: token('length-10'),
					},
				})}
			>
				{children}
			</div>
		</figure>
	);
}
