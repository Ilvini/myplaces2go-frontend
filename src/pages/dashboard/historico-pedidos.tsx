import Link from 'next/link'
import React, { useEffect } from 'react'
import Container from '../../components/Partials/Container'
import { TopNavigation } from '../../components/TopNavigation'
import { BottomNavigation } from '../../components/BottomNavigation'
import { ClientCard } from '../../components/Cards/ClientCard'
import { TextFormSearch } from '../../components/Forms/components/TextFormSearch'
import { useRouter } from 'next/router'
import { RequestCard } from '../../components/Cards/RequestCard'
import { errorHandler } from '../../services/errorHandler'
import { Requestify } from '../../types/protocols'
import { api_contract } from '../../services/axios'
import { LayoutWIthElementFloat } from '../../components/Layout/LayoutWIthElementFloat'

interface IRequestHistory {
  id: string
  valor: number
  data: string
  tabela: string
  nome: string
}

const HistoricoPedidos = () => {
  const router = useRouter()
  const [request, setRequest] = React.useState([])
  /*  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>() */

  async function GetClients() {
    try {
      const response = await api_contract.get<Requestify<IRequestHistory[]>>(
        '/pedidos'
      )
      setRequest(response.data.results)
      console.log(request)
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
              Histórico de Pedidos
            </strong>
          </div>
          <div className="flex justify-center mb-5">
            <TextFormSearch name="search" placeholder="Buscar" />
          </div>
          <div className="flex md:flex-row md:justify-center justify-start gap-0  md:flex-wrap md:gap-5 flex-col items-center w-full md:space-y-0 space-y-6 md:overflow-auto overflow-scroll md:max-h-full max-h-[421px]">
            {request?.map((request) => {
              return (
                <RequestCard
                  tablet={request.tabela}
                  name={request.nome}
                  date={request.data}
                  id={request.id}
                  total_amount={request.valor}
                />
              )
            })}
            {/* <RequestCard
              tablet="Á vista"
              name="Supermercado Barato"
              date="12/12/2021"
              id={3212312}
              total_amount={123}
            />
            <RequestCard
              tablet="Á vista"
              name="Supermercado Barato"
              date="12/12/2021"
              id={3212312}
              total_amount={123}
            />
            <RequestCard
              tablet="Á vista"
              name="Supermercado Barato"
              date="12/12/2021"
              id={3212312}
              total_amount={123}
            />
            <RequestCard
              tablet="Á vista"
              name="Supermercado Barato"
              date="12/12/2021"
              id={3212312}
              total_amount={123}
            /> */}
          </div>
        </Container>
      </LayoutWIthElementFloat>
    </>
  )
}

export default HistoricoPedidos

