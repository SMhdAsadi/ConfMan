const commonTheme = {
	margins: {
		sm: 2,
		md: 4,
		lg: 8,
		xl: 12,
	},
} as const;

export const lightTheme = {
	colors: {
		absoluteForeground: "#000000",
		absoluteBackground: "#ffffff",
	},
	...commonTheme,
} as const;

export const darkTheme = {
	colors: {
		absoluteForeground: "#ffffff",
		absoluteBackground: "#000000",
	},
	...commonTheme,
} as const;

// define other themes
