/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import BottomNavigation from '../../../components/Partials/BottomNavigation'
import Header from '../../../components/Partials/Header'
import * as Tabs from '@radix-ui/react-tabs'
import useActiveTabStore from '../../../stores/useActiveTabStore'
import { Icon } from '@iconify/react'
import { CommitProps, MemberProps, TabProps } from '../../../types/protocols'
import useSWR, { mutate } from 'swr'
import { api } from '../../../services/axios'
import LoadingIcon from '../../../components/Partials/LoadingIcon'
import { AddNewTabContent } from '../../../components/Partials/AddNewTabContent'
import { Commit } from '../../../components/Partials/Commit.tsx'
import { AddCommitForm } from '../../../components/Partials/AddCommitForm'
import { Member } from '../../../components/Partials/Member'
import { AddMember } from '../../../components/Partials/AddMember'

export default function Page({ params }: any) {
  const ficha_id = params.ficha_id

  const { activeTab, setActiveTab } = useActiveTabStore()

  const { data, isLoading } = useSWR('getFichaDetailsData', async () => {
    const response = await api(`/fichas/${ficha_id}`)
    return response.data.results
  })

  const membros_da_ficha: MemberProps[] = [
    {
      id: '1',
      nome: 'João',
      foto: 'https://avatars.githubusercontent.com/u/60005589?v=4',
    },
    {
      id: '2',
      nome: 'Tiago',
      foto: 'https://avatars.githubusercontent.com/u/6002522?v=4',
    },
    {
      id: '3',
      nome: 'Pedro',
      foto: 'https://avatars.githubusercontent.com/u/60335223?v=4',
    },
  ]

  const membros: MemberProps[] = [
    {
      id: '1',
      nome: 'João',
      foto: 'https://avatars.githubusercontent.com/u/60005589?v=4',
    },
    {
      id: '2',
      nome: 'Tiago',
      foto: 'https://avatars.githubusercontent.com/u/6002522?v=4',
    },
    {
      id: '3',
      nome: 'Pedro',
      foto: 'https://avatars.githubusercontent.com/u/60335223?v=4',
    },
    {
      id: '4',
      nome: 'Paulo',
      foto: 'https://avatars.githubusercontent.com/u/60335003?v=4',
    },
    {
      id: '5',
      nome: 'Lucas',
      foto: 'https://avatars.githubusercontent.com/u/60333123?v=4',
    },
  ]

  useEffect(() => {
    if (data?.abas?.length > 0) {
      setActiveTab(data?.abas[0].nome)
    }
  }, [isLoading])

  return (
    <div className="bg-gradient-to-b from-slate-100 to-slate-400 min-h-screen">
      <Header />
      {isLoading && !data && (
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="w-40">
            <LoadingIcon />
          </div>
        </div>
      )}
      {data && (
        <>
          <div
            className="text-white px-3 py-1 flex justify-between items-center"
            style={{ backgroundColor: data.cor }}
          >
            <div>
              <p className="font-bold text-lg">{data.nome}</p>
            </div>
            <div>
              <p className="text-sm">Membros da ficha</p>
              <div className="flex gap-1 cursor-pointer">
                {membros_da_ficha.map((membro) => (
                  <Member {...membro} key={membro.id} />
                ))}
                <AddMember membros={membros} />
              </div>
            </div>
          </div>
          <div className="px-3">
            <div className="mt-3 pb-40">
              <section className="mt-5">
                <Tabs.Root
                  defaultValue={
                    data?.abas?.length > 0 ? data.abas[0].nome : 'tab_new'
                  }
                >
                  <Tabs.List>
                    {data?.abas?.map((aba: any) => (
                      <Tabs.Trigger
                        key={aba.id}
                        value={aba.nome}
                        className={` px-3 py-2 rounded-t-xl cursos-pointer`}
                        style={{
                          backgroundColor:
                            activeTab === aba.nome ? `${data.cor}` : '#f4f4f5',
                          color: activeTab === aba.nome ? '#fff' : '#000',
                        }}
                        onClick={() => setActiveTab(aba.nome)}
                      >
                        <span>{aba.nome}</span>
                      </Tabs.Trigger>
                    ))}

                    <Tabs.Trigger
                      value="tab_new"
                      className={`px-3 py-2 rounded-t-xl cursos-pointer y-60 bg-gradient-to-b from-slate-300 to-slate-400 text-white`}
                      onClick={() => setActiveTab('tab_new')}
                    >
                      <span>Adicionar</span>
                    </Tabs.Trigger>
                  </Tabs.List>
                  {data?.abas?.map((aba: any) => (
                    <Tabs.Content
                      key={aba.id}
                      value={aba.nome}
                      className="bg-zinc-100 p-5 min-h-96 mt-3 rounded-md shadow"
                    >
                      <section className="grid md:grid-cols-2 gap-3">
                        <div>
                          {/* <div>
                            <p className="text-lg flex items-center gap-2">
                              <Icon icon="mdi:text" className="text-xl" />
                              <strong>Descrição</strong>
                            </p>
                            <p className="text-slate-600">{aba.descricao}</p>
                          </div> */}
                          <div>
                            <p className="text-lg flex items-center gap-2 mt-2">
                              <Icon
                                icon="teenyicons:message-plus-outline"
                                className="text-xl"
                              />
                              <strong>Adicionar comentário</strong>
                            </p>
                            <AddCommitForm abaId={aba.id} />
                          </div>
                        </div>
                        <div>
                          <div>
                            <p className="text-lg flex items-center gap-2 mt-2">
                              <Icon
                                icon="teenyicons:message-text-outline"
                                className="text-xl"
                              />
                              <strong>Comentários</strong>
                            </p>
                            {aba.comentarios.map((comentario: CommitProps) => (
                              <Commit key={comentario.id} data={comentario} />
                            ))}
                          </div>
                        </div>
                      </section>
                    </Tabs.Content>
                  ))}
                  <AddNewTabContent />
                </Tabs.Root>
              </section>
            </div>
          </div>
        </>
      )}
      <BottomNavigation />
    </div>
  )
}

export function getServerSideProps(context: any) {
  return {
    props: { params: context.params },
  }
}
