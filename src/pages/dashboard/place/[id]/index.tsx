/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Ratting } from '../../../../components/Ratting'
import BottomNavigation from '../../../../components/Partials/BottomNavigation'
import GoogleMaps from '../../../../components/GoogleMaps'
import { Pagination } from 'swiper'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { PlaceDetailsComments } from '../../../../components/Sections/PlaceDetailsComments'
import { PlaceDetailsInformation } from '../../../../components/Sections/PlaceDetailsInformation'
import { useFetch } from '../../../../services/useFetch'
import { IPlaces } from '../../../../contracts/places'
import { api } from '../../../../services/axios'
import Cookies from 'js-cookie'
import { errorHandler } from '../../../../services/errorHandler'
import { HeaderNavigation } from '../../../../components/HeaderNavigation'
import { NextSeo } from 'next-seo'
interface IComments {
  results: {
    id: number
    estrelas: number
    comentario: string
  }[]
}

const PlaceDetails: NextPage = ({ data }) => {
  const { id } = useRouter().query
  const [hasFavorite, setHasFavorite] = useState<boolean>(false)
  const [currentTab, setCurrentTab] = React.useState<
    'informacoes' | 'avaliacoes' | 'mais_fotos'
  >('informacoes')

  /*   const { data: place } = useFetch<IPlaces>(`/pontos-turisticos/${id}`)
   */
  console.log(data && data)

  /*  const { data: avaliacoes } = useFetch(`/pontos-turisticos/${id}/avaliacoes`) */
  useEffect(() => {
    if (data?.results?.favorito) {
      setHasFavorite(true)
    } else {
      setHasFavorite(false)
    }
  }, [])
  async function handleAddOnFavorites(data: any) {
    try {
      console.log(data.results)
      if (!data.results) return toast.error('Erro ao adicionar aos favoritos')

      const response = await api.patch(
        `/pontos-turisticos/${data.results.uuid}/favoritar`,
        null,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      )
      setHasFavorite(!hasFavorite)
    } catch (err) {
      console.log(err)
      errorHandler(err)
    }
  }

  const Tab = {
    informacoes: <PlaceDetailsInformation data={data} />,
    avaliacoes: <PlaceDetailsComments data={data} />,
    mais_fotos: <div>Mais Fotos</div>,
  }

  return (
    <>
      <NextSeo
        title={data?.results.nome}
        description={data?.results.nome}
        canonical={`https://myplaces2go-frontend.vercel.app//dashboard/place/${id}`}
        openGraph={{
          url: `https://myplaces2go-frontend.vercel.app//dashboard/place/${id}`,
          title: data?.results.nome,
          description: data?.results.nome,
          images: [
            {
              url: data?.results.imagens[0] || '/seo.png',
              width: 800,
              height: 600,
              alt: data?.results.nome,
            },
            {
              url: data?.results.imagens[1] || '/seo.png',
              width: 900,
              height: 800,
              alt: data?.results.nome,
            },
            { url: data?.results.imagens[2] || '/seo.png' },
            { url: data?.results.imagens[3] || '/seo.png' },
          ],
          site_name: 'My Place 2 Go',
        }}
      />
      <main className="relative pb-20">
        <HeaderNavigation backRoute="/" />
        <section className="mx-4 my-4">
          <div>
            <div className="mt-3">
              {data?.results.imagens && data?.results.imagens.length > 0 ? (
                <Swiper
                  slidesPerView={1}
                  spaceBetween={12}
                  className="SwiperPlaceDetails"
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                >
                  {data?.results?.imagens.map(
                    (imagem: string, index: number) => {
                      return (
                        <SwiperSlide
                          key={index + imagem}
                          className="flex  flex-col rounded-3xl overflow-hidden aspect-square"
                        >
                          <img
                            src={imagem}
                            alt=""
                            className="h-full w-full  object-cover scale-105"
                          />
                        </SwiperSlide>
                      )
                    }
                  )}
                  {/*   <SwiperSlide className="flex flex-col">
                <img
                  src="/img/no-image.png"
                  alt=""
                  className="aspect-square w-full rounded-3xl drop-shadow-lg"
                />
              </SwiperSlide> */}
                </Swiper>
              ) : (
                <div className="bg-zinc-300 aspect-square w-full h-full rounded-3xl"></div>
              )}
              <div className="flex justify-between items-center gap-4">
                <div className="flex  flex-col mt-1 w-full">
                  <div className="flex">
                    <Ratting size={24} count={data?.results?.avaliacao_media} />{' '}
                    {!data?.results.avaliacao_media && (
                      <p className="text-sm">Sem Avaliações</p>
                    )}
                  </div>
                  {data?.results.nome ? (
                    <h3 className="text-2xl ">{data?.results.nome}</h3>
                  ) : (
                    <span className="bg-zinc-300 animate-pulse h-6 w-full rounded-md mt-2"></span>
                  )}
                  <div className=" flex items-center">
                    {data?.results.endereco ? (
                      <span className="text-base text-brand-gray-600 max-w-xs">
                        {data?.results.endereco}
                      </span>
                    ) : (
                      <span className="bg-zinc-300 animate-pulse h-6 w-full rounded-md mt-2 "></span>
                    )}
                  </div>
                </div>
                {hasFavorite ? (
                  <button
                    className="flex w-44 items-center justify-center flex-col p-3 border mt-4 rounded-md"
                    onClick={() => handleAddOnFavorites(data)}
                  >
                    <Icon
                      icon="gg:check-o"
                      fontSize={24}
                      className="text-brand-green-400"
                    />
                    <p className="text-brand-gray-900 font-normal mt-1 text-center">
                      Favorito
                    </p>
                  </button>
                ) : (
                  <button
                    className="flex w-44 items-center justify-center flex-col p-3 border mt-4 rounded-md"
                    onClick={() => handleAddOnFavorites(data)}
                  >
                    <Icon
                      icon="iconamoon:heart-fill"
                      fontSize={24}
                      className="text-brand-yellow-300"
                    />
                    <p className="text-brand-gray-900 font-normal mt-1 text-center">
                      Adicionar aos favoritos
                    </p>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="mx-4 my-4">
          <ul className="flex w-full">
            <li
              onClick={() => setCurrentTab('informacoes')}
              className={`py-2 px-3 text-brand-gray-600 cursor-pointer ${
                currentTab === 'informacoes' &&
                'bg-gray-200  text-brand-gray-900 rounded-2xl '
              } `}
            >
              Informações
            </li>
            <li
              onClick={() => setCurrentTab('avaliacoes')}
              className={`py-2  text-brand-gray-600 cursor-pointer ${
                currentTab === 'avaliacoes' &&
                'bg-gray-200  text-brand-gray-900 rounded-2xl '
              }  px-3`}
            >
              Avaliações
            </li>
            {/* <li
            onClick={() => setCurrentTab('mais_fotos')}
            className={`py-2 text-brand-gray-600 ${
              currentTab === 'mais_fotos' &&
              'bg-gray-200  text-brand-gray-900 rounded-2xl'
            } px-3`}
          >
            Mais Fotos
          </li> */}
          </ul>
          <div>{Tab[currentTab]}</div>
        </section>
        <BottomNavigation />
      </main>
    </>
  )
}

export default PlaceDetails

export const getServerSideProps = async (context: any) => {
  const { params } = context
  const { id } = params

  const response = await api.get(`/pontos-turisticos/${id}`)

  const place = await response.data
  console.log(place)
  return {
    props: {
      data: place,
    },
    fallback: true,
  }
}

