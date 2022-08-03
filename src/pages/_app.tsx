import { SessionProvider, useSession } from 'next-auth/react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider, showNotification } from '@mantine/notifications'
import { useState, useEffect } from 'react'
import { MainLayout } from '~/layouts'
import { baseTheme } from '~/style'
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CenterLoader, isDevEnv } from '~/components'
import { modalDefinitions } from '~/components/GlobalModals'
import notify from '~/data/notifications'
import type { ComponentWithAuth } from 'types/customComponents'
import type { NextPageContext, NextComponentType } from 'next'

export type NextComponentWithAuth = NextComponentType<
	NextPageContext,
	any,
	{}
> &
	ComponentWithAuth
type AppPropsWithAuth = AppProps & { Component: NextComponentWithAuth }

const Auth: ComponentWithAuth = ({ children, auth }) => {
	const { role = 'USER', loader = <CenterLoader /> } = auth
	const { data: session, status } = useSession()
	const isLoading = status === 'loading'
	const hasUser = !!session?.user
	const hasRole = session?.user?.role === role
	const router = useRouter()
	const signinUrl = '/api/auth/signin?error=SessionRequired'
	const accessdeniedUrl = '/api/auth/error?error=AccessDenied'

	useEffect(() => {
		if (!isLoading && !hasUser)
			isDevEnv()
				? showNotification(notify('devSignIn'))
				: router.push(signinUrl)
		if (!isLoading && !hasRole && hasUser)
			isDevEnv()
				? showNotification(notify('devAccessDenied'))
				: router.push(accessdeniedUrl)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, hasUser, hasRole])

	if (isLoading || !hasUser) return loader

	return children
}

const App = (props: AppPropsWithAuth) => {
	const { Component, pageProps } = props
	const preferredColorScheme = useColorScheme()
	const [colorScheme, setColorScheme] =
		useState<ColorScheme>(preferredColorScheme)
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
			})
	)
	return (
		<SessionProvider session={pageProps.session}>
			<Head>
				<title>thinkBig</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<ColorSchemeProvider
						colorScheme={colorScheme}
						toggleColorScheme={toggleColorScheme}
					>
						<MantineProvider
							withCSSVariables
							withGlobalStyles
							withNormalizeCSS
							theme={baseTheme}
						>
							<NotificationsProvider position='top-center'>
								<ModalsProvider modals={modalDefinitions}>
									<MainLayout>
										{Component.auth?.required ? (
											<Auth auth={Component.auth}>
												<Component {...pageProps} />
											</Auth>
										) : (
											<Component {...pageProps} />
										)}
										<ReactQueryDevtools initialIsOpen={false} />
									</MainLayout>
								</ModalsProvider>
							</NotificationsProvider>
						</MantineProvider>
					</ColorSchemeProvider>
				</Hydrate>
			</QueryClientProvider>
		</SessionProvider>
	)
}

export default App
