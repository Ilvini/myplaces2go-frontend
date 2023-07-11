import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { api } from '../../services/axios'
import { successHandler } from '../../services/successHandler'
import { mutate } from 'swr'
import { errorHandler } from '../../services/errorHandler'
import { Icon } from '@iconify/react'
import InputMask from 'react-input-mask'

export function AddCommitForm({ abaId }: { abaId: string }) {
  const router = useRouter()
  const params = router.query

  // ? form data
  const [file, setFile] = useState<any>(null)
  const [dataNotification, setDataNotification] = useState('')
  const [comentario, setComentario] = useState('')
  // ? contact data
  const [contatoNome, setContatoNome] = useState('')
  const [contatoEmail, setContatoEmail] = useState('')
  const [contatoTelefone1, setContatoTelefone1] = useState('')
  const [contatoTelefone2, setContatoTelefone2] = useState('')
  const [contatoWhatsapp1, setContatoWhatsapp1] = useState(false)
  const [contatoWhatsapp2, setContatoWhatsapp2] = useState(false)
  // ? other states
  const [loading, setLoading] = useState(false)
  const [showContactArea, setShowContactArea] = useState(false)
  const [fileName, setFileName] = useState(null)

  async function HandleAddNewCommit() {
    setLoading(true)
    var bodyFormData = new FormData()
    bodyFormData.append('ficha_id', params.ficha_id as string)
    bodyFormData.append('aba_id', abaId)
    bodyFormData.append('comentario', comentario)
    if (dataNotification) {
      bodyFormData.append('aviso_data', dataNotification)
    }
    if (file) {
      bodyFormData.append('arquivo', file[0])
    }
    if (showContactArea) {
      bodyFormData.append('contato_nome', contatoNome)
      bodyFormData.append('contato_email', contatoEmail)
      bodyFormData.append('contato_telefone1', contatoTelefone1)
      bodyFormData.append('contato_telefone2', contatoTelefone2)
      bodyFormData.append('contato1_is_whatsapp', contatoWhatsapp1 as any)
      bodyFormData.append('contato2_is_whatsapp', contatoWhatsapp2 as any)
    }

    try {
      const response = await api.post('/comentarios', bodyFormData)
      successHandler(response)
      setComentario('')
      setFile(null)
      setFileName(null)
      setDataNotification('')
      setContatoNome('')
      setContatoEmail('')
      setContatoTelefone1('')
      setContatoTelefone2('')
      setContatoWhatsapp1(false)
      setContatoWhatsapp2(false)
      setShowContactArea(false)
      mutate('getFichaDetailsData')
    } catch (error) {
      errorHandler(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (file) {
      setFileName(file[0].name)
    }
  }, [file])

  return (
    <div>
      <textarea
        className="w-full h-20 border border-slate-300 rounded-md p-2"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      ></textarea>
      <div className="flex items-center gap-2 flex-wrap">
        <label onClick={() => setShowContactArea(!showContactArea)}>
          <span className="bg-white rounded-md shadow px-3 py-1 cursor-pointer hover:bg-zinc-100 transition-all flex items-center">
            {showContactArea ? (
              <Icon icon="mdi:account-remove" className="text-xl mr-2" />
            ) : (
              <Icon icon="mdi:account-plus" className="text-xl mr-2" />
            )}
            {showContactArea ? 'Sem Contato' : 'Adicionar Contato'}
          </span>
        </label>
        <label htmlFor="file">
          <span className="bg-white rounded-md shadow px-3 py-1 cursor-pointer hover:bg-zinc-100 transition-all flex items-center">
            <Icon icon="mdi:paperclip" className="text-xl mr-2" />
            {fileName ? fileName : 'Inserir arquivo'}
          </span>
          <input
            type="file"
            className="mt-2"
            id="file"
            onChange={(e) => setFile(e.target.files)}
            hidden
          />
        </label>
        <label
          htmlFor="dataNotification"
          className="flex gap-2 bg-white shadow px-3 py-1 items-center rounded-md  hover:bg-zinc-100 transition-all"
        >
          <Icon icon="mdi:bell-outline" className="text-xl mr-2" />
          <input
            type="date"
            onChange={(e) => setDataNotification(e.target.value)}
            id="dataNotification"
            value={dataNotification}
            min={new Date().toISOString().split('T')[0]}
          />
        </label>
      </div>
      <div className="mt-2">
        {showContactArea && (
          <>
            <div className="flex mt-2">
              <label>
                <div className="w-[120px] inline-block">
                  <span className="mr-2 font-bold">Nome</span>
                </div>
                <input
                  type="text"
                  value={contatoNome}
                  onChange={(e) => setContatoNome(e.target.value)}
                />
              </label>
            </div>
            <div className="flex mt-2">
              <label>
                <div className="w-[120px] inline-block">
                  <span className="mr-2 font-bold">E-mail</span>
                </div>
                <input
                  type="text"
                  value={contatoEmail}
                  onChange={(e) => setContatoEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="flex mt-2">
              <label>
                <div className="w-[120px] inline-block">
                  <span className="mr-2 font-bold">Telefone 1</span>
                </div>
                <InputMask
                  type="text"
                  mask="(99) 99999-9999"
                  value={contatoTelefone1}
                  onChange={(e) => setContatoTelefone1(e.target.value)}
                />
              </label>
              <label className="flex items-center gap-1 px-2 py-1 rounded">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  value={contatoWhatsapp1 as any}
                  onChange={() => setContatoWhatsapp1(!contatoWhatsapp1)}
                />
                Whatsapp
              </label>
            </div>
            <div className="flex mt-2">
              <label>
                <div className="w-[120px] inline-block">
                  <span className="mr-2 font-bold">Telefone 2</span>
                </div>
                <InputMask
                  type="text"
                  mask="(99) 99999-9999"
                  value={contatoTelefone2}
                  onChange={(e) => setContatoTelefone2(e.target.value)}
                />
              </label>
              <label className="flex items-center gap-1 px-2 py-1 rounded">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  value={contatoWhatsapp2 as any}
                  onChange={() => setContatoWhatsapp2(!contatoWhatsapp2)}
                />
                Whatsapp
              </label>
            </div>
          </>
        )}
      </div>
      <div className="mt-3">
        {loading ? (
          <button className="btn-lite">
            <Icon icon="mdi:loading" className="text-xl animate-spin" />
          </button>
        ) : (
          <button className="btn-lite" onClick={HandleAddNewCommit}>
            Adicionar
          </button>
        )}
      </div>
    </div>
  )
}
