/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'

import BottomNavigation from '../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useFetch } from '../services/useFetch'
import Cookies from 'js-cookie'
import { HeaderNavigation } from '../components/HeaderNavigation'

const Favorite: NextPage = () => {
  const [favorites, setFavorites] = React.useState<any[]>([])

  const { data: infoCity } = useFetch(
    '/guias?estado=PA&cidade=belém',
    Cookies.get('token')
  )
  console.log(infoCity)
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
      <HeaderNavigation backRoute="/" />
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

