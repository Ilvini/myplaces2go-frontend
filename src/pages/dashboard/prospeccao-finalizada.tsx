import React from 'react'
import Container from '../../components/Partials/Container'
import ButtonPrimary from '../../components/Buttons/ButtonPrimary'
import Link from 'next/link'

import { useCartStore } from '../../stores/cartStoreStore'

const ProspeccaoFinalizada = () => {
  /*  const cleanCart = useCartStore((state) => state.cleanCart) */

  return (
    <>
      <Container>
        <div className="flex flex-col justify-center h-full mt-28">
          <div>
            <img
              src="/img/check.png"
              className="mx-auto"
              alt="imagem ilustração Prospeccao finalizado"
            />
            <div className="mx-auto max-w-[220px] flex justify-center my-10 flex-col items-center">
              <strong className="text-brand-gray-600 font-bold text-center text-4xl mt-10 ">
                Prospecção finalizada com sucesso!
              </strong>
              {/* <p className="mt-4 text-center text-brand-gray-600">
                Verifique seu Histórico de Pedidos para confirmar
              </p> */}
            </div>
          </div>

          <div
            className="mt-5 items-end max-w-[300px] mx-auto w-full"
            /*    onClick={() => cleanCart()} */
          >
            <Link href="/dashboard">
              <ButtonPrimary type="submit">Voltar para o Início</ButtonPrimary>
            </Link>
          </div>
        </div>
      </Container>

      {/*  <BottomNavigation /> */}
    </>
  )
}

export default ProspeccaoFinalizada
