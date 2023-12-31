export function toKebabCase(key: string): string {
	return key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}
