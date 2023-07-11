import { Icon } from '@iconify/react'
import Router, { useRouter } from 'next/router'
import React from 'react'

interface DashboardButtonProps {
  icon: string
  title: string
  link: string
}

export default function DashboardButtonPlus({
  icon,
  link,
  title,
}: DashboardButtonProps) {
  const router = useRouter()
  return (
    <div
      className="w-full aspect-square bg-gradient-to-r from-slate-500 to-slate-700 rounded-md shadow flex justify-center items-center flex-col hover:scale-95 transition-all cursor-pointer p-3"
      onClick={() => router.push(link)}
    >
      <Icon icon={icon} className="text-5xl text-white" />
      {/* <span className="text-white font-bold text-xl mt-3 text-center">
        {title}
      </span> */}
    </div>
  )
}
