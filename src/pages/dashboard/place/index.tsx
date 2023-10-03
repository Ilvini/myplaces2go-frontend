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

const PlaceDetails: NextPage = () => {
  const router = useRouter()

  const [currentTab, setCurrentTab] = React.useState<
    'informacoes' | 'comentarios' | 'mais_fotos'
  >('informacoes')

  const Tab = {
    informacoes: <PlaceDetailsInformation />,
    comentarios: <PlaceDetailsComments />,
    mais_fotos: <div>Mais Fotos</div>,
  }

  return (
    <main className="relative pb-20">
      <header className="py-4  shadow-md">
        <nav className="flex justify-center w-full">
          <Link href={'/dashboard'}>
            <button className="w-1/3">
              <Icon
                icon="icon-park-outline:back-one"
                color="#528fa7"
                fontSize={44}
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
              <SwiperSlide className="flex flex-col">
                <img
                  src="/img/turismo1.png"
                  alt=""
                  className="aspect-square w-full rounded-3xl drop-shadow-lg"
                />
              </SwiperSlide>
              <SwiperSlide className="flex flex-col">
                <img
                  src="/img/turismo1.png"
                  alt=""
                  className="aspect-square w-full rounded-3xl drop-shadow-lg"
                />
              </SwiperSlide>
            </Swiper>
            <div className="flex justify-between items-center">
              <div className="flex  flex-col mt-1">
                <div className="flex">
                  <Ratting size={24} />
                </div>
                <h3 className="text-2xl ">Cristo Redentor</h3>
                <div className=" flex items-center">
                  <span className="text-sm text-brand-gray-600">
                    Rio de Janeiro, RJ
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col px-3">
                <Icon
                  icon="gg:check-o"
                  fontSize={20}
                  className="text-brand-green-400"
                />
                <p className="text-brand-green-400 font-normal mt-1">
                  Já Avaliado
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-4 my-4">
        <ul className="flex w-full">
          <li
            onClick={() => setCurrentTab('informacoes')}
            className={`py-2 px-3 text-brand-gray-600 ${
              currentTab === 'informacoes' &&
              'bg-gray-200  text-brand-gray-900 rounded-2xl'
            } `}
          >
            Informações
          </li>
          <li
            onClick={() => setCurrentTab('comentarios')}
            className={`py-2  text-brand-gray-600 ${
              currentTab === 'comentarios' &&
              'bg-gray-200  text-brand-gray-900 rounded-2xl'
            }  px-3`}
          >
            Comentários
          </li>
          <li
            onClick={() => setCurrentTab('mais_fotos')}
            className={`py-2 text-brand-gray-600 ${
              currentTab === 'mais_fotos' &&
              'bg-gray-200  text-brand-gray-900 rounded-2xl'
            } px-3`}
          >
            Mais Fotos
          </li>
        </ul>
        <div>{Tab[currentTab]}</div>
      </section>
      <BottomNavigation />
    </main>
  )
}

export default PlaceDetails

