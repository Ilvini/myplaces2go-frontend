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
                {/*   <Icon
                  icon="icon-park-outline:back-one"
                  color="#528fa7"
                  fontSize={32}
                /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  font-size="32"
                  className="iconify iconify--icon-park-outline"
                  width="1em"
                  height="1em"
                  viewBox="0 0 48 48"
                  style={{ color: 'rgb(82, 143, 167);' }}
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                  >
                    <path d="M10 33c0-7.299 4.103-13.583 10-16.408A16.147 16.147 0 0 1 27 15c9.389 0 17 8.059 17 18"></path>
                    <path d="m18 28l-8 5l-6-8"></path>
                  </g>
                </svg>
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

