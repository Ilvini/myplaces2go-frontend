import { Icon } from '@iconify/react'
import React from 'react'

interface Props {
  image: string
  name?: string
  comment: string
  date: string
  star: number
}

export const UserComments = ({ image, name, comment, date, star }: Props) => {
  return (
    <div className="flex items-start py-3 border-b border-gray-200">
      {/*  <img
        src={image}
        alt=""
        className="rounded-full mr-2 aspect-square w-12 h-12"
      /> */}

      <div>
        <div className="">
          <p className="text-brand-gray-900 inline-block">{name}</p>
          <span className="text-brand-green-300 w-fit ml-2">{date}</span>
        </div>
        <div className="flex items-center gap-1">
          {star &&
            Array.from(Array(star)).map((item) => {
              return (
                <Icon
                  key={item}
                  icon="mdi:star"
                  fontSize={24}
                  className="text-brand-yellow-300"
                />
              )
            })}
        </div>
        <p className="text-brand-gray-600">{comment}</p>
      </div>
    </div>
  )
}
