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

const Favorite: NextPage = () => {
  const [favorites, setFavorites] = React.useState<any[]>([])

  const InfoCity = {
    error: false,
    message: 'Sucesso!',
    results: {
      imagem_bandeira_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Bandeira_de_Bel%C3%A9m.svg/275px-Bandeira_de_Bel%C3%A9m.svg.png',
      descricao:
        '<p>Capital do Pará e situado na região Norte do país, <strong>Belém</strong> que foi fundada em 1616, possui uma extensão territorial de 1.059,458 km². Segundo estimativa do IBGE de 2019, a população do município é de 1.492.795 habitantes, sendo o décimo segundo mais populoso do país e o segundo da Região Norte. Quem nasce em Belém é chamado de belenense.</p>',
      dados_gerais: {
        regiao: 'Norte do Brasil',

        governo: 'Democracia representativa',
        area_territorial_em_km2: '43.750,426',
        populacao: '17.366.189',
        clima: 'Equatorial',
      },
      imagem_mapa_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Brazil_Para_Belem_location_map.svg/250px-Brazil_Para_Belem_location_map.svg.png',
      fotos: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cidade_Maravilhosa.jpg/288px-Cidade_Maravilhosa.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/P%C3%A3o_de_A%C3%A7ucar_Rio_de_Janeiro_Brazil_-_panoramio_-_Hiroki_Ogawa_%28cropped%29.jpg/98px-P%C3%A3o_de_A%C3%A7ucar_Rio_de_Janeiro_Brazil_-_panoramio_-_Hiroki_Ogawa_%28cropped%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/At_Rio_de_Janeiro_2019_200_%28cropped%29.jpg/92px-At_Rio_de_Janeiro_2019_200_%28cropped%29.jpg',
      ],
    },
  }

  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/" />
      <section className="mx-4 my-4">
        <h2 className="text-2xl text-brand-gray-900">
          Informações do município.
        </h2>

        <div className="my-4">
          <p className="text-xl">Bandeira:</p>
          <img
            src={InfoCity.results.imagem_bandeira_url}
            className="w-full "
            alt=""
          />
        </div>
        <div className="my-4">
          <strong>Descrição:</strong>
          <div
            className="text-brand-gray-600"
            dangerouslySetInnerHTML={{ __html: InfoCity.results.descricao }}
          ></div>
        </div>
        <table className="w-full">
          <tr className={`w-full ${'even:bg-gray-50 odd:white'}`}>
            <td className="">População</td>
            <td className="text-brand-gray-600 float-right">
              {InfoCity.results.dados_gerais.populacao} Habitantes
            </td>
          </tr>
          <tr className={`w-full ${'even:bg-gray-50 odd:white'}`}>
            <td className="">Clima</td>
            <td className="text-brand-gray-600 float-right">
              {InfoCity.results.dados_gerais.clima}
            </td>
          </tr>
          <tr className={`w-full ${'even:bg-gray-50 odd:white'}`}>
            <td className="">Área Territoriai</td>
            <td className="text-brand-gray-600 float-right">
              {InfoCity.results.dados_gerais.area_territorial_em_km2} km²
            </td>
          </tr>
          <tr className={`w-full ${'even:bg-gray-50 odd:white'}`}>
            <td className="">Região</td>
            <td className="text-brand-gray-600 float-right">
              {InfoCity.results.dados_gerais.regiao}
            </td>
          </tr>
          <tr className={`w-full ${'even:bg-gray-50 odd:white'}`}>
            <td className="">Governo</td>
            <td className="text-brand-gray-600 float-right">
              {InfoCity.results.dados_gerais.governo}
            </td>
          </tr>
        </table>
        {InfoCity.results.imagem_mapa_url && (
          <div className="my-4">
            <img
              src={InfoCity.results.imagem_mapa_url}
              alt="mapa do município"
              className="w-full"
            />
          </div>
        )}
        <div className="">
          <h3 className="text-xl mb-2">Mais Fotos:</h3>
          <div className="grid grid-cols-2 gap-4">
            {InfoCity.results.fotos.map((foto) => {
              return (
                <img
                  src={foto}
                  alt="fotos do município"
                  className="aspect-square w-full h-full rounded-lg"
                />
              )
            })}
          </div>
        </div>
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Favorite

