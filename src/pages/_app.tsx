import { ToasterComponent } from '../components/Partials/ToasterComponent'
import { GlobalContextProvider } from '../context/GlobalContextProvider'
import '../styles/index.scss'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { useEffect } from 'react'
import { api } from '../services/axios'
import Modals from '../components/Modals'
import { useWindowDimensions } from '../hooks/useWindowsDImension'
import { Icon } from '@iconify/react'

export default function MyApp({ Component, pageProps }: any) {
  const { currentWidth } = useWindowDimensions()
  useEffect(() => {
    if (typeof window !== undefined) {
      // @ts-ignore
      window.OneSignal = window.OneSignal || []
      // @ts-ignore
      OneSignal.push(function () {
        // @ts-ignore
        OneSignal.init({
          appId: 'c6195a77-af20-488e-9747-574f40c318cc',
          safari_web_id:
            'web.onesignal.auto.c6195a77-af20-488e-9747-574f40c318cc',
          allowLocalhostAsSecureOrigin: true,
        })
      })
    }

    return () => {
      // @ts-ignore
      window.OneSignal = undefined
    }
  }, [])
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.userway.org/widget.js'
    script.setAttribute('data-account', 'HENOC7qOsC')
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  if (currentWidth && currentWidth > 520) {
    return (
      <main className="w-full min-h-screen flex justify-center items-center ">
        <div className="flex flex-col items-center">
          <Icon
            icon="ic:baseline-warning"
            fontSize={33}
            className="text-yellow-400"
          />
          <p className="text-xl font-light">
            Por favor acesse o aplicativo no seu celular e recarregue a página
          </p>
        </div>
      </main>
    )
  }

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

