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
import useSWR from 'swr'

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
  const [showPassword, setShowPassword] = React.useState(false)
  useEffect(() => {
    userIsLogged()
  }, [])

  function userIsLogged() {
    const token = Cookies.get('token')
    if (!token) return router.push('/login')
  }

  async function handleChangePassword(data: FormProps) {
    try {
      const response = await api.put(
        '/cliente/alterar-senha',
        {
          password: data.password,
          password_confirmation: data.password_confirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      )
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
          onSubmit={handleSubmit(handleChangePassword)}
        >
          <div>
            <div className="mb-5 relative">
              <input
                placeholder="Senha"
                type={showPassword ? 'text' : 'password'}
                id="password"
                style={errors.password && { border: '1px solid red' }}
                {...register('password', {
                  required: { message: 'Campo obrigatório', value: true },
                })}
                className="w-full py-5 h-20 px-6 text-xl placeholder:text-brand-gray-500 "
                disabled={isSubmitting}
              />
              <span
                className="absolute right-4 top-6"
                onClick={() => setShowPassword((state) => !state)}
              >
                {showPassword ? (
                  <Icon
                    icon="mdi:eye"
                    fontSize={32}
                    className="text-brand-gray-600"
                  />
                ) : (
                  <Icon
                    icon="ooui:eye-closed"
                    fontSize={32}
                    className="text-brand-gray-600"
                  />
                )}
              </span>
              <LabelError
                msg={errors.password?.message as string}
                hasError={errors.password as any}
              />
              <p className="text-brand-gray-500">Mínimo 8 caracteres</p>
            </div>
            <div className="mb-5 relative">
              <input
                placeholder="Confirmar Senha"
                type={showPassword ? 'text' : 'password'}
                autoComplete="off"
                id="password_confirmation"
                style={
                  errors.password_confirmation && { border: '1px solid red' }
                }
                {...register('password_confirmation', {
                  required: { message: 'Campo obrigatório', value: true },
                })}
                className="w-full py-5 h-20 px-6 text-xl placeholder:text-brand-gray-500 "
                disabled={isSubmitting}
              />
              <span
                className="absolute right-4 top-6"
                onClick={() => setShowPassword((state) => !state)}
              >
                {showPassword ? (
                  <Icon
                    icon="mdi:eye"
                    fontSize={32}
                    className="text-brand-gray-600"
                  />
                ) : (
                  <Icon
                    icon="ooui:eye-closed"
                    fontSize={32}
                    className="text-brand-gray-600"
                  />
                )}
              </span>
              <LabelError
                msg={errors.password_confirmation?.message as string}
                hasError={errors.password_confirmation as any}
              />
            </div>
            <p className="text-brand-gray-500">Mínimo 8 caracteres</p>
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

