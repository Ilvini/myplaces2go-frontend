/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Ratting } from '../components/Ratting'
import BottomNavigation from '../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useFetch } from '../services/useFetch'
import Cookies from 'js-cookie'
import { HeaderNavigation } from '../components/HeaderNavigation'
import { errorHandler } from '../services/errorHandler'
import { api } from '../services/axios'
import toast from 'react-hot-toast'

interface IPreferrences {
  error: boolean
  results: {
    id: number
    nome: string
  }[]
  message: string
}

const Preferrences: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    userIsLogged()
  }, [])

  function userIsLogged() {
    const token = Cookies.get('token')
    if (!token) return router.push('/login')
  }

  async function handlePreferrences(id: number, nome: string) {
    try {
      const response = await api.post(`/cliente/categorias/${id}`, null, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      console.log(response.data)
    } catch (err) {
      errorHandler(err)
    }
  }

  const { data: preferrencias } = useFetch<IPreferrences>(
    '/cliente/categorias',
    Cookies.get('token')
  )
  console.log(preferrencias)
  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/profile" />
      <section className="mx-4 my-4">
        <h3 className="text-brand-gray-600 text-3xl">Minhas Preferências</h3>

        <div className="mt-10">
          <ul className="space-y-8">
            {preferrencias?.results.map((preferrencia) => {
              return (
                <li key={preferrencia.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={preferrencia.id.toString()}
                    name={preferrencia.nome}
                    className="mr-4 w-10 rounded-2xl h-10"
                    onClick={() =>
                      handlePreferrences(preferrencia.id, preferrencia.nome)
                    }
                  />
                  <label
                    className="text-xl"
                    htmlFor={preferrencia.id.toString()}
                  >
                    {preferrencia.nome}
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Preferrences

