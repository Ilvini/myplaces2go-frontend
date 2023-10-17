import React from 'react'
import { UserComments } from '../Partials/UserComments'
import { Icon } from '@iconify/react'
import { useFetch } from '../../services/useFetch'
import rattingModalStore from '../../stores/modals/RattingModalStore'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
export const PlaceDetailsComments = ({ data }) => {
  const router = useRouter()
  const { modalState, setModalState, setModalData } = rattingModalStore()
  function handleFavoritePlace() {
    if (Cookies.get('token') === undefined) {
      return router.push('/login')
    }
    console.log(data)
    setModalState(true)
    setModalData(data)
  }
  return (
    <section className="mt-3 ">
      {data?.results.avaliacoes && data?.results?.avaliacoes.length !== 0 ? (
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
        <p className="text-brand-gray-600 rounded-lg py-10 text-center border">
          Não há avaliações no momento
        </p>
      )}

      <button
        className="bg-brand-yellow-300 rounded-lg p-3 mt-3 w-full text-center  flex"
        onClick={() => {
          handleFavoritePlace()
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

