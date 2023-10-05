import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

interface ITopNavigation {
  hasBackPage?: boolean
  navigationUrl?: string
}

export const TopNavigation = ({
  navigationUrl,
  hasBackPage,
}: ITopNavigation) => {
  return (
    <header className="bg-brand-blue-800 fixed top-0  w-full flex items-center border-b-2 border-b-brand-red-500 min-h-[100px]">
      <nav className="flex px-8 justify-between w-full items-center">
        <div>
          {!hasBackPage ? (
            <Link href="/dashboard">
              <img
                src="/svg/logo-white.svg"
                alt="logo branca My Place 2 GO - Seu Guia de viagens"
              />
            </Link>
          ) : (
            <Link href={navigationUrl ? navigationUrl : '/dashboard'}>
              <Icon
                icon="majesticons:arrow-left-line"
                color="white"
                fontSize={35}
              />
            </Link>
          )}
        </div>
        {hasBackPage && (
          <div className="rounded-full bg-brand-red-500 absolute left-0 right-0 h-24 w-24 mx-auto translate-y-10  p-5 aspect-square flex justify-center items-center">
            <img src="/svg/logo-white.svg" alt="" className="h-12" />
          </div>
        )}
        <div className="flex space-x-4 items-center">
          <Link href="/dashboard">
            <img src="/svg/home.svg" alt="icone de casa" className="w-10" />
          </Link>
          <img src="/svg/back.svg" alt="icone de voltar" className="w-10" />
        </div>
      </nav>
    </header>
  )
}

