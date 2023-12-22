import { Icon } from '@iconify/react'
import React, { useState } from 'react'

export const AditionalInformation = ({ data, title, keyName }) => {
  const [hasSpeech, setHasSpeech] = useState(false)
  const [speechActive, setSpeechActive] = useState(false)
  async function TextTooSpeech(text: string) {
    const synth = window?.speechSynthesis
    if (!window.speechSynthesis) {
      alert('Your device does not support the SpeechSynthesis API')
    }

    window.speechSynthesis.cancel()

    /*  let voices = synth.getVoices() */

    let utterThis = new SpeechSynthesisUtterance(text)
    utterThis.onend = function (event) {}
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
  console.log(data?.informacoes_adicionais)
  return (
    <>
      {' '}
      {data?.informacoes_adicionais &&
        data?.informacoes_adicionais.length !== 0 && (
          <div className="border-b  py-4 ">
            <h4 className="text-2xl  text-brand-green-300 font-bold my-2 inline ">
              {title}
            </h4>
            {data?.informacoes_adicionais[keyName] &&
              data?.informacoes_adicionais[keyName].map((item, index) => {
                return (
                  <div key={index} className="">
                    <h4 className="my-2 text-xl">
                      {item.titulo}
                      <button
                        className="ml-3 border border-brand-gray-400 px-2 py-1 text-sm rounded-lg  text-brand-gray-900"
                        onClick={() =>
                          TextTooSpeech(`${item.titulo}. ${item.descricao}`)
                        }
                      >
                        <Icon
                          icon="lucide:speech"
                          fontSize={21}
                          className="inline text-brand-gray-900 mr-3"
                        />
                        Escutar
                      </button>
                    </h4>
                    <p className="text-justify text-brand-gray-500">
                      {item.descricao}
                    </p>
                  </div>
                )
              })}
          </div>
        )}
    </>
  )
}
