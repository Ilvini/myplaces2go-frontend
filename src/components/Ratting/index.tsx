import { Icon } from '@iconify/react'
import React from 'react'

export const Ratting = ({
  size = 18,
  count,
}: {
  size: number
  count: number
}) => {
  return (
    <div className="flex mr-2">
      {[0, 1, 2, 3, 4].map((item) => {
        if (Math.round(count) > item)
          return (
            <Icon
              fontSize={size}
              icon="ic:round-star"
              className="text-brand-yellow-300"
            />
          )
        return (
          <Icon
            className="text-brand-gray-500"
            fontSize={size}
            icon="ic:round-star"
          />
        )
      })}
    </div>
  )
}

