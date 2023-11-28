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

/* {
  cidade: 'Rio de Janeiro',
  estado: 'Rio de Janeiro',
  imagem_bandeira_url: 
    'https://upload.wikimedia.org/wikipedia/commons/6/62/Rio_de_Janeiro%2C_RJ_-_Bandeira.svg',
  historia: 
    'A cidade é mencionada oficialmente pela primeira vez quando a segunda expedição exploratória portuguesa, comandada por Gaspar lemos, chegou em Janeiro de 1502, à baía, que o navegador supôs, compreensivelmente, ser a foz de um rio, por conseguinte, dando o nome à região do Rio de Janeiro.\r\n' +
    'Porém só em 1530 a corte portuguesa mandou uma expedição para colonizar a área, em vez de continuar usando-a simplesmente como uma parada em suas aventuras marítimas. Os franceses, por outro lado, tinham estado no Rio de Janeiro e arredores desde o começo do século e estavam dispostos a lutar pelo domínio da região. Em 1560, depois de uma série de escaramuças, os portugueses expulsaram os franceses.\r\n' +
    'O começo da cidade como tal foi no Morro de São Januário, mais tarde conhecido como Morro do Castelo, e depois na Praça Quinze até hoje centro vital do Rio.\r\n' +
    'O Rio de Janeiro desenvolveu-se graças à sua vocação natural como porto. Na mesma época em que ouro foi descoberto no Estado de Minas Gerais, no final do século XVII, o Governador do Brasil foi feito Vice-rei. Salvador era capital da colônia, mas a importância crescente do porto do Rio garantiu a transferência da sede do poder para o sul, para a cidade que se tornaria, e ainda é, o centro intelectual e cultural do país.\r\n' +
    'Em 1808 a família real portuguesa veio para o Rio de Janeiro, refúgio escolhido diante da ameaça de invasão napoleônica. Quando a família real voltou para Portugal e a independência do Brasil foi declarada em 1822, as minas de ouro já haviam sido exauridas e dado lugar a uma outra riqueza: o café.\r\n' +
    'O crescimento continuou durante quase todo o século XIX, inicialmente na direção norte, para São Cristóvão e Tijuca, e depois na direção da zona sul, passando pela Glória, pelo Flamengo e por Botafogo. No entanto, em 1889, a abolição da escravatura e colheitas escassas interromperam o progresso. Esse período de agitação social e política levou à Proclamação da República. O Rio, então chamado Distrito Federal, continuou sendo o centro político e a capital do país.\r\n' +
    'No começo do século XX surgiram as ruas largas e construções imponentes, a maioria no estilo francês fin-de-siècle. O Rio de Janeiro manteve sua posição até a inauguração de Brasília como capital da república em 1960. Capital do Estado do Rio de Janeiro, a cidade continua sendo o centro social e cultural do país.\r\n' +
    'A pessoa natural do Rio de Janeiro, coisas ou fatos a ela relacionados são chamados de carioca, palavra de origem tupi (kari´oka, casa de branco, de kara´i-branco e oka-casa).',
  formacao_administrativa: 
    'A Cidade de São Sebastião do Rio de Janeiro, fundada a 01-03-1565, teve logo alguns cargos essenciais providos pelo governador-geral Mem de Sá, como seja, o alcaide-mor, ouvidor, juiz de órgãos e feitor da fazenda. Salvador Correia de Sá nomeou o medidor de terras, para resolver o problema das sesmarias.\r\n' +
    '\tA terra fazia, então, parte da capitania doada a Martim Afonso de Sousa. Nada Comprova que ele tenha cedido seus direitos.\r\n' +
    '\tPertenciam à Cidade de São Sebastião as populações ribeirinhas da baía da Guanabara como os centros de povoamento circunvizinhos que eram chamados “freguesia de terra adentro e freguesia da costa a fora”. O termo da Cidade estendia-se, na orla atlântica, de Ponta Negra à Ponta da Marambaia, e, no interior, galgando a serra do mar, antiga a margem direita do curso médio do Paraíba do Sul.\r\n' +
    '\tA Carta Régia, de 11-03-1757, atribuiu à Câmara o título de Senado da Câmara e ao ouvidor as atribuições de prefeito.\r\n' +
    'Em 1763 passa a ser capital do Brasil Colônia transferida da Bahia.\r\n' +
    'O Alvará de 05-04-1808, cria a Intendência Geral da Polícia da Corte e do Estado do Brasil, ficando o Intendente geral de polícia com as atribuições idênticas às de prefeito.\r\n' +
    '\tSede da antiga capitania do Rio de Janeiro e, também capital da Província do mesmo nome, separou-se desta, em 1834 em virtude do Ato Adicional à Constituição de 1824, para constituir-se no município neutro da Corte. Passa, então, a administração da cidade a ser orientada pelo presidente de sua Câmara.\r\n' +
    '\tO Decreto nº 50, de 7-12-1889, do Governo Provisório da República dos Estados Unidos do Brasil, dissolve a Câmara Municipal e cria o Conselho de Intendência Municipal do Rio de Janeiro, capital da República. O presidente da Intendência Municipal responde pela administração do município.\r\n' +
    'A Lei nº 85, de 20-09-1892, cria os prefeitos municipais.\r\n' +
    'Com o advento da República, passou, por força do artigo 2º da Constituição de 24-02- 1891, o antigo município neutro a constituir o Distrito Federal, continuando a ser a Capital do Brasil. O parágrafo único do artigo 3º determinava que o Distrito Federal passaria a constituir um Estado, uma vez efetuada a transferência da Capital do País. \r\n' +
    '\tA Constituição de 1946, no seu Ato das Disposições Transitórias, artigo 4º, determina: “efetuada a transferência, o atual Distrito Federal passará a constituir o Estado da Guanabara”.\r\n' +
    'A 21-04-1960, efetivada a transferência da capital da República para Brasília, em virtude da Lei nº.3.273, de 21-10-1957, o antigo Distrito Federal passou a constituir nova unidade da Federação Brasileira – o Estado da Guanabara, por força da Lei nº.3.752, de 14 –04-1960.\r\n' +
    '\tA Constituição do Estado da Guanabara, promulgada pela Assembléia Constituinte a 27-03-1961, dotou o novo Estado de Três Poderes: Executivo, Legislativo e Judiciário.\r\n' +
    '\tO antigo Distrito Federal, desde o Decreto-lei n.º 12.356, de 10-01-1917, estava com seu território delimitado por circunscrições, chegando, como atualmente, a haver 34 circunscrições.\r\n' +
    '\tO Decreto n.º 898, de 09-03-1962, completado pelo de n.º 1.656, de 24-04-1963, dispõe que “para efeito de organização e administração dos serviços de natureza local, fica o território do Estado da Guanabara dividido em 21 regiões administrativas”. \r\n' +
    'Pela Lei Complementar n.º 20, de 01-07-1974, o município do Rio de Janeiro passou a ser a capital do estado do Rio após a fusão do estado do Rio de Janeiro e da Guanabara.\r\n' +
    'Em Síntese de 31-XII-1994, o município do Rio de Janeiro é constituído do distrito sede.\r\n' +
    'Assim permanecendo em divisão territorial datada de 2007.',
  dados_gerais: {
    regiao: 'Região Sudeste',
    governo: 'Democracia representativa',
    area_territorial_em_km2: 1200,
    populacao: 6211223,
    gentilico: 'carioca'
  },
  imagem_mapa_url: 
    'https://upload.wikimedia.org/wikipedia/commons/d/d6/Brazil_Rio_de_Janeiro_Rio_de_Janeiro_location_map.svg',
  fotos: []
} */

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

const Favorite: NextPage = () => {
  const { lat, long } = useRouter().query
  console.log(lat, long)

  const { data: city } = useFetch<InfoCity>(`/info-city?lat=${lat}&lon=${long}`)
  console.log(city)
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
            src={city?.results.imagem_bandeira_url}
            className="w-1/2 "
            alt=""
          />
        </div>
        <div className="my-4">
          <strong>Descrição:</strong>
          <div
            className="text-brand-gray-600 text-embed "
            dangerouslySetInnerHTML={{ __html: city?.results.historia || '' }}
          ></div>
        </div>
        <div className="my-4">
          <strong>Formação Administrativa:</strong>
          <div
            className="text-brand-gray-600 text-embed "
            dangerouslySetInnerHTML={{
              __html: city?.results.formacao_administrativa || '',
            }}
          ></div>
        </div>
        <table className="w-full">
          <tr className={`w-full ${'even:bg-gray-50 odd:white'}`}>
            <td className="">População</td>
            <td className="text-brand-gray-600 float-right">
              {city?.results.dados_gerais.populacao} Habitantes
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
        {/*   {InfoCity.results.imagem_mapa_url && (
          <div className="my-4">
            <img
              src={InfoCity.results.imagem_mapa_url}
              alt="mapa do município"
              className="w-full"
            />
          </div>
        )} */}
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

