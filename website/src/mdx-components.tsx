import type {MDXComponents} from 'mdx/types';

function Heading({
	level,
	children,
	id,
	...rest
}: React.ComponentPropsWithoutRef<'h1'> & {
	level: 1 | 2 | 3 | 4 | 5 | 6;
	children?: React.ReactNode;
}) {
	const Tag = `h${level}` as const;
	return (
		<Tag id={id} {...rest}>
			<a href={`#${id}`}>{children}</a>
		</Tag>
	);
}

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...components,
		h2: (props) => <Heading level={2} {...props} />,
		h3: (props) => <Heading level={3} {...props} />,
		h4: (props) => <Heading level={4} {...props} />,
		h5: (props) => <Heading level={5} {...props} />,
		h6: (props) => <Heading level={6} {...props} />,
	};
}
