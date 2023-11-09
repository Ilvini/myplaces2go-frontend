/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import BottomNavigation from '../../../components/Partials/BottomNavigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { errorHandler } from '../../../services/errorHandler'
import { LabelError } from '../../../components/Forms/components/LabelError'
import { api } from '../../../services/axios'
import toast from 'react-hot-toast'
import { HeaderNavigation } from '../../../components/HeaderNavigation'

interface FormProps {
  password: string
  password_confirmation: string
}

const Forgetpassword: NextPage = () => {
  const router = useRouter()
  const { id, token } = router.query

  console.log(id, token)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>()

  async function handleChangePassword(data: FormProps) {
    try {
      const response = await api.put(`/recuperar-senha/${id}/${token}`, {
        password: data.password,
        password_confirmation: data.password_confirmation,
      })
      toast.success('Email enviado com sucesso')
      reset({
        password: '',
        password_confirmation: '',
      })
      router.push('/login')
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
      errorHandler(error)
    }
  }
  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/login" />
      <section className="mx-4 my-4">
        <h3 className="text-3xl mb-4 text-brand-gray-600">Trocar Senha</h3>
        <p className="text-brand-gray-900 text-xl">
          Preencha os campos abaixo para trocar a senha.
        </p>
        <form
          action=""
          className="mt-6 flex justify-between flex-col  "
          onSubmit={handleSubmit(handleChangePassword)}
        >
          <div>
            <div className="mb-5 ">
              <input
                placeholder="Senha"
                type="password"
                id="password"
                style={errors.password && { border: '1px solid red' }}
                {...register('password', {
                  required: { message: 'Campo obrigatório', value: true },
                })}
                className="w-full py-5 h-20 px-6 text-xl placeholder:text-brand-gray-500 "
                disabled={isSubmitting}
              />
              <LabelError
                msg={errors.password?.message as string}
                hasError={errors.password as any}
              />
            </div>
            <div className="mb-5 ">
              <input
                placeholder="Confirmar Senha"
                type="password"
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
                'Enviar'
              ) : (
                <Icon icon="mingcute:loading-3-fill" />
              )}
            </button>
          </div>
        </form>
      </section>

      {/*    <BottomNavigation /> */}
    </main>
  )
}

export default Forgetpassword

