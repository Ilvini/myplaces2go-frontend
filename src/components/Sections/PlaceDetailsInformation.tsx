import React, { useState } from 'react'
import GoogleMaps from '../GoogleMaps'
import { GoogleMapsPlaceLocation } from '../GoogleMapsPlaceLocation'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export const PlaceDetailsInformation = ({
  lat,
  long,
}: {
  lat: number
  long: number
}) => {
  const [hasSpeech, setHasSpeech] = useState(false)
  const [speechActive, setSpeechActive] = useState(false)

  /*  function hasSpeechSynthesis() {
    if ('speechSynthesis' in window) {
      setHasSpeech(true)
    } else {
      setHasSpeech(false)
    }
  } */

  async function TextTooSpeech() {
    const synth = window?.speechSynthesis
    if (!window.speechSynthesis) {
      alert('Your device does not support the SpeechSynthesis API')
    }

    window.speechSynthesis.cancel()

    /*  let voices = synth.getVoices() */

    let text =
      'A estátua do Cristo Redentor foi idealizada em meados do século 19, quando o padre francês Pierre Marie Boss exercia suas atividades em uma igreja com vista para o Morro do Corcovado. A ideia de erguer um monumento religioso foi resgatada em 1888 pela princesa Isabel.'
    let utterThis = new SpeechSynthesisUtterance(text)
    utterThis.onend = function (event) {
      console.log('SpeechSynthesisUtterance.onend')
    }
    utterThis.onerror = function (event) {
      console.error('SpeechSynthesisUtterance.onerror')
    }
    /*   utterThis.voice = voices[0] */
    utterThis.pitch = 1
    utterThis.rate = 1
    utterThis.lang = 'pt-BR'
    synth.speak(utterThis)

    setSpeechActive((state) => !state)
  }

  return (
    <section>
      {/*   <h4 className="text-2xl mt-2 text-brand-gray-600">
        Horário de Funcionamento
      </h4> */}
      {/* <table className="w-full">
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
      </table> */}
      {lat && long && (
        <>
          <h4 className="text-2xl mt-2 text-brand-gray-600">Localização</h4>
          <GoogleMapsPlaceLocation lat={lat} long={long} />
        </>
      )}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.google.com/maps/dir/47.61742662466556,+-122.35135224108917/47.61161171741843,+-122.3417821197974/@47.6146062,-122.3564563,15z/data=!3m1!4b1!4m9!4m8!1m3!2m2!1d-122.3513522!2d47.6174266!1m3!2m2!1d-122.3417821!2d47.6116117?entry=ttu"
        className=""
      >
        <button className="bg-brand-yellow-300 rounded-lg p-3 mt-3 w-full text-center ">
          Traçar Rota
        </button>
      </a>
      <span className="">
        <h4 className="text-2xl  text-brand-gray-600 my-2 inline">
          Curiosidades
        </h4>
        <button
          className="ml-3 border border-brand-gray-900 px-4 py-1 "
          onClick={() => TextTooSpeech()}
        >
          <Icon
            icon="lucide:speech"
            fontSize={28}
            className="inline text-brand-gray-900 mr-3"
          />
          Escutar
        </button>
      </span>
      <p className="text-justify text-brand-gray-500">
        A estátua do Cristo Redentor foi idealizada em meados do século 19,
        quando o padre francês Pierre Marie Boss exercia suas atividades em uma
        igreja com vista para o Morro do Corcovado. A ideia de erguer um
        monumento religioso foi resgatada em 1888 pela princesa Isabel.
      </p>
      <button className="bg-brand-yellow-300 rounded-lg p-3 mt-3 w-full text-center ">
        Encontrar Guia Turístico
      </button>
      <Link href="/dashboard/add-curiosity">
        <button className="border-brand-yellow-300 border-2 bg-white rounded-lg p-3 mt-3 w-full text-center ">
          Adicionar uma Curiosidade
        </button>
      </Link>
    </section>
  )
}

