import React from 'react'
import { TopNavigation } from '../../components/TopNavigation'
import Container from '../../components/Partials/Container'
import { BottomNavigation } from '../../components/BottomNavigation'
import { TextAreaForm } from '../../components/Forms/components/TextAreaForm'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { errorHandler } from '../../services/errorHandler'
import { TextForm } from '../../components/Forms/components/TextForm'
import ButtonPrimary from '../../components/Buttons/ButtonPrimary'

interface FormProps {
  company_name: string
  lead_name: string
  phone_number: string
}

const Prospeccao = () => {
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
      /*   const response = await api.post('/login', {
        company_name,
        lead_name,
        phone_number,
      })
 */
      reset({ company_name: '', lead_name: '', phone_number: '' })
    } catch (error: any) {
      errorHandler(error)
    }
  }
  return (
    <>
      <TopNavigation />
      <main className="w-full min-h-[500px] justify-center  flex">
        <Container>
          <div className="w-full flex justify-center my-10">
            <strong className="text-brand-blue-800 font-bold text-center text-3xl mt-10">
              Prospecção
            </strong>
          </div>
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
                name={'company_name'}
                register={register}
                disabled={isSubmitting}
                required={true}
              />
              <TextForm
                placeholder="Telefone"
                errors={errors}
                name={'company_name'}
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
          <div className="flex flex-col items-center w-full space-y-6"></div>
        </Container>
      </main>

      <BottomNavigation />
    </>
  )
}

export default Prospeccao

