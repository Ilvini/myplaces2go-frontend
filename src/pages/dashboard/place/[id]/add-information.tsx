/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Ratting } from '../../../../components/Ratting'
import BottomNavigation from '../../../../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useFetch } from '../../../../services/useFetch'
import { useForm } from 'react-hook-form'
import { errorHandler } from '../../../../services/errorHandler'
import { LabelError } from '../../../../components/Forms/components/LabelError'
import { api } from '../../../../services/axios'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import locationError from '../../../../helpers/handlerErrorGeoLocation'
import { HeaderNavigation } from '../../../../components/HeaderNavigation'
interface FormProps {
  tipo: string
  titulo: string
  descricao: string
}
interface ITypes {
  error: boolean
  results: string[]
  message: string
}
const AddInformation: NextPage = () => {
  const { id } = useRouter().query
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>()

  const router = useRouter()

  const { data: types } = useFetch<ITypes>('/tipos-informacoes-adicionais')
  console.log(types)
  async function handleAddCuriosity(data: FormProps) {
    try {
      const response = await api.post(
        `/pontos-turisticos/${id}/informacoes-adicionais/novo`,
        {
          tipo: data.tipo,
          titulo: data.titulo,
          descricao: data.descricao,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      )
      toast.success(response.data.message)
      router.back()

      reset(
        {
          tipo: '',
          titulo: '',
          descricao: '',
        },
        {
          keepValues: false,
        }
      )
    } catch (error) {
      console.log(error)
      errorHandler(error)
    }
  }
  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/" />
      <section className="mx-4 my-4">
        <h2 className="text-2xl text-brand-gray-600">Adicionar Informação</h2>
        <form
          action=""
          className="mt-4 flex justify-between flex-col  "
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
                className="w-full py-5 h-20 px-6 text-base placeholder:text-brand-gray-500 "
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
                className="w-full py-5 h-20 bg-transparent border rounded-lg px-6 text-base text-brand-gray-400 placeholder:text-brand-gray-500 "
                disabled={isSubmitting}
              >
                <option selected disabled={true}>
                  Escolha o Tipo
                </option>
                {types?.results.map((type) => {
                  return (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  )
                })}
              </select>
              <LabelError
                msg={errors.tipo?.message as string}
                hasError={errors.tipo as any}
              />
            </div>

            <div className="mb-5">
              {/* <textarea
                placeholder="Descricao"
                id="descricao"
                cols={10}
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
              /> */}
              <textarea
                id="descricao"
                placeholder="Deixe seu comentário..."
                rows={5}
                className="w-full border p-3 rounded-lg "
                style={errors.descricao && { border: '1px solid red' }}
                {...register('descricao', {
                  required: { message: 'Campo obrigatório', value: true },
                })}
                disabled={isSubmitting}
              ></textarea>
              <LabelError
                msg={errors.descricao?.message as string}
                hasError={errors.descricao as any}
              />
            </div>
          </div>

          <div className=" w-full flex justify-center flex-col ">
            <button
              type="submit"
              className="bg-brand-yellow-300 flex items-center justify-center rounded-lg py-5  w-full text-center "
            >
              {!isSubmitting ? (
                '  Enviar'
              ) : (
                <Icon
                  color="white"
                  fontSize={24}
                  icon="mingcute:loading-3-fill"
                />
              )}
            </button>
          </div>
        </form>
      </section>

      <BottomNavigation />
    </main>
  )
}

export default AddInformation

