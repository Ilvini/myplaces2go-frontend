import Link from 'next/link'
import React from 'react'
import Container from '../../components/Partials/Container'
import { ButtonDecorate } from '../../components/Buttons/ButtonDecorate'
import { TopNavigation } from '../../components/TopNavigation'
import { BottomNavigation } from '../../components/BottomNavigation'
import { ButtonDecorateTable } from '../../components/Buttons/ButtonDecorateTable'

const Dashboard = () => {
  return (
    <>
      <TopNavigation />
      <main className="w-full min-h-[500px] justify-center  flex">
        <Container>
          <div className="w-full flex justify-center mt-8 flex-col">
            <p className="text-brand-gray-600 text-xl text-center">
              Supermercado Barato
            </p>
            <strong className="text-brand-blue-800 font-bold text-center text-2xl mt-0">
              Escolha o tipo de valor
            </strong>
          </div>
          <div className="flex flex-col items-center w-full space-y-4 mx-auto max-w-[300px]">
            <ButtonDecorateTable
              href="/dashboard/buscar-clientes"
              text="Á vista"
              iconUrl="/img/moedas.png"
            />
            <ButtonDecorateTable
              href="/dashboard/historico-pedidos"
              text="7 Dias"
              iconUrl="/img/7.png"
            />
            <ButtonDecorateTable
              href="/dashboard/prospeccao"
              text="14 Dias"
              iconUrl="/img/14.png"
            />
            <ButtonDecorateTable
              href="/dashboard/prospeccao"
              text="21 Dias"
              iconUrl="/img/21.png"
            />
          </div>
        </Container>
      </main>

      <BottomNavigation />
    </>
  )
}

export default Dashboard

