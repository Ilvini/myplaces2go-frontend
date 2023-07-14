import React from 'react'
import { Toaster } from 'react-hot-toast'

export function ToasterComponent() {
  return (
    <Toaster
      toastOptions={{
        duration: 3000,
        className: 'bg-brand-blue-800 text-white',
        style: {
          background: '#12238A',
          color: '#fff',
          padding: '10px',
          fontSize: '1.3rem',
          zIndex: 999999,
        },
      }}
    />
  )
}

