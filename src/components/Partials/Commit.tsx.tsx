/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { CommitProps } from '../../types/protocols'
import { api } from '../../services/axios'
import { mutate } from 'swr'

export function Commit({ data }: { data: CommitProps }) {
  const [dataAvisoIsChecked, setDataAvisoIsChecked] =
    useState<CommitProps['data_aviso_estado'] | null>(null)

  useEffect(() => {
    setDataAvisoIsChecked(data.data_aviso_estado)
  }, [])

  async function toggleDataAviso() {
    setDataAvisoIsChecked(!dataAvisoIsChecked)
    try {
      const response = await api.post(`/comentarios/aviso/toggle`, {
        comentario_id: data.id,
      })
      console.log(response.data.results)
      mutate('getFichaDetailsData')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-white p-5 rounded-md shadow mt-3 relative">
      <small className="absolute top-2 right-2 text-slate-600">
        {data.data_hora}
      </small>
      <p>{data.descricao}</p>
      <div className="flex items-center gap-3 mt-3 flex-wrap">
        {data.arquivo_nome && (
          <a
            href={data.arquivo_link}
            download
            className="cursor-pointer"
            rel="noreferrer"
            target="_blank"
          >
            <span className="px-2 py-1 bg-slate-300 rounded-md flex items-center gap-2">
              <Icon icon="mdi:download" className="text-xl" />
              {data.arquivo_nome}
            </span>
          </a>
        )}

        {data.contato_nome && (
          <div className="p-3 bg-slate-100 rounded-md w-full">
            <strong>Contato</strong>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <strong>Nome: </strong> <span>{data.contato_nome}</span>
              </div>
              {data.contato_email && (
                <div>
                  <strong>Email: </strong> <span>{data.contato_email}</span>
                </div>
              )}
              {data.contato_telefone1 && (
                <div>
                  <strong>Telefone 1: </strong>{' '}
                  <span>
                    {data.contato1_is_whatsapp && (
                      <Icon icon="mdi:whatsapp" className="text-xl" />
                    )}
                    {data.contato_telefone1}
                  </span>
                </div>
              )}
              {data.contato_telefone2 && (
                <div>
                  <strong>Telefone 2: </strong>{' '}
                  <span>
                    {' '}
                    {data.contato2_is_whatsapp && (
                      <Icon icon="mdi:whatsapp" className="text-xl" />
                    )}
                    {data.contato_telefone2}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        {data.data_aviso && (
          <label
            className="flex items-center gap-1 px-2 py-1 rounded"
            style={{
              backgroundColor: dataAvisoIsChecked ? '#ffffff' : '#decb4a',
            }}
          >
            <input
              type="checkbox"
              className="w-5 h-5"
              onChange={toggleDataAviso}
              checked={dataAvisoIsChecked}
            />
            <Icon icon="mdi:bell-outline" className="text-xl" />
            {data.data_aviso}
          </label>
        )}
      </div>
    </div>
  )
}
