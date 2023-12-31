/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import BottomNavigation from '../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useFetch } from '../services/useFetch'
import { useForm } from 'react-hook-form'
import { errorHandler } from '../services/errorHandler'
import { LabelError } from '../components/Forms/components/LabelError'
import { api } from '../services/axios'
import toast from 'react-hot-toast'
import { HeaderNavigation } from '../components/HeaderNavigation'
import Cookies from 'js-cookie'
import { TextFormMask } from '../components/Forms/components/TextFormMask'
interface FormProps {
  nome: string
  email: string
  celular: string
  password: string
  password_confirmation: string
}

const Register: NextPage = () => {
  const [termos, setTermos] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>()
  const [showPassword, setShowPassword] = useState(false)
  async function handleLoginOnRegister(email: string, password: string) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      })

      Cookies.set('token', response.data.results.token)
      router.push('/')
    } catch (error) {
      console.log(error)
      errorHandler(error)
    }
  }

  async function handleRegister(data: FormProps) {
    try {
      const response = await api.post('/cliente/novo', {
        nome: data.nome,
        email: data.email,
        celular: data.celular,
        password: data.password,
        password_confirmation: data.password_confirmation,
      })
      toast.success('Cadastro realizado com sucesso')
      reset({
        nome: '',
        email: '',
        celular: '',
        password: '',
        password_confirmation: '',
      })

      handleLoginOnRegister(data.email, data.password)
    } catch (error) {
      console.log(error)
      errorHandler(error)
    }
  }
  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/login" />
      <section className="mx-4 my-4">
        <form
          action=""
          className="mt-10 flex justify-between flex-col  "
          onSubmit={handleSubmit(handleRegister)}
        >
          <div>
            <div className="mb-5 ">
              <input
                placeholder="Nome"
                type="text"
                id="nome"
                style={errors.nome && { border: '1px solid red' }}
                {...register('nome', {
                  required: { message: 'Campo obrigatório', value: true },
                })}
                className="w-full py-5 h-20 px-6 text-xl placeholder:text-brand-gray-500 "
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
                style={errors.email && { border: '1px solid red' }}
                {...register('email', {
                  required: { message: 'Campo obrigatório', value: true },
                })}
                className="w-full py-5 h-20 px-6 text-xl placeholder:text-brand-gray-500 "
                disabled={isSubmitting}
              />
              <LabelError
                msg={errors.email?.message as string}
                hasError={errors.email as any}
              />
            </div>
            <div className="mb-5">
              {/*  <input
                placeholder="Celular"
                type="text"
                id="celular"
                style={errors.celular && { border: '1px solid red' }}
                {...register('celular', {
                  required: { message: 'Campo obrigatório', value: true },
                })}
                className="w-full py-5 h-20 px-6 text-xl placeholder:text-brand-gray-500 "
                disabled={isSubmitting}
              />
              <LabelError
                msg={errors.celular?.message as string}
                hasError={errors.celular as any}
              /> */}
              <TextFormMask
                mask="(99) 99999-9999"
                placeholder="Celular"
                errors={errors}
                name={'celular'}
                register={register}
                disabled={isSubmitting}
                required={true}
              />
            </div>
            <div className="mb-5 relative">
              <input
                placeholder="Senha"
                autoComplete="off"
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
              <p className="text-brand-gray-500">Mínimo 8 caracteres</p>
            </div>
          </div>
          <label htmlFor="corcordo">
            <input
              type="checkbox"
              id="corcordo"
              className="mr-2"
              defaultChecked={termos}
              onChange={() => setTermos((state) => !state)}
            />
            Aceito os{' '}
            <Link
              className="text-brand-gray-900 font-bold"
              href="/termos-de-uso"
            >
              termos de uso
            </Link>{' '}
            e{' '}
            <Link
              className="text-brand-gray-900 font-bold"
              href="/politica-de-privacidade"
            >
              Política de Privacidade
            </Link>
          </label>
          <div className=" w-full flex justify-center flex-col ">
            <button
              disabled={!termos}
              type="submit"
              className="bg-brand-yellow-300 disabled:bg-brand-gray-400  disabled:text-white/50 rounded-lg px-3 py-5 mt-5 w-full text-center "
            >
              {!isSubmitting ? (
                '  cadastra-se'
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

export default Register

