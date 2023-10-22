/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import BottomNavigation from '../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useFetch } from '../services/useFetch'
import Cookies from 'js-cookie'
import { HeaderNavigation } from '../components/HeaderNavigation'
import { useForm } from 'react-hook-form'
import { LabelError } from '../components/Forms/components/LabelError'
interface FormProps {
  subcategoria_id: number
  nome: string
  endereco: string
  lat: number
  lon: number
}

interface IResponse {
  results: {
    id: number
    nome: string
  }[]
  error: boolean
  message: string
}
const Profile: NextPage = () => {
  const router = useRouter()

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
    try {
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/profile" />
      <section className="mx-4 my-4">
        <h3 className="text-brand-gray-600 text-xl">Adicionar novo Lugar</h3>
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
              <option defaultValue="Escolha a categoria" disabled={true}>
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
        </form>
        <div className="my-2"></div>
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Profile

