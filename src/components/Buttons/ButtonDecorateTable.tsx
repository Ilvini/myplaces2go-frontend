import Link from 'next/link'
import React from 'react'

interface IButtonDecorate {
  text: string
  iconUrl: string
  href: string
  onClick?: () => void
}

export const ButtonDecorateTable = ({
  text,
  iconUrl,
  href,
  onClick,
}: IButtonDecorate) => {
  return (
    <Link href={href} onClick={onClick} className="w-full">
      <div className="bg-brand-blue-800 w-full min-h-[104px] max-w-[300px] rounded-3xl text-white/90 flex justify-between items-center px-10 py-2">
        <img
          src={iconUrl}
          alt="adicionar pedido"
          className=" w-22 h-22 object-contain"
        />
        <strong
          className="text-3xl text-shadow "
          dangerouslySetInnerHTML={{ __html: text }}
        ></strong>
      </div>
    </Link>
  )
}

