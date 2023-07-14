import React from 'react'
import { BottomNavigation } from '../BottomNavigation'
import { TopNavigation } from '../TopNavigation'
import { useCartStore } from '../../stores/cartStore'
import useFromStore from '../../hooks/useFromStore'
interface ILayoutWIthElementFloat {
  hasBackpage?: boolean
  children: React.ReactNode
}

export const LayoutWIthElementFloat = ({
  children,
  hasBackpage,
}: ILayoutWIthElementFloat) => {
  const totalItems = useFromStore(useCartStore, (state) => state.totalItems)

  return (
    <>
      <TopNavigation hasBackPage={hasBackpage} />
      <main className="w-full justify-center  flex mt-28">{children}</main>
      <BottomNavigation totalItems={totalItems} />
    </>
  )
}

