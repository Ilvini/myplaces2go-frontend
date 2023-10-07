import { useEffect, useState, useSyncExternalStore } from 'react'

export function useWindowDimensions() {
  const [currentWidth, setCurrentWidth] = useState<number>()
  // the 3rd parameter is optional and only needed for server side rendering

  useEffect(() => {
    if (typeof window === 'undefined') return
    setCurrentWidth(window.innerWidth)
  }, [])

  return { currentWidth }
}
