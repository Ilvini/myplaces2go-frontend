import { useRouter } from 'next/router'
import { useState } from 'react'
import { api } from '../../services/axios'
import { successHandler } from '../../services/successHandler'
import { mutate } from 'swr'
import { errorHandler } from '../../services/errorHandler'
import * as Tabs from '@radix-ui/react-tabs'
import { Icon } from '@iconify/react'

export function AddNewTabContent() {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = router.query

  async function HandleAddNewTab() {
    setLoading(true)
    try {
      const response = await api.post('/abas', {
        ficha_id: params.ficha_id,
        nome: titulo,
        descricao: descricao,
      })
      successHandler(response)
      setTitulo('')
      setDescricao('')
      mutate('getFichaDetailsData')
    } catch (error) {
      errorHandler(error)
    }
    setLoading(false)
  }

  return (
    <Tabs.Content
      value={'tab_new'}
      className={`bg-zinc-100 p-5 min-h-96 mt-3 rounded-md shadow`}
    >
      <section className="grid md:grid-cols-2 gap-3">
        <div>
          <div>
            <p className="text-lg flex items-center gap-2">
              <Icon icon="mdi:text" className="text-xl" />
              <strong>Título</strong>
            </p>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full border border-slate-300 rounded-md p-2"
            />
          </div>
          <div>
            {/* <p className="text-lg flex items-center gap-2">
              <Icon icon="mdi:text" className="text-xl" />
              <strong>Descrição</strong>
            </p> */}
            {/* <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full h-20 border border-slate-300 rounded-md p-2"
            /> */}
          </div>
          {loading ? (
            <div className="mt-3">
              <button className="btn-lite">
                <Icon icon="mdi:loading" className="text-xl animate-spin" />
              </button>
            </div>
          ) : (
            <div className="mt-3">
              <button onClick={HandleAddNewTab} className="btn-lite">
                Adicionar
              </button>
            </div>
          )}
        </div>
      </section>
    </Tabs.Content>
  )
}
