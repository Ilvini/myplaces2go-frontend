import Link from 'next/link'
import React from 'react'
import Container from '../../components/Partials/Container'
import { ButtonDecorate } from '../../components/Buttons/ButtonDecorate'
import { TopNavigation } from '../../components/TopNavigation'
import { BottomNavigation } from '../../components/BottomNavigation'
import { ButtonDecorateTable } from '../../components/Buttons/ButtonDecorateTable'
import { LayoutWIthElementFloat } from '../../components/Layout/LayoutWIthElementFloat'
import useTabelaStore from '../../stores/useTabela'

const Dashboard = () => {
  console.log(useTabelaStore.getState().tabela)

  return (
    <>
      <LayoutWIthElementFloat hasBackpage={true}>
        <Container>
          <div className="w-full flex justify-center mb-4 mt-8 flex-col">
            <p className="text-brand-gray-600 text-xl text-center">
              Supermercado Barato
            </p>
            <strong className="text-brand-blue-800 font-bold text-center text-2xl mt-0">
              Escolha o tipo de valor
            </strong>
          </div>
          <div className="flex flex-col items-center w-full space-y-4 mx-auto max-w-[300px]">
            <ButtonDecorateTable
              onClick={() => useTabelaStore.setState({ tabela: 1 })}
              href="/dashboard/produtos"
              text="Á vista"
              iconUrl="/img/moedas.png"
            />
            <ButtonDecorateTable
              onClick={() => useTabelaStore.setState({ tabela: 2 })}
              href="/dashboard/produtos"
              text="7 Dias"
              iconUrl="/img/7.png"
            />
            <ButtonDecorateTable
              onClick={() => useTabelaStore.setState({ tabela: 3 })}
              href="/dashboard/produtos"
              text="14 Dias"
              iconUrl="/img/14.png"
            />
            <ButtonDecorateTable
              onClick={() => useTabelaStore.setState({ tabela: 4 })}
              href="/dashboard/produtos"
              text="21 Dias"
              iconUrl="/img/21.png"
            />
          </div>
        </Container>
      </LayoutWIthElementFloat>
    </>
  )
}

export default Dashboard

