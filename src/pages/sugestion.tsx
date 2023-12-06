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
import ButtonPrimary from '../components/Buttons/ButtonPrimary'
interface FormProps {
  email: string
  descricao: string
  assunto: string
}

const Sugestion: NextPage = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>()

  async function hadleSendAnSugestion(data: FormProps) {
    try {
      const response = await api.post('/contato', {
        email: data.email,
        assunto: data.assunto,
        descricao: data.descricao,
      })
      toast.success(response.data.message)
      reset({
        email: '',
        assunto: '',
        descricao: '',
      })
      router.push('/configuration')
    } catch (error) {
      console.log(error)
      errorHandler(error)
    }
  }

  const types = ['Sugestão', 'Dúvida', 'Reportar Bug', 'Outros']
  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/configuration" />
      <section className="mx-4 my-4">
        <h3 className="text-2xl text-brand-gray-600">Envie uma dúvida!</h3>

        <form
          action=""
          onSubmit={handleSubmit(hadleSendAnSugestion)}
          className="w-full flex flex-col gap-3"
        >
          <div className="mt-5 ">
            <input
              placeholder="Seu Email (Obrigatório)"
              type="text"
              id="email"
              style={errors.email && { border: '1px solid red' }}
              {...register('email', {
                required: { message: 'Campo obrigatório', value: true },
              })}
              className="w-full py-5 h-20 px-6 text-base placeholder:text-brand-gray-500 "
              disabled={isSubmitting}
            />
            <LabelError
              msg={errors.email?.message as string}
              hasError={errors.email as any}
            />
          </div>
          <div className="">
            <select
              placeholder="Tipo"
              id="tipo"
              style={errors.assunto && { border: '1px solid red' }}
              {...register('assunto', {
                required: { message: 'Campo obrigatório', value: true },
              })}
              className="w-full  h-20 bg-transparent border rounded-lg px-6 text-base text-brand-gray-400 placeholder:text-brand-gray-500 "
              disabled={isSubmitting}
            >
              <option selected disabled={true} className="hidden">
                Escolha o assunto
              </option>
              {types?.map((type) => {
                return (
                  <option key={type} value={type}>
                    {type}
                  </option>
                )
              })}
            </select>
            <LabelError
              msg={errors.assunto?.message as string}
              hasError={errors.assunto as any}
            />
          </div>
          <textarea
            id="descricao"
            {...register('descricao', {
              required: { message: 'Campo obrigatório', value: true },
            })}
            placeholder="Escreva sua dúvida..."
            rows={5}
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <ButtonPrimary disabled={isSubmitting} type="submit">
            Enviar
          </ButtonPrimary>
        </form>
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Sugestion

