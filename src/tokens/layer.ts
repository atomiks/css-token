export type LayerScale = 1 | 2 | 3 | 4 | 5 | 'max';

export function layer(value: LayerScale): string {
	return typeof value === 'number' ? `${value}` : '2147483647';
}
