import React from 'react'
import { BottomNavigation } from '../BottomNavigation'
import { TopNavigation } from '../TopNavigation'

interface ILayoutWIthElementFloat {
  hasBackpage?: boolean
  children: React.ReactNode
}

export const LayoutWIthElementFloat = ({
  children,
  hasBackpage,
}: ILayoutWIthElementFloat) => {
  return (
    <>
      <TopNavigation hasBackPage={hasBackpage} />
      <main className="w-full justify-center  flex mt-28">{children}</main>
      <BottomNavigation />
    </>
  )
}

