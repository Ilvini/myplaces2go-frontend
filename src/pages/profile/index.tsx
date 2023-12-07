/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import BottomNavigation from '../../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useFetch } from '../../services/useFetch'
import Cookies from 'js-cookie'
import { HeaderNavigation } from '../../components/HeaderNavigation'
import { api } from '../../services/axios'
import toast from 'react-hot-toast'
import { errorHandler } from '../../services/errorHandler'
import deleteAccountModalStore from '../../stores/modals/deleteAccountModalStore'
import changePhotoModalStore from '../../stores/modals/changePhotoModalStore'

const Profile: NextPage = () => {
  const router = useRouter()
  const [selected, setSelected] = useState(null)
  const [currentLanguage, setCurrentLanguage] = useState('' as string)
  const [selectFlag, setSelectFlag] = useState('' as string)
  const { data: me } = useFetch('/cliente/me', Cookies.get('token'))
  const { id, setId, modalState, setModalState } = deleteAccountModalStore()
  const { modalStatePhoto, setModalStatePhoto } = changePhotoModalStore()
  useEffect(() => {
    userIsLogged()
  }, [])
  console.log(me)
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

  function saveModalInfo(id: string) {
    console.log(id)
    setId(id)
  }
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
        <h3 className="text-brand-gray-600 text-xl">Meu Perfil</h3>
        <div className="flex my-4 justify-between">
          <div className="flex">
            <img
              src={me?.results.foto}
              alt=""
              className="rounded-full w-16 h-16 border object-cover"
            />
            <div className="flex items-start justify-between flex-col my-1 ml-2">
              <p className="text-xl font-normal uppercase">
                {me?.results.nome}
              </p>
              <p className="text-brand-green-300">0 Pontos </p>
            </div>
          </div>
          <div
            className="flex items-center mr-4"
            onClick={() => setModalStatePhoto(true)}
          >
            Trocar foto
          </div>
        </div>
        <table className="w-full mb-4">
          <tr className={`w-full ${'even:bg-gray-50 odd:white'}`}>
            <td className="text-brand-gray-500">Email</td>
            <td className="text-brand-gray-500 float-right">
              {me?.results.email}
            </td>
          </tr>
          <tr className={`w-full ${'even:bg-gray-50 odd:white'}`}>
            <td className="text-brand-gray-500">Celular</td>
            <td className="text-brand-gray-500 float-right">
              {me?.results.celular && mphone(me?.results.celular)}
            </td>
          </tr>
        </table>
        {/*   <div className="my-2">
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
        </div> */}

        <Link href="/profile/change-password">
          <button className="bg-brand-yellow-300  mt-3  rounded-lg p-3  w-full text-center ">
            Trocar senha
          </button>
        </Link>
        <Link href="/preferrences">
          <button className="bg-brand-yellow-300   rounded-lg p-3 mt-3 w-full text-center ">
            Mudar preferências
          </button>
        </Link>
        <Link href="/achievements">
          <button className="bg-brand-yellow-300   rounded-lg p-3 mt-3 w-full text-center ">
            Minhas Conquistas
          </button>
        </Link>
        {/*  <button className="bg-brand-yellow-300   rounded-lg p-3 mt-3 w-full text-center ">
          Alterar Idioma
        </button> */}
        <Link href="/profile/update">
          <button className="border-brand-yellow-300 border   rounded-lg p-3 mt-3 w-full text-center ">
            Atualizar Perfil
          </button>
        </Link>
        <Link href="/add-new-place">
          <button className="border-brand-yellow-300 border   rounded-lg p-3 mt-3 w-full text-center ">
            Sugerir Ponto Turístico
          </button>
        </Link>

        <Link href="/login" onClick={() => Cookies.remove('token')}>
          <button className="border-brand-yellow-300 border   rounded-lg p-3 mt-3 w-full text-center ">
            Encerrar Sessão
          </button>
        </Link>

        <button
          className="border-brand-red-500 border   rounded-lg p-3 mt-3 w-full text-center "
          onClick={() => {
            setModalState(true), saveModalInfo(id)
          }}
        >
          Excluir conta
        </button>
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Profile
