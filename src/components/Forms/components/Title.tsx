import React from 'react'

export default function Title({ text }: { text: string }) {
  return <h2 className="mb-3 font-bold text-slate-700 text-xl">{text}</h2>
}
