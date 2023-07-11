import React, { useEffect, useState } from 'react'
import BottomNavigation from '../../../../../components/Partials/BottomNavigation'
import Container from '../../../../../components/Partials/Container'
import Header from '../../../../../components/Partials/Header'
import { api } from '../../../../../services/axios'
import { checkAuthorization } from '../../../../../services/checkAuthorization'
import Router, { useRouter } from 'next/router'
import DashboardButtonPlus from '../../../../../components/Partials/DashboardButtonPlus'
import { errorHandler } from '../../../../../services/errorHandler'
import useSWR from 'swr'
import { FichaProps } from '../../../../../types/protocols'
import FichaButton from '../../../../../components/Partials/FichaButton'
import { Icon } from '@iconify/react'
import { CardLoading } from '../../../../../components/Partials/CardLoading'

export default function Page() {
  const router = useRouter()
  const { pasta_id, nome, cor } = router.query

  const [isLoading, setIsLoading] = useState(true)
  const [fichas, setFichas] = useState<FichaProps[]>()

  async function getFichasFromFolderId() {
    setIsLoading(true)
    try {
      const response = await api.get(`/pastas/${pasta_id}/fichas`)
      setFichas(response.data.results)
    } catch (error) {
      errorHandler(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getFichasFromFolderId()
  }, [pasta_id])

  return (
    <div className="bg-gradient-to-b from-slate-100 to-slate-400 h-screen">
      <Header />
      <Container>
        <div
          className="flex items-center gap-3 font-bold text-lg shadow text-white w-fit px-2 mt-2 rounded-md"
          style={{ backgroundColor: `#${cor}` }}
        >
          <Icon icon="heroicons:folder" />
          <span>{nome}</span>
        </div>
        <div className="mt-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
            {isLoading && (
              <>
                <CardLoading />
                <CardLoading />
                <CardLoading />
                <CardLoading />
              </>
            )}
            {fichas?.map((ficha) => {
              return (
                <FichaButton
                  key={ficha.id}
                  icon={'gala:file'}
                  data={ficha}
                  link={`/dashboard/ficha-detalhes/${ficha.id}`}
                />
              )
            })}
            <DashboardButtonPlus
              icon={'heroicons:plus'}
              title={'Cadastrar'}
              link={`/dashboard/cadastro/ficha?pasta_id=${pasta_id}`}
            />
          </div>
        </div>
      </Container>
      <BottomNavigation />
    </div>
  )
}
