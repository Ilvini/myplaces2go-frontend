import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

export const HeaderNavigation = ({ backRoute }: { backRoute: string }) => {
  return (
    <header className="py-4  shadow-md">
      <nav className="flex justify-center w-full items-center relative h-14">
        <div className="absolute left-8">
          {backRoute && (
            <Link href={backRoute}>
              <button className="w-1/3 mr-14">
                <Icon
                  icon="icon-park-outline:back-one"
                  color="#528fa7"
                  fontSize={32}
                />
              </button>
            </Link>
          )}
        </div>
        <div className=" absolute -left-50">
          <img src="/img/logo.png" alt="logo my place 2 go" />
        </div>
        <div className="w-1/3"></div>
      </nav>
    </header>
  )
}

