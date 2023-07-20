import React from 'react'
import { BottomNavigation } from '../BottomNavigation'
import { TopNavigation } from '../TopNavigation'

interface ILayoutWIthElementFloat {
  hasBackpage?: boolean
  navigationUrl?: string
  children: React.ReactNode
}

export const LayoutWIthElementFloat = ({
  children,
  navigationUrl,
  hasBackpage,
}: ILayoutWIthElementFloat) => {
  return (
    <>
      <TopNavigation navigationUrl={navigationUrl} hasBackPage={hasBackpage} />
      <main className="w-full justify-center  flex mt-28">{children}</main>
      <BottomNavigation />
    </>
  )
}

