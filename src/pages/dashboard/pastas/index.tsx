import React, { useEffect, useState } from 'react'
import BottomNavigation from '../../../components/Partials/BottomNavigation'
import Container from '../../../components/Partials/Container'
import DashboardButton from '../../../components/Partials/DashboardButton'
import Header from '../../../components/Partials/Header'
import { api } from '../../../services/axios'
import { checkAuthorization } from '../../../services/checkAuthorization'
import Router, { useRouter } from 'next/router'
import DashboardButtonPlus from '../../../components/Partials/DashboardButtonPlus'
import { FolderProps } from '../../../types/protocols'
import { errorHandler } from '../../../services/errorHandler'
import useSWR from 'swr'
import { CardLoading } from '../../../components/Partials/CardLoading'
import useUserStore from '../../../stores/useUserStore'

export default function Dashboard() {
  const router = useRouter()
  const { user, setUser } = useUserStore()

  const { data, isLoading } = useSWR('getCategories', getCategories)

  async function getCategories() {
    try {
      const response = await api.get('/pastas')
      return response.data.results
    } catch (error) {
      errorHandler(error)
    }
  }

  const folders: FolderProps[] = data || []
  async function getMe() {
    try {
      const response = await api.get('/me')
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMe()
  }, [])

  useEffect(() => {
    checkAuthorization()
  }, [router.pathname])

  return (
    <div className="bg-gradient-to-b from-slate-100 to-slate-400 min-h-screen">
      <Header />
      <Container>
        <div className="mt-3 pb-40">
          <h2 className="mt-5 mb-3 font-bold text-slate-900 text-2xl">
            Olá {user?.name}, Seja bem-vindo ao seu dashboard!
          </h2>
          <section className="mt-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
              {isLoading && (
                <>
                  <CardLoading />
                  <CardLoading />
                  <CardLoading />
                  <CardLoading />
                  <CardLoading />
                </>
              )}
              {folders?.map((folder) => {
                return (
                  <DashboardButton
                    key={folder.id}
                    icon={'heroicons:folder'}
                    color={folder.cor}
                    title={folder.nome}
                    link={`/dashboard/pastas/${folder.id}/fichas?nome=${
                      folder.nome
                    }&cor=${folder.cor.split('#')[1]}`}
                  />
                )
              })}
              <DashboardButtonPlus
                icon={'heroicons:plus'}
                title={'Cadastrar'}
                link={`/dashboard/cadastro/pasta`}
              />
            </div>
          </section>
        </div>
      </Container>
      <BottomNavigation />
    </div>
  )
}
