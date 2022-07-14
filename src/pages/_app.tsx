import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { useState } from 'react'
import { MainLayout } from '~/layouts'
import { baseTheme } from '~/style'

const App = (props: AppProps) => {
	const { Component, pageProps } = props
	const preferredColorScheme = useColorScheme()
	const [colorScheme, setColorScheme] =
		useState<ColorScheme>(preferredColorScheme)
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

	return (
		<SessionProvider session={pageProps.session}>
			<Head>
				<title>Page title</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>
			{/* <ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}
			> */}
			<MantineProvider withGlobalStyles withNormalizeCSS theme={baseTheme}>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</MantineProvider>
			{/* </ColorSchemeProvider> */}
		</SessionProvider>
	)
}

export default App
