import {Tuple, DefaultMantineColor, DEFAULT_THEME, MantineThemeOverride} from '@mantine/core'

type ExtendedCustomColors = 'error' | 'success' | DefaultMantineColor

declare module '@mantine/core' {
	export interface MantineThemeColorsOverride {
		colors: Record<ExtendedCustomColors, Tuple<string, 10>>
	}
}

export const theme: MantineThemeOverride = {
	colors: {
		error: DEFAULT_THEME.colors.red,
		success: DEFAULT_THEME.colors.teal,
	},
}
