import React, { useEffect, useState } from 'react'
import Title from '../../../components/Forms/components/Title'
import BottomNavigation from '../../../components/Partials/BottomNavigation'
import Container from '../../../components/Partials/Container'
import DashboardButton from '../../../components/Partials/DashboardButton'
import Header from '../../../components/Partials/Header'
import { api, api_contract } from '../../../services/axios'
import { idbClientFormUpdate } from '../../../services/idbClient'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { checkAuthorization } from '../../../services/checkAuthorization'
import Router, { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import DashboardButtonPlus from '../../../components/Partials/DashboardButtonPlus'
import Link from 'next/link'
import { TextForm } from '../../../components/Forms/components/TextForm'
import { useForm } from 'react-hook-form'
import ButtonPrimary from '../../../components/Buttons/ButtonPrimary'
import { errorHandler } from '../../../services/errorHandler'
import { successHandler } from '../../../services/successHandler'
import { Label } from '../../../components/Forms/components/Label'

export default function Dashboard() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm()

  async function createCategory(props: any) {
    try {
      const response = await api.post('/pastas', {
        nome: props.name,
        cor: props.cor,
      })
      successHandler(response)
      router.push('/dashboard/pastas')
    } catch (error) {
      errorHandler(error)
    }
  }

  useEffect(() => {
    checkAuthorization()
  }, [router.pathname])

  return (
    <div className="bg-gradient-to-b from-slate-100 to-slate-400 h-screen">
      <Header />
      <Container>
        <div className="mt-3 max-w-sm mx-auto bg-slate-200 h-fit p-5 shaodw rounded-md">
          <Title text={`Cadastrar nova Pasta`} />
          <form onSubmit={handleSubmit(createCategory)}>
            <div className="flex gap-2">
              <div className="w-full">
                <TextForm
                  label={'Nome da pasta'}
                  name={'name'}
                  register={register}
                  errors={errors}
                />
              </div>
              <div>
                <Label name={'cor'} label={'Cor da pasta'} />
                <div className="flex items-center gap-2 mt-3">
                  <div
                    className="h-10 w-10 flex items-center justify-center border rounded-md"
                    style={{ backgroundColor: watch('cor') }}
                  >
                    <Icon
                      icon="heroicons:folder"
                      className="w-3 h-3 text-white"
                    />
                  </div>
                  <input
                    type="color"
                    className="h-10 aspect-square rounded-md border border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-sky-500"
                    {...register('cor')}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <ButtonPrimary disabled={isSubmitting}>
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </Container>
      <BottomNavigation />
    </div>
  )
}
