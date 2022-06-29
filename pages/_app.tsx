import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  const description =
    'Become a chubby butterfly!'
  const title = 'Chubby Butterfly'
  const imageMetaURL = 'https://cdn-icons-png.flaticon.com/512/235/235423.png'

  return (
      <><Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='icon' href={'https://freepngimg.com/download/christmas/122408-house-christmas-png-download-free.png'} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={imageMetaURL} />
      <meta name='twitter:image' content={imageMetaURL} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='theme-color' content='#000000' />

      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-touch-icon.png?v=2' />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-32x32.png?v=2' />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon-16x16.png?v=2' />
      <link rel='manifest' href='/site.webmanifest?v=2' />
      <link rel='shortcut icon' href='/favicon.ico?v=2' />
      <meta
        name='apple-mobile-web-app-title'
        content='Round - Video Calls Powered By T3 Tools' />
      <meta
        name='application-name'
        content='Round - Video Calls Powered By T3 Tools' />
    </Head><Component {...pageProps} /></>
  )
}

import { withTRPC } from '@trpc/next'
import type { AppRouter } from '@/backend/router'
import Home from './s'

function getBaseUrl() {
  if (process.browser) return '' // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
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
