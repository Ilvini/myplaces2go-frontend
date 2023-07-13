import React from 'react'

interface IRequestCard {
  name: string
  date: string
  id: number
  total_amount: number
  tablet: string
}

export const RequestCard = ({
  name,
  date,
  id,
  total_amount,
  tablet,
}: IRequestCard) => {
  return (
    <div className="drop-shadow-md bg-white  flex flex-col w-full border-brand-gray-400 border md:max-w-[290px] max-w-[300px] px-8 py-5 rounded-2xl z-40 ">
      <strong className="text-xl">{name}</strong>
      <p className="text-brand-gray-500 mb-2">
        ID Cliente: {id} | {date}
      </p>
      <p className="text-brand-gray-600">Tabela: {tablet}</p>
      <p className="text-brand-gray-600">
        Valor Total:{' '}
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(total_amount)}
      </p>
    </div>
  )
}

