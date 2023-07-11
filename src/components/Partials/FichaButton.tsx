import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import React from 'react'
import { FichaProps } from '../../types/protocols'

interface Props {
  icon: string
  link: string
  data: FichaProps
}

export default function FichaButton({ icon, link, data }: Props) {
  const router = useRouter()

  return (
    <div
      className="w-full aspect-square rounded-md shadow flex justify-center items-center flex-col hover:scale-95 transition-all cursor-pointer p-3 relative"
      style={{ backgroundColor: data.cor }}
      onClick={() => router.push(link)}
    >
      <Icon
        icon={icon}
        className="text-5xl sm:text-3xl text-white absolute right-4 top-4"
      />
      <span className="text-white font-bold mt-6 text-center text-lg lg:text-base uppercase">
        {data.nome}
      </span>

      <div
        className={`text-white font-bold text-sm mt-3 text-center px-2 py-1 rounded-md flex items-center justify-center gap-1 absolute left-4 top-1`}
      >
        <Icon
          icon={'material-symbols:featured-play-list-outline'}
          className="w-4 text-white"
        />
        {data.qtd_abas > 0 ? data.qtd_abas : '0'}
      </div>
      <div
        className={`text-white font-bold text-sm mt-3 text-center px-2 py-1 rounded-md flex items-center justify-center gap-1 absolute left-4 top-5`}
      >
        <Icon icon={'simple-line-icons:paper-clip'} className="w-4 text-white" />
        {data.qtd_arquivos > 0 ? data.qtd_arquivos : '0'}
      </div>
      <div
        className={`text-white font-bold text-sm mt-3 text-center px-2 py-1 rounded-md flex items-center justify-center gap-1 absolute left-4 top-9`}
      >
        <Icon icon={'mdi:users'} className="w-4 text-white" />
        {data.qtd_membros > 0 ? data.qtd_membros : '0'}
      </div>
    </div>
  )
}
