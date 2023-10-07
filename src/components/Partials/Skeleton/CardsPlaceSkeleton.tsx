import React from 'react'

export const CardsPlaceSkeleton = () => {
  return (
    <div className="w-full">
      <div className="aspect-square rounded-3xl drop-shadow-lg  w-full bg-zinc-200 animate-pulse" />
      <div className="flex  flex-col mt-1">
        <span className="animate-pulse h-3 w-full flex bg-zinc-300 rounded-2xl mt-3"></span>
        <span className="animate-pulse h-3 w-20 flex bg-zinc-300 rounded-2xl mt-3"></span>
        <span className="animate-pulse h-2 w-14 flex bg-zinc-300 rounded-2xl mt-3"></span>
      </div>
    </div>
  )
}

