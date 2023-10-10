/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Ratting } from '../../components/Ratting'
import BottomNavigation from '../../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useFetch } from '../../services/useFetch'
import { useForm } from 'react-hook-form'
import { errorHandler } from '../../services/errorHandler'
import { LabelError } from '../../components/Forms/components/LabelError'
interface FormProps {
  tipo: string
  titulo: string
  descricao: string
}

const Favorite: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>()

  const { data: types } = useFetch('/tipos-informacoes-adicionais')
  console.log(types)
  async function handleAddCuriosity(data: FormProps) {
    try {
    } catch (error) {
      console.log(error)
      errorHandler(error)
    }
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
        <form
          action=""
          className="mt-10 flex justify-between flex-col  "
          onSubmit={handleSubmit(handleAddCuriosity)}
        >
          <div>
            <div className="mb-5 ">
              <input
                placeholder="Título"
                type="text"
                id="titulo"
                style={errors.titulo && { border: '1px solid red' }}
                {...register('titulo', {
                  required: { message: 'Campo obrigatório', value: true },
                })}
                className="w-full py-5 h-20 px-6 text-2xl placeholder:text-brand-gray-500 "
                disabled={isSubmitting}
              />
              <LabelError
                msg={errors.titulo?.message as string}
                hasError={errors.titulo as any}
              />
            </div>
            <div className="mb-5">
              <select
                placeholder="Tipo"
                id="tipo"
                style={errors.tipo && { border: '1px solid red' }}
                {...register('tipo', {
                  required: { message: 'Campo obrigatório', value: true },
                })}
                className="w-full py-5 h-20 px-6 text-2xl placeholder:text-brand-gray-500 "
                disabled={isSubmitting}
              >
                <option defaultValue="Escolha o tipo"></option>
                {types?.map((type) => {
                  return <option value={type.uuid}>{type.nome}</option>
                })}
              </select>
              <LabelError
                msg={errors.tipo?.message as string}
                hasError={errors.tipo as any}
              />
            </div>

            <div className="mb-5">
              <textarea
                placeholder="Descricao"
                id="descricao"
                rows={10}
                style={errors.descricao && { border: '1px solid red' }}
                {...register('descricao', {
                  required: { message: 'Campo obrigatório', value: true },
                })}
                className="w-full py-5 h-20 px-6 text-2xl placeholder:text-brand-gray-500 "
                disabled={isSubmitting}
              />
              <LabelError
                msg={errors.descricao?.message as string}
                hasError={errors.descricao as any}
              />
            </div>
          </div>

          <div className=" w-full flex justify-center flex-col mt-32">
            <button
              type="submit"
              className="bg-brand-yellow-300 rounded-lg px-3 py-5 mt-3 w-full text-center "
            >
              {!isSubmitting ? (
                '  Enviar Curiosidade'
              ) : (
                <Icon icon="mingcute:loading-3-fill" />
              )}
            </button>
          </div>
        </form>
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Favorite

