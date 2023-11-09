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

import { useForm } from 'react-hook-form'
import { errorHandler } from '../../services/errorHandler'
import { LabelError } from '../../components/Forms/components/LabelError'
import { api } from '../../services/axios'
import toast from 'react-hot-toast'
import { HeaderNavigation } from '../../components/HeaderNavigation'
import { useFetch } from '../../services/useFetch'
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

  useEffect(() => {
    userIsLogged()
  }, [])

  function userIsLogged() {
    const token = Cookies.get('token')
    if (!token) return router.push('/login')
  }

  async function handleUpdateProfile(data: FormProps) {
    try {
      const response = await api.put('/cliente/alterar', {
        password: data.password,
        password_confirmation: data.password_confirmation,
      })
      toast.success('Alteração realizada com sucesso')
      reset({
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
        <h3 className="text-2xl text-brand-gray-600">Alterar Senha</h3>
        <form
          action=""
          className="mt-6 flex justify-between flex-col  "
          onSubmit={handleSubmit(handleUpdateProfile)}
        >
          <div>
            <div className="mb-5 ">
              <input
                placeholder="Senha"
                type="text"
                id="password"
                style={errors.password && { border: '1px solid red' }}
                {...register('password', {
                  required: { message: 'Campo obrigatório', value: true },
                })}
                className="w-full py-5 h-20 px-6 text-2xl placeholder:text-brand-gray-500 "
                disabled={isSubmitting}
              />
              <LabelError
                msg={errors.password?.message as string}
                hasError={errors.password as any}
              />
            </div>
            <div className="mb-5">
              <input
                placeholder="Confirmar Senha"
                type="text"
                autoComplete="off"
                id="password_confirmation"
                style={
                  errors.password_confirmation && { border: '1px solid red' }
                }
                {...register('password_confirmation', {
                  required: { message: 'Campo obrigatório', value: true },
                })}
                className="w-full py-5 h-20 px-6 text-2xl placeholder:text-brand-gray-500 "
                disabled={isSubmitting}
              />
              <LabelError
                msg={errors.password_confirmation?.message as string}
                hasError={errors.password_confirmation as any}
              />
            </div>
          </div>

          <div className=" w-full flex justify-center flex-col ">
            <button
              type="submit"
              className="bg-brand-yellow-300 rounded-lg px-3 py-5 mt-3 w-full text-center "
            >
              {!isSubmitting ? (
                'Trocar Senha'
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

export default ProfileUpdate

