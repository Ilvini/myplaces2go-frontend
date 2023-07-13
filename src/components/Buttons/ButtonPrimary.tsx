import React from 'react'

export default function ButtonPrimary(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return (
    <button
      {...props}
      className="bg-brand-blue-800 font-bold text-white w-full px-5 py-5 text-base rounded-full"
    />
  )
}

