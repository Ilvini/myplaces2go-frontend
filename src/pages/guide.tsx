/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import BottomNavigation from '../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useFetch } from '../services/useFetch'
import Cookies from 'js-cookie'
import { removeEspecialCharactersOfPhone } from '../helpers/removeEspecialCharacters'

export interface IGuide {
  n_certificado: string
  uf: string
  municipio: string
  nome: string
  telefone: string
  email: string
  site: any
  cidades_atuacao: string[]
  categorias: string[]
  segmentos: string[]
  idiomas: string[]
  motorista: boolean
}

interface IResponse {
  results: IGuide[]
  error: boolean
  message: string
}

const Guides: NextPage = () => {
  const router = useRouter()
  /* useEffect(() => {
    userIsLogged()
  }, []) */

  /* function userIsLogged() {
    const token = Cookies.get('token')
    if (!token) return router.push('/login')
  } */
  const { data: guide } = useFetch<IResponse>(`/guias?estado=PA&cidade=Belém`)

  /*  } */

  return (
    <main className="relative pb-20">
      <header className="py-4  shadow-md">
        <nav className="flex justify-center w-full items-center">
          <Link href={'/'}>
            <button className="w-1/3 mr-14">
              <Icon
                icon="icon-park-outline:back-one"
                color="#528fa7"
                fontSize={32}
              />
            </button>
          </Link>
          <div className="w-1/3">
            <img src="/img/logo.png" alt="logo my place 2 go" />
          </div>
          <div className="w-1/3"></div>
        </nav>
      </header>
      <section className="mx-4 my-4">
        <h3 className="text-brand-gray-600 text-xl">Encontrando um guia</h3>
        {guide?.results.map((guide) => {
          return (
            <div key={guide.n_certificado} className="flex my-3 border-b ">
              <div className=" w-full">
                <h4 className="text-base text-brand-gray-600 font-bold">
                  {guide.nome}
                </h4>
                <p className="text-base text-brand-gray-600">{guide.email}</p>
                <p className="text-sm ">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${removeEspecialCharactersOfPhone(
                      guide.telefone
                    )}`}
                    className="flex"
                  >
                    <p className="mr-2"> {guide.telefone}</p>
                    <Icon icon="logos:whatsapp-icon" fontSize={18} />
                  </a>
                </p>
                <small>Número de certificado: {guide.n_certificado}</small>
                <p className="flex flex-wrap">
                  Idiomas:
                  {guide.idiomas.map((idioma, index) => {
                    return (
                      <small
                        key={index}
                        className="mx-1 p-[2px] text-sm rounded-md text-brand-gray-900 bg-brand-yellow-300"
                      >
                        {idioma}
                      </small>
                    )
                  })}
                </p>
              </div>
            </div>
          )
        })}
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Guides

