/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import GoogleMapReact, { Position } from 'google-map-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Ratting } from '../components/Ratting'
import BottomNavigation from '../components/Partials/BottomNavigation'
import GoogleMaps from '../components/GoogleMaps'
import Link from 'next/link'
import { useFetch } from '../services/useFetch'
import React, { useEffect } from 'react'
import styleGoogleMaps from '../styles/googleMapsStyle/main'
import { errorHandler } from '../services/errorHandler'
import { api } from '../services/axios'
import { CardsPlaceSkeleton } from '../components/Partials/Skeleton/CardsPlaceSkeleton'
interface IPlaces {
  results: {
    uuid: string
    nome: string
    lat: number
    lon: number
    categoria: string
    icone: string
  }[]
}
const Home: NextPage = () => {
  const [currentPosition, setCurrentPosition] = React.useState({
    latitude: 0,
    longitude: 0,
  })

  const [places, setPlaces] = React.useState<IPlaces>()
  const router = useRouter()

  /* const { data } = useFetch<IPlaces>(
    '/pontos-turisticos?lat=-1.459549&lon=-48.49707&raio=14.28&categorias=10000,13000,14000,16000,18000,19000'
  )
 */
  function locationError(error: any) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'Usuário negou a solicitação de geolocalização.'
      case error.POSITION_UNAVAILABLE:
        return ' Local informado indisponível.'
      case error.TIMEOUT:
        return 'O pedido de localização do usuário expirou.'
      case error.UNKNOWN_ERROR:
        return 'Erro Desconhecido.'
    }
  }

  function limitarCaracteres(texto: string, limite: number) {
    if (texto.length <= limite) {
      return texto // Retorna a string sem fazer alterações se estiver dentro do limite.
    } else {
      const textoLimitado = texto.slice(0, limite) + '...'
      return textoLimitado // Retorna a string cortada no limite especificado.
    }
  }

  async function getPlaces(lat: number, lon: number) {
    try {
      const response = await api.get(
        `/pontos-turisticos?lat=${lat}&lon=${lon}&raio=14.28&categorias=10000,13000,14000,16000,18000,19000`
      )
      setPlaces(response.data)
    } catch (erro: any) {
      errorHandler(erro)
    }
  }

  console.log(places)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setCurrentPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          getPlaces(position.coords.latitude, position.coords.longitude)
        },
        (error: GeolocationPositionError) => {
          console.log(locationError(error))
          toast.error(locationError(error) as string, {
            duration: 5000,
          })
        }
      )
    } else {
      toast.error('Seu dispositivo não suporta geolocalização', {
        duration: 5000,
      })
    }
  }, [])

  const defaultProps = {
    center: {
      lat: currentPosition.latitude,
      lng: currentPosition.longitude,
    },
    zoom: 14.28,
    styles: styleGoogleMaps,
  }

  const CurrentLocationMarker = ({ text }: { text: string }) => (
    <Icon
      icon="ic:round-emoji-people"
      className="-translate-x-2 -translate-y-2 z-50 bg-white rounded-full p-1 shadow-md"
      fontSize={32}
      color="red"
    />
  )
  const handleApiLoaded = (map: any, maps: any) => {
    // use map and maps objects
    map.setOptions({
      disableDefaultUI: true,
      zoomControl: true,
      center: {
        lat: currentPosition.latitude,
        lng: currentPosition.longitude,
      },
      zoom: defaultProps.zoom,
    })

    maps.event.addListener(map, 'click', function (e: any) {
      console.log(e.latLng.lat())
      console.log(e.latLng.lng())
    })
  }

  return (
    <main className="relative">
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
        {/*   <h1 className="text-2xl font-bold text-brand-gray-900">
          Seja Bem vindo
        </h1> */}
        {/*   <p className="text-brand-gray-500 text-xl mt-1">Lugares por perto</p> */}

        <div className="mt-3">
          {places?.results.length ? (
            <Swiper slidesPerView={3} spaceBetween={12} className="">
              {places?.results?.map((place) => {
                return (
                  <SwiperSlide key={place.uuid} className="flex flex-col">
                    <Link href={`/dashboard/place/${place.uuid}`}>
                      <img
                        src={place.imagem}
                        alt=""
                        className="aspect-square rounded-3xl drop-shadow-lg  w-full bg-zinc-200"
                        onError={(e) => {
                          e.currentTarget.src = '/img/no-image.png'
                          e.currentTarget.onError = null
                        }}
                      />
                      <div className="flex  flex-col mt-1">
                        {/* <div className="flex">
                          <Ratting />
                        </div> */}
                        <h3 className="text-base">
                          {limitarCaracteres(place.nome, 20)}
                        </h3>
                        <div className=" flex items-center">
                          <span className="text-sm text-brand-gray-500">
                            {place.categoria}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          ) : (
            <div className="grid grid-cols-3 gap-4 w-full">
              <CardsPlaceSkeleton />
              <CardsPlaceSkeleton />
              <CardsPlaceSkeleton />
            </div>
          )}
        </div>
      </section>
      <section className="mb-[72px]">
        {typeof navigator !== 'undefined' && navigator?.geolocation ? (
          <div className="aspect-square rounded-lg" style={{ width: '100%' }}>
            {places?.results.length ? (
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: 'AIzaSyAXVy2ejGB5cOb_FPd0J2mhxaMjJ4It6JA',
                }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) =>
                  handleApiLoaded(map, maps)
                }
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={{
                  styles: defaultProps.styles,
                }}
              >
                <CurrentLocationMarker
                  lat={currentPosition.latitude}
                  lng={currentPosition.longitude}
                />
                {places?.results?.map((place) => {
                  return (
                    <div
                      key={place.uuid}
                      lat={place.lat}
                      lng={place.lon}
                      className="flex flex-col justify-center items-center relative"
                    >
                      <img
                        src={place.icone}
                        alt=""
                        className="aspect-square rounded-lg bg-brand-green-300 w-10"
                      />
                    </div>
                  )
                })}
              </GoogleMapReact>
            ) : (
              <div
                className="aspect-square rounded-lg bg-zinc-300 animate-pulse"
                style={{ width: '100%' }}
              ></div>
            )}
          </div>
        ) : (
          <div className="aspect-square bg-brand-blue-100 flex justify-center items-center">
            <p>Por Favor, Ative a geolocalização...</p>
          </div>
        )}
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Home

