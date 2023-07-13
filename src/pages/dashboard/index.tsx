import Link from 'next/link'
import React from 'react'
import Container from '../../components/Partials/Container'
import { ButtonDecorate } from '../../components/Buttons/ButtonDecorate'
import { TopNavigation } from '../../components/TopNavigation'
import { BottomNavigation } from '../../components/BottomNavigation'

const Dashboard = () => {
  return (
    <>
      <TopNavigation />
      <main className="w-full min-h-[500px] justify-center  flex">
        <Container>
          <div className="w-full flex justify-center my-10">
            <p className="text-brand-gray-600 text-xl">
              Seja bem vindo,{' '}
              <strong className="text-brand-blue-800 font-bold text-center text-2xl mt-10">
                Marcelo
              </strong>
            </p>
          </div>
          <div className="flex flex-col items-center w-full space-y-6">
            <ButtonDecorate
              href="/dashboard/buscar-clientes"
              text="Novo Pedido"
              iconUrl="/img/novo_pedido.png"
            />
            <ButtonDecorate
              href="/dashboard/historico-pedidos"
              text="Histórico <br/> de pedidos"
              iconUrl="/img/historico.png"
            />
            <ButtonDecorate
              href="/dashboard/prospeccao"
              text="Prospecção"
              iconUrl="/img/prospeccao.png"
            />
          </div>
        </Container>
      </main>

      <BottomNavigation />
    </>
  )
}

export default Dashboard

