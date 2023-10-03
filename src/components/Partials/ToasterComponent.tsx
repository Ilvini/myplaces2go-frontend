import React from 'react'
import { Toaster } from 'react-hot-toast'

export function ToasterComponent() {
  return (
    <Toaster
      toastOptions={{
        duration: 3000,

        style: {
          background: '#fff',
          color: 'gray',
          padding: '10px',
          fontSize: '1.3rem',
          zIndex: 999999,
        },
      }}
    />
  )
}

