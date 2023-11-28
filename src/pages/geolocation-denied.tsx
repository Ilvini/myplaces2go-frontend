/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import 'swiper/css'
import 'swiper/css/pagination'
import BottomNavigation from '../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useFetch } from '../services/useFetch'
import Cookies from 'js-cookie'
import { HeaderNavigation } from '../components/HeaderNavigation'
import { Icon } from '@iconify/react'

const GeolocatioNDenied: NextPage = () => {
  const router = useRouter()

  useEffect(() => {})

  function ativeGeolocation() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function (result) {
          console.log(result)
          if (result.state == 'granted') {
            router.push('/')
          } else if (result.state == 'prompt') {
            navigator.geolocation.getCurrentPosition(function (position) {
              console.log(position.coords.latitude, position.coords.longitude)
              router.push('/')
            })
          } else if (result.state == 'denied') {
            router.push('/geolocation-denied')
            navigator.geolocation.getCurrentPosition(function (position) {
              console.log(position.coords.latitude, position.coords.longitude)
            })
          }
          result.onchange = function () {
            console.log(result.state)
          }
        })
    }
  }

  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/" />
      <section className="mx-4 my-4 flex justify-center items-center flex-col min-h-[400px]">
        <Icon color="red" icon="ion:location-sharp" fontSize={44} />
        <h3 className="text-brand-red-200 text-3xl text-center">
          Você negou a solicitação de Geolocalização
        </h3>
        <p className="text-center text-xl mt-5">
          para usar o app você precisar ativar a geolocalização nas
          configurações do seu celular.
        </p>
        <p className="text-center text-xl mt-5">
          quando fizer isso aperte o botão abaixo para voltar ao início.
        </p>
        {/* <div className="my-10">
          <Link href="/">Voltar para o início</Link>
        </div> */}
        <button
          className="bg-brand-red-200 text-white px-4 py-2 rounded-lg mt-14"
          onClick={() => ativeGeolocation()}
        >
          Ir para o Início
        </button>
      </section>

      <BottomNavigation />
    </main>
  )
}

export default GeolocatioNDenied

