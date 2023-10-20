/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'

import BottomNavigation from '../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect } from 'react'

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
        <h2 className="text-xl text-brand-gray-900">
          Informações da sua cidade
        </h2>
        <table className="w-full">
          <tr className={`w-full ${'even:bg-gray-50 odd:white'}`}>
            <td className="text-brand-gray-500">População</td>
            <td className="text-brand-gray-500 float-right">22.000.000</td>
          </tr>
          <tr className={`w-full ${'even:bg-gray-50 odd:white'}`}>
            <td className="text-brand-gray-500">Receita Anual</td>
            <td className="text-brand-gray-500 float-right">3 trilhões</td>
          </tr>
          <tr className={`w-full ${'even:bg-gray-50 odd:white'}`}>
            <td className="text-brand-gray-500">Pontos turísticos</td>
            <td className="text-brand-gray-500 float-right">5 mil</td>
          </tr>
        </table>
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Favorite

