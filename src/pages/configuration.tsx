/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import BottomNavigation from '../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useFetch } from '../services/useFetch'
import Cookies from 'js-cookie'
import { HeaderNavigation } from '../components/HeaderNavigation'
import { api } from '../services/axios'
import toast from 'react-hot-toast'
import { errorHandler } from '../services/errorHandler'
import deleteAccountModalStore from '../stores/modals/deleteAccountModalStore'

const Configuration: NextPage = () => {
  const router = useRouter()
  const [selected, setSelected] = useState(null)
  const [currentLanguage, setCurrentLanguage] = useState('' as string)
  const [selectFlag, setSelectFlag] = useState('' as string)
  const { data: me } = useFetch('/cliente/me', Cookies.get('token'))

  useEffect(() => {
    userIsLogged()
  }, [])

  function userIsLogged() {
    const token = Cookies.get('token')
    if (!token) return router.push('/login')
  }

  function mphone(v: string) {
    v = v.replace(/\D/g, '')
    v = v.substring(0, 11)
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2')
    v = v.replace(/(\d)(\d{4})$/, '$1-$2')
    return v
  }

  const languages = [
    { label: 'English', value: '/auto/en' },
    { label: `Português`, value: '/auto/pt' },
  ]

  const langChange = (e, m, evt) => {
    evt.preventDefault()
    setCurrentLanguage(e)
    console.log(decodeURI(e))
    if (Cookies.get('googtrans')) {
      Cookies.set('googtrans', decodeURI(e))
      setSelected(e)
    } else {
      Cookies.set('googtrans', e)
      setSelected(e)
    }
    window.location.reload()
  }

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'pt',
        autoDisplay: false,
        includedLanguages: 'en,pt',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      'google_translate_element'
    )
  }

  /*   const handleDeleteAccount = async () => {
    try {
      const response = await api.delete('/cliente', {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })

      Cookies.remove('token')
      toast.success(response.data.message)
      router.push('/login')
    } catch (error) {
      errorHandler(error)
      console.log(error)
    }
  }
 */

  useEffect(() => {
    if (typeof window !== 'undefined') {
      var addScript = document.createElement('script')
      addScript.setAttribute(
        'src',
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      )
      document.body.appendChild(addScript)
      window.googleTranslateElementInit = googleTranslateElementInit
    }
  }, [])
  useEffect(() => {
    if (Cookies.get('googtrans') === '/auto/pt') {
      setSelectFlag('brasil')
    } else {
      setSelectFlag('eua')
    }
  }, [])

  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/" />
      <section className="mx-4 my-4">
        <h3 className="text-brand-gray-600 text-xl">Configurações</h3>

        <div className="my-2">
          <p className="text-brand-gray-900 text-2xl my-2">Idioma</p>
          <div className="flex my-4">
            <img
              src="/img/bandeira-brasil.png"
              alt=""
              className={`w-14 ${
                selectFlag === 'brasil' && 'bg-black p-1 rounded-full'
              }`}
              onClick={(e) => langChange('/auto/pt', '/auto/pt', e)}
            />
            <img
              src="/img/bandeira-eua.png"
              alt=""
              className={`w-14 ml-3 ${
                selectFlag === 'eua' && 'bg-black p-1 rounded-full'
              }`}
              onClick={(e) => langChange('/auto/en', '/auto/en', e)}
            />
          </div>
          <div id="google_translate_element"></div>
        </div>
        {/* <Link href="/guide">
          <button className="bg-brand-yellow-300   rounded-lg p-3  w-full text-center ">
            Encontrar Guia Turístico
          </button>
        </Link> */}

        {/*  <button className="bg-brand-yellow-300   rounded-lg p-3 mt-3 w-full text-center ">
          Alterar Idioma
        </button> */}
        <Link href="/politica-de-privacidade">
          <button className="bg-brand-yellow-300 rounded-lg p-3 mt-3 w-full text-center flex justify-center items-center">
            <Icon
              icon="material-symbols:privacy-tip-outline"
              color="black"
              className="inline mr-2"
              fontSize={20}
            />
            Politica de Privacidade
          </button>
        </Link>
        <Link href="/termos-de-uso">
          <button className="bg-brand-yellow-300 rounded-lg p-3 mt-3 w-full text-center flex justify-center items-center">
            <Icon
              icon="mingcute:paper-line"
              color="black"
              className="inline mr-2"
              fontSize={20}
            />
            Termos de uso
          </button>
        </Link>
        <Link href="/sugestion">
          <button className="bg-brand-yellow-300 rounded-lg p-3 mt-3 w-full text-center flex justify-center items-center">
            <Icon
              icon="ri:question-answer-line"
              color="black"
              className="inline mr-2"
              fontSize={20}
            />
            Envie sua dúvida
          </button>
        </Link>
        <Link href="/rate-app">
          <button className="bg-brand-yellow-300 rounded-lg p-3 mt-3 w-full text-center flex justify-center items-center">
            <Icon
              icon="tabler:star"
              color="black"
              className="inline mr-2"
              fontSize={20}
            />
            Avaliar Aplicativo
          </button>
        </Link>

        {/*  <button
          className="border-brand-red-500 border   rounded-lg p-3 mt-3 w-full text-center "
          onClick={() => {
            setModalState(true), saveModalInfo(id)
          }}
        >
          Excluir conta
        </button> */}
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Configuration

