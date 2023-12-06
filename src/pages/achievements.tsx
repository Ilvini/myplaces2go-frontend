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

interface IPreferrences {
  error: boolean
  message: string
  results: {
    id: number
    nome: string
    ativo: boolean
    imagem: string
  }[]
}

const Achievements: NextPage = () => {
  const router = useRouter()

  const achievements = {
    message: 'ok',
    error: false,
    results: [
      {
        id: 1,
        nome: 'Feedback',
        descricao: 'Você deixou uma sugestão para nosso App',
        ativo: true,
        imagem: '/img/conquistas/feedback.png',
      },
      {
        id: 2,
        nome: 'Avaliação',
        descricao: 'Você avaliou uma localidade',
        ativo: true,
        imagem: '/img/conquistas/jackpot.png',
      },
      {
        id: 3,
        nome: 'Compartilhamento',
        descricao: 'Você compartilhou uma localidade',
        ativo: false,
        imagem: '/img/conquistas/location.png',
      },
      {
        id: 4,
        nome: 'Sugestão',
        descricao: 'Você envou uma sugestão para nosso App',
        ativo: false,
        imagem: '/img/conquistas/question.png',
      },
    ],
  }

  useEffect(() => {
    userIsLogged()
  }, [])

  function userIsLogged() {
    const token = Cookies.get('token')
    if (!token) return router.push('/login')
  }

  /*  async function handleAchievements(id: number, nome: string) {
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
  } */

  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/profile" />
      <section className="mx-4 my-4">
        <h3 className="text-brand-gray-600 text-3xl">Minhas Conquistas</h3>

        <div className="mt-10">
          <ul className="space-y-4">
            {achievements?.results.map((achievement) => {
              return (
                <>
                  <li key={achievement.id} className="flex items-center">
                    <div
                      className={`rounded-full border ${
                        achievement.ativo ? '' : 'grayscale'
                      }`}
                    >
                      <img
                        src={achievement.imagem}
                        alt={achievement.nome}
                        className={`aspect-square h-20 w-20 p-4 `}
                      />
                    </div>
                    <div>
                      <p className="text-xl font-normal ml-4 flex items-center">
                        {achievement.nome}{' '}
                        {achievement.ativo && (
                          <>
                            {' '}
                            <Icon
                              icon="lets-icons:check-fill"
                              fontSize={20}
                              className="text-brand-green-400 ml-2"
                            />
                            <small className="text-brand-gray-600">
                              Conquistado
                            </small>
                          </>
                        )}
                      </p>
                      <p className="text-sm font-normal ml-4">
                        {achievement.descricao}
                      </p>
                    </div>
                  </li>
                  <hr />
                </>
              )
            })}
          </ul>
        </div>
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Achievements

