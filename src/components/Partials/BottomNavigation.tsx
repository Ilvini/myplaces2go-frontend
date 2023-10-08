import { useEffect, useState } from 'react'
import Container from './Container'
import { VersionName } from './VersionName'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function BottomNavigation() {
  const [online, setOnline] = useState(false)

  useEffect(() => {
    setOnline(navigator.onLine)
  }, [])

  return (
    <div className="flex flex-col fixed bottom-0 left-0 right-0">
      <div className="w-full bg-brand-blue-100">
        <Container>
          <ul className="w-full flex justify-between">
            <li className="p-4 flex justify-center flex-col items-center">
              <Icon
                icon="bx:bxs-home"
                fontSize={24}
                className="text-brand-yellow-300"
              />
              <p className="text-white"> Início</p>
            </li>
            <Link href={'/dashboard/favorite'}>
              <li className="p-4 flex justify-center flex-col items-center">
                <Icon
                  icon="bx:bxs-heart"
                  fontSize={24}
                  className="text-brand-yellow-300"
                />

                <p className="text-white"> Favoritos</p>
              </li>
            </Link>
            <li className="p-4 flex justify-center flex-col items-center">
              <Icon
                icon="bx:bxs-user"
                fontSize={24}
                className="text-brand-yellow-300"
              />

              <p className="text-white"> Perfil</p>
            </li>
          </ul>
        </Container>
      </div>
    </div>
  )
}

