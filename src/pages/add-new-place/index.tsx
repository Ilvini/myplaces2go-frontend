/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import BottomNavigation from '../../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useFetch } from '../../services/useFetch'
import Cookies from 'js-cookie'
import { HeaderNavigation } from '../../components/HeaderNavigation'
import { useForm } from 'react-hook-form'
import { LabelError } from '../../components/Forms/components/LabelError'
import { GoogleMapsPlaceLocation } from '../../components/GoogleMapsPlaceLocation'
import ButtonPrimary from '../../components/Buttons/ButtonPrimary'
import toast from 'react-hot-toast'
import { api } from '../../services/axios'
import useLocationNewPlace from '../../stores/useLocationNewPlace'
interface FormProps {
  subcategoria_id: number
  nome: string
  endereco: string
  lat: number
  lon: number
}

interface Ilocation {
  lat: number | null
  lon: number | null
}

interface IResponse {
  results: {
    id: number
    nome: string
  }[]
  error: boolean
  message: string
}

const AddNewPlace: NextPage = () => {
  const router = useRouter()

  const { locationStore, setLocationStore } = useLocationNewPlace()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>()

  const { data: categories } = useFetch<IResponse>(
    '/pontos-turisticos-categorias',
    Cookies.get('token')
  )

  useEffect(() => {
    userIsLogged()
  }, [])

  function userIsLogged() {
    const token = Cookies.get('token')
    if (!token) return router.push('/login')
  }

  async function handleAddPlace(data: FormProps) {
    if (
      locationStore.lat === null &&
      locationStore.lon === null &&
      location.lat === null &&
      location.lon === null
    )
      return toast.error('Por favor, selecione a localização no mapa')
    try {
      const response = await api.post(
        'pontos-turisticos',
        {
          subcategoria_id: data.subcategoria_id,
          nome: data.nome,
          endereco: data.endereco,
          lat: location.lat,
          lon: location.lon,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      )
      toast.success(response.data.message)
      router.push('/profile')
    } catch (error) {
      console.log(error)
    }
  }
  const [location, setLocation] = useState<Ilocation>({
    lat: null,
    lon: null,
  })
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // localizationStore = a localização que  foi setada pelo usuário.
          // se não exister a localização no store, seta a localização atual
          if (locationStore.lat && locationStore.lon) {
            setLocation({
              lat: locationStore.lat,
              lon: locationStore.lon,
            })
            return
          }
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })

          /*   setLocationStore({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })

          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }) */
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }, [])

  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/profile" />
      <section className="mx-4 my-4">
        <h3 className="text-brand-gray-600 text-2xl">Adicionar novo Lugar</h3>
        {/*   <p className="text-brand-gray-500 mt-2">
          Forneça algumas informações sobre esse lugar. Se for adicionado a
          plataforma, esse lugar ficará disponível publicamente.
        </p> */}
        <form className="flex flex-col" onSubmit={handleSubmit(handleAddPlace)}>
          <div className="mt-5 ">
            <input
              placeholder="Nome do lugar (Obrigatório)"
              type="text"
              id="Nome"
              style={errors.nome && { border: '1px solid red' }}
              {...register('nome', {
                required: { message: 'Campo obrigatório', value: true },
              })}
              className="w-full py-5 h-20 px-6 text-base placeholder:text-brand-gray-500 "
              disabled={isSubmitting}
            />
            <LabelError
              msg={errors.nome?.message as string}
              hasError={errors.nome as any}
            />
          </div>
          <div className="my-5 ">
            <input
              placeholder="Endereço"
              type="text"
              id="endereco"
              style={errors.endereco && { border: '1px solid red' }}
              {...register('endereco', {
                required: { message: 'Campo obrigatório', value: true },
              })}
              className="w-full py-5 h-20 px-6 text-base placeholder:text-brand-gray-500 "
              disabled={isSubmitting}
            />
            <LabelError
              msg={errors.endereco?.message as string}
              hasError={errors.endereco as any}
            />
          </div>
          <div className="mb-5">
            <select
              placeholder="Tipo"
              id="tipo"
              style={errors.subcategoria_id && { border: '1px solid red' }}
              {...register('subcategoria_id', {
                required: { message: 'Campo obrigatório', value: true },
              })}
              className="w-full py-5 h-20 bg-transparent border rounded-lg px-6 text-base text-brand-gray-400 placeholder:text-brand-gray-500 "
              disabled={isSubmitting}
            >
              <option selected disabled={true}>
                Escolha a categoria
              </option>
              {categories?.results.map((categorie) => {
                return (
                  <option key={categorie.id} value={categorie.id}>
                    {categorie.nome}
                  </option>
                )
              })}
            </select>
            <LabelError
              msg={errors.subcategoria_id?.message as string}
              hasError={errors.subcategoria_id as any}
            />
          </div>
          <div className="my-2">
            <div className=" w-full h-full">
              <h4 className="text-2xl mt-2 text-brand-gray-600">Localização</h4>
              <p className="text-brand-gray-600">
                Selecione o mapa para adicionar a localização
              </p>
              <div className="relative">
                <img
                  className="w-full h-56 mt-2 rounded-lg"
                  src={`https://maps.googleapis.com/maps/api/staticmap?zoom=17&format=png&size=386x225&markers=color:red%7C${location.lat},${location.lon}&maptype=satellite&key=AIzaSyCxfIUUn01z3j79gsuSkGio6vfd3lTpMvg&region=BR&center=${location.lat},${location.lon}`}
                  alt=""
                />
                <Link
                  href={`/add-new-place/map?lat=${location.lat}&lon=${location.lon}`}
                >
                  <button className="flex items-center absolute bottom-3 left-3 drop-shadow-md rounded-full text-black bg-white py-4 px-5 text-base">
                    <Icon
                      fontSize={20}
                      className="mr-2 text-brand-green-300"
                      icon="uil:map-marker-edit"
                    />{' '}
                    Editar Local do mapa
                  </button>
                </Link>
              </div>
              {/* {location.lat && location.lon && (
                <Link
                  href={`/add-new-place/map?lat=${location.lat}&lon=${location.lon}`}
                >
                  <GoogleMapsPlaceLocation
                    lat={location.lat}
                    lon={location.lon}
                  />
                </Link>
              )} */}
            </div>
          </div>
          <div>
            <ButtonPrimary>Adicionar Nova Localidade</ButtonPrimary>
          </div>
        </form>
      </section>

      <BottomNavigation />
    </main>
  )
}

export default AddNewPlace

