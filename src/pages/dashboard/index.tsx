/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Ratting } from '../../components/Ratting'
import BottomNavigation from '../../components/Partials/BottomNavigation'
import GoogleMaps from '../../components/GoogleMaps'
import Link from 'next/link'

interface FormProps {
  email: string
  password: string
}

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <main className="relative ">
      <header className="py-4  shadow-md">
        <nav className="flex justify-center w-full">
          {/* <button>
            <Icon
              icon="icon-park-outline:back-one"
              color="#528fa7"
              fontSize={44}
            />
          </button> */}
          <img src="/img/logo.png" alt="logo my place 2 go" />
        </nav>
      </header>
      <section className="mx-4 my-4">
        <h1 className="text-3xl font-bold text-brand-gray-900">
          Bem vindo, Angelo!
        </h1>
        <p className="text-brand-gray-500 text-2xl mt-1">Explorar</p>
        <div>
          {/* <h2 className="text-2xl font-bold text-brand-gray-900 mt-10">
            O que você deseja fazer?
          </h2> */}
          <div className="mt-3">
            <Swiper slidesPerView={3} spaceBetween={12} className="">
              <SwiperSlide className="flex flex-col">
                <Link href="/dashboard/place">
                  <img
                    src="/img/turismo1.png"
                    alt=""
                    className="aspect-square rounded-3xl drop-shadow-lg"
                  />
                  <div className="flex  flex-col mt-1">
                    <div className="flex">
                      <Ratting />
                    </div>
                    <h3 className="text-base">Cristo Redentor</h3>
                    <div className=" flex items-center">
                      <span className="text-sm text-brand-gray-500">
                        Rio de Janeiro, RJ
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide className="flex flex-col">
                <Link href="/dashboard/place">
                  <img
                    src="/img/turismo2.png"
                    alt=""
                    className="aspect-square rounded-3xl  drop-shadow-lg"
                  />
                  <div className="flex  flex-col mt-2">
                    <div className="flex">
                      <Ratting />
                    </div>
                    <h3 className="text-base">Teatro da Paz</h3>
                    <div className=" flex items-center">
                      <span className="text-sm text-brand-gray-500">
                        Belém, PA
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide className="flex flex-col">
                <Link href="/dashboard/place">
                  <img
                    src="/img/turismo1.png"
                    alt=""
                    className="aspect-square rounded-3xl drop-shadow-lg"
                  />
                  <div className="flex  flex-col mt-2">
                    <div className="flex">
                      <Ratting />
                    </div>
                    <h3 className="text-base">Cristo Redentor</h3>
                    <div className=" flex items-center">
                      <span className="text-sm text-brand-gray-500">
                        Rio de Janeiro, RJ
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            </Swiper>
            {/* <button className="flex justify-between items-center w-full bg-brand-yellow-300 p-3 rounded-lg">
              <span className="text-brand-gray-900 font-bold text-2xl">
                Criar um novo lugar
              </span>
              <Icon
                icon="ant-design:plus-outlined"
                color="#528fa7"
                fontSize={44}
              />
            </button>
            <button className="flex justify-between items-center w-full bg-brand-yellow-300 p-3 rounded-lg mt-5">
              <span className="text-brand-gray-900 font-bold text-2xl">
                Explorar novos lugares
              </span>
              <Icon icon="bx:bxs-search" color="#528fa7" fontSize={44} />
            </button> */}
          </div>
        </div>
      </section>
      <section className="mx-4 my-4"></section>
      <GoogleMaps />
      <BottomNavigation />
    </main>
  )
}

export default Home

