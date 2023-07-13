import Link from 'next/link'
import React from 'react'

interface IButtonDecorate {
  text: string
  iconUrl: string
  href: string
}

export const ButtonDecorate = ({ text, iconUrl, href }: IButtonDecorate) => {
  return (
    <Link href={href}>
      <div className="bg-brand-blue-800  w-full min-h-[107px] max-w-[320px] rounded-3xl text-white/90 flex justify-between items-center px-5 py-2">
        <img src={iconUrl} alt="adicionar pedido" className="-translate-y-4" />
        <strong
          className="text-2xl"
          dangerouslySetInnerHTML={{ __html: text }}
        ></strong>
      </div>
    </Link>
  )
}

