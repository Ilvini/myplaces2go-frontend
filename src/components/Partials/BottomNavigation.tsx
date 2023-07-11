import { useEffect, useState } from 'react'
import Container from './Container'
import { VersionName } from './VersionName'

export default function BottomNavigation() {
  const [online, setOnline] = useState(false)

  useEffect(() => {
    setOnline(navigator.onLine)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-gray-200 py-4 md:py-1">
      <Container>
        <div className="flex justify-between items-center py-1">
          <VersionName />
          <small className="text-white text-sm">
            Versão de desenvolvimento
          </small>
          <p className="text-white ml-2 text-sm">
            <span>Status: </span>
            <span className={online ? 'text-green-500' : 'text-red-500'}>
              {online ? 'Online' : 'Offline'}{' '}
            </span>
          </p>
        </div>
      </Container>
    </div>
  )
}
