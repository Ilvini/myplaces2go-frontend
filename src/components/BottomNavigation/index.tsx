import Link from 'next/link'
import React from 'react'
import { useCartStore } from '../../stores/cartStore'
import useFromStore from '../../hooks/useFromStore'

export const BottomNavigation = () => {
  const totalItems = useFromStore(useCartStore, (state) => state.totalItems)

  return (
    <div className="">
      <img
        src="/img/bg-dots-bottom.png"
        alt=""
        className="absolute bottom-0 left-0 w-full -z-10 md:hidden"
      />
      <footer className=" flex z-[60]  max-h-[60px] h-full fixed w-full text-white bottom-0 ">
        <div className=" relative w-full bg-brand-red-500 flex items-center justify-center max-h-[60px] h-full">
          <div className="flex items-center justify-center w-1/2 ">
            <img src="/svg/cart.svg" alt="icone carrinho" />
            <strong className="text-xl ml-4">{totalItems} items</strong>
          </div>
          <div className="h-full  flex items-center  min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent bg-brand-red-200  to-transparent opacity-20 dark:opacity-100"></div>
          <div className="w-1/2 flex justify-center items-center">
            <Link href="/dashboard/carrinho">Ver Carrinho</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

