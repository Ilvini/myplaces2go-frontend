/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Ratting } from '../../../components/Ratting'
import BottomNavigation from '../../../components/Partials/BottomNavigation'
import GoogleMaps from '../../../components/GoogleMaps'
import { Pagination } from 'swiper'
import Link from 'next/link'
import React from 'react'
import { PlaceDetailsComments } from '../../../components/Sections/PlaceDetailsComments'
import { PlaceDetailsInformation } from '../../../components/Sections/PlaceDetailsInformation'
import { useFetch } from '../../../services/useFetch'

interface IComments {
  results: {
    id: number
    estrelas: number
    comentario: string
  }[]
}

const PlaceDetails: NextPage = () => {
  const { id } = useRouter().query

  const [currentTab, setCurrentTab] = React.useState<
    'informacoes' | 'avaliacoes' | 'mais_fotos'
  >('informacoes')

  const { data: place } = useFetch<IComments>(`/pontos-turisticos/${id}`)

  console.log(place)
  const { data: comments } = useFetch<IComments>(
    `/pontos-turisticos/${id}/avaliacoes`
  )

  const { data: MoreInfo } = useFetch(
    `/pontos-turisticos/${id}/informacoes-adicionais`
  )

  function handleAddOnFavorites(place: any) {
    console.log(place.results)
    if (!place.results) return toast.error('Erro ao adicionar aos favoritos')
    //adicionar no localstorage
    const favorites = localStorage.getItem('@myplace2go/favorites')
    const favoritesArray = favorites ? JSON.parse(favorites) : []
    const hasPlace = favoritesArray.some(
      (favorite: any) => favorite.uuid === place.results.uuid
    )
    if (hasPlace) return toast.error('Já está nos favoritos')
    favoritesArray.push(place.results)
    localStorage.setItem(
      '@myplace2go/favorites',
      JSON.stringify(favoritesArray)
    )

    return toast.success('Adicionado aos favoritos')
  }

  const Tab = {
    informacoes: <PlaceDetailsInformation />,
    avaliacoes: <PlaceDetailsComments data={place} />,
    mais_fotos: <div>Mais Fotos</div>,
  }

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
        <div>
          <div className="mt-3">
            <Swiper
              slidesPerView={1}
              spaceBetween={12}
              className="SwiperPlaceDetails"
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
            >
              <SwiperSlide className="flex flex-col rounded-3xl overflow-hidden">
                <img
                  src="/img/no-image.png"
                  alt=""
                  className="aspect-square w-full  scale-105"
                />
              </SwiperSlide>
              {/*   <SwiperSlide className="flex flex-col">
                <img
                  src="/img/no-image.png"
                  alt=""
                  className="aspect-square w-full rounded-3xl drop-shadow-lg"
                />
              </SwiperSlide> */}
            </Swiper>
            <div className="flex justify-between items-center">
              <div className="flex  flex-col mt-1">
                <div className="flex">
                  <Ratting size={24} />
                </div>
                <h3 className="text-2xl ">{place?.results.nome}</h3>
                <div className=" flex items-center">
                  <span className="text-base text-brand-gray-600 max-w-xs">
                    {place?.results.endereco}
                  </span>
                </div>
              </div>
              <button
                className="flex items-center justify-center flex-col p-3 border mt-4 rounded-md"
                onClick={() => handleAddOnFavorites(place)}
              >
                <Icon
                  icon="iconamoon:heart-fill"
                  fontSize={32}
                  className="text-brand-yellow-300"
                />
                <p className="text-brand-gray-900 font-normal mt-1 text-center">
                  Adicionar aos Favoritos
                </p>
              </button>
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
  )
}

export default PlaceDetails

