/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'

import Link from 'next/link'
import React, { useEffect } from 'react'

import { HeaderNavigation } from '../components/HeaderNavigation'
interface FormProps {
  nome: string
  email: string
  celular: string
  password: string
  password_confirmation: string
}

const TermoDeUso: NextPage = () => {
  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/" />
      <section className="mx-4 my-4">
        <h1 className="mb-3 text-2xl"> Política Privacidade</h1>
        <p className="mb-4 text-brand-gray-600">
          A sua privacidade é importante para nós. É política do My Place 2 Go
          respeitar a sua privacidade em relação a qualquer informação sua que
          possamos coletar no site My Place 2 Go, e outros sites que possuímos e
          operamos.
        </p>
        <p className="mb-4 text-brand-gray-600">
          Solicitamos informações pessoais apenas quando realmente precisamos
          delas para lhe fornecer um serviço. Fazemo-lo por meios justos e
          legais, com o seu conhecimento e consentimento. Também informamos por
          que estamos coletando e como será usado.
        </p>
        <p className="mb-4 text-brand-gray-600">
          Apenas retemos as informações coletadas pelo tempo necessário para
          fornecer o serviço solicitado. Quando armazenamos dados, protegemos
          dentro de meios comercialmente aceitáveis ​​para evitar perdas e
          roubos, bem como acesso, divulgação, cópia, uso ou modificação não
          autorizados.
        </p>
        <p className="mb-4 text-brand-gray-600">
          Não compartilhamos informações de identificação pessoal publicamente
          ou com terceiros, exceto quando exigido por lei.
        </p>
        <p className="mb-4 text-brand-gray-600">
          O nosso site pode ter links para sites externos que não são operados
          por nós. Esteja ciente de que não temos controle sobre o conteúdo e
          práticas desses sites e não podemos aceitar responsabilidade por suas
          respectivas políticas de privacidade.
        </p>
        <p className="mb-4 text-brand-gray-600">
          Você é livre para recusar a nossa solicitação de informações pessoais,
          entendendo que talvez não possamos fornecer alguns dos serviços
          desejados.
        </p>
        <p className="mb-4 text-brand-gray-600">
          O uso continuado de nosso site será considerado como aceitação de
          nossas práticas em torno de privacidade e informações pessoais. Se
          você tiver alguma dúvida sobre como lidamos com dados do usuário e
          informações pessoais, entre em contacto connosco.
        </p>
        <h3 className="text-xl font-bold text-brand-gray-900">
          Compromisso do Usuário
        </h3>
        <p className="mb-4 text-brand-gray-600">
          O usuário se compromete a fazer uso adequado dos conteúdos e da
          informação que o My Place 2 Go oferece no site e com caráter
          enunciativo, mas não limitativo:
        </p>
        <ul className="space-y-4 text-brand-gray-900 mb-4">
          <li>
            A) Não se envolver em atividades que sejam ilegais ou contrárias à
            boa fé a à ordem pública;
          </li>
          <li>
            B) Não difundir propaganda ou conteúdo de natureza racista,
            xenofóbica, Bet Nacional ou azar, qualquer tipo de pornografia
            ilegal, de apologia ao terrorismo ou contra os direitos humanos;
          </li>
          <li>
            C) Não causar danos aos sistemas físicos (hardwares) e lógicos
            (softwares) do My Place 2 Go, de seus fornecedores ou terceiros,
            para introduzir ou disseminar vírus informáticos ou quaisquer outros
            sistemas de hardware ou software que sejam capazes de causar danos
            anteriormente mencionados.
          </li>
          <h3 className="text-xl font-bold text-brand-gray-900">
            Mais informações
          </h3>
          <p className="mb-4 text-brand-gray-600">
            Esperemos que esteja esclarecido e, como mencionado anteriormente,
            se houver algo que você não tem certeza se precisa ou não,
            geralmente é mais seguro deixar os cookies ativados, caso interaja
            com um dos recursos que você usa em nosso site.
          </p>
        </ul>
        <small className="mt-4">
          Esta política é efetiva a partir de 8 November 2023 23:03
        </small>
      </section>

      {/*  <BottomNavigation />  */}
    </main>
  )
}

export default TermoDeUso

