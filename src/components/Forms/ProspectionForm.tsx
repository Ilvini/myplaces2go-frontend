import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { errorHandler } from '../../services/errorHandler'
import { TextForm } from './components/TextForm'
import ButtonPrimary from '../Buttons/ButtonPrimary'
import { TextFormMask } from './components/TextFormMask'

export const ProspectionForm = () => {
  interface FormProps {
    company_name: string
    lead_name: string
    phone_number: string
  }

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>()

  async function handleSendForm({
    company_name,
    lead_name,
    phone_number,
  }: FormProps) {
    try {
      console.log(company_name, lead_name, phone_number)
      /*   const response = await api.post('/login', {
              company_name,
              lead_name,
              phone_number,
            })
       */
      setTimeout(() => {
        router.push('/dashboard/prospeccao-finalizada')
      }, 2000)
      reset({ company_name: '', lead_name: '', phone_number: '' })
    } catch (error: any) {
      errorHandler(error)
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleSendForm)}
      action=""
      className=" max-w-[300px] mx-auto flex flex-col  h-full"
    >
      <div className="space-y-4">
        <TextForm
          placeholder="Nome da empresa"
          errors={errors}
          name={'company_name'}
          register={register}
          disabled={isSubmitting}
          required={true}
        />
        <TextForm
          placeholder="Nome do contato"
          errors={errors}
          name={'lead_name'}
          register={register}
          disabled={isSubmitting}
          required={true}
        />
        <TextFormMask
          mask="(99) 99999-9999"
          placeholder="Telefone"
          errors={errors}
          name={'phone_number'}
          register={register}
          disabled={isSubmitting}
          required={true}
        />
      </div>
      <div className="mt-5 items-end">
        <ButtonPrimary type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Finalizar Cadastro'}
        </ButtonPrimary>
      </div>
    </form>
  )
}

