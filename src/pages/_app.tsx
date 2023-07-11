import { ToasterComponent } from '../components/Partials/ToasterComponent'
import { GlobalContextProvider } from '../context/GlobalContextProvider'
import '../styles/index.scss'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { useEffect } from 'react'
import { api } from '../services/axios'
import useUserStore from '../stores/useUserStore'

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
        title="Tver Mídia Digital"
        description="Nossas notícias estão sendo exibidas em mais de 300 monitores nos principais pontos de Belém."
        canonical="https://tver-pwa.vercel.app"
        openGraph={{
          url: 'https://tver-pwa.vercel.app',
          title: 'Tver Mídia Digital',
          description:
            'Nossas notícias estão sendo exibidas em mais de 300 monitores nos principais pontos de Belém.',
          images: [
            {
              url: 'https://tver-pwa.vercel.app/seo.png',
              width: 1200,
              height: 627,
              alt: 'Tver Mídia Digital',
              type: 'image/png',
            },
          ],
          siteName: 'https://tver-pwa.vercel.app',
        }}
      />
      <Head>
        <title>Tver Mídia Digital</title>
      </Head>
      <Component {...pageProps} />
      <ToasterComponent />
    </GlobalContextProvider>
  )
}
