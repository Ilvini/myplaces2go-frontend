import React, { useEffect, useState } from 'react'
import GoogleMaps from '../GoogleMaps'
import { GoogleMapsPlaceLocation } from '../GoogleMapsPlaceLocation'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import locationError from '../../helpers/handlerErrorGeoLocation'
import { AditionalInformation } from '../AditionalInformation'
import toast from 'react-hot-toast'
export const PlaceDetailsInformation = ({ data }) => {
  /*  function hasSpeechSynthesis() {
    if ('speechSynthesis' in window) {
      setHasSpeech(true)
    } else {
      setHasSpeech(false)
    }
  } */
  const [currentPosition, setCurrentPosition] = React.useState({
    latitude: 0,
    longitude: 0,
  })
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setCurrentPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error: GeolocationPositionError) => {
          console.log(locationError(error))
          toast.error(locationError(error) as string, {
            duration: 5000,
          })
        }
      )
    } else {
      toast.error('Seu dispositivo não suporta geolocalização', {
        duration: 5000,
      })
    }
  }, [])
  console.log(data)

  return (
    <section>
      {data?.results.horario_funcionamento &&
        data?.results.horario_funcionamento.length !== 0 && (
          <>
            <h4 className="text-2xl mt-2 text-brand-gray-600 inline">
              Horário de Funcionamento
            </h4>
            {data?.results?.aberto && (
              <span className="bg-brand-green-400 text-white text-sm font-bold px-3 py-1 rounded-md mb-1">
                ABERTO
              </span>
            )}
          </>
        )}
      <table className="w-full">
        {data?.results.horario_funcionamento.map((item, index) => {
          return (
            <tr key={index} className={`w-full ${'even:bg-gray-50 odd:white'}`}>
              <td className="text-brand-gray-500">{item.nome}</td>
              <td className="text-brand-gray-500 float-right">
                {item.horario}
              </td>
            </tr>
          )
        })}
      </table>

      {typeof data?.results.lat === 'number' &&
        typeof data?.results.lon === 'number' && (
          <div className="aspect-square w-full h-full">
            <h4 className="text-2xl mt-2 text-brand-gray-600">Localização</h4>
            <GoogleMapsPlaceLocation
              lat={data.results.lat}
              lon={data.results.lon}
            />
          </div>
        )}
      <a
        target="_blank"
        rel="noreferrer" //,
        href={`https://www.google.com/maps/dir/?api=1&origin=${currentPosition.latitude},${currentPosition.longitude}&destination=${data?.results.lat},${data?.results.lon}&entry=ttu`}
        className=""
      >
        <button className="bg-brand-yellow-300 rounded-lg p-3 mt-3 w-full text-center ">
          Traçar Rota
        </button>
      </a>
      {data?.results.informacoes_adicionais && (
        <div className="">
          {
            // pegar as chaves do objecto
            Object.keys(data?.results?.informacoes_adicionais).map((key) => {
              return (
                <AditionalInformation
                  data={data?.results}
                  title={key}
                  keyName={key}
                />
              )
            })
          }
          {/*    <AditionalInformation
            data={data?.results}
            title={'Dicas'}
            keyName="Dica"
          />
          <AditionalInformation
            data={data?.results}
            title={'Lendas'}
            keyName="Lenda"
          />
          <AditionalInformation
            data={data?.results}
            title={'Historias'}
            keyName="Historia"
          /> */}
        </div>
      )}
      <button className="bg-brand-yellow-300 rounded-lg p-3 mt-3 w-full text-center ">
        Encontrar Guia Turístico
      </button>
      <Link href={`/dashboard/place/${data?.results.uuid}/add-information`}>
        <button className="border-brand-yellow-300 border-2 bg-white rounded-lg p-3 mt-3 w-full text-center ">
          Adicionar Informações
        </button>
      </Link>
    </section>
  )
}

