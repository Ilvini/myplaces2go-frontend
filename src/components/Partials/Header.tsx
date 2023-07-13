/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import Cookies from 'js-cookie'
export default function Header() {
  const router = useRouter()

  function removeToken() {
    Cookies.remove('token')
    router.push('/')
  }

  return (
    <div className="sticky top-0 z-[99]">
      <header className="relative bg-slate-900 items-center px-5 shadow border-b-2 border-brand-purple-600 flex justify-between py-4 md:py-2">
        {router.pathname !== '/dashboard/pastas' ? (
          <span
            className="cursor-pointer  rounded-full"
            onClick={() => router.back()}
          >
            <Icon
              icon="octicon:arrow-left"
              className="text-slate-200 text-3xl hover:text-brand-orange-100"
            />
          </span>
        ) : (
          <span>
            <Icon icon="octicon:home-24" className="text-zinc-200 text-3xl" />
          </span>
        )}
        <Link href="/dashboard/pastas">
          <img
            src="/img/logo.png"
            alt="segtron"
            className="w-20 md:w-12 absolute left-1/2 transform -translate-x-1/2 hover:scale-95 transition-all cursor-pointer"
          />
        </Link>
        <div
          className="flex flex-col gap-1 items-center cursor-pointer"
          onClick={removeToken}
        >
          <Icon
            icon="ri:logout-box-r-line"
            className="text-zinc-200 text-xl hover:text-brand-orange-100"
          />
        </div>
      </header>
    </div>
  )
}

