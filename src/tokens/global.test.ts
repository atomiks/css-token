import {global} from './global';
import {expect, test} from 'bun:test';

test('single simple selector', () => {
	expect(
		global(':root', {
			body: {
				margin: 0,
			},
		}),
	).toBe(':root body{margin:0}');
});

test('multiple selectors and camelCase properties', () => {
	expect(
		global(':root', {
			body: {
				margin: 0,
				paddingTop: 0,
			},
			'body,html': {
				height: '100%',
			},
		}),
	).toBe(':root body{margin:0;padding-top:0}:root body,html{height:100%}');
});
