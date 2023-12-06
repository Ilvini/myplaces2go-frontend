/* eslint-disable @next/next/no-img-element */
'use client'

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
import React, { useCallback, useEffect, useState } from 'react'
import styleGoogleMaps from '../styles/googleMapsStyle/main'
import { errorHandler } from '../services/errorHandler'
import { api } from '../services/axios'
import { CardsPlaceSkeleton } from '../components/Partials/Skeleton/CardsPlaceSkeleton'
import locationError from '../helpers/handlerErrorGeoLocation'
import Cookies from 'js-cookie'
import { HeaderNavigation } from '../components/HeaderNavigation'
import { Zoom } from 'swiper'
interface IPlaces {
  results: {
    cidade: string
    estado: string
    localidades: {
      uuid: string
      nome: string
      lat: number
      lon: number
      categoria: string
      icone: string
      imagem: string
    }[]
  }
}
const Home: NextPage = () => {
  const [currentPosition, setCurrentPosition] = React.useState({
    latitude: 0,
    longitude: 0,
  })
  const apiKey = 'AIzaSyAXVy2ejGB5cOb_FPd0J2mhxaMjJ4It6JA'
  const [places, setPlaces] = React.useState<IPlaces>()
  const [loading, setLoading] = React.useState(false)
  const [zoom, setZoom] = React.useState<number | null>(null)
  const router = useRouter()
  const [latAndLgn, setLatAndLgn] = React.useState({
    lat: 0,
    lng: 0,
  })
  const raios = [
    {
      zoom: 20,
      raio: 0.046875,
    },
    {
      zoom: 19,
      raio: 0.09375,
    },
    {
      zoom: 18,
      raio: 0.1875,
    },
    {
      zoom: 17,
      raio: 0.375,
    },
    {
      zoom: 16,
      raio: 0.75,
    },
    {
      zoom: 15,
      raio: 1.5,
    },
    {
      zoom: 14,
      raio: 3,
    },
    {
      zoom: 13,
      raio: 6,
    },
    {
      zoom: 12,
      raio: 12,
    },
    {
      zoom: 11,
      raio: 24,
    },
    {
      zoom: 10,
      raio: 48,
    },
    {
      zoom: 9,
      raio: 96,
    },
    {
      zoom: 8,
      raio: 192,
    },
    {
      zoom: 7,
      raio: 385,
    },
    {
      zoom: 6,
      raio: 771,
    },
    {
      zoom: 5,
      raio: 1543,
    },
    {
      zoom: 4,
      raio: 3098,
    },
    {
      zoom: 3,
      raio: 6197,
    },
    {
      zoom: 2,
      raio: 295828775.3,
    },
    {
      zoom: 1,
      raio: 591657550.5,
    },
  ]
  const [openWindow, setOpenWindow] = React.useState<string | null>(null)

  function limitarCaracteres(texto: string, limite: number) {
    if (texto.length <= limite) {
      return texto // Retorna a string sem fazer alterações se estiver dentro do limite.
    } else {
      const textoLimitado = texto.slice(0, limite) + '...'
      return textoLimitado // Retorna a string cortada no limite especificado.
    }
  }

  // função para pegar os lugares baseado na latitude e longitude
  async function getPlaces(lat: number, lon: number, zoom = 14) {
    try {
      setLatAndLgn({
        lat: lat,
        lng: lon,
      })
      setLoading(true)
      const response = await api.get(
        `/pontos-turisticos?lat=${lat}&lon=${lon}&raio=${zoom}`
      )
      setPlaces(response.data)
      setLoading(false)
    } catch (erro: any) {
      setLoading(false)
      errorHandler(erro)
    }
  }

  // função para pegar informações sobre a latitude e longitude, atualmente é usada para pegar a cidade e o estado
  /*   const getInfoAboutLatAndLong = useCallback(async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}&format=json`,
        {
          headers: {
            'User-Agent': 'My Place 2 Go',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      )
      const data = await response.json()
      localStorage.setItem('city', data.address.city)
      localStorage.setItem(
        'state',
        data.address['ISO3166-2-lvl4'].split('-')[1]
      )

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }, [currentPosition]) */
  // configuração padrão para o mapa
  const defaultProps = {
    center: {
      lat: currentPosition.latitude,
      lng: currentPosition.longitude,
    },
    zoom: 14,
    styles: styleGoogleMaps,
  }
  // marker para a localização atual
  const CurrentLocationMarker = ({ text }: { text: string }) => (
    <Icon
      icon="ic:round-emoji-people"
      className="-translate-x-2 -translate-y-2 z-50 bg-white rounded-full p-1 shadow-md"
      fontSize={32}
      color="red"
    />
  )

  // lugar onde podemos setar configurações do mapa
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
  }

  function getRaio(zoom: number) {
    console.log(zoom)
    const raio: any = raios.find((raio) => raio.zoom === zoom)
    console.log(raio)
    return raio.raio
  }
  const handleUpdateMap = (lat: number, long: number, e: any) => {
    const raio = getRaio(e.zoom)
    console.log(raio + 'test')
    getPlaces(lat, long, raio)
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
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
            },
            { enableHighAccuracy: true, maximumAge: 86400000, timeout: 5000 }
          )
        } else if (result.state === 'prompt') {
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
            },
            {
              enableHighAccuracy: true,
              maximumAge: 86400000,
              timeout: 5000,
            }
          )
        } else if (result.state === 'denied') {
          toast.error('Você negou a permissão de geolocalização', {
            duration: 5000,
          })
        }
      })
    } else {
      toast.error('Seu dispositivo não suporta geolocalização', {
        duration: 5000,
      })
    }
    /*   getInfoAboutLatAndLong() */
  }, [])

  useEffect(() => {
    // debounce
    const timer = setTimeout(() => {
      if (currentPosition.latitude !== 0 && currentPosition.longitude !== 0) {
        navigator.geolocation.watchPosition(
          (position: GeolocationPosition) => {
            //tentar novamente o swr com essa alteração abaixo
            getPlaces(position.coords.latitude, position.coords.longitude)
            // setCurrentPosition({
            //   latitude: position.coords.latitude,
            //   longitude: position.coords.longitude,
            // })
          },
          (error: GeolocationPositionError) => {
            console.log(locationError(error))
            toast.error(locationError(error) as string, {
              duration: 5000,
            })
          },
          { enableHighAccuracy: true, maximumAge: 86400000, timeout: 15000 }
        )
      }
    }, 15000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      <HeaderNavigation backRoute="" />
      <section className="mx-4 my-4 bg-white">
        {/*   <h1 className="text-2xl font-bold text-brand-gray-900">
          Seja Bem vindo
        </h1> */}
        {/*   <p className="text-brand-gray-500 text-xl mt-1">Lugares por perto</p> */}

        <div className="mt-3 ">
          {places?.results.localidades.length ? (
            <Swiper slidesPerView={3} spaceBetween={12} className="bg-white">
              {places?.results.localidades.map((place) => {
                return (
                  <SwiperSlide key={place.uuid} className="flex flex-col">
                    <Link href={`/dashboard/place/${place.uuid}`}>
                      <div>
                        <img
                          src={
                            place.imagem ? place.imagem : '/img/no-image.png'
                          }
                          alt=""
                          className="aspect-square object-cover rounded-3xl drop-shadow-lg  w-full bg-zinc-200"
                          onError={(e) => {
                            e.currentTarget.src = '/img/no-image.png'
                            e.currentTarget.onerror = null
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
                              {limitarCaracteres(place.categoria, 14)}
                            </span>
                          </div>
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
      <section className="mt-2 relative">
        {typeof navigator !== 'undefined' && navigator?.geolocation ? (
          <div
            className="aspect-square rounded-lg relative overflow-hidden h-[400px]"
            style={{ width: '100%' }}
          >
            {places?.results.localidades.length ? (
              <>
                <div className="absolute left-2 top-3 flex flex-wrap z-30 space-x-2 ">
                  <Link
                    href={`/info-city?lat=${latAndLgn.lat}&long=${latAndLgn.lng}`}
                  >
                    <button className="text-sm drop-shadow-lg bg-white flex items-center px-4 py-2 text-brand-gray-900 font-normal  rounded-full">
                      <Icon icon="mdi:city" className="mr-2" />{' '}
                      {places?.results.cidade}
                    </button>
                  </Link>

                  <Link
                    href={`/guide?estado=${places.results.estado}&cidade=${places.results.cidade}`}
                  >
                    <button className=" text-sm drop-shadow-lg bg-white flex items-center px-4 py-2 text-brand-gray-900 font-normal  rounded-full">
                      <Icon icon="solar:user-bold" className="mr-2" />
                      Guias
                    </button>
                  </Link>
                  <Link
                    href={`/events?estado=${places.results.estado}&cidade=${places.results.cidade}`}
                  >
                    <button className=" text-sm drop-shadow-lg bg-white flex items-center px-4 py-2 text-brand-gray-900 font-normal  rounded-full">
                      <Icon icon="solar:user-bold" className="mr-2" />
                      Eventos
                    </button>
                  </Link>
                </div>
                {/*  <button
                  key="center"
                  onClick={handleCenterClick}
                  className=" bg-white p-2 rounded-md shadow-md w-12 flex items-center justify-center h-12 absolute bottom-40 right-2 z-50"
                >
                  <Icon
                    icon="mdi:image-filter-center-focus-strong"
                    fontSize={32}
                    className="text-brand-gray-600"
                    onClick={() => {
                      handleCenterClick()
                    }}
                  />
                </button> */}
                <GoogleMapReact
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',

                    height: '400px',
                  }}
                  onClick={() => {
                    if (openWindow) setOpenWindow(null)
                  }}
                  onChange={(e) => {
                    console.log(e)
                    setZoom(e.zoom)
                    // chama a api somente se alterar o zoom
                    if (zoom === e.zoom) return
                    handleUpdateMap(
                      currentPosition.latitude,
                      currentPosition.longitude,
                      e
                    )
                  }}
                  bootstrapURLKeys={{
                    key: 'AIzaSyAXVy2ejGB5cOb_FPd0J2mhxaMjJ4It6JA',
                  }}
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
                  {places?.results?.localidades.map((place) => {
                    return (
                      <div
                        key={place.uuid}
                        lat={place.lat}
                        lng={place.lon}
                        className="relative -translate-x-2 -translate-y-8"
                      >
                        <div
                          onClick={() => {
                            setOpenWindow(place.uuid)
                          }}
                        >
                          <>
                            {openWindow === place.uuid && (
                              <div className="">
                                <div className="absolute bottom-16 -left-12 w-32 h-full z-50 flex justify-center items-center">
                                  {/*  <span
                                    className="absolute right-0 -top-6 p-2"
                                    onClick={() => setOpenWindow(null)}
                                  >
                                    <Icon
                                      icon="zondicons:close-solid"
                                      color="red"
                                    />
                                  </span> */}
                                  <div className="bg-white rounded-lg p-2 relative z-50">
                                    <p className="text-center font-bold text-brand-gray-900">
                                      {place.nome}
                                    </p>
                                    <p className="text-center text-brand-gray-900">
                                      {place.categoria}
                                    </p>
                                    <Link
                                      href={`/dashboard/place/${place.uuid}`}
                                    >
                                      <button className="bg-brand-yellow-300 w-32 text-brand-gray-900 rounded-sm p-1 mt-2 ">
                                        Ver mais
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            )}
                            <Icon
                              icon="fontisto:map-marker"
                              color="red"
                              fontSize={30}
                            />
                            <img
                              src={place.icone}
                              alt=""
                              loading="lazy"
                              className="aspect-square w-5  absolute top-[2px] left-[3px] google_maps_icons"
                            />
                          </>
                        </div>
                      </div>
                    )
                  })}
                </GoogleMapReact>
              </>
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
    </div>
  )
}

export default Home

