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

export default function Page() {
  const router = useRouter()
  const params = router.query

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm()

  async function createItem(props: any) {
    try {
      const response = await api.post('/fichas', {
        pasta_id: params.pasta_id,
        nome: props.nome,
        descricao: props.descricao,
      })
      successHandler(response)
      router.push(`/dashboard/pastas/${params.pasta_id}/fichas`)
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
          <Title text={`Cadastrar nova ficha`} />
          <form onSubmit={handleSubmit(createItem)}>
            <div>
              <div className="w-full">
                <TextForm
                  label={'Título'}
                  name={'nome'}
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="w-full">
                <TextForm
                  label={'Descrição'}
                  name={'descricao'}
                  register={register}
                  errors={errors}
                />
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
