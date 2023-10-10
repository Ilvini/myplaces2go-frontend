/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Ratting } from '../../components/Ratting'
import BottomNavigation from '../../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useFetch } from '../../services/useFetch'

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
        <h3 className="text-brand-gray-600 text-3xl">Meus Favoritos</h3>
        {favorites
          ? favorites.map((place) => {
              return (
                <Link key={place.uuid} href={`/dashboard/place/${place.uuid}`}>
                  <div className="flex mt-5">
                    <div className="w-1/4 aspect-square rounded-lg overflow-hidden drop-shadow-lg">
                      <img
                        src="/img/no-image.png"
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                    <div className="ml-4 w-3/4">
                      <h4 className="text-2xl text-brand-gray-600">
                        {place.nome}
                      </h4>
                      <p className="text-base text-brand-gray-600">
                        {place.endereco}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })
          : 'Nenhum favorito encontrado'}
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Favorite

