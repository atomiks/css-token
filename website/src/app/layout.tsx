import './globals.css';

import type {Metadata} from 'next';
import {color, css, hooks, token} from '../css';
import {Inter} from 'next/font/google';

export const metadata: Metadata = {
	title: 'CSS Token',
	description: 'Design tokens and utilities for CSS & JS',
};

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	weight: 'variable',
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
				<style dangerouslySetInnerHTML={{__html: hooks}} />
			</head>
			<body
				className={inter.className}
				style={css({
					backgroundColor: color('gold-1', {vibrance: 0.1}),
					color: token('gold-14'),
					textWrap: 'pretty',
					'&:dark': {
						backgroundColor: color('mauve-15', {alpha: 0.96}),
						color: token('mauve-4'),
					},
				})}
			>
				{children}
			</body>
		</html>
	);
}
