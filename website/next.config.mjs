import nextMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import {moonlight} from './src/assets/dark-theme.mjs';
import {sunlight} from './src/assets/light-theme.mjs';
import remarkSmartypants from 'remark-smartypants';

/** @type {NextConfigPlugins} */
const plugins = [];

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: 'export',
};

plugins.push(
	nextMDX({
		extension: /\.mdx?$/,
		options: {
			providerImportSource: '@mdx-js/react',
			remarkPlugins: [remarkSmartypants],
			rehypePlugins: [
				[
					rehypePrettyCode,
					{
						theme: {
							dark: 'github-dark-dimmed',
							light: sunlight,
						},
					},
				],
				rehypeSlug,
			],
		},
	}),
);

export default () => plugins.reduce((_, plugin) => plugin(_), nextConfig);
