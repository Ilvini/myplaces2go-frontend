import React from 'react'

export default function ButtonOutline(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return (
    <button
      {...props}
      className="border border-brand-yellow-300 rounded-lg p-3 mt-3 w-full text-center"
    />
  )
}

