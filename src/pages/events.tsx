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
  console.log(eventos)
  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/" />
      <section className="mx-4 my-4">
        <h3 className="text-brand-gray-600 text-xl">Eventos na minha cidade</h3>
        <div className="w-full">
          {eventos?.results.length < 0 ? (
            eventos?.results.map((event) => {
              return (
                <div key={event.id} className="p-4 shadow-xl my-4 rounded-lg ">
                  <div className="relative aspect-[16/12]">
                    <img
                      src={event.imagem_url}
                      alt=""
                      className=" rounded-lg  object-contain bg-black w-full h-full"
                    />
                    {event.gratuito && (
                      <span className="absolute bottom-2 left-1 bg-brand-green-400 p-1 px-2 rounded-lg flex items-center justify-center">
                        <Icon
                          icon="ic:baseline-money-off"
                          color="white"
                          fontSize={24}
                          className="mr-2"
                        />
                        Entrada Franca
                      </span>
                    )}
                    {event.valor && !event.gratuito && (
                      <span className="absolute bottom-2 left-1 bg-brand-green-400 p-1 px-2 rounded-lg flex items-center justify-center">
                        <Icon
                          icon="carbon:money"
                          color="white"
                          fontSize={24}
                          className="mr-2"
                        />
                        <p className="mr-1">Apartir de </p>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 3,
                        }).format(event.valor)}
                      </span>
                    )}
                  </div>

                  <p className="uppercase mt-4 bg-brand-yellow-300 p-1 w-fit px-2 rounded-lg flex items-center justify-center">
                    {formatarData(event.data_de_inicio)}{' '}
                    {event.data_de_fim && (
                      <>
                        <Icon
                          icon="mingcute:arrow-right-fill"
                          className="inline-block mx-2"
                        />{' '}
                        {formatarData(event.data_de_fim)}
                      </>
                    )}
                  </p>
                  <h3 className="mt-3 text-xl">{event.nome}</h3>
                  <div
                    className="text-brand-gray-600 mt-2"
                    dangerouslySetInnerHTML={{ __html: event?.descricao }}
                  ></div>
                  <p className="my-2">Endereço: {event.endereco}</p>
                  {!event.gratuito && event.ingresso_url && (
                    <a
                      href={event.ingresso_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button className="bg-brand-yellow-300   rounded-lg p-3 mt-3 w-full text-center ">
                        Detalhes do Evento
                      </button>
                    </a>
                  )}
                </div>
              )
            })
          ) : (
            <h3 className="text-center text-base mt-10">
              Não há eventos em sua região!
            </h3>
          )}
        </div>
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Events

