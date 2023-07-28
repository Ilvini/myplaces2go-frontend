import React from 'react'
import Container from '../../../components/Partials/Container'
import { useRouter } from 'next/router'
import ButtonPrimary from '../../../components/Buttons/ButtonPrimary'
import { CartCard } from '../../../components/Cards/CartCard'
import { useCartStore } from '../../../stores/cartStoreStore'
import { LayoutWIthElementFloat } from '../../../components/Layout/LayoutWIthElementFloat'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import Cookies from 'js-cookie'
import { api } from '../../../services/axios'
import useClientStore from '../../../stores/useClientStore'
import { errorHandler } from '../../../services/errorHandler'
const Carrinho = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const cart = useCartStore((state) => state.cart)
  /*   const totalPrice = useCartStore((state) => state.totalPrice) */
  const getTotalPrice = useCartStore((state) => state.getTotalPrice())
  const client = useClientStore((state) => state.cliente)
  async function handleFinishRequet() {
    try {
      setLoading(true)

      const products = cart.map((product) => {
        return {
          id: product.id,
          quantidade: product.quantidade,
        }
      })

      const payload = {
        tabela: Cookies.get('tabela') || 0,
        loja_id: Number(Cookies.get('cliente_id')) || 0,
        produtos: products,
      }

      await api.post('/finalizar-pedidos', payload)

      setLoading(false)
      toast.success('Requisição enviada com sucesso')
      router.push('/dashboard/pedido-finalizado')
    } catch (err) {
      setLoading(false)
      errorHandler(err)
    }
  }

  return (
    <>
      <LayoutWIthElementFloat
        navigationUrl="/dashboard/produtos"
        hasBackpage={true}
      >
        <Container>
          <div className="w-full flex justify-center items-center mt-8 mb-10 flex-col">
            {cart && cart.length > 0 && (
              <p className="text-center text-xl">Supermercado Barato</p>
            )}

            <strong className="text-brand-blue-800 font-bold text-center text-3xl mt-0 mb-4">
              Carrinho
            </strong>

            <div className="mt-2 space-y-2 md:overflow-auto md:grid md:grid-cols-4 md:gap-4 md:flex-wrap  overflow-scroll max-h-[320px]">
              {cart &&
                cart?.map((product) => {
                  return (
                    <CartCard
                      product={product}
                      key={product.id}
                      image_url={product.imagem_url}
                      id={product.id}
                      price={product.valor}
                      title={product.nome}
                      quantity={product.quantidade}
                      hasAddButton={false}
                      isCartPage={true}
                    />
                  )
                })}
            </div>
            {cart && cart.length > 0 && (
              <div className="flex w-full flex-col text-xl my-2">
                <span className="flex justify-between w-full space-y-2 ">
                  <strong className="text-gray-800">Sub Total</strong>{' '}
                  <p>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(getTotalPrice)}
                  </p>
                </span>
                <span className="flex justify-between w-full">
                  <strong className="text-gray-800">Total</strong>{' '}
                  <p>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(getTotalPrice)}
                  </p>
                </span>
              </div>
            )}
            {cart && cart.length > 0 && (
              <div className=" max-w-[300px] mx-auto w-full">
                {' '}
                <ButtonPrimary disabled={loading} onClick={handleFinishRequet}>
                  Finalizar Pedido
                </ButtonPrimary>
              </div>
            )}
            {cart && cart.length === 0 && (
              <div className="flex items-center flex-col mt-28">
                <img src="/img/carrinho_vazio.png" alt="" className="w-52" />
                <p className="text-2xl text-brand-gray-600 max-w-[200px] text-center mt-4">
                  Sem Produtos adicionados
                </p>
              </div>
            )}
          </div>
        </Container>
      </LayoutWIthElementFloat>
    </>
  )
}

export default Carrinho

