import { Icon } from '@iconify/react'
import Router, { useRouter } from 'next/router'
import React from 'react'

interface DashboardButtonProps {
  icon: string
  title: string
  link: string
  color?: string
}

export default function DashboardButton({
  icon,
  link,
  title,
  color,
}: DashboardButtonProps) {
  const router = useRouter()
  return (
    <div
      className="w-full aspect-square  rounded-md shadow flex justify-center items-center flex-col hover:scale-95 transition-all cursor-pointer p-3"
      style={{ backgroundColor: color ?? '#52448f' }}
      onClick={() => router.push(link)}
    >
      <Icon icon={icon} className="text-5xl sm:text-3xl text-white" />
      <span className={'text-white font-bold mt-3 text-center uppercase  lg:text-sm'}>
        {title}
      </span>
    </div>
  )
}
