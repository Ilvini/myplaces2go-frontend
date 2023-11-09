/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'

import BottomNavigation from '../../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { errorHandler } from '../../services/errorHandler'
import { LabelError } from '../../components/Forms/components/LabelError'
import { api } from '../../services/axios'
import toast from 'react-hot-toast'
import { HeaderNavigation } from '../../components/HeaderNavigation'

interface FormProps {
  email: string
}

const ChangePassword: NextPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>()

  async function handleSendEmailToChangePassword(data: FormProps) {
    try {
      const response = await api.post('/recuperar-senha', {
        email: data.email,
      })
      toast.success('Email enviado com sucesso')
      reset({
        email: '',
      })
      router.push('/login')
    } catch (error) {
      console.log(error)
      errorHandler(error)
    }
  }
  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/login" />
      <section className="mx-4 my-4">
        <h3 className="text-3xl mb-4 text-brand-gray-600">
          Esqueci minha senha
        </h3>
        <p className="text-brand-gray-900 text-xl">
          Será enviado um email para sua conta. acesse para trocar a senha.
        </p>
        <form
          action=""
          className="mt-6 flex justify-between flex-col  "
          onSubmit={handleSubmit(handleSendEmailToChangePassword)}
        >
          <div>
            <div className="mb-5 ">
              <input
                placeholder="Preencha seu email"
                type="text"
                id="password"
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

      {/*      <BottomNavigation /> */}
    </main>
  )
}

export default ChangePassword

