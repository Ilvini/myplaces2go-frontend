import React from 'react'
import { TopNavigation } from '../../../components/TopNavigation'
import Container from '../../../components/Partials/Container'
import { BottomNavigation } from '../../../components/BottomNavigation'
import { TextAreaForm } from '../../../components/Forms/components/TextAreaForm'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { errorHandler } from '../../../services/errorHandler'
import { TextForm } from '../../../components/Forms/components/TextForm'
import ButtonPrimary from '../../../components/Buttons/ButtonPrimary'
import { CartCard } from '../../../components/Cards/CartCard'

interface FormProps {
  company_name: string
  lead_name: string
  phone_number: string
}

const Carrinho = () => {
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
          <div className="w-full flex justify-center mt-8 mb-10 flex-col">
            <p className="text-center text-xl">Supermercado Barato</p>
            <strong className="text-brand-blue-800 font-bold text-center text-3xl mt-0 mb-4">
              Carrinho
            </strong>
            <div className="mt-2 space-y-2 md:overflow-auto md:grid md:grid-cols-4 md:gap-4 md:flex-wrap  overflow-scroll max-h-[500px]">
              <CartCard
                image_url="/img/produto.png"
                id="12312312"
                price={10}
                title="Saco de lixo 100 lts katalixo c/05 und"
                hasAddButton={false}
              />
              <CartCard
                image_url="/img/produto.png"
                id="12312312"
                price={10}
                title="Saco de lixo 100 lts katalixo c/05 und"
                hasAddButton={false}
              />
              <CartCard
                image_url="/img/produto.png"
                id="12312312"
                price={10}
                title="Saco de lixo 100 lts katalixo c/05 und"
                hasAddButton={false}
              />
              <CartCard
                image_url="/img/produto.png"
                id="12312312"
                price={10}
                title="Saco de lixo 100 lts katalixo c/05 und"
                hasAddButton={false}
              />
              <CartCard
                image_url="/img/produto.png"
                id="12312312"
                price={10}
                title="Saco de lixo 100 lts katalixo c/05 und"
                hasAddButton={false}
              />
              <CartCard
                image_url="/img/produto.png"
                id="12312312"
                price={10}
                title="Saco de lixo 100 lts katalixo c/05 und"
                hasAddButton={false}
              />
            </div>
            <div className=" max-w-[300px] mx-auto w-full">
              <ButtonPrimary>Finalizar Pedido</ButtonPrimary>
            </div>
          </div>
        </Container>
      </main>

      <BottomNavigation />
    </>
  )
}

export default Carrinho

