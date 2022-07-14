import type { MantineThemeOverride } from '@mantine/core'

export const baseTheme: MantineThemeOverride = {
	colorScheme: 'light',
	colors: {
		primary: [
			'#f2f2f2',
			'#d9d9d9',
			'#bfbfbf',
			'#a6a6a6',
			'#8c8c8c',
			'#737373',
			'#595959',
			'#404040',
			'#262626',
			'#0d0d0d', // index 9 - base
		],
		highlightPrimary: [
			'#fff9da',
			'#ffedad',
			'#ffe17d',
			'#ffd54b',
			'#ffc91a', // index 4 - base
			'#e6b000',
			'#b38900',
			'#806200',
			'#4e3b00',
			'#1d1400',
		],
		highlightSecondary: [
			'#ffe1ec',
			'#ffb1c7',
			'#ff7ea2',
			'#ff4c7d',
			'#ff1a58', // index 4 - base
			'#e6003e',
			'#b40030',
			'#820021',
			'#500014',
			'#210007',
		],
		lowlight: [
			'#eeeeff',
			'#cfcee7',
			'#afaed2',
			'#8e8dbe', // index 3 - base
			'#6e6dab',
			'#555391',
			'#424172',
			'#2f2e52',
			'#1b1c34',
			'#080817',
		],
	},
	primaryColor: 'primary',
	primaryShade: 9,
	fontFamily: 'Roboto, sans-serif',
	headings: {
		fontWeight: '700',
	},
}
