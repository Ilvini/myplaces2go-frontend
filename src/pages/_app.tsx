import { ToasterComponent } from '../components/Partials/ToasterComponent'
import { GlobalContextProvider } from '../context/GlobalContextProvider'
import '../styles/index.scss'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { useEffect } from 'react'
import { api } from '../services/axios'
import Modals from '../components/Modals'

export default function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    if (typeof window !== undefined) {
      // @ts-ignore
      window.OneSignal = window.OneSignal || []
      // @ts-ignore
      OneSignal.push(function () {
        // @ts-ignore
        OneSignal.init({
          appId: 'de5d43eb-29a9-46b4-951a-222e3fe700a5',
          safari_web_id:
            'web.onesignal.auto.6401d2fc-b951-4213-a02c-03159c046b78',
          allowLocalhostAsSecureOrigin: true,
        })
      })
    }

    return () => {
      // @ts-ignore
      window.OneSignal = undefined
    }
  }, [])

  return (
    <GlobalContextProvider>
      <DefaultSeo
        title="My Place 2 GO - Seu App de Turismo"
        description="Viage pelo mundo com o My Place 2 GO, seu app de turismo."
        canonical="https://myplaces2go-frontend.vercel.app/"
        openGraph={{
          url: 'https://myplaces2go-frontend.vercel.app/',
          title: 'MY Place 2 GO - Seu App de Turismo',
          description:
            'Viage pelo mundo com o My Place 2 GO, seu app de turismo.',
          images: [
            {
              url: '/seo.png',
              width: 1200,
              height: 627,
              alt: 'MY Place 2 GO - Seu App de Turismo',
              type: 'image/png',
            },
          ],
          siteName: 'https://myplaces2go-frontend.vercel.app/',
        }}
      />
      <Head>
        <title>My Place 2 GO - Seu app de Turismo</title>
      </Head>
      <Component {...pageProps} />
      <Modals />
      <ToasterComponent />
    </GlobalContextProvider>
  )
}

