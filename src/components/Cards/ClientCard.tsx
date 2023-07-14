import Link from 'next/link'
import React from 'react'

interface IClientCard {
  title: string
  id: string
  supervisor: string
  phone_number: string
}

export const ClientCard = ({
  title,
  id,
  supervisor,
  phone_number,
}: IClientCard) => {
  return (
    <Link href={`/dashboard/tabelas`} className="w-full">
      <div className="drop-shadow-md bg-white  flex flex-col w-full border-brand-gray-400 border md:max-w-[290px]  px-8 py-5 rounded-2xl z-40 ">
        <strong className="text-xl">{title}</strong>
        <p className="text-brand-gray-500 mb-2">ID Cliente: {id}</p>
        <p className="text-brand-gray-600">Responsável: {supervisor}</p>
        <p className="text-brand-gray-600">Contato: {phone_number}</p>
      </div>
    </Link>
  )
}

