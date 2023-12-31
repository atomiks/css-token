'use client';

import {css, global, shadow, token} from '../css';
// @ts-ignore
import Index from './index.mdx';
import {MDXProvider} from '@mdx-js/react';
import {useMDXComponents} from '../mdx-components';
import {useEffect, useState} from 'react';

const prose = global('.prose', {
	'span[data-rehype-pretty-code-figure] code': css({
		boxShadow: shadow({preset: 'sharp', color: 'gold-10'}),
		'&:dark': {
			boxShadow: 'none',
		},
	}),
	pre: css({
		boxShadow: shadow({preset: 'sharp', color: 'gold-10'}),
		'&:dark': {
			boxShadow: 'none',
		},
	}),
	':not(pre) > code': css({
		boxShadow: shadow({preset: 'sharp', color: 'gold-10'}),
		'&:dark': {
			boxShadow: 'none',
		},
	}),
});

function App() {
	const components = useMDXComponents();
	const [year, setYear] = useState<number | null>(null);

	useEffect(() => {
		setYear(new Date().getFullYear());
	}, []);

	return (
		<MDXProvider components={components}>
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
			<style dangerouslySetInnerHTML={{__html: prose}} />
			<article
				className="prose"
				style={css({
					maxWidth: '45rem',
					margin: '0 auto',
					paddingInline: token('length-4'),
					fontSize: token('font-size-md'),
					'&:md': {
						fontSize: token('font-size-7'),
						paddingInline: token('length-12'),
					},
					'&:lg': {
						padding: 0,
					},
				})}
			>
				<Index />
				<footer
					style={css({
						marginBlock: token('length-15'),
						textAlign: 'center',
						color: token('gold-8'),
						'&:dark': {
							color: token('mauve-8'),
						},
					})}
				>
					© {year && `${year} •`} MIT License
				</footer>
			</article>
		</MDXProvider>
	);
}

export default App;
