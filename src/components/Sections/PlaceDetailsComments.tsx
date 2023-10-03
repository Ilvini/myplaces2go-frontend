import React from 'react'
import { UserComments } from '../Partials/UserComments'

export const PlaceDetailsComments = () => {
  return (
    <section className="mt-3 ">
      <UserComments
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
      />
      <form
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
      </form>
    </section>
  )
}

