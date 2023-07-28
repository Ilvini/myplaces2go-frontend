import Link from 'next/link'
import React from 'react'
import useClientStore from '../../stores/useClientStore'
import Cookies from 'js-cookie'

interface IClient {
  id: string
  nome: string
  telefone: string
  responsavel: string
}

export const ClientCard = ({ nome, id, responsavel, telefone }: IClient) => {
  return (
    <Link
      href={`/dashboard/tabelas`}
      className="w-full"
      onClick={() => {
        useClientStore.getState().setCliente({
          nome,
          id,
          responsavel,
          telefone,
        }),
          Cookies.set('cliente_id', id)
        console.log(useClientStore.getState().cliente)
      }}
    >
      <div className="drop-shadow-md bg-white  flex flex-col w-full border-brand-gray-400 border md:max-w-[290px]  px-8 py-5 rounded-2xl z-40 ">
        <strong className="text-xl">{nome}</strong>
        <p className="text-brand-gray-500 mb-2">ID Cliente: {id}</p>
        <p className="text-brand-gray-600">
          Responsável: {responsavel || 'Não informado'}
        </p>
        <p className="text-brand-gray-600">
          Contato: {telefone || 'Não informado'}
        </p>
      </div>
    </Link>
  )
}

