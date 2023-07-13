import Link from 'next/link'
import React from 'react'

export const TopNavigation = () => {
  return (
    <header className="bg-brand-blue-800 flex items-center border-b-2 border-b-brand-red-500 min-h-[100px]">
      <nav className="flex px-8 justify-between w-full">
        <div>
          <Link href="/dashboard">
            <img
              src="/svg/logo-white.svg"
              alt="logo branca comercial dos plásticos"
            />
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/dashboard">
            <img src="/svg/home.svg" alt="icone de casa" />
          </Link>
          <img src="/svg/back.svg" alt="icone de voltar" />
        </div>
      </nav>
    </header>
  )
}

