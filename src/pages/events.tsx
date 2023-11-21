/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import 'swiper/css'
import 'swiper/css/pagination'
import BottomNavigation from '../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useFetch } from '../services/useFetch'
import Cookies from 'js-cookie'
import { HeaderNavigation } from '../components/HeaderNavigation'
import { formatDate, formatarData } from '../helpers/formatDate'
import { Icon } from '@iconify/react'

const Events: NextPage = () => {
  const router = useRouter()

  const events = {
    error: false,
    message: 'Sucesso!',
    results: [
      {
        id: 123123,
        nome: 'III Oficina Livre de Teatro | Vermelho, Branco & Oficina Azul',
        descricao:
          '<strong>Vermelho, Branco e... Oficina Azul? ❤️🤍💙</strong><p>As inscrições para a III Oficina Livre de Teatro da Liga do Teatro estão oficialmente abertas! Corre e garante tua vaga.</p> ',
        gratuito: false,
        valor: 42.99,
        imagem_url:
          'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F420576d5f5d16b12d00d53a989e5098a.cdn.bubble.io%2Ff1689182822156x448334157309323600%2F359720170_18168491065305223_8498169309356171089_n.jpg?w=768&h=486&auto=compress&dpr=1&fit=max',
        ingresso_url: 'www.linkparabilheteria.com.br',
        data_de_inicio: '23-11-2023',
        data_de_fim: '25-11-2023',
        endereco: 'Av. Alcindo Cacela, 287',
      },
      {
        id: 123123,
        nome: 'Museu das Ilusões no Shopping Bosquel',
        descricao:
          '<p>O Museu das Ilusões chegou no Shopping Bosque! 😵‍</p><p>O maior acervo de ilusão de óptica do mundo chega a Belém pela primeira vez. Garanta seu ingresso e venha conhecer.</p><p> #PraCegoVer #PraTodoMundoVer: Fundo nas cores branco e azul. Na imagem, estão as informações do Museu das Ilusões. O evento ocorre a partir do dia 22 de setembro e é o maior acervo de ilusão de óptica do mundo.</p>',
        gratuito: true,
        valor: null,
        imagem_url:
          'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F420576d5f5d16b12d00d53a989e5098a.cdn.bubble.io%2Ff1695864333585x251564482884790720%2F380953652_18387094318019484_4080640799540961206_n.jpg?w=384&h=483&auto=compress&dpr=1&fit=max',
        ingresso_url: 'www.linkparabilheteria.com.br',
        data_de_inicio: '23-11-2023',
        data_de_fim: '25-11-2023',
        endereco: 'Av. Alcindo Cacela, 287',
      },
      {
        id: 123123,
        nome: 'Exposição “Catarse de Devoção” da artista Paula Giordano',
        descricao:
          '<p>🏛️A Galeria Benedito Nunes recebe a exposição “Catarse de Devoção”, da artista Paula Giordano.</p><p>🖼️A obra nasce a partir de uma pesquisa que investiga a relação dos devotos com a corda do Círio.</p><p>Vem prestigiar!</p>',
        gratuito: true,
        valor: null,
        imagem_url:
          'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F420576d5f5d16b12d00d53a989e5098a.cdn.bubble.io%2Ff1696467756367x855578247967552600%2F385868593_1711095322738666_1174685262079946420_n.jpg?w=768&h=486&auto=compress&dpr=1&fit=max',
        ingresso_url: 'www.linkparabilheteria.com.br',
        data_de_inicio: '23-11-2023',
        data_de_fim: '25-11-2023',
        endereco: 'Av. Alcindo Cacela, 287',
      },
    ],
  }

  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/" />
      <section className="mx-4 my-4">
        <h3 className="text-brand-gray-600 text-xl">Eventos na minha cidade</h3>
        <div className="w-full">
          {events.results.map((event) => {
            return (
              <div key={event.id} className="p-4 shadow-xl my-4 rounded-lg ">
                <div className="relative aspect-[16/12]">
                  <img
                    src={event.imagem_url}
                    alt=""
                    className=" rounded-lg  object-contain bg-black w-full h-full"
                  />
                  {event.gratuito && (
                    <span className="absolute bottom-2 left-1 bg-brand-green-400 p-1 px-2 rounded-lg flex items-center justify-center">
                      <Icon
                        icon="ic:baseline-money-off"
                        color="white"
                        fontSize={24}
                        className="mr-2"
                      />
                      Entrada Franca
                    </span>
                  )}
                  {event.valor && (
                    <span className="absolute bottom-2 left-1 bg-brand-green-400 p-1 px-2 rounded-lg flex items-center justify-center">
                      <Icon
                        icon="carbon:money"
                        color="white"
                        fontSize={24}
                        className="mr-2"
                      />
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 3,
                      }).format(event.valor)}
                    </span>
                  )}
                </div>

                <p className="uppercase mt-4 bg-brand-yellow-300 p-1 w-fit px-2 rounded-lg flex items-center justify-center">
                  {formatarData(event.data_de_inicio)}{' '}
                  <Icon
                    icon="mingcute:arrow-right-fill"
                    className="inline-block mx-2"
                  />{' '}
                  {formatarData(event.data_de_fim)}
                </p>
                <h3 className="mt-3 text-xl">{event.nome}</h3>
                <div
                  className="text-brand-gray-600 mt-2"
                  dangerouslySetInnerHTML={{ __html: event?.descricao }}
                ></div>
                <p className="my-2">Endereço: {event.endereco}</p>
                {!event.gratuito && event.ingresso_url && (
                  <a href={event.ingresso_url} target="_blank" rel="noreferrer">
                    <button className="bg-brand-yellow-300   rounded-lg p-3 mt-3 w-full text-center ">
                      Comprar Ingresso
                    </button>
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <BottomNavigation />
    </main>
  )
}

export default Events

