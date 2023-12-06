import { useEffect, useState } from 'react'
import Container from './Container'
import { VersionName } from './VersionName'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function BottomNavigation() {
  const [online, setOnline] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setOnline(navigator.onLine)
  }, [])

  // function handleHasLogged() {
  //   const token = localStorage.getItem('token')
  //   if (!token) return router.push('/login')
  //   router.push('/profile')
  // }

  return (
    <div className="flex flex-col fixed bottom-0 left-0 right-0">
      <div className="w-full bg-brand-blue-100">
        <Container>
          <ul className="w-full flex justify-between">
            <Link href="/">
              <li className="p-4 flex justify-center flex-col items-center">
                <Icon
                  icon="bx:bxs-home"
                  fontSize={24}
                  className="text-brand-yellow-300"
                />
                <p className="text-white"> Início</p>
              </li>
            </Link>
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

            <Link href="/profile">
              <li className="p-4 flex justify-center flex-col items-center">
                <Icon
                  icon="bx:bxs-user"
                  fontSize={24}
                  className="text-brand-yellow-300"
                />

                <p className="text-white"> Perfil</p>
              </li>
            </Link>
            <Link href="/configuration">
              <li className="p-4 flex justify-center flex-col items-center">
                <Icon
                  icon="mdi:cog"
                  fontSize={24}
                  className="text-brand-yellow-300"
                />

                <p className="text-white"> Configurações</p>
              </li>
            </Link>
          </ul>
        </Container>
      </div>
    </div>
  )
}

