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
import { useCartStore } from '../../../stores/cartStore'
const Carrinho = () => {
  const router = useRouter()

  const cart = useCartStore((state) => state.cart)

  return (
    <>
      <TopNavigation hasBackPage={true} />
      <main className="w-full min-h-[500px] justify-center  flex mt-28">
        <Container>
          <div className="w-full flex justify-center items-center mt-8 mb-10 flex-col">
            {cart && cart.length > 0 && (
              <p className="text-center text-xl">Supermercado Barato</p>
            )}

            <strong className="text-brand-blue-800 font-bold text-center text-3xl mt-0 mb-4">
              Carrinho
            </strong>

            <div className="mt-2 space-y-2 md:overflow-auto md:grid md:grid-cols-4 md:gap-4 md:flex-wrap  overflow-scroll max-h-[500px]">
              {cart &&
                cart?.map((product) => {
                  return (
                    <CartCard
                      image_url={product.imagem_url}
                      id={product.id}
                      price={product.valor}
                      title={product.nome}
                      hasAddButton={false}
                    />
                  )
                })}
              {/* <CartCard
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
              /> */}
            </div>
            {cart && cart.length > 0 && (
              <div className=" max-w-[300px] mx-auto w-full">
                <ButtonPrimary>Finalizar Pedido</ButtonPrimary>
              </div>
            )}
            {cart && cart.length === 0 && (
              <div className="flex items-center flex-col">
                <img src="/img/carrinho_vazio.png" alt="" className="w-52" />
                <p className="text-2xl text-brand-gray-600 max-w-[200px] text-center mt-4">
                  Sem Produtos adicionados
                </p>
              </div>
            )}
          </div>
        </Container>
      </main>

      <BottomNavigation />
    </>
  )
}

export default Carrinho

