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
import Cookies from 'js-cookie'
import { HeaderNavigation } from '../../components/HeaderNavigation'

const Favorite: NextPage = () => {
  const router = useRouter()

  /* useEffect(() => {
    if (!window?.localStorage.getItem('@myplace2go/favorites')) {
      window?.localStorage.setItem('@myplace2go/favorites', JSON.stringify([]))
    } else {
      setFavorites(
        JSON.parse(
          window?.localStorage.getItem('@myplace2go/favorites') || '[]'
        )
      )
    }
  }, []) */

  useEffect(() => {
    userIsLogged()
  }, [])

  function userIsLogged() {
    const token = Cookies.get('token')
    if (!token) return router.push('/login')
  }

  const { data: favorites } = useFetch(
    '/cliente/favoritos',
    Cookies.get('token')
  )
  console.log(favorites)
  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/" />
      <section className="mx-4 my-4">
        <h3 className="text-brand-gray-600 text-3xl">Meus Favoritos</h3>
        {favorites ? (
          favorites.map((place) => {
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
                    <h4 className="text-base text-brand-gray-600 font-bold">
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
        ) : (
          /*  <h2 className=" mt-10 text-base text-brand-gray-600">
            Nenhum lugar encontrado
          </h2> */
          <h2 className=" mt-10 text-base text-brand-gray-600">
            Nenhum lugar encontrado
          </h2>
        )}
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Favorite

