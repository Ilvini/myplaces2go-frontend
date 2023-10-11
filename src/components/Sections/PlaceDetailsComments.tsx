import React from 'react'
import { UserComments } from '../Partials/UserComments'
import { Icon } from '@iconify/react'
import { useFetch } from '../../services/useFetch'
import rattingModalStore from '../../stores/modals/RattingModalStore'
export const PlaceDetailsComments = ({ data }) => {
  const { modalState, setModalState, setModalData, modalData } =
    rattingModalStore()

  return (
    <section className="mt-3 ">
      {data?.results && data.results.avaliacoes.length !== 0 ? (
        data.results.avaliacao.map((avaliacao) => {
          return (
            <UserComments
              key={avaliacao.id}
              image="/img/avatar1.png"
              date={avaliacao.data}
              comment={avaliacao.comentario}
            />
          )
        })
      ) : (
        <p className="text-brand-gray-600 my-10 text-center">
          Não há avaliações no momento
        </p>
      )}
      {/*  <UserComments
        image="/img/avatar1.png"
        name="Felipe dos Santos"
        date="há 1 dia"
        comment="A comida é cara, levem algo pra comer na mochila, de resto vale a pena."
      />
      <UserComments
        image="/img/avatar2.png"
        name="Arthur Rocha"
        date="há 4 dia"
        comment="Ammei!!"
      />
      <UserComments
        image="/img/avatar3.png"
        name="Manoel Gomes"
        date="há 2 semanas"
        comment="vale a pena levar a família, é muito bonito."
      />
      <UserComments
        image="/img/avatar1.png"
        name="Felipe dos Santos"
        date="há 1 dia"
        comment="A comida é cara, levem algo pra comer na mochila, de resto vale a pena."
      /> */}
      <button
        className="bg-brand-yellow-300 rounded-lg p-3 mt-3 w-full text-center  flex"
        onClick={() => {
          setModalState(true), setModalData(data)
        }}
      >
        <Icon icon="ep:place" className="text-brand-blue-100 text-2xl" />
        <p className="w-full text-center">Eu visitei o ponto turístico</p>
      </button>
      {/*  <form
        action="
     "
      >
        <textarea
          name="comment"
          id=""
          placeholder="Deixe seu comentário..."
          rows={5}
          className="w-full border p-3 rounded-lg mt-5"
        ></textarea>
        <button className="bg-brand-yellow-300 rounded-lg p-3 mt-3 w-full text-center ">
          Enviar
        </button>
      </form> */}
    </section>
  )
}

