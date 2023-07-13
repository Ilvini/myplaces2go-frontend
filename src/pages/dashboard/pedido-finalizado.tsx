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
import Link from 'next/link'

interface FormProps {
  company_name: string
  lead_name: string
  phone_number: string
}

const PedidoFinalizado = () => {
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
          <div className="flex flex-col justify-center h-full mt-28">
            <div>
              <img
                src="/img/check.png"
                className="mx-auto"
                alt="imagem ilustração pedido finalizado"
              />
              <div className="mx-auto max-w-[220px] flex justify-center my-10 flex-col items-center">
                <strong className="text-brand-gray-600 font-bold text-center text-4xl mt-10 ">
                  Seu pedido foi finalizado com sucesso!
                </strong>
                <p className="mt-4 text-center text-brand-gray-600">
                  Verifique seu Histórico de Pedidos para confirmar
                </p>
              </div>
            </div>

            <div className="mt-5 items-end max-w-[300px] mx-auto w-full">
              <Link href="/dashboard/historico-pedidos">
                <ButtonPrimary type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Ver Histórico de Pedidos'}
                </ButtonPrimary>
              </Link>
            </div>
          </div>
        </Container>
      </main>

      {/*  <BottomNavigation /> */}
    </>
  )
}

export default PedidoFinalizado

