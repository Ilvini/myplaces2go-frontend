import { Icon } from '@iconify/react'
import React from 'react'

export const Ratting = ({ size = 18 }) => {
  return (
    <div className="flex mr-2">
      <Icon className="" fontSize={size} icon="ic:round-star" color="#528fa7" />
      <Icon className="" fontSize={size} icon="ic:round-star" color="#528fa7" />
      <Icon className="" fontSize={size} icon="ic:round-star" color="#528fa7" />
      <Icon className="" fontSize={size} icon="ic:round-star" color="#528fa7" />
      <Icon
        className="text-brand-gray-400"
        fontSize={size}
        icon="ic:round-star"
      />
    </div>
  )
}

