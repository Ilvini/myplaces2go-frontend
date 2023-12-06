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
import { formatDate, formatarData } from '../helpers/formatDate'
import { Icon } from '@iconify/react'

const Events: NextPage = () => {
  const router = useRouter()
  const { estado, cidade } = router.query
  const { data: eventos } = useFetch(
    `/eventos?estado=${estado}&cidade=${cidade}`
  )
  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/" />
      <section className="mx-4 my-4">
        <h3 className="text-brand-gray-600 text-xl">Eventos na minha cidade</h3>
        <div className="w-full">
          <div
            class="ae-embed-plugin"
            data-type="city"
            data-cityname="Belem"
            data-category="All"
            data-sort="0"
            data-header="1"
          ></div>
        </div>
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Events
