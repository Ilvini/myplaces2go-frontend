/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import BottomNavigation from '../../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useFetch } from '../../services/useFetch'
import { useForm } from 'react-hook-form'
import { errorHandler } from '../../services/errorHandler'
import { LabelError } from '../../components/Forms/components/LabelError'
import { api } from '../../services/axios'
import toast from 'react-hot-toast'
import { HeaderNavigation } from '../../components/HeaderNavigation'
import { TextFormMask } from '../../components/Forms/components/TextFormMask'
import Cookies from 'js-cookie'
interface FormProps {
  nome: string
  email: string
  celular: string
  password: string
  password_confirmation: string
}

const ProfileUpdate: NextPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>()

  const { data: me } = useFetch('/cliente/me', Cookies.get('token'))
  console.log(me)

  async function handleUpdateProfile(data: FormProps) {
    try {
      const response = await api.put('/cliente/alterar', {
        nome: data.nome,
        email: data.email,
        celular: data.celular,
      })
      toast.success('Alteração realizada com sucesso')
      reset({
        nome: '',
        email: '',
        celular: '',
        password: '',
        password_confirmation: '',
      })
      router.push('/profile')
    } catch (error) {
      console.log(error)
      errorHandler(error)
    }
  }
  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/profile" />
      <section className="mx-4 my-4">
        <h3 className="text-2xl text-brand-gray-600">Alterar perfil</h3>
        <form
          action=""
          className="mt-6 flex justify-between flex-col  "
          onSubmit={handleSubmit(handleUpdateProfile)}
        >
          <div>
            <div className="mb-5 ">
              <input
                placeholder="Nome"
                defaultValue={me?.results.nome}
                type="text"
                id="nome"
                style={errors.nome && { border: '1px solid red' }}
                {...register('nome', {
                  required: { message: 'Campo obrigatório', value: true },
                })}
                className="w-full py-5 h-20 px-6 text-2xl placeholder:text-brand-gray-500 "
                disabled={isSubmitting}
              />
              <LabelError
                msg={errors.nome?.message as string}
                hasError={errors.nome as any}
              />
            </div>
            <div className="mb-5">
              <input
                placeholder="Email"
                type="text"
                autoComplete="off"
                id="email"
                defaultValue={me?.results.email}
                style={errors.email && { border: '1px solid red' }}
                {...register('email', {
                  required: { message: 'Campo obrigatório', value: true },
                })}
                className="w-full py-5 h-20 px-6 text-2xl placeholder:text-brand-gray-500 "
                disabled={isSubmitting}
              />
              <LabelError
                msg={errors.email?.message as string}
                hasError={errors.email as any}
              />
            </div>
            <div className="mb-5">
              <TextFormMask
                mask="(99) 99999-9999"
                defaultValue={me?.results.celular}
                placeholder="Celular"
                errors={errors}
                name={'celular'}
                register={register}
                disabled={isSubmitting}
                required={true}
              />
            </div>
          </div>

          <div className=" w-full flex justify-center flex-col ">
            <button
              type="submit"
              className="bg-brand-yellow-300 rounded-lg px-3 py-5 mt-3 w-full text-center "
            >
              {!isSubmitting ? (
                'Enviar'
              ) : (
                <Icon icon="mingcute:loading-3-fill" />
              )}
            </button>
          </div>
        </form>
      </section>

      {/*   <BottomNavigation /> */}
    </main>
  )
}

export default ProfileUpdate

