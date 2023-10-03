import React from 'react'
import GoogleMaps from '../GoogleMaps'

export const PlaceDetailsInformation = () => {
  return (
    <section>
      <h4 className="text-2xl mt-2 text-brand-gray-600">
        Horário de Funcionamento
      </h4>
      <table className="w-full">
        <tr className="even:bg-gray-50 odd:white ">
          <td className="text-brand-red-200">Domingo</td>
          <td className="float-right text-brand-red-200">Fechado</td>
        </tr>
        <tr className=" w-full even:bg-gray-50 odd:white ">
          <td className="text-brand-gray-500">Segunda</td>
          <td className="text-brand-gray-500 float-right">08:00 - 18:00</td>
        </tr>
        <tr className=" w-full even:bg-gray-50 odd:white ">
          <td className="text-brand-gray-500">Terça</td>
          <td className="text-brand-gray-500 float-right">08:00 - 18:00</td>
        </tr>
        <tr className=" w-full even:bg-gray-50 odd:white ">
          <td className="text-brand-gray-500">Quarta</td>
          <td className="text-brand-gray-500 float-right">08:00 - 18:00</td>
        </tr>
        <tr className=" w-full even:bg-gray-50 odd:white ">
          <td className="text-brand-gray-500">Quinta</td>
          <td className="text-brand-gray-500 float-right">08:00 - 18:00</td>
        </tr>
        <tr className=" w-full even:bg-gray-50 odd:white ">
          <td className="text-brand-gray-500">Sexta</td>
          <td className="text-brand-gray-500 float-right">08:00 - 18:00</td>
        </tr>
        <tr className=" w-full even:bg-gray-50 odd:white ">
          <td className="text-brand-gray-500">Sábado</td>
          <td className="text-brand-gray-500 float-right">08:00 - 18:00</td>
        </tr>
      </table>
      <h4 className="text-2xl mt-2 text-brand-gray-600">Custos</h4>
      <table className="w-full">
        <tr className="even:bg-gray-50 odd:white ">
          <td className="text-brand-gray-500">Estacionamento</td>
          <td className="text-brand-gray-500 float-right">R$ 10,00/h</td>
        </tr>
        <tr className=" w-full even:bg-gray-50 odd:white ">
          <td className="text-brand-gray-500">Translado</td>
          <td className="text-brand-gray-500 float-right">R$ 30,90</td>
        </tr>
        <tr className=" w-full even:bg-gray-50 odd:white ">
          <td className="text-brand-gray-500">Cuía Turístico</td>
          <td className="text-brand-gray-500 float-right">R$ 90,00</td>
        </tr>
      </table>
      <h4 className="text-2xl mt-2 text-brand-gray-600">Localização</h4>
      <GoogleMaps />
      <button className="bg-brand-yellow-300 rounded-lg p-3 mt-3 w-full text-center ">
        {' '}
        Traçar Rota
      </button>
      <h4 className="text-2xl  text-brand-gray-600 my-2">Curiosidades</h4>
      <p className="text-justify text-brand-gray-500">
        A estátua do Cristo Redentor foi idealizada em meados do século 19,
        quando o padre francês Pierre Marie Boss exercia suas atividades em uma
        igreja com vista para o Morro do Corcovado. A ideia de erguer um
        monumento religioso foi resgatada em 1888 pela princesa Isabel.
      </p>
      <button className="bg-brand-yellow-300 rounded-lg p-3 mt-3 w-full text-center ">
        {' '}
        Encontrar Guia Turístico
      </button>
      <button className="border-brand-yellow-300 border-2 bg-white rounded-lg p-3 mt-3 w-full text-center ">
        {' '}
        Traçar Rota
      </button>
      <button className="border-brand-yellow-300 border-2 bg-white rounded-lg p-3 mt-3 w-full text-center ">
        {' '}
        Adicionar uma Curiosidade
      </button>
    </section>
  )
}

