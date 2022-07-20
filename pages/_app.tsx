import '../styles/global.css'
import {withTRPC} from '@trpc/next'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import {MantineProvider} from '@mantine/core'
import {ModalsProvider} from '@mantine/modals'
import {NotificationsProvider} from '@mantine/notifications'
import type {AppRouter} from '@/backend/router'
import {theme} from '@/lib/mantineTheme'

function MyApp({Component, pageProps}: AppProps) {
	return (
		<>
			<Head>
				<title>Mangui</title>
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
			</Head>

			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				emotionOptions={{key: 'mantine', prepend: false}}
				theme={theme}
			>
				<ModalsProvider>
					<NotificationsProvider>

						<Component {...pageProps} />
					</NotificationsProvider>
				</ModalsProvider>
			</MantineProvider>
		</>
	)
}

function getBaseUrl() {
	if (process.browser) return '' // Browser should use current path
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

	return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
	config({ctx}) {
		/**
	 * If you want to use SSR, you need to use the server's full URL
	 * @link https://trpc.io/docs/ssr
	 */
		const url = `${getBaseUrl()}/api/trpc`

		return {
			url,
			/**
	   * @link https://react-query.tanstack.com/reference/QueryClient
	   */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		}
	},
	/**
   * @link https://trpc.io/docs/ssr
   */
	ssr: false,
})(MyApp)
