import React from 'react'
import Container from '../../components/Partials/Container'
import { ButtonDecorateTable } from '../../components/Buttons/ButtonDecorateTable'
import { LayoutWIthElementFloat } from '../../components/Layout/LayoutWIthElementFloat'
import useTabelaStore from '../../stores/useTabela'
import useClientStore from '../../stores/useClientStore'
import Cookies from 'js-cookie'

const Dashboard = () => {
  console.log(useTabelaStore.getState().tabela)

  const client_name = useClientStore.getState().cliente

  function handleSetTable(tableId: number) {
    useTabelaStore.setState({ tabela: tableId })
    Cookies.set('tabela', tableId.toString())
  }

  return (
    <>
      <LayoutWIthElementFloat navigationUrl="/dashboard" hasBackpage={true}>
        <Container>
          <div className="w-full flex justify-center mb-4 mt-8 flex-col">
            <p className="text-brand-gray-600 text-xl text-center">
              {client_name?.nome}
            </p>
            <strong className="text-brand-blue-800 font-bold text-center text-2xl mt-0">
              Escolha o tipo de valor
            </strong>
          </div>
          <div className="flex flex-col items-center w-full space-y-4 mx-auto max-w-[300px]">
            <ButtonDecorateTable
              onClick={() => handleSetTable(1)}
              href="/dashboard/produtos"
              text="Á vista"
              iconUrl="/img/moedas.png"
            />
            <ButtonDecorateTable
              onClick={() => handleSetTable(2)}
              href="/dashboard/produtos"
              text="7 Dias"
              iconUrl="/img/7.png"
            />
            <ButtonDecorateTable
              onClick={() => handleSetTable(3)}
              href="/dashboard/produtos"
              text="14 Dias"
              iconUrl="/img/14.png"
            />
            <ButtonDecorateTable
              onClick={() => handleSetTable(4)}
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

