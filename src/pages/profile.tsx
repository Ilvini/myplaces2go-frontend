/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import BottomNavigation from '../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useFetch } from '../services/useFetch'

const Favorite: NextPage = () => {
  const [favorites, setFavorites] = React.useState<any[]>([])

  useEffect(() => {
    if (!window?.localStorage.getItem('@myplace2go/favorites')) {
      window?.localStorage.setItem('@myplace2go/favorites', JSON.stringify([]))
    } else {
      setFavorites(
        JSON.parse(
          window?.localStorage.getItem('@myplace2go/favorites') || '[]'
        )
      )
    }
  }, [])

  return (
    <main className="relative pb-20">
      <header className="py-4  shadow-md">
        <nav className="flex justify-center w-full items-center">
          <Link href={'/'}>
            <button className="w-1/3 mr-14">
              <Icon
                icon="icon-park-outline:back-one"
                color="#528fa7"
                fontSize={32}
              />
            </button>
          </Link>
          <div className="w-1/3">
            <img src="/img/logo.png" alt="logo my place 2 go" />
          </div>
          <div className="w-1/3"></div>
        </nav>
      </header>
      <section className="mx-4 my-4">
        <h3 className="text-brand-gray-600 text-xl">Meu Perfil</h3>
        <div className="flex my-4">
          <img
            src="/img/no-image.png"
            alt=""
            className="rounded-full w-16 h-16"
          />
          <div className="flex items-start justify-between flex-col my-1 ml-2">
            <p className="text-xl font-normal">Arthur Nogueira</p>
            <p className="text-brand-green-300">0 Pontos </p>
          </div>
        </div>
        <table className="w-full">
          <tr className={`w-full ${'even:bg-gray-50 odd:white'}`}>
            <td className="text-brand-gray-500">Email</td>
            <td className="text-brand-gray-500 float-right">
              felipesanto@gmail.com
            </td>
          </tr>
          <tr className={`w-full ${'even:bg-gray-50 odd:white'}`}>
            <td className="text-brand-gray-500">Telefone</td>
            <td className="text-brand-gray-500 float-right">
              (21) 9 8957-8268
            </td>
          </tr>
        </table>
        <button className="bg-brand-yellow-300   rounded-lg p-3 mt-3 w-full text-center ">
          Encontrar Guia Turístico
        </button>
        <button className="bg-brand-yellow-300   rounded-lg p-3 mt-3 w-full text-center ">
          Mudar preferências
        </button>
        <button className="bg-brand-yellow-300   rounded-lg p-3 mt-3 w-full text-center ">
          Alterar Idioma
        </button>
        <button className="bg-brand-yellow-300   rounded-lg p-3 mt-3 w-full text-center ">
          Sugerir Ponto Turístico
        </button>
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Favorite

