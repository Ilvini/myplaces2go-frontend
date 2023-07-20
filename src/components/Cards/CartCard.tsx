import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import useFromStore from '../../hooks/useFromStore'
import { useCartStore } from '../../stores/cartStoreStore'
import { toast } from 'react-hot-toast'
interface ICartCard {
  id: string
  title: string
  image_url: string
  price: number
  description?: string
  hasAddButton?: boolean
  quantity?: number
  product: any
  isCartPage?: boolean

  /* 
  isCartPage= > informa que o componente será usado na página de carrinho
  */
}

export const CartCard = ({
  id,
  title,
  price,
  image_url,
  description = '',
  hasAddButton = false,
  product,
  quantity,
  isCartPage = false,
}: ICartCard) => {
  const [qtd, setQtd] = useState(1)
  const [showDescription, setShowDescription] = useState(false)
  const addToCart = useCartStore((state) => state.addToCart)
  const increment = useCartStore((state) => state.increment)
  const decrement = useCartStore((state) => state.decrement)
  function handleAddToCart() {
    addToCart({ ...product, quantidade: qtd })
    toast.success(`Produto adicionado ao carrinho!`)
  }

  const removeFromCart = useCartStore((state) => state.removeFromCart)

  return (
    <div
      key={id}
      className="flex flex-col  max-w-[300px] pb-3 last:border-0 border-b mx-4"
    >
      <div className="flex gap-3">
        <div className="w-1/3 aspect-square h-[76px] ">
          <img
            src={image_url}
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-2/3 flex flex-col">
          <strong>{title}</strong>
          <small className="text-brand-gray-500">Cod: {id}</small>
        </div>
      </div>
      <div className="w-full flex justify-between mt-4">
        <div className="flex space-x-2">
          <button
            className="w-8 h-8 rounded-full bg-brand-gray-100 flex justify-center items-center bg-brand-blue-800 text-white"
            onClick={() => (isCartPage ? increment(id) : setQtd(qtd + 1))}
          >
            <Icon icon="typcn:plus" />
          </button>
          <input
            type="number"
            className="select-none w-10 pointer-events-none text-center text-brand-gray-600 h-8 rounded-full "
            value={isCartPage ? quantity : qtd}
            max={99}
            readOnly
          />
          <button
            className="w-8 h-8 rounded-full bg-brand-gray-100 flex justify-center items-center bg-brand-blue-800 text-white"
            onClick={() => (isCartPage ? decrement(id) : setQtd(qtd - 1))}
            disabled={isCartPage ? quantity === 0 : qtd === 1}
          >
            <Icon icon="typcn:minus" />
          </button>
        </div>

        <div>
          <strong className="text-2xl text-brand-gray-600">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(price)}
          </strong>
        </div>
      </div>
      {isCartPage && (
        <div className="flex justify-between items-center">
          {' '}
          <div></div>
          <div
            className="mt-3 flex justify-between flex-row"
            onClick={() => removeFromCart(product)}
          >
            <button className="px-4 py-2 border-brand-red-500 border rounded-3xl font-semibold text-brand-red-500">
              {' '}
              Remover do carrinho
            </button>
          </div>
        </div>
      )}
      {!showDescription ? (
        <div className="mt-3 flex justify-between flex-row">
          {description !== '' ? (
            <button
              className="text-brand-blue-800 font-bold border-brand-blue-800 border px-5  py-2 rounded-full text-sm"
              onClick={() => setShowDescription((state) => !state)}
            >
              Ver Descrição
            </button>
          ) : (
            <div />
          )}

          {hasAddButton && (
            <button
              className="flex items-center"
              onClick={() => {
                handleAddToCart(product),
                  console.log(qtd),
                  console.log(useCartStore.getState().cart)
              }}
            >
              <div className="bg-brand-blue-800 font-bold border-brand-blue-800 border p-2 rounded-full text-sm">
                <Icon
                  icon="fontisto:shopping-basket"
                  color="white"
                  fontSize={20}
                />
              </div>
              <strong className="ml-2 text-brand-blue-800 text-xl">
                Adicionar
              </strong>
            </button>
          )}
        </div>
      ) : (
        <div className="mt-2">
          <p
            className="text-brand-gray-500"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
          <button
            onClick={() => setShowDescription(false)}
            className="text-brand-blue-800 font-bold border-brand-blue-800 border p-2 rounded-full text-base w-full mt-2"
          >
            Ocultar Descrição
          </button>
        </div>
      )}
    </div>
  )
}

