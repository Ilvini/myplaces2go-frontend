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
      className="bg-brand-yellow-300 rounded-lg p-3 mt-3 w-full text-center"
    />
  )
}

