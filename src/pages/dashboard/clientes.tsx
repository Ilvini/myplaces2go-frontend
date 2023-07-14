import Link from 'next/link'
import React, { useEffect } from 'react'
import Container from '../../components/Partials/Container'
import { TopNavigation } from '../../components/TopNavigation'
import { BottomNavigation } from '../../components/BottomNavigation'
import { ClientCard } from '../../components/Cards/ClientCard'
import { TextFormSearch } from '../../components/Forms/components/TextFormSearch'
import { useRouter } from 'next/router'
import { errorHandler } from '../../services/errorHandler'
import { api_contract } from '../../services/axios'
import { Requestify } from '../../types/protocols'
import { LayoutWIthElementFloat } from '../../components/Layout/LayoutWIthElementFloat'

interface IClient {
  id: string
  nome: string
  telefone: string
  responsavel: string
}

const BuscarClientes = () => {
  const [clients, setClients] = React.useState<IClient[]>([])
  const router = useRouter()

  async function GetClients() {
    try {
      const response: Requestify<IClient[]> = await api_contract.get('/cliente')
      console.log(response)
      setClients(response.data.results)
      console.log(clients)
    } catch (error: any) {
      errorHandler(error)
    }
  }

  useEffect(() => {
    GetClients()
  }, [])

  return (
    <>
      <LayoutWIthElementFloat hasBackpage={true}>
        <Container>
          <div className="w-full flex justify-center mt-10 mb-5">
            <strong className="text-brand-blue-800 font-bold text-center text-2xl">
              Escolha o cliente
            </strong>
          </div>
          <div className="flex justify-center mb-5">
            <TextFormSearch name="search" placeholder="Buscar" />
          </div>
          <div className="flex md:flex-row md:justify-center justify-start gap-0  md:flex-wrap md:gap-5 flex-col items-center w-full md:space-y-0 space-y-6 md:overflow-auto overflow-scroll md:max-h-full max-h-[400px]">
            {clients?.map((client) => {
              return (
                <ClientCard
                  key={client.id}
                  title={client.nome}
                  id={client.id}
                  phone_number={client.telefone}
                  supervisor={client.responsavel}
                />
              )
            })}
          </div>
        </Container>
      </LayoutWIthElementFloat>
    </>
  )
}

export default BuscarClientes

