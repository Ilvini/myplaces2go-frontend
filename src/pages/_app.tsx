import { ToasterComponent } from '../components/Partials/ToasterComponent'
import { GlobalContextProvider } from '../context/GlobalContextProvider'
import '../styles/index.scss'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { useEffect } from 'react'
import { api } from '../services/axios'
import useUserStore from '../stores/useUserStore'
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
        title="Comercial dos plásticos Distribuídora"
        description="Seja para sua festa, seu negócio, ou no dia-a-dia, aqui na Comercial dos Plásticos, você encontra produtos de qualidade e com o melhor preço!"
        canonical="https://comercial-dos-plasticos-pwa.vercel.app"
        openGraph={{
          url: 'https://comercial-dos-plasticos-pwa.vercel.app',
          title: 'Comercial dos plásticos Distribuídora',
          description:
            'Seja para sua festa, seu negócio, ou no dia-a-dia, aqui na Comercial dos Plásticos, você encontra produtos de qualidade e com o melhor preço!',
          images: [
            {
              url: '/seo.png',
              width: 1200,
              height: 627,
              alt: 'Comercial dos plásticos Distribuídora',
              type: 'image/png',
            },
          ],
          siteName: 'https://comercial-dos-plasticos-pwa.vercel.app',
        }}
      />
      <Head>
        <title>Comercial dos plásticos Distribuídora</title>
      </Head>
      <Component {...pageProps} />
      <Modals />
      <ToasterComponent />
    </GlobalContextProvider>
  )
}

