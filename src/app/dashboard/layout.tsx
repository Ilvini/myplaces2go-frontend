'use client'

import BottomNavigation from '../../components/Partials/BottomNavigation'
import { TopNavigation } from '../../components/TopNavigation'

export default function LayoutDashboard({ children }) {
  return (
    <>
      <TopNavigation />
      <main className="w-full justify-center  flex mt-28">{children}</main>
      <BottomNavigation />
    </>
  )
}

