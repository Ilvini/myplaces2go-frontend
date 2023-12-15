/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'

import BottomNavigation from '../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useFetch } from '../services/useFetch'
import Cookies from 'js-cookie'
import { HeaderNavigation } from '../components/HeaderNavigation'

interface InfoCity {
  error: boolean
  message: string
  results: {
    cidade: string
    estado: string
    imagem_bandeira_url: string
    descricao: string
    historia: string
    formacao_administrativa: string
    dados_gerais: {
      regiao: string
      governo: string
      area_territorial_em_km2: string
      populacao: string
      clima: string
    }
    imagem_mapa_url: string
    fotos: string[]
  }
}
function criarParagrafos(texto: string) {
  // Divida o texto em parágrafos usando '\r\n' como delimitador
  const paragrafos = texto.split('\r\n')

  // Remova parágrafos vazios
  const paragrafosFiltrados = paragrafos.filter((p) => p.trim() !== '')

  // Crie elementos <p> para cada parágrafo
  const elementosP = paragrafosFiltrados.map((p) => `<p class>${p.trim()}</p>`)

  // Junte os elementos em uma única string
  const resultado = elementosP.join('\n')

  return resultado
}

const Favorite: NextPage = () => {
  const { lat, long } = useRouter().query

  const { data: city } = useFetch<InfoCity>(`/info-city?lat=${lat}&lon=${long}`)

  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/" />
      <section className="mx-4 my-4">
        <h2 className="text-2xl text-brand-gray-900">
          Informações do município.
        </h2>

        <div className="my-4">
          <p className="text-2xl">Bandeira:</p>
          <img
            src={city?.results.imagem_bandeira_url}
            className="w-full "
            alt=""
          />
        </div>
        <table className="w-full text-xl">
          <tr className={`w-full ${'even:bg-gray-50 odd:white'} `}>
            <td className="">População</td>
            <td className="text-brand-gray-600 float-right">
              {new Intl.NumberFormat('pt-BR', {
                style: 'decimal',
                currency: 'BRL',
              }).format(city?.results.dados_gerais.populacao)}{' '}
              Habitantes
            </td>
          </tr>
          {/* <tr className={`w-full ${'even:bg-gray-50 odd:white'}`}>
            <td className="">Clima</td>
            <td className="text-brand-gray-600 float-right">
              {city?.results.dados_gerais.clima}
            </td>
          </tr> */}
          <tr className={`w-full ${'even:bg-gray-50 odd:white'}`}>
            <td className="">Área Territoriai</td>
            <td className="text-brand-gray-600 float-right">
              {city?.results.dados_gerais.area_territorial_em_km2} km²
            </td>
          </tr>
          <tr className={`w-full ${'even:bg-gray-50 odd:white'}`}>
            <td className="">Região</td>
            <td className="text-brand-gray-600 float-right">
              {city?.results.dados_gerais.regiao}
            </td>
          </tr>
          <tr className={`w-full ${'even:bg-gray-50 odd:white'}`}>
            <td className="">Governo</td>
            <td className="text-brand-gray-600 float-right">
              {city?.results.dados_gerais.governo}
            </td>
          </tr>
        </table>
        <div className="my-4">
          <strong className="text-2xl">Descrição:</strong>
          <div
            className="text-brand-gray-600 text-embed text-justify "
            dangerouslySetInnerHTML={{
              __html:
                (city?.results.historia &&
                  criarParagrafos(city?.results.historia)) ||
                '',
            }}
          ></div>
        </div>
        <div className="my-4">
          <strong className="text-2xl">Formação Administrativa:</strong>
          <div
            className="text-brand-gray-600 text-embed text-justify text-sm"
            dangerouslySetInnerHTML={{
              __html:
                (city?.results.formacao_administrativa &&
                  criarParagrafos(city?.results.formacao_administrativa)) ||
                '',
            }}
          ></div>
        </div>

        {city?.results.imagem_mapa_url && (
          <div className="my-4">
            <img
              src={city.results.imagem_mapa_url}
              alt="mapa do município"
              className="w-full"
            />
          </div>
        )}
        {/* <div className="">
          <h3 className="text-xl mb-2">Mais Fotos:</h3>
          <div className="grid grid-cols-2 gap-4"> */}
        {/*  {InfoCity.results.fotos.map((foto) => {
              return (
                <img
                  key={foto}
                  src={foto}
                  alt="fotos do município"
                  className="aspect-square w-full h-full rounded-lg"
                />
              )
            })} */}
        {/*   </div>
        </div> */}
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Favorite
