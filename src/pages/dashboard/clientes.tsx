import React, { useEffect } from 'react'
import Container from '../../components/Partials/Container'
import { ClientCard } from '../../components/Cards/ClientCard'
import { TextFormSearch } from '../../components/Forms/components/TextFormSearch'
import { useRouter } from 'next/router'
import { errorHandler } from '../../services/errorHandler'
import { api, api_contract } from '../../services/axios'
import { Requestify } from '../../types/protocols'
import { LayoutWIthElementFloat } from '../../components/Layout/LayoutWIthElementFloat'
import { CardsClientsSkeleton } from '../../components/Partials/Skeleton/CardsSkelenton/CardsClientsSkeleton'
import { useDebounce } from '../../hooks/useDebounce'
import Cookies from 'js-cookie'

interface IClient {
  id: string
  nome: string
  telefone: string
  responsavel: string
}

const BuscarClientes = () => {
  const [clients, setClients] = React.useState<IClient[]>([])
  const [search, setSearch] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const searchDebounce = useDebounce(search, 1000)
  const router = useRouter()

  async function GetClients() {
    try {
      setLoading(true)
      const response: Requestify<IClient[]> = await api.get(
        `/lojas?nome=${search}`
      )
      setLoading(false)
      console.log(response)
      setClients(response.data.results)
      console.log(clients)
    } catch (error: any) {
      setLoading(false)
      errorHandler(error)
    }
  }

  useEffect(() => {
    GetClients()
  }, [searchDebounce])

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
            <TextFormSearch
              name="search"
              placeholder="Buscar"
              setSearch={setSearch}
              search={search}
            />
          </div>
          <div className="flex md:flex-row md:justify-center justify-start gap-0  md:flex-wrap md:gap-5 flex-col items-center w-full md:space-y-0 space-y-6 md:overflow-auto overflow-scroll md:max-h-full max-h-[400px]">
            {loading ? (
              <>
                <CardsClientsSkeleton />
                <CardsClientsSkeleton />
                <CardsClientsSkeleton />
              </>
            ) : clients.length !== 0 ? (
              clients?.map((client) => {
                return (
                  <ClientCard
                    key={client.id}
                    nome={client.nome}
                    id={client.id}
                    telefone={client.telefone}
                    responsavel={client.responsavel}
                  />
                )
              })
            ) : (
              <div className="my-10">
                <img src="/img/sem_cliente.png" alt="" />
                <p className="text-lg mt-10">Cliente não encontrado</p>
              </div>
            )}
          </div>
        </Container>
      </LayoutWIthElementFloat>
    </>
  )
}

export default BuscarClientes

